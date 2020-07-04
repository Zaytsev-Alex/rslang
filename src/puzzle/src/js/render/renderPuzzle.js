import renderTextTranslate from './renderTextTranslate.js';
import audio from '../audio.js';
import dragdrop from '../gragdrop.js';

let PUZZLE_PAGE;
let CURRENT_STRING;
let CHECK_BUTTON;
let DO_NOT_KNOW_BUTTON;

const ALL_CORRECT_PHRASES = [];
const ALL_RANDOM_PHRASES = [];
const ALL_TRANSLATE_PHRASES = [];
const ALL_AUDIO_LINKS = [];

let PHRASE_ARRAY = '';
let PHRASE_RANDOM_ARRAY = '';
let NUMBER_STRING = 0;
let CONTINUE_COUNTER = 0;
let CRUTCH = 0;
let CRUTCH_2 = 0;

export default function renderPuzzle(data) {
  PUZZLE_PAGE = document.querySelector('.main-page__puzzle');
  DO_NOT_KNOW_BUTTON = document.querySelector('#donotknow-button');

  const SELECTED_ROUND = document.querySelector('#rounds').value;
  let increase;

  if ((SELECTED_ROUND - 1) % 2 === 0) {
    increase = 0;
  } else {
    increase = 10;
  }

  for (let i = increase; i < increase + 10; i += 1) {
    const UL = document.createElement('ul');
    UL.className = `phrase phrase-${i}`;
    UL.style.height = `${PUZZLE_PAGE.clientHeight / 10}px`;
    PUZZLE_PAGE.append(UL);

    if (ALL_CORRECT_PHRASES.length > 9) {
      ALL_CORRECT_PHRASES.length = 0;
    }

    if (ALL_RANDOM_PHRASES.length > 9) {
      ALL_RANDOM_PHRASES.length = 0;
    }

    if (ALL_TRANSLATE_PHRASES.length > 9) {
      ALL_TRANSLATE_PHRASES.length = 0;
    }

    if (ALL_AUDIO_LINKS.length > 9) {
      ALL_AUDIO_LINKS.length = 0;
    }

    PHRASE_ARRAY = data[i].textExample.split(' ');
    ALL_CORRECT_PHRASES.push(data[i].textExample.split(' '));

    PHRASE_RANDOM_ARRAY = PHRASE_ARRAY.sort(() => 0.5 - Math.random());
    ALL_RANDOM_PHRASES.push(PHRASE_RANDOM_ARRAY);

    ALL_TRANSLATE_PHRASES.push(data[i].textExampleTranslate);
    ALL_AUDIO_LINKS.push(data[i].audioExample);
  }

  DO_NOT_KNOW_BUTTON.classList.remove('hide');
  renderCurrentString();

  if (CRUTCH === 0) {
    clickButtons();
    CRUTCH += 1;
  }
}


function renderCurrentString() {
  CURRENT_STRING = document.querySelector('.current-string');
  CHECK_BUTTON = document.querySelector('#check-button');

  for (let i = 0; i < ALL_RANDOM_PHRASES[NUMBER_STRING].length; i += 1) {
    const LI = document.createElement('li');
    LI.className = 'puzzle-item';
    LI.innerHTML = ALL_RANDOM_PHRASES[NUMBER_STRING][i];
    LI.style.height = `${PUZZLE_PAGE.clientHeight / 10}px`;
    LI.style.width = `${PUZZLE_PAGE.clientWidth / ALL_RANDOM_PHRASES[NUMBER_STRING].length}px`;
    CURRENT_STRING.append(LI);
  }

  CURRENT_STRING.addEventListener('click', (event) => {
    const ALL_UL = PUZZLE_PAGE.querySelectorAll('ul');

    if (event.target.classList.contains('puzzle-item')) {
      event.target.classList.add('drag-el');
      event.target.setAttribute('draggable', 'true');
      ALL_UL[NUMBER_STRING].classList.add('drag-zone');
      ALL_UL[NUMBER_STRING].append(event.target.closest('.puzzle-item'));
    }

    if (CURRENT_STRING.innerHTML === '' && CRUTCH_2 === 0) {
      CHECK_BUTTON.classList.remove('hide');
      dragdrop();
      CRUTCH_2 += 1;
    }
  });

  renderTextTranslate(ALL_TRANSLATE_PHRASES[NUMBER_STRING]);
  audio(ALL_AUDIO_LINKS[NUMBER_STRING]);
}


