"use client";

import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function Input({ label, className = "", ...rest }: Props) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      {label && <span className="text-gray-300">{label}</span>}
      <input
        className={`px-4 py-3 rounded-xl bg-white/3 border border-white/10 text-white placeholder:opacity-60 ${className}`}
        {...rest}
      />
    </label>
  );
}
