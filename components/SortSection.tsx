"use client";

import { useState } from "react";
import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type SortOption = {
  value: string;
  label: string;
  icon?: string;
};

type Props = {
  sortOptions: SortOption[];
  defaultSort: string;
  onSortChange: (sortValue: string) => void;
  className?: string;
  variant?: "dropdown" | "pills";
};

export default function SortSection({
  sortOptions,
  defaultSort,
  onSortChange,
  className,
  variant = "dropdown",
}: Props) {
  const [selectedSort, setSelectedSort] = useState(defaultSort);
  const [isOpen, setIsOpen] = useState(false);

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    setIsOpen(false);
    onSortChange(value);
  };

  const selectedOption = sortOptions.find((option) => option.value === selectedSort);

  if (variant === "pills") {
    return (
      <section className={cn(className)}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Trier
          </span>
          {sortOptions.map((option) => {
            const isActive = selectedSort === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSortChange(option.value)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition",
                  isActive
                    ? "border-cyan-400/40 bg-cyan-400/15 text-cyan-100"
                    : "border-white/10 bg-white/[0.04] text-neutral-300 hover:border-white/20",
                )}
              >
                {option.icon && <BrandIcon name={option.icon} className="h-3.5 w-3.5" />}
                {option.label}
              </button>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section className={cn("px-5 py-4 sm:px-8 lg:px-10", className)}>
      <div className="mx-auto max-w-7xl">
        <div className="relative inline-block text-left">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex w-full items-center justify-between gap-2 rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-sm font-medium text-neutral-200 shadow-sm hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
          >
            {selectedOption?.icon && (
              <BrandIcon name={selectedOption.icon} className="h-4 w-4 text-neutral-400" />
            )}
            {selectedOption?.label || "Trier par"}
            <BrandIcon name="chevron-down" className="h-4 w-4 text-neutral-400" />
          </button>

          {isOpen && (
            <div className="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-xl border border-neutral-700 bg-neutral-900 shadow-2xl focus:outline-none">
              <div className="py-1">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSortChange(option.value)}
                    className={cn(
                      "flex w-full items-center gap-3 px-4 py-3 text-sm text-neutral-300 hover:bg-neutral-800",
                      selectedSort === option.value ? "bg-primary-500/20 text-primary-300" : "",
                    )}
                  >
                    {option.icon && <BrandIcon name={option.icon} className="h-4 w-4" />}
                    {option.label}
                    {selectedSort === option.value && (
                      <BrandIcon name="check" className="ml-auto h-4 w-4 text-primary-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
