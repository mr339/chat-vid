# Initializing Internationalization in a Project

## 1. Install the `next-intl` package

- Don't proceed to the next step until the installation is completed by user, ask user to run the command in the terminal and wait for the user to complete the installation.

```bash
npm install next-intl
```

## 2. Create the `messages` folder

- Create a new folder named `messages` in the root path of the current project.
- Create two files `en.json` and `np.json` in the `messages` folder.
- Create the necessary translations of the content on `src/components/layout/Header.tsx` on the `en.json` and `np.json`

## 3. The following steps should be implemented in the `src/app/layout.tsx` file of the current project.

### 1. Importing Required Modules

First, import the necessary modules for internationalization and state management.

### 2. Function to Get Messages

Create an asynchronous function to dynamically import the JSON file containing translations for the specified locale.

### 3. State Initialization in RootLayout

Initialize the state variables for the current locale and the translation messages inside the `RootLayout` component

### 4. Fetching Messages on Component Mount

Use the `useEffect` hook to fetch the stored locale from `localStorage` or default to "en" on component mount. Then, fetch the corresponding messages inside the `RootLayout` component.

### 5. Function to Switch Language

Create a function to update the locale, store it in `localStorage`, and fetch the corresponding messages inside the `RootLayout` component.

### 6. Providing Internationalization Context

Wrap the application content with `NextIntlClientProvider` to provide the internationalization context using the `messages` and `locale` state variables inside the `LayoutContent` component.

### 7. Putting It All Together

Combine all the steps after which the `src/app/layout.tsx` should look like the following code snippet

```tsx
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
```

## 4. Handling Language Switching in Components

### 1. Create a function `switchLanguage: (locale: string) => void;` on `src/components/layout/Header.tsx` along with a dropdown to handle the switching of languages created in step 1 as shown in the following code snippet

```tsx
export function Header({
  switchLanguage,
}: {
  switchLanguage: (locale: string) => void;
}) {
```

### 2. Don't change the content of the `Header.tsx` file

### 3. Use the `useTranslations` and `useLocale` hook to get the translations for the current locale on the current content of the `Header.tsx` as shown in the following code snippet

```tsx
const t = useTranslations("Header");
const locale = useLocale();
```

### 4. Create a button to switch the language on the current content of the `Header.tsx` as shown in the following code snippet inside the div with class `flex items-center space-x-4` . Don't import DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem because they are already imported in the file.

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button
      variant="ghost"
      size="icon"
      className="text-foreground hover:bg-accent hover:text-accent-foreground"
    >
      {locale === "en" ? "EN" : "NP"}
      <span className="sr-only">{t("switchLanguage")}</span>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent
    align="end"
    className="bg-background border border-border"
  >
    <DropdownMenuItem
      onClick={() => switchLanguage("en")}
      className="cursor-pointer"
    >
      English
    </DropdownMenuItem>
    <DropdownMenuItem
      onClick={() => switchLanguage("np")}
      className="cursor-pointer"
    >
      नेपाली (Nepali)
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### 5. Use `const t = useTranslations("Header");` to do the relevant changes on `src/components/layout/Header.tsx` for the translations.

### 6. Add translations for all relevant texts on `src/components/layout/Header.tsx` file along with changes on the `src/components/layout/Header.tsx` file for those texts.

## 5. Remember the following points

- Remember to create the `messages/en.json` and `messages/np.json` files with the appropriate translations.
- Remember to stop at step 1 ONLY if the installation is not completed by user.
- Remember to not do double imports of shadcn components if already imported in the file.
- Remember to code snippets exactly where told to do so.
- Remember to add the necessary translations on `messages/en.json` and `messages/np.json` files as per the prompts.
- Remember not to change the content of the `Header.tsx` file explicitly.
- Remember to change code to apply the translations to relevant contents in `src/components/layout/Header.tsx`
- Ensure all of the steps are followed correctly before applying any changes to the code.
