"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { useState, useEffect } from "react";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

async function getMessages(locale: string) {
  return (await import(`../../messages/${locale}.json`)).default;
}

function LayoutContent({
  children,
  messages,
  locale,
  switchLanguage,
}: {
  children: React.ReactNode;
  messages: any;
  locale: string;
  switchLanguage: (newLocale: string) => void;
}) {
  const { isLoggedIn } = useAuth();
  const pathname = usePathname();

  const isAuthPage =
    pathname === "/login" || pathname === "/" || pathname === "/signup";

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {isAuthPage ? (
            children
          ) : (
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {isLoggedIn && <Header switchLanguage={switchLanguage} />}
              {children}
            </ThemeProvider>
          )}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState("en");
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const storedLocale = localStorage.getItem("locale") || "en";
    setLocale(storedLocale);
    getMessages(storedLocale).then(setMessages);
  }, []);

  const switchLanguage = (newLocale: string) => {
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
    getMessages(newLocale).then(setMessages);
  };

  return (
    <AuthProvider>
      <LayoutContent
        messages={messages}
        locale={locale}
        switchLanguage={switchLanguage}
      >
        {React.Children.map(children, (child) =>
          React.cloneElement(child as React.ReactElement, { switchLanguage })
        )}
      </LayoutContent>
    </AuthProvider>
  );
}
