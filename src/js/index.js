import '../css/style.css';
import '../css/style.scss';

import SprintGame from './SprintGame';

const myGame = new SprintGame(document.querySelector('.container'));
myGame.showPromoPage();