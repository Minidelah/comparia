import Link from "next/link";
import Image from "next/image";

type Props = {
  compact?: boolean;
};

export default function SiteNav({ compact = false }: Props) {
  return (
    <nav className="flex items-center justify-between">
      <Link href="/" className="flex items-center gap-3">
        <Image src="/comparia-logo.svg" alt="" width={40} height={40} className="h-10 w-10" />
        <span className="leading-none">
          <span className="block text-lg font-black uppercase tracking-[0.18em]">Comparia</span>
          <span className="block text-[10px] uppercase tracking-[0.28em] text-cyan-300/80">Comparateurs intelligents</span>
        </span>
      </Link>
      <div className="flex items-center gap-2">
        {!compact && (
          <>
            <Link href="/comparateurs" className="hidden text-sm text-slate-300 transition hover:text-white sm:block">
              Comparateurs
            </Link>
            <Link href="/a-propos" className="hidden text-sm text-slate-300 transition hover:text-white lg:block">
              À propos
            </Link>
            <Link href="/tableau-de-bord" className="hidden text-sm text-slate-300 transition hover:text-white sm:block">
              Tableau de bord
            </Link>
          </>
        )}
        <Link
          href="/onboarding"
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
        >
          Diagnostic gratuit
        </Link>
      </div>
    </nav>
  );
}
