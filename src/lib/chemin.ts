// Au build, les pages sont ecrites en fichiers (`sopk.html`) et Astro.url le
// reflete ; l'adresse servie, elle, n'a ni extension ni slash final.
export function cheminPropre(pathname: string): string {
  return pathname.replace(/\.html$/, '').replace(/\/index$/, '/') || '/';
}
