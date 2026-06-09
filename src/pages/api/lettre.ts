import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { handleLettre } from '../../lib/handlers';
import { brevoConfigDepuisEnv } from '../../lib/env';

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const input = {
    email: String(form.get('email') ?? ''),
    honeypot: String(form.get('site') ?? ''),
  };
  const config = brevoConfigDepuisEnv(env);
  const result = await handleLettre(input, config);
  if (result.status === 200) {
    return redirect('/la-lettre?inscrite=1', 303);
  }
  return new Response(result.error ?? 'Erreur', {
    status: result.status,
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
