# Publication automatique Pinterest

Le projet contient maintenant un cron Vercel quotidien :

```text
/api/cron/organic-publish
```

Par défaut, il est en mode simulation pour éviter de poster sans compte connecté.

## Variables Vercel à ajouter

```text
ORGANIC_PUBLISH_DRY_RUN=false
PINTEREST_ACCESS_TOKEN=...
PINTEREST_BOARD_ID=...
CRON_SECRET=...
```

## Test manuel

```bash
curl -H "Authorization: Bearer $CRON_SECRET" \
  https://www.comparetesfactures.fr/api/cron/organic-publish
```

## Ce que le cron publie

Le fichier `lib/marketing/organic-queue.ts` choisit automatiquement un visuel par jour et crée un Pin avec :

- titre
- description
- lien vers le guide Comparia
- image publique dans `/public/organic`

## Important

Pinterest demande un compte business, un token d’accès et un board ID. Sans ces éléments, aucun outil ne peut publier légalement à ta place.
