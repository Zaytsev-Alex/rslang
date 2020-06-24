import {
    WORD_TRANSLATE,
    WORD_TRANSCRIPTION,
    WORD_EXPLAIN,
    WORD_EXAMPLE,
    INPUT_FIELD,
    IMAGE_CONTAINER
} from '../Variables/variables'

export function addTranslate(textExampleTranslate, textMeaningTranslate) {
    document.querySelector('.card__word-example-translate').textContent = textExampleTranslate;
    document.querySelector('.card__explain-translate').textContent = textMeaningTranslate;
}

export function playAudio(audioSrc) {
    const src = `https://raw.githubusercontent.com/icexes/rslang-data/master/${audioSrc}`;
    const audio = new Audio();
    audio.src = src;
    audio.preload = 'auto';
    audio.controls = false;
    audio.play();
    return audio;
}



export function addCardInfo(data) {

    const img = document.querySelector('.card__img') || document.createElement('img');
    img.classList.add('card__img');
    img.src = `https://raw.githubusercontent.com/icexes/rslang-data/master/${data.image}`;
    INPUT_FIELD.style.width = `${data.word.length*16 + 24}px`;
    IMAGE_CONTAINER.append(img);
    WORD_TRANSLATE.textContent = data.wordTranslate;
    WORD_TRANSCRIPTION.textContent = data.transcription;
    WORD_EXPLAIN.innerHTML = `Значение: ${data.textMeaning.replace(/<i>\w+<\/i>/g, '...')}`;
    WORD_EXAMPLE.innerHTML = `Пример: ${ data.textExample.replace(/<b>\w+<\/b>/g, '...')}`;

}

export function createSpeachRecognition (lang) {
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new window.SpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = false;
    return recognition;
    }