import { RSSCHOOL_API_URL, START_SCREEN, LOGIN_PAGE } from './variables.js';
import setDefaultSettings from './getset/setDefaultSettings.js';

const REGISTRATION_EMAIL = document.querySelector('#registration-email');
const REGISTRATION_EMAIL_ERROR = document.querySelector('#email-error');
const REGISTRATION_PASSWORD_ERROR = document.querySelector('#password-error');
const REGISTRATION_PASSWORD = document.querySelector('#registration-password');
const REGISTRATION_BUTTON = document.querySelector('#registration__button');

const VALIDATE_EMAIL = new RegExp('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$');
const VALIDATE_PASSWORD = new RegExp('^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!#$%&? "]).*$');

REGISTRATION_BUTTON.addEventListener('click', (event) => {
  event.preventDefault();

  const newUser = {
    email: REGISTRATION_EMAIL.value,
    password: REGISTRATION_PASSWORD.value,
  };

  if (REGISTRATION_EMAIL.value.length === 0) {
    REGISTRATION_EMAIL_ERROR.textContent = 'Please enter email';
  } else if (!REGISTRATION_EMAIL.value.match(VALIDATE_EMAIL)) {
    REGISTRATION_EMAIL_ERROR.textContent = 'Invalid email';
  } else {
    REGISTRATION_EMAIL_ERROR.textContent = '';
  }

  if (REGISTRATION_PASSWORD.value.length === 0) {
    REGISTRATION_PASSWORD_ERROR.textContent = 'You\'re gonna need a password';
  } else if (!REGISTRATION_PASSWORD.value.match(VALIDATE_PASSWORD)) {
    REGISTRATION_PASSWORD_ERROR.textContent = 'Invalid password';
  } else {
    REGISTRATION_PASSWORD_ERROR.textContent = '';
  }


  createUser(newUser);
});


async function createUser(user) {
  const response = await fetch(`${RSSCHOOL_API_URL}users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (response.status === 417) {
    REGISTRATION_EMAIL_ERROR.textContent = 'This email address is already registered';
  } else if (response.status === 200) {
    START_SCREEN.classList.remove('hide');
    LOGIN_PAGE.classList.add('hide');
    REGISTRATION_EMAIL.value = '';
    REGISTRATION_PASSWORD.value = '';

    setDefaultSettings();

    const data = await response.json();
    window.console.log(data);
  } else {
    window.console.warn(response.statusText);
  }
}
