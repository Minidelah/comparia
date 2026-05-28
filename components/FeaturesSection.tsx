import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type Feature = {
  title: string;
  description: string;
  icon: string;
};

type Props = {
  title: string;
  description?: string;
  features: Feature[];
  className?: string;
};

export default function FeaturesSection({ title, description, features, className }: Props) {
  return (
    <section className={cn("px-5 py-14 sm:px-8 lg:px-10", className)}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-400/30 bg-pink-400/10 px-3 py-1.5 text-xs uppercase tracking-widest text-pink-300 mb-4">
            <BrandIcon name="features" className="h-3 w-3" />
            Fonctionnalités
          </div>
          <h2 className="text-4xl font-bold">{title}</h2>
          {description && (
            <p className="mt-3 max-w-3xl mx-auto text-lg text-neutral-400">
              {description}
            </p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn("card-premium hover-lift transition-all",
                index % 2 === 0 ? "bg-gradient-to-br from-neutral-900 to-neutral-800" : "")}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-primary-300">
                <BrandIcon name={feature.icon} className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-neutral-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}