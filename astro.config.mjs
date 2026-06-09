import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  // Domaine a confirmer une fois reserve ; utilise pour canonical, sitemap, og.
  site: 'https://celine-lefevre-ayurveda.fr',
  trailingSlash: 'never',
  output: 'static',
  adapter: cloudflare({ platformProxy: { enabled: true } }),
});
