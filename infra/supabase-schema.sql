CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text,
  display_name text,
  country text DEFAULT 'FR',
  is_paying boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.financial_profiles (
  user_id uuid PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  is_cross_border_worker boolean DEFAULT false,
  works_in_country text,
  monthly_income numeric,
  income_currency text,
  monthly_fx_volume_chf numeric DEFAULT 0,
  health_insurance_system text,
  monthly_electricity_cost numeric DEFAULT 0,
  monthly_gas_cost numeric DEFAULT 0,
  monthly_mobile_cost numeric DEFAULT 0,
  monthly_auto_insurance_cost numeric DEFAULT 0,
  monthly_moto_insurance_cost numeric DEFAULT 0,
  monthly_bike_insurance_cost numeric DEFAULT 0,
  monthly_scooter_insurance_cost numeric DEFAULT 0,
  monthly_pet_insurance_cost numeric DEFAULT 0,
  monthly_home_insurance_cost numeric DEFAULT 0,
  monthly_mutuelle_cost numeric DEFAULT 0,
  monthly_subscriptions_cost numeric DEFAULT 0,
  primary_goal text,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  provider text,
  account_mask text,
  meta jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  account_id uuid REFERENCES public.accounts(id) ON DELETE SET NULL,
  amount numeric NOT NULL,
  currency text NOT NULL DEFAULT 'EUR',
  occurred_at date NOT NULL,
  merchant text,
  category text,
  description text,
  metadata jsonb,
  normalized boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_transactions_user_occurred_at ON public.transactions (user_id, occurred_at DESC);

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  merchant text NOT NULL,
  monthly_cost numeric NOT NULL,
  renews_at date,
  active boolean DEFAULT true,
  last_used_at date,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  provider text NOT NULL,
  title text NOT NULL,
  country_scope text DEFAULT 'FR',
  monthly_cost numeric,
  annual_savings_estimate numeric,
  affiliate_url text,
  cashback_amount numeric DEFAULT 0,
  sponsored boolean DEFAULT false,
  active boolean DEFAULT true,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.diagnostics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  total_estimated_savings numeric NOT NULL DEFAULT 0,
  monthly_leak numeric NOT NULL DEFAULT 0,
  optimization_score integer,
  input_snapshot jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  diagnostic_id uuid REFERENCES public.diagnostics(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  category text NOT NULL,
  recommended_offer_id uuid REFERENCES public.offers(id) ON DELETE SET NULL,
  estimated_annual_savings numeric NOT NULL DEFAULT 0,
  priority text,
  reason text,
  confidence_score numeric,
  status text DEFAULT 'open',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  body text,
  action_label text,
  action_url text,
  seen_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.affiliate_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  offer_id uuid REFERENCES public.offers(id) ON DELETE SET NULL,
  recommendation_id uuid REFERENCES public.recommendations(id) ON DELETE SET NULL,
  source_screen text,
  clicked_at timestamptz DEFAULT now(),
  meta jsonb
);

CREATE TABLE IF NOT EXISTS public.conversions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  offer_id uuid REFERENCES public.offers(id) ON DELETE SET NULL,
  click_id uuid REFERENCES public.affiliate_clicks(id) ON DELETE SET NULL,
  conversion_value numeric,
  commission_value numeric,
  cashback_value numeric,
  status text DEFAULT 'pending',
  converted_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  phone text NOT NULL,
  first_name text,
  consent_contact boolean NOT NULL DEFAULT false,
  category_slug text NOT NULL,
  answer_snapshot jsonb NOT NULL DEFAULT '[]'::jsonb,
  intent_score integer,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  source text NOT NULL DEFAULT 'comparator_wizard',
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_leads_category_created_at ON public.leads (category_slug, created_at DESC);

CREATE OR REPLACE VIEW public.user_export AS
SELECT
  u.*,
  fp.*,
  (SELECT jsonb_agg(t.*) FROM public.transactions t WHERE t.user_id = u.id) AS transactions,
  (SELECT jsonb_agg(s.*) FROM public.subscriptions s WHERE s.user_id = u.id) AS subscriptions,
  (SELECT jsonb_agg(d.*) FROM public.diagnostics d WHERE d.user_id = u.id) AS diagnostics
FROM public.users u
LEFT JOIN public.financial_profiles fp ON fp.user_id = u.id;


CREATE TABLE IF NOT EXISTS public.funnel_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name text NOT NULL,
  category_slug text,
  lead_id uuid REFERENCES public.leads(id) ON DELETE SET NULL,
  meta jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_funnel_events_category_created_at ON public.funnel_events (category_slug, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_funnel_events_event_created_at ON public.funnel_events (event_name, created_at DESC);

ALTER TABLE public.funnel_events ENABLE ROW LEVEL SECURITY;


-- API server permissions for Supabase secret/service role keys.
GRANT USAGE ON SCHEMA public TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.leads TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.funnel_events TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.affiliate_clicks TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.offers TO service_role;
