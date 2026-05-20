# Comparia

Comparia est une plateforme de comparateurs intelligents pour les Français et les frontaliers Suisse-France.

L’application aide l’utilisateur à :
- détecter ses pertes invisibles ;
- comparer ses dépenses contraintes ;
- prioriser les économies les plus utiles ;
- suivre ensuite les prochaines opportunités.

## Produit actuel

Le MVP contient déjà :
- une landing page orientée conversion ;
- un onboarding diagnostic en plusieurs étapes ;
- un moteur d’estimation explicable ;
- un hub comparateurs ;
- un tableau de bord vivant avec alertes et prochaine meilleure action.

## Catégories couvertes

Actives dans le diagnostic :
- change CHF/EUR ;
- assurance santé frontalier ;
- énergie ;
- forfait mobile ;
- assurance auto ;
- assurance moto ;
- assurance habitation ;
- mutuelle santé ;
- abonnements.

Présentes dans le hub produit :
- assurance animaux ;
- assurance emprunteur ;
- banque ;
- box internet.

## Stack

- Next.js 16
- React 19
- Tailwind CSS v4
- Framer Motion
- Supabase
- Mistral AI
- Stripe

## Routes

- `/` landing page
- `/onboarding` diagnostic personnalisé
- `/comparateurs` hub des catégories
- `/tableau-de-bord` expérience post-diagnostic
- `/admin?token=TON_TOKEN` pilotage leads, funnel, clics et import Awin

## Lancer le projet

```bash
npm install
npm run dev
```

## Configurer Supabase

Copier `.env.example` vers `.env.local`, puis renseigner :

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_DASHBOARD_TOKEN=
AWIN_PUBLISHER_ID=
AWIN_API_TOKEN=
```

Variables publiques recommandées pour la production :

```bash
NEXT_PUBLIC_SITE_URL=https://ton-domaine.fr
NEXT_PUBLIC_CONTACT_EMAIL=contact@ton-domaine.fr
NEXT_PUBLIC_PRIVACY_EMAIL=privacy@ton-domaine.fr
NEXT_PUBLIC_LEGAL_EDITOR_NAME=
NEXT_PUBLIC_LEGAL_EDITOR_STATUS=
NEXT_PUBLIC_LEGAL_COMPANY_ID=
NEXT_PUBLIC_LEGAL_ADDRESS=
NEXT_PUBLIC_LEGAL_PUBLICATION_DIRECTOR=
```

Ensuite, appliquer les fichiers SQL présents dans `infra/` sur ton projet Supabase.

Quand Supabase est configuré, le diagnostic est sauvegardé via `POST /api/diagnostics`.  
Sans configuration, l’expérience reste fonctionnelle et affiche simplement un mode local.

## Importer les offres Awin

1. Dans Awin, récupérer l’identifiant éditeur et un token dans **Identifiants API**.
2. Les ajouter dans `.env.local` :

```bash
AWIN_PUBLISHER_ID=2899275
AWIN_API_TOKEN=...
```

3. Redémarrer le serveur :

```bash
CTRL+C
npm run dev
```

4. Ouvrir `/admin?token=TON_TOKEN_ADMIN`, puis cliquer sur **Importer Awin**.

L’import classe les programmes Awin acceptés par comparateur, génère des liens trackés quand Awin le permet, puis alimente la table Supabase `offers`.

## Déployer sur Vercel

1. Créer un projet Vercel depuis le dépôt Git.
2. Framework preset : **Next.js**.
3. Build command : `npm run build`.
4. Ajouter toutes les variables d’environnement ci-dessus dans **Project Settings → Environment Variables**.
5. Déployer.
6. Copier l’URL publique dans Awin comme site éditeur.
7. Mettre à jour `NEXT_PUBLIC_SITE_URL` avec le domaine final.

À vérifier après déploiement :
- `/` affiche la landing Comparia ;
- `/comparateurs` affiche les catégories ;
- `/mentions-legales`, `/politique-confidentialite`, `/transparence-affiliation`, `/contact` sont accessibles ;
- `/sitemap.xml` et `/robots.txt` répondent ;
- `/admin?token=TON_TOKEN_ADMIN` ouvre le dashboard.

## Prochaines étapes

1. connecter Supabase ;
2. persister profils, diagnostics, recommandations et alertes ;
3. créer les pages dédiées de comparateurs ;
4. brancher les offres partenaires et le tracking d’affiliation ;
5. ajouter Mistral pour expliquer les recommandations, pas pour inventer les chiffres.
