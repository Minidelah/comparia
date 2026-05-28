import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  subtitle?: string;
  icon?: string;
  className?: string;
  badge?: string;
  badgeIcon?: string;
};

export default function SectionTitle({ 
  title,
  subtitle,
  icon,
  className,
  badge,
  badgeIcon,
}: Props) {
  return (
    <div className={cn("mb-8 text-center md:text-left", className)}>
      {badge && (
        <div className="inline-flex items-center gap-2 rounded-full border border-primary-400/30 bg-primary-400/10 px-3 py-1.5 text-xs uppercase tracking-widest text-primary-300 mb-4">
          {badgeIcon && <BrandIcon name={badgeIcon} className="h-3 w-3" />}
          {badge}
        </div>
      )}

      <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-3">
        {icon && <BrandIcon name={icon} className="h-8 w-8 text-primary-400" />}
        {title}
      </h2>

      {subtitle && (
        <p className="max-w-2xl text-lg text-neutral-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}