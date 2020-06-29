import { settingsSendIndicator, settingsSendIndicatorHide } from './settingsLoadIndicator';
import changeSettings from './changeSettings';

const messeges = {
    choose: 'Пожалуйста, отметьте как минимум один из выделенных пунктов',
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
        const errorField = document.querySelector('.settings__error');
        if (check) {
            group.forEach(e => e.parentElement.querySelector('span').classList.remove('error'));
            errorField.textContent = '';
            settingsSendIndicator();
            changeSettings(group).then(() => {
                settingsSendIndicatorHide();
            })
        } else {
            errorField.textContent = messeges.choose;
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

export { changeSettingsHolder, changeRangeOutput };
