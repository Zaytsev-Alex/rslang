
import '../scss/style.scss';

import menuButtonHandler from './components/nav-menu';

import  menuButtonEvent from './events/events';

import authorization from './authorization/authorization';

menuButtonEvent(menuButtonHandler);


authorization();

