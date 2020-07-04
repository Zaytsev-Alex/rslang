import './sass/main.scss';

import renderAllHTML from './js/render/renderAllHTML.js';
import pageSwitcher from './js/pageSwitcher.js';
import hintsSwitcher from './js/hintsSwitcher.js';
import renderResults from './js/render/renderResults.js';

window.addEventListener('load', () => {
  renderAllHTML();
  pageSwitcher();
  hintsSwitcher();
  renderResults();
});
