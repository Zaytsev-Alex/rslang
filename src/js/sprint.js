import '../css/style.css';
import '../css/style.scss';

import SprintGame from './SprintGame';

const myGame = new SprintGame(document.querySelector('.container'), '5ef1fbddaa245e0017a57b17', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZjFmYmRkYWEyNDVlMDAxN2E1N2IxNyIsImlhdCI6MTU5MjkxNzAwMiwiZXhwIjoxNTkyOTMxNDAyfQ.JMnnKpC6zZ6cveuIw1oaePz21clCsoQMGGeQRheFJ8I');
myGame.showPromoPage();