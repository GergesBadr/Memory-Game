// Get needed elements
let cardsContainer = document.querySelector(".game");
let cards = Array.from(document.querySelectorAll(".card"));
let movesValue = document.querySelector(".moves-value");
let wrongValue = document.querySelector(".wrong-value");

// set duration
let duration = 1250;

// Shuffle Cards
let orderRange = [...Array(cards.length).keys()];

function shuffleArray(arr) {
  arr.sort(() => Math.random() - 0.5);
  return arr;
}
shuffleArray(orderRange);

cards.forEach((card, index) => {
  card.style.order = orderRange[index];
  card.addEventListener("click", () => {
    flip(card);
  });
});

// Select level
document.querySelector(
  ".overlay"
).style.height = `${document.documentElement.scrollHeight}px`;

let selectLevelPopup = document.querySelector(".select-level");
let levels = document.querySelectorAll(".levels span");

levels.forEach((level) => {
  level.addEventListener("click", (e) => {
    let cardCount = parseInt(level.dataset.count);
    for (let i = 0; i < cards.length; i++) {
      if (i < cardCount) {
        cards[i].style.display = "block";
      } else {
        cards[i].style.display = "none";
      }
    }
    selectLevelPopup.remove();
    document.querySelector(".overlay").style.height = "0";
    cards.forEach((card) => {
      card.classList.add("flipped");
    });
    setTimeout(() => {
      cards.forEach((card) => {
        card.classList.remove("flipped");
      });
    }, 1500);
    localStorage.setItem(`level`, `${parseInt(level.dataset.count)}`);
  });
});

// Filp cards function
function flip(selectedCard) {
  selectedCard.classList.add("flipped");
  let flippedCards = cards.filter((card) => card.classList.contains("flipped"));
  if (flippedCards.length === 2) {
    stopClicking();
    matchedCards(flippedCards[0], flippedCards[1]);
  }
}

// Stop clicking function
function stopClicking() {
  cardsContainer.style.pointerEvents = "none";
  setTimeout(() => {
    cardsContainer.style.pointerEvents = "unset";
  }, duration);
}

// Matched cards function
function matchedCards(firstCard, secondCard) {
  // Increase moves num
  movesValue.innerHTML = parseInt(movesValue.innerHTML) + 1;
  // Handle right attempts
  if (firstCard.dataset.content === secondCard.dataset.content) {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    document.getElementById("success").play();
  }
  // Handle wrong attempts
  else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
    }, duration);
    wrongValue.innerHTML = parseInt(wrongValue.innerHTML) + 1;
    document.getElementById("fail").play();
  }
  // Handle fail
  if (wrongValue.innerHTML == 10) {
    failPopup();
  }
  // Handle success
  let matchedCards = document.querySelectorAll(".matched").length;
  if (matchedCards == localStorage.getItem("level")) {
    successPopup();
  }
}

// popups
function failPopup() {
  setTimeout(() => {
    document.getElementById("fail-end-game").play();
  }, 250);
  document.querySelector(".fail-popup").style.display = "block";
  document.querySelector(".container").style.pointerEvents = "none";
  document.querySelector(
    ".overlay"
  ).style.height = `${document.documentElement.scrollHeight}px`;
  document.querySelector(".fail-span").addEventListener("click", () => {
    location.reload();
  });
}
function successPopup() {
  setTimeout(() => {
    document.getElementById("success-end-game").play();
  }, 250);
  document.querySelector(".success-popup").style.display = "block";
  document.querySelector(
    ".overlay"
  ).style.height = `${document.documentElement.scrollHeight}px`;
  document.querySelector(".success-span").addEventListener("click", () => {
    location.reload();
  });
}
