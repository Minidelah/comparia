import Link from "next/link";
import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description?: string;
  cta: {
    href: string;
    label: string;
  };
  icon?: string;
  variant?: "primary" | "secondary" | "success" | "warning" | "danger";
  className?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
};

export default function BannerPremium({
  title,
  description,
  cta,
  icon = "info",
  variant = "primary",
  className,
  dismissible = false,
  onDismiss,
}: Props) {
  
  const variantClasses = {
    primary: {
      bg: "bg-gradient-to-r from-primary-500/20 to-primary-600/20",
      border: "border-primary-500/30",
      text: "text-primary-300",
      iconBg: "bg-primary-500/30",
      iconText: "text-primary-300",
    },
    secondary: {
      bg: "bg-gradient-to-r from-secondary-500/20 to-secondary-600/20",
      border: "border-secondary-500/30",
      text: "text-secondary-300",
      iconBg: "bg-secondary-500/30",
      iconText: "text-secondary-300",
    },
    success: {
      bg: "bg-gradient-to-r from-success-500/20 to-success-600/20",
      border: "border-success-500/30",
      text: "text-success-300",
      iconBg: "bg-success-500/30",
      iconText: "text-success-300",
    },
    warning: {
      bg: "bg-gradient-to-r from-warning-500/20 to-warning-600/20",
      border: "border-warning-500/30",
      text: "text-warning-300",
      iconBg: "bg-warning-500/30",
      iconText: "text-warning-300",
    },
    danger: {
      bg: "bg-gradient-to-r from-danger-500/20 to-danger-600/20",
      border: "border-danger-500/30",
      text: "text-danger-300",
      iconBg: "bg-danger-500/30",
      iconText: "text-danger-300",
    },
  };

  const classes = variantClasses[variant];

  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl border p-6",
      classes.bg,
      classes.border,
      className
    )}>
      {/* Dismiss button */}
      {dismissible && onDismiss && (
        <button
          onClick={onDismiss}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800/50 text-neutral-400 transition hover:bg-neutral-700 hover:text-white"
        >
          <BrandIcon name="x" className="h-4 w-4" />
        </button>
      )}

      <div className="grid gap-4 sm:grid-cols-[auto_1fr_auto] sm:items-center">
        {/* Icon */}
        <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl", classes.iconBg)}>
          <BrandIcon name={icon} className={cn("h-6 w-6", classes.iconText)} />
        </div>

        {/* Content */}
        <div>
          <h3 className={cn("text-lg font-bold", classes.text)}>{title}</h3>
          {description && (
            <p className="mt-1 text-sm text-neutral-300">{description}</p>
          )}
        </div>

        {/* CTA */}
        <div className="flex justify-end sm:justify-start">
          <Link
            href={cta.href}
            className={cn("btn-outline inline-flex items-center justify-center gap-2", classes.text, "border-current")}
          >
            {cta.label}
            <BrandIcon name="arrow-right" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}