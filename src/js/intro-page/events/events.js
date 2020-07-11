
import authorization from '../../authorization/authorization';

function eventHandler(event) {
    if (event.target === document.querySelector('.start-learning__link')
    || event.target === document.getElementById('Registration')
    || event.target === document.getElementById('Enter')) {
        authorization();
    }
    if (event.target.closest('.menu-btn')) {
    document.querySelector('.menu-btn').classList.toggle('is-active');
    document.querySelector('.nav-bar').classList.toggle('nav-menu-active');
    }
    if (!event.target.closest('.header') && !event.target.closest('.nav-menu') && document.querySelector('.nav-menu-active')) {
        document.querySelector('.menu-btn').classList.remove('is-active');
    document.querySelector('.nav-bar').classList.remove('nav-menu-active');
    }
}

export default function events() {
    document.addEventListener('click', eventHandler);
    
}