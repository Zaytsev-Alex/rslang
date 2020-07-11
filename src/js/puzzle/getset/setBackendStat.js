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
  let newObj;
  
  try {
    const backStat = await getBackendStat();
    console.log(backStat);

    if (Object.keys(backStat.optional.puzzle).length > 9) {
      const lastProp = Object.keys(backStat.optional.puzzle)[0];
      delete backStat.optional.puzzle[lastProp];
    }

    if (!backStat.optional) {
      newObj = {
        learnedWords: backStat.learnedWords,
        optional: {
          puzzle: {
            [TIME]: {
              countGame: 1,
              right,
              wrong,
            },
          }
        }
      }
    } else if (!backStat.optional.puzzle.hasOwnProperty(TIME)) {
      newObj = {
        learnedWords: backStat.learnedWords,
        optional: Object.assign(backStat.optional, {
          puzzle: Object.assign(backStat.optional.puzzle, {
            [TIME]: {
              countGame: 1,
              right,
              wrong,
            },
          })
        })        
      }
    } else {
      newObj = {
        learnedWords: backStat.learnedWords,
        optional: Object.assign(backStat.optional, {
          puzzle: Object.assign(backStat.optional.puzzle, {
            [TIME]: {
              countGame: backStat.optional.puzzle[TIME].countGame + 1,
              right: backStat.optional.puzzle[TIME].right + right,
              wrong: backStat.optional.puzzle[TIME].wrong + wrong,
            },
          })
        })       
      }
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
