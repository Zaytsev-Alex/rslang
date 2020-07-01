/* eslint-disable consistent-return */
/* eslint-disable no-prototype-builtins */
import { RSSCHOOL_API_URL } from '../variables.js';
import renderStatistics from '../render/renderStatistics.js';

export default async function setBackendStat(right, wrong) {
  const TOKEN = localStorage.getItem('token');
  const USER_ID = localStorage.getItem('userId');
  const TIME = getTime();
  let prev;
  let puzzle;

  try {
    const backStat = await getBackendStat();
    console.log(backStat);
    prev = backStat.puzzle;

    if (backStat.puzzle.hasOwnProperty(TIME)) {
      console.log('Есть такой ключ');
      puzzle = Object.assign(prev, {
        [TIME]: {
          countGame: backStat.puzzle[TIME].countGame + 1,
          right: backStat.puzzle[TIME].right + right,
          wrong: backStat.puzzle[TIME].wrong + wrong,
        },
      });
    } else {
      console.log('Нет такого ключа');
      prev = backStat.puzzle;

      puzzle = Object.assign(prev, {
        [TIME]: {
          countGame: 1,
          right,
          wrong,
        },
      });
    }

    await fetch(`${RSSCHOOL_API_URL}users/${USER_ID}/statistics`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        optional: {
          puzzle,
        },
      }),
    }).then((res) => res.json())
      .then((data) => {
        console.log(data.optional);
        renderStatistics(data.optional);
      });
  } catch {
    console.log('Сработал Catch');
    // await fetch(`${RSSCHOOL_API_URL}users/${USER_ID}/statistics`, {
    //   method: 'PUT',
    //   withCredentials: true,
    //   headers: {
    //     Authorization: `Bearer ${TOKEN}`,
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     optional: {
    //       puzzle: {
    //         [TIME]: {
    //           countGame: 1,
    //           right,
    //           wrong,
    //         },
    //       },
    //     },
    //   }),
    // }).then((res) => res.json())
    //   .then((data) => {
    //     renderStatistics(data.optional);
    //   });
  }
}


function getTime() {
  const DATE = new Date();
  const DAY = (DATE.getDate().toString().length === 1) ? `0${DATE.getDate()}` : DATE.getDate();
  const MONTH = ((DATE.getMonth() + 1).toString().length === 1) ? `0${DATE.getMonth() + 1}` : DATE.getMonth() + 1;
  const TIME = `${DAY - 10}.${MONTH}.${DATE.getFullYear() - 1}`;
  // Сделать правильный день и год
  return TIME;
}


export async function getBackendStat() {
  const TOKEN = localStorage.getItem('token');
  const USER_ID = localStorage.getItem('userId');

  const response = await fetch(`${RSSCHOOL_API_URL}users/${USER_ID}/statistics`, {
    method: 'GET',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/json',
    },
  });

  if (response.status === 404) {
    console.warn('Нет статистики');
  } else if (response.status === 200) {
    const data = await response.json();

    return data.optional;
  }
}
