import { RSSCHOOL_API_URL } from '../authorization/variables';

const createDefaultSettings = async () => {
    const defaultSettings = {
        "wordsPerDay": 10,
        "optional": {
          "spacedRepetition": {
            "cardsPerDay": 50,
            "easyInterval": 4,
            "mediumInterval": 2,
            "hardInterval": 1,
            "translate": true,
            "explanation": true,
            "example": true,
            "transcription": true,
            "associateImage": false,
            "showAnswer": true,
            "showDelete": true,
            "showHard": true,
            "showDifficult": true,
            "group": 0,
            "complicatedInterval": 1
          }
        }
    };
    
    let result;

    try {
        const response = await fetch(`${RSSCHOOL_API_URL}users/${localStorage.getItem('userId')}/settings`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Accept': 'application/json',
              'Content-type': 'application/json',
              'withCredentials': 'true'
            },
            body: JSON.stringify(defaultSettings),
        });
      
        result = await response.json();
    } catch(e) {
        console.error(e);
    }
    return result;
}

export { createDefaultSettings as default };
