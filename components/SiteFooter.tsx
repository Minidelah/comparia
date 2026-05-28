import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 px-5 py-10 text-sm text-slate-400 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-bold uppercase tracking-[0.24em] text-white">{siteConfig.name}</p>
          <p className="mt-3 max-w-xl leading-6">
            Des comparateurs pensés pour aider les utilisateurs à comprendre, choisir et activer les meilleures offres sans perdre le fil.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/comparateurs" className="transition hover:text-white">Comparateurs</Link>
          <Link href="/guides" className="transition hover:text-white">Guides économies</Link>
          <Link href="/onboarding" className="transition hover:text-white">Diagnostic</Link>
          <Link href="/a-propos" className="transition hover:text-white">À propos</Link>
          <Link href="/contact" className="transition hover:text-white">Contact</Link>
          <Link href="/transparence-affiliation" className="transition hover:text-white">Affiliation</Link>
          <Link href="/sitemap.xml" className="transition hover:text-white">Sitemap</Link>
          <Link href="/mentions-legales" className="transition hover:text-white">Mentions légales</Link>
          <Link href="/politique-confidentialite" className="transition hover:text-white">Confidentialité</Link>
          <Link href="/cookies" className="transition hover:text-white">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
