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
      'Ce que chaque phase raconte, et pourquoi une meme douleur change de sens selon le moment ou elle arrive.',
    labelCourt: 'Lire ton cycle',
    illustrationRef: 'ILLU·Gattilier',
  },
  {
    slug: 'digestion',
    titre: 'La digestion, cette grande oubliee',
    accroche:
      'Le feu digestif, Agni, comme coulisse silencieuse de presque tout le reste : peau, hormones, energie.',
    labelCourt: 'La digestion',
    illustrationRef: 'ILLU·Shatavari',
  },
  {
    slug: 'inflammation',
    titre: "Apaiser l'inflammation et la douleur",
    accroche:
      "Comprendre d'ou vient le « feu » qui s'installe, et ce qui aide a l'apaiser au quotidien.",
    labelCourt: "Apaiser l'inflammation",
    illustrationRef: 'ILLU·Melisse',
  },
  {
    slug: 'systeme-nerveux',
    titre: 'Systeme nerveux, stress et sommeil',
    accroche: 'Le lien, souvent sous-estime, entre ta tete, tes nuits et ton cycle.',
    labelCourt: 'Systeme nerveux',
    illustrationRef: 'ILLU·Tilleul',
  },
];

export const manuelMeta = {
  title: 'Le manuel, apprendre a lire son corps',
  metaDescription:
    'Des chapitres clairs et documentes pour comprendre ton cycle, ta digestion, ton inflammation, ton systeme nerveux. Apprendre a lire son corps, la cause avant le symptome, sans rien a vendre.',
  h1: 'Apprendre à lire son corps.',
  promesse: [
    "Ce manuel n'est pas un blog de plus. C'est un endroit ou comprendre ce qui se passe dans ton corps, vraiment, sans jargon, et sans rien a te vendre.",
    "Chaque chapitre part d'une question simple et remonte a la cause. Le but n'est pas que tu me croies sur parole : c'est que tu comprennes, et qu'a la fin, tu saches lire tes propres signaux.",
    "Parce que la consultation reussie, finalement, c'est celle au terme de laquelle tu n'as plus besoin de moi.",
  ],
  lettre: {
    titre: 'Garde le fil. Un chapitre par mois.',
    promesse:
      "Une fois par mois, je t'envoie un chapitre de fond, clair, documente, sans rien a vendre. Pour commencer, un petit outil gratuit pour mieux comprendre ton terrain : quelques questions, un retour utile a la fin.",
    microcopy: 'Jamais de vente. Desabonnement en un clic.',
  },
  ymylPilier: 'Les contenus de ce manuel sont informatifs et ne remplacent pas un avis medical.',
};

export function filParSlug(slug: string): Fil {
  const fil = fils.find((f) => f.slug === slug);
  if (!fil) {
    throw new Error(`Fil inconnu: ${slug}`);
  }
  return fil;
}
