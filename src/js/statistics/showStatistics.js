import getStatistics from './getStatistics';
import { authorizationLoaderShow as loaderShow, authorizationLoaderHide as loaderHide } from '../authorization/loader';

const getGraph = (statistics) => {
    const graph = document.createElement('div');
    graph.classList.add('statistics__graph');

    const h3 = document.createElement('h3');
    h3.classList.add('statistics__total-count-words');
    h3.textContent = `Всего слов изучено: ${statistics.learnedWords}`;
    graph.appendChild(h3);

    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', '400');
    canvas.setAttribute('height', '200');
    graph.appendChild(canvas);

    const output = document.createElement('output');
    output.classList.add('statistics__graph-output');
    output.textContent = `${statistics.learnedWords} слов`;
    graph.appendChild(output);

    let textPercent = 0;
    if (statistics.learnedWords) {
        textPercent = Math.floor(11.74096 * Math.log(statistics.learnedWords / 12.5));
    }

    const range = document.createElement('input');
    range.setAttribute('type', 'range');
    range.setAttribute('id', 'statistics__graph-range');
    range.setAttribute('min', '0');
    range.setAttribute('max', '100');
    range.setAttribute('step', '1');
    range.setAttribute('value', textPercent);
    range.classList.add('statistics__graph-range');
    graph.appendChild(range);
 
    const label = document.createElement('label');
    label.setAttribute('for', 'statistics__graph-range');
    label.classList.add('statistics__graph-label');
    label.textContent = `${textPercent}% любого текста.`;
    graph.appendChild(label);
    
    return graph;
}

const makeCanvasGraph = () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');    
    ctx.clearRect(0, 0, 400, 200);
    ctx.beginPath();
    ctx.moveTo(0, 200);
    for (let x = 1; x < 401; x += 1) {
        const y = 11.74096 * Math.log(x);
        ctx.lineTo(x, 200 - y * 2.5);
    }
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#59da6a';
    ctx.fillStyle = 'rgba(40, 195, 138, 0.3)';
    ctx.lineTo(400, 200);
    ctx.lineTo(0, 200);
    ctx.stroke();
    ctx.fill();
}

const setActivePointGraph = (words, status) => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');    
    ctx.beginPath();
    ctx.moveTo(0, 200);
    let x = 1;
    let y = 0;
    while (x < words / 12.5) {
        y = 11.74096 * Math.log(x);
        ctx.lineTo(x, 200 - y * 2.5);
        x += 1;
    }
    if (status) {
        document.querySelector('.statistics__graph-label').textContent = `${Math.floor(y * 1.3)}% любого текста.`;
    }
    document.querySelector('.statistics__graph-output').textContent = `${Math.round(words)} слов`;
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#59da6a';
    ctx.fillStyle = 'rgba(40, 195, 138, 0.7)';
    ctx.lineTo(x, 200);
    ctx.lineTo(0, 200);
    ctx.stroke();
    ctx.fill();
    ctx.moveTo(x, 200 - y * 2.5);
    ctx.arc(x, 200 - y * 2.5, 5, 0, Math.PI * 2);
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fill();
}

const setActivePointGraphHolder = () => {
    const range = document.querySelector('.statistics__graph-range');
    range.addEventListener('change', () => {
        let x = 0;
        let y = 0;
        while (y * 2 < range.value) {
            y = 11.74096 * Math.log(x);
            x += 1;
        }
        makeCanvasGraph();
        setActivePointGraph(69.44444 * x, true);
    })
}

