import Link from "next/link";
import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description?: string;
  ctaPrimary: {
    href: string;
    label: string;
  };
  ctaSecondary?: {
    href: string;
    label: string;
  };
  className?: string;
  variant?: "default" | "gradient" | "glass";
};

export default function CTASection({
  title,
  description,
  ctaPrimary,
  ctaSecondary,
  className,
  variant = "default",
}: Props) {
  
  const variantClasses = {
    default: "bg-gradient-to-br from-neutral-900/50 to-neutral-950/50 border border-neutral-800",
    gradient: "bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-accent-500/20 border border-primary-500/30",
    glass: "card-glass border border-neutral-800/30",
  };

  return (
    <section className={cn("px-5 py-14 sm:px-8 lg:px-10", className)}>
      <div className={cn("mx-auto max-w-4xl rounded-[2rem] p-8 sm:p-12 text-center", variantClasses[variant])}>
        <h2 className="text-4xl sm:text-5xl font-black mb-4">{title}</h2>
        {description && (
          <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
            {description}
          </p>
        )}

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href={ctaPrimary.href}
            className="btn-premium inline-flex items-center justify-center gap-2 px-8 py-4 text-lg"
          >
            {ctaPrimary.label}
            <BrandIcon name="arrow-right" className="h-4 w-4" />
          </Link>
          {ctaSecondary && (
            <Link
              href={ctaSecondary.href}
              className="btn-secondary inline-flex items-center justify-center gap-2 px-8 py-4 text-lg"
            >
              {ctaSecondary.label}
              <BrandIcon name="info" className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}