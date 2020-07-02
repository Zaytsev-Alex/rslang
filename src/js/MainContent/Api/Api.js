
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

    const SETTINGS = {
        newWords : 20,
        allCards: 50,
        currentPage : 0,
        currentGroup: 0,
        currentPosition: 0,
    }
    
 
    export async function getWordsToLearn(userId, token, wordsPerPage, group) {
        const wordsToLearnNumber = SETTINGS.newWords;
        let wordsToLearn = [];
        let wordsToTrain = [];
       if (wordsToLearnNumber > 0) {
         wordsToLearn = await getNewWordsToLearn(userId, token, wordsPerPage, group);
         if (wordsToLearn.length === 0) {
           SETTINGS.currentGroup +=1;
          wordsToLearn = await getNewWordsToLearn(userId, token, wordsPerPage, group);
         }
       }

       wordsToTrain = await getWordsToTrain(userId, 25, token);
       
       return {'learn':wordsToLearn, 'train' : wordsToTrain};
    }

  

