"use client";

import { useTheme } from "@/components/ui/theme-provider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 transition-all"
    >
      {theme === "light" ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
    </button>
  );
}
