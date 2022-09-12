const word = document.getElementById('word');
const incorrect = document.getElementById('incorrect');
const incorrectLettersEl = document.querySelector('#incorrect p');
const backdrop = document.getElementById('backdrop');
const finalMsg = document.getElementById('final-msg');
const msgInfo = document.getElementById('msg-info');
const playBtn = document.getElementById('play');
const indication = document.getElementById('indication');
const bodyParts = document.getElementsByClassName('body-part');

// Lista de palabras
const wordList = [
  'mercado',
  'golpear',
  'sonrisa',
  'invierno',
  'moneda',
  'lanzar',
  'silencio',
  'pokemon',
  'avalancha',
  'escalar',
  'mentir',
  'volcan',
  'cabra',
  'uvas',
  'zanahoria',
  'carro',
  'colombia',
  'burbuja',
  'ventana',
  'raton',
  'otorinonaringologia',
  'cielo',
  'caliente',
  'frio',
  'rio',
  'cancion',
  'oracle',
  'azul',
  'amarillo',
  'rata',
];


let selectedWord = null;

let incorrectCount = 0;

const correctLetters = [];

const incorrectLetters = [];


function initializeWord() {
  selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
  const noOfLetters = selectedWord.length;
  for (let i = 0; i < noOfLetters; i++) {
    const listItem = document.createElement('li');
    listItem.classList.add('letter');
    word.append(listItem);
  }
}


function displayIndication() {
  indication.classList.add('visible');

  setTimeout(() => {
    indication.classList.remove('visible');
  }, 2400);
}


function updateFigure() {
  try {
    bodyParts[incorrectCount].style.display = 'block';
    incorrectCount++;
  } catch (error) {}
}


function successState() {
  setTimeout(() => {
    backdrop.classList.add('visible');
    finalMsg.classList.add('visible');
    msgInfo.textContent = '¡¡FELICIDADES GANASTE!!';
  }, 400);
}


function failureState() {
  setTimeout(() => {
    backdrop.classList.add('visible');
    finalMsg.classList.add('visible');
    msgInfo.textContent = `¡¡PERDISTE EL JUEGO TERMINO!! la palabra correcta era "${selectedWord}"`;
  }, 400);
}


function check(ev) {
  const letterElements = document.querySelectorAll('.word .letter');
  const character = ev.key;

  
  if (
    !backdrop.classList.contains('visible') &&
    !indication.classList.contains('visible') &&
    ev.keyCode >= 65 &&
    ev.keyCode <= 90
  ) {
    if (selectedWord.includes(character)) {
      if (correctLetters.includes(character)) {
        displayIndication();
      } else {
        correctLetters.push(character);
        const indexes = [];
        [...selectedWord].forEach((value, index) => {
          if (value === character) {
            indexes.push(index);
          }
        });
        indexes.forEach((value) => {
          letterElements[value].textContent = character;
        });
      }
    } else {
      if (incorrectLetters.includes(character)) {
        displayIndication();
      } else {
        incorrectLetters.push(character);
        if (!incorrect.classList.contains('visible')) {
          incorrect.classList.add('visible');
        }
        incorrectLettersEl.textContent = `${incorrectLetters.join(', ')}`;
        updateFigure();
      }
    }
  }

  
  let formedWord = '';
  letterElements.forEach((value) => {
    formedWord += value.textContent;
  });

  if (formedWord === selectedWord) {
    successState();
  }

  
  if (incorrectCount >= 6) {
    failureState();
  }
}


function startNewGame() {
  selectedWord = null;
  incorrectCount = 0;
  correctLetters.splice(0);
  incorrectLetters.splice(0);
  word.innerHTML = '';
  Array.from(bodyParts).forEach((value) => {
    value.style.display = 'none';
  });
  incorrect.classList.remove('visible');
  backdrop.classList.remove('visible');
  finalMsg.classList.remove('visible');
  initializeWord();
}


initializeWord();


window.addEventListener('keyup', check);
playBtn.addEventListener('click', startNewGame);