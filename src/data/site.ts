export interface NavItem {
  label: string;
  href: string;
}

export const SITE = {
  nom: 'Céline Lefèvre',
  baseline: 'Ayurveda & Santé féminine',
  url: 'https://celine-lefevre-ayurveda.fr',
  // Adresse du canal professionnel, distincte du Premier echange. A confirmer par Celine.
  emailPro: 'contact-pro@celine-lefevre-ayurveda.fr',
  // Agenda de Celine pour l'appel decouverte gratuit de 30 minutes.
  reservation: 'https://calendly.com/celine-lefevre06/appel-decouverte---ayurveda-',
  // Le site est en ligne avant d'etre valide par Celine. Tant qu'il n'est pas
  // lance, aucune page n'est indexee et l'adresse publique ne montre que la page
  // d'attente (voir src/lib/attente.ts). Passer a true au lancement.
  lance: false,
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
  { label: 'Confidentialité', href: '/politique-de-confidentialite' },
];

export const ctaPrincipal: NavItem = { label: 'Premier échange', href: '/premier-echange' };
