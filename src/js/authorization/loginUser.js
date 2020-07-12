import {
  RSSCHOOL_API_URL, VALIDATE_EMAIL, VALIDATE_PASSWORD,
} from './variables';

import showMainPage from '../main-page/showMainPage';
import clearContainer from '../clear';
import showBasicLayout from '../showBasicLayout';
import { authorizationLoaderShow, authorizationLoaderHide } from './loader';
import getNewToken from '../getNewToken';

export default function insertLoginUserCode() {
  const AUTHORIZATION_EMAIL = document.querySelector('#authorization-email');
  const AUTHORIZATION_PASSWORD = document.querySelector('#authorization-password');
  const AUTHORIZATION_ERROR = document.querySelector('#authorization-error');
  const AUTHORIZATION_BUTTON = document.querySelector('#authorization__button');
  const AUTHORIZATION_FORM = document.querySelector('#authorization-form');
  const HAVE_ACCOUNT = document.querySelector('#have-account');
  const CREATE_ACCOUNT = document.querySelector('#create-account');

  const ERRORS = {
    wrongEmailOrPassword: 'Неверный email или пароль',
    writeEmailAndPassword: 'Введите email и пароль',
  }

  async function loginUser(user) {
    authorizationLoaderShow();
    const response = await fetch(`${RSSCHOOL_API_URL}signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (response.status === 404) {
      AUTHORIZATION_ERROR.textContent = ERRORS.wrongEmailOrPassword;
      window.console.warn('Wrong email or password');
    } else if (response.status === 200) {
      const data = await response.json();
      HAVE_ACCOUNT.classList.add('hide');
      CREATE_ACCOUNT.classList.remove('hide');

      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('userId', data.userId);

      AUTHORIZATION_FORM.classList.add('hide');
      clearContainer(document.body);
      setInterval(getNewToken, 60 * 60 * 1000);
      showBasicLayout();
      showMainPage();
    } else if (response.status === 403) {
      AUTHORIZATION_ERROR.textContent = ERRORS.wrongEmailOrPassword;
    } else {
      window.console.warn(response);
    }
    authorizationLoaderHide();
  }


  AUTHORIZATION_BUTTON.addEventListener('click', (event) => {
    event.preventDefault();

    const user = {
      email: AUTHORIZATION_EMAIL.value,
      password: AUTHORIZATION_PASSWORD.value,
    };

    if (AUTHORIZATION_EMAIL.value.length === 0 || AUTHORIZATION_PASSWORD.value.length === 0) {
      AUTHORIZATION_ERROR.textContent = ERRORS.writeEmailAndPassword;
    } else if (!AUTHORIZATION_EMAIL.value.match(VALIDATE_EMAIL) || !AUTHORIZATION_PASSWORD.value.match(VALIDATE_PASSWORD)) {
      AUTHORIZATION_ERROR.textContent = ERRORS.wrongEmailOrPassword;
    } else {
      AUTHORIZATION_ERROR.textContent = '';
    }

    if (AUTHORIZATION_EMAIL.value.match(VALIDATE_EMAIL) && AUTHORIZATION_PASSWORD.value.match(VALIDATE_PASSWORD)) {
      loginUser(user);
    }
  });

}