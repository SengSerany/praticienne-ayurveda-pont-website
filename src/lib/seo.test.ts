import { describe, it, expect } from 'vitest';
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildPageTitle,
  buildPersonJsonLd,
  buildWebPageJsonLd,
} from './seo';

describe('buildArticleJsonLd', () => {
  it('produit un schema Article avec dates ISO et auteur Celine', () => {
    const json = JSON.parse(
      buildArticleJsonLd({
        title: 'Titre',
        description: 'Resume',
        url: 'https://celine-lefevre-ayurveda.fr/le-manuel/exemple',
        datePublished: new Date('2026-06-14T00:00:00.000Z'),
      }),
    );
    expect(json['@type']).toBe('Article');
    expect(json.headline).toBe('Titre');
    expect(json.author.name).toBe('Celine Lefevre');
    expect(json.datePublished).toBe('2026-06-14T00:00:00.000Z');
    expect(json.dateModified).toBe('2026-06-14T00:00:00.000Z');
    expect(json.mainEntityOfPage['@id']).toBe(
      'https://celine-lefevre-ayurveda.fr/le-manuel/exemple',
    );
    expect(json.inLanguage).toBe('fr-FR');
  });
});

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
