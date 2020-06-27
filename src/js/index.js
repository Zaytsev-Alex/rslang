import '../css/main.css';
import '../css/main.scss';

const getSettings = async () => {
    const userId = '5ef73fb72f8ea50017c8bda2';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZjczZmI3MmY4ZWE1MDAxN2M4YmRhMiIsImlhdCI6MTU5MzI2MjAzNiwiZXhwIjoxNTkzMjc2NDM2fQ.CNoTVNAlEO4gGGHgJQCvF9Jjsy0q7hI7J9U5ksoubJw';
    let settingsFromBack;
    try {
        const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'withCredentials': true,
                'Accept': 'application/json',
            }
        });
        settingsFromBack = await response.json();
    } catch(e) {
        console.error(e);
    }
    return settingsFromBack;
}

const changeSettings = async (grp) => {
    const userId = '5ef73fb72f8ea50017c8bda2';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZjczZmI3MmY4ZWE1MDAxN2M4YmRhMiIsImlhdCI6MTU5MzI2MjAzNiwiZXhwIjoxNTkzMjc2NDM2fQ.CNoTVNAlEO4gGGHgJQCvF9Jjsy0q7hI7J9U5ksoubJw';
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
    } catch(e) {
        console.error(e);
    }
    return responseSendAnswer;
}

const settingsSendIndicator = () => {
    const submitButton = document.querySelector('.settings__submit');
    submitButton.classList.add('settings__submit-loading');
}

