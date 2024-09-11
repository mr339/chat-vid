"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
  Image as ImageIcon,
  Music,
  Code,
  Bell,
  HelpCircle,
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

  const handleFeatureClick = (feature: string) => {
    setShowFeatures(false);
    router.push(`/features/${feature.toLowerCase()}`);
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

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link
          href="/dashboard"
          className="text-xl font-bold text-foreground hover:text-accent-foreground transition-colors"
        >
          Composer
        </Link>

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
                  icon={<ImageIcon className="mr-2 h-4 w-4" />}
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
                className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64 p-2 mt-2 bg-background/95 backdrop-blur-sm"
              align="end"
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex items-center space-x-3 p-2">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs text-muted-foreground">
                      john@example.com
                    </p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-2 hover:bg-accent/50 rounded-md cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-2 hover:bg-accent/50 rounded-md cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-2 hover:bg-accent/50 rounded-md cursor-pointer">
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-2 hover:bg-accent/50 rounded-md cursor-pointer">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="p-2 hover:bg-accent/50 rounded-md text-red-500 hover:text-red-600 cursor-pointer"
                onClick={handleLogout}
              >
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
