const authorizationLoaderShow = () => {
    const loaderContainer = document.createElement('div');
    loaderContainer.classList.add('authorization__loader-container');

    const loader = document.createElement('img');
    loader.classList.add('authorization__loader');
    loader.setAttribute('src', 'img/loader.gif');
    loaderContainer.appendChild(loader);

    document.body.appendChild(loaderContainer);
}

const authorizationLoaderHide = () => {
    const loaderContainer = document.querySelector('.authorization__loader-container'); 

    if (loaderContainer) {
        loaderContainer.remove();
    }
}

export { authorizationLoaderShow, authorizationLoaderHide };
