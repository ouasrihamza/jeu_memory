// --- VARIABLES GLOBALES & ÉLÉMENTS DU DOM ---
const dimension = 150;
const imgStart = Math.floor(Math.random() * 100) + 1;

// Éléments d'interface
const boardElement = document.getElementById("game-board");
const movesDisplay = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const resultDisplay = document.getElementById("result");
const restartBtn = document.getElementById("restart-btn");

// Suivi du jeu
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedCount = 0;

// 14. Variables pour la gestion du chronomètre
let seconds = 0;
let timerInterval = null;

// Préparation des 8 paires de cartes
const images = [];
for (let offset = 0; offset < 8; offset++) {
  const currentId = imgStart + offset;
  images.push(`https://picsum.photos/seed/${currentId}/${dimension}/${dimension}`);
}

let cards = [...images, ...images];

// Algorithme de mélange de Fisher-Yates
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

// 15. Formatage du temps en mm:ss avec padStart
function formatTime(sec) {
  const minutes = String(Math.floor(sec / 60)).padStart(2, "0");
  const remainingSec = String(sec % 60).padStart(2, "0");
  return `${minutes}:${remainingSec}`;
}

// 16. Gestion du chronomètre
function startTimer() {
  // Sécurité pour éviter de cumuler plusieurs intervalles
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    seconds++;
    timerDisplay.textContent = `Temps: ${formatTime(seconds)}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

// Utilitaires de cartes
function revealCard(card) {
  const img = document.createElement("img");
  img.src = card.dataset.value;
  img.alt = "Image carte";
  card.appendChild(img);
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

// 17. Détection de la condition de fin de partie
function checkVictory() {
  if (matchedCount === cards.length) {
    stopTimer();
    resultDisplay.textContent = `Victoire en ${moves} coups et ${formatTime(seconds)} !`;
  }
}

// Logique de validation d'un tour
function checkMatch() {
  const isMatch = firstCard.dataset.value === secondCard.dataset.value;

  if (isMatch) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matchedCount += 2;
    resetTurn();
    checkVictory();
  } else {
    setTimeout(() => {
      firstCard.innerHTML = "";
      secondCard.innerHTML = "";
      resetTurn();
    }, 800);
  }
}

// Gestion des clics avec sécurités
function handleCardClick(card) {
  if (lockBoard || card.classList.contains("matched") || card === firstCard || card.firstChild) {
    return;
  }

  revealCard(card);

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  lockBoard = true;
  moves++;
  movesDisplay.textContent = `Coups: ${moves}`;

  checkMatch();
}

// 18. Initialisation et Reset Synchrone
function initGame() {
  // Réinitialisation des états logiques
  moves = 0;
  matchedCount = 0;
  seconds = 0;
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  // Mise à jour de l'affichage
  movesDisplay.textContent = "Coups: 0";
  timerDisplay.textContent = "Temps: 00:00";
  resultDisplay.textContent = "";

  // Gestion du plateau
  boardElement.innerHTML = "";
  shuffle(cards);

  // Rendu des cartes dans le DOM
  cards.forEach((imgUrl) => {
    const cardNode = document.createElement("div");
    cardNode.classList.add("card");
    cardNode.dataset.value = imgUrl;
    cardNode.setAttribute("role", "button");
    cardNode.setAttribute("tabindex", "0");

    cardNode.addEventListener("click", () => handleCardClick(cardNode));

    boardElement.appendChild(cardNode);
  });

  // Relance du chronomètre
  startTimer();
}

// Liaison du bouton Rejouer et premier lancement
restartBtn.addEventListener("click", initGame);
initGame();