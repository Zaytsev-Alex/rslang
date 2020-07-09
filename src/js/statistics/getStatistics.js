const getStatistics = async () => {
    let statistics;
    try {
        const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${localStorage.getItem('userId')}/statistics`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'withCredentials': true,
                'Accept': 'application/json',
            }
        });
        statistics = await response.json();
    } catch(e) {
        console.error(e);
    }
    return statistics;
}

export { getStatistics as default };
