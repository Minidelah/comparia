# Architecture CompareTesFactures

## Vision produit

CompareTesFactures n’est pas un simple comparateur. C’est un système d’optimisation financière continue :

`diagnostiquer → prioriser → activer → surveiller`

Le wedge initial reste fort chez les frontaliers Suisse-France, puis s’étend aux dépenses contraintes des Français.

## Parcours principal

1. Landing orientée diagnostic
2. Onboarding profil + dépenses
3. Calcul des économies potentielles
4. Révélation avec score, fuite mensuelle et prochaine meilleure action
5. Recommandations par catégorie
6. Tableau de bord vivant avec alertes et échéances

## Domaines produits

### Actifs maintenant
- Change CHF/EUR
- Assurance santé frontalier
- Énergie
- Forfait mobile
- Assurance auto
- Assurance moto
- Assurance habitation
- Mutuelle santé
- Abonnements

### À ouvrir ensuite
- Assurance animaux
- Assurance emprunteur
- Banque
- Box internet
- Crédit conso / rachat

## Stack

- Frontend : Next.js 16, React 19, Tailwind CSS v4, Framer Motion
- Backend : Supabase Postgres + Auth + Storage
- IA : Mistral AI côté serveur
- Paiement : Stripe
- Déploiement : Vercel

## Principe IA

Les chiffres doivent venir de règles traçables et d’offres structurées.  
Mistral sert à :
- expliquer ;
- reformuler ;
- personnaliser ;
- résumer.

Mistral ne doit pas être la source unique d’un calcul financier.

## Modèle logique

- `users` : identité applicative
- `financial_profiles` : réponses d’onboarding et habitudes
- `offers` : catalogue commercial
- `diagnostics` : snapshots d’analyse
- `recommendations` : optimisations produites
- `subscriptions` : dépenses récurrentes
- `alerts` : signaux de rétention
- `affiliate_clicks` / `conversions` : monétisation

## Roadmap technique

### Phase 1 — déjà visible
- expérience front complète
- diagnostic local
- comparateurs
- dashboard statique

### Phase 2 — prochaine
- persistance Supabase
- authentification
- tracking d’affiliation
- catalogue d’offres administrable

### Phase 3
- import CSV / open banking
- alertes dynamiques
- assistant Mistral
- pages SEO par comparateur

## Garde-fous

- RLS partout sur les données utilisateur
- minimisation des données sensibles
- suppression/export RGPD
- séparation nette entre recommandation objective, sponsorisation et cashback
