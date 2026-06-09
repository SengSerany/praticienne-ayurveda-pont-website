/// <reference types="astro/client" />

interface Env {
  BREVO_API_KEY?: string;
  BREVO_LIST_LETTRE_ID?: string;
  BREVO_NOTIF_EMAIL?: string;
  BREVO_DOI_TEMPLATE_ID?: string;
  BREVO_DOI_REDIRECT_URL?: string;
}

declare module 'cloudflare:workers' {
  export const env: Env;
}
