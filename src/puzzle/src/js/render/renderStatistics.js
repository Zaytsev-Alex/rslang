const TBODY = document.querySelector('tbody');
const ALL_COUNT_GAMES = document.querySelector('#all-count-games');
const ALL_RIGHT = document.querySelector('#all-right');
const ALL_WRONG = document.querySelector('#all-wrong');

export default function renderStatistics(data) {
  const NUMBER_DAYS = Object.entries(data.puzzle).length;

  TBODY.textContent = '';

  let totalCountGames = 0;
  let totalRight = 0;
  let totalWrong = 0;

  for (let i = NUMBER_DAYS - 1; i >= 0; i -= 1) {
    TBODY.append(createTR(Object.entries(data.puzzle)[i]));

    totalCountGames += Object.values(data.puzzle)[i].countGame;
    totalRight += Object.values(data.puzzle)[i].right;
    totalWrong += Object.values(data.puzzle)[i].wrong;
  }

  ALL_COUNT_GAMES.textContent = totalCountGames;
  ALL_RIGHT.textContent = totalRight;
  ALL_WRONG.textContent = totalWrong;
}


function createTR(data) {
  const TR = document.createElement('tr');
  const TD_DATE = document.createElement('td');
  const TD_COUNT_GAMES = document.createElement('td');
  const TD_RIGHT = document.createElement('td');
  const TD_WRONG = document.createElement('td');

  TD_DATE.className = 'statistics__date';
  TD_COUNT_GAMES.className = 'statistics__count-games';
  TD_RIGHT.className = 'statistics__right';
  TD_WRONG.className = 'statistics__wrong';

  TD_DATE.textContent = `${data[0]}`;
  TD_COUNT_GAMES.textContent = `${data[1].countGame}`;
  TD_RIGHT.textContent = `${data[1].right}`;
  TD_WRONG.textContent = `${data[1].wrong}`;

  TR.append(TD_DATE, TD_COUNT_GAMES, TD_RIGHT, TD_WRONG);

  return TR;
}
