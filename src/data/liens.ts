import { guides } from './guides';

// Page de liens, l'adresse a mettre en bio Instagram. Un lien `avantLancement`
// s'affiche tout de suite ; les autres attendent `SITE.lance`. Rendre visible
// plus tot une page du site demande aussi de l'ajouter a CHEMINS_PUBLICS
// (src/lib/attente.ts), sinon elle mene a la page d'attente.

export interface Lien {
  titre: string;
  detail: string;
  href: string;
  avantLancement: boolean;
  surtitre?: string;
  couverture?: string;
  action?: string;
}

const [guideCycle] = guides;

export const liens: Lien[] = [
  {
    surtitre: 'GUIDE OFFERT',
    titre: guideCycle.titre,
    detail: guideCycle.sousTitre,
    href: `/guides/${guideCycle.slug}`,
    couverture: guideCycle.couverture,
    action: 'Recevoir le guide',
    avantLancement: true,
  },
  {
    titre: 'Premier échange',
    detail: 'Trente minutes pour en parler, gratuites et sans engagement.',
    href: '/premier-echange',
    avantLancement: false,
  },
  {
    titre: 'La lettre',
    detail: 'Un chapitre de fond par mois. Jamais de vente.',
    href: '/la-lettre',
    avantLancement: false,
  },
  {
    titre: 'Le site',
    detail: "L'approche, l'accompagnement, les cinq passages.",
    href: '/',
    avantLancement: false,
  },
];
