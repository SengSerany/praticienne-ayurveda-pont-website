export interface BrevoConfig {
  apiKey: string;
  listLettreId?: number;
  notifEmail?: string;
  doiTemplateId?: number;
  doiRedirectUrl?: string;
}

export interface BrevoResult {
  ok: boolean;
  status: number;
}

type FetchLike = typeof fetch;

const BASE = 'https://api.brevo.com/v3';

function headers(config: BrevoConfig): Record<string, string> {
  return {
    'api-key': config.apiKey,
    'content-type': 'application/json',
    accept: 'application/json',
  };
}

export async function brevoUpsertContact(
  config: BrevoConfig,
  contact: { email: string; attributes?: Record<string, string>; listIds?: number[] },
  fetchImpl: FetchLike = fetch,
): Promise<BrevoResult> {
  const res = await fetchImpl(`${BASE}/contacts`, {
    method: 'POST',
    headers: headers(config),
    body: JSON.stringify({
      email: contact.email,
      attributes: contact.attributes,
      listIds: contact.listIds,
      updateEnabled: true,
    }),
  });
  // 201 cree, 204 mis a jour, 400 = souvent « contact existe deja », tolere.
  const ok = res.status === 201 || res.status === 204 || res.status === 400;
  return { ok, status: res.status };
}

export async function brevoDoubleOptIn(
  config: BrevoConfig,
  contact: { email: string },
  fetchImpl: FetchLike = fetch,
): Promise<BrevoResult> {
  const res = await fetchImpl(`${BASE}/contacts/doubleOptinConfirmation`, {
    method: 'POST',
    headers: headers(config),
    body: JSON.stringify({
      email: contact.email,
      includeListIds: config.listLettreId ? [config.listLettreId] : [],
      templateId: config.doiTemplateId,
      redirectionUrl: config.doiRedirectUrl,
    }),
  });
  const ok = res.status >= 200 && res.status < 300;
  return { ok, status: res.status };
}

export async function brevoSendTransactional(
  config: BrevoConfig,
  email: { subject: string; htmlContent: string },
  fetchImpl: FetchLike = fetch,
): Promise<BrevoResult> {
  const res = await fetchImpl(`${BASE}/smtp/email`, {
    method: 'POST',
    headers: headers(config),
    body: JSON.stringify({
      sender: { name: 'Site Celine Lefevre', email: config.notifEmail },
      to: [{ email: config.notifEmail }],
      subject: email.subject,
      htmlContent: email.htmlContent,
    }),
  });
  const ok = res.status >= 200 && res.status < 300;
  return { ok, status: res.status };
}
