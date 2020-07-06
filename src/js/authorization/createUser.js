import {
  RSSCHOOL_API_URL, VALIDATE_EMAIL, VALIDATE_PASSWORD,
} from './variables';

import showMainPage from '../main-page/showMainPage';
import clearContainer from '../clear';
import showBasicLayout from '../showBasicLayout';
import { authorizationLoaderShow, authorizationLoaderHide } from './loader';

export default function insertCreateUserCode() {

  const REGISTRATION_FORM = document.querySelector('#registration-form');;
  const REGISTRATION_EMAIL = document.querySelector('#registration-email');
  const REGISTRATION_EMAIL_ERROR = document.querySelector('#email-error');
  const REGISTRATION_PASSWORD_ERROR = document.querySelector('#password-error');
  const REGISTRATION_PASSWORD = document.querySelector('#registration-password');
  const REGISTRATION_BUTTON = document.querySelector('#registration__button');


  const ERRORS = {
    alreadyReg: 'Email уже зарегистрирован',
    writeEmail: 'Введите email',
    wrongEmail: 'Некорректный email',
    writePassword: 'Введите пароль',
    rulesPassword: 'Пароль должен содержать не менее 8 символов, как минимум одну прописную букву, одну заглавную букву, одну цифру и один спецсимвол',
  }

  async function createUser(user) {
    authorizationLoaderShow();
    const response = await fetch(`${RSSCHOOL_API_URL}users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (response.status === 417) {
      REGISTRATION_EMAIL_ERROR.textContent = ERRORS.alreadyReg;
    } else if (response.status === 200) {
      
      const loginResponse = await fetch(`${RSSCHOOL_API_URL}signin`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (loginResponse.status === 404) {
        window.console.warn('Wrong email or password');
      } else if (loginResponse.status === 200) {
        const data = await loginResponse.json();

        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);

        clearContainer(document.body);
        showBasicLayout();
        showMainPage();

    } else {
      window.console.warn(response);
    }

      REGISTRATION_EMAIL.value = '';
      REGISTRATION_PASSWORD.value = '';

      REGISTRATION_FORM.classList.add('hide');
    } else {
      window.console.warn(response.statusText);
    }

    authorizationLoaderHide();
  }
  
  REGISTRATION_BUTTON.addEventListener('click', (event) => {
    event.preventDefault();

    const newUser = {
      email: REGISTRATION_EMAIL.value,
      password: REGISTRATION_PASSWORD.value,
    };

    if (REGISTRATION_EMAIL.value.length === 0) {
      REGISTRATION_EMAIL_ERROR.textContent = ERRORS.writeEmail;
    } else if (!REGISTRATION_EMAIL.value.match(VALIDATE_EMAIL)) {
      REGISTRATION_EMAIL_ERROR.textContent = ERRORS.wrongEmail;
    } else {
      REGISTRATION_EMAIL_ERROR.textContent = '';
    }

    if (REGISTRATION_PASSWORD.value.length === 0) {
      REGISTRATION_PASSWORD_ERROR.textContent = ERRORS.writePassword;
    } else if (!REGISTRATION_PASSWORD.value.match(VALIDATE_PASSWORD)) {
      REGISTRATION_PASSWORD_ERROR.textContent = ERRORS.rulesPassword;
    } else {
      REGISTRATION_PASSWORD_ERROR.textContent = '';
    }

    if (REGISTRATION_EMAIL.value.match(VALIDATE_EMAIL) && REGISTRATION_PASSWORD.value.match(VALIDATE_PASSWORD)) {
      createUser(newUser);
    }
  });
}