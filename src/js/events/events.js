
import authorization from '../authorization/authorization';

export function menuButtonEvent(handler) {
    const btn = document.querySelector('.menu-btn');

    btn.addEventListener('click', handler);
}

function eventHandler(event) {
    if (event.target === document.querySelector('.start-learning__link'))
            authorization();
        if (event.target === document.getElementById('Registration'))
            authorization();
        if (event.target === document.getElementById('Enter'))
            authorization();

}

export function events() {
    document.addEventListener('click', eventHandler);
}