"use client";

import { Header } from "@/components/layout/Header";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";
import "./globals.css";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

function ErrorFallback({ error }: FallbackProps) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AuthProvider>
              {mounted && (
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-grow">{children}</main>
                </div>
              )}
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
