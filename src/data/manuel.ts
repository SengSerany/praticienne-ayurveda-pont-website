export const THEMES = ['cycle', 'digestion', 'inflammation', 'systeme-nerveux'] as const;
export type Theme = (typeof THEMES)[number];

export interface Fil {
  slug: Theme;
  titre: string;
  accroche: string;
  labelCourt: string;
  illustrationRef: string;
}

export const fils: Fil[] = [
  {
    slug: 'cycle',
    titre: 'Lire ton cycle',
    accroche:
      'Ce que chaque phase raconte, et pourquoi une même douleur change de sens selon le moment où elle arrive.',
    labelCourt: 'Lire ton cycle',
    illustrationRef: 'ILLU-Gattilier',
  },
  {
    slug: 'digestion',
    titre: 'La digestion, cette grande oubliée',
    accroche:
      'Le feu digestif, Agni, comme coulisse silencieuse de presque tout le reste : peau, hormones, énergie.',
    labelCourt: 'La digestion',
    illustrationRef: 'ILLU-Shatavari',
  },
  {
    slug: 'inflammation',
    titre: "Apaiser l'inflammation et la douleur",
    accroche:
      "Comprendre d'où vient le « feu » qui s'installe, et ce qui aide à l'apaiser au quotidien.",
    labelCourt: "Apaiser l'inflammation",
    illustrationRef: 'ILLU-Melisse',
  },
  {
    slug: 'systeme-nerveux',
    titre: 'Système nerveux, stress et sommeil',
    accroche: 'Le lien, souvent sous-estimé, entre ta tête, tes nuits et ton cycle.',
    labelCourt: 'Système nerveux',
    illustrationRef: 'ILLU-Tilleul',
  },
];

export const manuelMeta = {
  title: 'Le manuel, apprendre à lire son corps',
  metaDescription:
    'Des chapitres clairs et documentés pour comprendre ton cycle, ta digestion, ton inflammation, ton système nerveux. Apprendre à lire son corps, la cause avant le symptôme, sans rien à vendre.',
  h1: 'Apprendre à lire son corps.',
  promesse: [
    "Ce manuel n'est pas un blog de plus. C'est un endroit où comprendre ce qui se passe dans ton corps, vraiment, sans jargon, et sans rien à te vendre.",
    "Chaque chapitre part d'une question simple et remonte à la cause. Le but n'est pas que tu me croies sur parole : c'est que tu comprennes, et qu'à la fin, tu saches lire tes propres signaux.",
    "Parce que la consultation réussie, finalement, c'est celle au terme de laquelle tu n'as plus besoin de moi.",
  ],
  lettre: {
    titre: 'Un chapitre de fond, une fois par mois.',
    promesse:
      "Je te l'envoie clair et documenté. Pour commencer, un petit outil gratuit pour mieux comprendre ton terrain : quelques questions, un retour utile à la fin.",
    microcopy: 'Jamais de vente. Désabonnement en un clic.',
  },
  ymylPilier: 'Les contenus de ce manuel sont informatifs et ne remplacent pas un avis médical.',
};

export function filParSlug(slug: string): Fil {
  const fil = fils.find((f) => f.slug === slug);
  if (!fil) {
    throw new Error(`Fil inconnu: ${slug}`);
  }
  return fil;
}
