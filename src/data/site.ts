export interface NavItem {
  label: string;
  href: string;
}

export const SITE = {
  nom: 'Céline Lefèvre',
  baseline: 'Ayurveda & Santé féminine',
  url: 'https://celine-lefevre-ayurveda.fr',
};

export const navPrincipale: NavItem[] = [
  { label: "L'approche", href: '/approche' },
  { label: 'Qui je suis', href: '/qui-je-suis' },
  { label: "Ce que j'accompagne", href: '/sante-feminine' },
  { label: 'Le manuel', href: '/le-manuel' },
  { label: "L'accompagnement", href: '/accompagnement' },
];

export const navFooter: NavItem[] = [
  { label: 'La lettre', href: '/la-lettre' },
  { label: 'Professionnels de santé', href: '/professionnels-de-sante' },
  { label: 'Mentions légales', href: '/mentions-legales' },
];

export const ctaPrincipal: NavItem = { label: 'Premier échange', href: '/premier-echange' };
