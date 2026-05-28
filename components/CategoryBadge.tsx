import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type Props = {
  category: string;
  icon?: string;
  className?: string;
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
};

export default function CategoryBadge({ category, icon, className, variant = "default" }: Props) {
  
  const variantClasses = {
    default: "bg-neutral-800 border-neutral-700 text-neutral-200",
    primary: "bg-primary-500/20 border-primary-500/30 text-primary-300",
    secondary: "bg-secondary-500/20 border-secondary-500/30 text-secondary-300",
    success: "bg-success-500/20 border-success-500/30 text-success-300",
    warning: "bg-warning-500/20 border-warning-500/30 text-warning-300",
    danger: "bg-danger-500/20 border-danger-500/30 text-danger-300",
  };

  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium",
      variantClasses[variant],
      className
    )}>
      {icon && <BrandIcon name={icon} className="h-3 w-3" />}
      {category}
    </span>
  );
}