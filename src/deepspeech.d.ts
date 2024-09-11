declare module "deepspeech" {
  export class Model {
    constructor(modelPath: string);
    enableExternalScorer(scorerPath: string): void;
    stt(buffer: Int16Array): string;
  }
}
