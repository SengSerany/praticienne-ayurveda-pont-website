export function liensVisibles<T extends { avantLancement: boolean }>(
  liens: T[],
  lance: boolean,
): T[] {
  return liens.filter((lien) => lance || lien.avantLancement);
}
