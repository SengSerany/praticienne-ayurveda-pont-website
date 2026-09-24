import { describe, it, expect } from 'vitest';
import {
  minutesDeLecture,
  articlesPubliables,
  surtitreDeSection,
  filDepuisRecherche,
  pageDeChapitres,
} from './manuel';

describe('surtitreDeSection', () => {
  it('prefixe le numero de chapitre avec le signe de section et un tiret espace', () => {
    expect(surtitreDeSection('LE PONT', '03')).toBe('§ 03 - LE PONT');
  });

  it('rend le texte seul sans numero', () => {
    expect(surtitreDeSection('LE PONT')).toBe('LE PONT');
  });
});

describe('minutesDeLecture', () => {
  it('retourne 1 minute minimum pour un texte vide', () => {
    expect(minutesDeLecture('')).toBe(1);
  });

  it('compte 200 mots comme 1 minute', () => {
    const texte = Array.from({ length: 200 }, () => 'mot').join(' ');
    expect(minutesDeLecture(texte)).toBe(1);
  });

  it('arrondit au superieur (201 mots = 2 minutes)', () => {
    const texte = Array.from({ length: 201 }, () => 'mot').join(' ');
    expect(minutesDeLecture(texte)).toBe(2);
  });
});

type FauxArticle = {
  id: string;
  data: { brouillon: boolean; datePublication: Date; chapitre: number };
};

const faux: FauxArticle[] = [
  { id: 'b', data: { brouillon: true, datePublication: new Date('2026-06-10'), chapitre: 2 } },
  { id: 'a', data: { brouillon: false, datePublication: new Date('2026-06-12'), chapitre: 1 } },
  { id: 'c', data: { brouillon: false, datePublication: new Date('2026-06-12'), chapitre: 3 } },
];

describe('articlesPubliables', () => {
  it('exclut les brouillons quand inclureBrouillons est faux', () => {
    const res = articlesPubliables(faux, false);
    expect(res.map((a) => a.id)).toEqual(['a', 'c']);
  });

  it('garde les brouillons quand inclureBrouillons est vrai', () => {
    const res = articlesPubliables(faux, true);
    expect(res.map((a) => a.id).sort()).toEqual(['a', 'b', 'c']);
  });

  it('trie par date decroissante puis chapitre croissant', () => {
    const res = articlesPubliables(faux, true);
    expect(res.map((a) => a.id)).toEqual(['a', 'c', 'b']);
  });

  it('ne mute pas le tableau source', () => {
    const copie = [...faux];
    articlesPubliables(faux, true);
    expect(faux).toEqual(copie);
  });
});

describe('filDepuisRecherche', () => {
  const fils = ['cycle', 'digestion'] as const;

  it('retourne le fil demande quand il existe', () => {
    expect(filDepuisRecherche('?fil=digestion', fils)).toBe('digestion');
  });

  it('ignore un fil inconnu', () => {
    expect(filDepuisRecherche('?fil=astrologie', fils)).toBeNull();
  });

  it('retourne null sans parametre de fil', () => {
    expect(filDepuisRecherche('', fils)).toBeNull();
    expect(filDepuisRecherche('?autre=1', fils)).toBeNull();
  });
});

describe('pageDeChapitres', () => {
  const chapitres = Array.from({ length: 20 }, (_, i) => ({
    n: i,
    fil: i % 4 === 0 ? 'cycle' : 'digestion',
  }));
  const filDe = (c: { fil: string }) => c.fil;

  it('montre neuf chapitres par page et compte le reste', () => {
    const page = pageDeChapitres(chapitres, filDe, null, 1);
    expect(page.visibles.map((c) => c.n)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    expect(page.reste).toBe(11);
    expect(page.total).toBe(20);
  });

  it("ajoute neuf chapitres par page jusqu'a epuisement", () => {
    expect(pageDeChapitres(chapitres, filDe, null, 2).visibles).toHaveLength(18);
    const fin = pageDeChapitres(chapitres, filDe, null, 3);
    expect(fin.visibles).toHaveLength(20);
    expect(fin.reste).toBe(0);
  });

  it("ne garde que le fil choisi, dans l'ordre recu", () => {
    const page = pageDeChapitres(chapitres, filDe, 'cycle', 1);
    expect(page.visibles.map((c) => c.n)).toEqual([0, 4, 8, 12, 16]);
    expect(page.reste).toBe(0);
  });

  it('signale un fil sans chapitre', () => {
    expect(pageDeChapitres(chapitres, filDe, 'inflammation', 1).total).toBe(0);
  });
});
