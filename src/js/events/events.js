
import authorization from '../authorization/authorization';

export function menuButtonEvent(handler) {
    const btn = document.querySelector('.menu-btn');

    btn.addEventListener('click', handler);
}

function eventHandler(event) {
    if (event.target === document.querySelector('.start-learning__link')
    || event.target === document.getElementById('Registration')) {  
        authorization('registration');
    }
    else if  (event.target === document.getElementById('Enter') || event.target === document.querySelector('.sign-in__link')) {
        authorization('autorization');
    }

}

export function events() {
    document.addEventListener('click', eventHandler);
    
    window.addEventListener('scroll',  () => {
        const startInnerContainer = document.querySelector('.start-offer-inner');
        const header = document.querySelector('.header-inner');
        if (startInnerContainer !== null) {
            if (window.scrollY > startInnerContainer.clientHeight - 60) {
                header.classList.add('visibility-visible');
            } else if (header.classList.contains('visibility-visible')) {
                header.classList.remove('visibility-visible');
            }
        }
    });
}