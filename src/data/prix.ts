export interface Offre {
  cle: string;
  nom: string;
  description: string;
  prix: string;
  // Equivalent hebdomadaire, affiche sous le prix.
  equivalent?: string;
  // Signale l'offre recommandee.
  mention?: string;
  note?: string;
}

export const offres: Offre[] = [
  {
    cle: 'premier-echange',
    nom: 'Le Premier échange',
    description:
      'Un appel de 30 minutes pour faire connaissance, après un court formulaire. Sans engagement.',
    prix: 'Gratuit',
  },
  {
    cle: 'bilan',
    nom: 'Le Bilan approfondi',
    description: "Une séance d'1 h 30 pour y voir clair sur votre terrain.",
    prix: '90 €',
    note: "Déduit du prix de l'accompagnement si vous continuez dans le mois.",
  },
  {
    cle: 'accompagnement-3',
    nom: "L'accompagnement 3 mois",
    description: "Bilan, 3 séances de suivi, cahier d'observation relu, messagerie.",
    prix: '490 €',
    equivalent: 'soit environ 38 € par semaine',
    mention: 'Le plus choisi',
  },
  {
    cle: 'accompagnement-6',
    nom: "L'accompagnement 6 mois",
    description: 'Pour les situations installées (endométriose, etc.) qui demandent du temps.',
    prix: '790 €',
  },
  {
    cle: 'point-saison',
    nom: 'Le Point de saison',
    description: 'Une séance de réajustement réservée aux anciennes clientes.',
    prix: '90 €',
  },
];

export const reglesTarifs: string[] = [
  'Accompagnements payables en plusieurs fois, sans frais.',
  "Tarif réduit d'environ 20 % pour les étudiantes, les personnes en recherche d'emploi et les personnes en situation de handicap, sur justificatif, dans la limite de deux places à la fois.",
];
