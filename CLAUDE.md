# [NOM DU PROJET]

## Identite du projet

**Nom :** [nom du projet]
**Type :** [site vitrine / e-commerce / app web / autre]
**Client :** [nom ou initiales du client]
**Tech stack :** [framework, langages, outils principaux et pourquoi ce choix]
**Domaine metier :** [secteur d'activite du client - ex: restauration, immobilier, artisanat]

**Fonctionnalites incluses dans le perimetre du projet :**
- [fonctionnalite 1]
- [fonctionnalite 2]
- [fonctionnalite 3]

**Conventions de nommage specifiques au projet :**
- [a completer au fur et a mesure - ex: les entites metier s'appellent X]

---

## Langue

Reponds toujours en francais sauf indication contraire dans ce fichier.
Les messages visibles par l'utilisateur final sont dans la langue du site ou de l'app.
Les logs et messages techniques internes restent en anglais.

---

## Git

**Regles permanentes :**
- Commits atomiques, un seul changement logique par commit
- Message de commit en texte inline uniquement : pas de retour a la ligne, pas de liste, pas de tirets, pas de numerotation
- Messages descriptifs et imparfaits, clairs sur ce qui a change et pourquoi si ce n'est pas evident
- Aucune mention de Claude, d'IA ou de Co-Authored-By dans les messages ou les metadonnees git
- CLAUDE.md, CONTEXT.md et le dossier docs/ sont dans le .gitignore du projet

**Rythme git :**
- Avant toute nouvelle fonctionnalite ou correction : creer une branche dediee
- Apres chaque changement logique termine et teste : commiter immediatement
- Apres validation d'une fonctionnalite complete : merger dans la branche principale
- Ne pas laisser de travail non commite en fin de session

---

## Architecture et code

**Separation des responsabilites :** appliquee par defaut sur chaque projet. Si la techno choisie rend cela difficile ou peu naturel, le signaler explicitement. Si tu hesites entre deux decoupages possibles, demander avant d'implementer.

**Nommage :** utiliser un vocabulaire specifique au domaine metier defini dans la section "Identite du projet". Tu peux creer des conventions de nommage propres au projet tant qu'elles respectent les conventions du langage et du framework utilise. Documenter ces conventions dans la section "Conventions de nommage" au fil du projet.

**Caracteres speciaux :** aucun caractere special qu'un humain n'utiliserait pas naturellement en ecrivant n'est permis dans le projet - ni dans le code, ni dans les textes, ni dans les fichiers de config. Pas de tiret cadratin, pas de guillemets typographiques, pas de tirets speciaux, pas d'apostrophes curly, pas de symboles unicode decoratifs. Si tu en detectes dans des fichiers existants, les remplacer et adapter le texte pour qu'il reste coherent.

**Outillage :** un formateur de style de code (Prettier, ESLint, ou equivalent selon la techno) est mis en place des le debut du projet. Des helpers specifiques au projet sont crees et centralises des que de la logique se repete plutot que de la dupliquer.

---

## Commentaires dans le code

Pas de commentaires qui decrivent ce que le code exprime deja par ses noms. Un commentaire est acceptable uniquement dans deux cas :

1. Il apporte du contexte metier qu'on ne peut pas deduire du code seul
2. Il marque une dette technique, en langage naturel et humain - ex: `// Attention a X car Y`, `// Voir X, risque de Y`, ou toute formulation du meme registre

Dans tous les autres cas, pas de commentaire.

---

## Gestion des erreurs et logs

Les messages d'erreur vus par l'utilisateur final sont clairs, comprehensibles, et rediges dans la langue du projet. Jamais de message technique brut expose a l'utilisateur.

Pas de console.log isoles dans le code. Utiliser une librairie de logging structuree adaptee a la techno du projet. Les logs ont un niveau explicite (info, warn, error) et un contexte suffisant pour etre exploitables lors du debug.

---

## CONTEXT.md et ouverture de session

Au premier prompt de chaque journee de travail, mettre a jour le fichier CONTEXT.md : etat d'avancement du projet, decisions prises depuis la derniere session, points en suspens, prochaines etapes.

Si CONTEXT.md n'existe pas encore, ne pas le creer seul. Engager une conversation pour le construire ensemble et s'assurer que rien d'important ne manque avant de commencer a travailler.