import '../scss/intro_page/style.scss';
import '../scss/authorization_page/style.scss';
import '../scss/main-page/style.scss';
import '../scss/audio-call/style.scss';
import '../scss/settings/style.scss';
import '../scss/statistics/style.scss';
import '../scss/sprint/style.scss';
import '../scss/spacedRepetition/style.scss';
import '../scss/vocabulary/style.scss'
import '../scss/speakIt/style.scss'
import {
    events
} from './events/events';
import clearContainer from './clear';
import showBasicLayout from './showBasicLayout';
import showMainPage from './main-page/showMainPage';
import getNewToken from './getNewToken'
import createIntoPage from './into-page/introPage';

if (localStorage.getItem('token') && localStorage.getItem('userId')) {    
    setInterval(getNewToken, 50 * 60 * 1000);
    clearContainer(document.body);
    showBasicLayout();
    showMainPage();
}
else {
    createIntoPage();
    
}

events();







