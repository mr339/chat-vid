declare module "@ffmpeg/ffmpeg" {
  export class FFmpeg {
    load(options?: { coreURL?: string; wasmURL?: string }): Promise<void>;
    writeFile(name: string, data: Uint8Array): Promise<void>;
    readFile(name: string): Promise<Uint8Array>;
    exec(command: string[]): Promise<void>;
  }
}

declare module "@ffmpeg/util" {
  export function fetchFile(file: File | string): Promise<Uint8Array>;
  export function toBlobURL(url: string, type: string): Promise<string>;
}
