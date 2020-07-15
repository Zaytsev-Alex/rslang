import getWords from './getset/getWords';
import getBackendSettings from './getset/getBackendSettings';
import setDefaultSettings from './getset/setDefaultSettings';

export default function pageSwitcher() {
  const MAIN_PAGE = document.querySelector('.puzzle-main-page');
  const PUZZLE_PAGE = document.querySelector('.puzzle-main-page__puzzle');
  const START_SCREEN = document.querySelector('.start-screen');
  const START_BUTTON = document.querySelector('.start-screen__button');

  START_BUTTON.addEventListener('click', () => {
    document.querySelector('#puzzle').classList.remove('puzzle_full-screen');
    MAIN_PAGE.classList.remove('hide');
    START_SCREEN.classList.add('hide');
    PUZZLE_PAGE.innerHTML = '';

    try {
      setDefaultSettings();
      getBackendSettings();
    } catch (e) {
      setDefaultSettings();
    }

    getWords(...localStorage.getItem('player-level'));
    [document.querySelector('#rounds').value, document.querySelector('#groups').value] = JSON.parse(localStorage.getItem('player-level'));
  });
}
