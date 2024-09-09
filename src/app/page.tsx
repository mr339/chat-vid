"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="container mx-auto mt-8 bg-white text-gray-900">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Landing Page</h1>
      <p>
        Please{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          login
        </Link>{" "}
        or{" "}
        <Link href="/signup" className="text-blue-600 hover:underline">
          sign up
        </Link>{" "}
        to access the dashboard.
      </p>
    </div>
  );
}
