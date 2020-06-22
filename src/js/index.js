import '../css/style.css';
import '../css/style.scss';

import SprintGame from './SprintGame';

const myGame = new SprintGame(document.querySelector('.container'), '5ef0e9f1aa245e0017a56eb0', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZjBlOWYxYWEyNDVlMDAxN2E1NmViMCIsImlhdCI6MTU5Mjg0Njg2OCwiZXhwIjoxNTkyODYxMjY4fQ.7lNlEKsLBGq8EXZ7CLFQ4gAjY0nQg_jB0L0mvYZKAog');
myGame.showPromoPage();