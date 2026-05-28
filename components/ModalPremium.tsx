"use client";

import { useState, useEffect } from "react";
import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  overlayClassName?: string;
};

export default function ModalPremium({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  className,
  overlayClassName,
}: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !isMounted) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

  return (
    <div className={cn("fixed inset-0 z-50 flex items-center justify-center p-4", overlayClassName)}>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          "card-glass relative z-10 w-full rounded-2xl border border-neutral-700 p-6 shadow-2xl",
          sizeClasses[size],
          className
        )}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-neutral-400 transition hover:bg-neutral-700 hover:text-white"
          >
            <BrandIcon name="x" className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          {children}
        </div>

        {/* Close button for mobile */}
        <div className="lg:hidden">
          <Button onClick={onClose} variant="secondary" size="lg" className="w-full">
            Fermer
          </Button>
        </div>
      </div>
    </div>
  );
}