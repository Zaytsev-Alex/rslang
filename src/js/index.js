

import '../scss/intro_page/style.scss';

import '../scss/authorization_page/style.scss';

 import menuButtonHandler from './components/nav-menu';

import  {menuButtonEvent, events} from './events/events';

menuButtonEvent(menuButtonHandler);

events();

