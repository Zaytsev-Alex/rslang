import showMainPage from '../main-page/showMainPage';
import clearContainer from '../clear';
import showBasicLayout from '../showBasicLayout';

export default function showFirstPage() {
  const REGISTRATION_FORM = document.querySelector('#registration-form');

  const CREATE_ACCOUNT = document.querySelector('#create-account');

  if (localStorage.getItem('token')) {
    clearContainer(document.body);
    showBasicLayout();
    showMainPage();
  } else {
    CREATE_ACCOUNT.classList.remove('hide');
    REGISTRATION_FORM.classList.remove('hide');
  }
}
