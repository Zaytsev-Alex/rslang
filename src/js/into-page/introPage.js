export default function createIntoPage() {
    const intoPageTemplate = `
    <div class="wrapper">
    <div class="wrapper-inner header-inner">

        <header class="header">
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
        </header>
    </div>
    <div class="wrapper-inner start-offer-inner">
        <div class="start-offer">
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
        </div>
    </div>
    <div class="wrapper-inner">
        <section class="app-intro-section" id="About-rslang">
            <div class="container">
                <h2 class="app-intro-title">RS Lang - эффективный и современный способ изучения слов английского
                    языка
                </h2>
                <div class="app-intro-options flex column-layout">

                    <div class="intro-options__item column-layout__item column-layout-6 column-layout-12">
                        <div class="option-header">
                            <img src="./img/icons/growth.svg" alt="icon-statistic"
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
                            <img src="./img/icons/chart.svg" alt="icon-watch" class="option-title-icon">
                            <h3 class="option-title">Следите за своим прогрессом</h3>
                        </div>
                        <div class="option-description">
                            Мы предоставляем Вам статистику по результатам занятий, с помощью которых Вы можете контролировать Ваш процесс обучения.
                            Также приложение имеет ряд гибких настроек, благодаря которым Вы можете настроить его "под себя" для достижения максимальной продуктивности! 
                            
                        </div>
                    </div>
                    <div class="intro-options__item column-layout__item column-layout-6 column-layout-12">
                        <div class="option-header">
                            <img src="./img/icons/emoji.svg" alt="icon-funny" class="option-title-icon">
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
                            <img src="./img/icons/multiple-devices.png" alt="icon-devices"
                                class="option-title-icon">
                            <h3 class="option-title">Всегда с Вами</h3>
                        </div>
                        <div class="option-description">
                            Приложение доступно на различных девайсах, поэтому Вы можете заниматься в любое удобное Вам время и в любом месте! 
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <div class="wrapper-inner presentation-wrapper">
        <section class="presentation-section">
            <div class="container">
                <h2 class="presentation__title">Презентация нашего приложения</h2>
                <div class="relation">
                    <div class="relation__ratio"></div>
                    <iframe class="relation__content" src="https://www.youtube.com/embed/31j4DIpgY9U"
                        frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
                </div>
            </div>
        </section>
    </div>
    <div class="wrapper-inner">
        <section class="about-team" id="About-team">
            <div class="container">
                <h2 class="about-team__title">Наша команда</h2>
                <p class="team-common-introducing">Мы - молодая команда начинающих веб-разработчиков,являемся
                    студентами Rolling Scopes School. Данное приложение было создано силами нашей команды!
                </p>
                <div class="column-layout persons__info flex">
                    <div class="column-layout__item column-layout-4 column-layout-6 column-layout-12 person"><img
                            class="profile__photo" src="./img/photo2.png" alt="photo">
                        <div class="person-introduce">
                            <h3 class="person-name">Adam Jensen</h3>
                            <p class="person-info">Quisque luctus, quam eget molestie commodo, lacus purus cursus
                                purus,
                                nec rutrum tellus dolor
                                id lorem.
                            </p>
                            <div class="item__person-links flex">
                                <a href="https://github.com/icexes" class="gh-account-name flex"> <img
                                        src="./img/icons/gh.png" alt="github-icon" class="hg-icon"
                                        width="32px" height="32px"> <span>icexes</span></a>
                            </div>
                        </div>
                    </div>
                    <div class="column-layout__item column-layout-4 column-layout-6 column-layout-12 person"><img
                            class="profile__photo" src="./img/photo2.png" alt="photo">
                        <div class="person-introduce">
                            <h3 class="person-name">Adam Jensen</h3>
                            <p class="person-info">Quisque luctus, quam eget molestie commodo, lacus purus cursus
                                purus,
                                nec rutrum tellus dolor
                                id lorem.
                            </p>
                            <div class="item__person-links flex">
                                <a href="https://github.com/semenetti" class="gh-account-name flex"> <img
                                        src="./img/icons/gh.png" alt="github-icon" class="hg-icon"
                                        width="32px" height="32px"> <span>semenetti</span></a>
                            </div>
                        </div>
                    </div>
                    <div class="column-layout__item column-layout-4 column-layout-6 column-layout-12 person"><img
                            class="profile__photo" src="./img/photo2.png" alt="photo">
                        <div class="person-introduce">
                            <h3 class="person-name">Adam Jensen</h3>
                            <p class="person-info">Quisque luctus, quam eget molestie commodo, lacus purus cursus
                                purus,
                                nec rutrum tellus dolor
                                id lorem.
                            </p>
                            <div class="item__person-links flex">
                                <a href="https://github.com/zaytsev-alex" class="gh-account-name flex"> <img
                                        src="./img/icons/gh.png" alt="github-icon" class="hg-icon"
                                        width="32px" height="32px"> <span>zaytsev-alex</span></a>
                            </div>
                        </div>
                    </div>
                    <div class="column-layout__item column-layout-4 column-layout-6 column-layout-12 person"><img
                            class="profile__photo" src="./img/photo2.png" alt="photo">
                        <div class="person-introduce">
                            <h3 class="person-name">Adam Jensen</h3>
                            <p class="person-info">Quisque luctus, quam eget molestie commodo, lacus purus cursus
                                purus,
                                nec rutrum tellus dolor
                                id lorem.
                            </p>
                            <div class="item__person-links flex">
                                <a href="https://github.com/dmikol" class="gh-account-name flex"> <img
                                        src="./img/icons/gh.png" alt="github-icon" class="hg-icon"
                                        width="32px" height="32px"> <span>dmikol</span></a>
                            </div>
                        </div>
                    </div>
                    <div class="column-layout__item column-layout-4 column-layout-6 column-layout-12 person"><img
                            class="profile__photo" src="./img/photo2.png" alt="photo">
                        <div class="person-introduce">
                            <h3 class="person-name">Desmond Miles</h3>
                            <p class="person-info">Curabitur vestibulum eget mauris quis laoreet. Phasellus in quam
                                laoreet, viverra lacus ut,
                                ultrices velit.
                            </p>
                            <div class="item__person-links flex">
                                <a href="https://github.com/ronic404" class="gh-account-name flex"> <img
                                        src="./img/icons/gh.png" alt="github-icon" class="hg-icon"
                                        width="32px" height="32px"> <span>ronic404</span></a>
                            </div>
                        </div>
                    </div>
                    <div class="column-layout__item column-layout-4 column-layout-6 column-layout-12 person"><img
                            class="profile__photo" src="./img/photo2.png" alt="photo">
                        <div class="person-introduce">
                            <h3 class="person-name">Scolara Visari</h3>
                            <p class="person-info">Nulla sed nunc et tortor luctus faucibus. Morbi at aliquet
                                turpis, et
                                consequat felis.
                                Quisque condimentum.
                            </p>
                            <div class="item__person-links flex">
                                <a href="https://github.com/staskorotkiy92" class="gh-account-name flex"> <img
                                        src="./img/icons/gh.png" alt="github-icon" class="hg-icon"
                                        width="32px" height="32px"> <span>staskorotkiy92</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <div class="wrapper-inner footer-inner">
        <footer class="footer">
            <div class="container footer-container flex">
                <!-- <div class="course-info footer__item">RS School 2020Q1</div> -->
                <a href="https://github.com/Icexes/rslang" alt="our project" class="project-link"></a>
                <a href="https://rs.school/" alt="rs-logo" class="rs__logo"></a>

            </div>
    </div>
    </footer>
</div>
</div>
`;
document.body.innerHTML = intoPageTemplate;
}