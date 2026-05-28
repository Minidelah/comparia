"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
};

export default function Toggle({ 
  options,
  value,
  onChange,
  className,
  disabled = false,
}: Props) {
  const [selectedValue, setSelectedValue] = useState(value || options[0]?.value);

  const handleOptionClick = (optionValue: string) => {
    if (!disabled) {
      setSelectedValue(optionValue);
      if (onChange) onChange(optionValue);
    }
  };

  return (
    <div className={cn("flex rounded-xl border border-neutral-700 bg-neutral-800 p-1", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleOptionClick(option.value)}
          disabled={disabled}
          className={cn("flex-1 rounded-lg px-4 py-2 text-sm font-medium transition",
            selectedValue === option.value ? "bg-white text-neutral-900 shadow" : "text-neutral-300 hover:bg-neutral-700",
            disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}