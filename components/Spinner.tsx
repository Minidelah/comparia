import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
};

export default function Spinner({ className, size = "md", variant = "default" }: Props) {
  
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  };

  const variantClasses = {
    default: "text-neutral-400",
    primary: "text-primary-400",
    secondary: "text-secondary-400",
    success: "text-success-400",
    warning: "text-warning-400",
    danger: "text-danger-400",
  };

  return (
    <div className={cn("inline-flex items-center justify-center", className)}>
      <BrandIcon
        name="loader"
        className={cn("animate-spin", sizeClasses[size], variantClasses[variant])}
      />
    </div>
  );
}