

export default function menuButtonEvent(handler) {
    const btn = document.querySelector('.menu-btn')

    btn.addEventListener('click', handler);
}

