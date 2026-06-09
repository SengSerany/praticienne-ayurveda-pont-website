import { describe, it, expect, vi } from 'vitest';
import { brevoUpsertContact, brevoDoubleOptIn, brevoSendTransactional } from './brevo';

const config = {
  apiKey: 'k',
  listLettreId: 7,
  notifEmail: 'celine@x.fr',
  doiTemplateId: 3,
  doiRedirectUrl: 'https://x.fr/la-lettre',
};

function mockFetch(status: number) {
  return vi.fn(async () => new Response('{}', { status }));
}

describe('brevoUpsertContact', () => {
  it('poste vers /v3/contacts avec la cle api', async () => {
    const f = mockFetch(201);
    const r = await brevoUpsertContact(
      config,
      { email: 'a@b.fr', attributes: { PRENOM: 'Marie' } },
      f,
    );
    expect(r.ok).toBe(true);
    const [url, init] = f.mock.calls[0];
    expect(url).toBe('https://api.brevo.com/v3/contacts');
    expect((init as RequestInit).method).toBe('POST');
    expect((init!.headers as Record<string, string>)['api-key']).toBe('k');
  });
  it('renvoie ok meme si le contact existe deja (204/400 duplicate)', async () => {
    const r = await brevoUpsertContact(config, { email: 'a@b.fr' }, mockFetch(204));
    expect(r.ok).toBe(true);
  });
  it('signale une erreur sur 401', async () => {
    const r = await brevoUpsertContact(config, { email: 'a@b.fr' }, mockFetch(401));
    expect(r.ok).toBe(false);
  });
});

describe('brevoDoubleOptIn', () => {
  it('poste vers doubleOptinConfirmation avec liste et template', async () => {
    const f = mockFetch(204);
    const r = await brevoDoubleOptIn(config, { email: 'a@b.fr' }, f);
    expect(r.ok).toBe(true);
    const [url, init] = f.mock.calls[0];
    expect(url).toBe('https://api.brevo.com/v3/contacts/doubleOptinConfirmation');
    const body = JSON.parse((init as RequestInit).body as string);
    expect(body.includeListIds).toEqual([7]);
    expect(body.templateId).toBe(3);
  });
});

describe('brevoSendTransactional', () => {
  it('poste vers /v3/smtp/email vers notifEmail', async () => {
    const f = mockFetch(201);
    const r = await brevoSendTransactional(config, { subject: 'S', htmlContent: '<p>H</p>' }, f);
    expect(r.ok).toBe(true);
    const [url, init] = f.mock.calls[0];
    expect(url).toBe('https://api.brevo.com/v3/smtp/email');
    const body = JSON.parse((init as RequestInit).body as string);
    expect(body.to[0].email).toBe('celine@x.fr');
  });
});
