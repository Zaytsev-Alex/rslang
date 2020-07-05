const basicHeaderHolder = () => {
    const mainPage = document.querySelector('.basic-header__item_main-page');
    const statistics = document.querySelector('.basic-header__item_statistics');
    const settings = document.querySelector('.basic-header__item_settings');
    const logout = document.querySelector('.basic-header__item_logout');

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

    logout.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        console.log('Выход, надо показать интро страницу');
    })
}

export { basicHeaderHolder as default };
