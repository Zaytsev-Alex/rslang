import '../css/style.css';
import '../css/style.scss';

class SprintGame {
    constructor(container) {
        this.container = container;
        this.score = 0;
        this.combo = 1;
        this.progress = 0;
        this.countAnswersStrick = 0;
        this.index = 0;
        this.words = [];
        this.pages = [];
        this.difficultLevel = 0;
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
        sprintPromoDescription.textContent = 'Тренировка на скорость. Определите верно ли подобран перевод для слова и нажмите соответсвующую кнопку. Ответы можно давать на клавиатурные клавиши. Выберите уровень сложности и начните тренировку.';
        sprintPromoContainer.appendChild(sprintPromoDescription);

        const sprintDifficultLevelContainer = document.createElement('div');
        sprintDifficultLevelContainer.classList.add('sprint__promo_difficult-level');
        for (let i = 1; i < 7; i += 1) {
            const difficultLevelItem = document.createElement('button');
            difficultLevelItem.classList.add('sprint__promo_difficult-level_item');
            if (i === 1) {
                difficultLevelItem.classList.add('sprint__promo_difficult-level_item-active');
            }
            difficultLevelItem.textContent = i;
            sprintDifficultLevelContainer.appendChild(difficultLevelItem);
        }
        sprintPromoContainer.appendChild(sprintDifficultLevelContainer);

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

        const sprintCardScore = document.createElement('div')
        sprintCardScore.classList.add('sprint__card_score');
        sprintCardScore.textContent = this.score;
        sprintCard.appendChild(sprintCardScore);

        const sprintCardErrors = document.createElement('div')
        sprintCardErrors.classList.add('sprint__card_errors');
        sprintCard.appendChild(sprintCardErrors);

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

        const sprintCardHeaderEnglish = document.createElement('div');
        sprintCardHeaderEnglish.classList.add('sprint__card_header-english');
        sprintCardHeaderEnglish.textContent = 'Temporary';
        sprintCardInner.appendChild(sprintCardHeaderEnglish);

        const sprintCardHeaderRussian = document.createElement('div');
        sprintCardHeaderRussian.classList.add('sprint__card_header-russian');
        sprintCardHeaderRussian.textContent = 'Временно';
        sprintCardInner.appendChild(sprintCardHeaderRussian);

        const sprintCardWrongAnswer = document.createElement('div');
        sprintCardWrongAnswer.classList.add('sprint__card_wrong-answer');
        sprintCardWrongAnswer.classList.add('sprint__card_wrong-answer-hidden');
        sprintCardInner.appendChild(sprintCardWrongAnswer);

        const sprintCardButtonsContainerInner = document.createElement('div');
        sprintCardButtonsContainerInner.classList.add('sprint__card_buttons-container-inner');
        sprintCardButtonsContainerInner.classList.add('sprint__card_buttons-container');

        const sprintCardButtonFalse = document.createElement('button');
        sprintCardButtonFalse.classList.add('sprint__card-button');
        sprintCardButtonFalse.classList.add('sprint__card-button-false');
        sprintCardButtonFalse.classList.add('false');
        sprintCardButtonFalse.textContent = 'Неверно';
        sprintCardButtonsContainerInner.appendChild(sprintCardButtonFalse);

        const sprintCardButtonTrue = document.createElement('button');
        sprintCardButtonTrue.classList.add('sprint__card-button');
        sprintCardButtonTrue.classList.add('sprint__card-button-true');
        sprintCardButtonTrue.classList.add('true');
        sprintCardButtonTrue.textContent = 'Верно';
        sprintCardButtonsContainerInner.appendChild(sprintCardButtonTrue);

        sprintCardInner.appendChild(sprintCardButtonsContainerInner);

        sprintCard.appendChild(sprintCardInner);

        const sprintCardButtonsContainer = document.createElement('div');
        sprintCardButtonsContainer.classList.add('sprint__card_arrows-container');

        const sprintCardArrowLeft = document.createElement('div');
        sprintCardArrowLeft.classList.add('sprint__card-arrow-left');
        sprintCardButtonsContainer.appendChild(sprintCardArrowLeft);
        
        const sprintCardArrowRight = document.createElement('div');
        sprintCardArrowRight.classList.add('sprint__card-arrow-right');
        sprintCardButtonsContainer.appendChild(sprintCardArrowRight);

        sprintCard.appendChild(sprintCardButtonsContainer);

        this.container.appendChild(sprintCard);

        return this;
    }

