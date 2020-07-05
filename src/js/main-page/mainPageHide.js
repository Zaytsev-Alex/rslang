import clearContainer from '../clear';

const mainPageHide = () => {
    const container = document.querySelector('main');
    clearContainer(container);
    document.querySelector('.basic-header__item_main-page').classList.remove('basic-header__item-active');
    container.classList.remove('main-page');
}

export { mainPageHide as default };
