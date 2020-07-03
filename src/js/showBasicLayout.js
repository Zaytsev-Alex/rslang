const showBasicLayout = () => {
    const header = document.createElement('header');
    header.classList.add('basic-header');

    const container = document.createElement('section');
    container.classList.add('container');

    const mainPage = document.createElement('div');
    mainPage.classList.add('basic-header__item', 'basic-header__item_main-page');
    mainPage.textContent = 'Главная';
    container.appendChild(mainPage);

    const statistics = document.createElement('div');
    statistics.classList.add('basic-header__item', 'basic-header__item_statistics');
    statistics.textContent = 'Статистика';
    container.appendChild(statistics);

    const settings = document.createElement('div');
    settings.classList.add('basic-header__item', 'basic-header__item_settings');
    settings.textContent = 'Настройки';
    container.appendChild(settings);
    header.appendChild(container);

    const main = document.createElement('main');
    document.body.appendChild(header);
    document.body.appendChild(main);
}

export { showBasicLayout as default };
