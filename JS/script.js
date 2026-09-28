// --- VARIABLES GLOBALES & ÉTAT DU JEU ---
const dimension = 150;
const imgStart = Math.floor(Math.random() * 100) + 1;

// Éléments du DOM
const boardElement = document.getElementById("game-board");
const movesDisplay = document.getElementById("moves");

// 9. Variables d'état du jeu (scope global)
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedCount = 0;

// Génération des URLs Picsum
const images = [];
for (let offset = 0; offset < 8; offset++) {
  const currentId = imgStart + offset;
  images.push(`https://picsum.photos/seed/${currentId}/${dimension}/${dimension}`);
}

// Tableau des 16 cartes
let cards = [...images, ...images];

// Algorithme de mélange Fisher-Yates
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

// Fonction utilitaire pour afficher l'image d'une carte
function revealCard(card) {
  const img = document.createElement("img");
  img.src = card.dataset.value;
  img.alt = "Image carte";
  card.appendChild(img);
}

// Réinitialisation des pointeurs de tour
function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

// 13. Comparaison logique et gestion asynchrone
function checkMatch() {
  const isMatch = firstCard.dataset.value === secondCard.dataset.value;

  if (isMatch) {
    // Paire trouvée : on fige les cartes
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matchedCount += 2;
    resetTurn();
  } else {
    // Échec : délai de 800 ms avant de masquer les images
    setTimeout(() => {
      firstCard.innerHTML = "";
      secondCard.innerHTML = "";
      resetTurn();
    }, 800);
  }
}

// 11 & 12. Gestion des clics sur les cartes
function handleCardClick(card) {
  // Garde de sécurité : blocage des actions illégales
  if (lockBoard || card.classList.contains("matched") || card === firstCard || card.firstChild) {
    return;
  }

  // Révélation visuelle de la carte cliquée
  revealCard(card);

  // Premier clic du tour
  if (!firstCard) {
    firstCard = card;
    return;
  }

  // Deuxième clic du tour
  secondCard = card;
  lockBoard = true;
  moves++;
  movesDisplay.textContent = `Coups: ${moves}`;

  checkMatch();
}

// --- INITIALISATION DU PLATEAU ---
function initGame() {
  shuffle(cards);
  boardElement.innerHTML = "";

  cards.forEach((imgUrl) => {
    const cardNode = document.createElement("div");
    cardNode.classList.add("card");
    cardNode.dataset.value = imgUrl;

    // Attributs d'accessibilité
    cardNode.setAttribute("role", "button");
    cardNode.setAttribute("tabindex", "0");

    // 10. Écouteur d'événement au clic
    cardNode.addEventListener("click", () => handleCardClick(cardNode));

    boardElement.appendChild(cardNode);
  });
}

// Lancement au chargement
initGame();