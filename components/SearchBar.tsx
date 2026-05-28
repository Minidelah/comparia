"use client";

import { useState, useEffect, useRef } from "react";
import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type Props = {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
  initialValue?: string;
};

export default function SearchBar({ 
  placeholder = "Rechercher...",
  onSearch,
  className,
  initialValue = "",
}: Props) {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchRef} className={cn("relative w-full max-w-md", className)}>
      <div className={cn("flex items-center gap-2 rounded-xl border bg-neutral-800 transition-all",
        isFocused ? "border-primary-500 ring-2 ring-primary-500/30" : "border-neutral-700"
      )}>
        <div className="pl-4">
          <BrandIcon name="search" className="h-5 w-5 text-neutral-400" />
        </div>

        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent py-3 pr-4 text-neutral-200 placeholder-neutral-500 focus:outline-none"
        />

        {query && (
          <button
            onClick={() => {
              setQuery("");
              onSearch("");
            }}
            className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-700 text-neutral-400 transition hover:bg-neutral-600"
          >
            <BrandIcon name="x" className="h-4 w-4" />
          </button>
        )}

        <button
          onClick={handleSearch}
          className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white transition hover:bg-primary-600"
        >
          <BrandIcon name="arrow-right" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}