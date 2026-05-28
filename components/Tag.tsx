import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  icon?: string;
  className?: string;
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "outline" | "info";
};

export default function Tag({ label, icon, className, variant = "default" }: Props) {
  
  const variantClasses = {
    default: "bg-neutral-800 text-neutral-300",
    primary: "bg-primary-500/20 text-primary-300",
    secondary: "bg-secondary-500/20 text-secondary-300",
    success: "bg-success-500/20 text-success-300",
    warning: "bg-warning-500/20 text-warning-300",
    danger: "bg-danger-500/20 text-danger-300",
    outline: "border border-neutral-700 bg-transparent text-neutral-300",
    info: "bg-info-500/20 text-info-200",
  };

  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium",
      variantClasses[variant],
      variant === "outline" ? "border" : "",
      className
    )}>
      {icon && <BrandIcon name={icon} className="h-3 w-3" />}
      {label}
    </span>
  );
}