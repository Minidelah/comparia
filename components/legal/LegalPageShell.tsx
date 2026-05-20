import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";

type LegalPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  updatedAt?: string;
  children: React.ReactNode;
};

const legalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politique-confidentialite", label: "Confidentialité" },
  { href: "/transparence-affiliation", label: "Affiliation" },
  { href: "/cookies", label: "Cookies" },
  { href: "/contact", label: "Contact" },
];

export default function LegalPageShell({ eyebrow, title, description, updatedAt = "19 mai 2026", children }: LegalPageShellProps) {
  return (
    <main className="min-h-screen bg-[#05070d] px-5 py-6 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SiteNav />

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{description}</p>
          <p className="mt-5 text-sm text-slate-500">Dernière mise à jour : {updatedAt}</p>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[0.32fr_0.68fr]">
          <aside className="h-fit rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-4">
            <p className="px-3 text-xs uppercase tracking-[0.22em] text-slate-500">Confiance</p>
            <nav className="mt-3 grid gap-2">
              {legalLinks.map((link) => (
                <Link key={link.href} href={link.href} className="rounded-2xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/[0.06] hover:text-white">
                  {link.label}
                </Link>
              ))}
            </nav>
          </aside>

          <article className="max-w-none rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 text-sm leading-7 text-slate-300 sm:p-8 [&_a]:text-cyan-300 [&_a]:underline-offset-4 [&_a:hover]:underline [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-white [&_h2:first-child]:mt-0 [&_li]:mt-2 [&_p]:mt-4 [&_strong]:text-white [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5">
            {children}
          </article>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
