import { cn } from "@/lib/utils";

type Props = {
  label?: string;
  className?: string;
  variant?: "default" | "dashed" | "dotted";
};

export default function Divider({ label, className, variant = "default" }: Props) {
  
  const variantClasses = {
    default: "",
    dashed: "border-dashed",
    dotted: "border-dotted",
  };

  return (
    <div className={cn("relative my-8", className)}>
      <div className={cn("absolute inset-0 flex items-center", variantClasses[variant])}>
        <div className="w-full border-t border-neutral-800" />
      </div>
      {label && (
        <div className="relative flex justify-center">
          <span className="bg-neutral-900 px-4 text-sm text-neutral-500">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}