


"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react"; // ✅ Import eye icons

interface PINInputProps {
  length?: number;
  onChange: (pin: string) => void;
  error?: string;
  initialValue?: string;
  labels: string;
  className?: string;
}

export default function PINInput({
  length = 4,
  labels,
  onChange,
  error,
  initialValue = "",
  className,
}: PINInputProps) {
  const [pin, setPin] = useState<string[]>(Array(length).fill(""));
  const [isVisible, setIsVisible] = useState<boolean>(false); // ✅ State to toggle visibility
  const inputRefs = useRef<(HTMLInputElement | null)[]>(new Array(length).fill(null));

  useEffect(() => {
    if (initialValue.length === length) {
      setPin(initialValue.split(""));
    }
  }, [initialValue, length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (/^\d?$/.test(value)) { // Only allow a single digit (0-9)
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);
      onChange(newPin.join(""));

      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && pin[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className={`flex flex-col gap-2 relative ${className}`}>
      {/* Label with Eye Icon */}
      <div className="flex items-center justify-between max-w-56">
        <label className="block font-medium text-sm mb-1">{labels}</label>
        <button
          type="button"
          onClick={() => setIsVisible(!isVisible)}
          className="text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* PIN Inputs */}
      <div className="flex gap-2">
        {pin.map((digit, index) => (
          <Input
            key={index}
            type={isVisible ? "text" : "password"} // ✅ Toggle visibility
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            className={cn(
              "text-center text-xl font-bold w-12 h-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
              error ? "border-red-500 focus:ring-red-500" : ""
            )}
          />
        ))}
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
