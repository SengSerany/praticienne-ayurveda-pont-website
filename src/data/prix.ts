export interface Offre {
  cle: string;
  nom: string;
  description: string;
  prix: string;
  note?: string;
}

export const offres: Offre[] = [
  {
    cle: 'premier-echange',
    nom: 'Le Premier echange',
    description:
      'Un appel de 30 minutes pour faire connaissance, apres un court formulaire. Sans engagement.',
    prix: 'Gratuit',
  },
  {
    cle: 'bilan',
    nom: 'Le Bilan approfondi',
    description: "Une seance d'1 h 30 pour y voir clair sur votre terrain.",
    prix: '90 €',
    note: "Deduit du prix de l'accompagnement si vous continuez dans le mois.",
  },
  {
    cle: 'accompagnement-3',
    nom: "L'accompagnement 3 mois",
    description: 'Le plus choisi : bilan, 3 seances de suivi, carnet de notes relu, messagerie.',
    prix: '490 €',
  },
  {
    cle: 'accompagnement-6',
    nom: "L'accompagnement 6 mois",
    description: 'Pour les situations installees (endometriose, etc.) qui demandent du temps.',
    prix: '790 €',
  },
  {
    cle: 'point-saison',
    nom: 'Le Point de saison',
    description: 'Une seance de reajustement reservee aux anciennes clientes.',
    prix: '90 €',
  },
];

export const reglesTarifs: string[] = [
  'Accompagnements payables en plusieurs fois, sans frais.',
  "Tarif reduit d'environ 20 % pour les etudiantes, les personnes en recherche d'emploi et les personnes en situation de handicap, sur justificatif, dans la limite de deux places a la fois.",
];