const settingsSendIndicatorHide = () => {
    const submitButton = document.querySelector('.settings__submit');
    submitButton.classList.remove('settings__submit-loading');
    submitButton.classList.add('settings__submit-validate');
    setTimeout(() => {
        submitButton.classList.remove('settings__submit-validate');
    }, 1000);
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
            settingsSendIndicator();
            changeSettings(group).then(() => {
                settingsSendIndicatorHide();
            })
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

const settingsGetIndicator = () => {
    const indicator = document.createElement('div');
    indicator.classList.add('settings__get-indicator');
    const spinner = document.createElement('img');
    spinner.classList.add('settings__get-indicator_spinner');
    spinner.setAttribute('src', '../img/settings-gear.gif');
    indicator.appendChild(spinner);
    document.querySelector('.container').appendChild(indicator);
}

const settingsGetIndicatorHide = () => {
    document.querySelector('.settings__get-indicator').remove();
}

const showSettings = async () => {
    settingsGetIndicator();
    const settings = await getSettings();

    const container = document.querySelector('.container');
    container.classList.add('settings');
    const form = document.createElement('form');

    const labeltNewWords = document.createElement('label');
    labeltNewWords.setAttribute('for', 'settings__new-words-quantity');
    labeltNewWords.textContent = 'Укажите количество слов, которые вы хотите изучать за день';
    form.appendChild(labeltNewWords);

    const settingsHor = document.createElement('div');
    settingsHor.classList.add('settings-hor');
    const newWords = document.createElement('input');
    newWords.setAttribute('type', 'range');
    newWords.setAttribute('id', 'settings__new-words-quantity');
    newWords.setAttribute('min', '5');
    newWords.setAttribute('max', '100');
    newWords.setAttribute('value', settings.wordsPerDay ? settings.wordsPerDay : '20');
    newWords.classList.add('settings__new-words-quantity');
    settingsHor.appendChild(newWords);

    const newWordsOutput = document.createElement('output');
    newWordsOutput.classList.add('settings__new-words-output');
    newWordsOutput.textContent = newWords.value;
    settingsHor.appendChild(newWordsOutput);
    form.appendChild(settingsHor);

    const cardsQuantity = document.createElement('label');
    cardsQuantity.setAttribute('for', 'settings__cards-quantity');
    cardsQuantity.textContent = 'Укажите максимальное число карточек за день';
    form.appendChild(cardsQuantity);

    const settingsHor1 = document.createElement('div');
    settingsHor1.classList.add('settings-hor');
    const cards = document.createElement('input');
    cards.setAttribute('type', 'range');
    cards.setAttribute('id', 'settings__cards-quantity');
    cards.setAttribute('min', '5');
    cards.setAttribute('max', '100');
    cards.setAttribute('value', settings.optional.cardsPerDay ? settings.optional.cardsPerDay : '20');
    cards.classList.add('settings__cards-quantity');
    settingsHor1.appendChild(cards);

    const cardsOutput = document.createElement('output');
    cardsOutput.classList.add('settings__cards-output');
    cardsOutput.textContent = cards.value;
    settingsHor1.appendChild(cardsOutput);

    form.appendChild(settingsHor1)

    const settingsHor2 = document.createElement('div');
    settingsHor2.classList.add('settings-hor', 'settings__checkbox');
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', 'settings__translate');
    checkbox.classList.add('settings__translate');
    if (settings.optional.translate) {
        checkbox.setAttribute('checked', 'checked');
    }
    settingsHor2.appendChild(checkbox);

    const label = document.createElement('label');
    label.setAttribute('for', 'settings__translate');
    label.innerHTML = '<span></span>Отображать перевод слова?';
    settingsHor2.appendChild(label);
    form.appendChild(settingsHor2);

    const settingsHor3 = document.createElement('div');
    settingsHor3.classList.add('settings-hor', 'settings__checkbox');
    const checkbox1 = document.createElement('input');
    checkbox1.setAttribute('type', 'checkbox');
    checkbox1.setAttribute('id', 'settings__meaning');
    checkbox1.classList.add('settings__meaning');
    if (settings.optional.explanation) {
        checkbox1.setAttribute('checked', 'checked');
    }
    settingsHor3.appendChild(checkbox1);

    const label1 = document.createElement('label');
    label1.setAttribute('for', 'settings__meaning');
    label1.innerHTML = '<span></span>Отображать предложение с объяснением значения слова?';
    settingsHor3.appendChild(label1);
    form.appendChild(settingsHor3);

    const settingsHor4 = document.createElement('div');
    settingsHor4.classList.add('settings-hor', 'settings__checkbox');
    const checkbox2 = document.createElement('input');
    checkbox2.setAttribute('type', 'checkbox');
    checkbox2.setAttribute('id', 'settings__example');
    checkbox2.classList.add('settings__example');
    if (settings.optional.example) {
        checkbox2.setAttribute('checked', 'checked');
    }
    settingsHor4.appendChild(checkbox2);

    const label2 = document.createElement('label');
    label2.setAttribute('for', 'settings__example');
    label2.innerHTML = '<span></span>Отображать предложение с примером употребления слова?';
    settingsHor4.appendChild(label2);
    form.appendChild(settingsHor4);

    const settingsHor5 = document.createElement('div');
    settingsHor5.classList.add('settings-hor', 'settings__checkbox');
    const checkbox3 = document.createElement('input');
    checkbox3.setAttribute('type', 'checkbox');
    checkbox3.setAttribute('id', 'settings__transcription');
    checkbox3.classList.add('settings__transcription');
    if (settings.optional.transcription) {
        checkbox3.setAttribute('checked', 'checked');
    }
    settingsHor5.appendChild(checkbox3);

    const label3 = document.createElement('label');
    label3.setAttribute('for', 'settings__transcription');
    label3.innerHTML = '<span></span>Отображать транскрипцию слова?';
    settingsHor5.appendChild(label3);
    form.appendChild(settingsHor5);

    const settingsHor6 = document.createElement('div');
    settingsHor6.classList.add('settings-hor', 'settings__checkbox');
    const checkbox4 = document.createElement('input');
    checkbox4.setAttribute('type', 'checkbox');
    checkbox4.setAttribute('id', 'settings__image');
    checkbox4.classList.add('settings__image');
    if (settings.optional.associate) {
        checkbox4.setAttribute('checked', 'checked');
    }
    settingsHor6.appendChild(checkbox4);

    const label4 = document.createElement('label');
    label4.setAttribute('for', 'settings__image');
    label4.innerHTML = '<span></span>Отображать картинку-ассоциацию слова?';
    settingsHor6.appendChild(label4);
    form.appendChild(settingsHor6);

    const settingsHor7 = document.createElement('div');
    settingsHor7.classList.add('settings-hor', 'settings__checkbox');
    const checkbox5 = document.createElement('input');
    checkbox5.setAttribute('type', 'checkbox');
    checkbox5.setAttribute('id', 'settings__show-answer');
    checkbox5.classList.add('settings__show-answer');
    if (settings.optional.showAnswer) {
        checkbox5.setAttribute('checked', 'checked');
    }
    settingsHor7.appendChild(checkbox5);

    const label5 = document.createElement('label');
    label5.setAttribute('for', 'settings__show-answer');
    label5.innerHTML = '<span></span>Отображать кнопку "Показать ответ"?';
    settingsHor7.appendChild(label5);
    form.appendChild(settingsHor7);

    const settingsHor8 = document.createElement('div');
    settingsHor8.classList.add('settings-hor', 'settings__checkbox');
    const checkbox6 = document.createElement('input');
    checkbox6.setAttribute('type', 'checkbox');
    checkbox6.setAttribute('id', 'settings__show-delete');
    checkbox6.classList.add('settings__show-delete');
    if (settings.optional.showDelete) {
        checkbox6.setAttribute('checked', 'checked');
    }
    settingsHor8.appendChild(checkbox6);

    const label6 = document.createElement('label');
    label6.setAttribute('for', 'settings__show-delete');
    label6.innerHTML = '<span></span>Отображать кнопку "Удалить"?';
    settingsHor8.appendChild(label6);
    form.appendChild(settingsHor8);

    const settingsHor9 = document.createElement('div');
    settingsHor9.classList.add('settings-hor', 'settings__checkbox');
    const checkbox7 = document.createElement('input');
    checkbox7.setAttribute('type', 'checkbox');
    checkbox7.setAttribute('id', 'settings__show-hard');
    checkbox7.classList.add('settings__show-hard');
    if (settings.optional.showHard) {
        checkbox7.setAttribute('checked', 'checked');
    }
    settingsHor9.appendChild(checkbox7);

    const label7 = document.createElement('label');
    label7.setAttribute('for', 'settings__show-hard');
    label7.innerHTML = '<span></span>Возможность поместить слово в раздел сложные "Сложные"?';
    settingsHor9.appendChild(label7);
    form.appendChild(settingsHor9);

    const settingsHor10 = document.createElement('div');
    settingsHor10.classList.add('settings-hor', 'settings__checkbox');
    const checkbox8 = document.createElement('input');
    checkbox8.setAttribute('type', 'checkbox');
    checkbox8.setAttribute('id', 'settings__show-difficult');
    checkbox8.classList.add('settings__show-difficult');
    if (settings.optional.showDifficult) {
        checkbox8.setAttribute('checked', 'checked');
    }
    settingsHor10.appendChild(checkbox8);

    const label8 = document.createElement('label');
    label8.setAttribute('for', 'settings__show-difficult');
    label8.innerHTML = '<span></span>Отображать кнопки "Снова", "Трудно", "Хорошо", "Легко"?';
    settingsHor10.appendChild(label8);
    form.appendChild(settingsHor10);

    const submitContainer = document.createElement('div');
    submitContainer.classList.add('settings__submit-container');
    const submitButton = document.createElement('button');
    submitButton.classList.add('settings__submit');
    submitContainer.appendChild(submitButton);
    form.appendChild(submitContainer);

    container.appendChild(form);
    settingsGetIndicatorHide();
    changeRangeOutput();
    changeSettingsHolder();
}

showSettings();