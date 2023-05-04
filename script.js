'use strict';

const rollButton = document.querySelector('.btn-roll');
const holdButton = document.querySelector('.btn-hold');
const newButton = document.querySelector('.btn-new');
const playButton = document.querySelector('.btn-play');
const playAgainButton = document.querySelector('.btn-play-again');
const player1 = document.querySelector('.player-1');
const player2 = document.querySelector('.player-2');
const dice = document.querySelector('.dice');
const overlay = document.querySelector('.overlay');
const winMsg = document.querySelector('.win-msg');
let currentScore = document.getElementById('current-1');
let score1 = document.getElementById('score-1');
let score2 = document.getElementById('score-2');

let diceNum,
  curr = 0,
  total1 = 0,
  total2 = 0,
  name1,
  name2;

const holdPlayer = () => {
  if (player1.classList.contains('player-active')) {
    currentScore.innerText = 0;
    player2.classList.add('player-active');
    player1.classList.remove('player-active');
    currentScore = document.getElementById('current-2');
    total1 += curr;
    score1.textContent = total1;
    curr = 0;
  } else {
    currentScore.innerText = 0;
    player1.classList.add('player-active');
    player2.classList.remove('player-active');
    currentScore = document.getElementById('current-1');
    total2 += curr;
    score2.textContent = total2;
    curr = 0;
  }
  if (total1 >= 100 || total2 >= 100) {
    overlay.classList.remove('hidden');
    document.querySelector('.winning-modal').classList.remove('hidden');
    total1 >= 100
      ? (winMsg.textContent = `${name1} WINS! 🏆`)
      : (winMsg.textContent = `${name2} WINS! 🏆`);
  }
};

rollButton.addEventListener('click', () => {
  diceNum = Math.trunc(Math.random() * 6) + 1;
  if (diceNum === 1) {
    dice.src = 'dice-1.png';
    curr = 0;
    currentScore.innerText = 0;
    holdPlayer();
  } else {
    curr += diceNum;
    currentScore.innerText = curr;
    dice.src = `dice-${diceNum}.png`;
  }
});

newButton.addEventListener('click', () => {
  curr = 0;
  total1 = 0;
  total2 = 0;
  score1.textContent = 0;
  score2.textContent = 0;
  currentScore.innerText = 0;
});

holdButton.addEventListener('click', holdPlayer);

playButton.addEventListener('click', () => {
  name1 = document.querySelector('#input-name-1').value;
  name2 = document.querySelector('#input-name-2').value;
  if (name1 === '' && name2 === '') {
    name1 = 'PLAYER 1';
    name2 = 'PLAYER 2';
  } else if (name1 === '' || name2 === '') {
    alert('Enter valid name!');
    return;
  }
  document.querySelector('#name-1').textContent = name1;
  document.querySelector('#name-2').textContent = name2;
  overlay.classList.add('hidden');
  document.querySelector('.welcome-modal').classList.add('hidden');
});

playAgainButton.addEventListener('click', () => {
  window.location.reload();
});

document.querySelector('keyup', e => {
  if (e.key === 'Enter') playButton.click();
});

document.addEventListener('keyup', e => {
  // console.log(e);
  if (e.key === 'ArrowUp') rollButton.click();
});

document.addEventListener('keyup', e => {
  // console.log(e);
  if (e.key === 'ArrowDown') holdButton.click();
});
