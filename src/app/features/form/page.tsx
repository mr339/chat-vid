"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import ProtectedRoute from "@/components/ProtectedRoute";
import { SignUpFormComponent } from "@/components/sign-up-form";

export default function FormFeature() {
  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center min-h-screen bg-background py-4">
        <Card className="shadow-2xl overflow-hidden w-full max-w-4xl transition-all duration-300 mb-8">
          <CardContent className="p-6">
            <SignUpFormComponent />
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
