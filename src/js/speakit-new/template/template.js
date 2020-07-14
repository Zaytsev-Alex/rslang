export default function createTemplate() {
    const WRAPPER = document.createElement('div')
    WRAPPER.classList.add('speakit__wrapper');
    WRAPPER.innerHTML = `
    <div class ='speakit__main'>
        <div class = 'speakit__img-container'>
            <img class = 'speakit__img' alt = 'img'>
        </div>
        <div class = 'speakit__translation'>Перевод</div>
        <div class = 'cards'></div>
    <div class = 'buttons'>
        <button type='button' class='buttons__restart-btn'>Заново</button>
        <button type='button' class='buttons__game-btn'>Начать игру</button>
        <button type='button' class='buttons__game-results-btn'>Результаты</button>
    </div>

</div>
`;
 return WRAPPER;
}