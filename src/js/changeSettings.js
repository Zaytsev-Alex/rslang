import getSettings from './getSettings';

const changeSettings = async (grp) => {
    const userId = '5ef9dbf1a0d86400172933dd';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZjlkYmYxYTBkODY0MDAxNzI5MzNkZCIsImlhdCI6MTU5MzQzMzA5NywiZXhwIjoxNTkzNDQ3NDk3fQ.wOFiVm6WMD_wtOo5nuIFHkQVkV0nRudFBv0UUlT4y1k';
    const newWordsQuantity = document.querySelector('.settings__new-words-quantity').value;
    const cardsQuantity = document.querySelector('.settings__cards-quantity').value;
    const oldSettings = await getSettings();
    const newSettings = {
        wordsPerDay: oldSettings.wordsPerDay,
        optional: oldSettings.optional ? oldSettings.optional : {},
    };
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
    newSettings.optional.cardsPerDay = cardsQuantity;
    [
        newSettings.optional.translate,
        newSettings.optional.explanation,
        newSettings.optional.example,
    ] = [
        group[0],
        group[1],
        group[2],
    ]
    newSettings.optional.transcription = transcription;
    newSettings.optional.associate = associate;
    newSettings.optional.showAnswer = showAnswer;
    newSettings.optional.showDelete = showDelete;
    newSettings.optional.showHard = showHard;
    newSettings.optional.showDifficult = showDifficult;

    let responseSendAnswer;
    const errorField = document.querySelector('.settings__error');
    try {
        const responseSend = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
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
