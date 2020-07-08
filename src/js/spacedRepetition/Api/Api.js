import {compareDates} from '../Utils/Utils'

export async function getPagesNumber(group) {
    const url = `https://afternoon-falls-25894.herokuapp.com/words/count?group=${group}`;
    const response = await fetch(url);
    const result = await response.json();
    console.log(result.count);
}


export async function getWords(group, page) {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
}

export const createUserWord = async ({ userId, wordId, word}, token) => {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
      method: 'POST',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(word)
    });
    const content = await rawResponse.json();
    console.log(content, 'created');
  };

  export const getUserWord = async ({ userId, wordId }, token) => {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });
    const content = await rawResponse.json();
  
    console.log(content);
  };

  export const getUserWords = async ({ userId}, token) => {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });
    const content = await rawResponse.json();
    console.log(content);
  };


  export const updateUserWord = async (userId, wordId, word, token) => {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(word)
    });
    const content = await rawResponse.json();
    console.log(content);
  };


  export const getNewWordsToLearn = async (userId, token, wordsPerPage, group) => {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/aggregatedWords?wordsPerPage=${wordsPerPage}&group=${group}&filter={"userWord":null}`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });
    const content = await rawResponse.json();
    return content[0].paginatedResults;
  };
  
  export const getWordsToTrain = async (userId, wordsPerPage, token) => {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/aggregatedWords?wordsPerPage=${wordsPerPage}&filter={"$or": [{"userWord.difficulty":"easy"},{"userWord.difficulty":"medium"},{"userWord.difficulty":"hard"},{"userWord.difficulty":"complicated"}]}`,
    {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });
    const content = await rawResponse.json();
    console.log(content, 'wordsTrain');
    return content[0].paginatedResults;
  };

  export const getAgregateWord = async (userId, wordId, token) => {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/aggregatedWords/${wordId}`,
    {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });
    const content = await rawResponse.json();
    console.log(content[0],'wordPaginated');
     return content[0];
  };

  export const getUserSettings = async ( userId,token) => {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });
    const settings = await rawResponse.json();
    return settings;
  };

  export const updateUserSettings = async (userId,token, word) => {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(word)
    });
    // eslint-disable-next-line no-debugger
    debugger;
    const content = await rawResponse.json();
    console.log(content);
  };
    
 
    export async function getWordsToLearn(userId, token, newWordsToLearnNumber, group) {
        console.log(group)
        let wordsToLearn = [];
        let wordsToTrain = [];
       if (newWordsToLearnNumber > 0) {
         wordsToLearn = await getNewWordsToLearn(userId, token, newWordsToLearnNumber, group);
         if (wordsToLearn.length === 0) {
           const SETTINGS = await getUserSettings(userId,token);
           
           SETTINGS.optional.spacedRepetition.group += 1;
           updateUserSettings(userId, token, {'wordsPerDay' : SETTINGS.wordsPerDay, 'optional' : SETTINGS.optional})
          wordsToLearn = await getNewWordsToLearn(userId, token, newWordsToLearnNumber, SETTINGS.optional.spacedRepetition.group);

         }
       }
       wordsToTrain = await getWordsToTrain(userId, 15, token);

       const filteredWordsToTrain = wordsToTrain.filter( (el) => {
         console.log(el);
       return compareDates(new Date().toLocaleDateString("ru-Ru", {"year": "numeric","month": "numeric","day": "numeric"}), el.userWord.optional.nextDate);
       })
    
       console.log(filteredWordsToTrain);
       return {'learn':wordsToLearn, 'train' : filteredWordsToTrain};
    }




    export const getUserStatistic = async ( userId,token) => {
      const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`, {
        method: 'GET',
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });
      const statistic = await rawResponse.json();
      return statistic;
    };


    export const updateUserStatistic = async (userId,token, statistic) => {
      const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`, {
        method: 'PUT',
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'learnedWords' : statistic.learnedWords,
      'optional' : statistic.optional})
      });
      const content = await rawResponse.json();
      console.log(content);
    };

