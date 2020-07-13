import basicHeaderHolder from './main-page/basicHeader';
import navDescription from './navDescriptions';

const showBasicLayout = () => {
    const header = document.createElement('header');
    header.classList.add('basic-header');

    const container = document.createElement('section');
    container.classList.add('container');

    const nav = document.createElement('nav');
    nav.classList.add('nav');

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
