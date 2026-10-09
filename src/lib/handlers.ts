import type { BrevoConfig } from './brevo';
import {
  brevoUpsertContact,
  brevoDoubleOptIn,
  brevoSendTemplate,
  brevoSendTransactional,
} from './brevo';
import {
  validatePremierEchange,
  validateLettre,
  validateGuide,
  type PremierEchangeInput,
  type LettreInput,
  type GuideInput,
} from './validation';
import { logger } from './logger';

export interface HandlerResult {
  status: number;
  redirect?: string;
  error?: string;
}

const ERREUR_GENERIQUE =
  "Une erreur est survenue, votre demande n'a pas pu être traitée. Réessayez dans un instant.";

function echappe(valeur: string): string {
  return valeur.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function handlePremierEchange(
  input: PremierEchangeInput,
  config: BrevoConfig,
  fetchImpl: typeof fetch = fetch,
): Promise<HandlerResult> {
  const validation = validatePremierEchange(input);
  if (!validation.ok) {
    return { status: 400, error: 'Merci de renseigner une adresse email valide.' };
  }
  if (!config.apiKey) {
    logger.warn('premier-echange non configure', { raison: 'BREVO_API_KEY manquante' });
    return { status: 500, error: ERREUR_GENERIQUE };
  }
  const contact = await brevoUpsertContact(
    config,
    {
      email: input.email,
      attributes: input.prenom ? { PRENOM: input.prenom } : undefined,
    },
    fetchImpl,
  );
  const notif = await brevoSendTransactional(
    config,
    {
      subject: 'Nouveau premier échange',
      htmlContent: `<p>Email : ${echappe(input.email)}</p><p>Prénom : ${echappe(input.prenom ?? '')}</p><p>Message : ${echappe(input.message ?? '')}</p>`,
      replyTo: { email: input.email, name: input.prenom || undefined },
    },
    fetchImpl,
  );
  if (!contact.ok || !notif.ok) {
    logger.error('premier-echange brevo echec', { contact: contact.status, notif: notif.status });
    return { status: 502, error: ERREUR_GENERIQUE };
  }
  logger.info('premier-echange envoye', {});
  return { status: 303, redirect: '/confirmation' };
}

export async function handleLettre(
  input: LettreInput,
  config: BrevoConfig,
  fetchImpl: typeof fetch = fetch,
): Promise<HandlerResult> {
  const validation = validateLettre(input);
  if (!validation.ok) {
    return { status: 400, error: 'Merci de renseigner une adresse email valide.' };
  }
  if (!config.apiKey) {
    logger.warn('lettre non configuree', { raison: 'BREVO_API_KEY manquante' });
    return { status: 500, error: ERREUR_GENERIQUE };
  }
  const doi = await brevoDoubleOptIn(config, { email: input.email }, fetchImpl);
  if (!doi.ok) {
    logger.error('lettre doi echec', { status: doi.status });
    return { status: 502, error: ERREUR_GENERIQUE };
  }
  // L'inscription est deja partie : un echec de la notification a Celine ne
  // doit pas la faire echouer aux yeux de la visiteuse.
  const notif = await brevoSendTransactional(
    config,
    {
      subject: 'Nouvelle inscription à la lettre',
      htmlContent: `<p>Email : ${echappe(input.email)}</p><p>L'inscription sera effective quand cette personne aura cliqué le lien de confirmation reçu par email.</p>`,
    },
    fetchImpl,
  );
  if (!notif.ok) {
    logger.error('lettre notification echec', { status: notif.status });
  }
  logger.info('lettre inscription', {});
  return { status: 303, redirect: '/la-lettre/merci' };
}

export interface GuideDemande {
  slug: string;
  titre: string;
  lien: string;
}

export async function handleGuide(
  input: GuideInput,
  guide: GuideDemande,
  config: BrevoConfig,
  fetchImpl: typeof fetch = fetch,
): Promise<HandlerResult> {
  const validation = validateGuide(input);
  if (!validation.ok) {
    return { status: 400, error: 'Merci de renseigner une adresse email valide.' };
  }
  if (!config.apiKey || !config.guideTemplateId) {
    logger.warn('guide non configure', {
      raison: 'BREVO_API_KEY ou BREVO_GUIDE_TEMPLATE_ID manquante',
    });
    return { status: 500, error: ERREUR_GENERIQUE };
  }
  const prenom = input.prenom || undefined;
  // Le guide part meme si l'ajout a la liste echoue : c'est ce que la visiteuse attend.
  const contact = await brevoUpsertContact(
    config,
    {
      email: input.email,
      attributes: prenom ? { PRENOM: prenom } : undefined,
      listIds: config.listGuidesId ? [config.listGuidesId] : undefined,
    },
    fetchImpl,
  );
  if (!contact.ok) {
    logger.error('guide contact echec', { status: contact.status, guide: guide.slug });
  }
  const envoi = await brevoSendTemplate(
    config,
    {
      templateId: config.guideTemplateId,
      destinataire: { email: input.email, name: prenom },
      params: { titre: guide.titre, lien: guide.lien },
    },
    fetchImpl,
  );
  if (!envoi.ok) {
    logger.error('guide envoi echec', { status: envoi.status, guide: guide.slug });
    return { status: 502, error: ERREUR_GENERIQUE };
  }
  const notif = await brevoSendTransactional(
    config,
    {
      subject: 'Nouvelle demande du guide',
      htmlContent: `<p>Guide : ${echappe(guide.titre)}</p><p>Email : ${echappe(input.email)}</p><p>Prénom : ${echappe(input.prenom ?? '')}</p>`,
      replyTo: { email: input.email, name: prenom },
    },
    fetchImpl,
  );
  if (!notif.ok) {
    logger.error('guide notification echec', { status: notif.status, guide: guide.slug });
  }
  logger.info('guide envoye', { guide: guide.slug });
  return { status: 303, redirect: `/guides/${guide.slug}/merci` };
}
