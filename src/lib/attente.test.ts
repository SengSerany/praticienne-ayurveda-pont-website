import { describe, it, expect } from 'vitest';
import { cheminSousAttente, siteEnAttente } from './attente';

describe('siteEnAttente', () => {
  it("met en attente l'adresse publique tant que le site n'est pas lance", () => {
    expect(siteEnAttente({ lance: false, branche: 'main' })).toBe(true);
  });

  it("garde le site complet sur la branche d'apercu", () => {
    expect(siteEnAttente({ lance: false, branche: 'apercu' })).toBe(false);
  });

  it('garde le site complet en local, hors Workers Builds', () => {
    expect(siteEnAttente({ lance: false })).toBe(false);
  });

  it("leve l'attente une fois le site lance", () => {
    expect(siteEnAttente({ lance: true, branche: 'main' })).toBe(false);
  });

  it('obeit au forcage dans les deux sens', () => {
    expect(siteEnAttente({ lance: true, forcage: 'oui' })).toBe(true);
    expect(siteEnAttente({ lance: false, branche: 'main', forcage: 'non' })).toBe(false);
  });
});

describe('cheminSousAttente', () => {
  it("place toutes les pages sous la page d'attente", () => {
    expect(cheminSousAttente('/')).toBe(true);
    expect(cheminSousAttente('/sante-feminine/sopk.html')).toBe(true);
  });

  it("laisse passer la page d'attente elle-meme et les formulaires", () => {
    expect(cheminSousAttente('/bientot')).toBe(false);
    expect(cheminSousAttente('/bientot.html')).toBe(false);
    expect(cheminSousAttente('/api/lettre')).toBe(false);
  });

  it('laisse visibles la page de liens et les guides, sous-pages comprises', () => {
    expect(cheminSousAttente('/liens.html')).toBe(false);
    expect(cheminSousAttente('/guides/5-rituels-cycle.html')).toBe(false);
    expect(cheminSousAttente('/guides/5-rituels-cycle/merci')).toBe(false);
  });

  it('ne confond pas une page publique avec une page qui commence pareil', () => {
    expect(cheminSousAttente('/liens-utiles')).toBe(true);
  });
});
