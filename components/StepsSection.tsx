import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type Step = {
  step: number;
  title: string;
  description: string;
  icon?: string;
};

type Props = {
  title: string;
  description?: string;
  steps: Step[];
  className?: string;
};

export default function StepsSection({ title, description, steps, className }: Props) {
  return (
    <section className={cn("px-5 py-14 sm:px-8 lg:px-10", className)}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-400/10 px-3 py-1.5 text-xs uppercase tracking-widest text-indigo-300 mb-4">
            <BrandIcon name="steps" className="h-3 w-3" />
            Processus
          </div>
          <h2 className="text-4xl font-bold">{title}</h2>
          {description && (
            <p className="mt-3 max-w-3xl mx-auto text-lg text-neutral-400">
              {description}
            </p>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Step number */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-2xl font-black mb-6 text-white">
                {step.step}
              </div>

              {/* Step content */}
              <div className="rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 p-6 hover-lift transition-all">
                {step.icon && (
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/20 text-primary-300">
                    <BrandIcon name={step.icon} className="h-5 w-5" />
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-neutral-400">{step.description}</p>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 -right-4 w-8 border-t border-neutral-800/50" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}