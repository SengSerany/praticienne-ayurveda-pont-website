import { describe, expect, it } from 'vitest';
import { svgEnLigne } from './svg';

describe('svgEnLigne', () => {
  it('retourne le balisage du fichier servi a ce chemin', () => {
    expect(svgEnLigne('/schema-04.svg')).toMatch(/^<svg /);
  });

  it('retourne undefined pour un fichier absent', () => {
    expect(svgEnLigne('/illu-inexistante.svg')).toBeUndefined();
  });

  it('ne resout que les chemins absolus depuis la racine du site', () => {
    expect(svgEnLigne('schema-04.svg')).toBeUndefined();
  });
});
