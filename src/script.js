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

    let level = 0;

    let startGame = function(){
        startScreen.innerHTML = "";
        const soundImg = document.createElement('div');
        soundImg.classList.add('sound-img');
        startScreen.append(soundImg);

        
        let page = Math.floor(0 + Math.random() * (29 + 1 - 0));
        

        const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${level}`;

        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            const words = document.createElement('div');
            words.classList.add('words');
            startScreen.append(words);

            let randWord = Math.floor(1 + Math.random() * (5 + 1 - 1));
            let randWords = Math.floor(0 + Math.random() * (15 + 1 - 0));

            for ( let n = 1; n < 6; n++){ 
               const oneWord = document.createElement('div');
               oneWord.innerText = `${n}. ${data[randWords+n-1].wordTranslate}`;
               words.append(oneWord);

               if(n === randWord){
                   let sound = function(){
                    let audio = new Audio();
                    audio.src = `https://d2fmfepycn0xw0.cloudfront.net?gender=male&accent=british&text=${data[randWords+n-1].word}`;
                    audio.autoplay = true;
                   }
                   sound();
                   soundImg.addEventListener('click', sound);
               }
               
            }

            const dontKnownBtn = document.createElement('div');
            dontKnownBtn.classList.add('dont-known-btn');
            startScreen.append(dontKnownBtn);
            dontKnownBtn.innerText = "don't known";

        });

        
    }

    startBtn.addEventListener('click', startGame);
    


}