


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

export const createProgressField = () => {
    const progressField = document.createElement('div');
    progressField.classList.add('progress');
    progressField.innerHTML = `
    <div class = 'progress__start-value'></div>
    <div class = 'progress__row'>
    <div class = 'progress__current'></div>
    </div>
    <div class = 'progress__end-value'></div> `;
    return progressField;
}
