import {
  CREATE_ACCOUNT, LOG_OUT_BUTTON, REGISTRATION_FORM,
} from './variables';

export default function showFirstPage() {
  if (localStorage.getItem('token')) {
    LOG_OUT_BUTTON.classList.remove('hide');
  } else {
    CREATE_ACCOUNT.classList.remove('hide');
    REGISTRATION_FORM.classList.remove('hide');
  }
}
