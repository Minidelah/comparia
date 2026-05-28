"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
};

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  {
    id,
    type = "text",
    value,
    onChange,
    placeholder,
    className,
    disabled = false,
    error = false,
    prefix,
    suffix,
  },
  ref
) {
  return (
    <div className="relative">
      {prefix && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {prefix}
        </div>
      )}

      <input
        id={id}
        ref={ref}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "block w-full rounded-xl border bg-neutral-800 p-3 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900",
          disabled ? "cursor-not-allowed opacity-60" : "",
          error ? "border-danger-500 focus:ring-danger-500" : "border-neutral-700 hover:border-neutral-600",
          prefix ? "pl-10" : "",
          suffix ? "pr-10" : "",
          className
        )}
      />

      {suffix && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          {suffix}
        </div>
      )}
    </div>
  );
});

Input.displayName = "Input";