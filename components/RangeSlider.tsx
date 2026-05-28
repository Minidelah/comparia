"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
  className?: string;
  disabled?: boolean;
};

export default function RangeSlider({ 
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  className,
  disabled = false,
}: Props) {
  const [sliderValue, setSliderValue] = useState(value || min);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setSliderValue(newValue);
    if (onChange) onChange(newValue);
  };

  const percentage = ((sliderValue - min) / (max - min)) * 100;

  return (
    <div className={cn("space-y-2", className)}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={sliderValue}
        onChange={handleChange}
        disabled={disabled}
        className={cn("h-2 w-full cursor-pointer appearance-none rounded-full bg-neutral-800",
          disabled ? "cursor-not-allowed opacity-60" : ""
        )}
        style={{ 
          background: `linear-gradient(to right, var(--primary-500) 0%, var(--primary-500) ${percentage}%, var(--neutral-700) ${percentage}%, var(--neutral-700) 100%)`
        }}
      />

      <div className="flex justify-between text-sm">
        <span className="text-neutral-500">{min}</span>
        <span className="font-medium text-primary-400">{sliderValue}</span>
        <span className="text-neutral-500">{max}</span>
      </div>
    </div>
  );
}