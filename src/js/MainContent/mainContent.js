
import {getWords} from './Api/Api'
import createCard from './Cards/Card/card'
import addCardInfo from './Cards/cardInfo'

export function createMainContent() {
    const main = document.createElement('main');
    main.classList.add('main');
    const mainWrapper = document.createElement('div');
    mainWrapper.classList.add('main__wrapper');
    const card = createCard();
    addCardInfo();
    mainWrapper.append(card);
    main.append(mainWrapper);
    return main;
}

export function createControlElements() {
    const controlPanel = document.createElement('div');
    controlPanel.classList.add('control-panel');
    getWords(1,2);
}