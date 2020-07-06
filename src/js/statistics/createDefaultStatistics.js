import { RSSCHOOL_API_URL } from '../authorization/variables';

const createDefaultStatistics = async () => {
    const defaultStatistics = {
        "learnedWords": 0,
        "optional": {},
    };

    let result;

    try {
        const response = await fetch(`${RSSCHOOL_API_URL}users/${localStorage.getItem('userId')}/statistics`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Accept': 'application/json',
              'Content-type': 'application/json',
              'withCredentials': 'true'
            },
            body: JSON.stringify(defaultStatistics),
        });
    
        result = await response.json();
    } catch(e) {
        console.error(e);
    }
    return result;
}

export { createDefaultStatistics as default };
