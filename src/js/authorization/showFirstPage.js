export default function showFirstPage() {
  const REGISTRATION_FORM = document.querySelector('#registration-form');

  const CREATE_ACCOUNT = document.querySelector('#create-account');
 const LOG_OUT_BUTTON = document.querySelector('#log-out-button');
  if (localStorage.getItem('token')) {
    LOG_OUT_BUTTON.classList.remove('hide');
  } else {
    CREATE_ACCOUNT.classList.remove('hide');
    REGISTRATION_FORM.classList.remove('hide');
  }
}
