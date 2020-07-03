const basicHeaderHolder = () => {
    const mainPage = document.querySelector('.basic-header__item_main-page');
    const statistics = document.querySelector('.basic-header__item_statistics');
    const settings = document.querySelector('.basic-header__item_settings');

    mainPage.addEventListener('click', () => {
        if (!mainPage.classList.contains('basic-header__item-active')) {
            console.log(mainPage)
        }
    });

    statistics.addEventListener('click', () => {
        if (!statistics.classList.contains('basic-header__item-active')) {
            console.log(statistics)
        }
    });

    settings.addEventListener('click', () => {
        if (!settings.classList.contains('basic-header__item-active')) {
            console.log(settings)
        }
    });
}

export { basicHeaderHolder as default };
