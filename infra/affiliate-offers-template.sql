-- CompareTesFactures affiliate offers template
-- Remplace les affiliate_url par TES liens affiliés avant de lancer ce fichier.
-- Important : la colonne category doit correspondre au slug du comparateur.

INSERT INTO public.offers (
  category,
  provider,
  title,
  annual_savings_estimate,
  affiliate_url,
  cashback_amount,
  sponsored,
  active,
  metadata
)
VALUES
  (
    'assurance-auto',
    'Partenaire Auto 1',
    'Devis assurance auto personnalisé',
    396,
    'https://TON-LIEN-AFFILIE-AUTO.example',
    0,
    false,
    true,
    '{"badge":"Meilleur choix","description":"À utiliser pour ton meilleur partenaire assurance auto."}'::jsonb
  ),
  (
    'forfait-mobile',
    'Partenaire Mobile 1',
    'Forfait mobile adapté à ton usage',
    130,
    'https://TON-LIEN-AFFILIE-MOBILE.example',
    0,
    false,
    true,
    '{"badge":"Meilleur prix","description":"À utiliser pour ton partenaire mobile le plus compétitif."}'::jsonb
  ),
  (
    'electricite',
    'Partenaire Électricité 1',
    'Offre électricité adaptée au foyer',
    120,
    'https://TON-LIEN-AFFILIE-ELECTRICITE.example',
    0,
    false,
    true,
    '{"badge":"Meilleur choix","description":"À utiliser pour ton meilleur partenaire électricité."}'::jsonb
  ),
  (
    'gaz',
    'Partenaire Gaz 1',
    'Offre gaz adaptée au logement',
    90,
    'https://TON-LIEN-AFFILIE-GAZ.example',
    0,
    false,
    true,
    '{"badge":"Meilleur choix","description":"À utiliser pour ton meilleur partenaire gaz."}'::jsonb
  ),
  (
    'assurance-animaux',
    'Partenaire Animaux 1',
    'Assurance chien et chat',
    180,
    'https://TON-LIEN-AFFILIE-ANIMAUX.example',
    0,
    false,
    true,
    '{"badge":"Meilleur choix","description":"À utiliser pour ton partenaire assurance animaux."}'::jsonb
  );
