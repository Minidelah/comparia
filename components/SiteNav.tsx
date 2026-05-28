import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";

type Props = {
  compact?: boolean;
};

const navLinks = [
  { href: "/comparateurs", label: "Comparateurs" },
  { href: "/guides", label: "Guides" },
  { href: "/a-propos", label: "À propos" },
  { href: "/tableau-de-bord", label: "Tableau de bord" },
];

export default function SiteNav({ compact = false }: Props) {
  return (
    <nav className="flex items-center justify-between gap-4">
      <Link href="/" className="group flex min-w-0 items-center gap-3">
        <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/10 ring-1 ring-inset ring-cyan-300/20 transition group-hover:bg-cyan-300/15">
          <Image src="/comparia-logo.svg" alt={siteConfig.name} width={40} height={40} className="h-8 w-8" />
        </span>
        <span className="min-w-0 leading-none">
          <span className="block max-w-[11.5rem] truncate text-[0.9rem] font-black uppercase tracking-[0.08em] sm:max-w-none sm:text-lg sm:tracking-[0.14em]">
            {siteConfig.name}
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.28em] text-cyan-300/80 sm:block">{siteConfig.tagline}</span>
        </span>
      </Link>

      <div className="flex shrink-0 items-center gap-2">
        {!compact && (
          <div className="hidden items-center rounded-full border border-white/10 bg-slate-950/55 p-1 shadow-inner shadow-black/20 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
        <Link
          href="/onboarding"
          className="rounded-full bg-white px-4 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-950/20 transition hover:-translate-y-0.5 hover:bg-cyan-100 sm:px-5"
        >
          <span className="hidden sm:inline">Diagnostic gratuit</span>
          <span className="sm:hidden">Diagnostic</span>
        </Link>
      </div>
    </nav>
  );
}
