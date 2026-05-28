import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type Stat = {
  value: string;
  label: string;
  icon?: string;
  description?: string;
};

type Props = {
  title: string;
  description?: string;
  stats: Stat[];
  className?: string;
};

export default function StatsSection({ title, description, stats, className }: Props) {
  return (
    <section className={cn("px-5 py-14 sm:px-8 lg:px-10", className)}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-400/10 px-3 py-1.5 text-xs uppercase tracking-widest text-purple-300 mb-4">
            <BrandIcon name="chart" className="h-3 w-3" />
            Statistiques
          </div>
          <h2 className="text-4xl font-bold">{title}</h2>
          {description && (
            <p className="mt-3 max-w-3xl mx-auto text-lg text-neutral-400">
              {description}
            </p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={cn("card-premium text-center hover-lift transition-all",
                index === 0 ? "bg-gradient-to-br from-primary-500/10 to-primary-600/10 border-primary-500/30" : "",
                index === 1 ? "bg-gradient-to-br from-secondary-500/10 to-secondary-600/10 border-secondary-500/30" : "",
                index === 2 ? "bg-gradient-to-br from-success-500/10 to-success-600/10 border-success-500/30" : "",
                index === 3 ? "bg-gradient-to-br from-warning-500/10 to-warning-600/10 border-warning-500/30" : ""
              )}
            >
              {stat.icon && (
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-800 text-neutral-300">
                  <BrandIcon name={stat.icon} className="h-6 w-6" />
                </div>
              )}
              <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
              <h3 className="text-lg font-semibold text-neutral-200 mb-2">{stat.label}</h3>
              {stat.description && (
                <p className="text-sm text-neutral-400">{stat.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}