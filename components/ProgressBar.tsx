import { cn } from "@/lib/utils";

type Props = {
  value: number;
  max?: number;
  className?: string;
  variant?: "primary" | "secondary" | "success" | "warning" | "danger";
  showLabel?: boolean;
};

export default function ProgressBar({ 
  value,
  max = 100,
  className,
  variant = "primary",
  showLabel = false,
}: Props) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const variantClasses = {
    primary: "bg-primary-500",
    secondary: "bg-secondary-500",
    success: "bg-success-500",
    warning: "bg-warning-500",
    danger: "bg-danger-500",
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-neutral-400">Progression</span>
          <span className="text-neutral-200 font-medium">{Math.round(percentage)}%</span>
        </div>
      )}

      <div className="relative h-3 w-full overflow-hidden rounded-full bg-neutral-800">
        <div
          className={cn("h-full rounded-full transition-all", variantClasses[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}