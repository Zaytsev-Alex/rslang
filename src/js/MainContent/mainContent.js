import createCard from './Cards/Card/card'
import addCardInfo from './Cards/cardInfo'
import { getWords } from './Api/Api'




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



    const inputContainer = document.querySelector('.card__input-container');
    const inputField = mainWrapper.querySelector('.card__input');
    const answer = document.querySelector('.answer');
    inputField.focus();
    const cardButtons = document.querySelector('.card__buttons');

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
            }
            else {
                errors += 1;
                resultString += `<span class='wrong'>${symbol}</span>`
            }
        });
        

        if (errors) {
        answer.innerHTML = resultString;
        const answerElements = answer.querySelectorAll('span');
        setTimeout(() => { answerElements.forEach(el => el.classList.add('default')) });
        inputField.value = '';
        inputField.focus();
        }
        else {
            answer.innerHTML = `<span style = "color:green">${words[currentWord].word}</span>`
            inputField.disabled = true;
            currentWord += 1;
            setTimeout(()=> {
            answer.innerHTML = '';
            inputField.value = '';    
            addCardInfo(words[currentWord]);
            inputField.disabled = false;
            }, 2000);
        }
    }






    cardButtons.addEventListener('click', (event) => {
        if (event.target.closest('.card__check-word-btn')) checkWord(event, words[currentWord].word);
        else if (event.target.closest('.card__skip-word-btn')) {

            inputField.disabled = false;
            
        }
    });




    inputContainer.addEventListener('click', checkAnswer);
    document.addEventListener('keydown', checkAnswer);










}
