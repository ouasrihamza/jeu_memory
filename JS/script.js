// CONFIGURATION & DONNÉES DE BASE (Étape 1) 
const dimension = 150;
const imgStart = Math.floor(Math.random() * 100) + 1;

const images = [];
for (let offset = 0; offset < 8; offset++) {
  const currentId = imgStart + offset;
  images.push(`https://picsum.photos/seed/${currentId}/${dimension}/${dimension}`);
}

let cards = [...images, ...images];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

// RENDU DYNAMIQUE DANS LE DOM (Étape 2)

// Récupération de l'élément conteneur du plateau
const boardElement = document.getElementById("game-board");

function initGame() {
  // 5. Encapsulation : mélange des cartes au lancement de la partie
  shuffle(cards);

  // Sécurité : s'assurer que le plateau est vide avant d'injecter
  boardElement.innerHTML = "";

  // 6. Rendu dynamique via forEach
  cards.forEach((imgUrl) => {
    const cardNode = document.createElement("div");
    cardNode.classList.add("card");

    // 7. Stockage discret de l'URL dans l'attribut data-value
    cardNode.dataset.value = imgUrl;

    // 8. Attributs d'accessibilité (A11y) pour navigation clavier
    cardNode.setAttribute("role", "button");
    cardNode.setAttribute("tabindex", "0");

    // Insertion de la carte sur le plateau
    boardElement.appendChild(cardNode);
  });
}

// Lancement automatique pour afficher les cartes à l'écran
initGame();