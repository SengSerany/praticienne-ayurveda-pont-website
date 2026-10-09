import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { handleGuide } from '../../lib/handlers';
import { brevoConfigDepuisEnv } from '../../lib/env';
import { guideParSlug, titreComplet } from '../../data/guides';

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const guide = guideParSlug(String(form.get('guide') ?? ''));
  if (!guide) {
    return new Response('Ce guide est introuvable.', {
      status: 404,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    });
  }
  const input = {
    email: String(form.get('email') ?? ''),
    prenom: String(form.get('prenom') ?? ''),
    honeypot: String(form.get('site') ?? ''),
  };
  // Lien absolu tire de l'adresse appelee : il suit le domaine sans reglage.
  const demande = {
    slug: guide.slug,
    titre: titreComplet(guide),
    lien: new URL(guide.fichier, request.url).href,
  };
  const result = await handleGuide(input, demande, brevoConfigDepuisEnv(env));
  if (result.status === 303 && result.redirect) {
    return redirect(result.redirect, 303);
  }
  return new Response(result.error ?? 'Erreur', {
    status: result.status,
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
