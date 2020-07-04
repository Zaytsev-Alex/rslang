export default function audio(link) {
  const AUDIO_LINK = 'https://raw.githubusercontent.com/ronic404/rslang-data/master/';
  const PLAY_AUDIO_BUTTON = document.querySelector('#play-audio');
  const AUDIO_TAG = document.querySelector('audio');

  AUDIO_TAG.src = `${AUDIO_LINK}${link}`;

  PLAY_AUDIO_BUTTON.addEventListener('click', () => {
    AUDIO_TAG.play();
  });
}
