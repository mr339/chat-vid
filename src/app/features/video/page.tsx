"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Download } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

export default function VideoFeature() {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isFFmpegLoaded, setIsFFmpegLoaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ffmpegRef = useRef<FFmpeg | null>(null);

  useEffect(() => {
    const loadFFmpeg = async () => {
      const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
      const ffmpeg = new FFmpeg();
      ffmpegRef.current = ffmpeg;
      await ffmpeg.load({
        coreURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.js`,
          "text/javascript"
        ),
        wasmURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.wasm`,
          "application/wasm"
        ),
      });
      setIsFFmpegLoaded(true);
    };
    loadFFmpeg();
  }, []);

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

  const handleTranscribe = async () => {
    if (!selectedVideo || !ffmpegRef.current) return;
    setIsTranscribing(true);

    try {
      const ffmpeg = ffmpegRef.current;
      await ffmpeg.writeFile("input.mp4", await fetchFile(selectedVideo));

      // Extract audio
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

      // Read the WAV file
      const audioData = await ffmpeg.readFile("output.wav");
      const audioBlob = new Blob([audioData], { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);

      // Use Web Speech API for transcription
      const recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setTranscription(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Error during transcription:", event.error);
        setIsTranscribing(false);
      };

      recognition.onend = () => {
        setIsTranscribing(false);
      };

      const audio = new Audio(audioUrl);
      audio.oncanplaythrough = () => {
        recognition.start();
        audio.play();
      };
    } catch (error) {
      console.error("Error during transcription:", error);
      alert("An error occurred during transcription. Please try again.");
      setIsTranscribing(false);
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
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-background p-4">
        <Card
          className={`shadow-2xl overflow-hidden ${
            videoUrl ? "w-[80vw] h-[80vh]" : "w-[60vw] h-[60vh]"
          } transition-all duration-300`}
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
                    ref={videoRef}
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
                    onClick={handleTranscribe}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={isTranscribing || !isFFmpegLoaded}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    {isTranscribing ? "Transcribing..." : "Transcribe"}
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
                {transcription && (
                  <div className="mt-4 p-4 bg-gray-100 rounded-md">
                    <h3 className="font-bold mb-2">Transcription:</h3>
                    <p>{transcription}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
