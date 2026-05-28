import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
};

export default function Container({ children, className, size = "xl" }: Props) {
  
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <div className={cn("mx-auto px-5 sm:px-8 lg:px-10", sizeClasses[size], className)}>
      {children}
    </div>
  );
}