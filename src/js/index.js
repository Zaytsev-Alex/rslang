import '../css/main.css';
import '../css/main.scss';

const changeSettings = (grp) => {
    const newWordsQuantity = document.querySelector('.settings__new-words-quantity').value;
    const cardsQuantity = document.querySelector('.settings__cards-quantity').value;
    let group = [];
    if (grp) {
        group = grp.map(e => e.checked);
    } else {
        group = [
            document.querySelector('.settings__translate').checked,
            document.querySelector('.settings__meaning').checked,
            document.querySelector('.settings__example').checked,
        ]
    }
    const transcription = document.querySelector('.settings__transcription').checked;
    const associate = document.querySelector('.settings__image').checked;
    const showAnswer = document.querySelector('.settings__show-answer').checked;
    const showDelete = document.querySelector('.settings__show-delete').checked;
    const showHard = document.querySelector('.settings__show-hard').checked;
    const showDifficult = document.querySelector('.settings__show-difficult').checked;

    const settings = {
        wordsPerDay: newWordsQuantity,
        optional: {
            cardsPerDay: cardsQuantity,
            translate: group[0],
            explanation: group[1],
            example: group[2],
            transcription,
            associate,
            showAnswer,
            showDelete,
            showHard,
            showDifficult,
        } 
    }

    console.log(settings)
}

const changeSettingsHolder = () => {
    const submitButton = document.querySelector('.settings__submit');
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        const group = [
            document.querySelector('.settings__translate'),
            document.querySelector('.settings__meaning'),
            document.querySelector('.settings__example'),
        ]
        let check = 0;
        group.forEach((e) => {
            check += e.checked;
        });
        if (check) {
            group.forEach(e => e.parentElement.querySelector('span').classList.remove('error'));
            changeSettings(group);
        } else {
            group.forEach(e => e.parentElement.querySelector('span').classList.add('error'));
        }
    });
}

const changeRangeOutput = () => {
    const newWordsQuantity = document.querySelector('.settings__new-words-quantity');
    const cardsQuantity = document.querySelector('.settings__cards-quantity');
    newWordsQuantity.addEventListener('change', () => {
        document.querySelector('.settings__new-words-output').textContent = newWordsQuantity.value;
    })
    cardsQuantity.addEventListener('change', () => {
        document.querySelector('.settings__cards-output').textContent = cardsQuantity.value;
    })
}

changeRangeOutput();
changeSettingsHolder();