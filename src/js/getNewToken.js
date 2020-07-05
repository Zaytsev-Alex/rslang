/* eslint-disable no-use-before-define */

export default function getNewToken() {
  const REFRESH_TOKEN = localStorage.getItem('refreshToken');
  // Время окончания действия токена минус 5 минут
  const TIME_TO_REFRESH_TOKEN = JSON.parse(atob(REFRESH_TOKEN.split('.')[1])).exp - 5 * 60 * 1000;
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
      })
  }
}




