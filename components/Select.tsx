"use client";

import { useState, useRef, useEffect } from "react";
import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type Option = {
  value: string;
  label: string;
  disabled?: boolean;
};

type Props = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

export default function Select({ 
  options,
  value,
  onChange,
  placeholder = "Sélectionner une option",
  className,
  disabled = false,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn("flex w-full items-center justify-between rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-left text-sm text-neutral-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900",
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:bg-neutral-700"
        )}
      >
        {selectedOption ? selectedOption.label : placeholder}
        <BrandIcon name="chevron-down" className="h-4 w-4 text-neutral-400" />
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-10 mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-900 shadow-2xl focus:outline-none">
          <div className="max-h-60 overflow-auto p-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                disabled={option.disabled}
                className={cn("flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-neutral-300 transition hover:bg-neutral-800",
                  option.value === value ? "bg-primary-500/20 text-primary-300" : "",
                  option.disabled ? "cursor-not-allowed opacity-60" : ""
                )}
              >
                {option.label}
                {option.value === value && (
                  <BrandIcon name="check" className="h-4 w-4 ml-auto text-primary-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}