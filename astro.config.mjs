import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import { SITE } from './src/data/site.ts';
import { siteEnAttente } from './src/lib/attente.ts';

// Decide au build, et non a l'execution : les pages sont prerendues, et le
// prerendu tourne dans workerd, ou la branche de Workers Builds n'est pas lisible.
const enAttente = siteEnAttente({
  lance: SITE.lance,
  branche: process.env.WORKERS_CI_BRANCH,
  forcage: process.env.SITE_EN_ATTENTE,
});

export default defineConfig({
  // Domaine a confirmer une fois reserve ; utilise pour canonical, sitemap, og.
  site: 'https://celine-lefevre-ayurveda.fr',
  trailingSlash: 'never',
  // Pages ecrites en `sopk.html` et non `sopk/index.html` : sinon les assets
  // Cloudflare redirigent `/sopk` vers `/sopk/`, a l'inverse de trailingSlash.
  build: { format: 'file' },
  output: 'static',
  adapter: cloudflare({ platformProxy: { enabled: true } }),
  vite: {
    define: { 'import.meta.env.SITE_EN_ATTENTE': JSON.stringify(enAttente) },
  },
});
