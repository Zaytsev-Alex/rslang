import { RSSCHOOL_API_URL } from '../authorization/variables';

const createDefaultStatistics = async () => {
    const defaultStatistics = {
        "learnedWords": 0,
        "optional": {
            "spacedRepetition" : {
                "dayStat" : {
                    "date" : "01.01.2020",
                    "newWords" : 0,
                    "successfulAttempts": 0,
                    "unsuccessfulAttempts": 0,
                    "totalAttempts":0,
                    "correctAnswerSeries":0,
                    "finalCorrectAnswerSeries" : 0,
                    "totalWords":0
                }
            }
        }
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
