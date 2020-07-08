
import showFirstPage from './showFirstPage';
import pageSwitcher from './pageSwitcher';
import generateHtml from './generateHTML';
import insertCreateUserCode from './createUser';
import insertLoginUserCode from './loginUser';
import clearContainer from '../clear';

export default function authorization() {
  clearContainer(document.body);
  generateHtml();
  insertCreateUserCode();
  insertLoginUserCode();
  pageSwitcher();
  showFirstPage();
}


