"use client";

import { useState } from "react";
import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type Props = {
  value?: number;
  max?: number;
  onChange?: (value: number) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  readOnly?: boolean;
};

export default function StarRating({ 
  value = 0,
  max = 5,
  onChange,
  className,
  size = "md",
  readOnly = false,
}: Props) {
  const [rating, setRating] = useState(value);
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const handleClick = (starValue: number) => {
    if (!readOnly) {
      setRating(starValue);
      if (onChange) onChange(starValue);
    }
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= (hoverRating || rating);

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => !readOnly && setHoverRating(starValue)}
            onMouseLeave={() => !readOnly && setHoverRating(0)}
            disabled={readOnly}
            className={cn("transition", readOnly ? "cursor-default" : "cursor-pointer")}
          >
            <BrandIcon
              name={isFilled ? "star" : "star"}
              className={cn(
                sizeClasses[size],
                isFilled ? "text-amber-400" : "text-amber-600/50"
              )}
            />
          </button>
        );
      })}

      {!readOnly && (
        <span className={cn("ml-2 font-medium",
          size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base"
        )}>
          {rating.toFixed(1)}/{max}
        </span>
      )}
    </div>
  );
}