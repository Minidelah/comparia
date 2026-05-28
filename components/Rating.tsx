import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type Props = {
  value: number;
  max?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
};

export default function Rating({ 
  value,
  max = 5,
  className,
  size = "md",
  showValue = true,
}: Props) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: max }).map((_, index) => (
        <BrandIcon
          key={index}
          name={index < value ? "star" : "star"}
          className={cn(
            sizeClasses[size],
            index < value ? "text-amber-400" : "text-amber-600/50"
          )}
        />
      ))}

      {showValue && (
        <span className={cn("ml-2 font-medium",
          size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base"
        )}>
          {value.toFixed(1)}/{max}
        </span>
      )}
    </div>
  );
}