/**
 * Configuration des variables d'environnement sécurisée
 * Validation et typage fort pour toutes les variables
 */

type Environment = "development" | "production" | "test";

interface EnvironmentConfig {
  nodeEnv: Environment;
  isDev: boolean;
  isProd: boolean;
  isTest: boolean;
  
  // Supabase
  supabaseUrl: string;
  supabaseAnonKey: string;
  supabaseServiceRoleKey: string;
  
  // Mistral AI
  mistralApiKey: string;
  mistralModel: string;
  hasMistralKey: boolean;
  
  // Awin Affiliate
  awinPublisherId: string;
  awinApiToken: string;
  hasAwinConfig: boolean;
  
  // Admin
  adminDashboardToken: string;
  cronSecret: string;
  
  // Site
  siteUrl: string;
  googleSiteVerification: string;
  contactEmail: string;
  privacyEmail: string;
  
  // Legal
  legalEditorName: string;
  legalEditorStatus: string;
  legalCompanyId: string;
  legalAddress: string;
  legalPublicationDirector: string;
}

class EnvConfig implements EnvironmentConfig {
  readonly nodeEnv: Environment = (process.env.NODE_ENV || "development") as Environment;
  readonly isDev = this.nodeEnv === "development";
  readonly isProd = this.nodeEnv === "production";
  readonly isTest = this.nodeEnv === "test";

  // Supabase (requis en production)
  readonly supabaseUrl = this.requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  readonly supabaseAnonKey = this.requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  readonly supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  // Mistral (optionnel, fallback rules)
  readonly mistralApiKey = process.env.MISTRAL_API_KEY || "";
  readonly mistralModel = process.env.MISTRAL_MODEL || "mistral-small-latest";
  readonly hasMistralKey = Boolean(this.mistralApiKey);

  // Awin (optionnel)
  readonly awinPublisherId = process.env.AWIN_PUBLISHER_ID || "";
  readonly awinApiToken = process.env.AWIN_API_TOKEN || "";
  readonly hasAwinConfig = Boolean(this.awinPublisherId && this.awinApiToken);

  // Admin
  readonly adminDashboardToken = this.requireEnv("ADMIN_DASHBOARD_TOKEN");
  readonly cronSecret = this.requireEnv("CRON_SECRET");

  // Site
  readonly siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.comparetesfactures.fr";
  readonly googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "";
  readonly contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@comparetesfactures.fr";
  readonly privacyEmail = process.env.NEXT_PUBLIC_PRIVACY_EMAIL || "privacy@comparetesfactures.fr";

  // Legal
  readonly legalEditorName = process.env.NEXT_PUBLIC_LEGAL_EDITOR_NAME || "";
  readonly legalEditorStatus = process.env.NEXT_PUBLIC_LEGAL_EDITOR_STATUS || "";
  readonly legalCompanyId = process.env.NEXT_PUBLIC_LEGAL_COMPANY_ID || "";
  readonly legalAddress = process.env.NEXT_PUBLIC_LEGAL_ADDRESS || "";
  readonly legalPublicationDirector = process.env.NEXT_PUBLIC_LEGAL_PUBLICATION_DIRECTOR || "";

  constructor() {
    this.validateEnv();
  }

  private requireEnv(key: string): string {
    const value = process.env[key];
    if (!value) {
      if (this.isProd) {
        throw new Error(`Required environment variable missing: ${key}`);
      }
      return "";
    }
    return value;
  }

  private validateEnv(): void {
    // Validation des variables critiques en production
    if (this.isProd) {
      const required = [
        "NEXT_PUBLIC_SUPABASE_URL",
        "NEXT_PUBLIC_SUPABASE_ANON_KEY",
        "SUPABASE_SERVICE_ROLE_KEY",
        "ADMIN_DASHBOARD_TOKEN",
        "CRON_SECRET",
      ];

      const missing = required.filter((key) => !process.env[key]);
      if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
      }
    }

    // Avertissement si Mistral n'est pas configuré
    if (!this.hasMistralKey && !this.isTest) {
      console.warn("⚠️  MISTRAL_API_KEY not configured. Using fallback analysis engine.");
    }

    // Avertissement si Awin n'est pas configuré
    if (!this.hasAwinConfig && !this.isTest) {
      console.warn("⚠️  AWIN configuration incomplete. Affiliate features limited.");
    }
  }

  /**
   * Obtenir un objet pour les logs (sans données sensibles)
   */
  getPublicConfig(): Omit<EnvironmentConfig, "mistralApiKey" | "supabaseServiceRoleKey" | "awinApiToken" | "cronSecret"> {
    return {
      nodeEnv: this.nodeEnv,
      isDev: this.isDev,
      isProd: this.isProd,
      isTest: this.isTest,
      supabaseUrl: this.supabaseUrl,
      supabaseAnonKey: this.supabaseAnonKey,
      mistralModel: this.mistralModel,
      hasMistralKey: this.hasMistralKey,
      awinPublisherId: this.awinPublisherId,
      hasAwinConfig: this.hasAwinConfig,
      adminDashboardToken: "***",
      siteUrl: this.siteUrl,
      googleSiteVerification: this.googleSiteVerification,
      contactEmail: this.contactEmail,
      privacyEmail: this.privacyEmail,
      legalEditorName: this.legalEditorName,
      legalEditorStatus: this.legalEditorStatus,
      legalCompanyId: this.legalCompanyId,
      legalAddress: this.legalAddress,
      legalPublicationDirector: this.legalPublicationDirector,
    };
  }
}

// Instance unique et immuable
export const config = new EnvConfig();
