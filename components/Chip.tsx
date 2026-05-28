import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  icon?: string;
  onClick?: () => void;
  onRemove?: () => void;
  className?: string;
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "outline";
};

export default function Chip({ 
  label,
  icon,
  onClick,
  onRemove,
  className,
  variant = "default",
}: Props) {
  
  const variantClasses = {
    default: "bg-neutral-800 text-neutral-200 hover:bg-neutral-700",
    primary: "bg-primary-500/20 text-primary-300 hover:bg-primary-500/30",
    secondary: "bg-secondary-500/20 text-secondary-300 hover:bg-secondary-500/30",
    success: "bg-success-500/20 text-success-300 hover:bg-success-500/30",
    warning: "bg-warning-500/20 text-warning-300 hover:bg-warning-500/30",
    danger: "bg-danger-500/20 text-danger-300 hover:bg-danger-500/30",
    outline: "border border-neutral-700 bg-transparent text-neutral-300 hover:bg-neutral-900",
  };

  return (
    <div
      className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium transition",
        variant === "outline" ? "border" : "",
        variantClasses[variant],
        onClick ? "cursor-pointer" : "",
        className
      )}
      onClick={onClick}
    >
      {icon && <BrandIcon name={icon} className="h-3 w-3" />}
      {label}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-2 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-700 text-neutral-400 transition hover:bg-neutral-600"
        >
          <BrandIcon name="x" className="h-2 w-2" />
        </button>
      )}
    </div>
  );
}