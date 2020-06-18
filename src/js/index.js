import "../css/style.css";
import "../css/style.scss";
import createMainContent from './MainContent/mainContent'



createMainContent();
const inputContainer = document.querySelector('.card__input-container');
const inputField = document.querySelector('.card__input');
const answer = document.querySelector('.answer');
inputField.focus();
// const navigateNext = document.querySelector('.navigate--next');
const cardButtons = document.querySelector('.card__buttons');


const checkWord = (event, word) => {
    event.preventDefault();
    let errors = 0;
    let resultString = '';
    const text = inputField.value;
    word.split('').forEach((symbol, index) => {
        if (symbol === text[index]) {
            resultString += `<span class='correct'>${symbol}</span>`
        }
        else {
            errors += 1;
            resultString += `<span class='wrong'>${symbol}</span>`
        }
    });
    console.log(errors);
    answer.innerHTML = resultString;

    const answerElements = answer.querySelectorAll('span');
    setTimeout(() => { answerElements.forEach(el => el.classList.add('default')) });
    inputField.value = '';
    inputField.focus();
}

const checkAnswer = () => {
    
    if (document.querySelector('.answer span') !== null) {
        answer.classList.add('answer--remove');
        setTimeout(() => {
            answer.innerHTML = '';
            answer.classList.remove('answer--remove');
        }, 500)
    }

    // answer.classList.remove('answer--remove');
    inputField.focus();
};

cardButtons.addEventListener('click', (evt) => { checkWord(evt, 'desire') });
inputContainer.addEventListener('click', checkAnswer);
document.addEventListener('keydown', checkAnswer
    
);
