
import showFirstPage from './showFirstPage';
import pageSwitcher from './pageSwitcher';
import generateHtml from './generateHTML';
import insertCreateUserCode from './createUser';
import insertLoginUserCode from './loginUser';


export default function authorization() {
  generateHtml();
  insertCreateUserCode();
  insertLoginUserCode();
  showFirstPage();
  pageSwitcher();
}


