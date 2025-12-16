#!/bin/bash

# Script to download ML models for Laminor

set -e

echo "Downloading ML models for Laminor..."

# Create models directory
mkdir -p models

# Download Segment Anything Model
echo "Downloading Segment Anything Model..."
if [ ! -f "sam_vit_h_4b8939.pth" ]; then
    wget https://dl.fbaipublicfiles.com/segment_anything/sam_vit_h_4b8939.pth
    echo "SAM model downloaded successfully"
else
    echo "SAM model already exists"
fi

# Note: Llama and GPT-OSS models need to be downloaded manually
# due to licensing and size considerations
echo ""
echo "Note: Llama and GPT-OSS models need to be downloaded manually:"
echo "1. Llama: Download from Hugging Face or official source"
echo "2. GPT-OSS: Download from the appropriate source"
echo ""
echo "Set LLAMA_MODEL_PATH and GPT_OSS_MODEL_PATH environment variables"
echo "to point to the model directories."

echo ""
echo "Model download complete!"

