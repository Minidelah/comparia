"use client";

import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export default function Button({ variant = "primary", className = "", children, ...rest }: Props) {
  const base = "px-6 py-3 rounded-2xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";
  const styles =
    variant === "primary"
      ? "bg-blue-600 hover:bg-blue-500 text-white ring-blue-600/30"
      : "bg-white/5 hover:bg-white/10 text-white border border-white/10";

  return (
    <button className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </button>
  );
}