const getSprintStatistics = (statistics) => {
    const sprintArray = statistics.optional.sprint.split(',');
    let sprintMax = sprintArray[0];
    let sprintAvg = 0;
    let sprintTryCounter = 0;
    let sprintGuessedCounter = 0;
    let sprintAvgPercent = 0;
    for (let i = 0; i < sprintArray.length; i += 4) {
        if (Number(sprintArray[i]) > Number(sprintMax)) {
            sprintMax = sprintArray[i];
        }
        sprintAvg += Number(sprintArray[i]);
        sprintTryCounter += Number(sprintArray[i + 1]);
        sprintGuessedCounter += Number(sprintArray[i + 2]);
        sprintAvgPercent += Number(sprintArray[i + 2]) / Number(sprintArray[i + 1]);
    };
    sprintAvg /= sprintArray.length / 4;
    sprintAvg = sprintAvg.toFixed(2);
    sprintTryCounter /= sprintArray.length / 4;
    sprintTryCounter = Math.floor(sprintTryCounter);
    sprintGuessedCounter /= sprintArray.length / 4;
    sprintGuessedCounter = Math.floor(sprintGuessedCounter);
    sprintAvgPercent /= sprintArray.length / 4;
    sprintAvgPercent *= 100;
    sprintAvgPercent = sprintAvgPercent.toFixed(2);
    const statisticsSprint = document.createElement('div');
    statisticsSprint.classList.add('statistics__sprint', 'statistics__item');
    const sprintHeader = document.createElement('h2');
    sprintHeader.textContent = 'Статистика Sprint';
    statisticsSprint.appendChild(sprintHeader);
    const sprintStatisticsDescription = document.createElement('ul');
    const sprintHigherScore = document.createElement('li');
    sprintHigherScore.textContent = `Ваш лучший счет: ${sprintMax}`;
    sprintStatisticsDescription.appendChild(sprintHigherScore);
    const sprintAvgScore = document.createElement('li');
    sprintAvgScore.textContent = `Ваш средний счет: ${sprintAvg}`;
    sprintStatisticsDescription.appendChild(sprintAvgScore);
    const sprintAvgTry = document.createElement('li');
    sprintAvgTry.textContent = `В среднем вы доходите до ${sprintTryCounter} слова, отгадывая ${sprintGuessedCounter} слов`;
    sprintStatisticsDescription.appendChild(sprintAvgTry);
    const sprintPercent = document.createElement('li');
    sprintPercent.textContent = `Процент правильных ответов: ${sprintAvgPercent}%`;
    sprintStatisticsDescription.appendChild(sprintPercent);
    statisticsSprint.appendChild(sprintStatisticsDescription);
    const lastGames = document.createElement('div');
    for (let i = 0; i < sprintArray.length; i += 4) {
        const p = document.createElement('p');
        const date = sprintArray[i + 3].split(':');
        date[0] = date[0].padStart(2, '0');
        date[1] = date[1].padStart(2, '0');
        p.textContent = `Вы играли ${date.join('.')} со счетом ${sprintArray[i]}, отгадав ${sprintArray[i + 2]} из ${sprintArray[i + 1]} слов.`
        lastGames.appendChild(p);
    }

    statisticsSprint.appendChild(lastGames)

    return statisticsSprint;
}

const getAudioStatistics = () => {

     if(localStorage.getItem('gameTable') === null){
        localStorage.setItem('gameTable', 0);
        localStorage.setItem('rightTable', 0);
        localStorage.setItem('wrongTable', 0);
    }

    const statisticsAudio = document.createElement('div');
    statisticsAudio.classList.add('statistics__audio-call', 'statistics__item');
    const audioHeader = document.createElement('h2');
    audioHeader.textContent = 'Статистика Аудио вызов';
    statisticsAudio.appendChild(audioHeader);
    const audioStatisticsDescription = document.createElement('p');
    audioStatisticsDescription.innerHTML = `<p>Сыграно игр: ${localStorage.getItem('gameTable')}
    <p>Правильных ответов: ${localStorage.getItem('rightTable')}</p>
    <p>Неправильных ответов: ${localStorage.getItem('wrongTable')}</p>`;
    statisticsAudio.appendChild( audioStatisticsDescription);

    return statisticsAudio;
}

