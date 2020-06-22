

export default function addCardInfo(data) {

        const img = document.querySelector('.card__img') || document.createElement('img');

        // const img = document.createElement('img');
        img.classList.add('card__img');
        img.src = `https://raw.githubusercontent.com/icexes/rslang-data/master/${data.image}`;
        const textInput = document.querySelector('.card__input');
        textInput.style.width = `${data.word.length*16 + 24}px`;
        document.querySelector('.card__image').append(img);
        document.querySelector('.card__word-translate').textContent = data.wordTranslate;
        document.querySelector('.card__transcription').textContent = data.transcription;
        document.querySelector('.card__explain').innerHTML = `Значение: ${data.textMeaning.replace(/<i>\w+<\/i>/g, '...')}`;
        document.querySelector('.card__word-example').innerHTML = `Пример: ${ data.textExample.replace(/<b>\w+<\/b>/g, '...')}`;

}

const settings = {
    new_words: 20,
    last_group: 0,
    last_page: 0,
    last_word_on_page: 0,
}

localStorage.setItem('settings',JSON.stringify(settings));

