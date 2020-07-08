import mainPageHide from './mainPageHide';
import audioCall from '../audio-call/audio-call';
import showSettings from '../settings/showSettings';
import SprintGame from '../sprint/SprintGame';

const mainPageItemHolders = () => {
    const container = document.querySelector('main');
    container.querySelector('.main-page__item-main').addEventListener('click', () => {
        mainPageHide();
        console.log('вызов основного приложения');
    })
    container.querySelector('.main-page__item-sprint').addEventListener('click', (event) => {
        event.target.classList.add('main-page__sprint-card-element');
        mainPageHide();
        const sprint = new SprintGame(container);
        sprint.showPromoPage();
    })
    container.querySelector('.main-page__item-audio').addEventListener('click', () => {
        mainPageHide();
        audioCall();
    })
    container.querySelector('.main-page__item-puzzle').addEventListener('click', () => {
        mainPageHide();
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
        document.querySelector('.basic-header__item_statistics').classList.add('basic-header__item-active');
        console.log('вызов статистики');
    })
    container.querySelector('.main-page__item-setting').addEventListener('click', () => {
        mainPageHide();
        document.querySelector('.basic-header__item_settings').classList.add('basic-header__item-active');
        showSettings();
    })
}
export { mainPageItemHolders as default };
