"use strict";

const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const currentScore1El = document.querySelector("#current--0");
const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");
const currentScore2El = document.querySelector("#current--1");
// condition
let score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  const randomDice = Math.trunc(Math.random() * 6) + 1;
  const diceImg = document.querySelector(".dice");
  diceEl.classList.remove("hidden");
  diceImg.src = `img/dice-${randomDice}.png`;

  if (randomDice !== 1) {
    currentScore += randomDice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
});

const scoreHold = function () {
  score[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    score[activePlayer];
  if (score[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
    diceEl.classList.add("hidden");
    btnRoll.setAttribute("disabled", "disabled");
    btnHold.setAttribute("disabled", "disabled");
  } else {
    switchPlayer();
  }
  // switch player
};

btnHold.addEventListener("click", scoreHold);

const restartGame = function () {
  activePlayer = 0;
  score = [0, 0];
  currentScore = 0;
  btnRoll.removeAttribute("disabled", "disabled");
  btnHold.removeAttribute("disabled", "disabled");
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore1El.textContent = 0;
  currentScore2El.textContent = 0;
  player1.classList.remove("player--winner");
  player2.classList.remove("player--winner");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
};

btnNew.addEventListener("click", restartGame);
