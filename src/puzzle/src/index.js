import './sass/main.scss';

import './js/createUser.js';
import './js/loginUser.js';
import './js/audio.js';
import './js/hintsSwitcher.js';
import './js/render/renderResults.js';

// import { RSSCHOOL_API_URL } from './js/variables.js';
import showFirstPage from './js/showFirstPage.js';
import pageSwitcher from './js/pageSwitcher.js';

// const TOKEN = localStorage.getItem('token');
// const USER_ID = localStorage.getItem('userId');
// const WORD_ID = '5e9f5ee35eb9e72bc21af5cf';

// console.log(USER_ID, WORD_ID);

// const getUserWord = async ({ userId, wordId }) => {
//   window.console.log(userId, wordId);

//   const response = await fetch(`${RSSCHOOL_API_URL}users/${userId}/words/${wordId}`, {
//     method: 'GET',
//     withCredentials: true,
//     headers: {
//       Authorization: `Bearer ${TOKEN}`,
//       Accept: 'application/json',
//     },
//   });
//   const data = await response.json();

//   window.console.log(data);
// };

// const createUserWord = async ({ userId, wordId, word }) => {
//   const response = await fetch(`${RSSCHOOL_API_URL}users/${userId}/words/${wordId}`, {
//     method: 'POST',
//     Headers: {
//       Authorization: `Bearer ${TOKEN}`,
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(word),
//   });
//   const data = await response.json();

//   window.console.log(data);
// };


window.addEventListener('load', () => {
  showFirstPage();
  pageSwitcher();
  // getUserWord({ userId: USER_ID, wordId: WORD_ID });
  // createUserWord(USER_ID, WORD_ID);
});
