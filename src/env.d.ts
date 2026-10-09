/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE_EN_ATTENTE: boolean;
}

interface Env {
  BREVO_API_KEY?: string;
  BREVO_LIST_LETTRE_ID?: string;
  BREVO_NOTIF_EMAIL?: string;
  BREVO_DOI_TEMPLATE_ID?: string;
  BREVO_DOI_REDIRECT_URL?: string;
  BREVO_LIST_GUIDES_ID?: string;
  BREVO_GUIDE_TEMPLATE_ID?: string;
}

declare module 'cloudflare:workers' {
  export const env: Env;
}
