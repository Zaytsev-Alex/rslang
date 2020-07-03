import clearContainer from '../clear';

const mainPageHide = () => {
    const container = document.querySelector('main');
    clearContainer(container);
    container.classList.remove('main-page');
}

export { mainPageHide as default };
