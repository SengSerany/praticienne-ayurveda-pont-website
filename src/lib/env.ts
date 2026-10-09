import type { BrevoConfig } from './brevo';

export function brevoConfigDepuisEnv(env: Env): BrevoConfig {
  return {
    apiKey: env.BREVO_API_KEY ?? '',
    listLettreId: env.BREVO_LIST_LETTRE_ID ? Number(env.BREVO_LIST_LETTRE_ID) : undefined,
    notifEmail: env.BREVO_NOTIF_EMAIL,
    doiTemplateId: env.BREVO_DOI_TEMPLATE_ID ? Number(env.BREVO_DOI_TEMPLATE_ID) : undefined,
    doiRedirectUrl: env.BREVO_DOI_REDIRECT_URL,
    listGuidesId: env.BREVO_LIST_GUIDES_ID ? Number(env.BREVO_LIST_GUIDES_ID) : undefined,
    guideTemplateId: env.BREVO_GUIDE_TEMPLATE_ID ? Number(env.BREVO_GUIDE_TEMPLATE_ID) : undefined,
  };
}
