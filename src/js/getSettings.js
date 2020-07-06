const getSettings = async () => {
    const userId = '5f02e9259c3d6500177e3dec';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMDJlOTI1OWMzZDY1MDAxNzdlM2RlYyIsImlhdCI6MTU5NDA0MDg3NSwiZXhwIjoxNTk0MDU1Mjc1fQ.Xfd-KEsekmKQ2e9X63P68JOhCoD8U669VuYTN3QNh74';
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
