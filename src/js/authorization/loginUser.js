import {
  RSSCHOOL_API_URL, HAVE_ACCOUNT, CREATE_ACCOUNT, LOG_OUT_BUTTON, AUTHORIZATION_FORM,
} from './variables';

const AUTHORIZATION_EMAIL = document.querySelector('#authorization-email');
const AUTHORIZATION_PASSWORD = document.querySelector('#authorization-password');
const AUTHORIZATION_ERROR = document.querySelector('#authorization-error');
const AUTHORIZATION_BUTTON = document.querySelector('#authorization__button');

async function loginUser(user) {
  const response = await fetch(`${RSSCHOOL_API_URL}signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (response.status === 404) {
    AUTHORIZATION_ERROR.textContent = 'Неверный email или пароль';
    window.console.warn('Wrong email or password');
  } else if (response.status === 200) {
    const data = await response.json();

    HAVE_ACCOUNT.classList.add('hide');
    CREATE_ACCOUNT.classList.remove('hide');

    window.console.log(data);

    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.userId);

    LOG_OUT_BUTTON.classList.remove('hide');
    AUTHORIZATION_FORM.classList.add('hide');
  } else {
    window.console.warn(response);
  }
}

AUTHORIZATION_BUTTON.addEventListener('click', (event) => {
  event.preventDefault();

  const user = {
    email: AUTHORIZATION_EMAIL.value,
    password: AUTHORIZATION_PASSWORD.value,
  };  

  loginUser(user);
});
