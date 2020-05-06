class Game {
  constructor(canvas, enemiesPosition) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.player;
    this.noFloor = [];
    this.background = [];
    this.enemies = [];
    this.hearts = [];
    this.coins = [];
    this.enemiesPosition = enemiesPosition;
    this.enemiesIndex = 0;
    this.floor = [];
    this.isGameOver = false;
    this.nextLevel = false;
    this.fondoMusical = document.getElementById("fondo").volume = 0.05;
    // this.audioElement = new Audio('img/vicetone-tony-igy-astronomia.mp3');
    // this.audioElement.play();
  }

  createEnemies() {
    this.enemiesPosition.forEach(position => {
      this.enemies.push(new Enemy(this.canvas, position))
    })
  }

  startLoop() {
    this.player = new Player(this.canvas, 3, 0);

    // Heart
    this.hearts.push(new Heart(this.canvas, this.canvas.width - 40, 20, 30));
    this.hearts.push(new Heart(this.canvas, this.canvas.width - 80, 20, 30));
    this.hearts.push(new Heart(this.canvas, this.canvas.width - 120, 20, 30));

    const loop = () => {

      // Extralife

      // if (this.player.coins >= 20 || this.player.coins >= 100) {
      //   this.hearts.push(new Heart(this.canvas, this.canvas.width - 160, 20, 30));
      // }

      // coins generator

      if (Math.random() > 0.97) {
        this.coins.push(new Coins(this.canvas));
        if (this.coins.length > 10) {
          this.coins.shift()
        };
      }

      // No floor

      if (Math.random() > 0.99 && Math.random() > 0.05) {
        this.noFloor.push(new Empty(this.canvas));
        if (this.noFloor.length > 10) {
          this.noFloor.shift()
        };
      }

      // Floor

      this.floor.push(new Floor(this.canvas));

      if (this.floor.length > 1) {
        this.floor.shift()
      };

      // Methods

      this.checkAllCollisions();
      this.updateCanvas();
      this.clearCanvas();
      this.drawCanvas();
      if (!this.isGameOver) {
        window.requestAnimationFrame(loop);
      }
    };

    window.requestAnimationFrame(loop);
  }

  updateCanvas() {
    this.player.update();

    this.floor.forEach((floor) => {
      floor.update();
    });

    this.enemies.forEach((enemy) => {
      enemy.update();
    });

    this.noFloor.forEach((noFloor) => {
      noFloor.update();
    });

    this.coins.forEach((coins) => {
      coins.update();
    });

  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawCanvas() {
    this.player.draw();

    this.floor.forEach((floor) => {
      floor.draw();
    });

    this.enemies.forEach((enemy) => {
      enemy.draw();
    });

    this.noFloor.forEach((noFloor) => {
      noFloor.draw();
    });

    this.coins.forEach((coin) => {
      coin.draw();
    });


    this.hearts.forEach(heart => heart.draw());

    // Score Coins

    this.ctx.font = "35px 'VT323'"
    this.ctx.fillStyle = 'white'
    this.ctx.fillText(`Tus monedas: ${this.player.coins}`, 25, 40);

  }

  checkAllCollisions() {

    this.player.checkScreen();

    this.enemies.forEach((enemy, index) => {
      if (this.player.checkCollisionEnemy(enemy)) {
        this.player.loseLive(); //this.player.loseLive();
        this.enemies.splice(index, 1);
        this.hearts.shift();
        if (this.player.lives === 0) {
          this.isGameOver = true;
          this.onGameOver();
        }
      }
    });


    this.noFloor.forEach((noFloor, index) => {
      if (this.player.checkCollisionEnemy(noFloor)) {
        this.player.loseLive();
        this.noFloor.splice(index, 1);
        this.hearts.shift();
        if (this.player.lives === 0) {
          this.isGameOver = true;
          this.onGameOver();
        }
      }
    });


    this.coins.forEach((coins, index) => {
      if (this.player.checkCollisionEnemy(coins)) {
        this.player.incrementCoins();
        this.coins.splice(index, 1);
        // if (this.player.coins >= 20) {
        //   this.player.lives = this.player.lives + 1;
        // }
      }
    });


  }

  gameOverCallback(callback) {
    this.onGameOver = callback;
  }

}