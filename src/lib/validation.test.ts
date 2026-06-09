import { describe, it, expect } from 'vitest';
import { isValidEmail, validatePremierEchange, validateLettre } from './validation';

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
