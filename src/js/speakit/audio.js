const playAudio = (src) => {
  const audio = new Audio(src);
  audio.preload = 'auto';
  return audio.play();
};

const soundIfWinGame = () => {
  const audioSrc = './audio/success.mp3';

  playAudio(audioSrc);
};

const soundIfSaidRightWord = () => {
  const audioSrc = './audio/correct.mp3';

  playAudio(audioSrc);
};

export { soundIfSaidRightWord, soundIfWinGame };
