"use client";

import Link from "next/link";
import BrandIcon from "@/components/BrandIcon";
import { Button } from "@/components/ui/Button";
import Breadcrumb from "@/components/Breadcrumb";
import NavigationPremium from "@/components/NavigationPremium";
import FooterPremium from "@/components/FooterPremium";
import TeamSection from "@/components/TeamSection";
import StatsSection from "@/components/StatsSection";
import Container from "@/components/Container";

export default function TeamPage() {
  const navLinks = [
    {
      href: "/",
      label: "Accueil",
      icon: "home",
    },
    {
      href: "/a-propos",
      label: "À propos",
      icon: "info",
    },
    {
      href: "/examples/team",
      label: "Notre équipe",
      icon: "users",
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

  const teamMembers = [
    {
      name: "Jean Dupont",
      role: "Fondateur & CEO",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Entrepreneur passionné par les nouvelles technologies, Jean a fondé Comparia en 2018 avec pour mission de simplifier la comparaison des offres pour les consommateurs.",
      social: [
        { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
        { name: "Twitter", url: "https://twitter.com", icon: "twitter" },
      ],
    },
    {
      name: "Marie Martin",
      role: "Directrice Marketing",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Experte en marketing digital avec plus de 10 ans d'expérience, Marie dirige notre stratégie de croissance et de communication.",
      social: [
        { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
        { name: "Instagram", url: "https://instagram.com", icon: "instagram" },
      ],
    },
    {
      name: "Thomas Leroy",
      role: "CTO",
      avatar: "https://randomuser.me/api/portraits/men/36.jpg",
      bio: "Développeur full-stack et architecte logiciel, Thomas supervise notre équipe technique et s'assure que notre plateforme reste à la pointe de la technologie.",
      social: [
        { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
        { name: "GitHub", url: "https://github.com", icon: "github" },
      ],
    },
    {
      name: "Sophie Bernard",
      role: "Chef de Produit",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      bio: "Spécialiste en UX/UI, Sophie travaille en étroite collaboration avec nos utilisateurs pour créer des expériences intuitives et agréables.",
      social: [
        { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
        { name: "Dribbble", url: "https://dribbble.com", icon: "dribbble" },
      ],
    },
    {
      name: "Pierre Moreau",
      role: "Responsable Partenariats",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg",
      bio: "Avec son expertise du secteur des télécommunications, Pierre développe et entretient nos relations avec les principaux opérateurs.",
      social: [
        { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
        { name: "Twitter", url: "https://twitter.com", icon: "twitter" },
      ],
    },
    {
      name: "Claire Fontaine",
      role: "Responsable Support Client",
      avatar: "https://randomuser.me/api/portraits/women/24.jpg",
      bio: "Claire et son équipe sont dédiés à offrir le meilleur support possible à nos utilisateurs, avec un taux de satisfaction de 98%.",
      social: [
        { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
      ],
    },
    {
      name: "Julien Dubois",
      role: "Data Scientist",
      avatar: "https://randomuser.me/api/portraits/men/28.jpg",
      bio: "Expert en analyse de données, Julien développe nos algorithmes de recommandation pour offrir des suggestions toujours plus pertinentes.",
      social: [
        { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
        { name: "GitHub", url: "https://github.com", icon: "github" },
      ],
    },
    {
      name: "Émilie Lambert",
      role: "Content Manager",
      avatar: "https://randomuser.me/api/portraits/women/36.jpg",
      bio: "Rédactrice talentueuse, Émilie crée du contenu informatif et engageant pour aider nos utilisateurs à mieux comprendre leurs options.",
      social: [
        { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
        { name: "Medium", url: "https://medium.com", icon: "edit" },
      ],
    },
  ];

  const stats = [
    {
      value: "8+",
      label: "Années d'expérience",
      icon: "calendar",
      description: "Dans le secteur de la comparaison en ligne",
    },
    {
      value: "50+",
      label: "Collaborateurs",
      icon: "users",
      description: "Experts dédiés à votre satisfaction",
    },
    {
      value: "1M+",
      label: "Utilisateurs",
      icon: "user-check",
      description: "Qui nous font confiance chaque mois",
    },
    {
      value: "4.9/5",
      label: "Satisfaction",
      icon: "star",
      description: "Note moyenne de nos utilisateurs",
    },
  ];

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
            { href: "/a-propos", label: "À propos", icon: "info" },
            { label: "Notre équipe", icon: "users" },
          ]}
          className="mb-6"
        />

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Notre équipe</h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            Découvrez les talents passionnés qui rendent Comparia possible
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/examples/carrieres">
              <Button variant="primary" size="lg" className="gap-2">
                <BrandIcon name="briefcase" className="h-4 w-4" />
                Rejoindre l'équipe
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg" className="gap-2">
                <BrandIcon name="mail" className="h-4 w-4" />
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <StatsSection
          title="Quelques chiffres"
          description="Découvrez en quelques chiffres ce qui fait la force de Comparia"
          stats={stats}
        />

        {/* Team */}
        <TeamSection
          title="Rencontrez notre équipe"
          description="Une équipe passionnée et experte, dédiée à vous offrir la meilleure expérience de comparaison"
          members={teamMembers}
        />

        {/* CTA */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Vous voulez nous rejoindre ?
          </h2>
          <p className="text-neutral-400 mb-6 max-w-2xl mx-auto">
            Nous sommes toujours à la recherche de talents passionnés pour nous aider à révolutionner 
            le monde de la comparaison en ligne
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/examples/carrieres">
              <Button variant="primary" size="lg" className="gap-2">
                <BrandIcon name="briefcase" className="h-4 w-4" />
                Voir nos offres d'emploi
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg" className="gap-2">
                <BrandIcon name="mail" className="h-4 w-4" />
                Candidature spontanée
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <BrandIcon name="heart" className="h-4 w-4 text-danger-400" />
              <span>Environnement de travail bienveillant</span>
            </div>
            <div className="flex items-center gap-2">
              <BrandIcon name="home" className="h-4 w-4 text-primary-400" />
              <span>Télétravail flexible</span>
            </div>
            <div className="flex items-center gap-2">
              <BrandIcon name="gift" className="h-4 w-4 text-success-400" />
              <span>Avantages attractifs</span>
            </div>
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