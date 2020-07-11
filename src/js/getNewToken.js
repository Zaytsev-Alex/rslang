/* eslint-disable no-use-before-define */

export default function getNewToken() {
  getToken();

  const REFRESH_TOKEN = localStorage.getItem('refreshToken');
  const TIME_TO_REFRESH_TOKEN = JSON.parse(atob(REFRESH_TOKEN.split('.')[1])).exp - 30 * 60 * 1000;
  const TIME_NOW = Date.now() / 1000;

  if (TIME_NOW > TIME_TO_REFRESH_TOKEN) {
    refreshToken();
  }


  function refreshToken() {
    const RSSCHOOL_API_URL = 'https://afternoon-falls-25894.herokuapp.com/';
    const USER_ID = localStorage.getItem('userId');
  
    fetch(`${RSSCHOOL_API_URL}users/${USER_ID}/tokens`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${REFRESH_TOKEN}`,
        'Accept': 'application/json',
      },
    }).then((res) => res.json())
      .then((data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);

        console.log('Получен новый токен');
      })
  }
}

async function getToken() {
  const RSSCHOOL_API_URL = 'https://afternoon-falls-25894.herokuapp.com/';

  const response = await fetch(`${RSSCHOOL_API_URL}signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(JSON.parse(localStorage.getItem('login&password'))),
  });

  const data = await response.json();

  localStorage.setItem('token', data.token);
  localStorage.setItem('refreshToken', data.refreshToken);
}
