import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type ComparisonItem = {
  title: string;
  features: {
    name: string;
    value: string | boolean;
    highlighted?: boolean;
  }[];
  cta?: {
    href: string;
    label: string;
  };
  popular?: boolean;
};

type Props = {
  title: string;
  description?: string;
  items: ComparisonItem[];
  features: string[];
  className?: string;
};

export default function ComparisonSection({ title, description, items, features, className }: Props) {
  return (
    <section className={cn("px-5 py-14 sm:px-8 lg:px-10", className)}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1.5 text-xs uppercase tracking-widest text-orange-300 mb-4">
            <BrandIcon name="comparison" className="h-3 w-3" />
            Comparaison
          </div>
          <h2 className="text-4xl font-bold">{title}</h2>
          {description && (
            <p className="mt-3 max-w-3xl mx-auto text-lg text-neutral-400">
              {description}
            </p>
          )}
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[1000px] md:min-w-0">
            {/* Comparison table */}
            <div className="grid grid-cols-[200px_repeat(auto-fit,minmax(250px,1fr))] border-b border-neutral-800">
              {/* Header - empty cell */}
              <div className="p-4"></div>

              {/* Header - items */}
              {items.map((item, index) => (
                <div
                  key={index}
                  className={cn("p-4 text-center",
                    item.popular ? "bg-primary-500/10" : "bg-neutral-900"
                  )}
                >
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  {item.popular && (
                    <span className="badge badge-primary text-xs">
                      <BrandIcon name="star" className="h-3 w-3 mr-1" />
                      Populaire
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Features rows */}
            {features.map((feature, featureIndex) => (
              <div
                key={featureIndex}
                className="grid grid-cols-[200px_repeat(auto-fit,minmax(250px,1fr))] border-b border-neutral-800/50"
              >
                {/* Feature name */}
                <div className="p-4 font-medium text-neutral-200 bg-neutral-900/50">
                  {feature}
                </div>

                {/* Feature values */}
                {items.map((item, itemIndex) => {
                  const featureData = item.features.find(f => f.name === feature);
                  const value = featureData ? featureData.value : "-";

                  return (
                    <div
                      key={itemIndex}
                      className={cn("p-4 text-center flex items-center justify-center",
                        featureData?.highlighted ? "bg-primary-500/10 font-bold text-primary-300" : "bg-neutral-900",
                        typeof value === "boolean" ? "" : ""
                      )}
                    >
                      {typeof value === "boolean" ? (
                        <div className={cn("flex h-6 w-6 items-center justify-center rounded-full",
                          value ? "bg-success-500/20 text-success-400" : "bg-danger-500/20 text-danger-400"
                        )}>
                          <BrandIcon
                            name={value ? "check" : "x"}
                            className="h-4 w-4"
                          />
                        </div>
                      ) : (
                        <span className={cn("text-sm",
                          featureData?.highlighted ? "text-primary-300 font-semibold" : "text-neutral-300"
                        )}>
                          {value}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}

            {/* CTA row */}
            <div className="grid grid-cols-[200px_repeat(auto-fit,minmax(250px,1fr))]">
              <div className="p-4"></div>
              {items.map((item, index) => (
                <div key={index} className="p-4">
                  {item.cta ? (
                    <a
                      href={item.cta.href}
                      className={cn("btn-premium w-full text-center justify-center text-sm py-2",
                        item.popular ? "bg-gradient-to-r from-primary-500 to-secondary-500" : ""
                      )}
                    >
                      {item.cta.label}
                    </a>
                  ) : (
                    <div className="h-10"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}