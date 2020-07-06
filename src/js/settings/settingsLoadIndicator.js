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

export { settingsGetIndicator, settingsSendIndicator, settingsGetIndicatorHide, settingsSendIndicatorHide };
