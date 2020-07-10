import '../scss/intro_page/style.scss';
import '../scss/authorization_page/style.scss';
import '../scss/main-page/style.scss';
import '../scss/audio-call/style.scss';
import '../scss/settings/style.scss';
import '../scss/statistics/style.scss';
import '../scss/sprint/style.scss';

import menuButtonHandler from './components/nav-menu';
import { menuButtonEvent, events } from './events/events';
import getNewToken from './getNewToken';
import clearContainer from './clear';
import showBasicLayout from './showBasicLayout';
import showMainPage from './main-page/showMainPage';

menuButtonEvent(menuButtonHandler);

events();

getNewToken();
setInterval(getNewToken, 5 * 60 * 1000);

if (localStorage.getItem('token') && localStorage.getItem('userId')) {
    clearContainer(document.body);
    showBasicLayout();
    showMainPage();
}