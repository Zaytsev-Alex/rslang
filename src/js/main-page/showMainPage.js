import mainPageDescription from './mainPageDescription';
import maingPageShowInfoHolder from './maingPageShowInfoHolder';
import mainPageItemHolders from './mainPageItemHolders';
import basicHeaderHolder from './basicHeader';

const showMainPage = () => {
    const main = document.querySelector('main');
    main.classList.add('main-page');
    const container = document.createElement('section');
    container.classList.add('container');
    document.querySelectorAll('.basic-header a').forEach(e => e.classList.remove('basic-header__item-active'));
    document.querySelector('.basic-header__item_main-page').classList.add('basic-header__item-active');

    for (let i = 0; i < mainPageDescription.length; i += 1) {
        const mainPageItem = document.createElement('article');
        mainPageItem.classList.add('main-page__item', mainPageDescription[i].class);

        const mainContent = document.createElement('div');
        mainContent.classList.add('main-content');

        const header = document.createElement('h2');
        header.textContent = mainPageDescription[i].header;
        mainContent.appendChild(header);

        const logoImg = document.createElement('img');
        logoImg.setAttribute('src', mainPageDescription[i].logoSrc);
        logoImg.classList.add('main-page__item_logo');
        mainContent.appendChild(logoImg);

        const infoImg = document.createElement('img');
        infoImg.setAttribute('src', mainPageDescription[i].infoSrc);
        infoImg.classList.add('main-page__item_info');
        mainContent.appendChild(infoImg);

        mainPageItem.appendChild(mainContent);

        const alternativeContent = document.createElement('div');
        alternativeContent.classList.add('alternative-content');

        const description = document.createElement('p');
        description.textContent = mainPageDescription[i].description;
        alternativeContent.appendChild(description);

        mainPageItem.appendChild(alternativeContent);

        container.appendChild(mainPageItem);
    }

    main.appendChild(container);
    
    mainPageItemHolders();
    maingPageShowInfoHolder();
    basicHeaderHolder();
}

export { showMainPage as default };
