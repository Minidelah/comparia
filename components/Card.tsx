import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "gradient" | "glass" | "featured";
  hoverEffect?: boolean;
};

export default function Card({ children, className, variant = "default", hoverEffect = false }: Props) {
  
  const variantClasses = {
    default: "bg-neutral-900 border-neutral-800",
    gradient: "bg-gradient-to-br from-neutral-900 to-neutral-800 border-transparent",
    glass: "card-glass border-neutral-800/30",
    featured: "border-2 border-primary-500/30 bg-neutral-900/50",
  };

  return (
    <div className={cn("rounded-2xl border p-6 transition-all",
      variantClasses[variant],
      hoverEffect ? "hover-lift hover-shadow" : "",
      className
    )}>
      {children}
    </div>
  );
}