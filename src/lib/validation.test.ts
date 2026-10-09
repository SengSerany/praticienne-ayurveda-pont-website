import { describe, it, expect } from 'vitest';
import { isValidEmail, validatePremierEchange, validateLettre, validateGuide } from './validation';

describe('isValidEmail', () => {
  it('accepte un email valide', () => {
    expect(isValidEmail('prenom@exemple.fr')).toBe(true);
  });
  it('rejette un email invalide', () => {
    expect(isValidEmail('pasunemail')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });
});

describe('validatePremierEchange', () => {
  it('valide avec email seul', () => {
    expect(validatePremierEchange({ email: 'a@b.fr' }).ok).toBe(true);
  });
  it('rejette email manquant ou invalide', () => {
    expect(validatePremierEchange({ email: '' }).ok).toBe(false);
    expect(validatePremierEchange({ email: 'x' }).ok).toBe(false);
  });
  it('rejette si le honeypot est rempli', () => {
    expect(validatePremierEchange({ email: 'a@b.fr', honeypot: 'bot' }).ok).toBe(false);
  });
  it('rejette un message trop long', () => {
    expect(validatePremierEchange({ email: 'a@b.fr', message: 'x'.repeat(5001) }).ok).toBe(false);
  });
});

describe('validateLettre', () => {
  it('valide avec email', () => {
    expect(validateLettre({ email: 'a@b.fr' }).ok).toBe(true);
  });
  it('rejette honeypot rempli', () => {
    expect(validateLettre({ email: 'a@b.fr', honeypot: 'x' }).ok).toBe(false);
  });
});

describe('validateGuide', () => {
  it('accepte une adresse seule ou avec un prenom', () => {
    expect(validateGuide({ email: 'a@b.fr' }).ok).toBe(true);
    expect(validateGuide({ email: 'a@b.fr', prenom: 'Marie' }).ok).toBe(true);
  });
  it('refuse le honeypot, une adresse invalide et un prenom trop long', () => {
    expect(validateGuide({ email: 'a@b.fr', honeypot: 'x' }).errors).toEqual(['honeypot']);
    expect(validateGuide({ email: 'x' }).errors).toEqual(['email']);
    expect(validateGuide({ email: 'a@b.fr', prenom: 'x'.repeat(101) }).errors).toEqual(['prenom']);
  });
});
