import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  icon?: string;
  className?: string;
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "outline" | "info";
  size?: "sm" | "md" | "lg";
};

export default function Badge({ label, icon, className, variant = "default", size = "md" }: Props) {
  
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  const variantClasses = {
    default: "bg-neutral-800 text-neutral-200",
    primary: "bg-primary-500 text-white",
    secondary: "bg-secondary-500 text-white",
    success: "bg-success-500 text-white",
    warning: "bg-warning-500 text-white",
    danger: "bg-danger-500 text-white",
    info: "bg-info-500/20 text-info-200 border border-info-500/30",
    outline: "border border-neutral-700 bg-transparent text-neutral-300",
  };

  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full font-medium",
      sizeClasses[size],
      variant === "outline" ? "border" : "",
      variantClasses[variant],
      className
    )}>
      {icon && <BrandIcon name={icon} className={cn(
        size === "sm" ? "h-3 w-3" : size === "md" ? "h-3.5 w-3.5" : "h-4 w-4"
      )} />}
      {label}
    </span>
  );
}