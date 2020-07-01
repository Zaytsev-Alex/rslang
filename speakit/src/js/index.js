import '../css/style.css';

import words from './data';
import translate from './translate';
import { get, set, del } from './storage';
import { soundIfSaidRightWord, soundIfWinGame } from './audio';

const micOn = new (window.speechRecognition ||
  window.webkitSpeechRecognition)();
micOn.lang = 'en-US';

const userSpeach = document.querySelector('.user-speach');
const img = document.querySelector('.img');
const game = document.querySelector('.items');
const audio = document.querySelector('.audio');
const restartBtn = document.querySelector('.restart');

let getRandomNum = Math.floor(590 * Math.random());

const recordsBtn = document.querySelector('.result');
const returnBtn = document.querySelector('.return');
const recordError = document.querySelector('.errors-item');
const recordSucces = document.querySelector('.succes-item');
const errorsNum = document.querySelector('.errors-num');
const succesNum = document.querySelector('.succes-num');
const gameLevel = document.querySelector('.game-level span');

const modal = document.querySelector('.results');

const urlData =
  'https://raw.githubusercontent.com/Semenetti/rslang-data/master/data/';

let startScreenWords = words[0];

const translationBox = document.querySelector('.images .translation');
const inputBox = document.querySelector('.input');

let currentRoundWords = [];

const render = (e) => {
  const textBox = document.createElement('div');
  textBox.classList.add('item');
  textBox.dataset.id = e;

  textBox.addEventListener('click', () => {
    audio.src = urlData + startScreenWords[e].audio;
    audio.play();
  });

  const audioIcon = document.createElement('span');
  audioIcon.classList.add('audio-icon');
  audioIcon.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="currentColor" d="M15.788 13.007a3 3 0 110 5.985c.571 3.312 2.064 5.675 3.815 5.675 2.244 0 4.064-3.88 4.064-8.667 0-4.786-1.82-8.667-4.064-8.667-1.751 0-3.244 2.363-3.815 5.674zM19 26c-3.314 0-12-4.144-12-10S15.686 6 19 6s6 4.477 6 10-2.686 10-6 10z" fill-rule="evenodd"></path></svg>';

  const engWord = document.createElement('p');
  engWord.classList.add('word');
  engWord.textContent = startScreenWords[e].word;

  if (!currentRoundWords.includes(startScreenWords[e].word)) {
    currentRoundWords.push(startScreenWords[e].word);
  }

  const transcription = document.createElement('p');
  transcription.classList.add('transcription');
  transcription.textContent = startScreenWords[e].transcription;

  const translation = document.createElement('p');
  translation.classList.add('translation');

  translate(startScreenWords[e].word).then((res) => {
    translation.textContent = res;
  });

  textBox.append(audioIcon, engWord, transcription, translation);

  game.appendChild(textBox);
};

const renderHistoryWords = (level) => {
  game.innerHTML = get(level);

  document.querySelectorAll('.item').forEach((el) => {
    const node = el;
    const e = node.dataset.id;

    if (!currentRoundWords.includes(node.childNodes[1].textContent)) {
      currentRoundWords.push(node.childNodes[1].textContent);
    }

    translate(node.childNodes[1].textContent).then((res) => {
      node.childNodes[3].textContent = res;
    });

    node.addEventListener('click', () => {
      audio.src = urlData + startScreenWords[e].audio;
      audio.play();
    });
  });
};

const clearStyles = (node, style) => {
  document.querySelectorAll(node).forEach((e) => {
    const element = e;
    element.classList.remove(style);
  });
};

restartBtn.addEventListener('click', () => {
  clearStyles('.item', 'guessed-word');
  clearStyles('.item', 'activeItem');

  set(
    `round${document.querySelector('.activePoint').textContent - 1}`,
    game.innerHTML
  );

  document.querySelector('.activePoint').click();
});

const renderWords = (lvl) => {
  game.innerHTML = '';
  currentRoundWords = [];
  if (lvl === undefined || !get(`round${lvl}`)) {
    for (let i = getRandomNum; i < getRandomNum + 10; i += 1) render(i);
  } else {
    renderHistoryWords(`round${lvl}`);
  }
  set(`round${lvl}`, game.innerHTML);
};

