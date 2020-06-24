import './Template/mainTemplate'
import {
    getWords
} from './Api/Api'
import {
    addTranslate,
    playAudio,
    addCardInfo
} from '../Utils/Utils'
import {
    CARD_HEADER,
    CURRENT_PROGRESS,
    START_VALUE,
    END_WALUE,
    INPUT_CONTAINER,
    INPUT_FIELD,
    ANSWER,
    CARD_BUTTONS,
    EXAMPLE_TRANSLATE,
    MEANING_TRANSLATE,
    WORD_EXPLAIN,
    WORD_EXAMPLE,
    DIFFICULTY_BUTTONS,
    CHECK_BUTTON,
    SKIP_BUTTON,
    CARD_SPEAKER,
    TRANSLATE_CHECKBOX,
    NAVIGATE_NEXT
} from '../Variables/variables'


export default async function createMainContent() {
    let currentWord = 0;
    const words = await getWords(1, 1);
    addCardInfo(words[currentWord]);
    console.log(words);

    INPUT_FIELD.focus();
    START_VALUE.textContent = currentWord;
    END_WALUE.textContent = words.length;


    let showTranslate = true;
    let pronunciationStatus = true;

    const createNextCard = () => {
        CHECK_BUTTON.disabled = false;
        SKIP_BUTTON.disabled = false;
        INPUT_FIELD.disabled = false;
        NAVIGATE_NEXT.disabled = true;
        NAVIGATE_NEXT.classList.add('visability-hidden');
        DIFFICULTY_BUTTONS.classList.add('visability-hidden')
        ANSWER.innerHTML = '';
        INPUT_FIELD.value = '';
        START_VALUE.textContent = currentWord;
        CURRENT_PROGRESS.style.width = `${START_VALUE.textContent / END_WALUE.textContent * 100}%`;
        EXAMPLE_TRANSLATE.textContent = '';
        MEANING_TRANSLATE.textContent = '';
        addCardInfo(words[currentWord]);
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


    const checkWord = (event, word) => {
        event.preventDefault();
        let errors = 0;
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
        let wordTranslateAudio;
        if (pronunciationStatus) {
            wordTranslateAudio = playAudio(words[currentWord].audio);
        }

        if (errors) {
            ANSWER.innerHTML = resultString;
            const answerElements = ANSWER.querySelectorAll('span');
            setTimeout(() => {
                answerElements.forEach(el => el.classList.add('default'))
            });
            INPUT_FIELD.value = '';
            INPUT_FIELD.focus();
        } else {
            CHECK_BUTTON.disabled = true;
            SKIP_BUTTON.disabled = true;
            ANSWER.innerHTML = `<span style = "color:green">${words[currentWord].word}</span>`
            INPUT_FIELD.disabled = true;
            DIFFICULTY_BUTTONS.classList.remove('visability-hidden');
            WORD_EXPLAIN.innerHTML = `Значение: ${words[currentWord].textMeaning}`;
            WORD_EXAMPLE.innerHTML = `Пример: ${words[currentWord].textExample}`;
            NAVIGATE_NEXT.disabled = false;
            NAVIGATE_NEXT.classList.remove('visability-hidden');
            if (showTranslate) {
                addTranslate(words[currentWord].textExampleTranslate, words[currentWord].textMeaningTranslate);
                if (pronunciationStatus) {
                    wordTranslateAudio.onended = () => {
                        const exampleTranslateAudio = playAudio(words[currentWord].audioExample);
                        exampleTranslateAudio.onended = () => {
                            const meaningTranslateAudio = playAudio(words[currentWord].audioMeaning);
                            meaningTranslateAudio.onended = () => {

                            }
                        }
                    }
                } else {
                    currentWord += 1;
                    setTimeout(createNextCard, 10000);
                }

            } else {
                setTimeout(() => {
                    currentWord += 1;
                    createNextCard();
                }, 3000);
            }
        }

    }

    CARD_BUTTONS.addEventListener('click', (event) => {
        if (event.target.closest('.card__check-word-btn')) checkWord(event, words[currentWord].word);
        else if (event.target.closest('.card__skip-word-btn')) {

            INPUT_FIELD.value = words[currentWord].word;
            checkWord(event, words[currentWord].word);

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

    NAVIGATE_NEXT.addEventListener('click', () => {
        currentWord += 1;
        createNextCard();
    });

    INPUT_CONTAINER.addEventListener('click', checkAnswer);
    document.addEventListener('keydown', checkAnswer);












}