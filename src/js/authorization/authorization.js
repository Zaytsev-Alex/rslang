
import showFirstPage from './showFirstPage';
import pageSwitcher from './pageSwitcher';
import generateHtml from './generateHTML';
import insertCreateUserCode from './createUser';
import insertLoginUserCode from './loginUser';

function clearHtml() {
  document.body.innerHTML = '';
}

export default function authorization() {
  clearHtml();
  generateHtml();
  insertCreateUserCode();
  insertLoginUserCode();
  showFirstPage();
  pageSwitcher();
}


