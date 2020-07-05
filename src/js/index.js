import '../scss/intro_page/style.scss';
import '../scss/authorization_page/style.scss';
import '../scss/main-page/style.scss';

import menuButtonHandler from './components/nav-menu';
import { menuButtonEvent, events } from './events/events';
import getNewToken from './getNewToken';

menuButtonEvent(menuButtonHandler);

events();

// Первое обновление токена сразу, потом каждые 5 минут
getNewToken();
setInterval(getNewToken, 5 * 60 * 1000);
