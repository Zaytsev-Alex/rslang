export default function renderAllHTML() {
  const PUZZLE = document.createElement('div');
  PUZZLE.id = 'puzzle';
  PUZZLE.innerHTML = `<main class="wrapper">
    <section class="start-screen">
      <h1 class="start-screen__title">English puzzle</h1>
      <p class="start-screen__description">
        Нажимайте на слова и собирайте фразы<br>
        Слова можно перетаскивать. Можете выбирать подсказки.
      </p>
      <button type="button" class="start-screen__button button">Старт</button>
    </section>

    <section class="main-page hide">
      <div class="main-page__bar">
        <label for="groups">Сложность</label>
        <select name="groups" id="groups">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
        <label for="rounds">Раунд</label>
        <select name="rounds" id="rounds"></select>
        <div class="main-page__buttons">
          <button class="button" id="refresh-button" type="button">⭮</button>
          <button class="button button-hint" id="translate-button" type="button">Перевод</button>
          <button class="button button-hint" id="audio-button" type="button">Произношение</button>
          <button class="button button-hint" id="picture-button" type="button">✐</button>
          <button class="button" id="play-audio" type="button">⯈</button>
        </div>        
      </div>

      <div class="main-page__translate">
        <p class="text-translate"></p>
        <audio type="audio/mpeg"></audio>
      </div>      

      <div class="main-page__puzzle"></div>    
      
      <div class="main-page__current">
        <p class="picture-title hide"></p>
        <ul class="current-string"></ul>
      </div>

      <footer class="footer">
        <button type="button" class="button footer__button" id="donotknow-button">Я не знаю</button>
        <button type="button" class="button footer__button hide" id="check-button">Проверка</button>
        <button type="button" class="button footer__button hide" id="continue-button">Продолжить</button>
      </footer>      
    </section>

    <section class="result-page hide">
      <div class="result-page__picture"></div>
      <div class="result-page__description"></div>
      <div class="result-page__stat">
        <div class="i-dont-know">
          <div class="stat-title i-dont-know__title">
            <p class="stat-title__text i-dont-know__title-text">Я не знаю</p>
            <div class="stat-title__number" id="i-dont-know__number"></div>
          </div>
          <ul class="stat-list" id="i-dont-know-list"></ul>
        </div>
        <div class="i-know">
          <div class="stat-title i-know__title">
            <p class="stat-title__text i-know__title-text">Я знаю</p>
            <div class="stat-title__number" id="i-know__number"></div>
          </div>
          <ul class="stat-list" id="i-know-list"></ul>
        </div>
      </div>
      <div class="result-page__buttons">
        <button type="button" class="button result__button" id="result-continue-button">Продолжить</button>
        <button type="button" class="button result__button" id="result-stat-button">Статистика</button>
      </div>

      <div class="statistics hide">
        <p class="statistics__title">Статистика:</p>
        <table>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Количество игр</th>
              <th>Правильно</th>
              <th>Не правильно</th>
            </tr>
          </thead>

          <tfoot>
            <tr>
              <td>Итого:</td>
              <td id="all-count-games"></td>
              <td id="all-right"></td>
              <td id="all-wrong"></td>
            </tr>
          </tfoot>    

          <tbody></tbody>                
        </table>
      </div>
    </section>
  </main>`;

  document.body.append(PUZZLE);
}
