import showFirstPage from './showFirstPage';
import pageSwitcher from './pageSwitcher';
import generateHtml from './generateHTML';
import insertCreateUserCode from './createUser';
import insertLoginUserCode from './loginUser';
import clearContainer from '../clear';

export default function authorization(type) {
  clearContainer(document.body);
  generateHtml(type);
  insertCreateUserCode();
  insertLoginUserCode();
  pageSwitcher();
  showFirstPage(type);

}