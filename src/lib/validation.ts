export interface ValidationResult {
  ok: boolean;
  errors: string[];
}

export interface PremierEchangeInput {
  email: string;
  prenom?: string;
  message?: string;
  honeypot?: string;
}

export interface LettreInput {
  email: string;
  honeypot?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email);
}

export function validatePremierEchange(input: PremierEchangeInput): ValidationResult {
  const errors: string[] = [];
  if (input.honeypot) errors.push('honeypot');
  if (!isValidEmail(input.email)) errors.push('email');
  if (input.prenom && input.prenom.length > 100) errors.push('prenom');
  if (input.message && input.message.length > 5000) errors.push('message');
  return { ok: errors.length === 0, errors };
}

export function validateLettre(input: LettreInput): ValidationResult {
  const errors: string[] = [];
  if (input.honeypot) errors.push('honeypot');
  if (!isValidEmail(input.email)) errors.push('email');
  return { ok: errors.length === 0, errors };
}