    async getWords() {
        let json;
        try {
            const page = this.getPage();
            if (page !== null) {
                const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=${this.getPage()}&group=${this.difficultLevel}`);
                json = await response.json();
                json.forEach((e) => {
                    this.words.push(e);
                })
                this.words.forEach((e, idx) => {
                    const chance = Math.floor(Math.random() * 10) > 5;
                    if (chance) {
                        let randomWord = idx;
                        while (randomWord === idx) {
                            randomWord = Math.floor(Math.random() * this.words.length);
                        }
                        this.words[idx].wordTranslateFalse = this.words[randomWord].wordTranslate;
                    }
                })
            }
        } catch(e) {
            document.querySelector('.sprint__card_errors').textContent = `Упс, ошибка: ${e}`;
        }
        return json;
    }

    timer() {
        const progress = this.container.querySelector('.sprint__card_timer .timer-progress');
        const addProgress = () => {
            this.progress += 1;
            progress.style.width = `${this.progress}%`;
            if (this.progress < 100) {
                this.time = setTimeout(() => {
                    addProgress();
                }, 600);        
            } else { 
                this.stopGame();
                this.stopTimer();
            }
        }
        addProgress();
    }

    stopTimer() {
        clearTimeout(this.time);
    }

    getPage() {
        let randomPage = Math.floor(Math.random() * 30);
        let check = 0;
        while (this.pages.includes(randomPage) && check < 30) {
            randomPage = Math.floor(Math.random() * 30);
            check += 1;
        }
        if (check > 29) {
            randomPage = null;
        }
        this.pages.push(randomPage);
        return randomPage;
    }

    loaderIndicatorHide() {
        this.container.querySelector('.sprint__card_loader').classList.add('sprint__card_loader-hide');
        return this;
    }

    loaderIndicator() {
        const sprintLoader = document.createElement('div');
        sprintLoader.classList.add('sprint__card_loader');

        const sprintSpinner = document.createElement('img');
        sprintSpinner.setAttribute('src', '../img/spinner.gif');
        sprintSpinner.classList.add('sprint__card_spinner');

        sprintLoader.appendChild(sprintSpinner);
        this.container.appendChild(sprintLoader);
        return this;
    }

    startGame() {
        this.loaderIndicator(); 

        this.getWords().then(() => {
            this.getWords().then(() => {
                this.nextWord(0);
                this.answerHolder();
                this.loaderIndicatorHide();
                this.timer();
            })
        })
    }

    answerHolder() {
        this.rightAnswerButton = this.container.querySelector('.sprint__card-button-true');
        this.wrongAnswerButton = this.container.querySelector('.sprint__card-button-false');
        this.rightAnswerButton.addEventListener('click', this.rightAnswerGiven.bind(this), false);
        this.wrongAnswerButton.addEventListener('click', this.wrongAnswerGiven.bind(this), false);
        return this;
    }

    rightAnswerGiven() {
        this.addResult(!this.words[this.index].wordTranslateFalse);
        this.index += 1;
        this.nextWord(this.index);
    }

    wrongAnswerGiven() {
        this.addResult(!!this.words[this.index].wordTranslateFalse);
        this.index += 1;
        this.nextWord(this.index);
    }

    addResult(status) {
        if (status) {
            const rightAnswerSound = new Audio('../audio/right.mp3');
            rightAnswerSound.play();
            this.score += 10 * this.combo;
            this.container.querySelector('.sprint__card_score').textContent = this.score;
            this.container.querySelector('.sprint__card_combo_multy').textContent = `+${10 * this.combo}`;
            this.countAnswersStrick += 1;
            if (this.countAnswersStrick % 4 === 0) {
                this.combo *= 2;
                this.container.querySelectorAll('.sprint__card_combo_item').forEach((e) => {
                    e.classList.remove('sprint__card_combo_item-active');
                    this.container.querySelector('.sprint__card_combo_multy').textContent = `+${10 * this.combo}`;
                });
            } else {
                this.container.querySelector(`.sprint__card_combo_item:nth-of-type(${this.countAnswersStrick % 4})`)
                    .classList.add('sprint__card_combo_item-active');   
            }
        } else {
            const wrongAnswerSound = new Audio('../audio/wrong.mp3');
            wrongAnswerSound.play();
            const sprintCardWrongAnswer = document.querySelector('.sprint__card_wrong-answer');
            sprintCardWrongAnswer.classList.remove('sprint__card_wrong-answer-hidden');
            setTimeout(() => {
                sprintCardWrongAnswer.classList.add('sprint__card_wrong-answer-hidden');
            }, 400);
            this.container.querySelectorAll('.sprint__card_combo_item').forEach((e) => {
                e.classList.remove('sprint__card_combo_item-active');
            });
            this.countAnswersStrick = 0;
            this.combo = 1;
            this.container.querySelector('.sprint__card_combo_multy').textContent = `+10`;
        }
    }

    nextWord(index) {
        if (index === this.words.length) { 
            this.loaderIndicator();
            this.stopTimer();
            this.getWords().then(() => {
                this.loaderIndicatorHide();
                this.timer();
            })
        } else if (index % 20 === 0) {
            this.getWords().then(() => {
                this.loaderIndicatorHide();
            })
        }
        this.container.querySelector('.sprint__card_header-english').textContent = this.words[index].word;
        if (this.words[index].wordTranslateFalse) {
            this.container.querySelector('.sprint__card_header-russian').textContent = this.words[index].wordTranslateFalse;
        } else {
            this.container.querySelector('.sprint__card_header-russian').textContent = this.words[index].wordTranslate;
        }
    }

    setDifficultLevel(level) {
        this.difficultLevel = level;
    }

    stopGame() {
        console.log('called')
        this.rightAnswerButton.removeEventListener('click', this.rightAnswerGiven.bind(this), false);
        this.wrongAnswerButton.removeEventListener('click', this.wrongAnswerGiven.bind(this), false);
    }
}
const myGame = new SprintGame(document.querySelector('.container'));
myGame.showPromoPage();

const switchDifficultLevel = (level) => {
    myGame.setDifficultLevel(level-1);
}

const switchDifficultLevelHolder = () => {
    const levelsContainer = document.querySelector('.sprint__promo_difficult-level');
    levelsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('sprint__promo_difficult-level_item')
        && !event.target.classList.contains('sprint__promo_difficult-level_item-active')) {
            const level = event.target.innerText;
            levelsContainer.querySelector('.sprint__promo_difficult-level_item-active').classList.remove('sprint__promo_difficult-level_item-active');
            event.target.classList.add('sprint__promo_difficult-level_item-active');
            switchDifficultLevel(level);
        }
    })
}

switchDifficultLevelHolder();

const startSprintGame = () => {
    myGame.hidePromoPageSprint();
    myGame.showSprintCard();
    myGame.startGame();
}

const startButtonHolderSprint = () => {
    document.querySelector('.sprint__promo_start-button').addEventListener('click', startSprintGame);
}

startButtonHolderSprint();