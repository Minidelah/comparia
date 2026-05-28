"use client";

import { useState } from "react";
import BrandIcon from "@/components/BrandIcon";
import { cn, formatDate } from "@/lib/utils";

type Props = {
  value?: Date;
  onChange?: (date: Date) => void;
  className?: string;
};

export default function Calendar({ value = new Date(), onChange, className }: Props) {
  const [currentDate, setCurrentDate] = useState(value);
  const [selectedDate, setSelectedDate] = useState(value);

  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const prevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
    if (onChange) onChange(newDate);
  };

  const renderDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentDate);
    const startingDay = firstDayOfMonth(currentDate);

    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10" />);
    }

    // Days of the month
    for (let day = 1; day <= totalDays; day++) {
      const isSelected = selectedDate.getDate() === day && 
                        selectedDate.getMonth() === currentDate.getMonth() &&
                        selectedDate.getFullYear() === currentDate.getFullYear();

      const isToday = new Date().getDate() === day &&
                     new Date().getMonth() === currentDate.getMonth() &&
                     new Date().getFullYear() === currentDate.getFullYear();

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={cn("h-10 w-10 rounded-full text-sm transition",
            isSelected ? "bg-primary-500 text-white" :
            isToday ? "bg-primary-500/20 text-primary-300" :
            "text-neutral-300 hover:bg-neutral-800"
          )}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className={cn("w-full max-w-sm", className)}>
      <div className="card-premium">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-neutral-400 transition hover:bg-neutral-700"
          >
            <BrandIcon name="chevron-left" className="h-4 w-4" />
          </button>

          <h3 className="font-bold text-white">
            {formatDate(currentDate, { month: "long", year: "numeric" })}
          </h3>

          <button
            onClick={nextMonth}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-neutral-400 transition hover:bg-neutral-700"
          >
            <BrandIcon name="chevron-right" className="h-4 w-4" />
          </button>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-neutral-500 mb-2">
          {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(day => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-1">
          {renderDays()}
        </div>
      </div>
    </div>
  );
}