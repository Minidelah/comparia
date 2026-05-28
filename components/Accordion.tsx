"use client";

import { useState } from "react";
import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type AccordionItem = {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  icon?: string;
};

type Props = {
  items: AccordionItem[];
  className?: string;
  allowMultiple?: boolean;
};

export default function Accordion({ items, className, allowMultiple = false }: Props) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems(prev => 
        prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
      );
    } else {
      setOpenItems(prev => 
        prev.includes(id) ? [] : [id]
      );
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item) => (
        <div key={item.id} className="card-premium">
          <button
            onClick={() => toggleItem(item.id)}
            className="flex w-full items-center justify-between gap-4 p-4 text-left font-semibold text-white"
          >
            <div className="flex items-center gap-3">
              {item.icon && (
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-500/20 text-primary-300">
                  <BrandIcon name={item.icon} className="h-4 w-4" />
                </div>
              )}
              {item.title}
            </div>
            <div className={cn("flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-neutral-400 transition",
              openItems.includes(item.id) ? "rotate-180 bg-primary-500 text-white" : ""
            )}>
              <BrandIcon name="chevron-down" className="h-4 w-4" />
            </div>
          </button>

          {openItems.includes(item.id) && (
            <div className="px-4 pb-4">
              <div className="border-t border-neutral-800 pt-4 text-sm text-neutral-400">
                {item.content}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}