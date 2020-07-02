export default function pageSwitcher() {
  const HAVE_ACCOUNT = document.querySelector('#have-account');
  const REGISTRATION_FORM = document.querySelector('#registration-form');
  const AUTHORIZATION_FORM = document.querySelector('#authorization-form');
  const CREATE_ACCOUNT = document.querySelector('#create-account');
  const LOG_OUT_BUTTON = document.querySelector('#log-out-button');

  HAVE_ACCOUNT.addEventListener('click', () => {
    REGISTRATION_FORM.classList.add('hide');
    AUTHORIZATION_FORM.classList.remove('hide');
  });

  CREATE_ACCOUNT.addEventListener('click', () => {
    REGISTRATION_FORM.classList.remove('hide');
    AUTHORIZATION_FORM.classList.add('hide');
  });

  LOG_OUT_BUTTON.addEventListener('click', () => {
    LOG_OUT_BUTTON.classList.add('hide');
    AUTHORIZATION_FORM.classList.remove('hide');

    localStorage.clear();
  });
}
