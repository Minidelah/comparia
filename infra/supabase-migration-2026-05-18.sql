ALTER TABLE public.financial_profiles
  ADD COLUMN IF NOT EXISTS monthly_pet_insurance_cost numeric DEFAULT 0;

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

ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS first_name text,
  ADD COLUMN IF NOT EXISTS consent_contact boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS intent_score integer,
  ADD COLUMN IF NOT EXISTS metadata jsonb NOT NULL DEFAULT '{}'::jsonb;

CREATE INDEX IF NOT EXISTS idx_leads_category_created_at ON public.leads (category_slug, created_at DESC);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;


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
