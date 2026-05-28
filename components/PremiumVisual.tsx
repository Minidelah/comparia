import Image from "next/image";
import BrandIcon, { type IconName } from "@/components/BrandIcon";
import type { VisualTone } from "@/lib/visuals";

type Props = {
  src: string;
  alt: string;
  eyebrow?: string;
  title?: string;
  metric?: string;
  tone?: VisualTone;
  icon?: IconName;
  priority?: boolean;
  sizes?: string;
  fit?: "cover" | "contain";
  className?: string;
};

const toneStyles: Record<VisualTone, { ring: string; glow: string; badge: string; text: string }> = {
  cyan: {
    ring: "border-cyan-300/20",
    glow: "from-cyan-400/25 via-blue-500/10 to-transparent",
    badge: "border-cyan-300/25 bg-cyan-300/10 text-cyan-100",
    text: "text-cyan-200",
  },
  blue: {
    ring: "border-blue-300/20",
    glow: "from-blue-400/25 via-cyan-500/10 to-transparent",
    badge: "border-blue-300/25 bg-blue-300/10 text-blue-100",
    text: "text-blue-200",
  },
  emerald: {
    ring: "border-emerald-300/20",
    glow: "from-emerald-400/25 via-cyan-500/10 to-transparent",
    badge: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
    text: "text-emerald-200",
  },
  violet: {
    ring: "border-violet-300/20",
    glow: "from-violet-400/25 via-blue-500/10 to-transparent",
    badge: "border-violet-300/25 bg-violet-300/10 text-violet-100",
    text: "text-violet-200",
  },
  amber: {
    ring: "border-amber-300/20",
    glow: "from-amber-400/25 via-orange-500/10 to-transparent",
    badge: "border-amber-300/25 bg-amber-300/10 text-amber-100",
    text: "text-amber-200",
  },
  rose: {
    ring: "border-rose-300/20",
    glow: "from-rose-400/25 via-blue-500/10 to-transparent",
    badge: "border-rose-300/25 bg-rose-300/10 text-rose-100",
    text: "text-rose-200",
  },
};

export default function PremiumVisual({
  src,
  alt,
  eyebrow,
  title,
  metric,
  tone = "cyan",
  icon = "sparkles",
  priority = false,
  sizes = "100vw",
  fit = "cover",
  className = "",
}: Props) {
  const styles = toneStyles[tone];

  return (
    <figure
      className={`premium-visual-card group relative overflow-hidden rounded-[2rem] border ${styles.ring} bg-slate-950/70 shadow-2xl shadow-black/25 ${className}`}
    >
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${styles.glow}`} />
      <div className="premium-visual-sheen pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="relative aspect-[16/10]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={
            fit === "contain"
              ? "object-contain p-3 transition duration-700 group-hover:scale-[1.015]"
              : "object-cover transition duration-700 group-hover:scale-[1.03]"
          }
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/72 via-slate-950/10 to-transparent" />
      </div>

      {(eyebrow || title || metric) && (
        <figcaption className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5">
          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/72 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border ${styles.badge}`}>
                  <BrandIcon name={icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  {eyebrow && <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${styles.text}`}>{eyebrow}</p>}
                  {title && <p className="mt-1 truncate text-base font-bold text-white sm:text-lg">{title}</p>}
                </div>
              </div>
              {metric && (
                <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-bold text-slate-100">
                  {metric}
                </span>
              )}
            </div>
          </div>
        </figcaption>
      )}
    </figure>
  );
}
