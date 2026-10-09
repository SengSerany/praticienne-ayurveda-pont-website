const SUFFIXE_MARQUE = 'Celine Lefevre - Ayurveda & Sante feminine';

export function buildPageTitle(title?: string): string {
  return title ? `${title} | ${SUFFIXE_MARQUE}` : SUFFIXE_MARQUE;
}

// Au build, les pages sont ecrites en fichiers (`sopk.html`) et Astro.url le
// reflete ; l'adresse servie, elle, n'a ni extension ni slash final.
export function buildCanonicalUrl(pathname: string, site: string): string {
  const chemin = pathname.replace(/\.html$/, '').replace(/\/index$/, '/');
  return new URL(chemin || '/', site).href;
}

export interface PersonJsonLdInput {
  name: string;
  jobTitle: string;
  url: string;
}

export function buildPersonJsonLd(input: PersonJsonLdInput): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: input.name,
    jobTitle: input.jobTitle,
    url: input.url,
  });
}

export interface WebPageJsonLdInput {
  name: string;
  description: string;
  url: string;
  medical?: boolean;
}

export function buildWebPageJsonLd(input: WebPageJsonLdInput): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': input.medical ? 'MedicalWebPage' : 'WebPage',
    name: input.name,
    description: input.description,
    url: input.url,
  });
}

export interface ArticleJsonLdInput {
  title: string;
  description: string;
  url: string;
  datePublished: Date;
  dateModified?: Date;
}

export function buildArticleJsonLd(input: ArticleJsonLdInput): string {
  const origin = new URL(input.url).origin;
  const auteur = { '@type': 'Person', name: 'Celine Lefevre', url: origin };
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished.toISOString(),
    dateModified: (input.dateModified ?? input.datePublished).toISOString(),
    author: auteur,
    publisher: auteur,
    mainEntityOfPage: { '@type': 'WebPage', '@id': input.url },
    inLanguage: 'fr-FR',
  });
}
