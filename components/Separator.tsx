import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "dashed" | "dotted";
};

export default function Separator({ 
  className,
  orientation = "horizontal",
  variant = "default",
}: Props) {
  
  const variantClasses = {
    default: "",
    dashed: "border-dashed",
    dotted: "border-dotted",
  };

  return (
    <div className={cn(
      orientation === "horizontal" ? "w-full border-t" : "h-full border-l",
      "border-neutral-800",
      variantClasses[variant],
      className
    )} />
  );
}