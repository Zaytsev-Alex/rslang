import RSSCHOOL_API_URL from '../variables.js';
import renderPuzzle from '../render/renderPuzzle.js';
import getPicture from './getPicture.js';
import getBackendStat from './getBackendSettings.js';
import renderRoundsHTML from '../render/renderRoundsHTML.js';

const NUMBER_OF_WORDS_IN_SENTENCE = 10;
const NUMBER_OF_WORDS_IN_PAGE = 20;

export default function getWords() {
  const SELECTED_ROUND = Math.ceil((JSON.parse(localStorage.getItem('player-level'))[0]) / 2) - 1;
  const SELECTED_GROUP = JSON.parse(localStorage.getItem('player-level'))[1] - 1;

  fetch(`${RSSCHOOL_API_URL}words?page=${SELECTED_ROUND}&group=${SELECTED_GROUP}&wordsPerExampleSentenceLTE=
  ${NUMBER_OF_WORDS_IN_SENTENCE}&wordsPerPage=${NUMBER_OF_WORDS_IN_PAGE}`)
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem('Words', JSON.stringify(data));

      getTotalNumberOfWords();
      renderPuzzle(data);
      getPicture();
      getBackendStat();
    });
}


export async function getTotalNumberOfWords() {
  const SELECTED_GROUP = JSON.parse(localStorage.getItem('player-level'))[1] - 1;

  fetch(`${RSSCHOOL_API_URL}words/count?group=${SELECTED_GROUP}&wordsPerExampleSentenceLTE=
  ${NUMBER_OF_WORDS_IN_SENTENCE}&wordsPerPage=${NUMBER_OF_WORDS_IN_PAGE}`)
    .then((response) => response.json())
    .then((data) => {
      renderRoundsHTML(data.count);
    });
}
