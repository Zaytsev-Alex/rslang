/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable no-prototype-builtins */
import RSSCHOOL_API_URL from '../variables';
import renderStatistics from '../render/renderStatistics';
import createDefaultStatistics from '../../statistics/createDefaultStatistics';

export default async function setBackendStat(right, wrong) {
  const TOKEN = localStorage.getItem('token');
  const USER_ID = localStorage.getItem('userId');
  const TIME = getTime();
  let opt;
  let puzzle;
  
  try {
    const backStat = await getBackendStat();
    opt = backStat.optional;

    console.log(backStat);

    if (opt.puzzle.hasOwnProperty(TIME)) {
      puzzle = Object.assign(puzzle, {
        [TIME]: {
          countGame: opt.puzzle[TIME].countGame + 1,
          right: opt.puzzle[TIME].right + right,
          wrong: opt.puzzle[TIME].wrong + wrong,
        },
      });
    } else {
      puzzle = { 
        [TIME]: {
          countGame: 1,
          right,
          wrong,
        },
      };
    }
    console.log(puzzle);
    opt = Object.assign(opt, puzzle);

    const newObj = {
      learnedWords: backStat.learnedWords,
      optional: opt,
    }

    await fetch(`${RSSCHOOL_API_URL}users/${USER_ID}/statistics`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newObj)
    }).then((res) => res.json())
      .then((data) => {
        renderStatistics(data.optional);
      });
  } catch (e) {
    console.log(e);
    console.warn('Статистика не получена');
    createDefaultStatistics();
  }
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

    return data;
  }
}


function getTime() {
  const DATE = new Date();
  const DAY = (DATE.getDate().toString().length === 1) ? `0${DATE.getDate()}` : DATE.getDate();
  const MONTH = ((DATE.getMonth() + 1).toString().length === 1) ? `0${DATE.getMonth() + 1}` : DATE.getMonth() + 1;
  const TIME = `${DAY}.${MONTH}.${DATE.getFullYear()}`;

  return TIME;
}
