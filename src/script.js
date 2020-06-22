window.onload = () => {

    const mainBlock = document.createElement('div');
    mainBlock.classList.add('main');
    document.body.append(mainBlock);

    const startScreen = document.createElement('div');
    startScreen.classList.add('start-screen');
    mainBlock.append(startScreen);

    const titleGame = document.createElement('h1');
    startScreen.append(titleGame);
    titleGame.innerText = "Audio Call";

    const startBtn = document.createElement('div');
    startBtn.classList.add('start-btn');
    startScreen.append(startBtn);
    startBtn.innerText = "start";




}