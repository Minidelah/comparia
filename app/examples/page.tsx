"use client";

import HeroSection from "@/components/HeroSection";
import ComparatorSection from "@/components/ComparatorSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import FooterPremium from "@/components/FooterPremium";
import NavigationPremium from "@/components/NavigationPremium";

export default function ExamplesPage() {
  const trustPoints = [
    {
      title: "Gratuit et sans engagement",
      description: "Compare sans souscrire et sans frais cachés.",
      icon: "check",
    },
    {
      title: "Méthode transparente",
      description: "Classement clair par adéquation, prix et avantages.",
      icon: "search",
    },
    {
      title: "Données protégées",
      description: "Tes informations sont sécurisées et confidentielles.",
      icon: "lock",
    },
  ];

  const features = [
    {
      title: "Comparaison intelligente",
      description: "Notre algorithme analyse ton profil pour trouver les meilleures offres adaptées à tes besoins spécifiques.",
      icon: "brain",
    },
    {
      title: "Cashback automatique",
      description: "Bénéficie de remises supplémentaires sur tes contrats sans aucune démarche supplémentaire.",
      icon: "gift",
    },
    {
      title: "Suivi personnalisé",
      description: "Reçois des alertes lorsque de meilleures offres deviennent disponibles pour toi.",
      icon: "bell",
    },
    {
      title: "Interface intuitive",
      description: "Une expérience utilisateur fluide et agréable pour comparer en quelques clics.",
      icon: "smile",
    },
    {
      title: "Support réactif",
      description: "Notre équipe est disponible pour répondre à toutes tes questions rapidement.",
      icon: "headset",
    },
    {
      title: "Sécurité renforcée",
      description: "Toutes tes données sont protégées par les derniers standards de sécurité.",
      icon: "shield",
    },
  ];

  const testimonials = [
    {
      quote: "Grâce à CompareTesFactures, j'ai économisé plus de 400€ par an sur mes assurances et mon abonnement mobile. Le service est incroyable !",
      author: "Marie Dupont",
      role: "Utilisatrice depuis 2023",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
    },
    {
      quote: "L'interface est ultra intuitive et les recommandations sont toujours pertinentes. Je recommande à 100% !",
      author: "Thomas Martin",
      role: "Client satisfait",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
    },
    {
      quote: "Enfin un comparateur qui comprend vraiment mes besoins et me propose des offres adaptées. Merci CompareTesFactures !",
      author: "Sophie Leroy",
      role: "Nouvelle cliente",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 4,
    },
  ];

  const faqs = [
    {
      question: "Comment fonctionne le service de comparaison ?",
      answer: "Notre algorithme analyse votre profil et vos besoins pour vous proposer les offres les plus adaptées parmi nos partenaires. Vous pouvez comparer les prix, les avantages et les conditions en toute transparence.",
      icon: "help",
    },
    {
      question: "Est-ce vraiment gratuit ?",
      answer: "Oui, notre service de comparaison est entièrement gratuit. Nous gagnons une commission lorsque vous souscrivez à une offre via notre plateforme, mais cela n'affecte pas le prix que vous payez.",
      icon: "gift",
    },
    {
      question: "Comment sont classées les offres ?",
      answer: "Les offres sont classées par pertinence par rapport à votre profil, puis par prix et avantages. Les offres sponsorisées sont clairement identifiées et ne remplacent jamais les meilleures offres pour vous.",
      icon: "list",
    },
    {
      question: "Puis-je faire confiance aux avis et notes ?",
      answer: "Tous les avis proviennent de nos utilisateurs vérifiés. Nous avons un système de modération strict pour garantir l'authenticité des retours.",
      icon: "star",
    },
  ];

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
      dropdown: [
        {
          href: "/comparateurs/box-internet",
          label: "Box Internet",
          icon: "wifi",
        },
        {
          href: "/comparateurs/forfait-mobile",
          label: "Mobile",
          icon: "phone",
        },
        {
          href: "/comparateurs/assurance-auto",
          label: "Assurances",
          icon: "shield",
        },
        {
          href: "/comparateurs/electricite",
          label: "Énergie",
          icon: "zap",
        },
      ],
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white">
      {/* Navigation */}
      <NavigationPremium
        logo={{ href: "/", label: "CompareTesFactures", icon: "logo" }}
        links={navLinks}
        cta={{ href: "/comparateurs", label: "Comparer maintenant", icon: "comparison" }}
      />

      {/* Hero Section */}
      <HeroSection
        title="Compare tes factures"
        subtitle="en moins de 2 minutes"
        description="Électricité, gaz, mobile, assurances : réponds à quelques questions et vois les offres les plus adaptées à ton profil."
        ctaPrimary={{ href: "/comparateurs", label: "Comparer maintenant" }}
        ctaSecondary={{ href: "#univers-comparetesfactures", label: "Voir les univers" }}
        trustPoints={trustPoints}
      />

      {/* Comparators Section */}
      <ComparatorSection
        title="Nos comparateurs premium"
        description="Découvre tous nos comparateurs pour trouver les meilleures offres adaptées à tes besoins."
        categories={[
          "box-internet",
          "mobile",
          "box-mobile",
          "assurance-auto",
          "assurance-habitation",
          "energie",
        ]}
      />

      {/* Features Section */}
      <FeaturesSection
        title="Pourquoi choisir CompareTesFactures ?"
        description="Découvre toutes les fonctionnalités qui font de CompareTesFactures le meilleur comparateur du marché."
        features={features}
      />

      {/* Testimonials Section */}
      <TestimonialsSection
        title="Ils nous font confiance"
        description="Découvre ce que nos utilisateurs satisfaits disent de notre service de comparaison."
        testimonials={testimonials}
      />

      {/* FAQ Section */}
      <FAQSection
        title="Questions fréquentes"
        description="Trouve les réponses aux questions les plus courantes sur notre service."
        faqs={faqs}
      />

      {/* CTA Section */}
      <CTASection
        title="Prêt à économiser ?"
        description="Rejoins des milliers d'utilisateurs satisfaits et commence à économiser dès aujourd'hui."
        ctaPrimary={{ href: "/comparateurs", label: "Comparer maintenant" }}
        ctaSecondary={{ href: "/contact", label: "Nous contacter" }}
        variant="gradient"
      />

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
