import {
  RSSCHOOL_API_URL, START_SCREEN, LOGIN_PAGE, SIGN_UP_BUTTON, LOG_IN_BUTTON,
  LOG_OUT_BUTTON,
} from './variables.js';

const AUTHORIZATION_EMAIL = document.querySelector('#authorization-email');
const AUTHORIZATION_PASSWORD = document.querySelector('#authorization-password');
const AUTHORIZATION_ERROR = document.querySelector('#authorization-error');
const AUTHORIZATION_BUTTON = document.querySelector('#authorization__button');


AUTHORIZATION_BUTTON.addEventListener('click', (event) => {
  event.preventDefault();

  const user = {
    email: AUTHORIZATION_EMAIL.value,
    password: AUTHORIZATION_PASSWORD.value,
  };

  loginUser(user);
});


export default async function loginUser(user) {
  const response = await fetch(`${RSSCHOOL_API_URL}signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (response.status === 404) {
    AUTHORIZATION_ERROR.textContent = 'Wrong email or password';
    window.console.warn('Wrong email or password');
  } else if (response.status === 200) {
    const data = await response.json();

    SIGN_UP_BUTTON.classList.add('hide');
    LOG_IN_BUTTON.classList.add('hide');
    LOG_OUT_BUTTON.classList.remove('hide');

    START_SCREEN.classList.remove('hide');
    LOGIN_PAGE.classList.add('hide');

    // window.console.log(data);

    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('userPass', JSON.stringify(user));
  } else {
    window.console.warn(response);
  }
}

// loginUser({ email: 'ronic4040@inbox.ru', password: 'Metall4040!' });
