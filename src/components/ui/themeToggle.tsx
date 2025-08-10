"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";

  const handleToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <button
      onClick={() => handleToggle(!isDarkMode)}
      className={`relative flex sm:h-8 h-7 sm:w-16 w-14 items-center rounded-full p-1 transition-all
        ${isDarkMode ? "bg-blue-600" : "bg-gray-300"}
      `}
    >
      {/* Sun Icon (Left Side) */}
      <Sun
        className={`absolute right-2 h-4 w-4 transition-opacity text-black ${
          isDarkMode ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Moon Icon (Right Side) */}
      <Moon
        className={`absolute left-2 h-4 w-4 transition-opacity text-white ${
          isDarkMode ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Moving Switch Knob */}
      <span
        className={`absolute left-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-transform ${
          isDarkMode ? "translate-x-8" : "translate-x-0"
        }`}
      ></span>
    </button>
  );
}
