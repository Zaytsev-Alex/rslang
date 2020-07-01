import '../css/style.css';

import words from './data';
import translate from './translate';
import { get, set, del } from './storage';
import { soundIfSaidRightWord, soundIfWinGame } from './audio';

const micOn = new (window.speechRecognition ||
  window.webkitSpeechRecognition)();
micOn.lang = 'en-US';
