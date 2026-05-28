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

export default function PressePage() {
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
      href: "/examples/presse",
      label: "Presse",
      icon: "newspaper",
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

  const pressReleases = [
    {
      title: "CompareTesFactures lève 10 millions d'euros pour accélérer son développement",
      date: "15 juin 2024",
      excerpt: "CompareTesFactures, leader français de la comparaison en ligne, annonce une levée de fonds de 10 millions d'euros pour renforcer son positionnement et étendre ses services.",
      content: "Paris, le 15 juin 2024 - CompareTesFactures, plateforme innovante de comparaison de contrats et d'abonnements, annonce aujourd'hui une levée de fonds de 10 millions d'euros auprès d'investisseurs français et internationaux. Cette levée de fonds permettra à l'entreprise d'accélérer son développement, d'étendre son offre de services, et de renforcer sa position de leader sur le marché français.",
    },
    {
      title: "CompareTesFactures lance son comparateur d'assurances habitation",
      date: "10 mai 2024",
      excerpt: "CompareTesFactures étend son offre avec un nouveau comparateur d'assurances habitation, permettant aux utilisateurs de trouver la meilleure couverture au meilleur prix.",
      content: "Paris, le 10 mai 2024 - CompareTesFactures, spécialiste de la comparaison en ligne, annonce aujourd'hui le lancement de son nouveau comparateur d'assurances habitation. Ce nouveau service s'ajoute à l'offre existante de l'entreprise, qui comprend déjà des comparateurs pour les forfaits mobile, les box internet, et les offres d'énergie.",
    },
    {
      title: "CompareTesFactures remporte le prix de l'innovation digitale 2024",
      date: "28 avril 2024",
      excerpt: "CompareTesFactures a été récompensée pour son approche innovante de la comparaison en ligne et son engagement en faveur de la transparence.",
      content: "Paris, le 28 avril 2024 - CompareTesFactures a reçu le prix de l'innovation digitale 2024 lors de la cérémonie des Digital Innovation Awards. Ce prix récompense l'approche unique de l'entreprise, qui combine technologie avancée et engagement en faveur de la transparence et de l'objectif pour les consommateurs.",
    },
    {
      title: "CompareTesFactures dépasse le million d'utilisateurs actifs",
      date: "15 mars 2024",
      excerpt: "CompareTesFactures annonce avoir dépassé le cap du million d'utilisateurs actifs mensuels, confirmant son succès sur le marché français.",
      content: "Paris, le 15 mars 2024 - CompareTesFactures, plateforme de comparaison en ligne, annonce aujourd'hui avoir dépassé le million d'utilisateurs actifs mensuels. Cette performance confirme le succès de l'entreprise sur le marché français et sa capacité à répondre aux besoins des consommateurs en matière de comparaison de contrats et d'abonnements.",
    },
  ];

  const pressContacts = [
    {
      name: "Marie Martin",
      role: "Responsable Communication",
      email: "marie.martin@comparetesfactures.fr",
      phone: "01 23 45 67 89",
    },
    {
      name: "Thomas Leroy",
      role: "Directeur Marketing",
      email: "thomas.leroy@comparetesfactures.fr",
      phone: "01 23 45 67 90",
    },
  ];

  const pressKits = [
    {
      title: "Kit presse CompareTesFactures 2024",
      description: "Dossier complet avec toutes les informations sur CompareTesFactures, ses services, et ses chiffres clés.",
      download: "/press-kits/comparetesfactures-2024.zip",
    },
    {
      title: "Logos et visuels",
      description: "Téléchargez nos logos officiels et nos visuels pour vos articles et publications.",
      download: "/press-kits/logos-visuels.zip",
    },
    {
      title: "Photos de l'équipe",
      description: "Photos haute résolution de notre équipe dirigeante et de nos bureaux.",
      download: "/press-kits/photos-equipe.zip",
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
            { label: "Presse", icon: "newspaper" },
          ]}
          className="mb-6"
        />

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Espace Presse</h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            Bienvenue dans notre espace presse. Retrouvez nos communiqués, dossiers de presse et contacts.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="#communiques">
              <Button variant="secondary" size="lg" className="gap-2">
                <BrandIcon name="file-text" className="h-4 w-4" />
                Communiqués de presse
              </Button>
            </Link>
            <Link href="#contacts">
              <Button variant="secondary" size="lg" className="gap-2">
                <BrandIcon name="mail" className="h-4 w-4" />
                Contacts presse
              </Button>
            </Link>
          </div>
        </div>

        {/* Press releases */}
        <div id="communiques" className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Communiqués de presse</h2>

          <div className="grid gap-6">
            {pressReleases.map((release, index) => (
              <Card key={index} variant="glass">
                <CardHeader
                  title={release.title}
                  subtitle={
                    <div className="flex items-center gap-2">
                      <BrandIcon name="calendar" className="h-4 w-4 text-neutral-400" />
                      <span>{release.date}</span>
                    </div>
                  }
                />
                <CardBody>
                  <p className="text-neutral-300 mb-4">{release.excerpt}</p>
                  <p className="text-neutral-300 mb-4">{release.content}</p>
                  <Link href="/contact" className="text-primary-400 hover:underline flex items-center justify-center gap-2">
                    <BrandIcon name="mail" className="h-4 w-4" />
                    Demander plus d'informations
                  </Link>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" className="gap-2">
              <BrandIcon name="plus" className="h-4 w-4" />
              Voir plus de communiqués
            </Button>
          </div>
        </div>

        {/* Press contacts */}
        <div id="contacts" className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Contacts presse</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {pressContacts.map((contact, index) => (
              <Card key={index} variant="glass">
                <CardHeader title={contact.name} />
                <CardBody>
                  <p className="text-neutral-300 mb-2"><strong>Poste :</strong> {contact.role}</p>
                  <p className="text-neutral-300 mb-2"><strong>Email :</strong> {contact.email}</p>
                  <p className="text-neutral-300 mb-4"><strong>Téléphone :</strong> {contact.phone}</p>
                  <Link href={`mailto:${contact.email}`} className="btn-outline inline-flex items-center justify-center gap-2">
                    <BrandIcon name="mail" className="h-4 w-4" />
                    Contacter
                  </Link>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* Press kits */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Kits presse</h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pressKits.map((kit, index) => (
              <Card key={index} variant="glass">
                <CardHeader title={kit.title} />
                <CardBody>
                  <p className="text-neutral-300 mb-4">{kit.description}</p>
                  <Link href={kit.download} className="btn-outline inline-flex items-center justify-center gap-2">
                    <BrandIcon name="download" className="h-4 w-4" />
                    Télécharger
                  </Link>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">À propos de CompareTesFactures</h2>

          <Card variant="glass">
            <CardBody>
              <p className="text-neutral-300 mb-4">
                CompareTesFactures est une plateforme française innovante de comparaison en ligne, fondée en 2018 avec pour mission de simplifier la recherche et la souscription de contrats et abonnements pour les consommateurs.
              </p>
              <p className="text-neutral-300 mb-4">
                Grâce à ses algorithmes avancés et son interface intuitive, CompareTesFactures permet aux utilisateurs de comparer facilement les offres de forfaits mobile, box internet, assurances, et énergie, et de trouver les meilleures options adaptées à leurs besoins et leur budget.
              </p>
              <p className="text-neutral-300 mb-4">
                Avec plus d'un million d'utilisateurs actifs mensuels, CompareTesFactures s'est imposée comme un acteur majeur du marché français de la comparaison en ligne, reconnu pour sa transparence, son objectivité, et son engagement en faveur des consommateurs.
              </p>
              <p className="text-neutral-300 mb-4">
                L'entreprise, basée à Paris, emploie plus de 50 collaborateurs et continue de croître rapidement, avec l'ambition de devenir la référence européenne de la comparaison en ligne.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/a-propos">
                  <Button variant="outline" size="lg" className="gap-2">
                    <BrandIcon name="info" className="h-4 w-4" />
                    En savoir plus
                  </Button>
                </Link>
                <Link href="/examples/team">
                  <Button variant="outline" size="lg" className="gap-2">
                    <BrandIcon name="users" className="h-4 w-4" />
                    Notre équipe
                  </Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Vous êtes journaliste ?
          </h2>
          <p className="text-neutral-400 mb-6 max-w-2xl mx-auto">
            Contactez notre équipe presse pour obtenir des informations, organiser des interviews ou demander des visuels
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#contacts">
              <Button variant="primary" size="lg" className="gap-2">
                <BrandIcon name="mail" className="h-4 w-4" />
                Contacter la presse
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg" className="gap-2">
                <BrandIcon name="phone" className="h-4 w-4" />
                Nous appeler
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