"use client";

import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";

interface ClientLayoutProps {
  children: React.ReactNode;
  switchLanguage: (locale: string) => void;
}

export default function ClientLayout({
  children,
  switchLanguage,
}: ClientLayoutProps) {
  const { isLoggedIn } = useAuth();
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/signup";

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <>
      {isLoggedIn && <Header switchLanguage={switchLanguage} />}
      {children}
    </>
  );
}
