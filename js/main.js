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
            
            <button class="botones">START</button>            
        </section>
        `);
    const startButton = document.querySelector("button");
    startButton.addEventListener("click", buildGameScreen);
  };

  function createCanvas() {
    buildDom(`
            <section class="game-screen">
                <canvas>
               
                </canvas>
                <audio src="sfx/sounds/BOING.ogg" id="salto"></audio>
                <audio src="sfx/vicetone-tony-igy-astronomia.mp3" autoplay loop id="fondo"></audio>                            
            </section>            
        `);

    //Canvas definition


    // const fondoMusical = document.getElementById("fondo").volume = 0.2;
    // fondoMusical.volume = 0.2;
    // function generateMusic() {
    //   return audio.paused ? audio.play() : audio.pause();
    // };
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
    game.gameOverCallback(function () {
      buildDom(`
            <section class="game-over">
              <div class="gameOver">
                <h1>Tus monedas fueron: ${game.player.coins} PERDEDOR!!</h1>
                <button class="botones" id="restart">RESTART</button>
                <div id="funeral">
                </div>
              </div>
            </section>
        `);
      const restartButton = document.querySelector("button");
      restartButton.addEventListener("click", buildGameScreen);
    });
    game.createEnemies();
    game.startLoop();
    // if (canvasElement) {
    //   //Jump Limitation
    //   if (event.code === "Space" && game.player.limiteDeSalto === false) {
    //     document.getElementById("salto").play()
    //     game.player.setDirection(-1);
    //   }
    // }
    //const sonido = document.getElementById("salto");
    const setPlayerDirection = (event) => {
      //Jump Limitation
      if (document.getElementById("salto")) {
        if (event.code === "Space" && game.player.limiteDeSalto === false) {
          game.player.setDirection(-1);
          document.getElementById("salto").play();
        }
      }
    };
    document.addEventListener("keydown", setPlayerDirection);
  };

  // const buildGameOver = () => {

  //   buildDom(`
  //           <section class="game-over">
  //             <div class="gameOver">
  //               <h2> Tus monedas fueron:  </h2>
  //               <button class="botones" id="restart">RESTART</button>
  //               <div id="funeral">
  //               </div>
  //             </div>
  //           </section>
  //       `);

  //   const restartButton = document.querySelector("button");
  //   restartButton.addEventListener("click", buildGameScreen);
  // };

  buildSplashScreen();
};

window.addEventListener("load", main);