"use client";

import Link from "next/link";
import BrandIcon from "@/components/BrandIcon";
import { Button } from "@/components/ui/Button";
import Breadcrumb from "@/components/Breadcrumb";
import NavigationPremium from "@/components/NavigationPremium";
import FooterPremium from "@/components/FooterPremium";
import ContactSection from "@/components/ContactSection";
import ContactFormSection, { type FormField } from "@/components/ContactFormSection";
import FAQSection from "@/components/FAQSection";
import Container from "@/components/Container";

export default function ContactPage() {
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
    { href: "https://twitter.com", icon: "twitter" },
    { href: "https://instagram.com", icon: "instagram" },
    { href: "https://linkedin.com", icon: "linkedin" },
  ];

  const legalLinks = [
    { href: "/mentions-legales", label: "Mentions légales" },
    { href: "/politique-confidentialite", label: "Politique de confidentialité" },
    { href: "/cookies", label: "Gestion des cookies" },
    { href: "/examples/cgu", label: "Conditions générales" },
  ];

  const contactMethods = [
    {
      type: "Email",
      value: "contact@comparetesfactures.fr",
      icon: "mail",
      href: "mailto:contact@comparetesfactures.fr",
    },
    {
      type: "Téléphone",
      value: "01 23 45 67 89",
      icon: "phone",
      href: "tel:+33123456789",
    },
    {
      type: "Adresse",
      value: "123 Rue de la Comparaison, 75001 Paris, France",
      icon: "map-pin",
    },
    {
      type: "Chat en direct",
      value: "Disponible 9h-18h, du lundi au vendredi",
      icon: "message-circle",
      href: "/chat",
    },
  ];

  const formFields: FormField[] = [
    {
      name: "name",
      label: "Nom complet",
      type: "text",
      placeholder: "Votre nom et prénom",
      required: true,
    },
    {
      name: "email",
      label: "Adresse email",
      type: "email",
      placeholder: "votre@email.com",
      required: true,
    },
    {
      name: "phone",
      label: "Téléphone",
      type: "text",
      placeholder: "06 12 34 56 78",
      required: false,
    },
    {
      name: "subject",
      label: "Sujet",
      type: "select",
      placeholder: "Sélectionnez un sujet",
      required: true,
      options: [
        { value: "question", label: "Question générale" },
        { value: "support", label: "Support technique" },
        { value: "partnership", label: "Partenariat" },
        { value: "feedback", label: "Retour/Feedback" },
        { value: "other", label: "Autre" },
      ],
    },
    {
      name: "message",
      label: "Votre message",
      type: "textarea",
      placeholder: "Comment pouvons-nous vous aider ?",
      required: true,
    },
  ];

  const faqs = [
    {
      question: "Quels sont vos horaires d'ouverture ?",
      answer: "Notre service client est disponible du lundi au vendredi de 9h à 18h. Vous pouvez également nous contacter par email 24h/24 et 7j/7.",
      icon: "clock",
    },
    {
      question: "Combien de temps pour une réponse ?",
      answer: "Nous nous engageons à répondre à toutes les demandes sous 24 heures ouvrées. Pour les questions urgentes, notre chat en direct offre une réponse immédiate pendant les horaires d'ouverture.",
      icon: "mail",
    },
    {
      question: "Comment modifier ou résilier mon contrat ?",
      answer: "Vous pouvez gérer votre contrat directement depuis votre espace client. Pour une résiliation, connectez-vous à votre compte et suivez les instructions dans la section 'Mon contrat'.",
      icon: "file-text",
    },
    {
      question: "Proposez-vous des comparateurs pour les professionnels ?",
      answer: "Oui, nous proposons des solutions dédiées aux professionnels et entreprises. Contactez notre service entreprise pour en savoir plus sur nos offres B2B.",
      icon: "briefcase",
    },
  ];

  const handleFormSubmit = async (data: Record<string, string>) => {
    void data;
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 1500);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white">
      {/* Navigation */}
      <NavigationPremium
        logo={{ href: "/", label: "Comparia", icon: "logo" }}
        links={navLinks}
        cta={{ href: "/comparateurs", label: "Comparer maintenant", icon: "comparison" }}
      />

      <Container className="py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { href: "/", label: "Accueil", icon: "home" },
            { label: "Contact", icon: "mail" },
          ]}
          className="mb-6"
        />

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Contactez-nous</h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" className="gap-2">
              <BrandIcon name="phone" className="h-4 w-4" />
              Nous appeler
            </Button>
            <Button variant="secondary" size="lg" className="gap-2">
              <BrandIcon name="message-circle" className="h-4 w-4" />
              Chat en direct
            </Button>
          </div>
        </div>

        {/* Contact methods */}
        <ContactSection
          title="Nos coordonnées"
          description="Plusieurs moyens de nous joindre selon vos préférences"
          contactMethods={contactMethods}
        />

        {/* Contact form */}
        <ContactFormSection
          title="Envoyez-nous un message"
          description="Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais"
          fields={formFields}
          submitLabel="Envoyer le message"
          onSubmit={handleFormSubmit}
          successMessage="Merci pour votre message ! Notre équipe vous répondra sous 24 heures."
        />

        {/* FAQ */}
        <FAQSection
          title="Questions fréquentes"
          description="Consultez notre FAQ avant de nous contacter"
          faqs={faqs}
        />

        {/* Additional CTA */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Besoin d'aide pour comparer ?
          </h2>
          <p className="text-neutral-400 mb-6 max-w-2xl mx-auto">
            Découvrez nos comparateurs et trouvez les meilleures offres en quelques clics
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/comparateurs/box-internet">
              <Button variant="outline" size="lg" className="gap-2">
                <BrandIcon name="wifi" className="h-4 w-4" />
                Comparer les box internet
              </Button>
            </Link>
            <Link href="/comparateurs/forfait-mobile">
              <Button variant="outline" size="lg" className="gap-2">
                <BrandIcon name="phone" className="h-4 w-4" />
                Comparer les forfaits mobile
              </Button>
            </Link>
            <Link href="/comparateurs/electricite">
              <Button variant="outline" size="lg" className="gap-2">
                <BrandIcon name="zap" className="h-4 w-4" />
                Comparer les offres d'énergie
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
        copyright="© 2024 Comparia. Tous droits réservés."
      />
    </div>
  );
}
