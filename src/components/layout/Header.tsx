"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import {
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
  ChevronDown,
  Video,
  Mic,
  FileText,
  Image,
  Music,
  Code,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export function Header() {
  const { logout } = useAuth();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [showFeatures, setShowFeatures] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        featuresRef.current &&
        !featuresRef.current.contains(event.target as Node)
      ) {
        setShowFeatures(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [featuresRef]);

  const handleFeatureClick = (feature: string) => {
    setShowFeatures(false);
    router.push(`/features/${feature.toLowerCase()}`);
  };

  return (
    <header className="bg-background border-b dark:border-gray-700">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <h1 className="text-xl font-bold text-foreground">Composer</h1>

        <div className="relative" ref={featuresRef}>
          <Button
            variant="ghost"
            className="text-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={() => setShowFeatures(!showFeatures)}
          >
            Features{" "}
            <ChevronDown
              className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                showFeatures ? "rotate-180" : ""
              }`}
            />
          </Button>
          {showFeatures && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-background border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10 transition-opacity duration-200 opacity-100">
              <div className="p-2 grid grid-cols-2 gap-2">
                <FeatureItem
                  icon={<Video className="mr-2 h-4 w-4" />}
                  text="Video"
                  onClick={() => handleFeatureClick("Video")}
                />
                <FeatureItem
                  icon={<Mic className="mr-2 h-4 w-4" />}
                  text="Audio"
                  onClick={() => handleFeatureClick("Audio")}
                />
                <FeatureItem
                  icon={<FileText className="mr-2 h-4 w-4" />}
                  text="Text"
                  onClick={() => handleFeatureClick("Text")}
                />
                <FeatureItem
                  icon={<Image className="mr-2 h-4 w-4" />}
                  text="Image"
                  onClick={() => handleFeatureClick("Image")}
                />
                <FeatureItem
                  icon={<Music className="mr-2 h-4 w-4" />}
                  text="Music"
                  onClick={() => handleFeatureClick("Music")}
                />
                <FeatureItem
                  icon={<Code className="mr-2 h-4 w-4" />}
                  text="Code"
                  onClick={() => handleFeatureClick("Code")}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">Open user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    john@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

function FeatureItem({
  icon,
  text,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}) {
  return (
    <Button
      variant="ghost"
      className="w-full justify-start text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
      onClick={onClick}
    >
      {icon}
      {text}
    </Button>
  );
}
