import { defineMiddleware } from 'astro:middleware';
import { CHEMIN_ATTENTE, cheminSousAttente } from './lib/attente';

export const onRequest = defineMiddleware((contexte, suite) => {
  if (import.meta.env.SITE_EN_ATTENTE && cheminSousAttente(contexte.url.pathname)) {
    return contexte.rewrite(CHEMIN_ATTENTE);
  }
  return suite();
});
