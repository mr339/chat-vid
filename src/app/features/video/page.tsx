"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Download } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import ReviewSection from "@/components/review/ReviewSection";

export default function VideoFeature() {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [isDeciphering, setIsDeciphering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ffmpegRef = useRef(new FFmpeg());

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.11.0/dist/umd";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => console.log(message));
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
  };

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

  const handleDecipher = async () => {
    if (!selectedVideo) return;
    setIsDeciphering(true);

    try {
      // Extract audio
      const ffmpeg = ffmpegRef.current;
      await ffmpeg.writeFile("input.mp4", await fetchFile(selectedVideo));
      await ffmpeg.exec([
        "-i",
        "input.mp4",
        "-vn",
        "-acodec",
        "pcm_s16le",
        "-ar",
        "16000",
        "-ac",
        "1",
        "output.wav",
      ]);
      const data = await ffmpeg.readFile("output.wav");
      const audioBlob = new Blob([data], { type: "audio/wav" });

      // Send audio to server for transcription
      const formData = new FormData();
      formData.append("audio", audioBlob, "audio.wav");

      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Transcription failed");
      }

      const result = await response.json();
      setTranscription(result.text);
    } catch (error) {
      console.error("Error during deciphering:", error);
      alert("An error occurred during deciphering. Please try again.");
    } finally {
      setIsDeciphering(false);
    }
  };

  const handleDownloadTranscription = () => {
    if (!transcription) return;

    const blob = new Blob([transcription], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transcription.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
                      setTranscription(null);
                    }}
                  >
                    Upload Another Video
                  </Button>
                  <Button
                    onClick={handleDecipher}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={isDeciphering}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    {isDeciphering ? "Deciphering..." : "Decipher"}
                  </Button>
                  {transcription && (
                    <Button
                      onClick={handleDownloadTranscription}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Transcription
                    </Button>
                  )}
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
