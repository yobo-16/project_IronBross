class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.player;
    this.enemies = [];
    this.floor = [];
    this.isGameOver = false;
  }

  startLoop() {
    this.player = new Player(this.canvas, 3);

    const loop = () => {

      if (Math.random() > 0.99 && Math.random() > 0.60) { // Valor original 0.97  (Math.random() > 0.99)   ------- 

        // const y = Math.random() * this.canvas.height;  PROBANDO LA DIB=Námica
        this.enemies.push(new Enemy(this.canvas));

        if (this.enemies.length > 10) {
          this.enemies.shift()

        };

      }

      this.floor.push(new Floor(this.canvas));


      // Borrando elementos del  de suelo Array para hacerlo más rápido

      if (this.floor.length > 1) {
        this.floor.shift()
      };



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
  }

  checkAllCollisions() {

    this.player.checkScreen();
    this.enemies.forEach((enemy, index) => {
      if (this.player.checkCollisionEnemy(enemy)) {
        this.player.loseLive();
        this.enemies.splice(index, 1);
        if (this.player.lives === 0) {
          this.isGameOver = true;
          this.onGameOver();
        }
      }
    });

    /*  Chequeo de colisión suelo


    this.player.checkScreen();
    this.floor.forEach((floor, index) => {
      if (this.player.checkCollisionEnemy(floor)) {
        this.player.loseLive();
        this.floor.splice(index, 1);
        if (this.player.lives === 0) {
          this.isGameOver = true;
          this.onGameOver();
        }
      }
    }); */


  }

  gameOverCallback(callback) {
    this.onGameOver = callback;
  }
}