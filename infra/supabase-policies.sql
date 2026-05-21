-- Comparia RLS policies
-- Ce fichier est volontairement rejouable : on supprime les policies avant de les recréer.
-- Les clés secrètes/service_role bypassent déjà le RLS côté Supabase, donc inutile de les tester dans chaque policy.

ALTER TABLE IF EXISTS public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.financial_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.diagnostics ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.affiliate_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.funnel_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users_select_own" ON public.users;
DROP POLICY IF EXISTS "profiles_owner_select" ON public.financial_profiles;
DROP POLICY IF EXISTS "profiles_owner_insert" ON public.financial_profiles;
DROP POLICY IF EXISTS "profiles_owner_update" ON public.financial_profiles;
DROP POLICY IF EXISTS "profiles_owner_delete" ON public.financial_profiles;
DROP POLICY IF EXISTS "accounts_owner_all" ON public.accounts;
DROP POLICY IF EXISTS "transactions_owner_all" ON public.transactions;
DROP POLICY IF EXISTS "subscriptions_owner_all" ON public.subscriptions;
DROP POLICY IF EXISTS "diagnostics_owner_select" ON public.diagnostics;
DROP POLICY IF EXISTS "recommendations_owner_select" ON public.recommendations;
DROP POLICY IF EXISTS "alerts_owner_select" ON public.alerts;
DROP POLICY IF EXISTS "alerts_owner_update" ON public.alerts;
DROP POLICY IF EXISTS "affiliate_clicks_owner_insert" ON public.affiliate_clicks;
DROP POLICY IF EXISTS "affiliate_clicks_owner_select" ON public.affiliate_clicks;
DROP POLICY IF EXISTS "conversions_owner_select" ON public.conversions;

-- Profil utilisateur
CREATE POLICY "users_select_own" ON public.users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "profiles_owner_select" ON public.financial_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "profiles_owner_insert" ON public.financial_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "profiles_owner_update" ON public.financial_profiles
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "profiles_owner_delete" ON public.financial_profiles
  FOR DELETE
  USING (auth.uid() = user_id);

-- Données financières personnelles
CREATE POLICY "accounts_owner_all" ON public.accounts
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "transactions_owner_all" ON public.transactions
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "subscriptions_owner_all" ON public.subscriptions
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Données générées par Comparia : l'utilisateur les lit, le backend les écrit.
CREATE POLICY "diagnostics_owner_select" ON public.diagnostics
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "recommendations_owner_select" ON public.recommendations
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "alerts_owner_select" ON public.alerts
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "alerts_owner_update" ON public.alerts
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Monétisation : l'utilisateur peut produire un clic et consulter ses propres événements.
CREATE POLICY "affiliate_clicks_owner_insert" ON public.affiliate_clicks
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "affiliate_clicks_owner_select" ON public.affiliate_clicks
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "conversions_owner_select" ON public.conversions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Accès serveur : nécessaire pour les routes API Next.js qui utilisent la clé secrète Supabase.
-- RLS reste actif pour les utilisateurs ; service_role est uniquement utilisé côté serveur.
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
