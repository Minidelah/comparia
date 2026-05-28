"use client";

import { useState, useRef, useEffect } from "react";
import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type Props = {
  value?: string;
  onChange?: (color: string) => void;
  className?: string;
  disabled?: boolean;
};

export default function ColorPicker({ 
  value = "#000000",
  onChange,
  className,
  disabled = false,
}: Props) {
  const [color, setColor] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    if (onChange) onChange(newColor);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={pickerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn("flex h-10 w-10 items-center justify-center rounded-lg border-2 border-neutral-700",
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
        )}
        style={{ backgroundColor: color }}
      >
        {!color && <BrandIcon name="palette" className="h-5 w-5 text-neutral-400" />}
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-10 mt-2 w-64 rounded-xl border border-neutral-700 bg-neutral-900 p-4 shadow-2xl">
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
            className="h-48 w-full cursor-pointer border-none bg-transparent p-0"
          />
          <div className="mt-3 flex items-center gap-2">
            <input
              type="text"
              value={color}
              onChange={handleColorChange}
              className="flex-1 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-neutral-200"
            />
            <button
              onClick={() => {
                setColor("#000000");
                if (onChange) onChange("#000000");
              }}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-700 text-neutral-400 transition hover:bg-neutral-600"
            >
              <BrandIcon name="x" className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}