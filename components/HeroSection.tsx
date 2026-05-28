import Link from "next/link";
import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type TrustPoint = {
  title: string;
  description: string;
  icon: string;
};

type Props = {
  title: string;
  subtitle: string;
  description: string;
  ctaPrimary: {
    href: string;
    label: string;
  };
  ctaSecondary?: {
    href: string;
    label: string;
  };
  trustPoints: TrustPoint[];
  className?: string;
};

export default function HeroSection({
  title,
  subtitle,
  description,
  ctaPrimary,
  ctaSecondary,
  trustPoints,
  className,
}: Props) {
  return (
    <section className={cn("relative overflow-hidden px-5 py-12 sm:px-8 sm:py-20 lg:px-10", className)}>
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 via-neutral-950 to-neutral-950" />
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500/40 via-blue-500/30 to-purple-500/20 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* Left content */}
          <div className="fade-in">
            <h1 className="text-5xl font-black tracking-tight sm:text-6xl">
              <span className="text-cyan-200 drop-shadow-[0_0_24px_rgba(34,211,238,0.18)]">
                {title}
              </span>
              <br />
              <span className="text-white">{subtitle}</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
              {description}
            </p>

            {/* Badges */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/15 px-4 py-2 text-sm font-semibold text-cyan-100 shadow-lg shadow-cyan-950/20">
                <BrandIcon name="gift" className="h-4 w-4" />
                Gratuit
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-blue-400/15 px-4 py-2 text-sm font-semibold text-blue-100 shadow-lg shadow-blue-950/20">
                <BrandIcon name="clock" className="h-4 w-4" />
                2 minutes
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/15 px-4 py-2 text-sm font-semibold text-emerald-100 shadow-lg shadow-emerald-950/20">
                <BrandIcon name="unlock" className="h-4 w-4" />
                Sans engagement
              </span>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={ctaPrimary.href}
                className="btn-premium inline-flex items-center justify-center gap-2"
              >
                {ctaPrimary.label}
                <BrandIcon name="arrow-right" className="h-4 w-4" />
              </Link>
              {ctaSecondary && (
                <Link
                  href={ctaSecondary.href}
                  className="btn-secondary inline-flex items-center justify-center gap-2"
                >
                  {ctaSecondary.label}
                  <BrandIcon name="grid" className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>

          {/* Right content - can be used for visuals or featured content */}
          <div className="overflow-hidden rounded-[2rem] border border-neutral-800 bg-neutral-900/50 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="p-5">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Commence ici</p>
              <h2 className="mt-3 text-2xl font-bold">Quel contrat veux-tu comparer ?</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-400">
                Classés du plus gros potentiel d'économie au plus petit pour t'aider à commencer là où ça compte le plus.
              </p>
              {/* This would be replaced with actual category cards or visual content */}
              <div className="mt-5 space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-900/30 p-4">
                    <span className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-inset ring-cyan-300/20">
                        <BrandIcon name="home" className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block font-bold">Catégorie {item}</span>
                        <span className="mt-1 block text-sm text-neutral-400">Description</span>
                      </span>
                    </span>
                    <span className="text-sm font-semibold text-emerald-300">Jusqu'à 300€</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust points */}
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {trustPoints.map((point) => (
            <div key={point.title} className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-5 hover-lift transition-all">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-inset ring-cyan-300/20">
                <BrandIcon name={point.icon} />
              </div>
              <h2 className="mt-4 font-bold">{point.title}</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-400">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
