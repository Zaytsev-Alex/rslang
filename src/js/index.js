import '../css/main.css';
import '../css/main.scss';


const mainPage = document.querySelector('.main-page');

mainPage.addEventListener('mouseover', (event) => {
    if (event.target.classList.contains('main-page__item_info')) {
        const parentItem = event.target.parentElement.parentElement;
        parentItem.classList.add('main-page__item-show')
        
        parentItem.addEventListener('mouseleave', () => {
            parentItem.classList.remove('main-page__item-show')
    })
    }
});
