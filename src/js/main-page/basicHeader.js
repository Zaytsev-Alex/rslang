// eslint-disable-next-line import/no-cycle 
import showMainPage from './showMainPage';
import clearContainer from '../clear';
import showSettings from '../settings/showSettings';
import showStatistics from '../statistics/showStatistics';
import createIntroPage from '../into-page/introPage'

export const setActiveStatus = (link) => {
    const activeItem = document.querySelector('.basic-header__item-active');
    if (activeItem) {
        activeItem.classList.remove('basic-header__item-active');
    }
    link.classList.add('basic-header__item-active');
}

const basicHeaderHolder = () => {
    const mainPage = document.querySelector('.basic-header__item_main-page');
    const statistics = document.querySelector('.basic-header__item_statistics');
    const settings = document.querySelector('.basic-header__item_settings');
    const logout = document.querySelector('.basic-header__item_logout');
    const container = document.querySelector('main');

    mainPage.addEventListener('click', () => {
        if (!mainPage.classList.contains('basic-header__item-active')) {
            clearContainer(document.querySelector('main')); 
            setActiveStatus(mainPage);
            container.className = '';
            showMainPage();
        }
    });

    statistics.addEventListener('click', () => {
        if (!statistics.classList.contains('basic-header__item-active')) {
            clearContainer(document.querySelector('main')); 
            setActiveStatus(statistics);
            container.className = '';
            showStatistics();
        }
    });

    settings.addEventListener('click', () => {
        if (!settings.classList.contains('basic-header__item-active')) {
            clearContainer(document.querySelector('main')); 
            setActiveStatus(settings);
            container.className = '';
            showSettings();
        }
    });

    logout.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('refreshToken');
        clearContainer(document.body); 
        createIntroPage();
    })
}

export { basicHeaderHolder as default };
