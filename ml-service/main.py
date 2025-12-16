"""
ML Service for Laminor
Handles image/video analysis using Segment Anything, Llama, and GPT-OSS
"""

import os
import json
import base64
import io
from pathlib import Path
from typing import List, Dict, Any, Optional
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import uvicorn
import cv2
import numpy as np
from PIL import Image
import torch

# Import ML models (will be loaded lazily)
sam_model = None
llama_model = None
gpt_oss_model = None

app = FastAPI(title="Laminor ML Service")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
UPLOAD_DIR = Path("uploads")
RESULTS_DIR = Path("results")
UPLOAD_DIR.mkdir(exist_ok=True)
RESULTS_DIR.mkdir(exist_ok=True)

# Mount static files for results
app.mount("/results", StaticFiles(directory=str(RESULTS_DIR)), name="results")

# Model paths (can be configured via env vars)
SAM_MODEL_PATH = os.getenv("SAM_MODEL_PATH", "sam_vit_h_4b8939.pth")
LLAMA_MODEL_PATH = os.getenv("LLAMA_MODEL_PATH", "")
GPT_OSS_MODEL_PATH = os.getenv("GPT_OSS_MODEL_PATH", "")

class AnalysisRequest(BaseModel):
    job_id: str
    file_type: str  # 'image' or 'video'
    return_cropped: bool = True
    generate_descriptions: bool = True

class DetectionResult(BaseModel):
    object_id: str
    object_type: str
    confidence: float
    bounding_box: Dict[str, float]
    cropped_image_url: Optional[str] = None
    description: Optional[str] = None
    attributes: Optional[Dict[str, Any]] = None

class AnalysisResponse(BaseModel):
    job_id: str
    status: str
    detections: List[DetectionResult]
    counts: Dict[str, int]
    frame_number: Optional[int] = None

def load_sam_model():
    """Load Segment Anything Model"""
    global sam_model
    if sam_model is None:
        try:
            from segment_anything import sam_model_registry, SamPredictor
            sam = sam_model_registry["vit_h"](checkpoint=SAM_MODEL_PATH)
            sam.to(device="cuda" if torch.cuda.is_available() else "cpu")
            sam_model = SamPredictor(sam)
            print("SAM model loaded successfully")
        except Exception as e:
            print(f"Warning: Could not load SAM model: {e}")
            print("SAM functionality will be limited")
    return sam_model

def load_llama_model():
    """Load Llama model for descriptions"""
    global llama_model
    if llama_model is None:
        try:
            # Using transformers library for Llama
            from transformers import AutoTokenizer, AutoModelForCausalLM
            if LLAMA_MODEL_PATH:
                tokenizer = AutoTokenizer.from_pretrained(LLAMA_MODEL_PATH)
                model = AutoModelForCausalLM.from_pretrained(
                    LLAMA_MODEL_PATH,
                    torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
                    device_map="auto" if torch.cuda.is_available() else None
                )
                llama_model = {"tokenizer": tokenizer, "model": model}
                print("Llama model loaded successfully")
        except Exception as e:
            print(f"Warning: Could not load Llama model: {e}")
    return llama_model

def load_gpt_oss_model():
    """Load GPT-OSS model"""
    global gpt_oss_model
    if gpt_oss_model is None:
        try:
            # GPT-OSS integration (example using transformers)
            from transformers import AutoTokenizer, AutoModelForCausalLM
            if GPT_OSS_MODEL_PATH:
                tokenizer = AutoTokenizer.from_pretrained(GPT_OSS_MODEL_PATH)
                model = AutoModelForCausalLM.from_pretrained(
                    GPT_OSS_MODEL_PATH,
                    torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
                    device_map="auto" if torch.cuda.is_available() else None
                )
                gpt_oss_model = {"tokenizer": tokenizer, "model": model}
                print("GPT-OSS model loaded successfully")
        except Exception as e:
            print(f"Warning: Could not load GPT-OSS model: {e}")
    return gpt_oss_model

