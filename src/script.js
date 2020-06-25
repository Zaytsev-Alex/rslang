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

    let countClick = 0;
    let indWidth = 20;
    let rightAnswer = 0;
    let wrongAnswer = 0;

    let level = 0;

    const levelBlock = document.createElement('div');

    const selectLevel = function(){
        startScreen.innerHTML = "";
        const titleLevel = document.createElement('h2');
        startScreen.append(titleLevel);
        startScreen.append(levelBlock);
        titleLevel.innerText = "Select level";
        levelBlock.classList.add('level-block');

        for(let k = 0; k < 6; k += 1){
            const levelDiv = document.createElement('div');
            levelDiv.innerText = `${k}`;
            levelBlock.append(levelDiv);

            levelDiv.addEventListener('click', (event) => {
                level = +(event.target.innerText);
        });

        }

    }


    const startGame = function(){
        const indicator = document.createElement('div');
        mainBlock.prepend(indicator);
        indicator.classList.add('indicator');

        const yourLevel = document.createElement('h3');
        yourLevel.innerText = `Your level: ${level}`;
        
        const nextGame = function (){

        startScreen.innerHTML = "";
        startScreen.prepend(yourLevel);
        const soundImg = document.createElement('div');
        soundImg.classList.add('sound-img');
        startScreen.append(soundImg);

        const page = Math.floor(0 + Math.random() * (29 + 1 - 0));
        

        const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${level}`;

        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            const words = document.createElement('div');
            words.classList.add('words');
            startScreen.append(words);

            const randWord = Math.floor(1 + Math.random() * (5 + 1 - 1));
            const randWords = Math.floor(0 + Math.random() * (15 + 1 - 0));

            for ( let n = 1; n < 6; n += 1){ 
               const oneWord = document.createElement('div');
               oneWord.innerText = `${n}. ${data[randWords+n-1].wordTranslate}`;
               words.append(oneWord);
               oneWord.classList.add('opacity-no');

               if(n === randWord){
                   const sound = function(){
                    const audio = new Audio();
                    audio.src = `https://d2fmfepycn0xw0.cloudfront.net?gender=male&accent=british&text=${data[randWords+n-1].word}`;
                    audio.autoplay = true;
                    oneWord.classList.remove('opacity-no');
                    oneWord.classList.add('opacity-on');
                   }
                   sound();
                   soundImg.addEventListener('click', sound);

               }
               
            }

            const result = document.createElement('div');
            result.classList.add('result');
            result.innerText = `Right ${rightAnswer}/${wrongAnswer} Wrong`;
            startScreen.append(result);

            const dontKnownBtn = document.createElement('div');
            dontKnownBtn.classList.add('dont-known-btn');
            startScreen.append(dontKnownBtn);
            dontKnownBtn.innerText = "don't known";

            words.addEventListener('click', (event) => {
                if (countClick === 0){
                    const num = event.target.innerText[0];
                for(let m = 0; m < 4; m += 1){
                    document.getElementsByClassName('opacity-no')[m].style.opacity = "0.3";
                }
                if(randWord === +num){
                    event.target.innerText = event.target.innerText.slice(2);
                    const right = document.createElement('img');
                    right.src = "src/img/right.png";
                    event.target.prepend(right);
                    rightAnswer += 1;
                    
                }else{
                    event.target.style.textDecoration = "line-through";
                    wrongAnswer += 1;
                }
                const engWord = document.createElement('p');
                engWord.classList.add('eng-word');
                const engImg = document.createElement('img');
                engImg.classList.add('eng-img');
                const url2 = `https://dictionary.skyeng.ru/api/public/v1/words/search?search=${data[randWords+randWord-1].word}`;
                fetch(url2)
                    .then((res) => res.json())
                    .then((data) => {
                        engImg.src = `${data[0].meanings[0].imageUrl}`;
                    });
                engWord.innerText = `${data[randWords+randWord-1].word}`;
                soundImg.after(engWord);
                soundImg.after(engImg);

                countClick = 1;

                dontKnownBtn.innerText = "";
                dontKnownBtn.style.background = "url('src/img/arrow.png') no-repeat";
                dontKnownBtn.style.backgroundPosition = "center";

                }
                
                 });

            

            const clickDontKnown = function (){
                if (countClick === 0){
                    for(let m = 0; m < 4; m += 1){
                        document.getElementsByClassName('opacity-no')[m].style.opacity = "0.3";
                    }
                    const right = document.createElement('img');
                    right.src = "src/img/right.png";
                    const dontWord = document.getElementsByClassName('opacity-on')[0];
                    dontWord.innerText = dontWord.innerText.slice(2);
                    dontWord.prepend(right);
    
    
    
                    const engWord = document.createElement('p');
                    engWord.classList.add('eng-word');
                    const engImg = document.createElement('img');
                    engImg.classList.add('eng-img');
                    
                    const url2 = `https://dictionary.skyeng.ru/api/public/v1/words/search?search=${data[randWords+randWord-1].word}`;
                    fetch(url2)
                        .then((res) => res.json())
                        .then((data) => {
                            engImg.src = `${data[0].meanings[0].imageUrl}`;
                       
                        });
                    engWord.innerText = `${data[randWords+randWord-1].word}`;
                    soundImg.after(engWord);
                    soundImg.after(engImg);

                    countClick = 1;
                    wrongAnswer += 1;

                    dontKnownBtn.innerText = "";
                    dontKnownBtn.style.background = "url('src/img/arrow.png') no-repeat";
                    dontKnownBtn.style.backgroundPosition = "center";

                }else if (indicator.style.width === "100%"){
                        dontKnownBtn.style.background = "none";
                        startScreen.innerHTML = "";
                        result.innerText = `Your result
                        Right ${rightAnswer}/${wrongAnswer} Wrong`;
                        startScreen.append(result);
                        startScreen.append(dontKnownBtn);
                        dontKnownBtn.innerText = "restart";
                        dontKnownBtn.addEventListener('click', () => {
                             countClick = 0;
                             indicator.style.width = '10%';
                             rightAnswer = 0;
                             wrongAnswer = 0;
                             indWidth = 20;
                             levelBlock.innerHTML = "";
                             selectLevel();
                        });
                        
                    }else{
                        startScreen.innerHTML = "";
                        countClick = 0;
                        indicator.style.width = `${indWidth}%`;
                        indWidth += 10;
                        nextGame();
                    }
                
            }

            dontKnownBtn.addEventListener('click', clickDontKnown);

        });

     }

     nextGame();

        
    }


    startBtn.addEventListener('click', selectLevel);
    levelBlock.addEventListener('click', (event) => {
        if(event.target.innerText.length === 1){
            startGame();
        }
});

}