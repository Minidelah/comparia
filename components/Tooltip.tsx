"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
};

export default function Tooltip({ content, children, position = "top", className }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      {isVisible && (
        <div
          className={cn("absolute z-50 whitespace-nowrap rounded-lg bg-neutral-900 px-3 py-2 text-xs text-neutral-200 shadow-2xl",
            positionClasses[position],
            className
          )}
        >
          {content}
          <div
            className={cn("absolute h-2 w-2 rotate-45 bg-neutral-900",
              position === "top" ? "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" :
              position === "bottom" ? "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" :
              position === "left" ? "right-0 top-1/2 -translate-y-1/2 translate-x-1/2" :
              "left-0 top-1/2 -translate-y-1/2 -translate-x-1/2"
            )}
          />
        </div>
      )}
    </div>
  );
}