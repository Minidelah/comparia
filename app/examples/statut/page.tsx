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

export default function StatutPage() {
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
      href: "/statut",
      label: "Statut",
      icon: "activity",
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

  const services = [
    {
      name: "Site web",
      status: "operational",
      updated: "Il y a 2 minutes",
      description: "Notre site web est entièrement opérationnel.",
    },
    {
      name: "Comparateurs",
      status: "operational",
      updated: "Il y a 5 minutes",
      description: "Tous nos comparateurs fonctionnent normalement.",
    },
    {
      name: "API",
      status: "operational",
      updated: "Il y a 10 minutes",
      description: "Notre API est disponible et répond aux requêtes.",
    },
    {
      name: "Base de données",
      status: "operational",
      updated: "Il y a 15 minutes",
      description: "Nos bases de données sont accessibles et synchronisées.",
    },
    {
      name: "Authentification",
      status: "operational",
      updated: "Il y a 20 minutes",
      description: "Le système d'authentification fonctionne correctement.",
    },
    {
      name: "Paiements",
      status: "operational",
      updated: "Il y a 25 minutes",
      description: "Les transactions de paiement sont traitées normalement.",
    },
  ];

  const incidents = [
    {
      date: "12 juin 2024",
      time: "14:30 - 15:00",
      service: "API",
      status: "resolved",
      description: "Latence élevée sur notre API principale due à une charge inhabituelle. Résolu par l'ajout de capacités supplémentaires.",
    },
    {
      date: "10 juin 2024",
      time: "09:15 - 09:45",
      service: "Site web",
      status: "resolved",
      description: "Problème de chargement des pages de comparateurs mobile. Résolu par une mise à jour du cache.",
    },
    {
      date: "5 juin 2024",
      time: "22:00 - 22:30",
      service: "Base de données",
      status: "resolved",
      description: "Maintenance planifiée pour optimisation des performances.",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return <Badge label="Opérationnel" variant="success" />;
      case "degraded":
        return <Badge label="Dégradé" variant="warning" />;
      case "outage":
        return <Badge label="Indisponible" variant="danger" />;
      case "maintenance":
        return <Badge label="Maintenance" variant="info" />;
      case "resolved":
        return <Badge label="Résolu" variant="success" />;
      default:
        return <Badge label="Inconnu" variant="default" />;
    }
  };

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
            { label: "Statut du service", icon: "activity" },
          ]}
          className="mb-6"
        />

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Statut du service</h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            Consultez l'état de nos services en temps réel
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/support">
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

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <BrandIcon name="check-circle" className="h-4 w-4 text-success-400" />
              <span>Tous les systèmes sont opérationnels</span>
            </div>
            <div className="flex items-center gap-2">
              <BrandIcon name="clock" className="h-4 w-4 text-primary-400" />
              <span>Dernière mise à jour : il y a 2 minutes</span>
            </div>
          </div>
        </div>

        {/* System status */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Statut des services</h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card key={index} variant="glass">
                <CardHeader
                  title={
                    <div className="flex items-center justify-between">
                      <span>{service.name}</span>
                      {getStatusBadge(service.status)}
                    </div>
                  }
                  subtitle={service.updated}
                />
                <CardBody>
                  <p className="text-neutral-300">{service.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* Incidents history */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Historique des incidents</h2>

          <div className="space-y-4">
            {incidents.map((incident, index) => (
              <Card key={index} variant="default">
                <CardHeader
                  title={
                    <div className="flex items-center justify-between">
                      <span>{incident.service} - {incident.date}</span>
                      {getStatusBadge(incident.status)}
                    </div>
                  }
                  subtitle={incident.time}
                />
                <CardBody>
                  <p className="text-neutral-300">{incident.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline" size="lg" className="gap-2">
              <BrandIcon name="calendar" className="h-4 w-4" />
              Voir l'historique complet
            </Button>
          </div>
        </div>

        {/* Subscribe */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Restez informé</h2>

          <Card variant="glass">
            <CardBody>
              <p className="text-neutral-300 mb-4">
                Abonnez-vous pour recevoir des notifications en cas d'incident ou de maintenance planifiée.
              </p>

              <div className="flex flex-wrap gap-4">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 min-w-[250px] rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <Button variant="primary" size="lg" className="gap-2">
                  <BrandIcon name="bell" className="h-4 w-4" />
                  S'abonner aux alertes
                </Button>
              </div>

              <p className="mt-4 text-xs text-neutral-500">
                En vous abonnant, vous acceptez notre <Link href="/politique-confidentialite" className="text-primary-400 hover:underline">Politique de confidentialité</Link>.
              </p>
            </CardBody>
          </Card>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Besoin d'aide ?
          </h2>
          <p className="text-neutral-400 mb-6 max-w-2xl mx-auto">
            Consultez notre centre d'aide ou contactez notre équipe support
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/support">
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
        copyright="© 2024 CompareTesFactures. Tous droits réservés."
      />
    </div>
  );
}