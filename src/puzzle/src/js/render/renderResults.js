/* eslint-disable eqeqeq */
import getWords from '../getset/getWords.js';
import setBackendStat from '../getset/setBackendStat.js';
import { setBackendSettings } from '../getset/getBackendSettings.js';

export default function renderResults() {
  const PUZZLE_PAGE = document.querySelector('.main-page__puzzle');
  const RESULT_PAGE = document.querySelector('.result-page');
  const REFRESH_BUTTON = document.querySelector('#refresh-button');
  const RESULT_CONTINUE_BUTTON = document.querySelector('#result-continue-button');
  const RESULT_STAT_BUTTON = document.querySelector('#result-stat-button');
  const CONTINUE_BUTTON = document.querySelector('#continue-button');
  const DO_NOT_KNOW_BUTTON = document.querySelector('#donotknow-button');
  const DONT_KNOW_LIST = document.querySelector('#i-dont-know-list');
  const KNOW_LIST = document.querySelector('#i-know-list');
  const I_DONT_KNOW_NUMBER = document.querySelector('#i-dont-know__number');
  const I_KNOW_NUMBER = document.querySelector('#i-know__number');
  const STATISTICS_PAGE = document.querySelector('.statistics');
  const ARRAY_I_KNOW = [];
  const ARRAY_I_DONT_KNOW = [];
  let CONTINUE_COUNTER = 0;


  DO_NOT_KNOW_BUTTON.addEventListener('click', () => {
    const ALL_UL = PUZZLE_PAGE.querySelectorAll('ul');

    setTimeout(() => { ARRAY_I_DONT_KNOW.push(ALL_UL[CONTINUE_COUNTER].outerText.replace(/\n/ig, ' ')); }, 0);
  });


  CONTINUE_BUTTON.addEventListener('click', () => {
    const ALL_UL = PUZZLE_PAGE.querySelectorAll('ul');

    CONTINUE_COUNTER += 1;

    if (CONTINUE_COUNTER === 10) {
      CONTINUE_COUNTER = 0;
      showResults();
      setBackendStat(ARRAY_I_KNOW.length, ARRAY_I_DONT_KNOW.length);
      return;
    }

    if (ARRAY_I_DONT_KNOW.indexOf(ALL_UL[CONTINUE_COUNTER - 1].outerText.replace(/\n/ig, ' ')) < 0) {
      setTimeout(() => { ARRAY_I_KNOW.push(ALL_UL[CONTINUE_COUNTER - 1].outerText.replace(/\n/ig, ' ')); }, 0);
    }
  });


  RESULT_CONTINUE_BUTTON.addEventListener('click', () => {
    RESULT_PAGE.classList.add('hide');
    STATISTICS_PAGE.classList.add('hide');

    ARRAY_I_DONT_KNOW.length = 0;
    ARRAY_I_KNOW.length = 0;

    setPlayerLevel();
  });

  RESULT_STAT_BUTTON.addEventListener('click', () => {
    STATISTICS_PAGE.classList.toggle('hide');
  });

  REFRESH_BUTTON.addEventListener('click', () => {
    CONTINUE_COUNTER = 0;
    ARRAY_I_KNOW.length = 0;
    ARRAY_I_DONT_KNOW.length = 0;
  });


  function showResults() {
    RESULT_PAGE.classList.remove('hide');

    renderIDontKnowList();
    renderIKnowList();
  }

  function renderIDontKnowList() {
    DONT_KNOW_LIST.innerHTML = '';

    for (let i = 0; i < ARRAY_I_DONT_KNOW.length; i += 1) {
      const LI = document.createElement('li');
      LI.textContent = ARRAY_I_DONT_KNOW[i];
      DONT_KNOW_LIST.append(LI);
    }

    I_DONT_KNOW_NUMBER.textContent = ARRAY_I_DONT_KNOW.length;
  }

  function renderIKnowList() {
    KNOW_LIST.innerHTML = '';

    for (let i = 0; i < ARRAY_I_KNOW.length; i += 1) {
      const LI = document.createElement('li');
      LI.textContent = ARRAY_I_KNOW[i];
      KNOW_LIST.append(LI);
    }

    I_KNOW_NUMBER.textContent = ARRAY_I_KNOW.length;
  }

  function setPlayerLevel() {
    let ROUND = JSON.parse(localStorage.getItem('player-level'))[0];
    let LEVEL = JSON.parse(localStorage.getItem('player-level'))[1];

    const NUMBER_OF_ROUNDS = document.querySelectorAll('#rounds option').length;

    if (ROUND == NUMBER_OF_ROUNDS && LEVEL == 6) {
      LEVEL = 1;
      ROUND = 1;
      document.querySelector('#groups').value = LEVEL;
      document.querySelector('#rounds').value = ROUND;
    } else if (ROUND == NUMBER_OF_ROUNDS) {
      ROUND = 1;
      LEVEL = +LEVEL + 1;
      document.querySelector('#rounds').value = ROUND;
      document.querySelector('#groups').value = LEVEL;
    } else {
      ROUND = +ROUND + 1;
      document.querySelector('#rounds').value = ROUND;
    }

    localStorage.setItem('player-level', JSON.stringify([ROUND, LEVEL]));
    setBackendSettings();
    getWords();
  }
}
