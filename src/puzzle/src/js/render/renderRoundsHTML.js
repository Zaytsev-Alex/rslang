import { getTotalNumberOfWords } from '../getset/getWords.js';

export default function renderRoundsHTML(count) {
  const GROUP = document.querySelector('#groups');
  const ROUND = document.querySelector('#rounds');

  if (ROUND.innerHTML === '') {
    for (let i = 1; i <= count * 2; i += 1) {
      const OPTION = document.createElement('option');
      OPTION.setAttribute('value', i);
      OPTION.textContent = i;
      ROUND.append(OPTION);
    }
  }


  const ROUNDS_LIST = ROUND.querySelectorAll('option');

  if (ROUNDS_LIST.length !== count * 2) {
    ROUND.innerHTML = '';
    getTotalNumberOfWords();
  }

  [document.querySelector('#rounds').value, document.querySelector('#groups').value] = JSON.parse(localStorage.getItem('player-level'));

  GROUP.addEventListener('change', () => {
    localStorage.setItem('player-level', JSON.stringify([1, GROUP.value]));
    getTotalNumberOfWords();
  });
}
