"use client";

import Link from "next/link";
import BrandIcon from "@/components/BrandIcon";
import { Button } from "@/components/ui/Button";
import Breadcrumb from "@/components/Breadcrumb";
import CategoryBadge from "@/components/CategoryBadge";
import NavigationPremium from "@/components/NavigationPremium";
import FooterPremium from "@/components/FooterPremium";
import SectionTitle from "@/components/SectionTitle";
import SectionDescription from "@/components/SectionDescription";
import Container from "@/components/Container";
import Card from "@/components/Card";
import CardHeader from "@/components/CardHeader";
import CardBody from "@/components/CardBody";
import CardFooter from "@/components/CardFooter";
import Accordion from "@/components/Accordion";
import Tabs from "@/components/Tabs";
import Alert from "@/components/Alert";
import Badge from "@/components/Badge";
import Tag from "@/components/Tag";

export default function GuidePage() {
  const navLinks = [
    {
      href: "/",
      label: "Accueil",
      icon: "home",
    },
    {
      href: "/guides",
      label: "Guides",
      icon: "book",
    },
    {
      href: "/comparateurs",
      label: "Comparateurs",
      icon: "comparison",
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
    { href: "/comparateurs/forfait-mobile", icon: "linkedin" },
  ];

  const legalLinks = [
    { href: "/mentions-legales", label: "Mentions légales" },
    { href: "/politique-confidentialite", label: "Politique de confidentialité" },
    { href: "/cookies", label: "Gestion des cookies" },
    { href: "/examples/cgu", label: "Conditions générales" },
  ];

  const accordionItems = [
    {
      id: "1",
      title: "Qu'est-ce qu'un forfait mobile ?",
      content: (
        <div>
          <p className="mb-4">Un forfait mobile est un contrat entre un opérateur téléphonique et un utilisateur, qui permet à ce dernier de bénéficier de services de téléphonie mobile.</p>
          <p>Ces services incluent généralement :</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Des appels vocaux</li>
            <li>Des SMS/MMS</li>
            <li>Un accès à internet mobile (data)</li>
          </ul>
        </div>
      ),
      icon: "help",
    },
    {
      id: "2",
      title: "Comment choisir son forfait mobile ?",
      content: (
        <div>
          <p className="mb-4">Le choix d'un forfait mobile dépend de plusieurs critères :</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li><strong>Vos besoins en data :</strong> Combien de Go consommez-vous par mois ?</li>
            <li><strong>Vos habitudes d'appel :</strong> Avez-vous besoin d'appels illimités ?</li>
            <li><strong>Votre budget :</strong> Quel est le prix maximum que vous êtes prêt à payer ?</li>
            <li><strong>La couverture réseau :</strong> Quel opérateur a la meilleure couverture dans votre région ?</li>
            <li><strong>Les options supplémentaires :</strong> Roaming, 5G, services inclus, etc.</li>
          </ol>
        </div>
      ),
      icon: "search",
    },
    {
      id: "3",
      title: "Quelle est la différence entre 4G et 5G ?",
      content: (
        <div>
          <p className="mb-4">La 5G est la nouvelle génération de réseau mobile qui succède à la 4G. Voici les principales différences :</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[400px] text-sm">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="p-2 text-left font-medium">Critère</th>
                  <th className="p-2 text-left font-medium">4G</th>
                  <th className="p-2 text-left font-medium">5G</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-800">
                  <td className="p-2 font-medium">Débit</td>
                  <td className="p-2">Jusqu'à 1 Gbps</td>
                  <td className="p-2">Jusqu'à 20 Gbps</td>
                </tr>
                <tr className="border-b border-neutral-800">
                  <td className="p-2 font-medium">Latence</td>
                  <td className="p-2">10-50 ms</td>
                  <td className="p-2">1-10 ms</td>
                </tr>
                <tr className="border-b border-neutral-800">
                  <td className="p-2 font-medium">Capacité</td>
                  <td className="p-2">100 000 appareils/km²</td>
                  <td className="p-2">1 million d'appareils/km²</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
      icon: "zap",
    },
  ];

  const tabItems = [
    {
      id: "forfaits",
      label: "Types de forfaits",
      content: (
        <div className="space-y-4">
          <Card>
            <CardHeader title="Forfaits sans engagement" icon={<BrandIcon name="unlock" className="h-5 w-5" />} />
            <CardBody>
              <p className="text-neutral-300">
                Les forfaits sans engagement vous permettent de résilier à tout moment sans frais.
                Idéal pour ceux qui veulent rester flexibles.
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Forfaits avec engagement" icon={<BrandIcon name="lock" className="h-5 w-5" />} />
            <CardBody>
              <p className="text-neutral-300">
                Ces forfaits offrent souvent des tarifs préférentiels ou des smartphones subventionnés,
                mais vous engagez pour une durée déterminée (généralement 12 ou 24 mois).
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Forfaits prépayés" icon={<BrandIcon name="credit-card" className="h-5 w-5" />} />
            <CardBody>
              <p className="text-neutral-300">
                Parfaits pour contrôler son budget, ces forfaits fonctionnent avec un crédit à recharger.
                Pas de surprise sur la facture !
              </p>
            </CardBody>
          </Card>
        </div>
      ),
    },
    {
      id: "operateurs",
      label: "Opérateurs",
      content: (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader title="Orange" icon={<BrandIcon name="wifi" className="h-5 w-5" />} />
            <CardBody>
              <p className="text-neutral-300 mb-4">
                Leader historique avec une excellente couverture réseau.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge label="Meilleure couverture" variant="success" />
                <Badge label="5G disponible" variant="primary" />
              </div>
            </CardBody>
            <CardFooter>
              <Link href="/comparateurs/forfait-mobile?operateur=orange" className="text-sm text-primary-400 hover:underline">
                Voir les offres Orange
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader title="SFR" icon={<BrandIcon name="wifi" className="h-5 w-5" />} />
            <CardBody>
              <p className="text-neutral-300 mb-4">
                Connu pour ses offres compétitives et son bon réseau.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge label="Bon rapport qualité/prix" variant="success" />
                <Badge label="Options intéressantes" variant="primary" />
              </div>
            </CardBody>
            <CardFooter>
              <Link href="/comparateurs/forfait-mobile?operateur=sfr" className="text-sm text-primary-400 hover:underline">
                Voir les offres SFR
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader title="Bouygues Telecom" icon={<BrandIcon name="wifi" className="h-5 w-5" />} />
            <CardBody>
              <p className="text-neutral-300 mb-4">
                Excellente qualité de service et réseau performant.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge label="Service client réactif" variant="success" />
                <Badge label="Réseau fiable" variant="primary" />
              </div>
            </CardBody>
            <CardFooter>
              <Link href="/comparateurs/forfait-mobile?operateur=bouygues" className="text-sm text-primary-400 hover:underline">
                Voir les offres Bouygues Telecom
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader title="Free Mobile" icon={<BrandIcon name="wifi" className="h-5 w-5" />} />
            <CardBody>
              <p className="text-neutral-300 mb-4">
                Le challenger avec des prix très attractifs.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge label="Prix bas" variant="success" />
                <Badge label="Forfaits illimités" variant="primary" />
              </div>
            </CardBody>
            <CardFooter>
              <Link href="/comparateurs/forfait-mobile?operateur=free" className="text-sm text-primary-400 hover:underline">
                Voir les offres Free Mobile
              </Link>
            </CardFooter>
          </Card>
        </div>
      ),
    },
    {
      id: "conseils",
      label: "Conseils",
      content: (
        <div className="space-y-4">
          <Alert
            title="Astuce n°1 : Analysez vos besoins"
            message="Avant de choisir un forfait, analysez votre consommation réelle sur les 3 derniers mois pour éviter de payer pour des services inutilisés."
            type="info"
          />

          <Alert
            title="Astuce n°2 : Comparez les promotions"
            message="Les opérateurs proposent régulièrement des promotions. Utilisez notre comparateur pour trouver les meilleures offres du moment."
            type="success"
          />

          <Alert
            title="Astuce n°3 : Vérifiez la couverture"
            message="La qualité du réseau varie selon les zones. Consultez les cartes de couverture des opérateurs avant de choisir."
            type="warning"
          />

          <Alert
            title="Astuce n°4 : Attention aux engagements"
            message="Les forfaits avec engagement peuvent sembler attractifs, mais vérifiez bien les conditions de résiliation."
            type="danger"
          />
        </div>
      ),
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
            { href: "/guides", label: "Guides", icon: "book" },
            { label: "Choisir son forfait mobile", icon: "phone" },
          ]}
          className="mb-6"
        />

        {/* Header */}
        <div className="mb-8 text-center">
          <CategoryBadge category="Guide" icon="book" variant="secondary" className="mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">
            Comment choisir son forfait mobile en 2024 ?
          </h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            Notre guide complet pour trouver le forfait mobile parfait adapté à vos besoins et votre budget
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg">
              <BrandIcon name="comparison" className="h-4 w-4 mr-2" />
              Comparer les forfaits
            </Button>
            <Button variant="secondary" size="lg">
              <BrandIcon name="download" className="h-4 w-4 mr-2" />
              Télécharger le guide
            </Button>
          </div>
        </div>

        {/* Metadata */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-400">
          <div className="flex items-center gap-2">
            <BrandIcon name="user" className="h-4 w-4" />
            <span>Rédigé par <strong className="text-white">Jean Dupont</strong>, expert télécoms</span>
          </div>
          <div className="flex items-center gap-2">
            <BrandIcon name="calendar" className="h-4 w-4" />
            <span>Mis à jour le <strong className="text-white">15 juin 2024</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <BrandIcon name="clock" className="h-4 w-4" />
            <span>Temps de lecture : <strong className="text-white">8 minutes</strong></span>
          </div>
        </div>

        {/* Table of contents */}
        <div className="mb-12">
          <SectionTitle title="Sommaire" icon="list" />
          <Card>
            <CardBody>
              <ol className="space-y-2 border-l border-neutral-800 pl-6">
                <li className="border-l-2 border-primary-500 pl-4 text-primary-400">
                  <a href="#introduction" className="hover:underline">Introduction</a>
                </li>
                <li className="pl-4">
                  <a href="#types-forfaits" className="hover:underline">Les différents types de forfaits</a>
                </li>
                <li className="pl-4">
                  <a href="#choisir-forfait" className="hover:underline">Comment bien choisir son forfait ?</a>
                </li>
                <li className="pl-4">
                  <a href="#comparaison-operateurs" className="hover:underline">Comparaison des opérateurs</a>
                </li>
                <li className="pl-4">
                  <a href="#conseils" className="hover:underline">Nos conseils d'experts</a>
                </li>
                <li className="pl-4">
                  <a href="#faq" className="hover:underline">FAQ</a>
                </li>
              </ol>
            </CardBody>
          </Card>
        </div>

        {/* Introduction */}
        <section id="introduction" className="mb-12">
          <SectionTitle title="Introduction" icon="info" />
          <SectionDescription 
            description="Dans un marché des télécommunications en constante évolution, choisir le bon forfait mobile peut s'avérer complexe. Avec la multiplication des offres, des options et des opérateurs, il est essentiel de bien comprendre ses besoins pour faire le meilleur choix."
          />

          <Card className="mt-6">
            <CardBody>
              <p className="mb-4">
                Ce guide vous aidera à y voir plus clair parmi les différentes offres disponibles et à sélectionner le forfait qui correspond le mieux à votre profil d'utilisation et à votre budget.
              </p>
              <Alert
                title="Bon à savoir"
                message="En 2024, le marché français compte plus de 80 millions d'abonnements mobile, avec une moyenne de consommation de données qui ne cesse d'augmenter."
                type="info"
              />
            </CardBody>
          </Card>
        </section>

        {/* Types de forfaits */}
        <section id="types-forfaits" className="mb-12">
          <SectionTitle title="Les différents types de forfaits" icon="grid" />
          <SectionDescription 
            description="Il existe plusieurs types de forfaits mobile, chacun répondant à des besoins spécifiques. Voici les principales catégories."
          />

          <Tabs items={tabItems} variant="pills" />
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-12">
          <SectionTitle title="Questions fréquentes" icon="help" />
          <SectionDescription 
            description="Retrouvez les réponses aux questions les plus courantes sur les forfaits mobile."
          />

          <Accordion items={accordionItems} allowMultiple />
        </section>

        {/* CTA */}
        <section className="mb-12 text-center">
          <SectionTitle title="Prêt à trouver votre forfait idéal ?" />
          <p className="text-xl text-neutral-400 mb-6">
            Utilisez notre comparateur pour trouver le forfait qui correspond parfaitement à vos besoins
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" className="gap-2">
              <BrandIcon name="comparison" className="h-5 w-5" />
              Comparer les forfaits mobile
            </Button>
            <Button variant="secondary" size="lg" className="gap-2">
              <BrandIcon name="phone" className="h-5 w-5" />
              Parler à un expert
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <Tag label="Économisez jusqu'à 300€/an" variant="success" />
            <Tag label="Comparaison 100% gratuite" variant="primary" />
            <Tag label="Sans engagement" variant="secondary" />
            <Tag label="Service client 7j/7" variant="info" />
          </div>
        </section>
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