def detect_objects_with_sam(image: np.ndarray) -> List[Dict[str, Any]]:
    """Use Segment Anything to detect and segment objects"""
    sam = load_sam_model()
    if sam is None:
        # Fallback to simple detection if SAM not available
        return detect_objects_fallback(image)
    
    try:
        sam.set_image(image)
        
        # Generate automatic mask generation
        from segment_anything import SamAutomaticMaskGenerator
        mask_generator = SamAutomaticMaskGenerator(sam.model)
        masks = mask_generator.generate(image)
        
        detections = []
        for i, mask_data in enumerate(masks):
            mask = mask_data["segmentation"]
            bbox = mask_data["bbox"]  # [x, y, width, height]
            area = mask_data["area"]
            stability_score = mask_data.get("stability_score", 0.5)
            
            # Calculate bounding box
            y_indices, x_indices = np.where(mask > 0)
            if len(x_indices) == 0 or len(y_indices) == 0:
                continue
                
            x_min, x_max = int(x_indices.min()), int(x_indices.max())
            y_min, y_max = int(y_indices.min()), int(y_indices.max())
            
            detections.append({
                "object_id": f"obj_{i}",
                "object_type": "object",  # Can be enhanced with classification
                "confidence": float(stability_score),
                "bounding_box": {
                    "x": float(x_min),
                    "y": float(y_min),
                    "width": float(x_max - x_min),
                    "height": float(y_max - y_min)
                },
                "mask": mask,
                "area": int(area)
            })
        
        return detections
    except Exception as e:
        print(f"Error in SAM detection: {e}")
        return detect_objects_fallback(image)

def detect_objects_fallback(image: np.ndarray) -> List[Dict[str, Any]]:
    """Fallback detection using OpenCV"""
    # Simple contour detection as fallback
    gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
    _, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    detections = []
    for i, contour in enumerate(contours):
        if cv2.contourArea(contour) < 100:  # Filter small objects
            continue
        x, y, w, h = cv2.boundingRect(contour)
        detections.append({
            "object_id": f"obj_{i}",
            "object_type": "object",
            "confidence": 0.5,
            "bounding_box": {
                "x": float(x),
                "y": float(y),
                "width": float(w),
                "height": float(h)
            }
        })
    
    return detections

def generate_description(image: np.ndarray, bbox: Dict[str, float], object_type: str) -> str:
    """Generate description using LLM (Llama or GPT-OSS)"""
    llama = load_llama_model()
    gpt_oss = load_gpt_oss_model()
    
    # Crop the image region
    x, y, w, h = int(bbox["x"]), int(bbox["y"]), int(bbox["width"]), int(bbox["height"])
    cropped = image[y:y+h, x:x+w]
    
    # Convert to base64 for text description
    pil_image = Image.fromarray(cropped)
    buffer = io.BytesIO()
    pil_image.save(buffer, format="JPEG")
    img_base64 = base64.b64encode(buffer.getvalue()).decode()
    
    prompt = f"Describe this {object_type} in the image. Be concise and focus on visible attributes like color, size, shape, and any distinguishing features."
    
    try:
        if llama:
            tokenizer = llama["tokenizer"]
            model = llama["model"]
            inputs = tokenizer(prompt, return_tensors="pt")
            if torch.cuda.is_available():
                inputs = {k: v.to("cuda") for k, v in inputs.items()}
            outputs = model.generate(**inputs, max_length=100, do_sample=True, temperature=0.7)
            description = tokenizer.decode(outputs[0], skip_special_tokens=True)
            return description.replace(prompt, "").strip()
        elif gpt_oss:
            tokenizer = gpt_oss["tokenizer"]
            model = gpt_oss["model"]
            inputs = tokenizer(prompt, return_tensors="pt")
            if torch.cuda.is_available():
                inputs = {k: v.to("cuda") for k, v in inputs.items()}
            outputs = model.generate(**inputs, max_length=100, do_sample=True, temperature=0.7)
            description = tokenizer.decode(outputs[0], skip_special_tokens=True)
            return description.replace(prompt, "").strip()
    except Exception as e:
        print(f"Error generating description: {e}")
    
    # Fallback description
    return f"A {object_type} detected in the image with bounding box coordinates ({bbox['x']:.0f}, {bbox['y']:.0f})"

def crop_image(image: np.ndarray, bbox: Dict[str, float]) -> np.ndarray:
    """Crop image region based on bounding box"""
    x, y, w, h = int(bbox["x"]), int(bbox["y"]), int(bbox["width"]), int(bbox["height"])
    x = max(0, x)
    y = max(0, y)
    w = min(w, image.shape[1] - x)
    h = min(h, image.shape[0] - y)
    return image[y:y+h, x:x+w]

