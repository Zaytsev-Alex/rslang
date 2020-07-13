import basicHeaderHolder from './main-page/basicHeader';

const showBasicLayout = () => {
    const header = document.createElement('header');
    header.classList.add('basic-header');

    const container = document.createElement('section');
    container.classList.add('container');

    // const mainPage = document.createElement('div');
    // mainPage.classList.add('basic-header__item', 'basic-header__item_main-page');
    // mainPage.textContent = 'Главная';
    // container.appendChild(mainPage);

    // const statistics = document.createElement('div');
    // statistics.classList.add('basic-header__item', 'basic-header__item_statistics');
    // statistics.textContent = 'Статистика';
    // container.appendChild(statistics);

    // const settings = document.createElement('div');
    // settings.classList.add('basic-header__item', 'basic-header__item_settings');
    // settings.textContent = 'Настройки';
    // container.appendChild(settings);

    // const logout = document.createElement('div');
    // logout.classList.add('basic-header__item', 'basic-header__item_logout');
    // logout.textContent = 'Выйти';
    // container.appendChild(logout);

    const nav = document.createElement('nav');
    nav.classList.add('nav');
    const navDescription = [
        {
            class: 'basic-header__item_main-page',
            prev: './img/nav-home.svg',
            h3: 'Главная страница',
            h4: 'Выбор мини игры и другое',
        },
        {
            class: 'basic-header__item_statistics',
            prev: './img/nav-statistics.svg',
            h3: 'Статистика',
            h4: 'Отображает текущий прогресс обучения',
        },
        {
            class: 'basic-header__item_settings',
            prev: './img/nav-settings.svg',
            h3: 'Настройки',
            h4: 'Здесь можно изменить настройки',
        },
        {
            class: 'basic-header__item_logout',
            prev: './img/nav-logout.svg',
            h3: 'Выход',
            h4: 'Выйти из учетной записи',
        },
    ];

    for (let i = 0; i < 4; i += 1) {
        const link = document.createElement('div');
        link.classList.add('nav__item', navDescription[i].class);

        const prev = document.createElement('img');
        prev.classList.add('nav__prev');
        prev.setAttribute('src', navDescription[i].prev);
        link.appendChild(prev);

        const small = document.createElement('img');
        small.classList.add('nav__small');
        small.setAttribute('src', navDescription[i].prev);
        link.appendChild(small);

        const full = document.createElement('div');
        full.classList.add('nav__full');

        const h3 = document.createElement('h3');
        h3.classList.add('nav__header');
        h3.textContent = navDescription[i].h3;
        full.appendChild(h3);

        const h4 = document.createElement('h4');
        h4.classList.add('nav__sub-header');
        h4.textContent = navDescription[i].h4;
        full.appendChild(h4);

        link.appendChild(full);

        nav.appendChild(link);
    }

    container.appendChild(nav)

    header.appendChild(container);

    const main = document.createElement('main');
    document.body.appendChild(header);
    document.body.appendChild(main);
    basicHeaderHolder();
}

export { showBasicLayout as default };
