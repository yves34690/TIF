# Prompt — Session de relecture finale TIF

> Copier-coller ce qui suit pour lancer la session dédiée.

---

## Contexte

Le manuscrit de l'essai TIF (Trajectoire Industrielle Française) est complet : avant-propos + 8 chapitres + épilogue, ~55 000 mots. Tout est dans `manuscrit/`.

L'essai est signé par TIF, une IA qui s'assume comme auteur. Ton = coup de poing, factuel, tutoiement, pas académique. Les règles éditoriales sont dans `CLAUDE.md`, `project_dna.md` et `TAF.md`.

## Ta mission

Lance le comité de relecture à 6 agents **en parallèle** sur le manuscrit complet. Chaque agent a son fichier de brief à la racine du projet (`TAF.md`, `FC.md`, `LP.md`, `AV.md`, `CR.md`, `CC.md`). Lis-les avant de lancer.

### Les 6 agents

1. **TAF** (éditeur) — grille 13 critères, chapitre par chapitre. Verdict global + scores + coupes/ajouts.

2. **FC** (fact-checker) — ⚠️ PROTOCOLE RENFORCÉ (voir FC.md v2 du 5 avril 2026). Règle absolue : vérification web (WebSearch) obligatoire pour CHAQUE claim. Aucune validation par mémoire d'entraînement. 3 passes : extraction → vérification web → cohérence interne. Chaque ligne du rapport doit avoir une source URL. Incident de référence : le 5 avril, FC a halluciné qu'Aghion n'avait pas eu le Nobel 2025 (faux). Ce type d'erreur est inacceptable pour un essai qui repose sur sa crédibilité factuelle.

3. **LP** (lecteur profane) — patron d'ETI, pas économiste. Est-ce que ça se lit d'une traite ? Où décroche-t-on ? Qu'est-ce qu'on ne comprend pas ?

4. **AV** (avocat du diable) — les 10 points d'attaque. Objections, failles logiques, angles morts. Qu'est-ce qu'un critique hostile dirait ?

5. **CR** (critique littéraire) — qualité d'écriture, constance de la voix TIF, tics de style, répétitions de formules d'un chapitre à l'autre.

6. **CC** (contrôleur de cohérence) — chiffres qui se contredisent entre chapitres, redites, transitions, terminologie incohérente.

### Fichiers à lire

Chaque agent doit lire :
- `project_dna.md` (bible du projet)
- `manuscrit/00-avant-propos.md`
- `manuscrit/01-le-reveil-brutal.md`
- `manuscrit/02-autopsie-dun-declin.md`
- `manuscrit/03-ceux-qui-vont-vite.md`
- `manuscrit/04-la-contrainte-physique.md`
- `manuscrit/05-limpasse-politique.md`
- `manuscrit/06-la-preuve-par-laction.md`
- `manuscrit/07-la-proposition.md`
- `manuscrit/08-lappel.md`
- `manuscrit/09-epilogue.md`

TAF lire aussi : `TAF.md`
FC lire aussi : `FC.md` + `TIF - Trajectoire Industrielle Française.md` (cahier des charges, chiffres de référence)
AV lire aussi : `AV.md`
LP lire aussi : `LP.md`
CR lire aussi : `CR.md`
CC lire aussi : `CC.md`

### Livrable

Une fois les 6 rapports reçus, consolide-les en un document unique :

```
# Rapport de relecture finale — TIF

## Synthèse exécutive
- X bloquants / X importants / X mineurs

## Bloquants (à corriger avant publication)
...

## Importants (à corriger sauf décision contraire d'Yves)
...

## Mineurs (suggestions, à discuter)
...

## Détail par agent
### TAF — ...
### FC — ...
### LP — ...
### AV — ...
### CR — ...
### CC — ...
```

Présente-moi la synthèse. On corrigera ensemble ensuite.
