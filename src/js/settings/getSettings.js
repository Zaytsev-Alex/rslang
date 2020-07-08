import { RSSCHOOL_API_URL } from '../authorization/variables';

const getSettings = async () => {
    let settingsFromBack;
    const errorField = document.querySelector('.settings__error');
    try {
        const response = await fetch(`${RSSCHOOL_API_URL}users/${localStorage.getItem('userId')}/settings`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'withCredentials': true,
                'Accept': 'application/json',
            }
        });
        settingsFromBack = await response.json();
        if (errorField) {
            errorField.textContent = '';
        }
    } catch(e) {
        if (errorField) {
            errorField.textContent = '';
        }
    }
    return settingsFromBack;
}

export { getSettings as default };
