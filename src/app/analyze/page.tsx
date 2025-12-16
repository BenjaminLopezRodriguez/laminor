"use client";

import { useState, useRef } from "react";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Camera, Upload, Loader2, CheckCircle2, XCircle, Download, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AnalyzePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analysisType, setAnalysisType] = useState<"image" | "video">("image");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const analyzeImageMutation = api.analysis.analyzeImage.useMutation();
  const analyzeVideoMutation = api.analysis.analyzeVideo.useMutation();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    try {
      if (analysisType === "image") {
        await analyzeImageMutation.mutateAsync({
          file: selectedFile,
          returnCropped: true,
          generateDescriptions: true,
        });
      } else {
        await analyzeVideoMutation.mutateAsync({
          file: selectedFile,
          returnCropped: true,
          generateDescriptions: true,
          frameInterval: 30,
        });
      }
    } catch (error) {
      console.error("Analysis error:", error);
    }
  };

  const isLoading = analyzeImageMutation.isPending || analyzeVideoMutation.isPending;
  const result = analyzeImageMutation.data || analyzeVideoMutation.data;
  const error = analyzeImageMutation.error || analyzeVideoMutation.error;

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">AI Image & Video Analysis</h1>
        <p className="text-muted-foreground">
          Upload images or videos to detect objects, count items, and get AI-generated descriptions
        </p>
      </div>

      {/* Analysis Type Selector */}
      <div className="flex gap-4 mb-6">
        <Button
          variant={analysisType === "image" ? "default" : "outline"}
          onClick={() => {
            setAnalysisType("image");
            setSelectedFile(null);
            setPreview(null);
          }}
        >
          <Camera className="mr-2 h-4 w-4" />
          Image Analysis
        </Button>
        <Button
          variant={analysisType === "video" ? "default" : "outline"}
          onClick={() => {
            setAnalysisType("video");
            setSelectedFile(null);
            setPreview(null);
          }}
        >
          <Upload className="mr-2 h-4 w-4" />
          Video Analysis
        </Button>
      </div>

      {/* Upload Section */}
      <Card className="p-6 mb-6">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-12">
          {preview ? (
            <div className="space-y-4 w-full">
              {analysisType === "image" ? (
                <div className="relative w-full max-w-2xl mx-auto">
                  <Image
                    src={preview}
                    alt="Preview"
                    width={800}
                    height={600}
                    className="rounded-lg object-contain"
                  />
                </div>
              ) : (
                <video
                  src={preview}
                  controls
                  className="w-full max-w-2xl mx-auto rounded-lg"
                />
              )}
              <div className="flex gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreview(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                >
                  Remove
                </Button>
                <Button onClick={handleAnalyze} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Eye className="mr-2 h-4 w-4" />
                      Analyze {analysisType === "image" ? "Image" : "Video"}
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <Upload className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">
                Drop your {analysisType} here or click to browse
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Supports {analysisType === "image" ? "JPG, PNG, WebP" : "MP4, MOV, AVI"}
              </p>
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
              >
                Select File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept={analysisType === "image" ? "image/*" : "video/*"}
                onChange={handleFileSelect}
                className="hidden"
              />
            </>
          )}
        </div>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="p-6 mb-6 border-destructive">
          <div className="flex items-center gap-3">
            <XCircle className="h-5 w-5 text-destructive" />
            <div>
              <h3 className="font-semibold text-destructive">Analysis Failed</h3>
              <p className="text-sm text-muted-foreground">{error.message}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Results Display */}
      {result && (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <h2 className="text-2xl font-bold">Analysis Results</h2>
            </div>

            {/* Counts Summary */}
            {result.counts && Object.keys(result.counts).length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Object Counts</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(result.counts).map(([type, count]) => (
                    <div
                      key={type}
                      className="p-4 rounded-lg border bg-card"
                    >
                      <div className="text-2xl font-bold">{count as number}</div>
                      <div className="text-sm text-muted-foreground capitalize">
                        {type}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Detections Grid */}
            {result.detections && result.detections.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Detected Objects ({result.detections.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {result.detections.map((detection: any, idx: number) => (
                    <Card key={idx} className="p-4">
                      {detection.cropped_image_url && (
                        <div className="relative w-full h-48 mb-3 rounded-lg overflow-hidden">
                          <Image
                            src={detection.cropped_image_url}
                            alt={`${detection.object_type} ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold capitalize">
                            {detection.object_type}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {(detection.confidence * 100).toFixed(1)}%
                          </span>
                        </div>
                        {detection.description && (
                          <p className="text-sm text-muted-foreground">
                            {detection.description}
                          </p>
                        )}
                        {detection.frame_number !== undefined && (
                          <p className="text-xs text-muted-foreground">
                            Frame: {detection.frame_number}
                          </p>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* View Details Link */}
            {result.jobId && (
              <div className="mt-6 pt-6 border-t">
                <Button asChild variant="outline">
                  <Link href={`/dashboard/job/${result.jobId}`}>
                    View Full Details
                  </Link>
                </Button>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Quick Links */}
      <div className="mt-8 flex gap-4">
        <Button asChild variant="outline">
          <Link href="/dashboard">View Dashboard</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </main>
  );
}

