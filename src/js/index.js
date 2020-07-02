
import '../scss/intro_page/style.scss';

import '../scss/authorization_page/style.scss';

import menuButtonHandler from './components/nav-menu';

import  menuButtonEvent from './events/events';

import authorization from './authorization/authorization';

menuButtonEvent(menuButtonHandler);


document.querySelector('.start-learning__link').addEventListener('click', authorization);

