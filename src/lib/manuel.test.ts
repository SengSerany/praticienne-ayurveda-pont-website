import { describe, it, expect } from 'vitest';
import { minutesDeLecture } from './manuel';

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
