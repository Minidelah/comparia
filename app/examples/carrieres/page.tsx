"use client";

import Link from "next/link";
import BrandIcon from "@/components/BrandIcon";
import { Button } from "@/components/ui/Button";
import Breadcrumb from "@/components/Breadcrumb";
import NavigationPremium from "@/components/NavigationPremium";
import FooterPremium from "@/components/FooterPremium";
import Container from "@/components/Container";
import Card from "@/components/Card";
import CardHeader from "@/components/CardHeader";
import CardBody from "@/components/CardBody";
import CardFooter from "@/components/CardFooter";
import Badge from "@/components/Badge";
import Tag from "@/components/Tag";

export default function CarrieresPage() {
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
      href: "/equipe",
      label: "Notre équipe",
      icon: "users",
    },
    {
      href: "/carrieres",
      label: "Carrières",
      icon: "briefcase",
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

  const jobOffers = [
    {
      id: "1",
      title: "Développeur Full-Stack Senior",
      location: "Paris (Hybride)",
      type: "CDI",
      salary: "60-80k€",
      description: "Rejoignez notre équipe technique pour développer et améliorer notre plateforme de comparaison. Expérience requise en React, Node.js et TypeScript.",
      requirements: ["5+ ans d'expérience", "React/Node.js", "TypeScript", "Expérience avec les APIs"],
      benefits: ["Télétravail 3j/semaine", "Tickets restaurant", "Mutuelle", "Formations"],
      tags: ["Tech", "Développement", "Full-time"],
    },
    {
      id: "2",
      title: "Product Designer",
      location: "Paris (Hybride)",
      type: "CDI",
      salary: "50-70k€",
      description: "Concevez des expériences utilisateur exceptionnelles pour notre plateforme. Expérience en UX/UI et maîtrise de Figma requise.",
      requirements: ["3+ ans d'expérience", "Figma", "UX/UI Design", "Prototypage"],
      benefits: ["Télétravail 2j/semaine", "Matériel Apple", "Conférences", "Mutuelle"],
      tags: ["Design", "UX/UI", "Full-time"],
    },
    {
      id: "3",
      title: "Responsable Marketing Digital",
      location: "Paris (Hybride)",
      type: "CDI",
      salary: "55-75k€",
      description: "Pilotez notre stratégie marketing et faites grandir notre communauté d'utilisateurs. Expérience en acquisition et fidélisation.",
      requirements: ["5+ ans d'expérience", "SEO/SEA", "Réseaux sociaux", "Analytique"],
      benefits: ["Télétravail flexible", "Bonus performance", "Formations", "Mutuelle"],
      tags: ["Marketing", "Growth", "Full-time"],
    },
    {
      id: "4",
      title: "Data Analyst",
      location: "Paris (Hybride)",
      type: "CDI",
      salary: "45-65k€",
      description: "Analysez les données utilisateurs pour améliorer nos algorithmes de recommandation. Expérience en SQL et Python requise.",
      requirements: ["3+ ans d'expérience", "SQL", "Python", "Data Visualization"],
      benefits: ["Télétravail 3j/semaine", "Formations certifiantes", "Mutuelle", "CE"],
      tags: ["Data", "Analyse", "Full-time"],
    },
    {
      id: "5",
      title: "Customer Support Specialist",
      location: "Remote",
      type: "CDI",
      salary: "35-45k€",
      description: "Rejoignez notre équipe support pour offrir une assistance exceptionnelle à nos utilisateurs. Expérience en support client requise.",
      requirements: ["2+ ans d'expérience", "Support client", "Zendesk", "Empathie"],
      benefits: ["100% remote", "Horaires flexibles", "Formations", "Mutuelle"],
      tags: ["Support", "Client", "Full-time"],
    },
    {
      id: "6",
      title: "Content Writer",
      location: "Remote",
      type: "Freelance",
      salary: "300-500€/article",
      description: "Rédigez des articles et guides pour notre blog. Expérience en rédaction web et SEO requise.",
      requirements: ["2+ ans d'expérience", "Rédaction web", "SEO", "Français natif"],
      benefits: ["100% remote", "Flexibilité", "Visibilité", "Rémunération attractive"],
      tags: ["Content", "Rédaction", "Freelance"],
    },
  ];

  const benefits = [
    {
      title: "Environnement de travail",
      description: "Bureaux modernes au cœur de Paris avec espaces collaboratifs et salles de détente.",
      icon: "home",
    },
    {
      title: "Flexibilité",
      description: "Politique de télétravail flexible selon les postes (2 à 3 jours par semaine).",
      icon: "clock",
    },
    {
      title: "Avantages sociaux",
      description: "Mutuelle, tickets restaurant, participation aux transports, et bien plus.",
      icon: "gift",
    },
    {
      title: "Développement",
      description: "Formations régulières, conférences et opportunités de croissance.",
      icon: "trending-up",
    },
    {
      title: "Équilibre vie pro/perso",
      description: "Horaires flexibles, RTT et politique de congés généreuse.",
      icon: "heart",
    },
    {
      title: "Équipement",
      description: "Matériel haut de gamme (MacBook Pro, écrans 4K, etc.) fourni.",
      icon: "monitor",
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
            { href: "/a-propos", label: "À propos", icon: "info" },
            { label: "Carrières", icon: "briefcase" },
          ]}
          className="mb-6"
        />

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Rejoignez notre équipe</h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            Nous recherchons des talents passionnés pour nous aider à révolutionner 
            l'expérience de comparaison en ligne
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="#offres">
              <Button variant="primary" size="lg" className="gap-2">
                <BrandIcon name="search" className="h-4 w-4" />
                Voir nos offres
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
              <BrandIcon name="users" className="h-4 w-4 text-primary-400" />
              <span>50+ collaborateurs</span>
            </div>
            <div className="flex items-center gap-2">
              <BrandIcon name="star" className="h-4 w-4 text-amber-400" />
              <span>4.9/5 satisfaction employés</span>
            </div>
            <div className="flex items-center gap-2">
              <BrandIcon name="globe" className="h-4 w-4 text-success-400" />
              <span>Environnement international</span>
            </div>
          </div>
        </div>

        {/* Why join us */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Pourquoi nous rejoindre ?</h2>
          <p className="text-xl text-neutral-400 mb-8 text-center max-w-3xl mx-auto">
            Chez CompareTesFactures, nous offrons bien plus qu'un emploi - une opportunité de faire partie 
            d'une équipe dynamique et innovante
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <Card key={index} variant="glass">
                <CardHeader
                  title={benefit.title}
                  icon={<BrandIcon name={benefit.icon} className="h-6 w-6 text-primary-400" />}
                />
                <CardBody>
                  <p className="text-neutral-300">{benefit.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* Job offers */}
        <div id="offres" className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Nos offres d'emploi</h2>
          <p className="text-xl text-neutral-400 mb-8 text-center max-w-3xl mx-auto">
            Découvrez les opportunités disponibles et postulez en ligne
          </p>

          <div className="grid gap-6">
            {jobOffers.map((job) => (
              <Card key={job.id} variant={job.id === "1" ? "featured" : "default"}>
                <CardHeader
                  title={job.title}
                  subtitle={
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <BrandIcon name="map-pin" className="h-3 w-3" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <BrandIcon name="briefcase" className="h-3 w-3" />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <BrandIcon name="dollar-sign" className="h-3 w-3" />
                        {job.salary}
                      </span>
                    </div>
                  }
                />
                <CardBody>
                  <p className="text-neutral-300 mb-4">{job.description}</p>

                  <div className="mb-4">
                    <h3 className="font-semibold text-white mb-2">Profil recherché :</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-300">
                      {job.requirements.map((req, reqIndex) => (
                        <li key={reqIndex}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-semibold text-white mb-2">Avantages :</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.benefits.map((benefit, benefitIndex) => (
                        <Badge key={benefitIndex} label={benefit} variant="success" size="sm" />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag, tagIndex) => (
                      <Tag key={tagIndex} label={tag} variant="outline" />
                    ))}
                  </div>
                </CardBody>
                <CardFooter>
                  <Link
                    href={`/carrieres/${job.id}`}
                    className="btn-premium inline-flex items-center justify-center gap-2"
                  >
                    <BrandIcon name="mail" className="h-4 w-4" />
                    Postuler maintenant
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-neutral-400 mb-4">
              Vous ne trouvez pas l'offre qui vous correspond ?
            </p>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="gap-2">
                <BrandIcon name="mail" className="h-4 w-4" />
                Envoyer une candidature spontanée
              </Button>
            </Link>
          </div>
        </div>

        {/* Process */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Notre processus de recrutement</h2>
          <p className="text-xl text-neutral-400 mb-8 text-center max-w-3xl mx-auto">
            Découvrez les étapes de notre processus de recrutement transparent et efficace
          </p>

          <div className="grid gap-8 md:grid-cols-4">
            {[
              {
                step: 1,
                title: "Candidature",
                description: "Envoyez votre CV et lettre de motivation via notre plateforme.",
                icon: "mail",
              },
              {
                step: 2,
                title: "Entretien téléphonique",
                description: "Échange de 30 minutes avec notre équipe RH pour faire connaissance.",
                icon: "phone",
              },
              {
                step: 3,
                title: "Entretien technique",
                description: "Discussion approfondie avec l'équipe concernée et cas pratique.",
                icon: "briefcase",
              },
              {
                step: 4,
                title: "Décision finale",
                description: "Retour sous 48h avec notre décision et proposition si positive.",
                icon: "check",
              },
            ].map((step, index) => (
              <Card key={index} variant="glass">
                <CardHeader
                  title={
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white font-bold">
                        {step.step}
                      </span>
                      {step.title}
                    </div>
                  }
                />
                <CardBody>
                  <p className="text-neutral-300">{step.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Prêt à nous rejoindre ?
          </h2>
          <p className="text-neutral-400 mb-6 max-w-2xl mx-auto">
            Postulez dès maintenant et faites partie d'une équipe qui révolutionne 
            l'expérience de comparaison en ligne
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#offres">
              <Button variant="primary" size="lg" className="gap-2">
                <BrandIcon name="search" className="h-4 w-4" />
                Voir les offres
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
              <BrandIcon name="shield" className="h-4 w-4 text-primary-400" />
              <span>Processus transparent</span>
            </div>
            <div className="flex items-center gap-2">
              <BrandIcon name="clock" className="h-4 w-4 text-success-400" />
              <span>Réponse sous 48h</span>
            </div>
            <div className="flex items-center gap-2">
              <BrandIcon name="smile" className="h-4 w-4 text-warning-400" />
              <span>Environnement bienveillant</span>
            </div>
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