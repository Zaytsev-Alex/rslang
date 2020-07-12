import showMainPage from '../main-page/showMainPage';
import clearContainer from '../clear';
import showBasicLayout from '../showBasicLayout';

export default function showFirstPage(type) {
  const REGISTRATION_FORM = document.querySelector('#registration-form');
  const AUTHORIZATION_FORM = document.querySelector('#authorization-form');
  const CREATE_ACCOUNT = document.querySelector('#create-account');

  if (localStorage.getItem('token')) {
    clearContainer(document.body);
    showBasicLayout();
    showMainPage();
  } else {
    CREATE_ACCOUNT.classList.remove('hide');
    if (type === 'registration') {
    REGISTRATION_FORM.classList.remove('hide');
    }
    if (type === 'autorization') {
      AUTHORIZATION_FORM.classList.remove('hide');
      }
  }
}
