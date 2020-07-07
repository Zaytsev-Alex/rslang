import getStatistics from './getStatistics';
import { authorizationLoaderShow as loaderShow, authorizationLoaderHide as loaderHide } from '../authorization/loader';

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
    const statisticsMain = document.createElement('div');
    statisticsMain.classList.add('statistics__main');
    statisticsSection.appendChild(statisticsMain);

    /* Статистика спринт */
    const statisticsSprint = document.createElement('div');
    statisticsSprint.classList.add('statistics__sprint', 'statistics__item');
    const sprintHeader = document.createElement('h2');
    sprintHeader.textContent = 'Статистика Sprint';
    statisticsSprint.appendChild(sprintHeader);
    const sprintStatisticsDescription = document.createElement('p');
    sprintStatisticsDescription.textContent = `
        Ваш лучший счет: ${1000}
        \n\r
        Ваш средний счет
    `;
    statisticsSprint.appendChild(sprintStatisticsDescription);
    statisticsSection.appendChild(statisticsSprint);

    /* Статистика аудио вызов */
    const statisticsAudio = document.createElement('div');
    statisticsAudio.classList.add('statistics__audio-call', 'statistics__item');
    const audioHeader = document.createElement('h2');
    audioHeader.textContent = 'Статистика Аудио вызов';
    statisticsAudio.appendChild(audioHeader);
    const audioStatisticsDescription = document.createElement('p');
    audioStatisticsDescription.textContent = 'Описание статистики Аудио вызов';
    statisticsAudio.appendChild( audioStatisticsDescription);
    statisticsSection.appendChild(statisticsAudio);

    /* Статистика english puzzle */
    const statisticsPuzzle = document.createElement('div');
    statisticsPuzzle.classList.add('statistics__puzzle', 'statistics__item');
    const puzzleHeader = document.createElement('h2');
    puzzleHeader.textContent = 'Статистика English Puzzle';
    statisticsPuzzle.appendChild(puzzleHeader);
    const puzzleStatisticsDescription = document.createElement('p');
    puzzleStatisticsDescription.textContent = 'Описание статистики English Puzzle';
    statisticsPuzzle.appendChild(puzzleStatisticsDescription);
    statisticsSection.appendChild(statisticsPuzzle);

    /* Статистика speak it */
    const statisticsSpeak = document.createElement('div');
    statisticsSpeak.classList.add('statistics__speak', 'statistics__item');
    const speakHeader = document.createElement('h2');
    speakHeader.textContent = 'Статистика Speak It';
    statisticsSpeak.appendChild(speakHeader);
    const speakStatisticsDescription = document.createElement('p');
    speakStatisticsDescription.textContent = 'Описание статистики Speak It';
    statisticsSpeak.appendChild(speakStatisticsDescription);
    statisticsSection.appendChild(statisticsSpeak);

    container.appendChild(statisticsSection);
    loaderHide();
}

export { showStatistics as default };
