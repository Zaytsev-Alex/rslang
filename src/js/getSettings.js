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

export { getSettings as default };
