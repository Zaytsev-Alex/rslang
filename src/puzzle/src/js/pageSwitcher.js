import {
  MAIN_PAGE, START_SCREEN, LOGIN_PAGE, REGISTRATION_FORM, AUTHORIZATION_FORM,
  START_BUTTON, SIGN_UP_BUTTON, LOG_IN_BUTTON, LOG_OUT_BUTTON, PUZZLE_PAGE,
} from './variables.js';

import getWords from './getset/getWords.js';
import getBackendSettings from './getset/getBackendSettings.js';
import setDefaultSettings from './getset/setDefaultSettings.js';

export default function pageSwitcher() {
  SIGN_UP_BUTTON.addEventListener('click', () => {
    START_SCREEN.classList.add('hide');
    LOGIN_PAGE.classList.remove('hide');

    REGISTRATION_FORM.classList.remove('hide');
    AUTHORIZATION_FORM.classList.add('hide');
  });

  LOG_IN_BUTTON.addEventListener('click', () => {
    START_SCREEN.classList.add('hide');
    LOGIN_PAGE.classList.remove('hide');

    REGISTRATION_FORM.classList.add('hide');
    AUTHORIZATION_FORM.classList.remove('hide');
  });

  LOG_OUT_BUTTON.addEventListener('click', () => {
    SIGN_UP_BUTTON.classList.remove('hide');
    LOG_IN_BUTTON.classList.remove('hide');
    LOG_OUT_BUTTON.classList.add('hide');

    START_SCREEN.classList.add('hide');
    LOGIN_PAGE.classList.remove('hide');
    MAIN_PAGE.classList.add('hide');

    localStorage.clear();
  });

  START_BUTTON.addEventListener('click', () => {
    MAIN_PAGE.classList.remove('hide');
    START_SCREEN.classList.add('hide');
    LOGIN_PAGE.classList.add('hide');
    PUZZLE_PAGE.innerHTML = '';

    try {
      setDefaultSettings();
      getBackendSettings();
      console.log('try pageSwitcher');
    } catch {
      setDefaultSettings();
    }

    getWords(...localStorage.getItem('player-level'));
    [document.querySelector('#rounds').value, document.querySelector('#groups').value] = JSON.parse(localStorage.getItem('player-level'));
  });
}
