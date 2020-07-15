import {
    getAgregatedWords,
    getUserSettings,
    updateUserWord
} from '../spacedRepetition/Api/Api'
import {authorizationLoaderShow, authorizationLoaderHide } from '../authorization/loader'
import {createAudio} from '../spacedRepetition/Utils/Utils'

export default async function createVocabulary() {
    authorizationLoaderShow();
    const PLAYER = createAudio();
    const MAIN = document.querySelector('main');
    const vocabulary = document.createElement('div')
    vocabulary.classList.add('vocabulary');
    const vocabularyWrapper = document.createElement('div');
    vocabularyWrapper.classList.add('vocabulary__wrapper');
    const vocabularyHeader = document.createElement('div');
    vocabularyHeader.classList.add('vocabulary__header');
    const learnedWordsBtn = document.createElement('div');
    learnedWordsBtn.classList.add('vocabulary__learned-words-btn', 'active-link');
    learnedWordsBtn.textContent = 'Изученные слова';
    const complicatedWordsBtn = document.createElement('div');
    complicatedWordsBtn.classList.add('vocabulary__complicated-words-btn');
    complicatedWordsBtn.textContent = 'Сложные слова';
    const deletedWordsBtn = document.createElement('div');
    deletedWordsBtn.classList.add('vocabulary__deleted-words-btn');
    deletedWordsBtn.textContent = 'Удаленные слова';
    vocabularyHeader.append(learnedWordsBtn, complicatedWordsBtn, deletedWordsBtn)


    const vocabularyMain = document.createElement('div');
    vocabularyMain.classList.add('vocabulary__main');

    vocabularyWrapper.append(vocabularyHeader, vocabularyMain);
    vocabulary.append(vocabularyWrapper);

    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId');
    const maxWords = 4000;
    const learnedWordsFilter = `{"$or": [{"userWord.difficulty":"easy"},{"userWord.difficulty":"medium"},{"userWord.difficulty":"hard"},{"userWord.difficulty":"complicated"}]}`;
    const complicatedWordsFilter = `{"userWord.difficulty":"complicated"}`;
    const deletedWordsFilter = `{"userWord.difficulty":"deleted"}`;

    const learnedWords = await getAgregatedWords(userId, maxWords, token, learnedWordsFilter);
    const complicatedWords = await getAgregatedWords(userId, maxWords, token, complicatedWordsFilter);
    const deletedWords = await getAgregatedWords(userId, maxWords, token, deletedWordsFilter);
    const SETTINGS = await getUserSettings(userId, token);
    const repeatPeriod = {
        easy: SETTINGS.optional.spacedRepetition.easyInterval,
        medium: SETTINGS.optional.spacedRepetition.mediumInterval,
        hard: SETTINGS.optional.spacedRepetition.hardInterval,
    }

    const messages = {
        easy: 'Для Вас это простое слово!',
        medium: 'Вы хорошо знаете это слово.',
        hard: 'Для Вас это пока трудное слово.',
        comlicated: 'Для Вас это пока сложное слово.'
    }

    const createWordTemplate = (arr, difficulty) => {
        const resultElements = [];
        if (arr.length === 0) {
            const card = document.createElement('div');
            card.classList.add('card');
            const info = document.createElement('div');
            info.classList.add('card__nothing-to-show');
            info.textContent = 'Пока здесь нет слов!';
            card.append(info);
            resultElements.push(card);
        } else {
            for (let i = 0; i < arr.length; i += 1) {
                const card = document.createElement('div');
                card.classList.add('card');
                const cardWordAbout = document.createElement('div');
                cardWordAbout.classList.add('card__word-about');
                if (difficulty !== 'deleted') {
                const difficultyRow = document.createElement('div');
                difficultyRow.classList.add('difficulty-row');
                const progressMessage = document.createElement('span');
                progressMessage.classList.add('difficulty-row__message');
                if (arr[i].userWord.difficulty === 'easy') {
                    difficultyRow.classList.add('difficulty-row--easy')
                    progressMessage.textContent = messages.easy;
                }
                if (arr[i].userWord.difficulty === 'medium') {
                    difficultyRow.classList.add('difficulty-row--medium');
                    progressMessage.textContent = messages.medium;
                }
                if (arr[i].userWord.difficulty === 'hard') {
                    difficultyRow.classList.add('difficulty-row--hard');
                    progressMessage.textContent = messages.hard;
                }
                if (arr[i].userWord.difficulty === 'complicated') {
                    difficultyRow.classList.add('difficulty-row--complicated');
                    progressMessage.textContent = messages.comlicated;
                }
                const difficultyDots = document.createElement('div');
                difficultyDots.classList.add('difficulty-row__dots');
                for (let j = 0; j < 4; j +=1) {
                    const difficultyDot = document.createElement('div');                 
                    difficultyDot.classList.add('difficulty-row__dot');
                    difficultyDots.append(difficultyDot);
                }
                difficultyRow.prepend(difficultyDots);
                difficultyRow.append(progressMessage);

                    cardWordAbout.append(difficultyRow);
                }
                if (SETTINGS.optional.spacedRepetition.associateImage) {
                const cardImageContainer = document.createElement('div');
                const wordImg = document.createElement('img');
                wordImg.classList.add('card__word-img');
                wordImg.src = `https://raw.githubusercontent.com/icexes/rslang-data/master/${arr[i].image}`
                cardImageContainer.append(wordImg);
                cardImageContainer.classList.add('card__image-container');
                card.append(cardImageContainer);
                }
                const wordContainer = document.createElement('div');
                wordContainer.classList.add('card__word-container');
                const word = document.createElement('span');
                word.classList.add('card__word');
                word.textContent = arr[i].word;
                if (SETTINGS.optional.spacedRepetition.transcription) {
                const wordTranscription = document.createElement('span');
                wordTranscription.classList.add('card__word-trascription');
                wordTranscription.textContent = arr[i].transcription;
                wordContainer.append(wordTranscription)
                }
                wordContainer.prepend(word);
                const cardSpeaker = document.createElement('div');
                cardSpeaker.classList.add('card__speaker');
                cardSpeaker.dataset.src = `https://raw.githubusercontent.com/icexes/rslang-data/master/${arr[i].audio}`
                wordContainer.append(cardSpeaker);
                if (difficulty !== undefined) {
                    const restoreBtn = document.createElement('button');
                    restoreBtn.classList.add('card__restore-btn');
                    restoreBtn.textContent = 'Восстановить';
                    restoreBtn.dataset.type = difficulty === 'deleted' ? 'deleted' : 'complicated';
                    restoreBtn.dataset.id = i;
                    wordContainer.append(restoreBtn);
                }
                cardWordAbout.append(wordContainer)
                if (SETTINGS.optional.spacedRepetition.translate) {
                const wordTranslate = document.createElement('div');
                wordTranslate.classList.add('card__word-translate');
                wordTranslate.textContent = arr[i].wordTranslate;
                cardWordAbout.append(wordTranslate);
                }
                if (SETTINGS.optional.spacedRepetition.explanation) {
                const textMeaning = document.createElement('div');
                textMeaning.classList.add('card__word-meaning');
                textMeaning.innerHTML = arr[i].textMeaning;
                const textMeaningTranslate = document.createElement('div');
                textMeaningTranslate.classList.add('card__word-meaning-translate');
                textMeaningTranslate.textContent = arr[i].textMeaningTranslate
                cardWordAbout.append(textMeaning,textMeaningTranslate);
                }
                if (SETTINGS.optional.spacedRepetition.example) {
                const textExample = document.createElement('div');
                textExample.classList.add('card__word-example');
                textExample.innerHTML = arr[i].textExample;
                const textExampleTranslate = document.createElement('div');
                textExampleTranslate.classList.add('card__word-example-translate');
                textExampleTranslate.textContent = arr[i].textExampleTranslate
                cardWordAbout.append(textExample, textExampleTranslate);
                }


                const repeat = document.createElement('div');
                repeat.classList.add('repeat-block');

                const lastRepeat = document.createElement('span');
                lastRepeat.classList.add('repeat-block__last-repeat');
                lastRepeat.textContent = `Последнее повторение: ${arr[i].userWord.optional.lastDate} `;
                const totalRepeats = document.createElement('span');
                totalRepeats.classList.add('repeat-block__total-repeats');
                totalRepeats.textContent = `Повторений: ${arr[i].userWord.optional.totalShown} `;  
                if (difficulty !== 'deleted') {
                const nextRepeat = document.createElement('span');
                nextRepeat.classList.add('repeat-block__next-repeat');
                nextRepeat.textContent = `Следующее повторение: ${arr[i].userWord.optional.nextDate} `;
                repeat.append(lastRepeat, nextRepeat, totalRepeats);
                }
                else {
                repeat.append(lastRepeat, totalRepeats);
                }
                cardWordAbout.append(repeat);
                card.prepend(cardWordAbout);

                resultElements.push(card);
            }
        }
        return resultElements;
    }
    const elems = createWordTemplate(learnedWords);
    vocabularyMain.append(...elems);

    MAIN.append(vocabulary);
    authorizationLoaderHide();
    
    const HEADER = document.querySelector('.vocabulary__header');
    vocabularyMain.addEventListener('click', (event) => {
        if (event.target.closest('.card__restore-btn')) {
            let words;

            let agregatedWord;
            if (event.target.dataset.type === 'complicated') {
                [agregatedWord] = complicatedWords.splice(event.target.dataset.id, 1);
                 words = createWordTemplate(complicatedWords, 'complicated');
            } else if (event.target.dataset.type === 'deleted') {
                [agregatedWord] = deletedWords.splice(event.target.dataset.id, 1);
                learnedWords.push(agregatedWord);
                 words = createWordTemplate(deletedWords, 'deleted');
            }
            vocabularyMain.innerHTML = '';
            vocabularyMain.append(...words);
            const {userWord} = agregatedWord;
            // eslint-disable-next-line dot-notation
            const wordId = `${agregatedWord['_id']}`;
            const currentDate = new Date();
            if ((userWord.optional.wordStat.successfulAttempts * 100) / userWord.optional.wordStat.totalAttempts >= 95) {
                userWord.difficulty = 'easy';
                currentDate.setDate(currentDate.getDate() + repeatPeriod.easy)
            } else if ((userWord.optional.wordStat.successfulAttempts * 100) / userWord.optional.wordStat.totalAttempts >= 75) {
                userWord.difficulty = 'medium';
                currentDate.setDate(currentDate.getDate() + repeatPeriod.medium)
            } else {
                userWord.difficulty = 'hard';
                currentDate.setDate(currentDate.getDate() + repeatPeriod.hard)
            }

            userWord.optional.nextDate = currentDate.toLocaleDateString("ru-Ru", {
                "year": "numeric",
                "month": "numeric",
                "day": "numeric"
            });
            updateUserWord(userId,wordId, userWord, token);
        }
        if (event.target.closest('.card__speaker')) {
            PLAYER.src = event.target.closest('.card__speaker').dataset.src;
            PLAYER.play();
        }
    })

    HEADER.addEventListener('click', async (event) => {
        let words = [];
        const activeLink = HEADER.querySelector('.vocabulary__header .active-link');
        if (event.target !== activeLink) {
            activeLink.classList.remove('active-link');
            if (event.target.closest('.vocabulary__complicated-words-btn')) {
                complicatedWordsBtn.classList.add('active-link');
                words = createWordTemplate(complicatedWords, 'complicated');
            } else if (event.target.closest('.vocabulary__learned-words-btn')) {
                learnedWordsBtn.classList.add('active-link');
                words = createWordTemplate(learnedWords);

            } else if (event.target.closest('.vocabulary__deleted-words-btn')) {
                deletedWordsBtn.classList.add('active-link');
                words = createWordTemplate(deletedWords, 'deleted');
            }
            vocabularyMain.innerHTML = '';
            vocabularyMain.append(...words);
        }
    })

}