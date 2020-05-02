class Game {
  constructor(canvas, enemiesPosition) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.player;
    this.noFloor = [];
    this.enemies = [];
    this.enemiesPosition = enemiesPosition; // this.enemiesArrLevel1
    this.enemiesIndex = 0;
    this.floor = [];
    this.isGameOver = false;
    this.nextLevel = false;
  }

  createEnemies() {
    /* this.enemiesPosition.forEach(position => {
       this.enemies.push(new Enemy(this.canvas, position))
     }) */

    for (let i = 0; i < 100; i++) {
      this.enemiesPosition.forEach(position => {
        this.enemies.push(new Enemy(this.canvas, position))
      })
    }
  }

  startLoop() {
    this.player = new Player(this.canvas, 3);

    const loop = () => {


      // if (this.nextLevel) { // 
      //   this.onNextLevel();
      // }

      // if(this.point > 1000){ //condition
      //   this.nextLevel = true
      // }










      /* 


    if (Math.random() > 0.99 && Math.random() > 0.10) { // Valor original 0.97  (Math.random() > 0.99)   ------- Math.random() > 0.99 && Math.random() > 0.60

        // const y = Math.random() * this.canvas.height;  PROBANDO LA DIB=Námica
        this.enemies.push(new Enemy(this.canvas));

        if (this.enemies.length > 10) {
          this.enemies.shift()

        };

      }

      */

      if (Math.random() > 0.99 && Math.random() > 0.05) {
        this.noFloor.push(new Empty(this.canvas));
        if (this.noFloor.length > 10) {
          this.noFloor.shift()
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



    this.noFloor.forEach((noFloor) => {
      noFloor.update();
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




  }

  checkAllCollisions() {

    this.player.checkScreen();

    this.enemies.forEach((enemy, index) => {
      if (this.player.checkCollisionEnemy(enemy)) {
        this.player.lives--; //this.player.loseLive();
        this.enemies.splice(index, 1);
        if (this.player.lives === 0) {
          this.isGameOver = true;
          this.onGameOver();
        }
      }
    });

    // Colisión original

    // this.player.checkScreen();
    // this.enemies.forEach((enemy, index) => {
    //   if (this.player.checkCollisionEnemy(enemy)) {
    //     this.player.loseLive();
    //     this.enemies.splice(index, 1);
    //     if (this.player.lives === 0) {
    //       this.isGameOver = true;
    //       this.onGameOver();
    //     }
    //   }
    // });




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

    // Colisión no floor

    this.noFloor.forEach((noFloor, index) => {
      if (this.player.checkCollisionEnemy(noFloor)) {
        this.player.loseLive();
        this.noFloor.splice(index, 1);
        if (this.player.lives === 0) {
          this.isGameOver = true;
          this.onGameOver();
        }
      }
    });


  }

  gameOverCallback(callback) {
    this.onGameOver = callback;
  }

  nextLevelCallback(callback) {

    this.onNextLevel = callback


  };
}