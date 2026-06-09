import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { handlePremierEchange } from '../../lib/handlers';
import { brevoConfigDepuisEnv } from '../../lib/env';

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const input = {
    email: String(form.get('email') ?? ''),
    prenom: String(form.get('prenom') ?? ''),
    message: String(form.get('message') ?? ''),
    honeypot: String(form.get('site') ?? ''),
  };
  const config = brevoConfigDepuisEnv(env);
  const result = await handlePremierEchange(input, config);
  if (result.status === 303 && result.redirect) {
    return redirect(result.redirect, 303);
  }
  return new Response(result.error ?? 'Erreur', {
    status: result.status,
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
