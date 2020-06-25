const mainPageHide = () =>{
    const container = document.querySelector('.container');
    container.querySelectorAll('*').forEach((element) => {
        element.remove();
    })
    container.classList.remove('main-page');
}

export { mainPageHide as default };
