import { describe, it, expect } from 'vitest';
import {
  buildBreadcrumbJsonLd,
  buildPageTitle,
  buildPersonJsonLd,
  buildWebPageJsonLd,
} from './seo';

describe('buildBreadcrumbJsonLd', () => {
  it('genere un BreadcrumbList ordonne', () => {
    const json = JSON.parse(
      buildBreadcrumbJsonLd([
        { name: 'Accueil', url: 'https://x.fr/' },
        { name: 'Le manuel', url: 'https://x.fr/le-manuel' },
      ]),
    );
    expect(json['@type']).toBe('BreadcrumbList');
    expect(json.itemListElement).toHaveLength(2);
    expect(json.itemListElement[0].position).toBe(1);
    expect(json.itemListElement[1].name).toBe('Le manuel');
  });
});

describe('buildPageTitle', () => {
  it('ajoute le suffixe de marque', () => {
    expect(buildPageTitle('Qui je suis')).toBe(
      'Qui je suis | Celine Lefevre - Ayurveda & Sante feminine',
    );
  });

  it('renvoie le suffixe seul sans titre', () => {
    expect(buildPageTitle()).toBe('Celine Lefevre - Ayurveda & Sante feminine');
  });
});

describe('buildPersonJsonLd', () => {
  it('genere un Person', () => {
    const json = JSON.parse(
      buildPersonJsonLd({
        name: 'Céline Lefèvre',
        jobTitle: 'Praticienne en Ayurveda',
        url: 'https://x.fr/qui-je-suis',
      }),
    );
    expect(json['@type']).toBe('Person');
    expect(json.name).toBe('Céline Lefèvre');
    expect(json.jobTitle).toBe('Praticienne en Ayurveda');
  });
});

describe('buildWebPageJsonLd', () => {
  it('genere une WebPage standard', () => {
    const json = JSON.parse(
      buildWebPageJsonLd({ name: 'Hub', description: 'd', url: 'https://x.fr/sante-feminine' }),
    );
    expect(json['@type']).toBe('WebPage');
  });

  it('genere une MedicalWebPage quand medical', () => {
    const json = JSON.parse(
      buildWebPageJsonLd({ name: 'Endo', description: 'd', url: 'https://x.fr/e', medical: true }),
    );
    expect(json['@type']).toBe('MedicalWebPage');
  });
});
