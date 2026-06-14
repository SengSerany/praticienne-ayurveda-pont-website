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