export function clickButtons() {
  const REFRESH_BUTTON = document.querySelector('#refresh-button');
  const CONTINUE_BUTTON = document.querySelector('#continue-button');

  CHECK_BUTTON.addEventListener('click', () => {
    const ARRAY_FOR_CHECK = [];
    const ALL_LI_ON_PAGE = PUZZLE_PAGE.querySelectorAll(`ul:nth-child(${NUMBER_STRING + 1}) li`);

    ALL_LI_ON_PAGE.forEach((li) => {
      ARRAY_FOR_CHECK.push(li.innerHTML);
    });

    for (let i = 0; i < ARRAY_FOR_CHECK.length; i += 1) {
      if (ARRAY_FOR_CHECK[i] === ALL_CORRECT_PHRASES[NUMBER_STRING][i]) {
        ALL_LI_ON_PAGE[i].classList.add('puzzle-item_correct');
        ALL_LI_ON_PAGE[i].classList.remove('puzzle-item_wrong');
      } else {
        ALL_LI_ON_PAGE[i].classList.add('puzzle-item_wrong');
        ALL_LI_ON_PAGE[i].classList.remove('puzzle-item_correct');
      }
    }

    if (ARRAY_FOR_CHECK.join('') === ALL_CORRECT_PHRASES[NUMBER_STRING].join('')) {
      CONTINUE_BUTTON.classList.remove('hide');
      CHECK_BUTTON.classList.add('hide');
      DO_NOT_KNOW_BUTTON.classList.add('hide');
    }
  });


  CONTINUE_BUTTON.addEventListener('click', () => {
    const PICTURE_TITLE = document.querySelector('.picture-title');

    CRUTCH_2 = 0;
    CONTINUE_COUNTER += 1;
    if (CONTINUE_COUNTER === 10) {
      PUZZLE_PAGE.innerHTML = '';
      CONTINUE_COUNTER = 0;
      NUMBER_STRING = 0;
      CONTINUE_BUTTON.classList.add('hide');
      PICTURE_TITLE.classList.remove('hide');
      return;
    }

    NUMBER_STRING += 1;
    CURRENT_STRING.innerHTML = '';
    CONTINUE_BUTTON.classList.add('hide');
    CHECK_BUTTON.classList.add('hide');
    DO_NOT_KNOW_BUTTON.classList.remove('hide');

    PUZZLE_PAGE.querySelectorAll('.phrase').forEach((phrase) => {
      phrase.classList.remove('drag-zone');
    });

    PUZZLE_PAGE.querySelectorAll('.drag-el').forEach((item) => {
      item.classList.remove('drag-el');
      item.removeAttribute('draggable');
    });

    renderCurrentString();
  });


  DO_NOT_KNOW_BUTTON.addEventListener('click', () => {
    const ALL_UL = PUZZLE_PAGE.querySelectorAll('ul');

    CURRENT_STRING.innerHTML = '';
    ALL_UL[NUMBER_STRING].innerHTML = '';

    CHECK_BUTTON.classList.remove('hide');
    DO_NOT_KNOW_BUTTON.classList.add('hide');

    for (let i = 0; i < ALL_CORRECT_PHRASES[NUMBER_STRING].length; i += 1) {
      const LI = document.createElement('li');
      LI.className = 'puzzle-item drag-el';
      LI.setAttribute('draggable', 'true');
      LI.innerHTML = ALL_CORRECT_PHRASES[NUMBER_STRING][i];
      LI.style.height = `${PUZZLE_PAGE.clientHeight / 10}px`;
      LI.style.width = `${PUZZLE_PAGE.clientWidth / ALL_CORRECT_PHRASES[NUMBER_STRING].length}px`;
      ALL_UL[NUMBER_STRING].classList.add('drag-zone');
      ALL_UL[NUMBER_STRING].append(LI);
    }

    dragdrop();
  });


  REFRESH_BUTTON.addEventListener('click', () => {
    NUMBER_STRING = 0;
    CONTINUE_COUNTER = 0;
  });
}
