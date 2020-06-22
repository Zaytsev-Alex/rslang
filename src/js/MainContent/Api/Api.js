
export async function getPagesNumber(group) {
    const url = `https://afternoon-falls-25894.herokuapp.com/words/count?wordsPerExampleSentenceLTE=10&wordsPerPage=10&group=${group}`;
    const response = await fetch(url);
    const result = await response.json();
    return result.count;
}


export async function getWords(group, page) {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
}

