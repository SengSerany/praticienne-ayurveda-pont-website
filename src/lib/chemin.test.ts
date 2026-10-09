import { describe, it, expect } from 'vitest';
import { cheminPropre } from './chemin';

describe('cheminPropre', () => {
  it("retire l'extension des pages ecrites en fichiers au build", () => {
    expect(cheminPropre('/sante-feminine/sopk.html')).toBe('/sante-feminine/sopk');
  });

  it("ramene la page d'accueil a la racine", () => {
    expect(cheminPropre('/index.html')).toBe('/');
    expect(cheminPropre('/')).toBe('/');
  });

  it('laisse intacte une adresse deja propre, comme en dev', () => {
    expect(cheminPropre('/approche')).toBe('/approche');
  });
});
