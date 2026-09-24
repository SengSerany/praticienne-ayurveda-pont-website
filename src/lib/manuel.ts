export function surtitreDeSection(texte: string, numero?: string): string {
  return numero ? `§ ${numero} - ${texte}` : texte;
}

// Le fil de lecture choisi voyage dans l'adresse (`?fil=cycle`) pour qu'un lien
// garde la selection ; toute valeur inconnue revient a « tous les chapitres ».
export function filDepuisRecherche(recherche: string, fils: readonly string[]): string | null {
  const fil = new URLSearchParams(recherche).get('fil');
  return fil !== null && fils.includes(fil) ? fil : null;
}

// Chapitres a montrer : ceux du fil choisi (tous sans fil), dans l'ordre recu,
// par pages de neuf. `reste` dit s'il faut encore proposer d'en voir plus.
export function pageDeChapitres<T>(
  chapitres: readonly T[],
  filDe: (chapitre: T) => string | undefined,
  fil: string | null,
  pages: number,
  parPage = 9,
): { visibles: T[]; reste: number; total: number } {
  const retenus = fil === null ? [...chapitres] : chapitres.filter((c) => filDe(c) === fil);
  const visibles = retenus.slice(0, Math.max(1, pages) * parPage);
  return { visibles, reste: retenus.length - visibles.length, total: retenus.length };
}

export function minutesDeLecture(texte: string, motsParMinute = 200): number {
  const mots = texte.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(mots / motsParMinute));
}

export function articlesPubliables<
  T extends { data: { brouillon: boolean; datePublication: Date; chapitre: number } },
>(articles: T[], inclureBrouillons: boolean): T[] {
  return articles
    .filter((a) => inclureBrouillons || !a.data.brouillon)
    .sort((a, b) => {
      const parDate = b.data.datePublication.getTime() - a.data.datePublication.getTime();
      return parDate !== 0 ? parDate : a.data.chapitre - b.data.chapitre;
    });
}
