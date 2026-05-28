import { cn } from "@/lib/utils";

type Props = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
};

export default function CardHeader({ title, subtitle, icon, actions, className }: Props) {
  return (
    <div className={cn("flex items-center justify-between gap-4 border-b border-neutral-800 pb-4 mb-4", className)}>
      <div className="flex items-center gap-3">
        {icon && <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-500/20 text-primary-300">
          {icon}
        </div>}
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          {subtitle && <div className="text-sm text-neutral-400">{subtitle}</div>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}