const getSettings = async () => {
    const userId = '5ef9dbf1a0d86400172933dd';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZjlkYmYxYTBkODY0MDAxNzI5MzNkZCIsImlhdCI6MTU5MzQzMzA5NywiZXhwIjoxNTkzNDQ3NDk3fQ.wOFiVm6WMD_wtOo5nuIFHkQVkV0nRudFBv0UUlT4y1k';
    let settingsFromBack;
    const errorField = document.querySelector('.settings__error');
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
