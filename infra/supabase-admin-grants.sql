-- CompareTesFactures admin/API grants
-- À exécuter dans Supabase SQL Editor si l'admin affiche :
-- "permission denied for table conversions" ou une erreur similaire.
-- Ce script ne désactive pas le RLS : il donne seulement les droits nécessaires
-- au rôle serveur Supabase utilisé par les routes API Next.js.

GRANT USAGE ON SCHEMA public TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE
  public.users,
  public.financial_profiles,
  public.accounts,
  public.transactions,
  public.subscriptions,
  public.offers,
  public.diagnostics,
  public.recommendations,
  public.alerts,
  public.affiliate_clicks,
  public.conversions,
  public.leads,
  public.funnel_events
TO service_role;

GRANT SELECT ON public.user_export TO service_role;

-- Optionnel mais utile si Supabase utilise aussi le rôle postgres côté SQL Editor.
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.conversions TO postgres;
