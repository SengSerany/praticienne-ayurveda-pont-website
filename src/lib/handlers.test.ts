import { describe, it, expect, vi } from 'vitest';
import { handlePremierEchange, handleLettre } from './handlers';

const config = {
  apiKey: 'k',
  listLettreId: 7,
  notifEmail: 'c@x.fr',
  doiTemplateId: 3,
  doiRedirectUrl: 'https://x.fr',
};
const okFetch = () =>
  vi.fn(
    async (_url: RequestInfo | URL, _init?: RequestInit) => new Response('{}', { status: 201 }),
  );

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
  it('fait repondre la notification directement a la visiteuse', async () => {
    const f = okFetch();
    await handlePremierEchange({ email: 'a@b.fr', prenom: 'Marie' }, config, f);
    const notif = f.mock.calls.find(([url]) => String(url).endsWith('/smtp/email'));
    const body = JSON.parse((notif![1] as RequestInit).body as string);
    expect(body.replyTo).toEqual({ email: 'a@b.fr', name: 'Marie' });
  });
  it('renvoie 500 si la cle api manque', async () => {
    const r = await handlePremierEchange({ email: 'a@b.fr' }, { apiKey: '' }, okFetch());
    expect(r.status).toBe(500);
  });
});

describe('handleLettre', () => {
  it('declenche le double opt-in, notifie Celine et redirige vers la page merci', async () => {
    const f = okFetch();
    const r = await handleLettre({ email: 'a@b.fr' }, config, f);
    expect(r.status).toBe(303);
    expect(r.redirect).toBe('/la-lettre/merci');
    expect(f).toHaveBeenCalledTimes(2);
    const [premier, second] = f.mock.calls.map(([url]) => String(url));
    expect(premier).toMatch(/doubleOptinConfirmation$/);
    expect(second).toMatch(/smtp\/email$/);
  });
  it('reste un succes si seule la notification echoue', async () => {
    const f = vi.fn(async (url: RequestInfo | URL) =>
      String(url).endsWith('/smtp/email')
        ? new Response('{}', { status: 500 })
        : new Response('{}', { status: 201 }),
    );
    const r = await handleLettre({ email: 'a@b.fr' }, config, f);
    expect(r.status).toBe(303);
  });
  it('ne notifie pas si le double opt-in echoue', async () => {
    const f = vi.fn(async () => new Response('{}', { status: 500 }));
    const r = await handleLettre({ email: 'a@b.fr' }, config, f);
    expect(r.status).toBe(502);
    expect(f).toHaveBeenCalledOnce();
  });
  it('rejette le honeypot en 400', async () => {
    const r = await handleLettre({ email: 'a@b.fr', honeypot: 'x' }, config, okFetch());
    expect(r.status).toBe(400);
  });
});
