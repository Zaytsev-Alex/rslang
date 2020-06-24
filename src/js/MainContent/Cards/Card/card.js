export default function createCard() {
   const cardContainer = document.createElement('div');
   cardContainer.classList.add('card-container');
   cardContainer.innerHTML = `
    <div class='card'>
    <div class='card__wrapper'>
    <header class='card__header'>
   <div class = 'card__translate-switcher'>
    <p>Перевод</p>
   <div class="flip-switch flip-switch-text">
   <input type="checkbox" id="c3" checked>
   <label for="c3"></label>
   </div>
   </div>
    <div class ='card__pronunciation'></div></header>
    <main class='card__main'>
    <div class='card__image'></div>
    <div class = 'card__input-container'>
    <div class = 'answer'></div>
    <input type='text' class='card__input'>
    </div>
    <div class='card__learn-content'>
    
    <div class = 'card__word'>
    <span class='card__word-translate'></span>
    <span class='card__transcription'></span>
    </div>
    <div class='card__additional-info'>
    <div class='card__word-example'></div>
    <div class='card__word-example-translate'></div>
    <div class='card__explain'></div>
    <div class='card__explain-translate'></div>
    
    </div>
    </div>
    </main>
    <footer class='card__footer'></footer>
    </div>


    <div class = 'card__buttons'>
    <div class = 'card__main-buttons'>
    <button class = 'card__skip-word-btn'>Показать Ответ</button>
    <button class = 'card__check-word-btn'>Проверить</button>
    </div>
    <div class = 'card__difficulty-buttons visability-hidden'>
    <button class = 'card__easy-word-btn'>Легко</button>
    <button class = 'card__hard-word-btn'>Сложно</button>
    <button class = 'card__repeat-word-btn'>Ещё Раз</button>
    <button class = 'card__delete-word-btn'>Удалить</button>
    </div>

    </div>
    </div>
    <div class='navigate navigate--next'>
    <svg class="arrow" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 490.8 490.8" style="enable-background:new 0 0 490.8 490.8;" xml:space="preserve">
<path d="M135.685,3.128c-4.237-4.093-10.99-3.975-15.083,0.262c-3.992,4.134-3.992,10.687,0,14.82
   l227.115,227.136L120.581,472.461c-4.237,4.093-4.354,10.845-0.262,15.083c4.093,4.237,10.845,4.354,15.083,0.262
   c0.089-0.086,0.176-0.173,0.262-0.262l234.667-234.667c4.164-4.165,4.164-10.917,0-15.083L135.685,3.128z"/>
<path d="M128.133,490.68c-5.891,0.011-10.675-4.757-10.686-10.648c-0.005-2.84,1.123-5.565,3.134-7.571l227.136-227.115
   L120.581,18.232c-4.171-4.171-4.171-10.933,0-15.104c4.171-4.171,10.933-4.171,15.104,0l234.667,234.667
   c4.164,4.165,4.164,10.917,0,15.083L135.685,487.544C133.685,489.551,130.967,490.68,128.133,490.68z"/>
<g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></div>
    `;
   return cardContainer;
}