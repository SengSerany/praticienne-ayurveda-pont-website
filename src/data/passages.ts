export interface Passage {
  cle: string;
  titre: string;
  resume: string;
  href: string;
  star: boolean;
  aVenir: boolean;
  illustrationRef: string;
}

export const passages: Passage[] = [
  {
    cle: 'endometriose',
    titre: 'Endométriose',
    resume:
      "Quand la douleur s'installe trois jours avant les règles et colonise le reste. Apaiser l'inflammation, lire le cycle, comprendre la coulisse digestive.",
    href: '/sante-feminine/endometriose',
    star: true,
    aVenir: false,
    illustrationRef: 'ILLU·Gattilier',
  },
  {
    cle: 'sopk',
    titre: 'SOPK',
    resume:
      "Cycles devenus silencieux, peau qui s'emballe, énergie en dents de scie. Relire le terrain plutôt que masquer les signaux.",
    href: '/sante-feminine/sopk',
    star: false,
    aVenir: true,
    illustrationRef: 'ILLU·Shatavari',
  },
  {
    cle: 'apres-pilule',
    titre: 'Après-pilule & aménorrhée',
    resume:
      "Le cycle qui ne revient pas, le corps qu'on ne reconnaît plus. Soutenir le foie et réveiller l'axe hormonal, sans reprendre d'hormones de synthèse.",
    href: '/sante-feminine/apres-pilule-amenorrhee',
    star: false,
    aVenir: true,
    illustrationRef: 'ILLU·Sauge',
  },
  {
    cle: 'post-partum',
    titre: 'Post-partum',
    resume:
      "Après l'accouchement, un grand vide intérieur, au sens littéral. De la chaleur, du gras nourrissant, du repos : l'apaisement de Vata.",
    href: '/sante-feminine/post-partum',
    star: false,
    aVenir: true,
    illustrationRef: 'ILLU·Tilleul',
  },
  {
    cle: 'perimenopause',
    titre: 'Périménopause',
    resume:
      "Le feu qui monte, le sommeil qui s'effrite, les tissus qui s'assèchent. Accompagner la transition, plutôt que la subir.",
    href: '/sante-feminine/perimenopause',
    star: false,
    aVenir: true,
    illustrationRef: 'ILLU·Melisse',
  },
];
