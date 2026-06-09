/// <reference types="astro/client" />

type CloudflareRuntime = import('@astrojs/cloudflare').Runtime<Env>;

interface Env {
  BREVO_API_KEY?: string;
  BREVO_LIST_LETTRE_ID?: string;
  BREVO_NOTIF_EMAIL?: string;
  BREVO_DOI_TEMPLATE_ID?: string;
  BREVO_DOI_REDIRECT_URL?: string;
}

declare namespace App {
  interface Locals extends CloudflareRuntime {}
}
