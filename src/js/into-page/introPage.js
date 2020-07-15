
export default function createIntoPage() {
    const imgGrowSrc = "./img/icons/growth.svg";
    const imgChartSrc = "./img/icons/chart.svg";
    const imgFunnySrc = "./img/icons/emoji.svg";
    const imgDeviceSrc = "./img/icons/multiple-devices.png";
    const presentationSrc = "https://www.youtube.com/embed/31j4DIpgY9U";
    const hgIconSrc = "./img/icons/gh.png";
    const StasIntroPctSrc = "./img/stas.jpg";
    const DenIcexesIntroPctSrc = "./img/den_icexes.jpg";
    const AlexZaytsevIntroPctSrc = "./img/sasha_zaytsev.jpg";
    const AlexRonicIntroPctSrc = "./img/sasha_ronic.jpg";
    const DmitriyDmikolIntroPctSrc = "./img/dmitriy_dmikol.jpg";

    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    const header = document.createElement('div');
    header.classList.add('wrapper-inner', 'header-inner');
    header.innerHTML = ` <header class="header">
    <div class="container flex header-content">
        <div class="logo header__item">RS Lang
        </div>
        <div class="nav header__nav header__item">
            <div class="btn-container">
                <label for="menu-check" class="menu-btn" type="button" aria-label="Menu"
                    aria-controls="navigation">
                    <span class="menu-btn__block">
                        <span class="menu-btn__inner"></span>
                    </span>
                </label>
            </div>
            <ul class="nav-bar nav-menu flex">
                <li class="nav-bar__item" id="Registration">Начать</li>
                <li class="nav-bar__item" id="Enter">Войти</li>
            </ul>
        </div>
    </div>
</header>`;
    wrapper.append(header);

    const startOfferBlock = document.createElement('div');
    startOfferBlock.classList.add('wrapper-inner', 'start-offer-inner');
    startOfferBlock.innerHTML = `<div class="start-offer">
    <div class="container">
        <h1 class="logo_title">RS Lang</h1>
        <div class="start-learning-offer">
            <h2 class="start-learning-title">
                Изучайте английский совершенно бесплатно и увеличивайте Ваш словарный запас!
            </h2>
        </div>
        <div class="start-learning__buttons">
            <a href="#" class="start-learning__link">
                Начать обучение
            </a>
            <a href="#" class="sign-in__link">
                У меня уже есть аккаунт
            </a>
        </div>
    </div>
</div>`;
    wrapper.append(startOfferBlock);

    const appIntroBlock = document.createElement('div');
    appIntroBlock.classList.add('wrapper-inner');
    appIntroBlock.innerHTML = `<section class="app-intro-section" id="About-rslang">
    <div class="container">
        <h2 class="app-intro-title">RS Lang - эффективный и современный способ изучения слов английского
            языка
        </h2>
        <div class="app-intro-options flex column-layout">

            <div class="intro-options__item column-layout__item column-layout-6 column-layout-12">
                <div class="option-header">
                    <img src= ${imgGrowSrc} alt="icon-statistic"
                        class="option-title-icon">
                    <h3 class="option-title">Учитесь эффективно</h3>
                </div>
                <div class="option-description">
                    Для качественного запоминания пользователем слов приложение использует методику
                    интервального повторения. В режиме изучения слов после введенного правильного ответа
                    появляются
                    кнопки "Легко", "Хорошо", "Трудно", с помощью которых определяется сложность данного
                    слова и на основе выбранного ответа определяется дата следующего повторения. Сложные
                    слова повторяются на следующий день, повторение остальных групп слов зависит от выставленных в приложении настроек. 
                </div>
            </div>
            <div class="intro-options__item column-layout__item column-layout-6 column-layout-12">
                <div class="option-header">
                    <img src= ${imgChartSrc} alt="icon-watch" class="option-title-icon">
                    <h3 class="option-title">Следите за своим прогрессом</h3>
                </div>
                <div class="option-description">
                    Мы предоставляем Вам статистику по результатам занятий, с помощью которых Вы можете контролировать Ваш процесс обучения.
                    Также приложение имеет ряд гибких настроек, благодаря которым Вы можете настроить его "под себя" для достижения максимальной продуктивности! 
                    
                </div>
            </div>
            <div class="intro-options__item column-layout__item column-layout-6 column-layout-12">
                <div class="option-header">
                    <img src= ${imgFunnySrc} alt="icon-funny" class="option-title-icon">
                    <h3 class="option-title">Не скучайте</h3>
                </div>
                <div class="option-description">
                    Вам будет всегда интересно. Вы сможете выбрать обучающую игру по Вашему вкусу. Каждая
                    игра является эффективным иструментом обучения, позволяющим запоминать слова быстро и
                    хорошо.
                </div>
            </div>
            <div class="intro-options__item column-layout__item column-layout-6 column-layout-12">
                <div class="option-header">
                    <img src= ${imgDeviceSrc} alt="icon-devices"
                        class="option-title-icon">
                    <h3 class="option-title">Всегда с Вами</h3>
                </div>
                <div class="option-description">
                    Приложение доступно на различных девайсах, поэтому Вы можете заниматься в любое удобное Вам время и в любом месте! 
                </div>
            </div>
        </div>
    </div>
</section>`;
    wrapper.append(appIntroBlock);

    const presentationBlock = document.createElement('div');
    presentationBlock.classList.add('wrapper-inner', 'presentation-wrapper');
    presentationBlock.innerHTML = `<section class="presentation-section">
    <div class="container">
        <h2 class="presentation__title">Презентация нашего приложения</h2>
        <div class="relation">
            <div class="relation__ratio"></div>
            <iframe class="relation__content" src= ${presentationSrc}
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
        </div>
    </div>
</section>`;
    wrapper.append(presentationBlock);

    const aboutTeamBlock = document.createElement('div');
    aboutTeamBlock.classList.add('wrapper-inner');
    aboutTeamBlock.innerHTML = ` <section class="about-team" id="About-team">
    <div class="container">
        <h2 class="about-team__title">Наша команда</h2>
        <p class="team-common-introducing">Мы - молодая команда начинающих веб-разработчиков,являемся
            студентами Rolling Scopes School. Данное приложение было создано силами нашей команды!
        </p>
        <div class="column-layout persons__info flex">
            <div class="column-layout__item column-layout-4 column-layout-6 column-layout-12 person"><img
                    class="profile__photo" src= ${DenIcexesIntroPctSrc} alt="photo">
                <div class="person-introduce">
                    <h3 class="person-name">Субоч Денис</h3>
                    <p class="person-info">Лидер нашей команды. Руководитель проекта. Ловко осуществлял координацию команды в процессе работы.
                    </p>
                    <p class="responsibility-info">Реализовал функционал основого приложения "Учить слова", страницу "Словарь", а также игру "SpeakIt".
                    </p>
                </div>
                <div class="item__person-links flex">
                        <a href="https://github.com/icexes" class="gh-account-name flex"> <img
                                src= ${hgIconSrc} alt="github-icon" class="hg-icon"
                                width="32px" height="32px"> <span>Icexes</span></a>
                 </div>
            </div>
            <div class="column-layout__item column-layout-4 column-layout-6 column-layout-12 person"><img
                    class="profile__photo" src= ${AlexZaytsevIntroPctSrc} alt="photo">
                <div class="person-introduce">
                    <h3 class="person-name">Александр Зайцев</h3>
                    <p class="person-info">Настоящий работяга и незаменимый помощник для своих членов команды!
                    </p>
                    <p class="responsibility-info">Разработал игру "Sprint", главную страницу приложения, страницы "Настройка" и "Статистика".
                    </p>
                </div>
                <div class="item__person-links flex">
                        <a href="https://github.com/zaytsev-alex" class="gh-account-name flex"> <img
                                src= ${hgIconSrc} alt="github-icon" class="hg-icon"
                                width="32px" height="32px"> <span>zaytsev-alex</span></a>
                </div>
            </div>
            <div class="column-layout__item column-layout-4 column-layout-6 column-layout-12 person"><img
                    class="profile__photo" src= ${DmitriyDmikolIntroPctSrc} alt="photo">
                <div class="person-introduce">
                    <h3 class="person-name">Дмитрий Колосовский</h3>
                    <p class="person-info">Креатив - его вторая натура. Энергичный и любознательный.
                    </p>
                    <p class="responsibility-info">Разработал игру "Аудиовызов".
                    </p>
                </div>
                <div class="item__person-links flex">
                        <a href="https://github.com/dmikol" class="gh-account-name flex"> <img
                                src= ${hgIconSrc} alt="github-icon" class="hg-icon"
                                width="32px" height="32px"> <span>dmikol</span></a>
                </div>
            </div>
            <div class="column-layout__item column-layout-4 column-layout-6 column-layout-12 person"><img
                    class="profile__photo" src= ${AlexRonicIntroPctSrc} alt="photo">
                <div class="person-introduce">
                    <h3 class="person-name">Александр Чубуков</h3>
                    <p class="person-info">Старательный и инициативный. Упорно и целеустремленно идет к рещению поставленной задачи.
                    </p>
                    <p class="responsibility-info">Разработал страницу авторизации и игру "English Puzzle".
                    </p>
                </div>
                <div class="item__person-links flex">
                        <a href="https://github.com/ronic404" class="gh-account-name flex"> <img
                                src= ${hgIconSrc} alt="github-icon" class="hg-icon"
                                width="32px" height="32px"> <span>ronic404</span></a>
                </div>
            </div>
            <div class="column-layout__item column-layout-4 column-layout-6 column-layout-12 person"><img
                    class="profile__photo" src= ${StasIntroPctSrc} alt="photo">
                <div class="person-introduce">
                    <h3 class="person-name">Короткий Станислав</h3>
                    <p class="person-info">Стремится к совершенству стиля и лаконичности. Неисчерпаемый источник воросов.
                    </p>
                    <p class="responsibility-info">Ответственный за создание визитной страницы приложения.
                    </p>
                </div>
                <div class="item__person-links flex">
                        <a href="https://github.com/staskorotkiy92" class="gh-account-name flex"> <img
                                src= ${hgIconSrc} alt="github-icon" class="hg-icon"
                                width="32px" height="32px"> <span>staskorotkiy92</span></a>
                </div>
            </div>
        </div>
    </div>
</section>`;
    wrapper.append(aboutTeamBlock);

    const footerBlock = document.createElement('div');
    footerBlock.classList.add('wrapper-inner', 'footer-inner');
    footerBlock.innerHTML = `  <footer class="footer">
    <div class="container footer-container flex">
        <!-- <div class="course-info footer__item">RS School 2020Q1</div> -->
        <a href="https://github.com/Icexes/rslang" alt="our project" class="project-link"></a>
        <a href="https://rs.school/" alt="rs-logo" class="rs__logo"></a>

    </div>
</div>
</footer>
</div>`;
    wrapper.append(footerBlock);

    document.body.append(wrapper);
}