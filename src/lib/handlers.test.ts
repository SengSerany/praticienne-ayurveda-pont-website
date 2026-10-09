import { describe, it, expect, vi } from 'vitest';
import { handlePremierEchange, handleLettre, handleGuide } from './handlers';

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

describe('handleGuide', () => {
  const guide = { slug: 'exemple', titre: 'Exemple', lien: 'https://x.fr/guides/exemple.pdf' };
  const configGuide = { ...config, listGuidesId: 9, guideTemplateId: 4 };
  const urls = (f: ReturnType<typeof okFetch>) => f.mock.calls.map(([url]) => String(url));
  const corps = (f: ReturnType<typeof okFetch>, i: number) =>
    JSON.parse((f.mock.calls[i][1] as RequestInit).body as string);

  it('ajoute le contact a la liste, envoie le guide, notifie Celine et redirige', async () => {
    const f = okFetch();
    const r = await handleGuide({ email: 'a@b.fr', prenom: 'Marie' }, guide, configGuide, f);
    expect(r.status).toBe(303);
    expect(r.redirect).toBe('/guides/exemple/merci');
    expect(urls(f)).toEqual([
      'https://api.brevo.com/v3/contacts',
      'https://api.brevo.com/v3/smtp/email',
      'https://api.brevo.com/v3/smtp/email',
    ]);
    expect(corps(f, 0).listIds).toEqual([9]);
    expect(corps(f, 1)).toMatchObject({
      templateId: 4,
      to: [{ email: 'a@b.fr', name: 'Marie' }],
      params: { titre: 'Exemple', lien: 'https://x.fr/guides/exemple.pdf' },
    });
    expect(corps(f, 2).to[0].email).toBe('c@x.fr');
  });

  it("envoie le guide meme si l'ajout du contact echoue", async () => {
    const f = vi.fn(async (url: RequestInfo | URL, _init?: RequestInit) =>
      String(url).endsWith('/contacts')
        ? new Response('{}', { status: 500 })
        : new Response('{}', { status: 201 }),
    );
    const r = await handleGuide({ email: 'a@b.fr' }, guide, configGuide, f);
    expect(r.status).toBe(303);
  });

  it("renvoie une erreur si l'envoi du guide echoue, sans notifier", async () => {
    const f = vi.fn(async (url: RequestInfo | URL, _init?: RequestInit) =>
      String(url).endsWith('/smtp/email')
        ? new Response('{}', { status: 500 })
        : new Response('{}', { status: 201 }),
    );
    const r = await handleGuide({ email: 'a@b.fr' }, guide, configGuide, f);
    expect(r.status).toBe(502);
    expect(f).toHaveBeenCalledTimes(2);
  });

  it('reste un succes si seule la notification echoue', async () => {
    let envois = 0;
    const f = vi.fn(async (url: RequestInfo | URL, _init?: RequestInit) => {
      if (String(url).endsWith('/smtp/email')) envois += 1;
      return new Response('{}', { status: envois === 2 ? 500 : 201 });
    });
    const r = await handleGuide({ email: 'a@b.fr' }, guide, configGuide, f);
    expect(r.status).toBe(303);
  });

  it('renvoie 500 sans modele de guide configure', async () => {
    const r = await handleGuide({ email: 'a@b.fr' }, guide, config, okFetch());
    expect(r.status).toBe(500);
  });

  it('rejette une adresse invalide ou le honeypot sans appeler brevo', async () => {
    const f = okFetch();
    expect((await handleGuide({ email: 'x' }, guide, configGuide, f)).status).toBe(400);
    expect(
      (await handleGuide({ email: 'a@b.fr', honeypot: 'x' }, guide, configGuide, f)).status,
    ).toBe(400);
    expect(f).not.toHaveBeenCalled();
  });
});
