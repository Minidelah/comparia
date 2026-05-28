import { cn } from "@/lib/utils";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

export default function Switch({ 
  checked,
  onChange,
  label,
  className,
  size = "md",
}: Props) {
  const sizeClasses = {
    sm: "h-5 w-9",
    md: "h-6 w-11",
    lg: "h-7 w-14",
  };

  const thumbSizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <label className={cn("flex items-center gap-3", className)}>
      {label && <span className="text-sm text-neutral-300">{label}</span>}

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn("relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
          checked ? "bg-primary-500" : "bg-neutral-600",
          sizeClasses[size]
        )}
      >
        <span
          className={cn("pointer-events-none inline-block transform rounded-full bg-white shadow-lg ring-0 transition-all",
            checked ? "translate-x-full" : "translate-x-0",
            thumbSizeClasses[size]
          )}
        />
      </button>
    </label>
  );
}