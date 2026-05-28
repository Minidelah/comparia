import { cn } from "@/lib/utils";

type Props = {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  variant?: "primary" | "secondary" | "success" | "warning" | "danger";
  showValue?: boolean;
};

export default function ProgressCircle({ 
  value,
  max = 100,
  size = 64,
  strokeWidth = 6,
  className,
  variant = "primary",
  showValue = true,
}: Props) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const variantClasses = {
    primary: "text-primary-500",
    secondary: "text-secondary-500",
    success: "text-success-500",
    warning: "text-warning-500",
    danger: "text-danger-500",
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90 transform">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-neutral-800"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn("transition-all duration-500 ease-in-out", variantClasses[variant])}
        />
      </svg>

      {showValue && (
        <div className="absolute text-center">
          <span className={cn("font-bold", variantClasses[variant])}>
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
}