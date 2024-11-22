"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const FloatingThemeToggle = ({
  position = "top-right",
  className,
}: {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: "string";
}) => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const positionClass = () => {
    switch (position) {
      case "top-left":
        return "top-1 left-1";
      case "top-right":
        return "top-1 right-1";
      case "bottom-left":
        return "bottom-1 left-1";
      case "bottom-right":
        return "bottom-1 right-1";
      default:
        return "top-1 left-1";
    }
  };

  return (
    <div className={cn("absolute", positionClass(), className)}>
      <Button
        variant="ghost"
        onClick={() => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
        }}
        className="rounded-full p-4 border"
      >
        {mounted ? (
          resolvedTheme === "dark" ? (
            <Sun />
          ) : (
            <Moon />
          )
        ) : (
          <div className="w-6 h-6 bg-gray-600 dark:bg-gray-400 rounded-full animate-pulse" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
};
