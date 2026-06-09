import { describe, it, expect, vi } from 'vitest';
import { handlePremierEchange, handleLettre } from './handlers';

const config = {
  apiKey: 'k',
  listLettreId: 7,
  notifEmail: 'c@x.fr',
  doiTemplateId: 3,
  doiRedirectUrl: 'https://x.fr',
};
const okFetch = () => vi.fn(async () => new Response('{}', { status: 201 }));

describe('handlePremierEchange', () => {
  it('rejette une entree invalide sans appeler brevo', async () => {
    const f = okFetch();
    const r = await handlePremierEchange({ email: 'x' }, config, f);
    expect(r.status).toBe(400);
    expect(f).not.toHaveBeenCalled();
  });
  it('cree le contact, notifie et renvoie une redirection 303', async () => {
    const f = okFetch();
    const r = await handlePremierEchange({ email: 'a@b.fr', message: 'bonjour' }, config, f);
    expect(r.status).toBe(303);
    expect(r.redirect).toBe('/confirmation');
    expect(f).toHaveBeenCalledTimes(2);
  });
  it('renvoie 500 si la cle api manque', async () => {
    const r = await handlePremierEchange({ email: 'a@b.fr' }, { apiKey: '' }, okFetch());
    expect(r.status).toBe(500);
  });
});

describe('handleLettre', () => {
  it('declenche le double opt-in et renvoie 200', async () => {
    const f = okFetch();
    const r = await handleLettre({ email: 'a@b.fr' }, config, f);
    expect(r.status).toBe(200);
    expect(f).toHaveBeenCalledOnce();
  });
  it('rejette le honeypot en 400', async () => {
    const r = await handleLettre({ email: 'a@b.fr', honeypot: 'x' }, config, okFetch());
    expect(r.status).toBe(400);
  });
});
