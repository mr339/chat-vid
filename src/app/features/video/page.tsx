"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import ReviewSection from "@/components/ReviewSection";

export default function VideoFeature() {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Removed FFmpeg-related code
  // const ffmpegRef = useRef(new FFmpeg());
  // useEffect(() => {
  //   load();
  // }, []);
  // const load = async () => { ... };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "video/mp4") {
      setSelectedVideo(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    } else {
      alert("Please select a valid MP4 video file.");
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center min-h-screen bg-background py-4">
        <Card
          className={`shadow-2xl overflow-hidden ${
            videoUrl ? "w-[80vw] h-[80vh]" : "w-[60vw] h-[60vh]"
          } transition-all duration-300 mb-8`}
        >
          <CardContent className="flex flex-col items-center justify-center h-full p-6">
            {!videoUrl ? (
              <>
                <h2 className="text-3xl font-bold mb-8">Video Upload</h2>
                <Button
                  className="flex items-center space-x-2 text-lg px-6 py-3"
                  onClick={handleUploadClick}
                >
                  <Upload className="w-6 h-6 mr-2" />
                  <span>Upload Video</span>
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="video/mp4"
                  className="hidden"
                />
              </>
            ) : (
              <div className="w-full h-full flex flex-col">
                <div className="flex-grow relative">
                  <video
                    src={videoUrl}
                    controls
                    className="absolute inset-0 w-full h-full object-contain"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="flex justify-center space-x-4 mt-4">
                  <Button
                    onClick={() => {
                      setSelectedVideo(null);
                      setVideoUrl(null);
                    }}
                  >
                    Upload Another Video
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <ReviewSection />
      </div>
    </ProtectedRoute>
  );
}
