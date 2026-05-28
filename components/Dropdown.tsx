"use client";

import { useState, useRef, useEffect } from "react";
import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type DropdownItem = {
  label: string;
  value: string;
  icon?: string;
  onClick?: () => void;
};

type Props = {
  trigger: React.ReactNode;
  items: DropdownItem[];
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  className?: string;
};

export default function Dropdown({ trigger, items, position = "bottom-right", className }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const positionClasses = {
    "bottom-left": "top-full left-0 mt-1",
    "bottom-right": "top-full right-0 mt-1",
    "top-left": "bottom-full left-0 mb-1",
    "top-right": "bottom-full right-0 mb-1",
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div className={cn("absolute z-50 min-w-[160px] rounded-xl border border-neutral-700 bg-neutral-900 p-2 shadow-2xl",
          positionClasses[position],
          className
        )}>
          <div className="grid gap-1">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  if (item.onClick) item.onClick();
                  setIsOpen(false);
                }}
                className={cn("flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-neutral-300 transition hover:bg-neutral-800",
                  item.onClick ? "cursor-pointer" : "cursor-default opacity-60"
                )}
              >
                {item.icon && <BrandIcon name={item.icon} className="h-4 w-4" />}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}