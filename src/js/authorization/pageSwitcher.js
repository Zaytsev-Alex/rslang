export default function pageSwitcher() {
  const HAVE_ACCOUNT = document.querySelector('#have-account');
  const REGISTRATION_FORM = document.querySelector('#registration-form');
  const AUTHORIZATION_FORM = document.querySelector('#authorization-form');
  const CREATE_ACCOUNT = document.querySelector('#create-account');
  HAVE_ACCOUNT.addEventListener('click', () => {
    REGISTRATION_FORM.classList.add('hide');
    AUTHORIZATION_FORM.classList.remove('hide');
  });

  CREATE_ACCOUNT.addEventListener('click', () => {
    REGISTRATION_FORM.classList.remove('hide');
    AUTHORIZATION_FORM.classList.add('hide');
  });
}
