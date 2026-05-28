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
import Badge from "@/components/Badge";

export default function GlossairePage() {
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
      href: "/examples/glossaire",
      label: "Glossaire",
      icon: "book-open",
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

  const glossaryTerms = [
    {
      term: "ADSL",
      definition: "Asymmetric Digital Subscriber Line. Technologie de transmission de données à haut débit sur les lignes téléphoniques en cuivre. L'ADSL permet des débits descendants (download) plus élevés que les débits montants (upload).",
      category: "Internet",
    },
    {
      term: "Débit",
      definition: "Quantité de données transmises par unité de temps, généralement exprimée en mégabits par seconde (Mbps) ou gigabits par seconde (Gbps). Le débit détermine la vitesse de votre connexion internet.",
      category: "Internet",
    },
    {
      term: "Fibre optique",
      definition: "Technologie de transmission de données utilisant des fils de verre ou de plastique pour transmettre des signaux lumineux. La fibre offre des débits bien supérieurs à l'ADSL et une meilleure stabilité.",
      category: "Internet",
    },
    {
      term: "Latence",
      definition: "Temps de réponse d'un réseau, mesuré en millisecondes (ms). Une latence faible est cruciale pour les applications en temps réel comme les jeux en ligne ou la visioconférence.",
      category: "Internet",
    },
    {
      term: "Forfait mobile",
      definition: "Contrat entre un opérateur téléphonique et un utilisateur, offrant des services de téléphonie mobile (appels, SMS, data) pour une durée déterminée ou sans engagement.",
      category: "Mobile",
    },
    {
      term: "Data mobile",
      definition: "Volume de données internet inclus dans un forfait mobile, exprimé en gigaoctets (Go) ou mégaoctets (Mo). La data permet de naviguer sur internet depuis un appareil mobile.",
      category: "Mobile",
    },
    {
      term: "Roaming",
      definition: "Utilisation de votre forfait mobile à l'étranger. Le roaming peut entraîner des frais supplémentaires selon votre forfait et votre destination.",
      category: "Mobile",
    },
    {
      term: "5G",
      definition: "Cinquième génération de réseaux mobiles, offrant des débits plus élevés, une latence réduite et une meilleure capacité à gérer un grand nombre d'appareils connectés.",
      category: "Mobile",
    },
    {
      term: "Box internet",
      definition: "Équipement fourni par un fournisseur d'accès à internet (FAI) qui permet de connecter plusieurs appareils à internet via un réseau local (Wi-Fi ou Ethernet).",
      category: "Internet",
    },
    {
      term: "Dégroupage",
      definition: "Processus par lequel un opérateur autre que l'opérateur historique (Orange en France) prend le contrôle d'une ligne téléphonique pour proposer ses propres services.",
      category: "Internet",
    },
    {
      term: "IP fixe",
      definition: "Adresse IP qui ne change pas à chaque connexion, contrairement à une IP dynamique. Utile pour héberger un serveur ou accéder à distance à un réseau.",
      category: "Internet",
    },
    {
      term: "VOD",
      definition: "Video On Demand. Service permettant de regarder des films et séries à la demande, souvent inclus dans les offres box internet.",
      category: "Internet",
    },
    {
      term: "Assurance tous risques",
      definition: "Contrat d'assurance couvrant un large éventail de risques pour un bien ou une personne, avec des garanties étendues.",
      category: "Assurance",
    },
    {
      term: "Franchise",
      definition: "Montant restant à la charge de l'assuré en cas de sinistre. Par exemple, une franchise de 100€ signifie que vous payez les 100 premiers euros de réparations.",
      category: "Assurance",
    },
    {
      term: "Bonus-malus",
      definition: "Système de coefficient appliqué aux contrats d'assurance auto, récompensant les bons conducteurs (bonus) et pénalisant les conducteurs responsables d'accidents (malus).",
      category: "Assurance",
    },
    {
      term: "Tiers",
      definition: "Personne autre que l'assuré et l'assureur, pouvant être impliquée dans un sinistre (par exemple, un autre conducteur en cas d'accident de voiture).",
      category: "Assurance",
    },
    {
      term: "kWh",
      definition: "Kilowattheure. Unité de mesure de l'énergie électrique consommée. 1 kWh = 1000 watts pendant 1 heure.",
      category: "Énergie",
    },
    {
      term: "Tarif réglementé",
      definition: "Prix de l'électricité ou du gaz fixé par les pouvoirs publics, applicable aux fournisseurs historiques (EDF pour l'électricité, Engie pour le gaz).",
      category: "Énergie",
    },
    {
      term: "Tarif de marché",
      definition: "Prix de l'électricité ou du gaz fixé librement par les fournisseurs alternatifs, en concurrence avec les tarifs réglementés.",
      category: "Énergie",
    },
    {
      term: "Heures creuses",
      definition: "Périodes pendant lesquelles le prix de l'électricité est moins cher, généralement la nuit. Les heures creuses varient selon les régions et les fournisseurs.",
      category: "Énergie",
    },
    {
      term: "Cashback",
      definition: "Somme d'argent remise à l'utilisateur après une souscription, généralement sous forme de virement ou de chèque.",
      category: "Général",
    },
    {
      term: "Affiliation",
      definition: "Partenariat entre un site web et un annonceur, où le site est rémunéré pour chaque visiteur ou client qu'il apporte à l'annonceur.",
      category: "Général",
    },
  ];

  const categories = ["Tous", "Internet", "Mobile", "Assurance", "Énergie", "Général"];

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
            { label: "Glossaire", icon: "book-open" },
          ]}
          className="mb-6"
        />

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Glossaire</h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            Comprenez les termes techniques utilisés dans le monde des télécommunications
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/guides">
              <Button variant="secondary" size="lg" className="gap-2">
                <BrandIcon name="book" className="h-4 w-4" />
                Guides pratiques
              </Button>
            </Link>
            <Link href="/examples/blog">
              <Button variant="secondary" size="lg" className="gap-2">
                <BrandIcon name="edit" className="h-4 w-4" />
                Blog
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`#${category.toLowerCase()}`}
                className="rounded-full border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700 hover:text-white"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        {/* Search bar */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <div className="flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800 p-2">
              <BrandIcon name="search" className="h-5 w-5 text-neutral-400 ml-3" />
              <input
                type="text"
                placeholder="Rechercher un terme dans le glossaire..."
                className="w-full bg-transparent py-3 text-neutral-200 placeholder-neutral-500 focus:outline-none"
              />
              <Button variant="primary" size="sm" className="mr-2">
                <BrandIcon name="search" className="h-4 w-4" />
                Rechercher
              </Button>
            </div>
          </div>
        </div>

        {/* Glossary terms */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Termes du glossaire</h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {glossaryTerms.map((term, index) => (
              <Card key={index} variant="glass">
                <CardHeader
                  title={
                    <div className="flex items-center justify-between">
                      <span>{term.term}</span>
                      <Badge label={term.category} variant="primary" size="sm" />
                    </div>
                  }
                />
                <CardBody>
                  <p className="text-neutral-300">{term.definition}</p>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" className="gap-2">
              <BrandIcon name="plus" className="h-4 w-4" />
              Voir plus de termes
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Par catégories</h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.filter(cat => cat !== "Tous").map((category, index) => (
              <Card key={index} variant="glass">
                <CardHeader title={category} />
                <CardBody>
                  <p className="text-neutral-300 mb-4">
                    {category === "Internet" && "Termes liés aux technologies internet et aux connexions haut débit."}
                    {category === "Mobile" && "Termes liés aux forfaits mobile, aux réseaux et à la téléphonie."}
                    {category === "Assurance" && "Termes liés aux contrats d'assurance et aux garanties."}
                    {category === "Énergie" && "Termes liés aux offres d'électricité et de gaz."}
                    {category === "Général" && "Termes généraux utilisés dans nos comparateurs."}
                  </p>
                  <Link
                    href={`#${category.toLowerCase()}`}
                    className="text-primary-400 hover:underline flex items-center justify-center gap-2"
                  >
                    <BrandIcon name="arrow-right" className="h-4 w-4" />
                    Voir les termes
                  </Link>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Besoin d'aide supplémentaire ?
          </h2>
          <p className="text-neutral-400 mb-6 max-w-2xl mx-auto">
            Consultez notre centre d'aide ou contactez notre équipe pour obtenir des réponses à vos questions
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/examples/support">
              <Button variant="primary" size="lg" className="gap-2">
                <BrandIcon name="help" className="h-4 w-4" />
                Centre d'aide
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