import '../css/style.css';
import '../css/style.scss';

class SprintGame {
    constructor(container, difficultLevel) {
        this.container = container;
        this.score = 0;
        this.combo = 1;
        this.progress = 0;
        this.countAnswers = 0;
        if (difficultLevel !== undefined) {
            this.difficultLevel = difficultLevel;
        } else {
            this.difficultLevel = 0;
        }
    }

    showPromoPage() {
        this.container.classList.add('sprint');

        const sprintPromo = document.createElement('div');
        sprintPromo.classList.add('sprint__promo');

        const sprintPromoContainer = document.createElement('div');
        sprintPromoContainer.classList.add('sprint__promo_container');

        const sprintPromoHeader = document.createElement('h2');
        sprintPromoHeader.classList.add('sprint__promo_header');
        sprintPromoHeader.textContent = 'Sprint';
        sprintPromoContainer.appendChild(sprintPromoHeader);

        const sprintPromoDescription = document.createElement('p');
        sprintPromoDescription.classList.add('sprint__promo_description');
        sprintPromoDescription.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam corporis sit, quia earum velit et nulla quae, unde vero nesciunt ad ex assumenda ratione sed qui repellat tempora? Fugiat, perspiciatis!';
        sprintPromoContainer.appendChild(sprintPromoDescription);

        const sprintPromoStartButton = document.createElement('button');
        sprintPromoStartButton.classList.add('sprint__promo_start-button');
        sprintPromoStartButton.textContent = 'Start';
        sprintPromoContainer.appendChild(sprintPromoStartButton);

        sprintPromo.appendChild(sprintPromoContainer);
        this.container.appendChild(sprintPromo);
        return this;
    }

    hidePromoPageSprint() {
        const promoPage = document.querySelector('.sprint__promo')
        promoPage.classList.add('sprint__promo-opacity');
        setTimeout(() => {
            promoPage.classList.add('sprint__promo-hide');
            promoPage.classList.remove('sprint__promo-opacity');
            promoPage.remove();
        }, 100);
        return this;
    }

