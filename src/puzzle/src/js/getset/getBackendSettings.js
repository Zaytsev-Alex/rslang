import RSSCHOOL_API_URL from '../variables.js';

export default async function getBackendSettings() {
  const TOKEN = localStorage.getItem('token');
  const USER_ID = localStorage.getItem('userId');

  const response = await fetch(`${RSSCHOOL_API_URL}users/${USER_ID}/settings`, {
    method: 'GET',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/json',
    },
  });

  if (response.status === 404) {
    setBackendSettings();
  } else if (response.status === 200) {
    const data = await response.json();

    localStorage.setItem('player-level', JSON.stringify([data.optional.puzzle.round, data.optional.puzzle.level]));
    localStorage.setItem('picture-button', data.optional.puzzle.picture);
    localStorage.setItem('audio-button', data.optional.puzzle.audio);
    localStorage.setItem('translate-button', data.optional.puzzle.translate);
  }
}


export async function setBackendSettings() {
  const TOKEN = localStorage.getItem('token');
  const USER_ID = localStorage.getItem('userId');
  const ROUND = JSON.parse(localStorage.getItem('player-level'))[0];
  const LEVEL = JSON.parse(localStorage.getItem('player-level'))[1];
  const isTranslate = localStorage.getItem('translate-button');
  const isAudio = localStorage.getItem('audio-button');
  const isPicture = localStorage.getItem('picture-button');

  await fetch(`${RSSCHOOL_API_URL}users/${USER_ID}/settings`, {
    method: 'PUT',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      optional: {
        puzzle: {
          round: ROUND,
          level: LEVEL,
          translate: isTranslate,
          audio: isAudio,
          picture: isPicture,
        },
      },
    }),
  });
}