const getPuzzleStatistics = (statistics) => {
    // console.log(statistics)
    const puzzleStatistics = statistics.optional.puzzle;
    const NUMBER_DAYS = Object.entries(puzzleStatistics).length;
    let totalCountGames = 0;
    let totalRight = 0;
    let totalWrong = 0;

    for (let i = NUMBER_DAYS - 1; i >= 0; i -= 1) {
        totalCountGames += Object.values(puzzleStatistics)[i].countGame;
        totalRight += Object.values(puzzleStatistics)[i].right;
        totalWrong += Object.values(puzzleStatistics)[i].wrong;
    }    

    function daysStat() {
        const DIV = document.createElement('div');

        for (let i = NUMBER_DAYS - 1; i >= 0; i -= 1) {            
            const DATE = document.createElement('p');
            const COUNT_GAMES = document.createElement('p');
            const RIGHT = document.createElement('p');
            const WRONG = document.createElement('p');

            DATE.textContent = `* Дата: ${(Object.entries(puzzleStatistics)[i])[0]}`;
            COUNT_GAMES.textContent = `- Сыграно игр: ${(Object.entries(puzzleStatistics)[i])[1].countGame}`;
            RIGHT.textContent = `- Правильных ответов: ${(Object.entries(puzzleStatistics)[i])[1].right}`;
            WRONG.textContent = `- Неправильных ответов: ${(Object.entries(puzzleStatistics)[i])[1].wrong}`;
            
            DIV.append(DATE, COUNT_GAMES, RIGHT, WRONG)            
        } 
        
        // console.log(DIV)
        return DIV;
    }

    const statisticsPuzzle = document.createElement('div');
    statisticsPuzzle.classList.add('statistics__puzzle', 'statistics__item');
    const puzzleHeader = document.createElement('h2');
    puzzleHeader.textContent = 'Статистика English Puzzle';
    statisticsPuzzle.appendChild(puzzleHeader);
    const puzzleStatisticsDescription = document.createElement('div');
    puzzleStatisticsDescription.innerHTML = 
        `<p>Всего сыграно игр: ${totalCountGames}</p>
        <p>Всего правильных ответов: ${totalRight}</p>
        <p>Всего неправильных ответов: ${totalWrong}</p>`;
    puzzleStatisticsDescription.append(daysStat());
    statisticsPuzzle.appendChild(puzzleStatisticsDescription);
    return statisticsPuzzle;
}

const getSpeakStatistics = (statistics) => {
    console.log(statistics)

    const statisticsSpeak = document.createElement('div');
    statisticsSpeak.classList.add('statistics__speak', 'statistics__item');
    const speakHeader = document.createElement('h2');
    speakHeader.textContent = 'Статистика Speak It';
    statisticsSpeak.appendChild(speakHeader);
    const speakStatisticsDescription = document.createElement('p');
    speakStatisticsDescription.textContent = 'Описание статистики Speak It';
    statisticsSpeak.appendChild(speakStatisticsDescription);

    return statisticsSpeak;
}

const showStatistics = async () => {
    loaderShow();

    const statistics = await getStatistics();

    const container = document.querySelector('main');
    container.classList.add('statistics');

    const statisticsSection = document.createElement('section');
    statisticsSection.classList.add('statistics__container');

    statisticsSection.appendChild(getGraph(statistics));

    if (statistics.optional && statistics.optional.sprint) {
        statisticsSection.appendChild(getSprintStatistics(statistics));
    }

    if (localStorage.getItem('gameTable')) {
        statisticsSection.appendChild(getAudioStatistics(statistics));
    }

    if (statistics.optional && statistics.optional.puzzle) {
        statisticsSection.appendChild(getPuzzleStatistics(statistics));
    }    

    if (statistics.optional && statistics.optional.speakIt) {
        statisticsSection.appendChild(getSpeakStatistics(statistics));
    }    

    container.appendChild(statisticsSection);

    makeCanvasGraph(statistics);
    setActivePointGraph(statistics.learnedWords, false);
    setActivePointGraphHolder();

    loaderHide();
}

export { showStatistics as default };
