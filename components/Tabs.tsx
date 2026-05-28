"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type TabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: string;
  disabled?: boolean;
};

type Props = {
  items: TabItem[];
  defaultActiveId?: string;
  className?: string;
  variant?: "default" | "pills" | "underline";
};

export default function Tabs({ 
  items,
  defaultActiveId,
  className,
  variant = "default",
}: Props) {
  const [activeId, setActiveId] = useState(defaultActiveId || items[0]?.id);

  const activeItem = items.find(item => item.id === activeId);

  const variantClasses = {
    default: {
      tab: "border-b-2 border-transparent text-neutral-400 hover:text-neutral-200",
      activeTab: "border-b-2 border-primary-500 text-primary-300",
      container: "border-b border-neutral-800",
    },
    pills: {
      tab: "bg-neutral-800 text-neutral-400 hover:bg-neutral-700",
      activeTab: "bg-primary-500 text-white",
      container: "",
    },
    underline: {
      tab: "border-b-2 border-transparent text-neutral-400 hover:text-neutral-200",
      activeTab: "border-b-2 border-primary-500 text-primary-300",
      container: "",
    },
  };

  const classes = variantClasses[variant];

  return (
    <div className={cn("space-y-4", className)}>
      <div className={cn("flex gap-2 overflow-x-auto pb-2", classes.container)}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => !item.disabled && setActiveId(item.id)}
            disabled={item.disabled}
            className={cn("whitespace-nowrap px-4 py-2 text-sm font-medium transition",
              classes.tab,
              activeId === item.id ? classes.activeTab : "",
              item.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            )}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-4">
        {activeItem?.content}
      </div>
    </div>
  );
}