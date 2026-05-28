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
import Switch from "@/components/Switch";

export default function CookiesPage() {
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
      href: "/cookies",
      label: "Cookies",
      icon: "cookie",
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
        logo={{ href: "/", label: "Comparia", icon: "logo" }}
        links={navLinks}
        cta={{ href: "/comparateurs", label: "Comparer maintenant", icon: "comparison" }}
      />

      <Container className="py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { href: "/", label: "Accueil", icon: "home" },
            { label: "Gestion des cookies", icon: "cookie" },
          ]}
          className="mb-6"
        />

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Gestion des cookies</h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            Découvrez comment nous utilisons les cookies et gérez vos préférences
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/politique-confidentialite">
              <Button variant="secondary" size="lg" className="gap-2">
                <BrandIcon name="lock" className="h-4 w-4" />
                Politique de confidentialité
              </Button>
            </Link>
            <Link href="/mentions-legales">
              <Button variant="secondary" size="lg" className="gap-2">
                <BrandIcon name="file-text" className="h-4 w-4" />
                Mentions légales
              </Button>
            </Link>
          </div>
        </div>

        {/* Cookie preferences */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Préférences de cookies</h2>

          <Card className="mb-6">
            <CardHeader title="Cookies nécessaires" />
            <CardBody>
              <p className="mb-4">
                Ces cookies sont essentiels au bon fonctionnement de notre site web. Ils permettent de vous authentifier, de mémoriser vos préférences de cookies, et d'assurer la sécurité de nos services.
              </p>
              <p className="mb-4">
                <strong>Statut :</strong> Toujours activés (ne peuvent pas être désactivés)
              </p>
            </CardBody>
          </Card>

          <Card className="mb-6">
            <CardHeader title="Cookies de performance" />
            <CardBody>
              <p className="mb-4">
                Ces cookies nous permettent de comprendre comment les visiteurs interagissent avec notre site web en collectant et en communiquant des informations de manière anonyme.
              </p>
              <p className="mb-4">
                <strong>Exemples :</strong> Google Analytics, Hotjar
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">Activés</span>
                <Switch checked={true} onChange={() => {}} />
              </div>
            </CardBody>
          </Card>

          <Card className="mb-6">
            <CardHeader title="Cookies de fonctionnalité" />
            <CardBody>
              <p className="mb-4">
                Ces cookies permettent d'améliorer la fonctionnalité et la personnalisation de notre site web, comme la mémorisation de vos préférences (langue, région, etc.).
              </p>
              <p className="mb-4">
                <strong>Exemples :</strong> Préférences de langue, paramètres régionaux
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">Activés</span>
                <Switch checked={true} onChange={() => {}} />
              </div>
            </CardBody>
          </Card>

          <Card className="mb-6">
            <CardHeader title="Cookies de marketing" />
            <CardBody>
              <p className="mb-4">
                Ces cookies sont utilisés pour suivre les visiteurs sur les sites web. L'intention est d'afficher des publicités pertinentes et engageantes pour l'utilisateur individuel, et donc plus précieuses pour les éditeurs et les annonceurs tiers.
              </p>
              <p className="mb-4">
                <strong>Exemples :</strong> Google Ads, Facebook Pixel, réseaux publicitaires
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">Activés</span>
                <Switch checked={true} onChange={() => {}} />
              </div>
            </CardBody>
          </Card>

          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" className="gap-2">
              <BrandIcon name="save" className="h-4 w-4" />
              Enregistrer les préférences
            </Button>
            <Button variant="secondary" size="lg" className="gap-2">
              <BrandIcon name="x" className="h-4 w-4" />
              Refuser tout
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <BrandIcon name="check" className="h-4 w-4" />
              Accepter tout
            </Button>
          </div>
        </div>

        {/* Cookie information */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Qu'est-ce qu'un cookie ?</h2>

          <Card className="mb-6">
            <CardBody>
              <p className="mb-4">
                Un cookie est un petit fichier texte stocké sur votre appareil (ordinateur, smartphone, tablette) lorsque vous visitez un site web. Les cookies permettent au site de mémoriser vos actions et préférences (connexion, langue, taille de police, et autres préférences d'affichage) pendant une durée déterminée, afin que vous n'ayez pas à les indiquer à chaque fois que vous revenez sur le site ou que vous naviguez d'une page à l'autre.
              </p>
              <p className="mb-4">
                Les cookies peuvent être :
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><strong>Cookies de session :</strong> temporaires, effacés lorsque vous fermez votre navigateur</li>
                <li><strong>Cookies persistants :</strong> restent sur votre appareil jusqu'à leur date d'expiration ou jusqu'à ce que vous les supprimiez</li>
                <li><strong>Cookies propres :</strong> placés par le site que vous visitez</li>
                <li><strong>Cookies tiers :</strong> placés par des sites autres que celui que vous visitez</li>
              </ul>
              <p>
                Les cookies ne contiennent pas de virus et ne peuvent pas installer de logiciels malveillants sur votre appareil.
              </p>
            </CardBody>
          </Card>

          <Card className="mb-6">
            <CardHeader title="Pourquoi utilisons-nous des cookies ?" />
            <CardBody>
              <p className="mb-4">
                Nous utilisons des cookies pour diverses raisons, notamment :
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Fonctionnement du site :</strong> pour vous authentifier, mémoriser vos préférences, et assurer la sécurité</li>
                <li><strong>Amélioration de l'expérience utilisateur :</strong> pour personnaliser votre expérience et mémoriser vos préférences</li>
                <li><strong>Analyse et performance :</strong> pour comprendre comment vous utilisez notre site et améliorer nos services</li>
                <li><strong>Marketing et publicité :</strong> pour vous proposer des publicités pertinentes et mesurer l'efficacité de nos campagnes</li>
              </ul>
            </CardBody>
          </Card>

          <Card className="mb-6">
            <CardHeader title="Comment gérer les cookies ?" />
            <CardBody>
              <p className="mb-4">
                Vous pouvez contrôler et gérer les cookies de plusieurs manières :
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><strong>Via notre outil de gestion des cookies :</strong> utilisez les interrupteurs ci-dessus pour activer ou désactiver les différentes catégories de cookies.</li>
                <li><strong>Via les paramètres de votre navigateur :</strong> vous pouvez configurer votre navigateur pour refuser les cookies ou vous alerter lorsque des cookies sont envoyés. Cependant, certaines fonctionnalités de notre site peuvent ne pas fonctionner correctement si vous désactivez les cookies.</li>
                <li><strong>Via des outils tiers :</strong> vous pouvez utiliser des extensions de navigateur ou des outils spécialisés pour gérer les cookies.</li>
              </ul>
              <p className="mb-4">
                Voici comment gérer les cookies dans les navigateurs les plus courants :
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><a href="https://support.google.com/chrome/answer/95647" className="text-primary-400 hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies" className="text-primary-400 hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.microsoft.com/fr-fr/help/17442/windows-internet-explorer-delete-manage-cookies" className="text-primary-400 hover:underline">Internet Explorer</a></li>
                <li><a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" className="text-primary-400 hover:underline">Safari</a></li>
                <li><a href="https://support.microsoft.com/fr-fr/help/4027947/microsoft-edge-delete-cookies" className="text-primary-400 hover:underline">Microsoft Edge</a></li>
              </ul>
            </CardBody>
          </Card>

          <Card className="mb-6">
            <CardHeader title="Vos droits" />
            <CardBody>
              <p className="mb-4">
                Conformément à la réglementation applicable en matière de protection des données personnelles, vous disposez des droits suivants concernant les cookies :
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Droit d'information :</strong> vous avez le droit d'être informé de manière claire et complète sur l'utilisation des cookies.</li>
                <li><strong>Droit de consentement :</strong> vous avez le droit de consentir ou de refuser l'utilisation de certains cookies (à l'exception des cookies nécessaires).</li>
                <li><strong>Droit de retrait :</strong> vous avez le droit de retirer votre consentement à tout moment.</li>
                <li><strong>Droit d'opposition :</strong> vous avez le droit de vous opposer à l'utilisation de cookies à des fins de marketing.</li>
              </ul>
              <p className="mt-4">
                Pour exercer ces droits ou pour toute question concernant notre utilisation des cookies, vous pouvez nous contacter à l'adresse suivante : dpo@comparetesfactures.fr.
              </p>
            </CardBody>
          </Card>

          <Card className="mb-6">
            <CardHeader title="Modifications de cette politique" />
            <CardBody>
              <p className="mb-4">
                Nous pouvons modifier la présente Politique de gestion des cookies à tout moment. En cas de modification substantielle, nous vous en informerons par email ou via une notification sur notre site web avant que la modification ne prenne effet.
              </p>
              <p className="mb-4">
                Nous vous encourageons à consulter régulièrement cette Politique de gestion des cookies pour prendre connaissance des éventuelles modifications.
              </p>
              <p>
                Votre continuation de l'utilisation de nos Services après la publication des modifications constitue votre acceptation de ces modifications.
              </p>
            </CardBody>
          </Card>

          <div className="text-center text-sm text-neutral-500">
            Dernière mise à jour : 15 juin 2024
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Des questions ?
          </h2>
          <p className="text-neutral-400 mb-6 max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour toute question supplémentaire
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button variant="primary" size="lg" className="gap-2">
                <BrandIcon name="mail" className="h-4 w-4" />
                Nous contacter
              </Button>
            </Link>
            <Link href="/examples/faq">
              <Button variant="secondary" size="lg" className="gap-2">
                <BrandIcon name="help" className="h-4 w-4" />
                Consulter la FAQ
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