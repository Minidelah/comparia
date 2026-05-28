import { cn } from "@/lib/utils";

type Props = {
  src?: string;
  alt?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  status?: "online" | "offline" | "busy" | "away";
};

export default function Avatar({ 
  src,
  alt = "Avatar",
  name,
  size = "md",
  className,
  status,
}: Props) {
  const sizeClasses = {
    xs: "h-6 w-6 text-xs",
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-12 w-12 text-lg",
    xl: "h-16 w-16 text-xl",
  };

  const statusClasses = {
    online: "border-2 border-success-500",
    offline: "border-2 border-neutral-600",
    busy: "border-2 border-danger-500",
    away: "border-2 border-warning-500",
  };

  const initials = name
    ? name
        .split(" ")
        .map(part => part[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "?";

  return (
    <div className={cn("relative", className)}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={cn("rounded-full object-cover", sizeClasses[size], status ? statusClasses[status] : "")}
          loading="lazy"
        />
      ) : (
        <div
          className={cn("flex items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white",
            sizeClasses[size],
            status ? statusClasses[status] : ""
          )}
        >
          {initials}
        </div>
      )}

      {status && (
        <div className={cn("absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-neutral-900",
          status === "online" ? "bg-success-500" :
          status === "offline" ? "bg-neutral-600" :
          status === "busy" ? "bg-danger-500" :
          "bg-warning-500"
        )} />
      )}
    </div>
  );
}