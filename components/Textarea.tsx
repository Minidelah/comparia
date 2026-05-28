import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  rows?: number;
  disabled?: boolean;
  error?: boolean;
};

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(function Textarea(
  {
    id,
    value,
    onChange,
    placeholder,
    className,
    rows = 4,
    disabled = false,
    error = false,
  },
  ref
) {
  return (
    <textarea
      id={id}
      ref={ref}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      className={cn(
        "block w-full rounded-xl border bg-neutral-800 p-3 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900",
        disabled ? "cursor-not-allowed opacity-60" : "",
        error ? "border-danger-500 focus:ring-danger-500" : "border-neutral-700 hover:border-neutral-600",
        className
      )}
    />
  );
});

Textarea.displayName = "Textarea";