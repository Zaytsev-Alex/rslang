import mainPageHide from './mainPageHide';
import puzzle from '../puzzle/puzzle';

const mainPageItemHolders = () => {
    const container = document.querySelector('main');
    container.querySelector('.main-page__item-main').addEventListener('click', () => {
        mainPageHide();
        console.log('вызов основного приложения');
    })
    container.querySelector('.main-page__item-sprint').addEventListener('click', () => {
        mainPageHide();
        console.log('вызов спринта');
    })
    container.querySelector('.main-page__item-audio').addEventListener('click', () => {
        mainPageHide();
        console.log('вызов аудиовызова');
    })
    container.querySelector('.main-page__item-puzzle').addEventListener('click', () => {
        mainPageHide();
        puzzle();
        console.log('вызов пазла');
    })
    container.querySelector('.main-page__item-savanna').addEventListener('click', () => {
        mainPageHide();
        console.log('вызов саванны');
    })
    container.querySelector('.main-page__item-speakit').addEventListener('click', () => {
        mainPageHide();
        console.log('вызов speakit');
    })
    container.querySelector('.main-page__item-our-game').addEventListener('click', () => {
        mainPageHide();
        console.log('вызов своей игры');
    })
    container.querySelector('.main-page__item-statistics').addEventListener('click', () => {
        mainPageHide();
        console.log('вызов статистики');
    })
    container.querySelector('.main-page__item-setting').addEventListener('click', () => {
        mainPageHide();
        console.log('вызов найстройки');
    })
}

export { mainPageItemHolders as default };
