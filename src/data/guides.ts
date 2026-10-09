// Guides offerts en echange d'une adresse email. Le PDF et sa couverture vivent
// dans public/guides/ ; la couverture se regenere avec docs/outils/guides/couverture.mjs.
// Comme les guides, ces textes tutoient : ils s'adressent au lectorat d'Instagram
// et du manuel (identite verbale, registres par contexte).

export interface EntreeSommaire {
  titre: string;
  detail?: string;
}

export interface Guide {
  slug: string;
  titre: string;
  sousTitre: string;
  accroche: string;
  fichier: string;
  couverture: string;
  nombrePages: number;
  ouverture: EntreeSommaire;
  rituels: string[];
  cloture: EntreeSommaire;
}

export const guides: Guide[] = [
  {
    slug: '5-rituels-cycle',
    titre: '5 rituels ayurvédiques',
    sousTitre: 'pour mieux comprendre et mieux vivre ton cycle',
    accroche:
      'Des gestes simples pour apprendre à écouter ton corps et prendre soin de toi au fil de ton cycle.',
    fichier: '/guides/5-rituels-ayurvediques-cycle.pdf',
    couverture: '/guides/5-rituels-couverture.webp',
    nombrePages: 21,
    ouverture: {
      titre: 'Comprendre son cycle',
      detail: 'Les quatre grandes phases, pour se repérer.',
    },
    rituels: [
      'Boire chaud',
      'Ralentir',
      "L'auto-massage",
      'Adapter son alimentation',
      'Prendre soin de sa digestion',
    ],
    cloture: {
      titre: "Un carnet d'observation",
      detail: 'À remplir pendant ton prochain cycle, puis à relire après quelques semaines.',
    },
  },
];

export function guideParSlug(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function titreComplet(guide: Guide): string {
  return `${guide.titre} ${guide.sousTitre}`;
}
