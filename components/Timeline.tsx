import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type TimelineItem = {
  id: string;
  title: string;
  description?: string;
  date: string;
  icon?: string;
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
};

type Props = {
  items: TimelineItem[];
  className?: string;
};

export default function Timeline({ items, className }: Props) {
  
  const variantClasses = {
    default: "bg-neutral-800 text-neutral-300",
    primary: "bg-primary-500 text-white",
    secondary: "bg-secondary-500 text-white",
    success: "bg-success-500 text-white",
    warning: "bg-warning-500 text-white",
    danger: "bg-danger-500 text-white",
  };

  return (
    <div className={cn("relative", className)}>
      {/* Timeline line */}
      <div className="absolute left-4 top-0 h-full w-1 border-l border-neutral-800" />

      <div className="space-y-8">
        {items.map((item) => (
          <div key={item.id} className="relative flex gap-6">
            {/* Icon */}
            <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
              {item.icon ? (
                <BrandIcon name={item.icon} className={cn("h-5 w-5", variantClasses[item.variant || "default"])} />
              ) : (
                <div className={cn("h-5 w-5 rounded-full", variantClasses[item.variant || "default"])} />
              )}
            </div>

            {/* Content */}
            <div className="pt-1">
              <p className="text-sm text-neutral-500 mb-1">{item.date}</p>
              <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
              {item.description && (
                <p className="text-neutral-400">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
