import '../scss/style.scss';

import generateHTML from './authorization/generateHTML';


import menuButtonHandler from './components/nav-menu';

import  menuButtonEvent from './events/events';

menuButtonEvent(menuButtonHandler);

document.querySelector('.start-learning__link').addEventListener('click', () => {
  generateHTML();

  
});