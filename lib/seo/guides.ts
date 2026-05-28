import type { Category } from "@/lib/categories";
import { categories } from "@/lib/categories";
import { siteConfig } from "@/lib/site";

export type SeoGuide = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  categorySlug: string;
  intent: "économiser" | "comparer" | "changer" | "optimiser";
  heroMetric: string;
  intro: string;
  painPoints: string[];
  steps: { title: string; body: string }[];
  signals: string[];
  faq: { question: string; answer: string }[];
};

export const seoGuides: SeoGuide[] = [
  {
    slug: "reduire-assurance-habitation",
    title: "Réduire son assurance habitation sans perdre les garanties utiles",
    description:
      "Guide clair pour comparer ton assurance habitation, repérer les garanties importantes et estimer l’économie possible avant de changer.",
    eyebrow: "Assurance habitation",
    categorySlug: "assurance-habitation",
    intent: "économiser",
    heroMetric: "jusqu’à 480€/an",
    intro:
      "L’assurance habitation fait partie des contrats qu’on garde souvent trop longtemps. Le vrai sujet n’est pas de prendre le moins cher, mais de retrouver un prix cohérent avec ton logement, ton statut et les garanties réellement utiles.",
    painPoints: [
      "Le contrat a augmenté plusieurs années de suite sans vraie explication.",
      "Tu ne sais plus exactement quelles garanties sont incluses.",
      "Ton logement ou ta situation a changé depuis la souscription.",
    ],
    steps: [
      {
        title: "Clarifie ton profil logement",
        body: "Locataire, propriétaire occupant ou bailleur : le prix et les garanties attendues ne sont pas les mêmes.",
      },
      {
        title: "Compare à garanties comparables",
        body: "Franchise, vol, dégâts des eaux, responsabilité civile et assistance doivent rester lisibles avant le clic.",
      },
      {
        title: "Active seulement si l’écart vaut le changement",
        body: "Une bonne économie est une économie durable, compréhensible et sans perte de protection essentielle.",
      },
    ],
    signals: ["Hausse annuelle", "Logement modifié", "Contrat ancien", "Garanties floues"],
    faq: [
      {
        question: "Quand faut-il comparer son assurance habitation ?",
        answer:
          "Il est utile de comparer à chaque hausse de tarif, déménagement, changement de surface ou évolution de situation. Un contrat ancien peut rester correct, mais il mérite d’être challengé régulièrement.",
      },
      {
        question: "Faut-il choisir l’offre habitation la moins chère ?",
        answer:
          "Pas forcément. Le bon choix dépend aussi des franchises, exclusions, plafonds d’indemnisation et garanties réellement utiles pour ton logement.",
      },
    ],
  },
  {
    slug: "changer-assurance-auto",
    title: "Changer d’assurance auto : quoi comparer avant de signer",
    description:
      "Méthode simple pour comparer assurance auto, usage, niveau de couverture et économie annuelle sans sacrifier les garanties utiles.",
    eyebrow: "Assurance auto",
    categorySlug: "assurance-auto",
    intent: "changer",
    heroMetric: "jusqu’à 396€/an",
    intro:
      "L’assurance auto varie fortement selon le véhicule, l’usage, le niveau de couverture et le profil conducteur. Comparer proprement évite deux erreurs : payer trop cher ou descendre trop bas en garanties.",
    painPoints: ["Prime trop élevée", "Usage occasionnel mal tarifé", "Garanties mal comprises"],
    steps: [
      { title: "Pose ton usage réel", body: "Quotidien, occasionnel ou professionnel : l’usage change la pertinence des offres." },
      { title: "Garde le bon niveau de couverture", body: "Au tiers, intermédiaire ou tous risques : le bon choix dépend surtout de la valeur du véhicule." },
      { title: "Compare l’économie annuelle", body: "Une mensualité plus basse doit se vérifier sur l’année et avec les franchises." },
    ],
    signals: ["Bonus amélioré", "Véhicule moins coté", "Kilométrage réduit", "Prime qui augmente"],
    faq: [
      {
        question: "Peut-on changer d’assurance auto facilement ?",
        answer:
          "En France, un contrat auto de plus d’un an peut généralement être résilié plus simplement. Le nouveau contrat doit toutefois être actif avant toute rupture de couverture.",
      },
      {
        question: "Quelle garantie auto comparer en priorité ?",
        answer:
          "Commence par le niveau de couverture, les franchises, l’assistance, le bris de glace et les exclusions. Le prix seul ne suffit pas.",
      },
    ],
  },
  {
    slug: "comparer-electricite-gaz",
    title: "Comparer électricité et gaz séparément pour mieux comprendre sa facture",
    description:
      "Guide énergie pour comparer électricité et gaz sans les mélanger, selon ton logement, ton chauffage et ton objectif d’économie.",
    eyebrow: "Énergie",
    categorySlug: "electricite",
    intent: "comparer",
    heroMetric: "électricité + gaz",
    intro:
      "Une facture énergie claire commence par une séparation nette : l’électricité et le gaz ne répondent pas toujours au même usage. Comparia aide à poser le bon diagnostic avant de regarder les offres.",
    painPoints: ["Mensualité incomprise", "Offre groupée floue", "Chauffage coûteux", "Prix qui bouge"],
    steps: [
      { title: "Sépare les usages", body: "Électricité courante, chauffage, eau chaude et cuisson n’ont pas le même impact." },
      { title: "Choisis ton objectif", body: "Prix bas, stabilité ou offre verte : le meilleur contrat change selon la priorité." },
      { title: "Compare la facture annuelle", body: "La mensualité est utile, mais l’estimation annuelle reste plus fiable pour décider." },
    ],
    signals: ["Logement chauffé au gaz", "Maison énergivore", "Offre indexée", "Mensualité élevée"],
    faq: [
      {
        question: "Pourquoi séparer électricité et gaz ?",
        answer:
          "Parce que les usages, les prix et les économies potentielles ne sont pas identiques. Une comparaison séparée évite de choisir une offre groupée peu claire.",
      },
      {
        question: "Une offre verte est-elle toujours plus chère ?",
        answer:
          "Pas toujours. Le prix dépend du fournisseur, de la structure tarifaire et de la consommation. Il faut comparer sur une base annuelle.",
      },
    ],
  },
  {
    slug: "forfait-mobile-moins-cher",
    title: "Trouver un forfait mobile moins cher sans perdre le bon réseau",
    description:
      "Compare les forfaits mobiles selon la data, la zone d’usage, le réseau et les besoins Europe ou Suisse.",
    eyebrow: "Forfait mobile",
    categorySlug: "forfait-mobile",
    intent: "économiser",
    heroMetric: "jusqu’à 130€/an",
    intro:
      "Le mobile est devenu très concurrentiel. Beaucoup d’utilisateurs paient encore pour trop de data, des options inutiles ou un forfait historique qui n’a plus de raison d’être.",
    painPoints: ["Trop de data inutilisée", "Options oubliées", "Offre ancienne", "Besoin Suisse mal couvert"],
    steps: [
      { title: "Mesure ta vraie data", body: "Moins de 20 Go, 20 à 100 Go ou usage intensif : c’est le premier filtre." },
      { title: "Vérifie la zone", body: "France, Europe ou Suisse incluse : les frontaliers doivent regarder ce point de près." },
      { title: "Choisis le bon équilibre", body: "Le meilleur forfait combine prix, réseau et simplicité, pas seulement un tarif d’appel." },
    ],
    signals: ["Forfait ancien", "Data non utilisée", "Suisse nécessaire", "Promotion expirée"],
    faq: [
      {
        question: "Quel volume de data choisir ?",
        answer:
          "Regarde ta consommation réelle sur les trois derniers mois. Beaucoup d’utilisateurs surestiment leurs besoins et paient un forfait trop large.",
      },
      {
        question: "Le moins cher est-il toujours le meilleur forfait ?",
        answer:
          "Non. Le réseau, les zones incluses et les conditions après promotion comptent autant que le prix affiché.",
      },
    ],
  },
  {
    slug: "assurance-animaux-chien-chat",
    title: "Assurance animaux : comparer pour chien ou chat sans formule inutile",
    description:
      "Guide pour comparer assurance animaux, âge, niveau de protection, accidents, maladies et budget annuel.",
    eyebrow: "Assurance animaux",
    categorySlug: "assurance-animaux",
    intent: "comparer",
    heroMetric: "jusqu’à 180€/an",
    intro:
      "Chien, chat ou plusieurs animaux : le bon contrat dépend de l’âge, du niveau de protection et du budget que tu veux sécuriser. L’objectif est d’éviter une formule trop légère ou inutilement lourde.",
    painPoints: ["Frais vétérinaires imprévus", "Animal vieillissant", "Plafonds peu clairs"],
    steps: [
      { title: "Définis l’animal et son âge", body: "L’âge influence fortement l’intérêt des garanties maladie et accidents." },
      { title: "Compare les plafonds", body: "Un remboursement intéressant dépend aussi du plafond annuel et des exclusions." },
      { title: "Évite la surprotection", body: "Le contrat doit protéger sans absorber un budget disproportionné chaque mois." },
    ],
    signals: ["Jeune animal", "Race fragile", "Frais récents", "Budget vétérinaire élevé"],
    faq: [
      {
        question: "Une assurance animaux rembourse-t-elle tout ?",
        answer:
          "Non. Chaque contrat possède des plafonds, franchises, délais de carence et exclusions. Il faut les lire avant de souscrire.",
      },
      {
        question: "Est-ce utile pour un jeune animal ?",
        answer:
          "Cela peut l’être pour sécuriser les accidents ou maladies imprévues, mais le bon niveau dépend du budget et du risque accepté.",
      },
    ],
  },
  {
    slug: "frontalier-change-chf-eur",
    title: "Frontalier Suisse-France : réduire les pertes sur le change CHF/EUR",
    description:
      "Guide frontalier pour comparer les solutions de change CHF/EUR et repérer les frais invisibles sur les conversions régulières.",
    eyebrow: "Frontaliers",
    categorySlug: "change-chf-eur",
    intent: "optimiser",
    heroMetric: "CHF → EUR",
    intro:
      "Quand ton salaire arrive en CHF et que tes dépenses sont en euros, quelques dixièmes de frais peuvent devenir une vraie somme sur l’année. Le change mérite donc un comparateur à part entière.",
    painPoints: ["Taux peu lisible", "Frais bancaires", "Conversions régulières", "Virements transfrontaliers"],
    steps: [
      { title: "Estime le volume mensuel", body: "Plus le montant converti est important, plus l’écart de taux devient sensible." },
      { title: "Compare taux et frais", body: "Il faut regarder le taux appliqué, les frais fixes et le délai de transfert." },
      { title: "Mesure l’économie annuelle", body: "Une petite différence mensuelle peut devenir significative sur douze mois." },
    ],
    signals: ["Salaire CHF", "Dépenses France", "Banque traditionnelle", "Frais invisibles"],
    faq: [
      {
        question: "Pourquoi le change CHF/EUR coûte-t-il parfois cher ?",
        answer:
          "Le coût peut venir du taux appliqué, de frais fixes, d’une marge de change ou de frais bancaires intermédiaires.",
      },
      {
        question: "Un frontalier doit-il comparer souvent ?",
        answer:
          "Oui, surtout si le volume converti est régulier. Le bon outil peut changer selon les frais, les délais et les conditions du moment.",
      },
    ],
  },
  {
    slug: "reduire-abonnements-mensuels",
    title: "Réduire ses abonnements mensuels sans perdre les services utiles",
    description:
      "Méthode pour repérer les abonnements inutilisés, réduire les prélèvements récurrents et garder les services vraiment utiles.",
    eyebrow: "Abonnements",
    categorySlug: "abonnements",
    intent: "économiser",
    heroMetric: "mensuel",
    intro:
      "Les abonnements sont les petites fuites parfaites : streaming, apps, logiciels, sport ou loisirs. Individuellement, ils semblent modestes ; ensemble, ils peuvent créer une vraie fuite annuelle.",
    painPoints: ["Services oubliés", "Prélèvements multiples", "Offres doublons", "Usage en baisse"],
    steps: [
      { title: "Liste les prélèvements", body: "Commence par identifier ce qui revient chaque mois, même les petits montants." },
      { title: "Classe par usage réel", body: "Un service non utilisé depuis deux mois mérite d’être réduit, suspendu ou remplacé." },
      { title: "Garde une routine", body: "La meilleure optimisation est celle qu’on revoit régulièrement, pas une fois tous les trois ans." },
    ],
    signals: ["Doublons streaming", "Apps oubliées", "Sport inutilisé", "Essais gratuits terminés"],
    faq: [
      {
        question: "Quels abonnements regarder en premier ?",
        answer:
          "Les services peu utilisés, les doublons streaming, les apps premium et les abonnements liés à un ancien besoin sont souvent les premiers candidats.",
      },
      {
        question: "Faut-il tout résilier ?",
        answer:
          "Non. L’objectif est de garder ce qui sert vraiment et de retirer ce qui prélève sans valeur réelle.",
      },
    ],
  },
  {
    slug: "mutuelle-sante-economiser",
    title: "Mutuelle santé : économiser en gardant les bons postes couverts",
    description:
      "Compare mutuelle santé selon optique, dentaire, hospitalisation, foyer couvert et économie annuelle estimée.",
    eyebrow: "Mutuelle santé",
    categorySlug: "mutuelle-sante",
    intent: "optimiser",
    heroMetric: "jusqu’à 416€/an",
    intro:
      "Une mutuelle utile n’est pas forcément la plus chère. Elle doit couvrir les postes qui comptent pour toi : optique, dentaire, hospitalisation, soins courants ou famille.",
    painPoints: ["Cotisation élevée", "Postes inutiles", "Famille mal couverte", "Besoins qui changent"],
    steps: [
      { title: "Priorise les soins importants", body: "Dentaire, optique ou hospitalisation : choisis d’abord le poste décisif." },
      { title: "Compare le foyer réel", body: "Une formule solo, couple ou famille ne se lit pas de la même manière." },
      { title: "Regarde le reste à charge", body: "Le prix mensuel compte, mais le reste à charge potentiel compte aussi." },
    ],
    signals: ["Cotisation élevée", "Peu de remboursements", "Nouveau besoin santé", "Famille qui évolue"],
    faq: [
      {
        question: "Comment choisir une mutuelle santé ?",
        answer:
          "Commence par tes soins probables, ton foyer et ton budget. Une bonne mutuelle est adaptée à ton usage, pas seulement riche en garanties.",
      },
      {
        question: "Peut-on payer moins sans être moins couvert ?",
        answer:
          "Oui dans certains cas, si le contrat actuel couvre trop de postes inutiles ou n’est plus aligné avec ta situation.",
      },
    ],
  },
  {
    slug: "meilleure-box-internet-pas-chere",
    title: "Meilleure box internet pas chère : quoi vérifier avant de changer",
    description:
      "Guide pour comparer une box internet pas chère selon fibre, Wi-Fi, TV, engagement, prix après promotion et services inclus.",
    eyebrow: "Box internet",
    categorySlug: "box-internet",
    intent: "comparer",
    heroMetric: "jusqu’à 180€/an",
    intro:
      "Une box internet pas chère peut être une vraie économie, mais seulement si le prix reste cohérent après promotion et si la connexion correspond au foyer. Le bon choix dépend de la fibre disponible, du Wi-Fi, de la TV, des frais et de l’engagement.",
    painPoints: ["Prix promotionnel qui remonte", "Wi-Fi insuffisant", "Options TV inutiles", "Frais de mise en service"],
    steps: [
      { title: "Vérifie la technologie disponible", body: "Fibre, ADSL ou câble : le débit réel et la stabilité changent fortement selon l’adresse." },
      { title: "Compare le prix sur 12 mois", body: "Regarde le tarif après promotion, les frais d’activation, les frais de résiliation et la durée d’engagement." },
      { title: "Garde seulement les options utiles", body: "TV, répéteur Wi-Fi ou appels inclus peuvent être intéressants, mais pas s’ils gonflent la facture sans usage réel." },
    ],
    signals: ["Facture box élevée", "Promotion terminée", "Fibre disponible", "TV peu utilisée"],
    faq: [
      {
        question: "Quelle est la meilleure box internet pas chère ?",
        answer:
          "La meilleure box dépend de ton adresse, de ton besoin en débit, de la qualité Wi-Fi attendue et du prix après promotion. Comparer seulement le premier mois peut induire en erreur.",
      },
      {
        question: "Faut-il prendre une box avec TV incluse ?",
        answer:
          "Seulement si tu l’utilises vraiment. Sinon, une offre internet seule peut souvent être plus lisible et moins coûteuse.",
      },
    ],
  },
  {
    slug: "reduire-facture-internet",
    title: "Réduire sa facture internet sans perdre une bonne connexion",
    description:
      "Méthode simple pour réduire une facture internet trop élevée en comparant débit, options, engagement et prix annuel.",
    eyebrow: "Facture internet",
    categorySlug: "box-internet",
    intent: "économiser",
    heroMetric: "box + options",
    intro:
      "La facture internet augmente souvent par petites touches : promotion terminée, options ajoutées, matériel facturé ou offre devenue trop ancienne. Avant de changer, il faut séparer le besoin réel du confort inutile.",
    painPoints: ["Offre ancienne", "Options oubliées", "Débit non utilisé", "Mensualité qui grimpe"],
    steps: [
      { title: "Relis la facture actuelle", body: "Identifie le prix de base, les options, les frais annexes et la date de fin d’engagement." },
      { title: "Mesure ton besoin réel", body: "Télétravail, streaming, jeux, foyer nombreux : le débit utile n’est pas le même pour tout le monde." },
      { title: "Compare les offres activables", body: "Une bonne économie doit rester simple à activer et cohérente avec ton logement." },
    ],
    signals: ["Plus de 35€/mois", "Options TV non utilisées", "Contrat ancien", "Déménagement prévu"],
    faq: [
      {
        question: "Comment payer moins cher sa box internet ?",
        answer:
          "Compare le prix annuel complet, retire les options inutiles et vérifie les offres sans engagement ou les promotions durables selon ton adresse.",
      },
      {
        question: "Changer de box coupe-t-il internet longtemps ?",
        answer:
          "Cela dépend de l’opérateur et de la technologie. Il vaut mieux vérifier les délais d’activation et conserver l’ancien accès jusqu’à confirmation du nouveau service.",
      },
    ],
  },
  {
    slug: "banque-en-ligne-gratuite",
    title: "Banque en ligne gratuite : comparer frais, carte et services utiles",
    description:
      "Guide pour comparer une banque en ligne gratuite selon carte, frais, application, voyage, épargne et conditions d’utilisation.",
    eyebrow: "Banque en ligne",
    categorySlug: "banque",
    intent: "comparer",
    heroMetric: "jusqu’à 140€/an",
    intro:
      "Une banque en ligne gratuite peut réduire les frais du quotidien, mais les conditions comptent : carte, paiements à l’étranger, retraits, application, épargne et service client. Gratuit ne veut pas dire identique.",
    painPoints: ["Frais bancaires récurrents", "Carte payante", "Frais voyage", "Application limitée"],
    steps: [
      { title: "Liste tes frais actuels", body: "Carte, tenue de compte, incidents, virements et retraits donnent une base de comparaison claire." },
      { title: "Compare la carte et les conditions", body: "Débit immédiat ou différé, plafonds, revenus exigés et frais à l’étranger changent l’intérêt réel." },
      { title: "Regarde l’usage quotidien", body: "Une bonne banque doit rester simple : application fiable, notifications, virements et support lisibles." },
    ],
    signals: ["Carte facturée", "Voyages fréquents", "Frais de tenue de compte", "App bancaire faible"],
    faq: [
      {
        question: "Une banque en ligne gratuite est-elle vraiment gratuite ?",
        answer:
          "Elle peut l’être pour un usage standard, mais certaines conditions ou opérations spécifiques peuvent coûter. Il faut vérifier la grille tarifaire.",
      },
      {
        question: "Quelle banque en ligne choisir ?",
        answer:
          "Le bon choix dépend de ton usage : frais bas, carte, voyage, épargne, application mobile ou accompagnement. Comparia aide à poser ces critères avant de choisir.",
      },
    ],
  },
  {
    slug: "forfait-mobile-sans-engagement",
    title: "Forfait mobile sans engagement : éviter de payer trop de data",
    description:
      "Guide pour comparer un forfait mobile sans engagement selon data, réseau, Europe, Suisse, prix après promo et usage réel.",
    eyebrow: "Forfait mobile",
    categorySlug: "forfait-mobile",
    intent: "optimiser",
    heroMetric: "sans engagement",
    intro:
      "Le forfait mobile sans engagement donne de la flexibilité, mais beaucoup d’utilisateurs paient encore trop de data ou des options peu utilisées. Le bon forfait est celui qui colle à ta consommation réelle.",
    painPoints: ["Data surdimensionnée", "Prix promo temporaire", "Réseau irrégulier", "Suisse non incluse"],
    steps: [
      { title: "Regarde ta consommation réelle", body: "Les trois derniers mois suffisent souvent pour savoir si 20 Go, 100 Go ou plus sont utiles." },
      { title: "Vérifie les zones incluses", body: "Europe, DOM, Suisse ou appels internationaux peuvent changer la facture finale." },
      { title: "Compare la stabilité du prix", body: "Une offre très basse au départ peut devenir moins intéressante après quelques mois." },
    ],
    signals: ["Plus de 15€/mois", "Data inutilisée", "Besoin Europe", "Promotion qui expire"],
    faq: [
      {
        question: "Quel forfait mobile sans engagement choisir ?",
        answer:
          "Choisis selon la data réellement consommée, le réseau disponible dans tes lieux de vie et les zones incluses. Le prix seul ne suffit pas.",
      },
      {
        question: "Peut-on changer facilement de forfait mobile ?",
        answer:
          "Oui, surtout sans engagement. Il faut seulement vérifier la portabilité du numéro, les délais et les conditions de l’offre choisie.",
      },
    ],
  },
  {
    slug: "assurance-habitation-pas-chere",
    title: "Assurance habitation pas chère : comparer sans rogner les garanties",
    description:
      "Guide pour trouver une assurance habitation moins chère en comparant statut, surface, franchises, exclusions et garanties essentielles.",
    eyebrow: "Assurance habitation",
    categorySlug: "assurance-habitation",
    intent: "économiser",
    heroMetric: "jusqu’à 480€/an",
    intro:
      "Chercher une assurance habitation pas chère ne doit pas conduire à perdre les garanties essentielles. Le bon contrat protège le logement au juste prix, avec des franchises et exclusions compréhensibles.",
    painPoints: ["Contrat qui augmente", "Franchise élevée", "Garanties doublons", "Surface mal déclarée"],
    steps: [
      { title: "Repars du logement réel", body: "Statut, surface, nombre de pièces et valeur des biens doivent être cohérents." },
      { title: "Compare les garanties essentielles", body: "Dégâts des eaux, vol, incendie, responsabilité civile et assistance doivent rester lisibles." },
      { title: "Vérifie le coût total", body: "Regarde la cotisation annuelle, les franchises et les exclusions avant de te décider." },
    ],
    signals: ["Hausse récente", "Déménagement", "Contrat ancien", "Garanties peu utilisées"],
    faq: [
      {
        question: "Comment trouver une assurance habitation pas chère ?",
        answer:
          "Compare à logement équivalent, avec les mêmes garanties importantes. Une offre moins chère mais avec une franchise trop haute peut être moins intéressante.",
      },
      {
        question: "Locataire et propriétaire comparent-ils les mêmes offres ?",
        answer:
          "Non. Le statut change les obligations et les garanties pertinentes. C’est pour cela que le comparateur commence par qualifier le logement.",
      },
    ],
  },
  {
    slug: "meilleur-forfait-mobile-5g",
    title: "Meilleur forfait mobile 5G : comparer réseau, data et prix",
    description:
      "Guide pour choisir un forfait mobile 5G selon data, réseau, prix après promotion, Europe, Suisse et usage réel.",
    eyebrow: "Forfait 5G",
    categorySlug: "forfait-mobile",
    intent: "comparer",
    heroMetric: "5G + data",
    intro:
      "Un bon forfait mobile 5G ne se limite pas au nombre de gigas. Il faut regarder la couverture réseau dans tes lieux de vie, le prix après promotion, les zones incluses et la quantité de data réellement utile.",
    painPoints: ["Data trop large", "Réseau instable", "Prix qui augmente", "Options internationales floues"],
    steps: [
      { title: "Vérifie ton usage data", body: "Streaming, partage de connexion et déplacements changent vite le volume nécessaire." },
      { title: "Compare le réseau réel", body: "Le meilleur réseau dépend de ton domicile, de ton travail et de tes trajets réguliers." },
      { title: "Lis le prix après promotion", body: "Le coût pertinent est le prix durable, pas uniquement le tarif des premiers mois." },
    ],
    signals: ["5G nécessaire", "Plus de 100 Go", "Partage de connexion", "Prix promo temporaire"],
    faq: [
      {
        question: "Faut-il forcément prendre un forfait 5G ?",
        answer:
          "Non. La 5G est utile si ton téléphone est compatible, si la couverture est bonne et si tes usages justifient plus de débit.",
      },
      {
        question: "Quel forfait 5G choisir ?",
        answer:
          "Compare d’abord réseau, data utile, zones incluses et prix après promotion. Le forfait le plus gros n’est pas toujours le plus rentable.",
      },
    ],
  },
  {
    slug: "box-internet-sans-engagement",
    title: "Box internet sans engagement : comparer liberté, fibre et prix annuel",
    description:
      "Guide pour comparer une box internet sans engagement selon fibre, frais, routeur, Wi-Fi, TV et coût total sur 12 mois.",
    eyebrow: "Box sans engagement",
    categorySlug: "box-internet",
    intent: "optimiser",
    heroMetric: "liberté",
    intro:
      "Une box internet sans engagement peut éviter de rester bloqué dans une offre devenue trop chère. Mais il faut vérifier les frais de départ, la qualité du matériel, les options et le coût complet sur l’année.",
    painPoints: ["Engagement long", "Frais cachés", "Box ancienne", "Déménagement possible"],
    steps: [
      { title: "Compare les frais de départ", body: "Activation, livraison, dépôt ou résiliation peuvent changer le vrai prix." },
      { title: "Vérifie la fibre à l’adresse", body: "Une offre séduisante ne vaut rien si elle n’est pas disponible ou stable chez toi." },
      { title: "Regarde les options incluses", body: "TV, appels et répéteurs Wi-Fi doivent servir réellement pour justifier leur prix." },
    ],
    signals: ["Besoin flexible", "Promotion finie", "Déménagement", "Offre trop lourde"],
    faq: [
      {
        question: "Une box sans engagement est-elle plus chère ?",
        answer:
          "Pas toujours. Elle peut être compétitive, mais il faut comparer le coût total avec frais et options inclus.",
      },
      {
        question: "Pourquoi choisir une box sans engagement ?",
        answer:
          "Pour garder la liberté de changer si le prix augmente, si la qualité baisse ou si ton logement change.",
      },
    ],
  },
  {
    slug: "changer-fournisseur-electricite",
    title: "Changer de fournisseur d’électricité : étapes et points à vérifier",
    description:
      "Guide pour changer de fournisseur d’électricité en comparant prix, stabilité, offre verte, consommation et conditions.",
    eyebrow: "Électricité",
    categorySlug: "electricite",
    intent: "changer",
    heroMetric: "prix annuel",
    intro:
      "Changer de fournisseur d’électricité peut être simple, mais il faut éviter de choisir uniquement sur une mensualité attractive. La comparaison doit porter sur le prix annuel estimé, la structure tarifaire et la stabilité des conditions.",
    painPoints: ["Mensualité élevée", "Offre indexée", "Consommation mal estimée", "Prix peu lisible"],
    steps: [
      { title: "Estime ton profil logement", body: "Surface, chauffage, foyer et équipements donnent une première base de consommation." },
      { title: "Compare prix et stabilité", body: "Prix fixe, indexé ou offre verte : le bon choix dépend de ton objectif." },
      { title: "Vérifie les conditions", body: "Regarde les modalités de souscription, d’évolution du prix et de résiliation." },
    ],
    signals: ["Hausse de facture", "Maison électrique", "Prix variable", "Offre ancienne"],
    faq: [
      {
        question: "Changer de fournisseur d’électricité coupe-t-il le courant ?",
        answer:
          "Non, le changement se fait généralement sans coupure. Il faut toutefois vérifier les conditions exactes auprès du fournisseur choisi.",
      },
      {
        question: "Comment choisir une offre d’électricité ?",
        answer:
          "Compare le prix annuel estimé, la stabilité, l’origine de l’énergie et l’adéquation avec ton logement.",
      },
    ],
  },
  {
    slug: "comparateur-assurance-auto-pas-cher",
    title: "Comparateur assurance auto pas cher : économiser sans se tromper",
    description:
      "Guide pour comparer une assurance auto pas chère selon véhicule, usage, franchises, assistance et niveau de couverture.",
    eyebrow: "Assurance auto",
    categorySlug: "assurance-auto",
    intent: "économiser",
    heroMetric: "jusqu’à 396€/an",
    intro:
      "Une assurance auto pas chère peut être intéressante si elle reste cohérente avec ton véhicule et ton usage. Le risque est de descendre trop bas en garanties ou d’accepter des franchises qui effacent l’économie.",
    painPoints: ["Prime trop élevée", "Franchise importante", "Garanties inutiles", "Véhicule moins coté"],
    steps: [
      { title: "Adapte la couverture au véhicule", body: "Tous risques, intermédiaire ou tiers : la valeur du véhicule change le bon niveau." },
      { title: "Compare les franchises", body: "Une mensualité basse peut cacher une franchise trop élevée en cas de sinistre." },
      { title: "Vérifie assistance et exclusions", body: "Dépannage, prêt de véhicule et exclusions doivent rester compréhensibles." },
    ],
    signals: ["Bonus amélioré", "Kilométrage réduit", "Contrat ancien", "Voiture moins chère"],
    faq: [
      {
        question: "Quelle assurance auto pas chère choisir ?",
        answer:
          "Choisis celle qui garde le bon niveau de couverture pour ton véhicule, avec des franchises et exclusions acceptables.",
      },
      {
        question: "Comparer l’assurance auto est-il utile chaque année ?",
        answer:
          "Oui, surtout si ton bonus, ton véhicule ou ton kilométrage a changé. Le contrat peut devenir moins compétitif avec le temps.",
      },
    ],
  },
  {
    slug: "banque-en-ligne-avec-carte-gratuite",
    title: "Banque en ligne avec carte gratuite : conditions à comparer",
    description:
      "Guide pour comparer les banques en ligne avec carte gratuite selon frais, plafonds, paiements, retraits, voyage et application.",
    eyebrow: "Carte gratuite",
    categorySlug: "banque",
    intent: "comparer",
    heroMetric: "0€/mois",
    intro:
      "Une carte gratuite peut réduire les frais bancaires, mais les conditions varient : revenus, usage minimal, plafonds, retraits, paiements à l’étranger et type de carte. La gratuité doit être lisible.",
    painPoints: ["Carte payante", "Conditions floues", "Frais à l’étranger", "Plafonds trop bas"],
    steps: [
      { title: "Vérifie la condition de gratuité", body: "Certaines cartes imposent un paiement mensuel, un revenu ou une utilisation minimale." },
      { title: "Compare retraits et paiements", body: "Les frais à l’étranger ou hors réseau peuvent changer le coût réel." },
      { title: "Teste l’usage quotidien", body: "Notifications, virements, sécurité et support comptent autant que le prix." },
    ],
    signals: ["Carte actuelle payante", "Voyage fréquent", "Besoin app mobile", "Frais bancaires"],
    faq: [
      {
        question: "Une carte bancaire gratuite a-t-elle des limites ?",
        answer:
          "Oui, elle peut avoir des plafonds, conditions d’usage ou frais spécifiques. Il faut vérifier la brochure tarifaire.",
      },
      {
        question: "Quelle banque en ligne avec carte gratuite choisir ?",
        answer:
          "La meilleure dépend de ton usage : paiements, retraits, voyages, épargne, application mobile et besoin de support.",
      },
    ],
  },
  {
    slug: "comparateur-gaz-prix-fixe",
    title: "Comparateur gaz prix fixe : stabilité ou économie immédiate ?",
    description:
      "Guide pour comparer une offre de gaz à prix fixe selon chauffage, cuisson, eau chaude, consommation et budget annuel.",
    eyebrow: "Gaz",
    categorySlug: "gaz",
    intent: "comparer",
    heroMetric: "jusqu’à 90€/an",
    intro:
      "Une offre de gaz à prix fixe peut rassurer si tu veux stabiliser ton budget, mais elle n’est pas toujours la moins chère. Le bon choix dépend de ton usage : chauffage, eau chaude ou simple cuisson.",
    painPoints: ["Budget gaz instable", "Chauffage coûteux", "Offre groupée floue", "Prix indexé"],
    steps: [
      { title: "Identifie ton usage gaz", body: "Chauffage, eau chaude et cuisson n’ont pas le même poids dans la facture." },
      { title: "Compare fixe et indexé", body: "Le prix fixe apporte de la visibilité, l’indexé peut être plus intéressant selon le marché." },
      { title: "Regarde le coût annuel", body: "La mensualité ne suffit pas : compare l’estimation annuelle et les conditions d’évolution." },
    ],
    signals: ["Chauffage au gaz", "Maison", "Mensualité élevée", "Besoin de stabilité"],
    faq: [
      {
        question: "Une offre gaz à prix fixe est-elle toujours préférable ?",
        answer:
          "Non. Elle apporte de la stabilité, mais il faut comparer le prix annuel estimé avec les offres indexées.",
      },
      {
        question: "Comment réduire sa facture gaz ?",
        answer:
          "Compare ton usage réel, ton type de logement, le prix du kWh, l’abonnement et la stabilité du contrat.",
      },
    ],
  },
];

export function getGuide(slug: string) {
  return seoGuides.find((guide) => guide.slug === slug);
}

export function getGuideCategory(guide: SeoGuide): Category {
  const category = categories.find((item) => item.slug === guide.categorySlug);

  if (!category) {
    throw new Error(`Missing category for SEO guide: ${guide.slug}`);
  }

  return category;
}

export function getGuideUrl(slug: string) {
  return `${siteConfig.url}/guides/${slug}`;
}

export function buildGuideJsonLd(guide: SeoGuide) {
  const category = getGuideCategory(guide);
  const url = getGuideUrl(guide.slug);

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Guides économies", item: `${siteConfig.url}/guides` },
        { "@type": "ListItem", position: 3, name: guide.title, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.description,
      url,
      inLanguage: "fr-FR",
      about: category.title,
      author: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];
}
