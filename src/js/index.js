import '../sass/style.scss';

import './createUser';
import './loginUser';

import showFirstPage from './showFirstPage';
import pageSwitcher from './pageSwitcher';

window.addEventListener('load', () => {
  showFirstPage();
  pageSwitcher();
});