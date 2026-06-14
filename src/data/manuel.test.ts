import { describe, it, expect } from 'vitest';
import { THEMES, fils, filParSlug, manuelMeta } from './manuel';

describe('data/manuel', () => {
  it('expose exactement 4 fils, un par theme, sans doublon', () => {
    expect(fils).toHaveLength(4);
    const slugs = fils.map((f) => f.slug);
    expect(new Set(slugs).size).toBe(4);
    for (const slug of slugs) {
      expect(THEMES).toContain(slug);
    }
  });

  it('chaque fil a un titre, une accroche, un labelCourt et une illustrationRef', () => {
    for (const fil of fils) {
      expect(fil.titre.length).toBeGreaterThan(0);
      expect(fil.accroche.length).toBeGreaterThan(0);
      expect(fil.labelCourt.length).toBeGreaterThan(0);
      expect(fil.illustrationRef.length).toBeGreaterThan(0);
    }
  });

  it('filParSlug retourne le bon fil et leve si inconnu', () => {
    expect(filParSlug('digestion').labelCourt).toBe('La digestion');
    expect(() => filParSlug('inexistant')).toThrow();
  });

  it('manuelMeta porte le H1 et 3 paragraphes de promesse', () => {
    expect(manuelMeta.h1).toBe('Apprendre à lire son corps.');
    expect(manuelMeta.promesse).toHaveLength(3);
  });
});
