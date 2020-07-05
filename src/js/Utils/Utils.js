export function addTranslate(textExampleTranslate, textMeaningTranslate) {
    document.querySelector('.card__word-example-translate').textContent = textExampleTranslate;
    document.querySelector('.card__explain-translate').textContent = textMeaningTranslate;
}

export function createAudio() {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.controls = false;
    return audio;
}



export function addCardInfo(data) {
    const IMAGE_CONTAINER = document.querySelector('.card__image');
    const WORD_TRANSLATE = document.querySelector('.card__word-translate');
    const WORD_TRANSCRIPTION = document.querySelector('.card__transcription');
    const INPUT_FIELD = document.querySelector('.card__input'); 
    const WORD_EXPLAIN = document.querySelector('.card__explain');
    const WORD_EXAMPLE = document.querySelector('.card__word-example');  
    const img = document.querySelector('.card__img') || document.createElement('img');
    img.classList.add('card__img');
    img.src = `https://raw.githubusercontent.com/icexes/rslang-data/master/${data.image}`;
    INPUT_FIELD.style.width = `${data.word.length * 16 + 24}px`;
    IMAGE_CONTAINER.append(img);
    WORD_TRANSLATE.textContent = data.wordTranslate;
    WORD_TRANSCRIPTION.textContent = data.transcription;
    WORD_EXPLAIN.innerHTML = `Значение: ${data.textMeaning.replace(/<i>\w+<\/i>/g, '...')}`;
    WORD_EXAMPLE.innerHTML = `Пример: ${data.textExample.replace(/<b>\w+<\/b>/g, '...')}`;

}

export function createSpeachRecognition(lang) {
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new window.SpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = false;
    return recognition;
}

export function shuffleArray(array) {
    const arr = array;
    for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}