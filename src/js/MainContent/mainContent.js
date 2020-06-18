
import createCard from './Cards/Card/card'
import addCardInfo from './Cards/cardInfo'

export default function createMainContent() {
    const main = document.createElement('main');
    main.classList.add('main');
    const mainWrapper = document.createElement('div');
    mainWrapper.classList.add('main__wrapper');
    const card = createCard();
    addCardInfo();
    mainWrapper.append(card);
    main.append(mainWrapper);
    document.body.append(main);
}
