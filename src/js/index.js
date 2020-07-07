import '../scss/intro_page/style.scss';
import '../scss/authorization_page/style.scss';
import '../scss/main-page/style.scss';
import '../scss/audio-call/style.scss';
import '../scss/settings/style.scss';
<<<<<<< HEAD
import '../scss/speakit/style.scss';
=======
import '../scss/sprint/style.scss';
>>>>>>> 12f8782dd322c190f60787396f6961a5b48f36f3

import menuButtonHandler from './components/nav-menu';
import { menuButtonEvent, events } from './events/events';
import getNewToken from './getNewToken';

menuButtonEvent(menuButtonHandler);

events();

getNewToken();
setInterval(getNewToken, 5 * 60 * 1000);
