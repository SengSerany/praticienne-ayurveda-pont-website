const fichiersSvg = import.meta.glob<string>('/public/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export function svgEnLigne(chemin: string): string | undefined {
  return fichiersSvg[`/public${chemin}`];
}
