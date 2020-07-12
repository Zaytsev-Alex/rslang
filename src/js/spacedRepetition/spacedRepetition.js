import createMainTemplate from './Template/mainTemplate'
import {
    createUserWord,
    getAgregateWord,
    getWordsToLearn,
    updateUserWord,
    getUserSettings,
    getUserStatistic,
    updateUserStatistic
} from './Api/Api'
import {
    addTranslate,
    createAudio,
    addCardInfo,
    shuffleArray,
    createStatics,
    createNotification
} from './Utils/Utils'
import { authorizationLoaderShow, authorizationLoaderHide } from '../authorization/loader';
// eslint-disable-next-line import/no-cycle 
import {setActiveStatus} from '../main-page/basicHeader'
// eslint-disable-next-line import/no-cycle 
 import showMainPage from '../main-page/showMainPage';
 import clearContainer from '../clear';
import mainPageHide from '../main-page/mainPageHide'

export default async function createSpacedRepetition() {
    authorizationLoaderShow()
    let wordPosition = 0;
    let currentMode = 'learn';
    let showTranslate = true;
    let pronunciationStatus = true;
    let tracks = [];
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const CURRENT_WORD_STAT = {
        totalAttempts: 0,
        successfulAttempts: 0,
        unsuccessfulAttempts: 0,
    }
    const MAIN = document.querySelector('main');
    MAIN.classList.add('spaced-repetition');
    const MAIN_WRAPPER = createMainTemplate();
    const CARD_HEADER = MAIN_WRAPPER.querySelector('.card__header');
    const CURRENT_PROGRESS = MAIN_WRAPPER.querySelector('.progress__current');
    const START_VALUE = MAIN_WRAPPER.querySelector('.progress__start-value');
    const END_WALUE = MAIN_WRAPPER.querySelector('.progress__end-value');
    const INPUT_CONTAINER = MAIN_WRAPPER.querySelector('.card__input-container');
    const INPUT_FIELD = MAIN_WRAPPER.querySelector('.card__input');
    const ANSWER = MAIN_WRAPPER.querySelector('.answer');
    const EXAMPLE_TRANSLATE = MAIN_WRAPPER.querySelector('.card__word-example-translate');
    const MEANING_TRANSLATE = MAIN_WRAPPER.querySelector('.card__explain-translate');
    const WORD_EXPLAIN = MAIN_WRAPPER.querySelector('.card__explain');
    const WORD_EXAMPLE = MAIN_WRAPPER.querySelector('.card__word-example');
    const WORD_TRANSCRIPTION = MAIN_WRAPPER.querySelector('.card__transcription');
    const CARD_BUTTONS = MAIN_WRAPPER.querySelector('.card__buttons');
    const DIFFICULTY_BUTTONS = MAIN_WRAPPER.querySelector('.card__difficulty-buttons');
    const ADDITIONAL_BUTTONS = MAIN_WRAPPER.querySelector('.card__additional-buttons');
    const CHECK_BUTTON = MAIN_WRAPPER.querySelector('.card__check-word-btn');
    const SKIP_BUTTON = MAIN_WRAPPER.querySelector('.card__skip-word-btn');
    const CARD_SPEAKER = MAIN_WRAPPER.querySelector('.card__pronunciation');
    const TRANSLATE_CHECKBOX = MAIN_WRAPPER.querySelector('.flip-switch input');
    const NAVIGATE_NEXT = MAIN_WRAPPER.querySelector('.navigate--next');
    const DELETE_BTN = MAIN_WRAPPER.querySelector('.card__delete-word-btn');
    const COMPLICATED_BTN = MAIN_WRAPPER.querySelector('.card__complicated-word-btn');
    const WORD_TRANSLATE = MAIN_WRAPPER.querySelector('.card__word-translate');
    const CARD_IMAGE = MAIN_WRAPPER.querySelector('.card__image');
    const PLAYER = createAudio(); 
    const SETTINGS = await getUserSettings(userId, token);
    const STATISTIC = await getUserStatistic(userId, token);
    
    
    const repeatPeriod = {
        easy: +(SETTINGS.optional.spacedRepetition.easyInterval),
        medium: +(SETTINGS.optional.spacedRepetition.mediumInterval),
        hard: +(SETTINGS.optional.spacedRepetition.hardInterval),
        complicated: +(SETTINGS.optional.spacedRepetition.hardInterval)
    }

    const CURRENT_DATE = new Date().toLocaleDateString("ru-Ru", {
        "year": "numeric",
        "month": "numeric",
        "day": "numeric"
    });

    if (STATISTIC.optional.spacedRepetition.dayStat.date !== CURRENT_DATE) {
        STATISTIC.optional.spacedRepetition.dayStat.date = CURRENT_DATE;
        STATISTIC.optional.spacedRepetition.dayStat.newWords = 0;
        STATISTIC.optional.spacedRepetition.dayStat.successfulAttempts = 0;
        STATISTIC.optional.spacedRepetition.dayStat.unsuccessfulAttempts = 0;
        STATISTIC.optional.spacedRepetition.dayStat.totalAttempts = 0;
        STATISTIC.optional.spacedRepetition.dayStat.correctAnswerSeries = 0;
        STATISTIC.optional.spacedRepetition.dayStat.totalWords = 0;
    }



    if (!SETTINGS.optional.spacedRepetition.translate) {
        WORD_TRANSLATE.classList.add('display-none');
    }
    if (!SETTINGS.optional.spacedRepetition.example) {
        WORD_EXAMPLE.classList.add('display-none');
    }
    if (!SETTINGS.optional.spacedRepetition.explanation) {
        WORD_EXPLAIN.classList.add('display-none');
    }
    if (!SETTINGS.optional.spacedRepetition.transcription) {
        WORD_TRANSCRIPTION.classList.add('display-none');
    }
    if (!SETTINGS.optional.spacedRepetition.showDifficult) {
        DIFFICULTY_BUTTONS.classList.add('display-none');
    } else {
        NAVIGATE_NEXT.classList.add('display-none');
    }
    if (!SETTINGS.optional.spacedRepetition.showDelete) {
        DELETE_BTN.classList.add('display-none');
    }
    if (!SETTINGS.optional.spacedRepetition.showHard) {
        COMPLICATED_BTN.classList.add('display-none');
    }
    if (!SETTINGS.optional.spacedRepetition.associateImage) {
        CARD_IMAGE.classList.add('display-none');
    }

    const newWordsToLearnNumber = SETTINGS.wordsPerDay - STATISTIC.optional.spacedRepetition.dayStat.newWords;
    const words = await getWordsToLearn(userId, token, newWordsToLearnNumber, SETTINGS.optional.spacedRepetition.group);
    if (SETTINGS.optional.spacedRepetition.cardsPerDay <= STATISTIC.optional.spacedRepetition.dayStat.totalWords) {
        MAIN.classList.remove('spaced-repetition');
        authorizationLoaderHide();
        createNotification('limit');
        return;
    }
     if (words.learn.length === 0 && words.train.length === 0) {
        
        MAIN.classList.remove('spaced-repetition');
        authorizationLoaderHide();
        createNotification('nothingToShow');
        return;
    }
        mainPageHide();
    


    if (words.learn.length === 0) currentMode = 'train';

    MAIN.append(MAIN_WRAPPER);
    authorizationLoaderHide();
    addCardInfo(words[currentMode][wordPosition]);
    START_VALUE.textContent = STATISTIC.optional.spacedRepetition.dayStat.totalWords;
    END_WALUE.textContent = SETTINGS.optional.spacedRepetition.cardsPerDay;
    CURRENT_PROGRESS.style.width = `${START_VALUE.textContent / END_WALUE.textContent * 100}%`;
    INPUT_FIELD.focus();
    const createNextCard = () => {
        if (currentMode === 'learn' && words[currentMode].length <= wordPosition) {
            wordPosition = 0;
            currentMode = 'train';
            words.train = shuffleArray(shuffleArray(words.train));
        }
        if (currentMode ==='train' && (words[currentMode].length <= wordPosition || SETTINGS.optional.spacedRepetition.cardsPerDay === STATISTIC.optional.spacedRepetition.dayStat.totalWords)) {
            const stat = createStatics(STATISTIC);
            const btn = stat.querySelector('.repetition-stat__confirm-btn');
            btn.onclick = () => {
                    const mainPageLink = document.querySelector('.basic-header__item_main-page');
                    clearContainer(document.querySelector('main')); 
                    setActiveStatus(mainPageLink);
                    MAIN.className = '';
                    showMainPage();
            }
            document.querySelector('.spaced-repetition').append(stat);
            return;
        }
        
        NAVIGATE_NEXT.classList.add('visability-hidden');
        DIFFICULTY_BUTTONS.classList.add('visability-hidden');
        ADDITIONAL_BUTTONS.classList.add('visability-hidden');
        addCardInfo(words[currentMode][wordPosition]);
        CHECK_BUTTON.disabled = false;
        SKIP_BUTTON.disabled = false;
        INPUT_FIELD.disabled = false;
        NAVIGATE_NEXT.disabled = true;
        CURRENT_WORD_STAT.unsuccessfulAttempts = 0;
        CURRENT_WORD_STAT.successfulAttempts = 0;
        CURRENT_WORD_STAT.totalAttempts = 0;
        ANSWER.innerHTML = '';
        INPUT_FIELD.value = '';
        START_VALUE.textContent = +(START_VALUE.textContent) + 1;
        CURRENT_PROGRESS.style.width = `${START_VALUE.textContent / END_WALUE.textContent * 100}%`;
        EXAMPLE_TRANSLATE.textContent = '';
        MEANING_TRANSLATE.textContent = '';
        INPUT_FIELD.focus();
        tracks = [];
        if (SETTINGS.optional.spacedRepetition.translate) {
            tracks.push(`https://raw.githubusercontent.com/icexes/rslang-data/master/${words[currentMode][wordPosition].audio}`);
        }
        if (SETTINGS.optional.spacedRepetition.example) {
            tracks.push(`https://raw.githubusercontent.com/icexes/rslang-data/master/${words[currentMode][wordPosition].audioExample}`);
        }
        if (SETTINGS.optional.spacedRepetition.explanation) {
            tracks.push(`https://raw.githubusercontent.com/icexes/rslang-data/master/${words[currentMode][wordPosition].audioMeaning}`);
        }
    }

    const checkAnswer = () => {
        if (INPUT_FIELD.disabled === false) {
            if (document.querySelector('.answer span') !== null) {
                ANSWER.classList.add('answer--remove');
                setTimeout(() => {
                    ANSWER.innerHTML = '';
                    ANSWER.classList.remove('answer--remove');
                }, 500)
            }
            INPUT_FIELD.focus();
        }
    };

    const setWordToBackEnd = async (mode, difficulty = '') => {
        let wordDifficulty = difficulty;
        // eslint-disable-next-line dot-notation
        const wordId = `${words[currentMode][wordPosition]['_id']}`;
        let nextDate = new Date();
        let lastDate = new Date();
        if (mode === 'learn') {
            if (wordDifficulty === '') {
                if (CURRENT_WORD_STAT.unsuccessfulAttempts === 0) wordDifficulty = 'easy';
                else if (CURRENT_WORD_STAT.unsuccessfulAttempts < 3) wordDifficulty = 'medium';
                else wordDifficulty = 'hard';
            }
            nextDate.setDate(nextDate.getDate() + repeatPeriod[wordDifficulty]);
            nextDate = nextDate.toLocaleDateString("ru-Ru", {
                "year": "numeric",
                "month": "numeric",
                "day": "numeric"
            });
            lastDate = lastDate.toLocaleDateString("ru-Ru", {
                "year": "numeric",
                "month": "numeric",
                "day": "numeric"
            });
            await createUserWord({
                'userId': `${userId}`,
                'wordId': wordId,
                'word': {
                    "difficulty": wordDifficulty,
                    "optional": {
                        wordStat: CURRENT_WORD_STAT,
                        nextDate,
                        lastDate,
                        'totalShown' : 1
                    }
                }
            }, token);
            if (wordDifficulty !== 'deleted') {
            words.train.push(await getAgregateWord(userId, wordId, token));
            }
            STATISTIC.optional.spacedRepetition.dayStat.newWords += 1;
            STATISTIC.learnedWords += 1;
            if (STATISTIC.optional.spacedRepetition.totalStat === undefined) {
                STATISTIC.optional.spacedRepetition.totalStat = {};
            }
            if (STATISTIC.optional.spacedRepetition.totalStat[lastDate] === undefined) {
                STATISTIC.optional.spacedRepetition.totalStat[lastDate] = {};
                STATISTIC.optional.spacedRepetition.totalStat[lastDate].words = 0;
            }
            STATISTIC.optional.spacedRepetition.totalStat[lastDate].words += 1;

        } else if (mode === 'train') {
            const {
                userWord
            } = words[currentMode][wordPosition];
            const finalWordStat = {
                totalAttempts: userWord.optional.wordStat.totalAttempts + CURRENT_WORD_STAT.totalAttempts,
                successfulAttempts: userWord.optional.wordStat.successfulAttempts + CURRENT_WORD_STAT.successfulAttempts,
                unsuccessfulAttempts: userWord.optional.wordStat.unsuccessfulAttempts + CURRENT_WORD_STAT.unsuccessfulAttempts,
            }
            userWord.optional.totalShown += 1;
            if (wordDifficulty === '') {
                if ((finalWordStat.successfulAttempts * 100) / finalWordStat.totalAttempts >= 95) {
                    wordDifficulty = 'easy';
                } else if ((finalWordStat.successfulAttempts * 100) / finalWordStat.totalAttempts >= 75) {
                    wordDifficulty = 'medium';
                } else {
                    wordDifficulty = 'hard';
                }
            }
            if (userWord.difficulty !== 'complicated') {
                userWord.difficulty = wordDifficulty;
            }

            if (wordDifficulty === 'deleted') {
                userWord.difficulty = wordDifficulty;
            }
            if (wordDifficulty !== 'deleted') {
                nextDate.setDate(nextDate.getDate() + repeatPeriod[wordDifficulty]);
            }
            nextDate = nextDate.toLocaleDateString("ru-Ru", {
                "year": "numeric",
                "month": "numeric",
                "day": "numeric"
            });
            lastDate = lastDate.toLocaleDateString("ru-Ru", {
                "year": "numeric",
                "month": "numeric",
                "day": "numeric"
            });
            userWord.optional.wordStat = finalWordStat;
            userWord.optional.lastDate = lastDate;
            userWord.optional.nextDate = nextDate;
             updateUserWord(userId, wordId, userWord, token);
        }

        STATISTIC.optional.spacedRepetition.dayStat.totalWords += 1;
        STATISTIC.optional.spacedRepetition.dayStat.unsuccessfulAttempts += CURRENT_WORD_STAT.unsuccessfulAttempts;
        STATISTIC.optional.spacedRepetition.dayStat.successfulAttempts += CURRENT_WORD_STAT.successfulAttempts;
        STATISTIC.optional.spacedRepetition.dayStat.totalAttempts += CURRENT_WORD_STAT.totalAttempts;
        if (CURRENT_WORD_STAT.unsuccessfulAttempts === 0) {
            STATISTIC.optional.spacedRepetition.dayStat.correctAnswerSeries += 1;
        } else {
            if (STATISTIC.optional.spacedRepetition.dayStat.finalCorrectAnswerSeries < STATISTIC.optional.spacedRepetition.dayStat.correctAnswerSeries) {
                STATISTIC.optional.spacedRepetition.dayStat.finalCorrectAnswerSeries = STATISTIC.optional.spacedRepetition.dayStat.correctAnswerSeries
            }
            STATISTIC.optional.spacedRepetition.dayStat.correctAnswerSeries = 0;
        }
         updateUserStatistic(userId, token, STATISTIC);
    }


    if (SETTINGS.optional.spacedRepetition.translate) {
        tracks.push(`https://raw.githubusercontent.com/icexes/rslang-data/master/${words[currentMode][wordPosition].audio}`);
    }
    if (SETTINGS.optional.spacedRepetition.example) {
        tracks.push(`https://raw.githubusercontent.com/icexes/rslang-data/master/${words[currentMode][wordPosition].audioExample}`);
    }
    if (SETTINGS.optional.spacedRepetition.explanation) {
        tracks.push(`https://raw.githubusercontent.com/icexes/rslang-data/master/${words[currentMode][wordPosition].audioMeaning}`);
    }

    function checkWord(event, word) {
        event.preventDefault();
        let errors = 0;
        let currentAudio = 0;
        let resultString = '';
        const text = INPUT_FIELD.value;
        word.split('').forEach((symbol, index) => {
            if (symbol === text[index]) {
                resultString += `<span class='correct'>${symbol}</span>`
            } else {
                errors += 1;
                resultString += `<span class='wrong'>${symbol}</span>`
            }
        });
        if (text.trim().length !== word.length) {
            errors += 1;
        }
        CURRENT_WORD_STAT.totalAttempts += 1;
        if (errors) {
            CURRENT_WORD_STAT.unsuccessfulAttempts += 1;
            ANSWER.innerHTML = resultString;
            const answerElements = ANSWER.querySelectorAll('span');
            setTimeout(() => {
                answerElements.forEach(el => el.classList.add('default'))
            });
            INPUT_FIELD.value = '';
            INPUT_FIELD.focus();
        } else {
            CURRENT_WORD_STAT.successfulAttempts += 1;

            CHECK_BUTTON.disabled = true;
            SKIP_BUTTON.disabled = true;
            INPUT_FIELD.value = '';
            ANSWER.innerHTML = `<span class='answer--correct'>${words[currentMode][wordPosition].word}</span>`
            INPUT_FIELD.disabled = true;
            DIFFICULTY_BUTTONS.classList.remove('visability-hidden');
            ADDITIONAL_BUTTONS.classList.remove('visability-hidden');
            NAVIGATE_NEXT.classList.remove('visability-hidden');
            WORD_EXPLAIN.innerHTML = `Значение: ${words[currentMode][wordPosition].textMeaning}`;
            WORD_EXAMPLE.innerHTML = `Пример: ${words[currentMode][wordPosition].textExample}`;
            NAVIGATE_NEXT.disabled = false;
            if (showTranslate) {
                addTranslate(words[currentMode][wordPosition].textExampleTranslate, words[currentMode][wordPosition].textMeaningTranslate, SETTINGS.optional.spacedRepetition.example, SETTINGS.optional.spacedRepetition.explanation);
        }
        if (pronunciationStatus) {
            PLAYER.src = tracks[currentAudio];
            PLAYER.play();
            PLAYER.onended = () => {
                if (currentAudio < tracks.length - 1) {
                    currentAudio += 1;
                    PLAYER.src = tracks[currentAudio];
                    PLAYER.play();
                }
            }    
        } 
    }
    }
    CARD_BUTTONS.addEventListener('click', async (event) => {
        if (event.target.closest('.card__check-word-btn')) {
            checkWord(event, words[currentMode][wordPosition].word);
        } else if (event.target.closest('.card__skip-word-btn')) {
            CURRENT_WORD_STAT.unsuccessfulAttempts += 1;
            CURRENT_WORD_STAT.successfulAttempts -= 1;
            INPUT_FIELD.value = words[currentMode][wordPosition].word;
            checkWord(event, words[currentMode][wordPosition].word);
        } else if ((event.target.closest('.card__difficulty-buttons') || event.target.closest('.card__additional-buttons')) && event.target.closest('button')) {
            if (event.target.closest('.card__repeat-word-btn')) {
                // eslint-disable-next-line dot-notation
                const wordId = `${words[currentMode][wordPosition]['_id']}`;
                await setWordToBackEnd(currentMode);
                words.train.push(await getAgregateWord(userId, wordId, token));
            } else {
                await setWordToBackEnd(currentMode, event.target.getAttribute('difficulty'));
            }
            if (!PLAYER.paused) {
                PLAYER.pause();
                PLAYER.currentTime = 0;
            }
            wordPosition += 1;
            createNextCard();
        }
    });

    CARD_HEADER.addEventListener('click', (event) => {
        if (event.target === CARD_SPEAKER) {
            CARD_SPEAKER.classList.toggle('card__pronunciation--off');
            CARD_SPEAKER.classList.toggle('card__pronunciation--on');
            pronunciationStatus = !pronunciationStatus;
            if (!PLAYER.paused) {
                PLAYER.pause();
                PLAYER.currentTime = 0;
            }          
        } else if (event.target.closest('label')) {
            if (!TRANSLATE_CHECKBOX.checked) {
                EXAMPLE_TRANSLATE.classList.remove('set-opacity');
                MEANING_TRANSLATE.classList.remove('set-opacity');
                showTranslate = true;
            } else {
                EXAMPLE_TRANSLATE.classList.add('set-opacity');
                MEANING_TRANSLATE.classList.add('set-opacity');
                showTranslate = false;
            }
        }
    })

    NAVIGATE_NEXT.addEventListener('click', async () => {
         setWordToBackEnd(currentMode)
        if (!PLAYER.paused) {
            PLAYER.pause();
            PLAYER.currentTime = 0;
        }
        wordPosition += 1;
        createNextCard();
    });

    INPUT_CONTAINER.addEventListener('click', checkAnswer);

    document.addEventListener('keydown', () => {
        if (document.querySelector('.spaced-repetition') !== null) { 
        INPUT_FIELD.focus();
        }
    })
    document.addEventListener('keyup', (event) => {
        if (document.querySelector('.spaced-repetition') !== null) { 
           
        checkAnswer();
        if (event.code === 'Enter') {
            if (!CHECK_BUTTON.disabled === true) {
                checkWord(event, words[currentMode][wordPosition].word);
            }
            if (document.querySelector('.navigate--next') !== null) {
                if (!NAVIGATE_NEXT.classList.contains('visability-hidden') && !NAVIGATE_NEXT.classList.contains('display-none')) {
                    const click = new Event('click', {
                        "bubbles": true,
                        "cancelable": false
                    });
                    NAVIGATE_NEXT.dispatchEvent(click);
                }
            
            }
        }
        
    }
    });
}