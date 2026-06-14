import { describe, it, expect } from 'vitest';
import { minutesDeLecture, articlesPubliables } from './manuel';

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
