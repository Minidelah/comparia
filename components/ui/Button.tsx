"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary-500 hover:bg-primary-600 text-white shadow-md hover:shadow-lg",
        primary: "bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white shadow-lg hover:shadow-xl",
        secondary: "bg-neutral-800 hover:bg-neutral-700 text-neutral-100 border border-neutral-700",
        outline: "bg-transparent hover:bg-neutral-900 border border-neutral-700 text-neutral-200",
        ghost: "bg-transparent hover:bg-neutral-900 text-neutral-200",
        success: "bg-success-500 hover:bg-success-600 text-white",
        warning: "bg-warning-500 hover:bg-warning-600 text-white",
        danger: "bg-danger-500 hover:bg-danger-600 text-white",
      },
      size: {
        default: "px-6 py-3 text-sm",
        sm: "px-4 py-2 text-xs",
        lg: "px-8 py-4 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
export { buttonVariants };
