export function addTranslate(textExampleTranslate, textMeaningTranslate, isExampleShowed, isMeaningShowed) {
    if (isExampleShowed) {
    document.querySelector('.card__word-example-translate').textContent = textExampleTranslate;
    }
    if (isMeaningShowed) {
    document.querySelector('.card__explain-translate').textContent = textMeaningTranslate;
    }
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

export function compareDates(currentDate, nextDate) {
        const [nextDay,nextMonth, nextYear] = nextDate.split('.')
        const [currentDay,currentMonth, currentYear] = currentDate.split('.');
        if (new Date(Date.parse(`${currentYear}/${currentMonth}/${currentDay}`)) >= new Date(Date.parse(`${nextYear}/${nextMonth}/${nextDay}`))) {
            return true;
        }
       return false;
    }

  export const createStatics = (statistic) => {
        const stat = document.createElement('div');
        stat.classList.add('repetition-stat');
        const statTemplate = `<div class = 'repetition-stat__wrapper'>
            <div class='repetition-stat__img-container'></div>
            <div class ='repetition-stat__title'>Статистика за день</div>
            <div class = 'total-cards'>
             <span>Карточек завершено:</span>
        <span>${statistic.optional.spacedRepetition.dayStat.totalWords}</span>
    </div>
    <div class = 'correct-answers'>
        <span>Правильные ответы:</span>
        <span>${Math.round(statistic.optional.spacedRepetition.dayStat.successfulAttempts/(statistic.optional.spacedRepetition.dayStat.totalAttempts === 0 ? 1 : 
            statistic.optional.spacedRepetition.dayStat.totalAttempts)*100)}%</span>
    </div>
    <div class = 'new-words'>
        <span>Новые слова:</span>
        <span>${statistic.optional.spacedRepetition.dayStat.newWords}</span>
    </div>
    <div class = 'logest-series'>
        <span>Самая длинная серия правильных ответов:</span>
        <span>${statistic.optional.spacedRepetition.dayStat.finalCorrectAnswerSeries > statistic.optional.spacedRepetition.dayStat.correctAnswerSeries
             ? statistic.optional.spacedRepetition.dayStat.finalCorrectAnswerSeries: statistic.optional.spacedRepetition.dayStat.correctAnswerSeries}</span>
    </div>
    <button type='button' class='repetition-stat__confirm-btn'>Продолжить</button>
    </div>`;
        stat.innerHTML = statTemplate;
       return stat;
    }