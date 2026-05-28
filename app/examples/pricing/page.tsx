"use client";

import Link from "next/link";
import BrandIcon from "@/components/BrandIcon";
import { Button } from "@/components/ui/Button";
import Breadcrumb from "@/components/Breadcrumb";
import NavigationPremium from "@/components/NavigationPremium";
import FooterPremium from "@/components/FooterPremium";
import PricingSection from "@/components/PricingSection";
import ComparisonSection from "@/components/ComparisonSection";
import FAQSection from "@/components/FAQSection";
import Container from "@/components/Container";

export default function PricingPage() {
  const navLinks = [
    {
      href: "/",
      label: "Accueil",
      icon: "home",
    },
    {
      href: "/comparateurs",
      label: "Comparateurs",
      icon: "comparison",
    },
    {
      href: "/guides",
      label: "Guides",
      icon: "book",
    },
    {
      href: "/pricing",
      label: "Tarifs",
      icon: "credit-card",
    },
  ];

  const footerSections = [
    {
      title: "Comparateurs",
      links: [
        { href: "/comparateurs/box-internet", label: "Box Internet" },
        { href: "/comparateurs/forfait-mobile", label: "Mobile" },
        { href: "/comparateurs/box-internet", label: "Box + Mobile" },
        { href: "/comparateurs/assurance-auto", label: "Assurance Auto" },
        { href: "/comparateurs/assurance-habitation", label: "Assurance Habitation" },
        { href: "/comparateurs/electricite", label: "Énergie" },
      ],
    },
    {
      title: "Ressources",
      links: [
        { href: "/guides", label: "Guides pratiques" },
        { href: "/examples/blog", label: "Blog" },
        { href: "/examples/faq", label: "FAQ" },
        { href: "/examples/glossaire", label: "Glossaire" },
      ],
    },
    {
      title: "Entreprise",
      links: [
        { href: "/a-propos", label: "À propos" },
        { href: "/examples/team", label: "Notre équipe" },
        { href: "/examples/carrieres", label: "Carrières" },
        { href: "/examples/presse", label: "Presse" },
      ],
    },
    {
      title: "Support",
      links: [
        { href: "/contact", label: "Contact" },
        { href: "/examples/support", label: "Centre d'aide" },
        { href: "/examples/statut", label: "Statut du service" },
      ],
    },
  ];

  const socialLinks = [
    { href: "https://facebook.com", icon: "facebook" },
    { href: "/comparateurs/forfait-mobile", icon: "twitter" },
    { href: "https://instagram.com", icon: "instagram" },
    { href: "https://linkedin.com", icon: "linkedin" },
  ];

  const legalLinks = [
    { href: "/mentions-legales", label: "Mentions légales" },
    { href: "/politique-confidentialite", label: "Politique de confidentialité" },
    { href: "/cookies", label: "Gestion des cookies" },
    { href: "/examples/cgu", label: "Conditions générales" },
  ];

  const pricingPlans = [
    {
      id: "free",
      name: "Gratuit",
      price: "0€",
      period: "mois",
      description: "Idéal pour découvrir nos services de comparaison",
      features: [
        { name: "Accès à tous les comparateurs", included: true },
        { name: "Comparaison illimitée", included: true },
        { name: "Alertes prix basiques", included: true },
        { name: "Support par email", included: true },
        { name: "Historique des comparaisons", included: false },
        { name: "Alertes personnalisées", included: false },
        { name: "Support prioritaire", included: false },
        { name: "Conseils personnalisés", included: false },
      ],
      cta: {
        href: "/inscription?plan=free",
        label: "S'inscrire gratuitement",
      },
      popular: false,
    },
    {
      id: "premium",
      name: "Premium",
      price: "9,99€",
      period: "mois",
      description: "Pour les utilisateurs réguliers qui veulent optimiser leurs économies",
      features: [
        { name: "Accès à tous les comparateurs", included: true },
        { name: "Comparaison illimitée", included: true },
        { name: "Alertes prix basiques", included: true },
        { name: "Support par email", included: true },
        { name: "Historique des comparaisons", included: true },
        { name: "Alertes personnalisées", included: true },
        { name: "Support prioritaire", included: true },
        { name: "Conseils personnalisés", included: false },
      ],
      cta: {
        href: "/inscription?plan=premium",
        label: "Essayer Premium",
      },
      popular: true,
      recommended: true,
    },
    {
      id: "enterprise",
      name: "Entreprise",
      price: "29,99€",
      period: "mois",
      description: "Solution complète pour les professionnels et entreprises",
      features: [
        { name: "Accès à tous les comparateurs", included: true },
        { name: "Comparaison illimitée", included: true },
        { name: "Alertes prix basiques", included: true },
        { name: "Support par email", included: true },
        { name: "Historique des comparaisons", included: true },
        { name: "Alertes personnalisées", included: true },
        { name: "Support prioritaire", included: true },
        { name: "Conseils personnalisés", included: true },
        { name: "Tableau de bord avancé", included: true },
        { name: "API d'intégration", included: true },
        { name: "Gestion multi-utilisateurs", included: true },
      ],
      cta: {
        href: "/contact?subject=enterprise",
        label: "Nous contacter",
      },
      popular: false,
    },
  ];

  const comparisonItems = [
    {
      title: "CompareTesFactures Free",
      features: [
        { name: "Comparaisons illimitées", value: true },
        { name: "Alertes prix", value: "Basiques" },
        { name: "Historique", value: "30 jours" },
        { name: "Support", value: "Email" },
        { name: "Conseils personnalisés", value: false },
        { name: "Tableau de bord", value: false },
        { name: "API", value: false },
        { name: "Prix", value: "0€/mois" },
      ],
      cta: {
        href: "/inscription?plan=free",
        label: "Choisir Free",
      },
    },
    {
      title: "CompareTesFactures Premium",
      features: [
        { name: "Comparaisons illimitées", value: true },
        { name: "Alertes prix", value: "Personnalisées" },
        { name: "Historique", value: "Illimité" },
        { name: "Support", value: "Prioritaire" },
        { name: "Conseils personnalisés", value: true },
        { name: "Tableau de bord", value: false },
        { name: "API", value: false },
        { name: "Prix", value: "9,99€/mois" },
      ],
      cta: {
        href: "/inscription?plan=premium",
        label: "Choisir Premium",
      },
      popular: true,
    },
    {
      title: "CompareTesFactures Enterprise",
      features: [
        { name: "Comparaisons illimitées", value: true },
        { name: "Alertes prix", value: "Personnalisées" },
        { name: "Historique", value: "Illimité" },
        { name: "Support", value: "Dédié" },
        { name: "Conseils personnalisés", value: true },
        { name: "Tableau de bord", value: true },
        { name: "API", value: true },
        { name: "Prix", value: "29,99€/mois" },
      ],
      cta: {
        href: "/contact?subject=enterprise",
        label: "Choisir Enterprise",
      },
    },
  ];

  const comparisonFeatures = [
    "Comparaisons illimitées",
    "Alertes prix",
    "Historique",
    "Support",
    "Conseils personnalisés",
    "Tableau de bord",
    "API",
    "Prix",
  ];

  const faqs = [
    {
      question: "Puis-je changer de plan à tout moment ?",
      answer: "Oui, vous pouvez changer de plan à tout moment depuis votre espace client. Le changement est immédiat et le prix est ajusté au prorata.",
      icon: "refresh-cw",
    },
    {
      question: "Y a-t-il un engagement ?",
      answer: "Non, tous nos plans sont sans engagement. Vous pouvez résilier à tout moment sans frais.",
      icon: "unlock",
    },
    {
      question: "Comment puis-je payer ?",
      answer: "Nous acceptons les cartes bancaires (Visa, Mastercard, American Express) et les paiements par PayPal.",
      icon: "credit-card",
    },
    {
      question: "Offrez-vous une période d'essai ?",
      answer: "Oui, notre plan Premium offre une période d'essai de 14 jours. Si vous n'êtes pas satisfait, vous pouvez annuler sans frais.",
      icon: "clock",
    },
    {
      question: "Puis-je utiliser CompareTesFactures pour mon entreprise ?",
      answer: "Absolument ! Notre plan Enterprise est spécialement conçu pour les professionnels et les entreprises.",
      icon: "briefcase",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white">
      {/* Navigation */}
      <NavigationPremium
        logo={{ href: "/", label: "CompareTesFactures", icon: "logo" }}
        links={navLinks}
        cta={{ href: "/comparateurs", label: "Comparer maintenant", icon: "comparison" }}
      />

      <Container className="py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { href: "/", label: "Accueil", icon: "home" },
            { label: "Tarifs", icon: "credit-card" },
          ]}
          className="mb-6"
        />

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Nos offres</h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            Choisissez le plan qui correspond le mieux à vos besoins et commencez à économiser dès aujourd'hui
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-success-400/30 bg-success-400/10 px-4 py-2 text-sm font-semibold text-success-300">
              <BrandIcon name="check" className="h-4 w-4" />
              Sans engagement
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-400/30 bg-primary-400/10 px-4 py-2 text-sm font-semibold text-primary-300">
              <BrandIcon name="shield" className="h-4 w-4" />
              Paiement sécurisé
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
              <BrandIcon name="gift" className="h-4 w-4" />
              14 jours satisfait ou remboursé
            </span>
          </div>
        </div>

        {/* Pricing plans */}
        <PricingSection
          title="Nos plans tarifaires"
          description="Trouvez le plan parfait pour vos besoins de comparaison"
          plans={pricingPlans}
        />

        {/* Comparison table */}
        <ComparisonSection
          title="Comparaison détaillée"
          description="Comparez les fonctionnalités de chaque plan pour faire le meilleur choix"
          items={comparisonItems}
          features={comparisonFeatures}
        />

        {/* FAQ */}
        <FAQSection
          title="Questions fréquentes"
          description="Trouvez les réponses à vos questions sur nos plans et tarifs"
          faqs={faqs}
        />

        {/* CTA */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Prêt à économiser ?
          </h2>
          <p className="text-neutral-400 mb-6 max-w-2xl mx-auto">
            Choisissez votre plan et commencez à comparer dès aujourd'hui
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/inscription?plan=premium">
              <Button variant="primary" size="lg" className="gap-2">
                <BrandIcon name="star" className="h-4 w-4" />
                Commencer avec Premium
              </Button>
            </Link>
            <Link href="/comparateurs">
              <Button variant="secondary" size="lg" className="gap-2">
                <BrandIcon name="comparison" className="h-4 w-4" />
                Essayer gratuitement
              </Button>
            </Link>
          </div>

          <p className="mt-4 text-sm text-neutral-500">
            Pas de carte bancaire requise pour l'essai gratuit
          </p>
        </div>
      </Container>

      {/* Footer */}
      <FooterPremium
        sections={footerSections}
        socialLinks={socialLinks}
        legalLinks={legalLinks}
        copyright="© 2024 CompareTesFactures. Tous droits réservés."
      />
    </div>
  );
}