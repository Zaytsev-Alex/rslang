import '../css/style.css';
import '../css/style.scss';

class SprintGame {
    constructor(container, difficultLevel) {
        this.container = container;
        if (difficultLevel !== undefined) {
            this.difficultLevel = difficultLevel;
        } else {
            this.difficultLevel = 1;
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
    }

    hidePromoPageSprint() {
        const promoPage = document.querySelector('.sprint__promo')
        promoPage.classList.add('sprint__promo-opacity');
        setTimeout(() => {
            promoPage.classList.add('sprint__promo-hide');
            promoPage.classList.remove('sprint__promo-opacity');
            promoPage.remove();
        }, 100);
        return this.container;
    }
}


const myGame = new SprintGame(document.querySelector('.container'));
myGame.showPromoPage();

const timer = () => {
    const progress = document.querySelector('.sprint__card .timer-progress');
    let width = 0;
    const addProgress = () => {
        width += 1;
        progress.style.width = `${width}%`;
        if (width < 100) {
            setTimeout(() => {
                addProgress();
            }, 600);        
        }
    }
    addProgress();
}

const startSprintGame = () => {
    timer();
    myGame.hidePromoPageSprint();
}

const startButtonHolderSprint = () => {
    document.querySelector('.sprint__promo_start-button').addEventListener('click', startSprintGame);
}

const switchDifficultLevel = (level) => {
    console.log(level);
}

const switchDifficultLevelHolder = () => {
    const levelsContainer = document.querySelector('.sprint__difficult-level');
    levelsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('sprint__difficult-level_item')
        && !event.target.classList.contains('sprint__difficult-level_item-active')) {
            const level = event.target.innerText;
            levelsContainer.querySelector('.sprint__difficult-level_item-active').classList.remove('sprint__difficult-level_item-active');
            event.target.classList.add('sprint__difficult-level_item-active');
            switchDifficultLevel(level);
        }
    })
}
switchDifficultLevelHolder();

startButtonHolderSprint();