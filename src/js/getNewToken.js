 export default function refreshToken() {
  const REFRESH_TOKEN = localStorage.getItem('refreshToken');
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

