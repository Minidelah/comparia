import Link from "next/link";
import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type PricingFeature = {
  name: string;
  included: boolean;
  tooltip?: string;
};

type PricingPlan = {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: PricingFeature[];
  cta: {
    href: string;
    label: string;
  };
  popular?: boolean;
  recommended?: boolean;
};

type Props = {
  title: string;
  description?: string;
  plans: PricingPlan[];
  className?: string;
};

export default function PricingSection({ title, description, plans, className }: Props) {
  return (
    <section className={cn("px-5 py-14 sm:px-8 lg:px-10", className)}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-xs uppercase tracking-widest text-cyan-300 mb-4">
            <BrandIcon name="pricing" className="h-3 w-3" />
            Tarifs
          </div>
          <h2 className="text-4xl font-bold">{title}</h2>
          {description && (
            <p className="mt-3 max-w-3xl mx-auto text-lg text-neutral-400">
              {description}
            </p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn("card-premium relative flex flex-col",
                plan.popular ? "border-2 border-primary-500 bg-neutral-900/50" : "",
                plan.recommended ? "ring-2 ring-secondary-500/30" : ""
              )}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="badge badge-primary text-xs px-3 py-1">
                    <BrandIcon name="crown" className="h-3 w-3 mr-1" />
                    Le plus populaire
                  </span>
                </div>
              )}

              {/* Plan name */}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-neutral-400 mb-4">{plan.description}</p>

              {/* Price */}
              <div className="mb-6">
                <p className="text-4xl font-black text-white">
                  {plan.price}
                  <span className="text-lg font-medium text-neutral-400">/{plan.period}</span>
                </p>
              </div>

              {/* Features */}
              <div className="flex-1 mb-8">
                <h4 className="font-semibold text-neutral-200 mb-4">Fonctionnalités</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className={cn("flex h-5 w-5 items-center justify-center rounded-full",
                        feature.included ? "bg-success-500/20 text-success-400" : "bg-danger-500/20 text-danger-400"
                      )}>
                        <BrandIcon
                          name={feature.included ? "check" : "x"}
                          className="h-3 w-3"
                        />
                      </div>
                      <span className={cn("text-sm",
                        feature.included ? "text-neutral-200" : "text-neutral-500 line-through"
                      )}>
                        {feature.name}
                      </span>
                      {feature.tooltip && (
                        <div className="group relative">
                          <BrandIcon name="info" className="h-3 w-3 text-neutral-400" />
                          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 rounded-xl bg-neutral-900 p-3 text-xs text-neutral-300 opacity-0 transition group-hover:opacity-100">
                            {feature.tooltip}
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <Link
                href={plan.cta.href}
                className={cn("btn-premium w-full justify-center",
                  plan.popular ? "bg-gradient-to-r from-primary-500 to-secondary-500" : ""
                )}
              >
                {plan.cta.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
