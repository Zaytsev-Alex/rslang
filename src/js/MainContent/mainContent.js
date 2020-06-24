import createCard from './Cards/Card/card'
import addCardInfo from './Cards/cardInfo'
import {
    getWords
} from './Api/Api'
import { addTranslate, playAudio, createProgressField } from '../Utils/Utils'



export default async function createMainContent() {

    const main = document.createElement('main');
    let currentWord = 0;
    main.classList.add('main');
    const mainWrapper = document.createElement('div');
    mainWrapper.classList.add('main__wrapper');

    main.append(mainWrapper);
    const card = createCard();

    mainWrapper.append(card);
    document.body.append(main);

    const words = await getWords(1, 1);
    addCardInfo(words[currentWord]);
    console.log(words);

    const progressField = createProgressField();
    const currentProrgess = progressField.querySelector('.progress__current');
    const startValue = progressField.querySelector('.progress__start-value');
    const endValue = progressField.querySelector('.progress__end-value');
    startValue.textContent = currentWord;
    endValue.textContent = words.length;
    mainWrapper.append(progressField);
    const inputContainer = document.querySelector('.card__input-container');
    const inputField = mainWrapper.querySelector('.card__input');
    const answer = document.querySelector('.answer');
    inputField.focus();
    const cardButtons = document.querySelector('.card__buttons');
    const expampleTranslate = document.querySelector('.card__word-example-translate');
    const meaningTranslate = document.querySelector('.card__explain-translate');
    const wordExplain = document.querySelector('.card__explain');
    const wordExample = document.querySelector('.card__word-example');
    const difficultyButtons = document.querySelector('.card__difficulty-buttons');
    const checkButton = document.querySelector('.card__check-word-btn');
    const skipButton = document.querySelector('.card__skip-word-btn');
    const cardHeader = document.querySelector('.card__header');
    const cardSpeaker = cardHeader.querySelector('.card__pronunciation');
    const translateCheckbox = document.querySelector('.flip-switch input');
    cardSpeaker.classList.add('card__pronunciation--on')
    let showTranslate = true;
    let pronunciationStatus = true;
    const synth = window.speechSynthesis || window.mozspeechSynthesis || window.webkitspeechSynthesis;
    const message = new SpeechSynthesisUtterance();
    message.volume = 1;
    message.lang = 'en';
    message.rate = 1;

    const createNextCard = () => {
        checkButton.disabled = false;
        skipButton.disabled = false;
        inputField.disabled = false;
        difficultyButtons.classList.add('visability-hidden')
        answer.innerHTML = '';
        inputField.value = '';
        startValue.textContent = currentWord;
        currentProrgess.style.width = `${startValue.textContent / endValue.textContent * 100}%`;
        expampleTranslate.textContent = '';
        meaningTranslate.textContent = '';
        addCardInfo(words[currentWord]);
    }

    const checkAnswer = () => {
        if (document.querySelector('.answer span') !== null) {
            answer.classList.add('answer--remove');
            setTimeout(() => {
                answer.innerHTML = '';
                answer.classList.remove('answer--remove');
            }, 500)
        }

        inputField.focus();
    };


    const checkWord = (event, word) => {
        event.preventDefault();
        let errors = 0;
        let resultString = '';
        const text = inputField.value;
        word.split('').forEach((symbol, index) => {
            if (symbol === text[index]) {
                resultString += `<span class='correct'>${symbol}</span>`
            } else {
                errors += 1;
                resultString += `<span class='wrong'>${symbol}</span>`
            }
        });
        let wordTranslateAudio;
        if (pronunciationStatus) {
            wordTranslateAudio = playAudio(words[currentWord].audio);
        }

        if (errors) {
            answer.innerHTML = resultString;
            const answerElements = answer.querySelectorAll('span');
            setTimeout(() => {
                answerElements.forEach(el => el.classList.add('default'))
            });
            inputField.value = '';
            inputField.focus();
            message.text = `${words[currentWord].word}`;
            synth.speak(message);
        } else {
            checkButton.disabled = true;
            skipButton.disabled = true;
            answer.innerHTML = `<span style = "color:green">${words[currentWord].word}</span>`
            inputField.disabled = true;

            difficultyButtons.classList.remove('visability-hidden');
            wordExplain.innerHTML = `Значение: ${words[currentWord].textMeaning}`;
            wordExample.innerHTML = `Пример: ${words[currentWord].textExample}`;
            if (showTranslate) {
                addTranslate(words[currentWord].textExampleTranslate, words[currentWord].textMeaningTranslate);
                if (pronunciationStatus) {
                    wordTranslateAudio.onended = () => {
                        const exampleTranslateAudio = playAudio(words[currentWord].audioExample);
                        exampleTranslateAudio.onended = () => {
                            const meaningTranslateAudio = playAudio(words[currentWord].audioMeaning);
                            meaningTranslateAudio.onended = () => {
                                currentWord += 1;
                                createNextCard();
                            }
                        }
                    }
                }
                else {
                    currentWord += 1;
                    setTimeout(createNextCard, 10000);
                }

            }
            else {
                setTimeout(() => {
                    currentWord += 1;
                    createNextCard();
                }, 3000);
            }
        }

    }








    cardButtons.addEventListener('click', (event) => {
        if (event.target.closest('.card__check-word-btn')) checkWord(event, words[currentWord].word);
        else if (event.target.closest('.card__skip-word-btn')) {

            inputField.value = words[currentWord].word;
            checkWord(event, words[currentWord].word);

        }
    });
    cardHeader.addEventListener('click', (event) => {
        if (event.target === cardSpeaker) {
            pronunciationStatus = !pronunciationStatus;
            cardSpeaker.classList.toggle('card__pronunciation--off');
            cardSpeaker.classList.toggle('card__pronunciation--on');
        }
        else if (event.target.closest('label')) {
            if (!translateCheckbox.checked) {
                expampleTranslate.classList.remove('set-opacity');
                meaningTranslate.classList.remove('set-opacity');
                showTranslate = true;

            }
            else {
                expampleTranslate.classList.add('set-opacity');
                meaningTranslate.classList.add('set-opacity');
                showTranslate = false;
            }
        }
    })



    inputContainer.addEventListener('click', checkAnswer);
    document.addEventListener('keydown', checkAnswer);












}