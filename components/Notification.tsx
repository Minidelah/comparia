import { useState, useEffect } from "react";
import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type Props = {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  onDismiss?: () => void;
  className?: string;
};

export default function Notification({
  message,
  type = "info",
  duration = 5000,
  onDismiss,
  className,
}: Props) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onDismiss) onDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  if (!isVisible) return null;

  const typeClasses = {
    success: {
      bg: "bg-success-500/20",
      border: "border-success-500/30",
      text: "text-success-300",
      icon: "check-circle",
    },
    error: {
      bg: "bg-danger-500/20",
      border: "border-danger-500/30",
      text: "text-danger-300",
      icon: "alert-triangle",
    },
    warning: {
      bg: "bg-warning-500/20",
      border: "border-warning-500/30",
      text: "text-warning-300",
      icon: "alert-circle",
    },
    info: {
      bg: "bg-info-500/20",
      border: "border-info-500/30",
      text: "text-info-300",
      icon: "info",
    },
  };

  const classes = typeClasses[type];

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 w-80 rounded-2xl border p-4 shadow-2xl shadow-black/30",
        classes.bg,
        classes.border,
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl", classes.bg, classes.text)}>
          <BrandIcon name={classes.icon} className="h-5 w-5" />
        </div>

        <div className="flex-1">
          <p className={cn("text-sm", classes.text)}>{message}</p>
        </div>

        <button
          onClick={() => {
            setIsVisible(false);
            if (onDismiss) onDismiss();
          }}
          className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-400 transition hover:bg-neutral-800", classes.text)}
        >
          <BrandIcon name="x" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}