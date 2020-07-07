import getSettings from './getSettings';
import { RSSCHOOL_API_URL } from '../authorization/variables';

const changeSettings = async (grp) => {
    const newWordsQuantity = document.querySelector('.settings__new-words-quantity').value;
    const cardsQuantity = document.querySelector('.settings__cards-quantity').value;
    const easyInterval = document.querySelector('.settings__easy-interval').value;
    const mediumInterval = document.querySelector('.settings__good-interval').value;
    const oldSettings = await getSettings();
    const newSettings = {
        wordsPerDay: oldSettings.wordsPerDay,
        optional: oldSettings.optional ? oldSettings.optional : {},
    };
    if (!newSettings.optional.spacedRepetition) {
        newSettings.optional.spacedRepetition = {};
    }
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
    newSettings.wordsPerDay = newWordsQuantity;
    newSettings.optional.spacedRepetition.cardsPerDay = cardsQuantity;
    newSettings.optional.spacedRepetition.easyInterval = easyInterval;
    newSettings.optional.spacedRepetition.mediumInterval = mediumInterval;
    [
        newSettings.optional.spacedRepetition.translate,
        newSettings.optional.spacedRepetition.explanation,
        newSettings.optional.spacedRepetition.example,
    ] = [
        group[0],
        group[1],
        group[2],
    ]
    newSettings.optional.spacedRepetition.transcription = transcription;
    newSettings.optional.spacedRepetition.associateImage = associate;
    newSettings.optional.spacedRepetition.showAnswer = showAnswer;
    newSettings.optional.spacedRepetition.showDelete = showDelete;
    newSettings.optional.spacedRepetition.showHard = showHard;
    newSettings.optional.spacedRepetition.showDifficult = showDifficult;

    let responseSendAnswer;
    const errorField = document.querySelector('.settings__error');
    try {
        const responseSend = await fetch(`${RSSCHOOL_API_URL}users/${localStorage.getItem('userId')}/settings`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'withCredentials': 'true'
            },
                body: JSON.stringify(newSettings)
        });
        responseSendAnswer = await responseSend.json();
        errorField.textContent = '';
    } catch(e) {
        errorField.textContent = `Whoops: ${e}`;
    }
    return responseSendAnswer;
}

export { changeSettings as default };
