# Jeu de Memory en Vanilla JS

Application web interactive de jeu de mémoire (Memory) développée en JavaScript Vanilla sans framework ni dépendance externe, réalisée en tp.

## Démo en ligne
Le projet est déployé en production via GitHub Pages :  
**[Accéder au Jeu de Memory](https://ouasrihamza.github.io/jeu_memory/)**

## Technologies employées
* **HTML5 sémantique** : Structure du DOM et attributs d'accessibilité (ARIA).
* **CSS3 moderne** : Mise en page via **CSS Grid** pour le plateau de cartes et Flexbox pour les contrôles, thème sombre/bleu ardoise adaptatif.
* **JavaScript ES6+ (Vanilla)** :
  * Manipulation dynamique du DOM (`createElement`, `dataset`, `appendChild`).
  * Littéraux de gabarits (template literals) et Spread Operator (`...`).
  * Programmation asynchrone (`setTimeout`, `setInterval`).

---

## Fonctionnalités & Choix techniques
* **Algorithme de Fisher-Yates** : Mélange impartial et performant du jeu de cartes avec boucle inversée et permutation par déstructuration ES6 en une seule ligne.
* **Gestion d'état et asynchronisme** :
  * Verrouillage du plateau (`lockBoard`) durant l'évaluation des cartes.
  * Masquage automatique des paires erronées après un délai de 800 ms.
* **Sécurités anti-triche** : Barrière de garde prévenant le double clic sur une même carte, les clics répétitifs et l'interaction avec des cartes déjà trouvées.
* **Accessibilité (A11y)** : Ajout des attributs `role="button"` et `tabindex="0"` sur chaque tuile pour la navigation au clavier.
* **Cycle de jeu complet** : Chronomètre précis (`mm:ss`) avec `padStart`, suivi en direct du nombre de coups, bouton de réinitialisation synchrone et message de victoire.

---

## Lancement en local

1. Cloner le dépôt :
   ```bash
   git clone [https://github.com/ouasrihamza/jeu_memory.git](https://github.com/ouasrihamza/jeu_memory.git)