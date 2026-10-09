import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  // Domaine a confirmer une fois reserve ; utilise pour canonical, sitemap, og.
  site: 'https://celine-lefevre-ayurveda.fr',
  trailingSlash: 'never',
  // Pages ecrites en `sopk.html` et non `sopk/index.html` : sinon les assets
  // Cloudflare redirigent `/sopk` vers `/sopk/`, a l'inverse de trailingSlash.
  build: { format: 'file' },
  output: 'static',
  adapter: cloudflare({ platformProxy: { enabled: true } }),
});
