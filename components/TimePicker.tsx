"use client";

import { useState, useRef, useEffect } from "react";
import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type Props = {
  value?: string;
  onChange?: (time: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

export default function TimePicker({ 
  value,
  onChange,
  placeholder = "Sélectionner une heure",
  className,
  disabled = false,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(value || "");
  const pickerRef = useRef<HTMLDivElement>(null);

  const generateTimes = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const hourStr = hour.toString().padStart(2, "0");
        const minuteStr = minute.toString().padStart(2, "0");
        times.push(`${hourStr}:${minuteStr}`);
      }
    }
    return times;
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    if (onChange) onChange(time);
    setIsOpen(false);
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
        className={cn("flex w-full items-center justify-between rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-left text-sm text-neutral-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900",
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:bg-neutral-700"
        )}
      >
        {selectedTime ? (
          selectedTime
        ) : (
          <span className="text-neutral-500">{placeholder}</span>
        )}
        <BrandIcon name="clock" className="h-4 w-4 text-neutral-400" />
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-10 mt-2 w-full max-h-60 overflow-y-auto rounded-xl border border-neutral-700 bg-neutral-900 p-2 shadow-2xl">
          <div className="grid grid-cols-2 gap-1">
            {generateTimes().map((time) => (
              <button
                key={time}
                onClick={() => handleTimeChange(time)}
                className={cn("rounded-lg px-3 py-2 text-left text-sm transition",
                  selectedTime === time ? "bg-primary-500 text-white" : "text-neutral-300 hover:bg-neutral-800"
                )}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}