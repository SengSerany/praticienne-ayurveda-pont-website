# Init Project Eokya

Template de base pour demarrer un projet de developpement web avec Claude Code.

## Contenu

- `CLAUDE.md` : fichier de regles pour Claude Code, a copier a la racine de chaque projet
- `.gitignore.template` : gitignore de reference a copier et adapter selon la techno du projet

## Comment utiliser ce template

1. Copier `CLAUDE.md` a la racine du nouveau projet
2. Copier `.gitignore.template` a la racine et le renommer en `.gitignore`
3. Remplir la section "Identite du projet" dans `CLAUDE.md` :
   - Nom et type du projet
   - Tech stack choisi
   - Domaine metier du client
   - Liste des fonctionnalites incluses dans le perimetre
4. Adapter le `.gitignore` selon la techno choisie (supprimer les entrees non pertinentes)
5. Demarrer Claude Code

## Ce que CLAUDE.md configure

- **Langue** : Claude repond en francais par defaut
- **Git** : commits atomiques, messages inline descriptifs, pas d'attribution IA, rythme de commit defini
- **Architecture** : separation des responsabilites, nommage metier, pas de caracteres speciaux
- **Code** : commentaires uniquement pour contexte metier ou dette technique
- **Erreurs et logs** : messages utilisateur clairs, logging structure
- **CONTEXT.md** : mis a jour a chaque ouverture de session, cree ensemble si absent

## Fichiers hors git (dans chaque projet)

`CLAUDE.md`, `CONTEXT.md` et `docs/` sont gitignores dans chaque projet. Ils restent locaux.
