// 1. Définition des paramètres de génération d'images
const dimension = 150;
const imgStart = Math.floor(Math.random() * 100) + 1;

// 2. Construction des 8 identifiants d'images uniques
const images = [];
for (let offset = 0; offset < 8; offset++) {
  const currentId = imgStart + offset;
  images.push(`https://picsum.photos/seed/${currentId}/${dimension}/${dimension}`);
}

// 3. Création des paires de cartes (16 cartes) via le spread operator
let cards = [...images, ...images];

// 4. Algorithme de mélange Fisher-Yates (déstructuration ES6 & boucle décroissante)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    // Échange direct sans variable temporaire
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

// Vérification de la logique dans la console
console.log("Jeu de base :", images);
console.log("Cartes dupliquées (16) :", [...cards]);
shuffle(cards);
console.log("Cartes après mélange aléatoire :", cards);