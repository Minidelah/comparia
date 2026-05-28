import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  message: string;
  type?: "success" | "error" | "warning" | "info" | "danger";
  onDismiss?: () => void;
  className?: string;
};

export default function Alert({ title, message, type = "info", onDismiss, className }: Props) {
  const resolvedType = type === "danger" ? "error" : type;

  const typeClasses = {
    success: {
      bg: "bg-success-500/20",
      border: "border-success-500/30",
      text: "text-success-300",
      icon: "check-circle",
    },
    error: {
      bg: "bg-danger-500/20",
      border: "border-danger-500/30",
      text: "text-danger-300",
      icon: "alert-triangle",
    },
    warning: {
      bg: "bg-warning-500/20",
      border: "border-warning-500/30",
      text: "text-warning-300",
      icon: "alert-circle",
    },
    info: {
      bg: "bg-info-500/20",
      border: "border-info-500/30",
      text: "text-info-300",
      icon: "info",
    },
  };

  const classes = typeClasses[resolvedType];

  return (
    <div className={cn("rounded-xl border p-4", classes.bg, classes.border, className)}>
      <div className="flex items-start gap-4">
        <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl", classes.bg, classes.text)}>
          <BrandIcon name={classes.icon} className="h-5 w-5" />
        </div>

        <div className="flex-1">
          <h3 className={cn("font-bold", classes.text)}>{title}</h3>
          <p className="mt-1 text-sm text-neutral-300">{message}</p>
        </div>

        {onDismiss && (
          <button
            onClick={onDismiss}
            className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-400 transition hover:bg-neutral-800", classes.text)}
          >
            <BrandIcon name="x" className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}