def save_cropped_image(cropped_image: np.ndarray, job_id: str, object_id: str) -> str:
    """Save cropped image and return URL"""
    filename = f"{job_id}_{object_id}.jpg"
    filepath = RESULTS_DIR / filename
    pil_image = Image.fromarray(cropped_image)
    pil_image.save(filepath, "JPEG")
    # Return relative URL that will be served by the static files mount
    # The frontend will prepend the ML_SERVICE_URL
    return f"/results/{filename}"

@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "Laminor ML Service", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "models": {
        "sam": sam_model is not None,
        "llama": llama_model is not None,
        "gpt_oss": gpt_oss_model is not None
    }}

@app.post("/analyze/image")
async def analyze_image(
    file: UploadFile = File(...),
    job_id: str = None,
    return_cropped: bool = True,
    generate_descriptions: bool = True
):
    """Analyze an uploaded image"""
    try:
        # Read image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        image_np = np.array(image.convert("RGB"))
        
        # Detect objects
        detections = detect_objects_with_sam(image_np)
        
        # Process detections
        results = []
        counts = {}
        
        for det in detections:
            object_type = det["object_type"]
            counts[object_type] = counts.get(object_type, 0) + 1
            
            # Crop image if requested
            cropped_url = None
            if return_cropped:
                cropped = crop_image(image_np, det["bounding_box"])
                cropped_url = save_cropped_image(cropped, job_id or "temp", det["object_id"])
            
            # Generate description if requested
            description = None
            if generate_descriptions:
                description = generate_description(image_np, det["bounding_box"], object_type)
            
            results.append({
                "object_id": det["object_id"],
                "object_type": object_type,
                "confidence": det["confidence"],
                "bounding_box": det["bounding_box"],
                "cropped_image_url": cropped_url,
                "description": description,
                "attributes": {}
            })
        
        return {
            "job_id": job_id or "temp",
            "status": "completed",
            "detections": results,
            "counts": counts
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze/video")
async def analyze_video(
    file: UploadFile = File(...),
    job_id: str = None,
    return_cropped: bool = True,
    generate_descriptions: bool = True,
    frame_interval: int = 30  # Process every Nth frame
):
    """Analyze a video file frame by frame"""
    try:
        # Save video temporarily
        video_path = UPLOAD_DIR / f"{job_id or 'temp'}_video.mp4"
        with open(video_path, "wb") as f:
            f.write(await file.read())
        
        # Open video
        cap = cv2.VideoCapture(str(video_path))
        fps = cap.get(cv2.CAP_PROP_FPS)
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        
        all_results = []
        frame_number = 0
        
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            
            # Process every Nth frame
            if frame_number % frame_interval != 0:
                frame_number += 1
                continue
            
            # Convert BGR to RGB
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            
            # Detect objects
            detections = detect_objects_with_sam(frame_rgb)
            
            # Process detections for this frame
            frame_results = []
            counts = {}
            
            for det in detections:
                object_type = det["object_type"]
                counts[object_type] = counts.get(object_type, 0) + 1
                
                cropped_url = None
                if return_cropped:
                    cropped = crop_image(frame_rgb, det["bounding_box"])
                    cropped_url = save_cropped_image(
                        cropped, 
                        f"{job_id or 'temp'}_f{frame_number}", 
                        det["object_id"]
                    )
                
                description = None
                if generate_descriptions:
                    description = generate_description(frame_rgb, det["bounding_box"], object_type)
                
                frame_results.append({
                    "object_id": det["object_id"],
                    "object_type": object_type,
                    "confidence": det["confidence"],
                    "bounding_box": det["bounding_box"],
                    "cropped_image_url": cropped_url,
                    "description": description,
                    "attributes": {},
                    "frame_number": frame_number
                })
            
            all_results.extend(frame_results)
            frame_number += 1
        
        cap.release()
        
        # Aggregate counts across all frames
        total_counts = {}
        for result in all_results:
            obj_type = result["object_type"]
            total_counts[obj_type] = total_counts.get(obj_type, 0) + 1
        
        return {
            "job_id": job_id or "temp",
            "status": "completed",
            "detections": all_results,
            "counts": total_counts,
            "total_frames": total_frames,
            "processed_frames": len(set(r["frame_number"] for r in all_results if "frame_number" in r))
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    # Preload models on startup
    print("Loading ML models...")
    load_sam_model()
    load_llama_model()
    load_gpt_oss_model()
    
    port = int(os.getenv("PORT", 8001))
    uvicorn.run(app, host="0.0.0.0", port=port)

