export default class SprintGame {
    constructor(container) {
        this.container = container;
        this.userId = localStorage.getItem('userId');
        this.token = localStorage.getItem('token');
        this.score = 0;
        this.combo = 1;
        this.progress = 0;
        this.countAnswersStrick = 0;
        this.index = 0;
        this.words = [];
        this.pages = [];
        this.ended = false;
        this.difficultLevel = 0;
        this.breakGameHolder();
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

        this.switchDifficultLevelHolder();
        this.startGameHolder();

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

    startGameHolder() {
        document.querySelector('.sprint__promo_start-button').addEventListener('click', () => {
            this.hidePromoPageSprint();
            this.showSprintCard();
            this.startGame();
        });
    }

    switchDifficultLevelHolder() {
        const levelsContainer = this.container.querySelector('.sprint__promo_difficult-level');
        levelsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('sprint__promo_difficult-level_item')
            && !event.target.classList.contains('sprint__promo_difficult-level_item-active')) {
                const level = event.target.innerText;
                levelsContainer.querySelector('.sprint__promo_difficult-level_item-active').classList.remove('sprint__promo_difficult-level_item-active');
                event.target.classList.add('sprint__promo_difficult-level_item-active');
                this.setDifficultLevel(level - 1);
            }
        })
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
        sprintCardWrongAnswer.classList.add('sprint__card_wrong-answer', 'sprint__card_wrong-answer-hidden');
        sprintCardInner.appendChild(sprintCardWrongAnswer);

        const sprintCardButtonsContainerInner = document.createElement('div');
        sprintCardButtonsContainerInner.classList.add('sprint__card_buttons-container-inner', 'sprint__card_buttons-container');

        const sprintCardButtonFalse = document.createElement('button');
        sprintCardButtonFalse.classList.add('sprint__card-button', 'sprint__card-button-false');
        sprintCardButtonFalse.textContent = 'Неверно';
        sprintCardButtonsContainerInner.appendChild(sprintCardButtonFalse);

        const sprintCardButtonTrue = document.createElement('button');
        sprintCardButtonTrue.classList.add('sprint__card-button', 'sprint__card-button-true');
        sprintCardButtonTrue.textContent = 'Верно';
        sprintCardButtonsContainerInner.appendChild(sprintCardButtonTrue);

        sprintCardInner.appendChild(sprintCardButtonsContainerInner);

        sprintCard.appendChild(sprintCardInner);

        const sprintCardButtonsContainer = document.createElement('div');
        sprintCardButtonsContainer.classList.add('sprint__card_arrows-container');

        const sprintCardArrowLeft = document.createElement('div');
        sprintCardArrowLeft.classList.add('sprint__card_arrow-left');
        sprintCardButtonsContainer.appendChild(sprintCardArrowLeft);

        const sprintCardSpeakButton = document.createElement('button');
        sprintCardSpeakButton.classList.add('sprint__card_speak');
        sprintCardButtonsContainer.appendChild(sprintCardSpeakButton);
        
        const sprintCardArrowRight = document.createElement('div');
        sprintCardArrowRight.classList.add('sprint__card_arrow-right');
        sprintCardButtonsContainer.appendChild(sprintCardArrowRight);

        sprintCard.appendChild(sprintCardButtonsContainer);

        this.container.appendChild(sprintCard);

        return this;
    }

    hideSprintCard() {
        this.container.querySelector('.sprint__card').remove();
    }

    async getWords() {
        let json;
        if (!this.ended) {
            try {
                const page = this.getPage();
                if (page !== null) {
                    const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${this.difficultLevel}`);
                    json = await response.json();
                    json.forEach((e) => {
                        this.words.push(e);
                    })
                    this.words.forEach((e, idx) => {
                        const chance = Math.floor(Math.random() * 10) > 6;
                        if (chance) {
                            let randomWord = idx;
                            while (randomWord === idx) {
                                randomWord = Math.floor(Math.random() * this.words.length);
                            }
                            this.words[idx].wordTranslateFalse = this.words[randomWord].wordTranslate;
                        }
                    })
                    document.querySelector('.sprint__card_errors').textContent = '';
                } else {
                    this.container.querySelector('.sprint__card_errors').textContent = 'Недостаточно слов для загрузки';
                }
            } catch(e) {
                if (document.querySelector('.sprint__card_errors')) {
                    document.querySelector('.sprint__card_errors').textContent = `Упс, ошибка: ${e}`;
                }
            }
        }
        return json;
    }

    timer() {
        this.loaderIndicatorHide();
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
        if (this.pages.length === 30) {
            return null;
        }
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
    }

    loaderIndicator() {
        if (this.container.querySelector('.sprint__card_spinner')) {
            this.container.querySelector('.sprint__card_loader').classList.remove('sprint__card_loader-hide');
        } else {
            const sprintLoader = document.createElement('div');
            sprintLoader.classList.add('sprint__card_loader');
    
            const sprintSpinner = document.createElement('img');
            sprintSpinner.setAttribute('src', './img/spinner.gif');
            sprintSpinner.classList.add('sprint__card_spinner');
    
            sprintLoader.appendChild(sprintSpinner);
            this.container.appendChild(sprintLoader);
        }
    }

    startGame() {
        this.loaderIndicator(); 

        this.getWords().then(() => {
            this.getWords().then(() => {
                this.nextWord(0);
                this.answerHolder();
                this.loaderIndicatorHide();
                this.speakWordHolder();
                this.timer();
            })
        })
    }

    answerHolder() {
        this.rightAnswerButton = this.container.querySelector('.sprint__card-button-true');
        this.wrongAnswerButton = this.container.querySelector('.sprint__card-button-false');
        this.rightAnswerButton.addEventListener('click', this.rightAnswerGiven.bind(this), false);
        this.wrongAnswerButton.addEventListener('click', this.wrongAnswerGiven.bind(this), false);
        document.addEventListener('keydown', (event) => {
            if (!this.ended && event.code === 'ArrowLeft') {
                this.wrongAnswerGiven();
            }
            if (!this.ended && event.code === 'ArrowRight') {
                this.rightAnswerGiven();
            }
        })
        return this;
    }

    rightAnswerGiven() {
        this.addResult(!this.words[this.index].wordTranslateFalse);
        this.index += 1;
        if (!this.ended) {
            this.nextWord(this.index);
        }
    }

    wrongAnswerGiven() {
        this.addResult(!!this.words[this.index].wordTranslateFalse);
        this.index += 1;
        if (!this.ended) {
            this.nextWord(this.index);
        }
    }

    addResult(status) {
        if (status) {
            this.words[this.index].guessed = true;
            this.score += 10 * this.combo;
            this.container.querySelector('.sprint__card_score').textContent = this.score;
            this.container.querySelector('.sprint__card_combo_multy').textContent = `+${10 * this.combo}`;
            this.countAnswersStrick += 1;
            if (this.countAnswersStrick % 4 === 0) {
                const comboSound = new Audio('./audio/combo.mp3');
                comboSound.play();
                this.combo *= 2;
                this.container.querySelectorAll('.sprint__card_combo_item').forEach((e) => {
                    e.classList.remove('sprint__card_combo_item-active');
                    this.container.querySelector('.sprint__card_combo_multy').textContent = `+${10 * this.combo}`;
                });
                const sprintCardInner = document.querySelector('.sprint__card-inner');
                sprintCardInner.classList.add('sprint__card-inner-combo');
                setTimeout(() => {
                    sprintCardInner.classList.remove('sprint__card-inner-combo');
                }, 500);
            } else {
                this.container.querySelector(`.sprint__card_combo_item:nth-of-type(${this.countAnswersStrick % 4})`)
                    .classList.add('sprint__card_combo_item-active');   
                const rightAnswerSound = new Audio('./audio/right.mp3');
                rightAnswerSound.play();
            }
        } else {
            this.words[this.index].guessed = false;
            const wrongAnswerSound = new Audio('./audio/wrong.mp3');
            wrongAnswerSound.play();
            const sprintCardWrongAnswer = document.querySelector('.sprint__card_wrong-answer');
            sprintCardWrongAnswer.classList.remove('sprint__card_wrong-answer-hidden');
            const sprintCardInner = document.querySelector('.sprint__card-inner');
            sprintCardInner.classList.add('sprint__card-inner-wrong');
            setTimeout(() => {
                sprintCardWrongAnswer.classList.add('sprint__card_wrong-answer-hidden');
                sprintCardInner.classList.remove('sprint__card-inner-wrong');
            }, 300);
            this.container.querySelectorAll('.sprint__card_combo_item').forEach((e) => {
                e.classList.remove('sprint__card_combo_item-active');
            });
            this.countAnswersStrick = 0;
            this.combo = 1;
            this.container.querySelector('.sprint__card_combo_multy').textContent = `+10`;
        }
    }

    nextWord(index) {
        if (this.pages.length === 30) {
            this.container.querySelector('.sprint__card_errors').textContent = 'Недостаточно слов для загрузки';
            this.stopGame();
            this.stopTimer();
            return;
        }
        if (!this.ended) {
            if (index === this.words.length) { 
                this.loaderIndicator();
                this.stopTimer();
                this.getWords().then(() => {
                    this.loaderIndicatorHide();
                    this.timer();
                })
            } else if (index % 20 === 0 && index !== 0) {
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
    }

    setDifficultLevel(level) {
        this.difficultLevel = level;
    }

    showStatistics() {
        const statisticsContainrt = document.createElement('div');
        statisticsContainrt.classList.add('sprint__statistics-container');

        const sprintStatistics = document.createElement('div');
        sprintStatistics.classList.add('sprint__statistics');
        
        const score = document.createElement('h2');
        score.classList.add('sprint__statistics_score');
        score.textContent = `Результат: ${this.score}`;
        sprintStatistics.appendChild(score);

        const knownWords = document.createElement('ul');
        knownWords.classList.add('sprint__statistics_known-words');
        const unknownWords = document.createElement('ul');
        unknownWords.classList.add('sprint__statistics_unknown-words');
        let knownCounter = 0;
        let unknownCounter = 0;

        for (let i = 0; i < this.index; i += 1) {
            const word = document.createElement('li');
            word.classList.add('sprint__statistics_word');
            word.textContent = `${this.words[i].word} - ${this.words[i].wordTranslate}`;
            if (this.words[i].guessed) {
                knownWords.appendChild(word);
                knownCounter +=1;
            } else {
                unknownWords.appendChild(word);
                unknownCounter += 1;
            }
        }

        const knownWordsHeader = document.createElement('h3');
        knownWordsHeader.classList.add('sprint__statistics_header-known');
        knownWordsHeader.textContent = `Вы отгадали ${knownCounter} слов`;

        const unknownWordsHeader = document.createElement('h3');
        unknownWordsHeader.classList.add('sprint__statistics_header-unknown');
        unknownWordsHeader.textContent = `Вы не отгадали ${unknownCounter} слов`;
        sprintStatistics.appendChild(knownWordsHeader);
        sprintStatistics.appendChild(knownWords);
        sprintStatistics.appendChild(unknownWordsHeader);
        sprintStatistics.appendChild(unknownWords);
        statisticsContainrt.appendChild(sprintStatistics);
        
        const repeatGameButton = document.createElement('button');
        repeatGameButton.classList.add('sprint__repeat-game');
        repeatGameButton.textContent = 'Повторить игру';
        statisticsContainrt.appendChild(repeatGameButton);

        this.container.appendChild(statisticsContainrt);

        this.repeatGameHolder();
    }

    hideStatistics() {
        this.container.querySelector('.sprint__statistics-container').remove();
        this.container.querySelector('.sprint__card_loader').remove();
    }

    repeatGameHolder() {
        this.container.querySelector('.sprint__repeat-game').addEventListener('click', () => {
            this.score = 0;
            this.combo = 1;
            this.progress = 0;
            this.countAnswersStrick = 0;
            this.index = 0;
            this.words.splice(0, this.words.length);
            this.pages.splice(0, this.pages.length);
            this.ended = false;
            this.difficultLevel = 0;
            this.hideStatistics();
            this.showPromoPage();
        })
    }

    stopGame() {
        this.loaderIndicator();
        let guessedCount = 0;
        for (let i = 0; i < this.index; i += 1) {
            if (this.words[i].guessed) {
                guessedCount += 1;
            }
        }
        this.sendStatistics(this.score, this.index, guessedCount).then(() => {
            this.loaderIndicatorHide();
        });
        this.hideSprintCard();
        this.showStatistics();
        this.ended = true;
    }

    async sendStatistics(statistics, length, guessedCount) {
        let statFromBack;
        let content;
        if (statistics !== 0 || length !== 0 || guessedCount !== 0) {
            try {
                const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/statistics`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                        'withCredentials': true,
                        'Accept': 'application/json',
                    }
                });
                statFromBack = await response.json();
                let statArray = [];
                if (!statFromBack.optional) {
                    statFromBack.optional = {};
                }
                if (statFromBack.optional.sprint) {
                    statArray = statFromBack.optional.sprint.split(',');   
                }
                statArray.push(statistics);
                statArray.push(length);
                statArray.push(guessedCount);
                if (statArray.length > 30) {
                    statArray.shift();
                    statArray.shift();
                    statArray.shift();
                }
                statFromBack.optional.sprint = statArray.join(',');
                const newObj = {
                    learnedWords: statFromBack.learnedWords,
                    optional: statFromBack.optional,
                }
                try {   
                    const responseSend = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/statistics`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${this.token}`,
                            'Accept': 'application/json',
                            'Content-type': 'application/json',
                            'withCredentials': 'true'
                        },
                        body: JSON.stringify(newObj)
                    });
                    content = await responseSend.json();
                } catch(error) {
                    if (document.querySelector('.sprint__card_errors')) {
                        document.querySelector('.sprint__card_errors').textContent = `Упс, ошибка: ${error}`;
                    }
                }
            } catch(e) {
                if (document.querySelector('.sprint__card_errors')) {
                    document.querySelector('.sprint__card_errors').textContent = `Упс, ошибка: ${e}`;
                }
            }
        }
        return content;
    }

    speakWordHolder() {
        this.speakWordButton = this.container.querySelector('.sprint__card_speak');
        this.speakWordButton.addEventListener('click', this.speakWord.bind(this), false);
    }

    speakWord() {
        const wordSound = new Audio(`https://raw.githubusercontent.com/Zaytsev-Alex/rslang-data/master/${this.words[this.index].audio}`);
        wordSound.play();
        return this;
    }

    breakGameHolder() {
        document.addEventListener('click', (event) => {
            if (this.container 
                && this.container.classList.contains('sprint') 
                && event.target.className.indexOf('sprint') === -1) {
                this.breakGame();
            }
        })
    }

    breakGame() {
        if (!this.inded) {
            this.stopGame();
        }
        if (document.querySelector('.sprint__card')) {
            document.querySelector('.sprint__card').remove();
        }
        if (document.querySelector('.sprint__promo')) {
            document.querySelector('.sprint__promo').remove();
        }
        if (this.container.querySelector('.sprint__statistics-container')) {
            this.container.querySelector('.sprint__statistics-container').remove();
        }
        if (this.container.querySelector('.sprint__card_loader')) {
            this.container.querySelector('.sprint__card_loader').remove();
        }
        this.container.classList.remove('sprint');
    }
}