document.querySelector('.intro-btn').addEventListener('click', () => {
  document.querySelector('.intro').classList.add('hidden');
  document.querySelector('body').style.overflow = 'visible';
  document.querySelector('.container').classList.remove('hidden');

  renderWords('0');
});

const clearInput = () => {
  inputBox.value = '';
};

const showInput = () => {
  inputBox.classList.remove('hidden');
};

const hideInput = () => {
  inputBox.classList.add('hidden');
};

const isWinGame = () => {
  if (document.querySelectorAll('.guessed-word').length >= 10) {
    setTimeout(() => {
      soundIfWinGame();
    }, 1000);

    recordsBtn.click();
  }
};

const isRightWord = (word) => {
  const saidWord = word.toLowerCase();

  if (currentRoundWords.includes(word)) {
    document.querySelectorAll('.item .word').forEach((el) => {
      const node = el;
      if (node.textContent.toLowerCase() === saidWord) {
        node.parentNode.classList.add('guessed-word');
        img.src = urlData + startScreenWords[node.parentNode.dataset.id].image;

        soundIfSaidRightWord();

        isWinGame();

        set(
          `round${document.querySelector('.activePoint').dataset.level}`,
          game.innerHTML
        );
      }
    });
  }
};

const newGame = document.querySelector('.new-game');
newGame.addEventListener('click', () => {
  del(`round${document.querySelector('.activePoint').textContent - 1}`);
  document.querySelector('.activePoint').click();
  modal.classList.add('hidden');
});

userSpeach.addEventListener('click', () => {
  userSpeach.classList.toggle('speaking');

  clearInput();

  if (!userSpeach.classList.contains('speaking')) {
    micOn.stop();
  } else {
    micOn.start();
  }

  micOn.addEventListener('audioend', () => {
    userSpeach.classList.remove('speaking');
    if (inputBox.value === '') inputBox.value = 'Try to speak clearly';
  });

  micOn.onresult = (event) => {
    userSpeach.classList.remove('speaking');
    inputBox.value = event.results[0][0].transcript;
    isRightWord(event.results[0][0].transcript.toLowerCase());
  };

  showInput();
});

document.querySelectorAll('.point').forEach((node) => {
  node.addEventListener('click', (e) => {
    const { level } = e.currentTarget.dataset;

    clearStyles('.point', 'activePoint');
    node.classList.add('activePoint');

    translationBox.textContent = '';
    hideInput();

    startScreenWords = words[level];

    img.src = urlData + startScreenWords[level].image;
    getRandomNum = Math.floor(590 * Math.random());

    renderWords(level);
  });
});

game.addEventListener('click', (event) => {
  const i = event.target.closest('.item');
  if (i && !userSpeach.classList.contains('activeBtn')) {
    clearStyles('.item', 'activeItem');
    hideInput();
    i.classList.add('activeItem');
    const a = i.dataset.id;
    img.src = urlData + startScreenWords[a].image;
    document.querySelector('.images .translation').textContent =
      i.lastElementChild.textContent;
  }
});

// render records section

const clearRecordsContainer = () => {
  recordError.innerHTML = '';
  recordSucces.innerHTML = '';
};

recordsBtn.addEventListener('click', () => {
  clearRecordsContainer();
  modal.classList.remove('hidden');

  document.querySelectorAll('.item').forEach((el) => {
    if (el.classList.contains('guessed-word')) {
      recordSucces.innerHTML += `<div class="item" data-id=${el.dataset.id}>${el.innerHTML}</div>`;
    } else {
      recordError.innerHTML += `<div class="item" data-id=${el.dataset.id}>${el.innerHTML}</div>`;
    }
  });

  document.querySelectorAll('.results .item').forEach((el) => {
    const node = el;
    const e = node.dataset.id;

    node.addEventListener('click', () => {
      audio.src = urlData + startScreenWords[e].audio;
      audio.play();
    });
  });

  errorsNum.textContent = document.querySelectorAll(
    '.errors-item .item'
  ).length;
  succesNum.textContent = document.querySelectorAll(
    '.succes-item .item'
  ).length;

  gameLevel.textContent = document.querySelector('.activePoint').textContent;
});

returnBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.add('hidden');
  }
});