    showSprintCard() {
        const sprintCard = document.createElement('article');
        sprintCard.classList.add('sprint__card');
        const sprintDifficultLevelContainer = document.createElement('div');
        sprintDifficultLevelContainer.classList.add('sprint__difficult-level');
        for (let i = 1; i < 7; i += 1) {
            const difficultLevelItem = document.createElement('button');
            difficultLevelItem.classList.add('sprint__difficult-level_item');
            if (i === 1) {
                difficultLevelItem.classList.add('sprint__difficult-level_item-active');
            }
            difficultLevelItem.textContent = i;
            sprintDifficultLevelContainer.appendChild(difficultLevelItem);
        }
        sprintCard.appendChild(sprintDifficultLevelContainer);

        const sprintCardScore = document.createElement('div')
        sprintCardScore.classList.add('sprint__card_score');
        sprintCardScore.textContent = this.score;
        sprintCard.appendChild(sprintCardScore);

        const sprintCardTimer = document.createElement('div');
        sprintCardTimer.classList.add('sprint__card_timer');
        const sprintCardTimerProgress = document.createElement('div');
        sprintCardTimerProgress.classList.add('timer-progress');
        sprintCardTimer.appendChild(sprintCardTimerProgress);
        sprintCard.appendChild(sprintCardTimer);

        const sprintCardInner = document.createElement('div');
        sprintCardInner.classList.add('sprint__card-inner');
        const sprintCardCombo = document.createElement('div');
        sprintCardCombo.classList.add('sprint__card_combo');
        for (let i = 0; i < 3; i += 1) {
            const sprintCardComboItem = document.createElement('div');
            sprintCardComboItem.classList.add('sprint__card_combo_item');
            sprintCardCombo.appendChild(sprintCardComboItem);
        }
        const sprintCardComboMulty = document.createElement('div');
        sprintCardComboMulty.classList.add('sprint__card_combo_multy');
        sprintCardComboMulty.textContent = `+${10 * this.combo}`;
        sprintCardCombo.appendChild(sprintCardComboMulty);
        sprintCardInner.appendChild(sprintCardCombo);

        const sprintCardHeaderRussian = document.createElement('div');
        sprintCardHeaderRussian.classList.add('sprint__card_header-russian');
        sprintCardHeaderRussian.textContent = 'Временно';
        sprintCardInner.appendChild(sprintCardHeaderRussian);

        const sprintCardHeaderEnglish = document.createElement('div');
        sprintCardHeaderEnglish.classList.add('sprint__card_header-english');
        sprintCardHeaderEnglish.textContent = 'Temporary';
        sprintCardInner.appendChild(sprintCardHeaderEnglish);

        const sprintCardButtonsContainerInner = document.createElement('div');
        sprintCardButtonsContainerInner.classList.add('sprint__card_buttons-container-inner');
        sprintCardButtonsContainerInner.classList.add('sprint__card_buttons-container');

        const sprintCardButtonFalse = document.createElement('button');
        sprintCardButtonFalse.classList.add('sprint__card-button');
        sprintCardButtonFalse.classList.add('false');
        sprintCardButtonFalse.textContent = 'Неверно';
        sprintCardButtonsContainerInner.appendChild(sprintCardButtonFalse);

        const sprintCardButtonTrue = document.createElement('button');
        sprintCardButtonTrue.classList.add('sprint__card-button');
        sprintCardButtonTrue.classList.add('true');
        sprintCardButtonTrue.textContent = 'Верно';
        sprintCardButtonsContainerInner.appendChild(sprintCardButtonTrue);

        sprintCardInner.appendChild(sprintCardButtonsContainerInner);

        sprintCard.appendChild(sprintCardInner);

        const sprintCardButtonsContainer = document.createElement('div');
        sprintCardButtonsContainer.classList.add('sprint__card_buttons-container');

        const sprintCardButtonLeft = document.createElement('button');
        sprintCardButtonLeft.classList.add('sprint__card-button-left');
        sprintCardButtonLeft.textContent = '←';
        sprintCardButtonsContainer.appendChild(sprintCardButtonLeft);
        
        const sprintCardButtonRight = document.createElement('button');
        sprintCardButtonRight.classList.add('sprint__card-button-right');
        sprintCardButtonRight.textContent = '→';
        sprintCardButtonsContainer.appendChild(sprintCardButtonRight);

        sprintCard.appendChild(sprintCardButtonsContainer);

        this.container.appendChild(sprintCard);

        return this;
    }

    switchDifficultLevel(level) {
        console.log(level-1);
        return this;
    }

    async getWords(page) {
        const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${this.difficultLevel}`);
        const json = await response.json();
        return json;
    }

    timer() {
        const progress = document.querySelector('.sprint__card .timer-progress');
        this.progress = 0;
        const addProgress = () => {
            this.progress += 1;
            progress.style.width = `${this.progress}%`;
            if (this.progress < 100) {
                setTimeout(() => {
                    addProgress();
                }, 600);        
            }
        }
        addProgress();
    }
}

const myGame = new SprintGame(document.querySelector('.container'));
myGame.showPromoPage();


const switchDifficultLevelHolder = () => {
    const levelsContainer = document.querySelector('.sprint__difficult-level');
    levelsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('sprint__difficult-level_item')
        && !event.target.classList.contains('sprint__difficult-level_item-active')) {
            const level = event.target.innerText;
            levelsContainer.querySelector('.sprint__difficult-level_item-active').classList.remove('sprint__difficult-level_item-active');
            event.target.classList.add('sprint__difficult-level_item-active');
            myGame.switchDifficultLevel(level);
        }
    })
}

const startSprintGame = () => {
    myGame.hidePromoPageSprint();
    myGame.showSprintCard();
    switchDifficultLevelHolder();
    const randomPage= Math.floor(Math.random() * 30);
    myGame.getWords(randomPage).then(console.log);
    myGame.timer();
}

const startButtonHolderSprint = () => {
    document.querySelector('.sprint__promo_start-button').addEventListener('click', startSprintGame);
}

startButtonHolderSprint();