import '../../scss/puzzle/main.scss';

import renderAllHTML from './render/renderAllHTML';
import pageSwitcher from './pageSwitcher';
import hintsSwitcher from './hintsSwitcher';
import renderResults from './render/renderResults';

export default function puzzle() {
  renderAllHTML();
  pageSwitcher();
  hintsSwitcher();
  renderResults();
}