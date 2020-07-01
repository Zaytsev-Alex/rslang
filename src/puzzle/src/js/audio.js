import { AUDIO_TAG } from './variables.js';

const AUDIO_LINK = 'https://raw.githubusercontent.com/ronic404/rslang-data/master/';

export default function audio(link) {
  AUDIO_TAG.src = `${AUDIO_LINK}${link}`;
}
