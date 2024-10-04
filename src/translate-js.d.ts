declare module "@vitalets/google-translate-api" {
  interface TranslateOptions {
    to: string;
    from?: string;
  }

  interface TranslateResult {
    text: string;
    from: {
      language: {
        iso: string;
      };
    };
  }

  export function translate(
    text: string,
    options: TranslateOptions
  ): Promise<TranslateResult>;
}
