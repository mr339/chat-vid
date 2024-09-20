# Initializing Internationalization in a Project

## 1. Create the `messages` folder

Create a new folder named `messages` in the root path of the current project with two files en.json and np.json.

- All the following steps should be implemented in the `src/app/layout.tsx` file of the current project.

### 1. Importing Required Modules

First, import the necessary modules for internationalization and state management.

```tsx
typescript;
import { NextIntlClientProvider } from "next-intl";
import { useState, useEffect } from "react";
```

### 2. Function to Get Messages

Create an asynchronous function to dynamically import the JSON file containing translations for the specified locale.

```tsx
async function getMessages(locale: string) {
return (await import(../../messages/${locale}.json)).default;
}
```

### 3. State Initialization in RootLayout

Initialize the state variables for the current locale and the translation messages.

```tsx
const [locale, setLocale] = useState("en");
const [messages, setMessages] = useState({});
```

### 4. Fetching Messages on Component Mount

Use the `useEffect` hook to fetch the stored locale from `localStorage` or default to "en" on component mount. Then, fetch the corresponding messages.

```tsx
useEffect(() => {
  const storedLocale = localStorage.getItem("locale") || "en";
  setLocale(storedLocale);
  getMessages(storedLocale).then(setMessages);
}, []);
```

### 5. Function to Switch Language

Create a function to update the locale, store it in `localStorage`, and fetch the corresponding messages.

```tsx
const switchLanguage = (newLocale: string) => {
  setLocale(newLocale);
  localStorage.setItem("locale", newLocale);
  getMessages(newLocale).then(setMessages);
};
```

### 6. Providing Internationalization Context

Wrap the application content with `NextIntlClientProvider` to provide the internationalization context using the `messages` and `locale` state variables.

```tsx
<NextIntlClientProvider messages={messages} locale={locale}>
  {children}
</NextIntlClientProvider>
```

### 7. Putting It All Together in RootLayout

Combine all the steps in the `RootLayout` component to manage the internationalization setup.

```tsx
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
