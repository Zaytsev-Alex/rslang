import {getWords} from '../Api/Api'

export default function addCardInfo() {
    getWords(1,1).then((data) => {
        console.log(data);
        const img = document.createElement('img');
        img.classList.add('card__img');
       img.src = `https://raw.githubusercontent.com/icexes/rslang-data/master/${data[1].image}`;
        const textInput = document.querySelector('.card__input');
        textInput.style.width = `${data[1].word.length * 16.8 + 14}px`
        document.querySelector('.card__image').append(img);
        document.querySelector('.card__word-translate').textContent = data[1].wordTranslate;
        document.querySelector('.card__transcription').textContent = data[1].transcription;
        document.querySelector('.card__explain').textContent = data[1].textMeaningTranslate;
        document.querySelector('.card__word-expample').textContent = data[1].textExampleTranslate;
});
}
