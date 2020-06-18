import {
  REGISTRATION_FORM, AUTHORIZATION_FORM, LOG_OUT_BUTTON, HAVE_ACCOUNT, CREATE_ACCOUNT,
} from './variables';

export default function pageSwitcher() {
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
