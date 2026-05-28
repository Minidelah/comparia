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

export default function MentionsLegalesPage() {
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
      href: "/mentions-legales",
      label: "Mentions légales",
      icon: "file-text",
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
            { label: "Mentions légales", icon: "file-text" },
          ]}
          className="mb-6"
        />

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Mentions légales</h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            Informations légales sur la société CompareTesFactures et ses services
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/politique-confidentialite">
              <Button variant="secondary" size="lg" className="gap-2">
                <BrandIcon name="lock" className="h-4 w-4" />
                Politique de confidentialité
              </Button>
            </Link>
            <Link href="/cgu">
              <Button variant="secondary" size="lg" className="gap-2">
                <BrandIcon name="file-text" className="h-4 w-4" />
                Conditions générales
              </Button>
            </Link>
          </div>
        </div>

        {/* Legal information */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Informations légales</h2>

          <Card className="mb-6">
            <CardHeader title="Éditeur du site" />
            <CardBody>
              <p className="mb-2"><strong>Raison sociale :</strong> CompareTesFactures</p>
              <p className="mb-2"><strong>Siège social :</strong> 123 Rue de la Comparaison, 75001 Paris, France</p>
              <p className="mb-2"><strong>Capital social :</strong> 100 000 €</p>
              <p className="mb-2"><strong>RCS Paris :</strong> 852 147 963</p>
              <p className="mb-2"><strong>Numéro TVA intracommunautaire :</strong> FR12345678901</p>
              <p className="mb-2"><strong>Directeur de la publication :</strong> Jean Dupont</p>
              <p className="mb-2"><strong>Contact :</strong> contact@comparetesfactures.fr</p>
              <p className="mb-2"><strong>Téléphone :</strong> 01 23 45 67 89</p>
            </CardBody>
          </Card>

          <Card className="mb-6">
            <CardHeader title="Hébergement" />
            <CardBody>
              <p className="mb-2"><strong>Hébergeur :</strong> Vercel Inc.</p>
              <p className="mb-2"><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
              <p className="mb-2"><strong>Site web :</strong> <a href="https://vercel.com" className="text-primary-400 hover:underline">https://vercel.com</a></p>
            </CardBody>
          </Card>

          <Card className="mb-6">
            <CardHeader title="Propriété intellectuelle" />
            <CardBody>
              <p className="mb-4">
                L'ensemble du contenu du site CompareTesFactures (textes, images, logos, vidéos, etc.) est protégé par le droit d'auteur et la propriété intellectuelle.
              </p>
              <p className="mb-4">
                Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de CompareTesFactures.
              </p>
              <p>
                Les marques et logos reproduits sur le site sont déposés par les sociétés qui en sont propriétaires.
              </p>
            </CardBody>
          </Card>

          <Card className="mb-6">
            <CardHeader title="Responsabilité" />
            <CardBody>
              <p className="mb-4">
                Les informations et services proposés sur le site CompareTesFactures sont fournis à titre indicatif et ne sauraient engager la responsabilité de CompareTesFactures.
              </p>
              <p className="mb-4">
                CompareTesFactures s'efforce d'assurer au mieux de ses possibilités l'exactitude et la mise à jour des informations diffusées sur ce site, et se réserve le droit de corriger, à tout moment et sans préavis, le contenu.
              </p>
              <p className="mb-4">
                CompareTesFactures ne saurait être tenue responsable des dommages directs ou indirects pouvant résulter de l'utilisation du site ou des informations qui y sont contenues.
              </p>
              <p>
                Les liens hypertextes mis en place dans le cadre du présent site internet en direction d'autres ressources présentes sur le réseau Internet ne sauraient engager la responsabilité de CompareTesFactures.
              </p>
            </CardBody>
          </Card>

          <Card className="mb-6">
            <CardHeader title="Protection des données personnelles" />
            <CardBody>
              <p className="mb-4">
                CompareTesFactures s'engage à protéger la confidentialité des données personnelles de ses utilisateurs conformément à la réglementation en vigueur, notamment le Règlement Général sur la Protection des Données (RGPD).
              </p>
              <p className="mb-4">
                Pour plus d'informations sur la collecte, l'utilisation et la protection de vos données personnelles, veuillez consulter notre <Link href="/politique-confidentialite" className="text-primary-400 hover:underline">Politique de confidentialité</Link>.
              </p>
              <p>
                Vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition à vos données personnelles. Pour exercer ces droits, vous pouvez nous contacter à l'adresse suivante : dpo@comparetesfactures.fr.
              </p>
            </CardBody>
          </Card>

          <Card className="mb-6">
            <CardHeader title="Cookies" />
            <CardBody>
              <p className="mb-4">
                Le site CompareTesFactures utilise des cookies pour améliorer l'expérience utilisateur, analyser le trafic et personnaliser le contenu.
              </p>
              <p className="mb-4">
                Pour plus d'informations sur l'utilisation des cookies et vos choix en matière de cookies, veuillez consulter notre <Link href="/cookies" className="text-primary-400 hover:underline">Politique de gestion des cookies</Link>.
              </p>
            </CardBody>
          </Card>

          <Card className="mb-6">
            <CardHeader title="Loi applicable et juridiction compétente" />
            <CardBody>
              <p className="mb-4">
                Les présentes mentions légales sont régies par le droit français.
              </p>
              <p>
                En cas de litige et à défaut d'accord amiable, les tribunaux français seront les seuls compétents pour en connaître.
              </p>
            </CardBody>
          </Card>

          <Card className="mb-6">
            <CardHeader title="Médiation" />
            <CardBody>
              <p className="mb-4">
                Conformément aux dispositions du Code de la consommation concernant le règlement amiable des litiges, CompareTesFactures adhère au service de médiation suivant :
              </p>
              <p className="mb-2"><strong>Médiateur du e-commerce et de la consommation</strong></p>
              <p className="mb-2">Adresse : 123 Rue de la Médiation, 75008 Paris</p>
              <p className="mb-2">Site web : <a href="https://mediateur-ecommerce.fr" className="text-primary-400 hover:underline">https://mediateur-ecommerce.fr</a></p>
              <p>
                En cas de litige non résolu avec CompareTesFactures, vous pouvez saisir gratuitement ce médiateur.
              </p>
            </CardBody>
          </Card>

          <Card className="mb-6">
            <CardHeader title="Droit applicable" />
            <CardBody>
              <p className="mb-4">
                Les présentes mentions légales sont régies par le droit français.
              </p>
              <p className="mb-4">
                En cas de litige et à défaut d'accord amiable, les tribunaux français seront les seuls compétents pour en connaître.
              </p>
              <p>
                La langue du présent contrat est la langue française.
              </p>
            </CardBody>
          </Card>

          <Card className="mb-6">
            <CardHeader title="Modification des mentions légales" />
            <CardBody>
              <p>
                CompareTesFactures se réserve le droit de modifier les présentes mentions légales à tout moment. Les utilisateurs sont donc invités à les consulter régulièrement. La dernière mise à jour date du 15 juin 2024.
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
            <Link href="/faq">
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
        copyright="© 2024 CompareTesFactures. Tous droits réservés."
      />
    </div>
  );
}