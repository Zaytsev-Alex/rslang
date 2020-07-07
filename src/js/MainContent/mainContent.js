import createMainTemplate from './Template/mainTemplate'
import {
    createUserWord,
    getUserWords,
    getAgregateWord,
    // getNewWordsToLearn,
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
    shuffleArray
} from './Utils/Utils'



export default async function createMainContent() {
    let wordPosition = 0;
    let currentMode = 'learn';
    const CURRENT_WORD_STAT = {
        totalAttempts: 0,
        successfulAttempts: 0,
        unsuccessfulAttempts: 0,
    }
    // const GAME_STAT = {
    //     totalAttempts: 0,
    //     successfulAttempts: 0,
    //     unsuccessfulAttempts: 0,
    //     correctAnswerSeries: 0,
    //     newWordsToday: 0
    // }

    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMDM4NzNlODM2ZjRlMDAxNzdiYmU3NSIsImlhdCI6MTU5NDEwMzEyMywiZXhwIjoxNTk0MTE3NTIzfQ.N2iTS3XzSS5mOy52w9XO_pmaTMtNQW9B0-o-daCtYUs`;
    const userId = `5f03873e836f4e00177bbe75`;


    createMainTemplate();
    const CARD_HEADER = document.querySelector('.card__header');
    const CURRENT_PROGRESS = document.querySelector('.progress__current');
    const START_VALUE = document.querySelector('.progress__start-value');
    const END_WALUE = document.querySelector('.progress__end-value');
    const INPUT_CONTAINER = document.querySelector('.card__input-container');
    const INPUT_FIELD = document.querySelector('.card__input');
    const ANSWER = document.querySelector('.answer');
    const EXAMPLE_TRANSLATE = document.querySelector('.card__word-example-translate');
    const MEANING_TRANSLATE = document.querySelector('.card__explain-translate');
    const WORD_EXPLAIN = document.querySelector('.card__explain');
    const WORD_EXAMPLE = document.querySelector('.card__word-example');
    const WORD_TRANSCRIPTION = document.querySelector('.card__transcription');
    const CARD_BUTTONS = document.querySelector('.card__buttons');
    const DIFFICULTY_BUTTONS = document.querySelector('.card__difficulty-buttons');
    const ADDITIONAL_BUTTONS = document.querySelector('.card__additional-buttons');
    const CHECK_BUTTON = document.querySelector('.card__check-word-btn');
    const SKIP_BUTTON = document.querySelector('.card__skip-word-btn');
    const CARD_SPEAKER = document.querySelector('.card__pronunciation');
    const TRANSLATE_CHECKBOX = document.querySelector('.flip-switch input');
    const NAVIGATE_NEXT = document.querySelector('.navigate--next');
    const DELETE_BTN = document.querySelector('.card__delete-word-btn');
    const COMPLICATED_BTN = document.querySelector('.card__complicated-word-btn');
    const WORD_TRANSLATE = document.querySelector('.card__word-translate');
    const CARD_IMAGE = document.querySelector('.card__image');
    
    const SETTINGS = await getUserSettings(userId, token);
    const STATISTIC = await getUserStatistic(userId,token);
    console.log(STATISTIC);
    console.log(SETTINGS, 'settings!');
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
    }
    else {
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


    await getUserWords({
        userId
    }, token);

    const newWordsToLearnNumber = SETTINGS.wordsPerDay - STATISTIC.optional.spacedRepetition.dayStat.newWords;
    const wordsToTrainNumber = SETTINGS.optional.spacedRepetition.cardsPerDay - STATISTIC.optional.spacedRepetition.dayStat.totalWords - newWordsToLearnNumber;
    const words = await getWordsToLearn(userId, token, newWordsToLearnNumber, wordsToTrainNumber, SETTINGS.optional.spacedRepetition.group);
    console.log(words, 'слова');
    if (words.learn.length === 0) currentMode = 'train';
    console.log(words[currentMode][wordPosition], 'tut');
    addCardInfo(words[currentMode][wordPosition]);
    // console.log(testResult, 'оп')





    const player = createAudio();
    let tracks = [];
    INPUT_FIELD.focus();
    START_VALUE.textContent = STATISTIC.optional.spacedRepetition.dayStat.totalWords;
    END_WALUE.textContent = SETTINGS.optional.spacedRepetition.cardsPerDay;
    CURRENT_PROGRESS.style.width = `${START_VALUE.textContent / END_WALUE.textContent * 100}%`;
    let showTranslate = true;
    let pronunciationStatus = true;

    const repeatPeriod = {
        easy: SETTINGS.optional.spacedRepetition.easyInterval,
        medium: SETTINGS.optional.spacedRepetition.mediumInterval,
        hard: SETTINGS.optional.spacedRepetition.hardInterval,
        complicated: SETTINGS.optional.spacedRepetition.hardInterval
    }

    const createNextCard = () => {
        if (currentMode === 'learn' && words[currentMode].length <= wordPosition) {
            wordPosition = 0;
            currentMode = 'train';
            words.train = shuffleArray(shuffleArray(words.train));
        }
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
        NAVIGATE_NEXT.classList.add('visability-hidden');
        DIFFICULTY_BUTTONS.classList.add('visability-hidden');
        ADDITIONAL_BUTTONS.classList.add('visability-hidden');
        CHECK_BUTTON.disabled = false;
        SKIP_BUTTON.disabled = false;
        INPUT_FIELD.disabled = false;
        NAVIGATE_NEXT.disabled = true;
        // GAME_STAT.unsuccessfulAttempts += CURRENT_WORD_STAT.unsuccessfulAttempts;
        // GAME_STAT.successfulAttempts += CURRENT_WORD_STAT.successfulAttempts;
        // GAME_STAT.totalAttempts += CURRENT_WORD_STAT.totalAttempts;
        // if (CURRENT_WORD_STAT.unsuccessfulAttempts === 0) {
        //     GAME_STAT.correctAnswerSeries += 1;
        // } else {
        //     GAME_STAT.correctAnswerSeries = 0;
        // }
        // GAME_STAT.newWordsToday +=1;
        CURRENT_WORD_STAT.unsuccessfulAttempts = 0;
        CURRENT_WORD_STAT.successfulAttempts = 0;
        CURRENT_WORD_STAT.totalAttempts = 0;
        ANSWER.innerHTML = '';
        INPUT_FIELD.value = '';
        // START_VALUE += 1;
        START_VALUE.textContent = +(START_VALUE.textContent) + 1;
        CURRENT_PROGRESS.style.width = `${START_VALUE.textContent / END_WALUE.textContent * 100}%`;
        EXAMPLE_TRANSLATE.textContent = '';
        MEANING_TRANSLATE.textContent = '';
        addCardInfo(words[currentMode][wordPosition]);
    }

    const checkAnswer = () => {
        if (document.querySelector('.answer span') !== null) {
            ANSWER.classList.add('answer--remove');
            setTimeout(() => {
                ANSWER.innerHTML = '';
                ANSWER.classList.remove('answer--remove');
            }, 500)
        }
        INPUT_FIELD.focus();
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
                        lastDate
                    }
                }
            }, token);
            // console.log(words, 'do');
            // const word = await getAgregateWord(userId,wordId,token);
            words.train.push(await getAgregateWord(userId, wordId, token));
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


            if (wordDifficulty === '') {
                if ((finalWordStat.successfulAttempts * 100) / finalWordStat.totalAttempts >= 90) {
                    wordDifficulty = 'easy';
                } else if ((finalWordStat.successfulAttempts * 100) / finalWordStat.totalAttempts >= 55) {
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
            //    console.log(finalWordStat)
            //    console.log(optionalWordArg)
            //    console.log(words[currentMode][wordPosition].userWord.optional, 'OPTIONAL CHANGE OR NOT');
            //    words[currentMode][wordPosition].userWord
            console.log(userWord, 'userWord before replace');
            await updateUserWord(userId, wordId, userWord, token);      
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
        await updateUserStatistic(userId, token, STATISTIC);
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
            ANSWER.innerHTML = `<span style = "color:green">${words[currentMode][wordPosition].word}</span>`
            INPUT_FIELD.disabled = true;
            DIFFICULTY_BUTTONS.classList.remove('visability-hidden');
            ADDITIONAL_BUTTONS.classList.remove('visability-hidden');
            NAVIGATE_NEXT.classList.remove('visability-hidden');
            WORD_EXPLAIN.innerHTML = `Значение: ${words[currentMode][wordPosition].textMeaning}`;
            WORD_EXAMPLE.innerHTML = `Пример: ${words[currentMode][wordPosition].textExample}`;
            NAVIGATE_NEXT.disabled = false;
            if (showTranslate) {
                addTranslate(words[currentMode][wordPosition].textExampleTranslate, words[currentMode][wordPosition].textMeaningTranslate, SETTINGS.optional.spacedRepetition.example, SETTINGS.optional.spacedRepetition.explanation);
                if (pronunciationStatus) {
                    player.src = tracks[currentAudio];
                    player.play();
                    player.onended = () => {
                        if (currentAudio < tracks.length - 1) {
                            currentAudio += 1;
                            player.src = tracks[currentAudio];
                            player.play();

                        }
                    }
                } else {
                    console.log(1);
                }

            } else {
                console.log(2);
            }
        }

    }

    CARD_BUTTONS.addEventListener('click', async (event) => {
        if (event.target.closest('.card__check-word-btn')) checkWord(event, words[currentMode][wordPosition].word);
        else if (event.target.closest('.card__skip-word-btn')) {
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
            player.pause();
            player.currentTime = 0;
            wordPosition += 1;
            createNextCard();
        }


    });
    CARD_HEADER.addEventListener('click', (event) => {
        if (event.target === CARD_SPEAKER) {
            pronunciationStatus = !pronunciationStatus;
            CARD_SPEAKER.classList.toggle('card__pronunciation--off');
            CARD_SPEAKER.classList.toggle('card__pronunciation--on');
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
        await setWordToBackEnd(currentMode)
        player.pause();
        player.currentTime = 0;
        wordPosition += 1;
        createNextCard();
    });

    INPUT_CONTAINER.addEventListener('click', checkAnswer);

    document.addEventListener('keydown', () => {
        INPUT_FIELD.focus();
    })
    document.addEventListener('keyup', (event) => {
        checkAnswer();
        INPUT_FIELD.focus();
        if (event.code === 'Enter') {
            checkWord(event, words[currentMode][wordPosition].word);
        }
    });












}