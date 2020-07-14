/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable no-prototype-builtins */

import createDefaultStatistics from '../statistics/createDefaultStatistics';

const RSSCHOOL_API_URL = 'https://afternoon-falls-25894.herokuapp.com/';

export default async function setBackendStat(right, wrong) {
  const TOKEN = localStorage.getItem('token');
  const USER_ID = localStorage.getItem('userId');
//   const TIME = getTime();
  let newObj;
  
  try {
    const backStat = await getBackendStat();
    console.log(backStat);

    if (!backStat.optional.audioCall) {
      newObj = {
        learnedWords: backStat.learnedWords,
        optional: Object.assign(backStat.optional, {
          audioCall: {
              countGame: 1,
              right,
              wrong
          }
        })
      }
    } else {
      newObj = {
        learnedWords: backStat.learnedWords,
        optional: Object.assign(backStat.optional, {
          audioCall: Object.assign(backStat.optional.audioCall, {
              countGame: backStat.optional.audioCall.countGame + 1,
              right: backStat.optional.audioCall.right + right,
              wrong: backStat.optional.audioCall.wrong + wrong
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
      .then(() => {
        
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


// function getTime() {
//   const DATE = new Date();
//   const DAY = (DATE.getDate().toString().length === 1) ? `0${DATE.getDate()}` : DATE.getDate();
//   const MONTH = ((DATE.getMonth() + 1).toString().length === 1) ? `0${DATE.getMonth() + 1}` : DATE.getMonth() + 1;
//   const TIME = `${DAY}.${MONTH}.${DATE.getFullYear()}`;

//   return TIME;
// }