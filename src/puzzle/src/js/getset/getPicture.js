import {
  PUZZLE_PAGE, RESULT_PICTURE, PICTURE_DESCRIPTION,
} from '../variables.js';

import PICTURES_1 from '../pictures-info/level1.js';
import PICTURES_2 from '../pictures-info/level2.js';
import PICTURES_3 from '../pictures-info/level3.js';
import PICTURES_4 from '../pictures-info/level4.js';
import PICTURES_5 from '../pictures-info/level5.js';
import PICTURES_6 from '../pictures-info/level6.js';

const ALL_ARRAYS_PICTURES = [PICTURES_1, PICTURES_2, PICTURES_3, PICTURES_4, PICTURES_5, PICTURES_6];

export default function getPicture() {
  const PICTURE_LINK = 'https://raw.githubusercontent.com/ronic404/rslang_data_paintings';

  PUZZLE_PAGE.style.background = `url(${PICTURE_LINK}/master/${getPathPicture()}`;
  PUZZLE_PAGE.style.backgroundSize = 'cover';
  PUZZLE_PAGE.style.backgroundPosition = 'center center';

  RESULT_PICTURE.style.background = `url(${PICTURE_LINK}/master/${getPathPicture()}`;
  RESULT_PICTURE.style.backgroundSize = 'cover';
  RESULT_PICTURE.style.backgroundPosition = 'center center';
}

function getPathPicture() {
  const LEVEL = JSON.parse(localStorage.getItem('player-level'))[1];
  const CURRENT_ARRAY_PICTURES = ALL_ARRAYS_PICTURES[LEVEL - 1];
  const RANDOM_NUMBER_PICTURE = Math.floor(Math.random() * CURRENT_ARRAY_PICTURES.length);

  setPictureTitle(CURRENT_ARRAY_PICTURES[RANDOM_NUMBER_PICTURE]);

  return CURRENT_ARRAY_PICTURES[RANDOM_NUMBER_PICTURE].imageSrc;
}

function setPictureTitle(data) {
  PICTURE_DESCRIPTION.textContent = `${data.author} - ${data.name} (${data.year})`;
}
