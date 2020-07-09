import getStatistics from './getStatistics';
import { authorizationLoaderShow as loaderShow, authorizationLoaderHide as loaderHide } from '../authorization/loader';

const getMainStatistics = (statistics) => {
    console.log(statistics)

    const statisticsMain = document.createElement('div');
    statisticsMain.classList.add('statistics__main');

    return statisticsMain;
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
    console.log(sprintArray)
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

const getAudioStatistics = (statistics) => {
    console.log(statistics)

    const statisticsAudio = document.createElement('div');
    statisticsAudio.classList.add('statistics__audio-call', 'statistics__item');
    const audioHeader = document.createElement('h2');
    audioHeader.textContent = 'Статистика Аудио вызов';
    statisticsAudio.appendChild(audioHeader);
    const audioStatisticsDescription = document.createElement('p');
    audioStatisticsDescription.textContent = 'Описание статистики Аудио вызов';
    statisticsAudio.appendChild( audioStatisticsDescription);

    return statisticsAudio;
}

const getPuzzleStatistics = (statistics) => {
    console.log(statistics)

    const statisticsPuzzle = document.createElement('div');
    statisticsPuzzle.classList.add('statistics__puzzle', 'statistics__item');
    const puzzleHeader = document.createElement('h2');
    puzzleHeader.textContent = 'Статистика English Puzzle';
    statisticsPuzzle.appendChild(puzzleHeader);
    const puzzleStatisticsDescription = document.createElement('p');
    puzzleStatisticsDescription.textContent = 'Описание статистики English Puzzle';
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

    /* Объект со статистикой */
    const statistics = await getStatistics();
    console.log(statistics);

    const container = document.querySelector('main');
    container.classList.add('statistics');

    const statisticsSection = document.createElement('section');
    statisticsSection.classList.add('statistics__container');

    /* Статистика основного приложения */
    statisticsSection.appendChild(getMainStatistics(statistics));

    /* Статистика спринт */
    if (statistics.optional.sprint) {
        statisticsSection.appendChild(getSprintStatistics(statistics));
    }

    /* Статистика аудио вызов */
    statisticsSection.appendChild(getAudioStatistics(statistics));

    /* Статистика english puzzle */
    statisticsSection.appendChild(getPuzzleStatistics(statistics));

    /* Статистика speak it */
    statisticsSection.appendChild(getSpeakStatistics(statistics));

    container.appendChild(statisticsSection);
    loaderHide();
}

export { showStatistics as default };
