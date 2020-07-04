import getWords from './getset/getWords.js';
import getBackendSettings from './getset/getBackendSettings.js';
import setDefaultSettings from './getset/setDefaultSettings.js';

export default function pageSwitcher() {
  const MAIN_PAGE = document.querySelector('.main-page');
  const PUZZLE_PAGE = document.querySelector('.main-page__puzzle');
  const START_SCREEN = document.querySelector('.start-screen');
  const START_BUTTON = document.querySelector('.start-screen__button');

  START_BUTTON.addEventListener('click', () => {
    MAIN_PAGE.classList.remove('hide');
    START_SCREEN.classList.add('hide');
    PUZZLE_PAGE.innerHTML = '';

    try {
      setDefaultSettings();
      getBackendSettings();
    } catch {
      setDefaultSettings();
    }

    getWords(...localStorage.getItem('player-level'));
    [document.querySelector('#rounds').value, document.querySelector('#groups').value] = JSON.parse(localStorage.getItem('player-level'));
  });
}
