import { cheminPropre } from './chemin';

// Tant que le site n'est pas lance, l'adresse publique, construite depuis `main`
// par Workers Builds, ne montre que la page d'attente. Toute autre branche, comme
// `apercu`, garde le site complet pour la relecture par Celine.
export const BRANCHE_PUBLIQUE = 'main';
export const CHEMIN_ATTENTE = '/bientot';

export interface ContexteDeBuild {
  lance: boolean;
  branche?: string;
  // `oui` ou `non` pour forcer un mode, par exemple pour voir la page d'attente en local.
  forcage?: string;
}

export function siteEnAttente({ lance, branche, forcage }: ContexteDeBuild): boolean {
  if (forcage === 'oui') return true;
  if (forcage === 'non') return false;
  return !lance && branche === BRANCHE_PUBLIQUE;
}

// Pages visibles malgre l'attente, avec leurs sous-pages : la page de liens de la
// bio Instagram et les guides offerts, que Celine diffuse deja.
export const CHEMINS_PUBLICS = ['/liens', '/guides'];

// Les formulaires restent servis : seules les pages cedent la place a l'attente.
export function cheminSousAttente(pathname: string): boolean {
  const chemin = cheminPropre(pathname);
  if (chemin === CHEMIN_ATTENTE || chemin.startsWith('/api/')) return false;
  return !CHEMINS_PUBLICS.some((public_) => chemin === public_ || chemin.startsWith(`${public_}/`));
}
