import {
    getWords,
    getAgregatedWords,
    getUserStatistic,
    updateUserStatistic
} from '../spacedRepetition/Api/Api'
import {
    createAudio,
    shuffleArray
} from '../spacedRepetition/Utils/Utils'
import createTemplate from './template/template'



 async function mainGame({group, isUserWords, isNewGame}) {



    const createLoader = () => {
        const MAIN = document.querySelector('main');
        const loaderContainer = document.createElement('div');
        loaderContainer.classList.add('speakit__loader'); 
        const loader = document.createElement('img');
        loader.classList.add('loader__elem');
        loader.setAttribute('src', 'img/speakit-loader.svg');
        loaderContainer.appendChild(loader);
    
        MAIN.appendChild(loaderContainer);
    }
    
    const hideLoader = () => {
        const loaderContainer = document.querySelector('.speakit__loader'); 
        if (loaderContainer) {
            loaderContainer.remove();
        }
    }
    createLoader();

    const MAIN = document.querySelector('main');
    const WRAPPER = createTemplate();
    const CARDS_CONTAINER = WRAPPER.querySelector('.cards');
    const IMG_CONTAINER = WRAPPER.querySelector('.speakit__img-container');
    const IMG = IMG_CONTAINER.querySelector('img');
    const TRANSLATION = WRAPPER.querySelector('.speakit__translation');
    const GAME_BTN = WRAPPER.querySelector('.buttons__game-btn');
    const RESTART_BTN = WRAPPER.querySelector('.buttons__restart-btn');
    const RESULTS_BTN = WRAPPER.querySelector('.buttons__game-results-btn');
    let wordsArray;
    
    if (isUserWords === undefined) {
     wordsArray = await getWords(group, Math.round(0 - 0.5 + Math.random() * (59 - 0 + 1)));
    }
    else {
    const filter = `{"$or": [{"userWord.difficulty":"easy"},{"userWord.difficulty":"medium"},{"userWord.difficulty":"hard"},{"userWord.difficulty":"complicated"}]}`;
    wordsArray = await getAgregatedWords(localStorage.getItem('userId'), 4000, localStorage.getItem('token'), filter);
    if (wordsArray.length === 0) {
        wordsArray = await getWords(group, Math.round(0 - 0.5 + Math.random() * (59 - 0 + 1)));
    } 
    else if (wordsArray.length > 10) {
        wordsArray = shuffleArray(wordsArray).slice(0,10);
    }
    }
    const STATISTIC = await getUserStatistic(localStorage.getItem('userId'), localStorage.getItem('token'));
    const CORRECT_ANSWERS = [];
    const GAME_WORDS = [];

    const PLAYER = createAudio();
    let playMode = false;

    const recognition = new(window.speechRecognition ||
        window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';

    const SOURCE_URL = `https://raw.githubusercontent.com/icexes/rslang-data/master/`;
    const DEFAULT_IMG_URL = './img/speakit-default.jpg';
    IMG.src = `${DEFAULT_IMG_URL}`;
    const CARDS = []
    for (let i = 0; i < wordsArray.length; i += 1) {
        const card = document.createElement('div');
        card.dataset.position = i;
        card.classList.add('card');
        const cardSpeaker = document.createElement('div');
        cardSpeaker.classList.add('card__speaker');
        const cardInformation = document.createElement('div');
        cardInformation.classList.add('card__word-information');
        const word = document.createElement('p');
        word.classList.add('card__word');
        word.textContent = wordsArray[i].word;
        GAME_WORDS.push(wordsArray[i].word.toLowerCase());
        const transcription = document.createElement('div');
        transcription.classList.add('card__transcription');
        transcription.textContent = wordsArray[i].transcription;
        cardInformation.append(word, transcription);
        card.append(cardSpeaker, cardInformation)
        CARDS.push(card);
    }

    CARDS_CONTAINER.append(...CARDS);

    CARDS_CONTAINER.addEventListener('click', (event) => {

        if (event.target.closest('.card')) {
            if (!playMode) {
                CARDS.forEach((card) => card.classList.remove('card--active'));
                const card = event.target.closest('.card');
                const {
                    position
                } = card.dataset;
                card.classList.add('card--active');
                IMG.src = `${SOURCE_URL}${wordsArray[position].image}`;
                TRANSLATION.textContent = wordsArray[position].wordTranslate;
                PLAYER.src = `${SOURCE_URL}${wordsArray[position].audio}`;
                PLAYER.play();
            }
        }

    });



    GAME_BTN.addEventListener('click', () => {
        if (!GAME_BTN.classList.contains('game--started')) {
            playMode = true;
            CARDS.forEach((card) => card.classList.remove('card--active'));
            GAME_BTN.classList.add('game--started')
            TRANSLATION.classList.add('speakit__translation--active');
            recognition.start();
            recognition.addEventListener('result', (event) => {
                const transcripts = Array.from(event.results).map((result) => result[0]).map((result) => result.transcript).join('');
                TRANSLATION.textContent = transcripts;
                const position = GAME_WORDS.indexOf(transcripts.toLowerCase());
                if (position !== -1 && CORRECT_ANSWERS.indexOf(position) === -1) {
                    CARDS[position].classList.add('card--correct-answer');
                    IMG.src = `${SOURCE_URL}${wordsArray[position].image}`;
                    CORRECT_ANSWERS.push(position);
                    if (CORRECT_ANSWERS.length === wordsArray) {
                        const click = new Event('click', {
                            "bubbles": true,
                            "cancelable": false
                        });
                        RESULTS_BTN.dispatchEvent(click);
                        RESTART_BTN.dispatchEvent(click);                       
                    }
                }
            })

            recognition.onend = () => {
                recognition.start();
            }
        }
    });

    RESTART_BTN.addEventListener('click', () => {
        if (GAME_BTN.classList.contains('game--started')) {
            recognition.stop();
            recognition.onend = () => {
                recognition.stop();
            }
            playMode = false;
            GAME_BTN.classList.remove('game--started');
            CARDS.forEach((card) => card.classList.remove('card--correct-answer'));
            TRANSLATION.textContent = 'Перевод';
            
            TRANSLATION.classList.remove('speakit__translation--active');
            const currentDate = new Date().toLocaleDateString("ru-Ru", {
                "year": "numeric",
                "month": "numeric",
                "day": "numeric"
            });
            IMG.src = `${DEFAULT_IMG_URL}`;
            if (STATISTIC.optional.speakit === undefined) {
                STATISTIC.optional.speakit = {};
            }
            if (STATISTIC.optional.speakit.dayStat === undefined) {
                STATISTIC.optional.speakit.dayStat = {}
            }
            if (STATISTIC.optional.speakit.totalStat === undefined) {
                STATISTIC.optional.speakit.totalStat = {games: 0, correctAnswers: 0}
            }
            if (STATISTIC.optional.speakit.dayStat[currentDate] === undefined) {
                STATISTIC.optional.speakit.dayStat[currentDate] = {};
                STATISTIC.optional.speakit.dayStat[currentDate].games = 0;
                STATISTIC.optional.speakit.dayStat[currentDate].correctAnswers = 0;
            }
            STATISTIC.optional.speakit.totalStat.games = +STATISTIC.optional.speakit.totalStat.games + 1;
            STATISTIC.optional.speakit.totalStat.correctAnswers = +STATISTIC.optional.speakit.totalStat.correctAnswers + CORRECT_ANSWERS.length;
            STATISTIC.optional.speakit.dayStat[currentDate].games = +STATISTIC.optional.speakit.dayStat[currentDate].games +1;
            STATISTIC.optional.speakit.dayStat[currentDate].correctAnswers = +STATISTIC.optional.speakit.dayStat[currentDate].correctAnswers +CORRECT_ANSWERS.length; 
            CORRECT_ANSWERS.length = 0;
            updateUserStatistic(localStorage.getItem('userId'),localStorage.getItem('token'), STATISTIC)
        }
    })


    const createResults = () => {
        const INCORRECT_ANWERS = [];
        for (let i = 0; i < wordsArray.length; i += 1) {
            if (CORRECT_ANSWERS.indexOf(i) === -1) {
                INCORRECT_ANWERS.push(i);
            }
        }
        const RESULTS = document.createElement('div');
        RESULTS.classList.add('results');
        const RESULTS_WRAPPER = document.createElement('div');
        RESULTS_WRAPPER.classList.add('results__wrapper');
        const ERRORS_DESCRIPTION = document.createElement('div');
        ERRORS_DESCRIPTION.classList.add('errors__description');
        ERRORS_DESCRIPTION.innerHTML = `Ошибок <span class = 'errors__value'>${INCORRECT_ANWERS.length}</span>`
        const ERRORS_WORDS = document.createElement('div');
        ERRORS_WORDS.classList.add('errors__words');
        for (let i = 0; i < INCORRECT_ANWERS.length; i += 1) {
            const word = document.createElement('div');
            word.classList.add('word');
            word.dataset.src = `${SOURCE_URL}${wordsArray[INCORRECT_ANWERS[i]].audio}`
            word.innerHTML = `<span class = 'word__icon'></span><span class = 'word__name'>${wordsArray[INCORRECT_ANWERS[i]].word}</span> ${wordsArray[INCORRECT_ANWERS[i]].transcription} ${wordsArray[INCORRECT_ANWERS[i]].wordTranslate}`
            ERRORS_WORDS.append(word);
        }


        const CORRECT_DESCRIPTION = document.createElement('div');
        CORRECT_DESCRIPTION.classList.add('correct__description');
        CORRECT_DESCRIPTION.innerHTML = `Знаю <span class = 'correct__value'>${CORRECT_ANSWERS.length}</span>`
        const CORRECT_WORDS = document.createElement('div');
        CORRECT_WORDS.classList.add('correct__words');
        for (let i = 0; i < CORRECT_ANSWERS.length; i += 1) {
            const word = document.createElement('div');
            word.classList.add('word');
            word.dataset.src = `${SOURCE_URL}${wordsArray[CORRECT_ANSWERS[i]].audio}`
            word.innerHTML = `<span class = 'word__icon'></span><span class = 'word__name'>${wordsArray[CORRECT_ANSWERS[i]].word}</span>  ${wordsArray[CORRECT_ANSWERS[i]].transcription} ${wordsArray[CORRECT_ANSWERS[i]].wordTranslate}`
            CORRECT_WORDS.append(word);
        }

        const BUTTONS_BLOCK = document.createElement('div');
        BUTTONS_BLOCK.classList.add('results__buttons');
        const RETURN_BTN = document.createElement('button');
        RETURN_BTN.classList.add('results__return-btn');
        RETURN_BTN.textContent = 'Назад';
        RETURN_BTN.onclick = () => {
            RESULTS.classList.add('results--hide');
            setTimeout(() => {
                RESULTS.remove()
            }, 1000);
        }
        RESULTS_WRAPPER.onclick = (event) => {
            if (event.target.closest('.word')) {
                PLAYER.src = event.target.closest('.word').dataset.src;
                PLAYER.play();
            }
        }
        const NEW_GAME_BTN = document.createElement('button');
        NEW_GAME_BTN.classList.add('results__new-game-btn');
        NEW_GAME_BTN.textContent = 'Новая игра';
        NEW_GAME_BTN.onclick = () => {
            mainGame({group, isNewGame: true})
        }
        BUTTONS_BLOCK.append(RETURN_BTN, NEW_GAME_BTN)
        RESULTS_WRAPPER.append(ERRORS_DESCRIPTION, ERRORS_WORDS, CORRECT_DESCRIPTION, CORRECT_WORDS, BUTTONS_BLOCK);
        RESULTS.append(RESULTS_WRAPPER);
        WRAPPER.append(RESULTS);
    }

    RESULTS_BTN.addEventListener('click', () => {
        createResults();
    })
    if (isNewGame) {
        MAIN.innerHTML = '';
    }

    hideLoader();
    MAIN.append(WRAPPER);
    if (document.querySelector('.promo') !== null) {
    document.querySelector('.promo').classList.add('promo--hide');
    setTimeout(() => {document.querySelector('.promo').remove()},1000)
    }
    

}


export  default async function speakit() {
    const MAIN = document.querySelector('main');
    MAIN.classList.add('speakit');
    

    const createPromo = () => {
        const PROMO = document.createElement('div');
        PROMO.classList.add('promo');
        const PROMO_WRAPPER = document.createElement('div');
        PROMO_WRAPPER.classList.add('promo__wrapper');
        const PROMO_HEADER = document.createElement('p');
        PROMO_HEADER.classList.add('promo__header');
        PROMO_HEADER.textContent = 'SpeakIt';
        const PROMO_DESCRIPTION = document.createElement('p');
        PROMO_DESCRIPTION.classList.add('promo__description');
        PROMO_DESCRIPTION.textContent = `SpeakIt - это игра, направленная на тренировку навыков произношения слов. Кликните по слову, чтобы узнать его перевод. Нажмите на кнопку 'Начать игру', чтобы начать тренировку. Произнесите все слова, что видите на экране!`
        const PROMO_LEVEL_DESCRIPTION = document.createElement('p');
        PROMO_LEVEL_DESCRIPTION.classList.add('promo__level-description');
        PROMO_LEVEL_DESCRIPTION.textContent = 'Выберите Уровень:'
        const LEVELS = document.createElement('div');
         for (let j = 0; j < 6; j += 1) {
             const LEVEL = document.createElement('button');
             LEVEL.classList.add('promo__level');
            LEVEL.dataset.level = j;
             LEVEL.textContent = j + 1;
             LEVELS.append(LEVEL);
         }
        const USER_WORDS_BTN = document.createElement('button');
        USER_WORDS_BTN.classList.add('promo__level');
        
        USER_WORDS_BTN.classList.add('promo__user-words-btn');
        USER_WORDS_BTN.textContent = 'Изучемые слова';
        PROMO_WRAPPER.append(PROMO_HEADER, PROMO_DESCRIPTION, PROMO_LEVEL_DESCRIPTION, LEVELS, USER_WORDS_BTN)
        PROMO.append(PROMO_WRAPPER)
        MAIN.append(PROMO);

        LEVELS.addEventListener('click', (event) => {
            if (event.target.closest('.promo__level')) {
                mainGame({group:event.target.dataset.level})
            }

        })
        USER_WORDS_BTN.addEventListener('click', () => {
            mainGame({group: 0, isUserWords: 'true'});
        })
    }

    createPromo();
}


