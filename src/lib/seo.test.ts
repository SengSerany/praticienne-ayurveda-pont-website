import { describe, it, expect } from 'vitest';
import { buildBreadcrumbJsonLd, buildPageTitle } from './seo';

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
