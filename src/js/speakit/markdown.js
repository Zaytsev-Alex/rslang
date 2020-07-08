const markdown = `
<main class="main speakit">
<div class="intro main speakit">
  <h1 class="title">SpeakIt</h1>
  <a href="#" class="btn intro-btn">Start</a>
</div>

<div class="container game-speakit hidden">
  <div class="res">
    <ul class="points">
      <li class="point activePoint" data-level="0">1</li>
      <li class="point" data-level="1">2</li>
      <li class="point" data-level="2">3</li>
      <li class="point" data-level="3">4</li>
      <li class="point" data-level="4">5</li>
      <li class="point" data-level="5">6</li>
    </ul>
    <div class="score"></div>
  </div>
  <div class="images">
    <img class="img" src="../img/blank.jpg" alt="" />
    <p class="translation"></p>
    <input type="text" class="input hidden" />
  </div>
  <div class="items"></div>
  <div class="btns">
    <a href="#" class="btn restart">Restart</a>
    <a href="#" class="btn voice user-speach">Speak please</a>
    <a href="#" class="btn result">Results</a>
  </div>
</div>
<div class="results hidden">
  <div class="results-container">
    <p class="game-level">Level: <span></span></p>
    <p class="errors">Ошибки<span class="errors-num"></span></p>
    <div class="errors-item"></div>
    <p class="succes">Выучено<span class="succes-num"></span></p>
    <div class="succes-item"></div>
    <div class="history none">
      <p>История</p>
    </div>
    <div class="btns btns-res">
      <a href="#" class="btn btn-res return">Return</a>
      <a href="#" class="btn btn-res new-game">New game</a>
      <a href="#" class="btn btn-res records">Records</a>
    </div>
  </div>
</div>
<audio class="audio"></audio>
</main>
`;
export default markdown;
