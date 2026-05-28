"use client";

import { useState, useRef, useEffect } from "react";
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

export default function ChatPage() {
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot"; timestamp: Date }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      href: "/examples/support",
      label: "Support",
      icon: "help",
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const userMessage = {
      text: inputValue,
      sender: "user" as const,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        text: getBotResponse(inputValue),
        sender: "bot" as const,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("bonjour") || lowerMessage.includes("hello")) {
      return "Bonjour ! Comment puis-je vous aider aujourd'hui ? Vous pouvez me poser des questions sur nos services de comparaison, nos offres, ou toute autre information concernant Comparia.";
    }

    if (lowerMessage.includes("comparateur") || lowerMessage.includes("comparer")) {
      return "Nous proposons des comparateurs pour plusieurs catégories : forfaits mobile, box internet, assurances (auto, habitation), et énergie. Quel type de contrat souhaitez-vous comparer ?";
    }

    if (lowerMessage.includes("mobile") || lowerMessage.includes("forfait")) {
      return "Pour comparer les forfaits mobile, rendez-vous sur notre page dédiée : /comparateurs/forfait-mobile. Vous y trouverez les meilleures offres du marché adaptées à vos besoins. Souhaitez-vous que je vous explique comment utiliser le comparateur ?";
    }

    if (lowerMessage.includes("box") || lowerMessage.includes("internet")) {
      return "Notre comparateur de box internet vous permet de trouver l'offre la plus adaptée à vos besoins en termes de débit, de prix et de services inclus. Vous pouvez accéder au comparateur ici : /comparateurs/box-internet.";
    }

    if (lowerMessage.includes("assurance")) {
      return "Nous proposons des comparateurs pour les assurances auto et habitation. Quel type d'assurance recherchez-vous ? Je peux vous orienter vers le comparateur approprié.";
    }

    if (lowerMessage.includes("énergie") || lowerMessage.includes("électricité") || lowerMessage.includes("gaz")) {
      return "Notre comparateur d'énergie vous aide à trouver le fournisseur d'électricité ou de gaz le plus adapté à votre consommation et votre budget. Accédez au comparateur ici : /comparateurs/electricite.";
    }

    if (lowerMessage.includes("prix") || lowerMessage.includes("tarif")) {
      return "Nos services de comparaison sont entièrement gratuits pour les utilisateurs. Nous sommes rémunérés par nos partenaires lorsque vous souscrivez à une offre via notre plateforme, mais cela n'affecte pas le prix que vous payez.";
    }

    if (lowerMessage.includes("contact") || lowerMessage.includes("support")) {
      return "Vous pouvez nous contacter via notre formulaire de contact : /contact, ou par email à support@comparetesfactures.fr. Notre équipe est disponible du lundi au vendredi de 9h à 18h.";
    }

    if (lowerMessage.includes("merci") || lowerMessage.includes("thank")) {
      return "Je vous en prie ! N'hésitez pas à demander si vous avez d'autres questions. Je reste à votre disposition pour toute information concernant nos services. Bonne journée !";
    }

    return "Je n'ai pas bien compris votre question. Pouvez-vous reformuler ou préciser votre demande ? Vous pouvez également consulter notre centre d'aide : /support pour trouver des réponses à vos questions.";
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
            { href: "/examples/support", label: "Support", icon: "help" },
            { label: "Chat en direct", icon: "message-circle" },
          ]}
          className="mb-6"
        />

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Chat en direct</h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            Discutez avec notre assistant pour obtenir des réponses rapides à vos questions
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/examples/support">
              <Button variant="secondary" size="lg" className="gap-2">
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
              <BrandIcon name="clock" className="h-4 w-4 text-primary-400" />
              <span>Disponible 9h-18h, du lundi au vendredi</span>
            </div>
            <div className="flex items-center gap-2">
              <BrandIcon name="user" className="h-4 w-4 text-success-400" />
              <span>Réponse instantanée</span>
            </div>
          </div>
        </div>

        {/* Chat interface */}
        <div className="mb-12">
          <Card variant="glass">
            <CardHeader
              title={
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-secondary-500">
                    <BrandIcon name="message-circle" className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Chat en direct</h3>
                    <p className="text-sm text-neutral-400">Notre assistant est là pour vous aider</p>
                  </div>
                </div>
              }
            />
            <CardBody>
              {/* Chat messages */}
              <div className="mb-4 h-[400px] overflow-y-auto p-4">
                {messages.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20">
                      <BrandIcon name="message-circle" className="h-8 w-8 text-primary-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Bienvenue dans notre chat en direct</h3>
                    <p className="text-neutral-400 mb-4 max-w-md">
                      Posez-nous vos questions sur nos services de comparaison. 
                      Notre assistant est là pour vous aider à trouver les meilleures offres.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <button
                        onClick={() => setInputValue("Bonjour, je souhaite comparer des forfaits mobile")}
                        className="rounded-full border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700"
                      >
                        Comparer des forfaits mobile
                      </button>
                      <button
                        onClick={() => setInputValue("Comment fonctionne votre service de comparaison ?")}
                        className="rounded-full border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700"
                      >
                        Fonctionnement du service
                      </button>
                      <button
                        onClick={() => setInputValue("Quelles sont vos heures d'ouverture ?")}
                        className="rounded-full border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700"
                      >
                        Horaires d'ouverture
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl p-3 ${message.sender === "user" ? "bg-primary-500 text-white" : "bg-neutral-800 text-neutral-200"}`}
                        >
                          <p className="whitespace-pre-wrap">{message.text}</p>
                          <p className={`mt-1 text-xs ${message.sender === "user" ? "text-primary-100" : "text-neutral-500"}`}>
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-2xl bg-neutral-800 p-3 text-neutral-200">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              <div className="h-2 w-2 animate-bounce rounded-full bg-neutral-500" />
                              <div className="h-2 w-2 animate-bounce rounded-full bg-neutral-500" style={{ animationDelay: "0.2s" }} />
                              <div className="h-2 w-2 animate-bounce rounded-full bg-neutral-500" style={{ animationDelay: "0.4s" }} />
                            </div>
                            <span className="text-sm">Notre assistant écrit...</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Chat input */}
              <div className="border-t border-neutral-800 pt-4">
                <div className="flex gap-2">
                  <div className="flex flex-1 items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800 p-2">
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Tapez votre message..."
                      className="w-full resize-none bg-transparent py-2 text-neutral-200 placeholder-neutral-500 focus:outline-none"
                      rows={1}
                    />
                    <button
                      onClick={() => setInputValue("👋")}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-700 text-neutral-400 hover:bg-neutral-600"
                    >
                      <BrandIcon name="smile" className="h-4 w-4" />
                    </button>
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    variant="primary"
                    size="lg"
                    className="h-full"
                    disabled={inputValue.trim() === ""}
                  >
                    <BrandIcon name="send" className="h-4 w-4" />
                  </Button>
                </div>
                <p className="mt-2 text-xs text-neutral-500">
                  Notre chat est disponible du lundi au vendredi, de 9h à 18h. En dehors de ces horaires, vous pouvez nous laisser un message.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Questions fréquentes</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Card variant="glass">
              <CardHeader title="Quels sont vos horaires ?" />
              <CardBody>
                <p className="text-neutral-300 mb-4">
                  Notre chat en direct est disponible du lundi au vendredi, de 9h à 18h.
                </p>
                <p className="text-neutral-300">
                  En dehors de ces horaires, vous pouvez nous laisser un message ou consulter notre centre d'aide.
                </p>
              </CardBody>
            </Card>

            <Card variant="glass">
              <CardHeader title="Comment puis-je vous contacter ?" />
              <CardBody>
                <p className="text-neutral-300 mb-4">
                  Vous pouvez nous contacter via :
                </p>
                <ul className="list-disc pl-5 space-y-2 text-neutral-300">
                  <li>Notre chat en direct (disponible pendant les horaires d'ouverture)</li>
                  <li>Notre <Link href="/contact" className="text-primary-400 hover:underline">formulaire de contact</Link></li>
                  <li>Email : support@comparetesfactures.fr</li>
                  <li>Téléphone : 01 23 45 67 89</li>
                </ul>
              </CardBody>
            </Card>

            <Card variant="glass">
              <CardHeader title="Comment utiliser vos comparateurs ?" />
              <CardBody>
                <p className="text-neutral-300 mb-4">
                  Pour utiliser nos comparateurs :
                </p>
                <ol className="list-decimal pl-5 space-y-2 text-neutral-300">
                  <li>Sélectionnez la catégorie de contrat que vous souhaitez comparer</li>
                  <li>Répondez aux questions sur vos besoins et préférences</li>
                  <li>Consultez les offres recommandées et comparez les détails</li>
                  <li>Cliquez sur "Voir l'offre" pour souscrire directement chez notre partenaire</li>
                </ol>
              </CardBody>
            </Card>

            <Card variant="glass">
              <CardHeader title="Vos services sont-ils gratuits ?" />
              <CardBody>
                <p className="text-neutral-300 mb-4">
                  Oui, nos services de comparaison sont entièrement gratuits pour les utilisateurs.
                </p>
                <p className="text-neutral-300">
                  Nous sommes rémunérés par nos partenaires lorsque vous souscrivez à une offre via notre plateforme, mais cela n'affecte pas le prix que vous payez.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Besoin d'une réponse plus détaillée ?
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