"use-strict";

const main = () => {

  const level = new Level()
  const buildDom = (html) => {
    const main = document.querySelector("main");
    main.innerHTML = html;
  };

  const buildSplashScreen = () => {
    buildDom(`
        <section class="splash-screen">
            <h1>IronBross <img src= "/Users/Robert/IronHack-Course/Proyecto/Repositorio/project_IronBross/1ra-version/img/personaje.png"></h1>
            <button>Start</button>
        </section>
        `);
    const startButton = document.querySelector("button");
    startButton.addEventListener("click", buildGameScreen);
  };

  function createCanvas() {
    buildDom(`
            <section class="game-screen">
                <canvas></canvas>
            </section>
            
        `);

    //define el size del canvas

    const width = document.querySelector(".game-screen").offsetWidth;
    const height = document.querySelector(".game-screen").offsetHeight;

    const canvasElement = document.querySelector("canvas");

    canvasElement.setAttribute("width", width);
    canvasElement.setAttribute("height", height);
    return canvasElement
  };

  const buildGameScreen = () => {
    const canvasElement = createCanvas();

    const game = new Game(canvasElement, level.level1);
    game.gameOverCallback(buildGameOver);

    // game.nextLevelCallback(buildLevelNumberTwo());

    game.createEnemies();

    game.startLoop();


    const setPlayerDirection = (event) => {
      if (event.code === "Space" && game.player.limiteDeSalto === false) { // limitación de salto por tecla pulsada
        //console.log(game.player)
        game.player.setDirection(-1);
      } //else if (event.code === "ArrowDown") {
      //game.player.setDirection(1);
      //}
    };

    document.addEventListener("keydown", setPlayerDirection);
  };

  const buildGameOver = () => {
    buildDom(`
            <section class="game-over">
                <h1>Game Over Muchachón!</h1>
                <button>Restart</button>
            </section>
        `);

    const restartButton = document.querySelector("button");
    restartButton.addEventListener("click", buildGameScreen);
  };


  // FUNCION PARA LOS LEVELS

  // function buildLevelNumberTwo() {

  //   const canvasElement = createCanvas();



  //   const game = new Game(canvasElement, level.level1);
  //   game.gameOverCallback(buildGameOver);

  //   game.nextLevelCallback(buildLevelNumberTwo());

  //   game.createEnemies();

  //   game.startLoop();

  // }

  buildSplashScreen();
};

window.addEventListener("load", main);