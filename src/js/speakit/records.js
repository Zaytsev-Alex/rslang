import { get, set } from './storage';
import getTime from './time';

const saveRecord = () => {
  const recordsList = get('recordsList') || [];
  const record = document.querySelector('.succes-num').textContent;
  const errors = 10 - record;

  recordsList.push(
    `Level ${
      document.querySelector('.activePoint').textContent
    }: выучено ${record}, ошибок ${errors} (${getTime()})`
  );

  set('recordsList', recordsList);
};

const showRecords = () => {
  const recordsContainer = document.querySelector('.history');
  recordsContainer.innerHTML = '';

  recordsContainer.classList.toggle('none');

  const currentResults = [
    document.querySelector('.errors'),
    document.querySelector('.errors-item'),
    document.querySelector('.succes'),
    document.querySelector('.succes-item'),
  ];

  currentResults.forEach((item) => {
    const node = item;
    node.classList.toggle('none');
  });

  if (get('recordsList')) {
    get('recordsList')
      .sort()
      .map((el) => {
        const text = document.createElement('p');

        text.innerHTML = el;

        return recordsContainer.appendChild(text);
      });
  } else {
    recordsContainer.textContent = 'У Вас еще нет рекордов';
  }
};

window.addEventListener('click', () => {
  const recordsBtn = document.querySelector('.btn.records');
  document.querySelector('.new-game').addEventListener('click', () => {
    saveRecord();
  });
  recordsBtn.addEventListener('click', showRecords);
});
