"use client";

import Link from "next/link";
import BrandIcon from "@/components/BrandIcon";
import { Button } from "@/components/ui/Button";
import Breadcrumb from "@/components/Breadcrumb";
import NavigationPremium from "@/components/NavigationPremium";
import FooterPremium from "@/components/FooterPremium";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Container from "@/components/Container";

export default function FAQPage() {
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
      href: "/faq",
      label: "FAQ",
      icon: "help",
    },
    {
      href: "/contact",
      label: "Contact",
      icon: "mail",
    },
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

  const generalFAQs = [
    {
      question: "Qu'est-ce que CompareTesFactures ?",
      answer: "CompareTesFactures est une plateforme de comparaison en ligne qui vous permet de trouver les meilleures offres pour vos contrats (mobile, internet, assurance, énergie, etc.) en quelques clics. Notre objectif est de vous aider à économiser du temps et de l'argent en vous proposant des offres adaptées à vos besoins.",
      icon: "info",
    },
    {
      question: "Comment fonctionne le service ?",
      answer: "Notre service est simple : vous sélectionnez la catégorie de contrat que vous souhaitez comparer, vous répondez à quelques questions sur vos besoins, et notre algorithme vous propose les offres les plus adaptées parmi nos partenaires. Vous pouvez ensuite souscrire directement en ligne.",
      icon: "zap",
    },
    {
      question: "Est-ce vraiment gratuit ?",
      answer: "Oui, notre service de comparaison est entièrement gratuit pour les utilisateurs. Nous sommes rémunérés par nos partenaires lorsque vous souscrivez à une offre via notre plateforme, mais cela n'affecte pas le prix que vous payez.",
      icon: "gift",
    },
    {
      question: "Comment sont classées les offres ?",
      answer: "Les offres sont classées par pertinence par rapport à votre profil, puis par prix et avantages. Les offres sponsorisées sont clairement identifiées et ne remplacent jamais les meilleures offres pour vous. Notre algorithme prend en compte de nombreux critères pour vous proposer les offres les plus adaptées.",
      icon: "list",
    },
    {
      question: "Puis-je faire confiance aux avis ?",
      answer: "Tous les avis sur notre plateforme proviennent de nos utilisateurs vérifiés. Nous avons un système de modération strict pour garantir l'authenticité des retours et éviter les faux avis.",
      icon: "star",
    },
  ];

  const mobileFAQs = [
    {
      question: "Comment choisir son forfait mobile ?",
      answer: "Pour bien choisir votre forfait mobile, analysez d'abord votre consommation réelle (appels, SMS, data). Comparez ensuite les offres en fonction de vos besoins et de votre budget. N'oubliez pas de vérifier la couverture réseau dans votre zone géographique.",
      icon: "phone",
    },
    {
      question: "Quelle est la différence entre 4G et 5G ?",
      answer: "La 5G offre des débits bien supérieurs à la 4G (jusqu'à 20 fois plus rapides), une latence réduite et une meilleure capacité à gérer un grand nombre d'appareils connectés simultanément. Cependant, la couverture 5G est encore limitée à certaines zones.",
      icon: "wifi",
    },
    {
      question: "Puis-je garder mon numéro de téléphone ?",
      answer: "Oui, la portabilité du numéro est obligatoire et gratuite en France. Lorsque vous souscrivez à un nouveau forfait, vous pouvez demander à conserver votre numéro actuel. Le transfert prend généralement 24 à 48 heures.",
      icon: "hash",
    },
    {
      question: "Qu'est-ce qu'un forfait sans engagement ?",
      answer: "Un forfait sans engagement vous permet de résilier à tout moment sans frais. Vous n'êtes pas lié par une durée minimale de contrat. C'est idéal si vous voulez rester flexible ou tester un opérateur.",
      icon: "unlock",
    },
    {
      question: "Comment résilier mon forfait actuel ?",
      answer: "Pour résilier votre forfait, vous devez envoyer une lettre de résiliation à votre opérateur actuel. Avec la portabilité du numéro, votre nouvel opérateur peut souvent s'occuper de la résiliation pour vous.",
      icon: "x-circle",
    },
  ];

  const boxFAQs = [
    {
      question: "Quelle est la différence entre ADSL et fibre ?",
      answer: "La fibre optique offre des débits bien supérieurs à l'ADSL (jusqu'à 1 Gbps contre 15 Mbps en moyenne pour l'ADSL), une latence réduite et une meilleure stabilité. La fibre est également moins sensible aux perturbations électromagnétiques.",
      icon: "wifi",
    },
    {
      question: "Comment tester mon éligibilité à la fibre ?",
      answer: "Vous pouvez tester votre éligibilité à la fibre directement sur notre plateforme en entrant votre adresse. Nous vous indiquerons quels opérateurs proposent la fibre chez vous et à quels débits.",
      icon: "search",
    },
    {
      question: "Puis-je changer d'opérateur sans changer de box ?",
      answer: "Non, lorsque vous changez d'opérateur, vous devez généralement retourner l'ancienne box et installer la nouvelle fournie par votre nouvel opérateur. Certains opérateurs proposent cependant des solutions pour faciliter la transition.",
      icon: "refresh-cw",
    },
    {
      question: "Qu'est-ce qu'un dégroupage total ?",
      answer: "Le dégroupage total signifie que l'opérateur a installé ses propres équipements dans le central téléphonique. Cela permet d'offrir des services supplémentaires (TV, téléphonie) et des débits plus élevés que le dégroupage partiel.",
      icon: "server",
    },
    {
      question: "Comment réduire ma facture internet ?",
      answer: "Pour réduire votre facture, comparez régulièrement les offres, négociez avec votre opérateur actuel, ou envisagez de passer à un forfait moins cher si vos besoins ont changé. Nos alertes prix peuvent vous aider à identifier les meilleures promotions.",
      icon: "dollar-sign",
    },
  ];

  const contactMethods = [
    {
      type: "Email",
      value: "support@comparetesfactures.fr",
      icon: "mail",
      href: "mailto:support@comparetesfactures.fr",
    },
    {
      type: "Téléphone",
      value: "01 23 45 67 89",
      icon: "phone",
      href: "tel:+33123456789",
    },
    {
      type: "Chat en direct",
      value: "Disponible 9h-18h",
      icon: "message-circle",
      href: "/chat",
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
            { label: "FAQ", icon: "help" },
          ]}
          className="mb-6"
        />

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Questions fréquentes</h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            Trouvez les réponses aux questions les plus courantes sur nos services
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button variant="primary" size="lg" className="gap-2">
                <BrandIcon name="mail" className="h-4 w-4" />
                Nous contacter
              </Button>
            </Link>
            <Link href="/comparateurs">
              <Button variant="secondary" size="lg" className="gap-2">
                <BrandIcon name="comparison" className="h-4 w-4" />
                Comparer maintenant
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="#general" className="text-neutral-300 hover:text-white">
              Général
            </Link>
            <span className="text-neutral-500">•</span>
            <Link href="#mobile" className="text-neutral-300 hover:text-white">
              Mobile
            </Link>
            <span className="text-neutral-500">•</span>
            <Link href="#box" className="text-neutral-300 hover:text-white">
              Box Internet
            </Link>
          </div>
        </div>

        {/* General FAQ */}
        <section id="general" className="mb-12">
          <FAQSection
            title="Général"
            description="Questions sur le fonctionnement général de CompareTesFactures"
            faqs={generalFAQs}
          />
        </section>

        {/* Mobile FAQ */}
        <section id="mobile" className="mb-12">
          <FAQSection
            title="Mobile"
            description="Questions sur les forfaits mobile et la téléphonie"
            faqs={mobileFAQs}
          />
        </section>

        {/* Box FAQ */}
        <section id="box" className="mb-12">
          <FAQSection
            title="Box Internet"
            description="Questions sur les offres internet et la fibre"
            faqs={boxFAQs}
          />
        </section>

        {/* Contact */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">
            Vous n'avez pas trouvé de réponse ?
          </h2>
          <p className="text-xl text-neutral-400 mb-8 text-center max-w-3xl mx-auto">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
          </p>

          <ContactSection
            title="Contactez-nous"
            description="Plusieurs moyens de nous joindre selon vos préférences"
            contactMethods={contactMethods}
          />

          <div className="mt-8 text-center">
            <Link href="/contact">
              <Button variant="primary" size="lg" className="gap-2">
                <BrandIcon name="mail" className="h-4 w-4" />
                Accéder au formulaire de contact
              </Button>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Découvrez nos comparateurs
          </h2>
          <p className="text-neutral-400 mb-6 max-w-2xl mx-auto">
            Comparez les meilleures offres du marché et économisez dès aujourd'hui
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/comparateurs/mobile">
              <Button variant="outline" size="lg" className="gap-2">
                <BrandIcon name="phone" className="h-4 w-4" />
                Forfaits mobile
              </Button>
            </Link>
            <Link href="/comparateurs/box-internet">
              <Button variant="outline" size="lg" className="gap-2">
                <BrandIcon name="wifi" className="h-4 w-4" />
                Box internet
              </Button>
            </Link>
            <Link href="/comparateurs/energie">
              <Button variant="outline" size="lg" className="gap-2">
                <BrandIcon name="zap" className="h-4 w-4" />
                Énergie
              </Button>
            </Link>
          </div>
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