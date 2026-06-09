import type { BrevoConfig } from './brevo';
import { brevoUpsertContact, brevoDoubleOptIn, brevoSendTransactional } from './brevo';
import {
  validatePremierEchange,
  validateLettre,
  type PremierEchangeInput,
  type LettreInput,
} from './validation';
import { logger } from './logger';

export interface HandlerResult {
  status: number;
  redirect?: string;
  message?: string;
  error?: string;
}

const ERREUR_GENERIQUE =
  "Une erreur est survenue, votre demande n'a pas pu etre traitee. Reessayez dans un instant.";

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
      subject: 'Nouveau premier echange',
      htmlContent: `<p>Email : ${echappe(input.email)}</p><p>Prenom : ${echappe(input.prenom ?? '')}</p><p>Message : ${echappe(input.message ?? '')}</p>`,
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
  logger.info('lettre inscription', {});
  return { status: 200, message: 'Verifiez votre boite mail pour confirmer votre inscription.' };
}
