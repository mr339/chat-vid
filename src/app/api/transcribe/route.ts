import { NextRequest, NextResponse } from "next/server";
import { Model } from "deepspeech";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const data = await req.arrayBuffer();
    if (!data || data.byteLength === 0) {
      throw new Error("No audio data received");
    }

    const audioBuffer = new Int16Array(data);

    // Log the audio buffer details
    console.log("Audio buffer received. Length:", audioBuffer.length);

    const modelPath = path.join(process.cwd(), "path/to/model.pbmm");
    const scorerPath = path.join(process.cwd(), "path/to/scorer.scorer");

    console.log("Loading DeepSpeech model from:", modelPath);
    console.log("Loading DeepSpeech scorer from:", scorerPath);

    const model = new Model(modelPath);
    model.enableExternalScorer(scorerPath);

    console.log("Model loaded successfully. Starting transcription...");

    const transcription = model.stt(audioBuffer);

    console.log("Transcription completed:", transcription);

    return NextResponse.json({ transcription });
  } catch (error: any) {
    console.error("Error during transcription:", error);
    return NextResponse.json(
      { error: `Error during transcription: ${error.message}` },
      { status: 500 }
    );
  }
}
