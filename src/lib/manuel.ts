export function minutesDeLecture(texte: string, motsParMinute = 200): number {
  const mots = texte.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(mots / motsParMinute));
}
