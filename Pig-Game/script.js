'use strict';
const score1 = document.querySelector('#score--0');
const score2 = document.querySelector('#score--1');
const dice = document.querySelector('.dice');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
let player1current = document.querySelector('#current--0');
let player2current = document.querySelector('#current--1');
let currentScore = 0;
score1.textContent = 0;
score2.textContent = 0;
const newGame = document.querySelector('.btn--new');
dice.classList.add('hidden');
let activePlayer = 0;
let scores = [0, 0];
document.querySelector('.player--0').classList.add('player--active');

document.querySelector('.player--0').classList.remove('lost');
document.querySelector('.player--1').classList.remove('lost');
document.querySelector('#name--0').innerHTML = 'Player 1';
document.querySelector('#name--1').innerHTML = 'Player 2';

let playing = true;
const rollDice = function () {
  if (playing) {
    // Rolling the random number
    const rnd = Math.floor(Math.random() * 6 + 1);
    // console.log(rnd);
    // Adding the dice visualization
    dice.classList.remove('hidden');
    dice.src = `dice-${rnd}.png`;
    // Switching players (player 1)
    if (activePlayer === 0) {
      if (rnd !== 1) {
        currentScore += rnd;
        player1current.textContent = currentScore;
      } else if (rnd === 1) {
        document.querySelector('.player--0').classList.remove('player--active');
        document.querySelector('.player--1').classList.add('player--active');
        player1current.textContent = 0;
        currentScore = 0;
        activePlayer++;
      }
      // Switching players (player 2)
    } else if (activePlayer === 1) {
      if (rnd !== 1) {
        currentScore += rnd;
        player2current.textContent = currentScore;
      } else if (rnd === 1) {
        document.querySelector('.player--1').classList.remove('player--active');
        document.querySelector('.player--0').classList.add('player--active');
        player2current.textContent = 0;
        currentScore = 0;
        activePlayer--;
      }
    }
  }
};
document.querySelector('.btn--roll').addEventListener('click', rollDice);

document.querySelector('.btn--hold').addEventListener('click', function () {
  if (playing) {
    if (activePlayer === 0) {
      document.querySelector('.player--0').classList.remove('player--active');
      document.querySelector('.player--1').classList.add('player--active');
      scores[0] += currentScore;
      score1.textContent = scores[0];
      currentScore = 0;
      player1current.textContent = 0;
      activePlayer++;
    } else if (activePlayer === 1) {
      document.querySelector('.player--1').classList.remove('player--active');
      document.querySelector('.player--0').classList.add('player--active');
      scores[1] += currentScore;
      score2.textContent = scores[1];
      currentScore = 0;
      player2current.textContent = 0;
      activePlayer--;
    }
    if (scores[0] >= 100) {
      playing = false;
      document.querySelector('.player--0').classList.add('player--winner');
      document.querySelector('.player--0').classList.remove('player--active');
      document.querySelector('.player--1').classList.add('lost');
      document.querySelector('#name--0').innerHTML = 'Winner!';
      playing = false;
      dice.classList.add('hidden');
      roll.classList.add('hidden');
      hold.classList.add('hidden');
    } else if (scores[1] >= 100) {
      playing = false;
      document.querySelector('.player--1').classList.add('player--winner');
      document.querySelector('.player--1').classList.remove('player--active');
      document.querySelector('.player--0').classList.add('lost');
      document.querySelector('#name--1').innerHTML = 'Winner!';
      playing = false;
      dice.classList.add('hidden');
      roll.classList.add('hidden');
      hold.classList.add('hidden');
    }
  }
});
newGame.addEventListener('click', function () {
  roll.classList.remove('hidden');
  hold.classList.remove('hidden');
  document.querySelector('#name--0').innerHTML = 'Player 1';
  document.querySelector('#name--1').innerHTML = 'Player 2';
  currentScore = 0;
  scores = [0, 0];
  dice.classList.add('hidden');
  score1.textContent = 0;
  score2.textContent = 0;
  player1current.textContent = 0;
  player2current.textContent = 0;
  activePlayer = 0;
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');

  document.querySelector('.player--0').classList.remove('lost');
  document.querySelector('.player--1').classList.remove('lost');

  playing = true;
});
