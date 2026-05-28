"use client";

import { useState, useRef, useEffect } from "react";
import BrandIcon from "@/components/BrandIcon";
import { cn, formatDate } from "@/lib/utils";
import Calendar from "@/components/Calendar";

type Props = {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

export default function DatePicker({ 
  value,
  onChange,
  placeholder = "Sélectionner une date",
  className,
  disabled = false,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    if (onChange) onChange(date);
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
        {selectedDate ? (
          formatDate(selectedDate)
        ) : (
          <span className="text-neutral-500">{placeholder}</span>
        )}
        <BrandIcon name="calendar" className="h-4 w-4 text-neutral-400" />
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-10 mt-2 w-full">
          <Calendar
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
      )}
    </div>
  );
}