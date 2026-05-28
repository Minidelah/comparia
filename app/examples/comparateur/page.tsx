"use client";

import Link from "next/link";
import BrandIcon, { type IconName } from "@/components/BrandIcon";
import { Button } from "@/components/ui/Button";
import Breadcrumb from "@/components/Breadcrumb";
import CategoryBadge from "@/components/CategoryBadge";
import FiltersSection from "@/components/FiltersSection";
import SortSection from "@/components/SortSection";
import OfferCardPremium from "@/components/OfferCardPremium";
import PaginationSection from "@/components/PaginationSection";
import NavigationPremium from "@/components/NavigationPremium";
import FooterPremium from "@/components/FooterPremium";

export default function ComparateurPage() {
  const navLinks = [
    { href: "/", label: "Accueil", icon: "home" },
    { href: "/comparateurs", label: "Comparateurs", icon: "comparison" },
    { href: "/guides", label: "Guides", icon: "book" },
    { href: "/contact", label: "Contact", icon: "mail" },
  ];

  const footerSections = [
    {
      title: "Comparateurs",
      links: [
        { href: "/comparateurs/box-internet", label: "Box Internet" },
        { href: "/comparateurs/mobile", label: "Mobile" },
        { href: "/comparateurs/box-mobile", label: "Box + Mobile" },
        { href: "/comparateurs/assurance-auto", label: "Assurance Auto" },
        { href: "/comparateurs/assurance-habitation", label: "Assurance Habitation" },
        { href: "/comparateurs/energie", label: "Énergie" },
      ],
    },
    {
      title: "Ressources",
      links: [
        { href: "/guides", label: "Guides pratiques" },
        { href: "/blog", label: "Blog" },
        { href: "/faq", label: "FAQ" },
        { href: "/glossaire", label: "Glossaire" },
      ],
    },
    {
      title: "Entreprise",
      links: [
        { href: "/a-propos", label: "À propos" },
        { href: "/equipe", label: "Notre équipe" },
        { href: "/carrieres", label: "Carrières" },
        { href: "/presse", label: "Presse" },
      ],
    },
    {
      title: "Support",
      links: [
        { href: "/contact", label: "Contact" },
        { href: "/support", label: "Centre d'aide" },
        { href: "/statut", label: "Statut du service" },
      ],
    },
  ];

  const socialLinks = [
    { href: "https://facebook.com", icon: "facebook" },
    { href: "https://twitter.com", icon: "twitter" },
    { href: "https://instagram.com", icon: "instagram" },
    { href: "https://linkedin.com", icon: "linkedin" },
  ];

  const legalLinks = [
    { href: "/mentions-legales", label: "Mentions légales" },
    { href: "/politique-confidentialite", label: "Politique de confidentialité" },
    { href: "/cookies", label: "Gestion des cookies" },
    { href: "/cgu", label: "Conditions générales" },
  ];

  const offers = [
    {
      id: "1",
      title: "Forfait Mobile Illimité 5G",
      description: "Appels, SMS et data illimités en France et Europe. 5G incluse sans surcoût.",
      provider: "Orange",
      logo: "https://logo.clearbit.com/orange.com",
      monthlyPrice: 19.99,
      annualSavings: "Économisez 240€ par an",
      badge: "Meilleur choix" as const,
      rating: 4.8,
      verified: true,
      couponCode: "PROMO20",
      couponEndsAt: "2024-12-31",
      rankReason: "Meilleur rapport qualité-prix selon nos algorithmes",
      tags: ["Profil compatible", "Souscription rapide", "Vérifiable", "5G incluse"],
      cashback: "50€ de cashback offerts",
      affiliateUrl: "#",
      categorySlug: "mobile",
    },
    {
      id: "2",
      title: "Forfait Mobile 100Go",
      description: "100Go de data 4G/5G en France. Appels et SMS illimités.",
      provider: "SFR",
      logo: "https://logo.clearbit.com/sfr.fr",
      monthlyPrice: 14.99,
      annualSavings: "Économisez 180€ par an",
      badge: "Meilleur prix" as const,
      rating: 4.5,
      verified: true,
      tags: ["Profil compatible", "Souscription rapide", "Économique"],
      affiliateUrl: "#",
      categorySlug: "mobile",
    },
    {
      id: "3",
      title: "Forfait Mobile Illimité",
      description: "Appels, SMS et data illimités en France. Réseau 4G performant.",
      provider: "Bouygues Telecom",
      logo: "https://logo.clearbit.com/bouyguestelecom.fr",
      monthlyPrice: 17.99,
      annualSavings: "Économisez 216€ par an",
      badge: "Sponsorisé" as const,
      rating: 4.3,
      tags: ["Souscription rapide", "Réseau performant"],
      cashback: "30€ de cashback offerts",
      affiliateUrl: "#",
      categorySlug: "mobile",
    },
  ];

  const filterGroups = [
    {
      id: "data",
      label: "Volume de data",
      type: "checkbox" as const,
      options: [
        { value: "illimite", label: "Illimité" },
        { value: "100go", label: "100Go" },
        { value: "50go", label: "50Go" },
        { value: "20go", label: "20Go" },
      ],
    },
    {
      id: "reseau",
      label: "Réseau",
      type: "checkbox" as const,
      options: [
        { value: "5g", label: "5G" },
        { value: "4g", label: "4G" },
      ],
    },
    {
      id: "prix",
      label: "Fourchette de prix",
      type: "checkbox" as const,
      options: [
        { value: "moins-15", label: "Moins de 15€" },
        { value: "15-20", label: "15€ – 20€" },
        { value: "20-30", label: "20€ – 30€" },
        { value: "plus-30", label: "30€+" },
      ],
    },
  ];

  const sortOptions = [
    { value: "recommended", label: "Recommandés", icon: "star" },
    { value: "price-asc", label: "Prix ↑", icon: "trending-up" },
    { value: "price-desc", label: "Prix ↓", icon: "trending-down" },
    { value: "rating", label: "Mieux notés", icon: "thumbs-up" },
    { value: "savings", label: "Économies", icon: "dollar-sign" },
  ];

  const trustItems: { icon: IconName; label: string }[] = [
    { icon: "shield", label: "Gratuit & sans engagement" },
    { icon: "clock", label: "Résultats en 2 min" },
    { icon: "sparkles", label: "Classement transparent" },
  ];

  return (
    <div className="min-h-screen bg-[#05070d] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(34,211,238,0.14),transparent_28%),radial-gradient(circle_at_88%_4%,rgba(59,130,246,0.12),transparent_24%)]" />

      <NavigationPremium
        logo={{ href: "/", label: "CompareTesFactures", icon: "logo" }}
        links={navLinks}
        cta={{ href: "/comparateurs", label: "Comparer maintenant", icon: "comparison" }}
      />

      <div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <Breadcrumb
          items={[
            { href: "/", label: "Accueil", icon: "home" },
            { href: "/comparateurs", label: "Comparateurs", icon: "comparison" },
            { label: "Mobile", icon: "phone" },
          ]}
          className="mb-6"
        />

        <header className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_42%)]" />
          <div className="relative flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
                <BrandIcon name="phone" className="h-3.5 w-3.5" />
                Comparateur mobile
              </div>
              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Compare les meilleures offres mobile
              </h1>
              <p className="mt-3 text-base leading-7 text-slate-300">
                Filtre par data, réseau et budget. Les offres sont classées par pertinence, prix et
                économies annuelles estimées.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {trustItems.map((item) => (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/50 px-3 py-2 text-xs font-medium text-slate-300"
                  >
                    <BrandIcon name={item.icon} className="h-3.5 w-3.5 text-cyan-300" />
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
            <CategoryBadge category="Mobile" icon="phone" variant="primary" />
          </div>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <FiltersSection
              layout="sidebar"
              filterGroups={filterGroups}
              onFilterChange={() => undefined}
            />
          </aside>

          <div>
            <div className="mb-6 flex flex-col gap-4 rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-emerald-300/90">Résultats</p>
                <h2 className="mt-1 text-xl font-bold text-white">
                  {offers.length} offres correspondantes
                </h2>
              </div>
              <SortSection
                variant="pills"
                sortOptions={sortOptions}
                defaultSort="recommended"
                onSortChange={() => undefined}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
              {offers.map((offer, index) => (
                <OfferCardPremium
                  key={offer.id}
                  offer={offer}
                  variant={index === 0 ? "featured" : "default"}
                  className={index === 0 ? "md:col-span-2" : ""}
                />
              ))}
            </div>

            <div className="mt-10">
              <PaginationSection currentPage={1} totalPages={5} basePath="/comparateurs/mobile" />
            </div>
          </div>
        </div>

        <section className="mt-14 overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-600/10 p-8 text-center">
          <h3 className="text-2xl font-bold text-white">Besoin d&apos;aide pour choisir ?</h3>
          <p className="mx-auto mt-3 max-w-2xl text-slate-300">
            Nos experts t&apos;aident à comparer les forfaits selon ton usage réel, sans engagement.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg">
              <BrandIcon name="phone" className="mr-2 h-4 w-4" />
              Nous appeler
            </Button>
            <Button variant="secondary" size="lg">
              <BrandIcon name="mail" className="mr-2 h-4 w-4" />
              Nous écrire
            </Button>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Exemple UI — page démo ·{" "}
            <Link href="/comparateurs/mobile" className="text-cyan-300 underline-offset-2 hover:underline">
              Voir le comparateur live
            </Link>
          </p>
        </section>
      </div>

      <FooterPremium
        sections={footerSections}
        socialLinks={socialLinks}
        legalLinks={legalLinks}
        copyright="© 2024 CompareTesFactures. Tous droits réservés."
      />
    </div>
  );
}
