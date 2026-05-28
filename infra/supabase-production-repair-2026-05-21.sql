-- CompareTesFactures production repair — 2026-05-21
-- À coller dans Supabase SQL Editor, pas le nom du fichier.
-- Objectif : compléter les colonnes diagnostic et donner aux routes API serveur les droits nécessaires.

ALTER TABLE IF EXISTS public.financial_profiles
  ADD COLUMN IF NOT EXISTS monthly_energy_cost numeric DEFAULT 0,
  ADD COLUMN IF NOT EXISTS monthly_electricity_cost numeric DEFAULT 0,
  ADD COLUMN IF NOT EXISTS monthly_gas_cost numeric DEFAULT 0,
  ADD COLUMN IF NOT EXISTS monthly_bike_insurance_cost numeric DEFAULT 0,
  ADD COLUMN IF NOT EXISTS monthly_scooter_insurance_cost numeric DEFAULT 0,
  ADD COLUMN IF NOT EXISTS monthly_pet_insurance_cost numeric DEFAULT 0;

CREATE TABLE IF NOT EXISTS public.expense_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  diagnostic_id uuid REFERENCES public.diagnostics(id) ON DELETE SET NULL,
  annual_analyzed_spend numeric NOT NULL DEFAULT 0,
  monthly_leak numeric NOT NULL DEFAULT 0,
  total_estimated_savings numeric NOT NULL DEFAULT 0,
  source text DEFAULT 'comparetesfactures',
  input_snapshot jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.ai_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  diagnostic_id uuid REFERENCES public.diagnostics(id) ON DELETE SET NULL,
  provider text NOT NULL DEFAULT 'rules',
  summary text,
  estimated_savings numeric NOT NULL DEFAULT 0,
  action_priorities jsonb NOT NULL DEFAULT '[]'::jsonb,
  explanation text,
  offer_slugs jsonb NOT NULL DEFAULT '[]'::jsonb,
  recommendations jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.cashback_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  lead_id uuid REFERENCES public.leads(id) ON DELETE SET NULL,
  offer_id uuid REFERENCES public.offers(id) ON DELETE SET NULL,
  affiliate_click_id uuid REFERENCES public.affiliate_clicks(id) ON DELETE SET NULL,
  event_name text NOT NULL,
  amount numeric NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'EUR',
  status text NOT NULL DEFAULT 'pending',
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_expense_analyses_user_created_at ON public.expense_analyses (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_recommendations_user_created_at ON public.ai_recommendations (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cashback_events_user_created_at ON public.cashback_events (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cashback_events_status ON public.cashback_events (status);

ALTER TABLE IF EXISTS public.expense_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.ai_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.cashback_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "expense_analyses_owner_select" ON public.expense_analyses;
DROP POLICY IF EXISTS "ai_recommendations_owner_select" ON public.ai_recommendations;
DROP POLICY IF EXISTS "cashback_events_owner_select" ON public.cashback_events;

CREATE POLICY "expense_analyses_owner_select" ON public.expense_analyses
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "ai_recommendations_owner_select" ON public.ai_recommendations
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "cashback_events_owner_select" ON public.cashback_events
  FOR SELECT
  USING (auth.uid() = user_id);

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
  public.funnel_events,
  public.expense_analyses,
  public.ai_recommendations,
  public.cashback_events
TO service_role;
GRANT SELECT ON public.user_export TO service_role;
