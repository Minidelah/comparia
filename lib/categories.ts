export type Category = {
  slug: string;
  title: string;
  group: "Assurances" | "Maison" | "Finances" | "Frontaliers";
  description: string;
  saving: string;
  status: "active" | "coming-soon";
  headline: string;
  questions: string[];
  flow: {
    title: string;
    helper: string;
    options: string[];
  }[];
};

export const categories: Category[] = [
  {
    slug: "change-chf-eur",
    title: "Change CHF/EUR",
    group: "Frontaliers",
    description: "Réduis les pertes invisibles sur tes conversions régulières.",
    saving: "jusqu’à 310€/an",
    status: "active",
    headline: "Réduis la friction invisible entre ton salaire suisse et tes dépenses françaises.",
    questions: ["Combien de CHF convertis-tu chaque mois ?", "Quelle solution utilises-tu aujourd’hui ?"],
    flow: [
      { title: "Combien convertis-tu chaque mois ?", helper: "Une estimation suffit pour commencer.", options: ["Moins de 2 000 CHF", "2 000 à 4 000 CHF", "Plus de 4 000 CHF"] },
      { title: "Comment changes-tu aujourd’hui ?", helper: "On compare ta solution actuelle au bon marché.", options: ["Banque traditionnelle", "Application de change", "Je ne sais pas"] },
    ],
  },
  {
    slug: "assurance-sante-frontaliers",
    title: "Assurance santé frontalier",
    group: "Frontaliers",
    description: "Compare les options adaptées à ton statut France-Suisse.",
    saving: "jusqu’à 220€/an",
    status: "active",
    headline: "Clarifie l’un des arbitrages les plus coûteux de la vie frontalière.",
    questions: ["Es-tu en LAMal ou CMU ?", "Quelle est ta situation familiale ?"],
    flow: [
      { title: "Quel régime utilises-tu ?", helper: "Cela change fortement les options pertinentes.", options: ["LAMal", "CMU / PUMA", "Je ne sais pas"] },
      { title: "Quelle est ta situation ?", helper: "Le foyer compte dans le calcul.", options: ["Seul", "En couple", "Avec enfant(s)"] },
    ],
  },
  {
    slug: "assurance-auto",
    title: "Assurance auto",
    group: "Assurances",
    description: "Trouve une couverture compétitive à garanties comparables.",
    saving: "jusqu’à 396€/an",
    status: "active",
    headline: "Remets ton contrat auto en concurrence sans sacrifier les garanties utiles.",
    questions: ["Quel véhicule assures-tu ?", "Quel est ton bonus-malus ?", "Combien paies-tu aujourd’hui ?"],
    flow: [
      { title: "Quel véhicule veux-tu assurer ?", helper: "On calibre d’abord le besoin réel.", options: ["Citadine", "Berline / SUV", "Utilitaire"] },
      { title: "Quel est ton usage ?", helper: "Le bon contrat dépend plus de l’usage que du marketing.", options: ["Occasionnel", "Quotidien", "Professionnel"] },
      { title: "Quel niveau de couverture veux-tu ?", helper: "On évite les offres moins chères mais mal adaptées.", options: ["Au tiers", "Intermédiaire", "Tous risques"] },
    ],
  },
  {
    slug: "assurance-moto",
    title: "Assurance moto",
    group: "Assurances",
    description: "Optimise ton deux-roues sans sacrifier l’essentiel.",
    saving: "jusqu’à 223€/an",
    status: "active",
    headline: "Optimise ton deux-roues avec une couverture réellement adaptée.",
    questions: ["Quelle cylindrée conduis-tu ?", "Quel usage fais-tu de ta moto ?"],
    flow: [
      { title: "Quelle moto assures-tu ?", helper: "La cylindrée change vite le prix.", options: ["50–125 cc", "126–500 cc", "Plus de 500 cc"] },
      { title: "Quel usage en fais-tu ?", helper: "On filtre les garanties inutiles.", options: ["Loisir", "Trajets quotidiens", "Toute l’année"] },
    ],
  },
  {
    slug: "assurance-velo",
    title: "Assurance vélo",
    group: "Assurances",
    description: "Protège ton vélo sans surpayer une couverture mal ajustée.",
    saving: "selon ton usage",
    status: "active",
    headline: "Optimise la protection de ton vélo selon sa valeur et ton quotidien.",
    questions: ["Quel type de vélo utilises-tu ?", "Quelle est sa valeur approximative ?"],
    flow: [
      { title: "Quel vélo utilises-tu ?", helper: "La valeur et l’usage n’appellent pas la même protection.", options: ["Classique", "Électrique", "Cargo / haut de gamme"] },
      { title: "Quel est ton usage ?", helper: "On adapte vol, casse et assistance.", options: ["Loisir", "Ville", "Quotidien intensif"] },
    ],
  },
  {
    slug: "assurance-trottinette",
    title: "Assurance trottinette",
    group: "Assurances",
    description: "Compare les garanties utiles pour tes trajets urbains.",
    saving: "selon ton usage",
    status: "active",
    headline: "Trouve une protection simple pour ta mobilité légère.",
    questions: ["Quelle trottinette utilises-tu ?", "L’utilises-tu quotidiennement ?"],
    flow: [
      { title: "Quelle trottinette utilises-tu ?", helper: "La formule dépend de la valeur et de la fréquence.", options: ["Basique", "Électrique classique", "Haut de gamme"] },
      { title: "À quelle fréquence roules-tu ?", helper: "On sépare l’essentiel du superflu.", options: ["Rarement", "Chaque semaine", "Tous les jours"] },
    ],
  },
  {
    slug: "assurance-habitation",
    title: "Assurance habitation",
    group: "Assurances",
    description: "Vérifie si ton logement est encore assuré au bon prix.",
    saving: "jusqu’à 480€/an",
    status: "active",
    headline: "Assure ton logement au bon niveau, pas au prix de l’inertie.",
    questions: ["Es-tu locataire ou propriétaire ?", "Quelle est la surface du logement ?"],
    flow: [
      { title: "Tu es…", helper: "Le bon comparatif part du statut réel.", options: ["Locataire", "Propriétaire occupant", "Propriétaire bailleur"] },
      { title: "Quel logement assures-tu ?", helper: "On affine avant d’afficher les offres.", options: ["Studio / T2", "T3 / T4", "Maison"] },
    ],
  },
  {
    slug: "mutuelle-sante",
    title: "Mutuelle santé",
    group: "Assurances",
    description: "Aligne ta couverture avec tes vrais besoins.",
    saving: "jusqu’à 416€/an",
    status: "active",
    headline: "Paie pour les soins dont tu as besoin, pas pour un contrat mal ajusté.",
    questions: ["Quels postes veux-tu mieux couvrir ?", "Combien paies-tu aujourd’hui ?"],
    flow: [
      { title: "Quel besoin prioritaire ?", helper: "Une mutuelle utile commence par le poste qui compte.", options: ["Dentaire", "Optique", "Hospitalisation"] },
      { title: "Qui doit être couvert ?", helper: "On évite de comparer des contrats incomparables.", options: ["Moi seul", "Couple", "Famille"] },
    ],
  },
  {
    slug: "assurance-animaux",
    title: "Assurance animaux",
    group: "Assurances",
    description: "Compare les protections utiles pour chien ou chat.",
    saving: "jusqu’à 180€/an",
    status: "active",
    headline: "Protège ton animal sans payer une formule inutilement lourde.",
    questions: ["Chien ou chat ?", "Quel âge a ton animal ?"],
    flow: [
      { title: "Quel animal veux-tu assurer ?", helper: "On commence par l’essentiel.", options: ["Chien", "Chat", "Plusieurs animaux"] },
      { title: "Quel âge a-t-il ?", helper: "L’âge influence les garanties utiles.", options: ["Moins de 2 ans", "2 à 7 ans", "Plus de 7 ans"] },
      { title: "Quel niveau de protection cherches-tu ?", helper: "On compare à besoin égal.", options: ["Accidents", "Accidents + maladies", "Couverture complète"] },
    ],
  },
  {
    slug: "assurance-emprunteur",
    title: "Assurance emprunteur",
    group: "Finances",
    description: "Réduis le coût caché de ton crédit immobilier.",
    saving: "bientôt",
    status: "coming-soon",
    headline: "Réduis le coût silencieux qui accompagne souvent ton crédit immobilier.",
    questions: ["Quel capital reste-t-il ?", "Quel taux paies-tu aujourd’hui ?"],
    flow: [
      { title: "Quel capital reste-t-il ?", helper: "Une estimation suffit pour ouvrir le comparatif.", options: ["Moins de 100 000€", "100 000 à 250 000€", "Plus de 250 000€"] },
      { title: "As-tu déjà changé d’assurance ?", helper: "Le potentiel dépend souvent de l’ancienneté.", options: ["Jamais", "Oui, il y a longtemps", "Oui, récemment"] },
    ],
  },
  {
    slug: "electricite",
    title: "Électricité",
    group: "Maison",
    description: "Compare les offres adaptées à ta consommation électrique.",
    saving: "jusqu’à 120€/an",
    status: "active",
    headline: "Compare ton électricité selon ton foyer réel, pas selon une moyenne abstraite.",
    questions: ["Quel est ton fournisseur actuel ?", "Combien consommes-tu environ ?"],
    flow: [
      { title: "Ton logement est plutôt…", helper: "On rapproche ton profil d’une consommation réaliste.", options: ["Petit appartement", "Appartement familial", "Maison"] },
      { title: "Quel est ton objectif ?", helper: "Prix, stabilité ou énergie verte : le meilleur choix change.", options: ["Payer moins", "Prix stable", "Offre verte"] },
    ],
  },
  {
    slug: "gaz",
    title: "Gaz",
    group: "Maison",
    description: "Optimise séparément ton contrat gaz si ton logement en dépend.",
    saving: "jusqu’à 90€/an",
    status: "active",
    headline: "Traite le gaz comme un contrat à part entière, pas comme une ligne floue.",
    questions: ["Utilises-tu le gaz pour le chauffage ?", "Combien paies-tu environ ?"],
    flow: [
      { title: "Pourquoi utilises-tu le gaz ?", helper: "On compare des foyers comparables.", options: ["Cuisine seulement", "Eau chaude", "Chauffage"] },
      { title: "Que veux-tu optimiser ?", helper: "Le meilleur contrat n’est pas toujours juste le moins cher.", options: ["Mensualité", "Stabilité", "Offre verte"] },
    ],
  },
  {
    slug: "box-internet",
    title: "Box internet",
    group: "Maison",
    description: "Trouve une offre plus juste pour ton foyer.",
    saving: "bientôt",
    status: "coming-soon",
    headline: "Trouve la bonne box pour ton foyer, pas juste l’offre la plus bruyante.",
    questions: ["Fibre ou ADSL ?", "As-tu besoin de TV ou seulement d’internet ?"],
    flow: [
      { title: "Quelle connexion veux-tu ?", helper: "On élimine les offres inutiles dès le départ.", options: ["Fibre", "ADSL", "Je ne sais pas"] },
      { title: "Tu veux surtout…", helper: "Le panier idéal dépend des services annexes.", options: ["Internet seul", "Internet + TV", "Internet + TV + mobile"] },
    ],
  },
  {
    slug: "forfait-mobile",
    title: "Forfait mobile",
    group: "Maison",
    description: "Évite de surpayer un usage devenu banal.",
    saving: "jusqu’à 130€/an",
    status: "active",
    headline: "Évite de surpayer une commodité devenue très concurrentielle.",
    questions: ["Combien de data utilises-tu ?", "As-tu besoin de Suisse incluse ?"],
    flow: [
      { title: "Combien de data te faut-il ?", helper: "C’est le cœur du bon forfait mobile.", options: ["Moins de 20 Go", "20 à 100 Go", "Plus de 100 Go"] },
      { title: "Tu as besoin de quoi ?", helper: "On évite de payer des options fantômes.", options: ["France uniquement", "Europe incluse", "Suisse incluse"] },
      { title: "Tu préfères…", helper: "On classe ensuite les offres au bon angle.", options: ["Le prix le plus bas", "Le meilleur réseau", "Le meilleur équilibre"] },
    ],
  },
  {
    slug: "abonnements",
    title: "Abonnements",
    group: "Maison",
    description: "Repère les services qui prélèvent encore sans vraie utilité.",
    saving: "selon ton usage",
    status: "active",
    headline: "Nettoie les petites fuites qui finissent par peser lourd sur l’année.",
    questions: ["Quels services paies-tu encore ?", "Les utilises-tu vraiment chaque mois ?"],
    flow: [
      { title: "Quel type d’abonnements pèse le plus ?", helper: "On cherche d’abord la fuite principale.", options: ["Streaming", "Apps / logiciels", "Sport / loisirs"] },
      { title: "Tu veux surtout…", helper: "Le bon plan dépend de ton intention.", options: ["Réduire", "Regrouper", "Mieux suivre"] },
    ],
  },
  {
    slug: "banque",
    title: "Banque",
    group: "Finances",
    description: "Compare frais, services et cartes réellement utiles.",
    saving: "bientôt",
    status: "coming-soon",
    headline: "Compare les frais bancaires contre les services que tu utilises vraiment.",
    questions: ["Quelle banque utilises-tu ?", "Quels services te sont indispensables ?"],
    flow: [
      { title: "Quel usage bancaire as-tu ?", helper: "On compare selon ton quotidien.", options: ["Basique", "Voyage", "Épargne / investissement"] },
      { title: "Tu veux surtout…", helper: "La hiérarchie des offres change selon ton objectif.", options: ["Moins de frais", "Meilleure carte", "Meilleure app"] },
    ],
  },
];

export const categoryGroups = ["Maison", "Assurances", "Frontaliers", "Finances"] as const;
