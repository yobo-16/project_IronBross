"use strict";

class Player {
  constructor(canvas, lives) {
    this.size = 40;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = this.canvas.width / 2 + this.size / 2; //
    this.y = this.canvas.height - 40;
    this.speed = 5;
    this.direction = 0;
    this.lives = lives;
    this.limiteDeSalto = false; // Declarado para permitir que solo salte una vez luego de presionar la tecla
  }

  update() {
    this.y = this.y + this.direction * this.speed;
  }

  draw() {
    let positionX = this.x - this.size / 2;
    let positionY = this.y - this.size / 2;
    this.ctx.fillStyle = "purple";
    this.ctx.fillRect(positionX, positionY, this.size, this.size);
  }

  setDirection(direction) {
    this.direction = direction;
  }

  checkScreen() {

    if (this.y - this.size / 2 < this.canvas.height - this.size * 5) { // Altura del salto --> this.canvas.height / 2
      this.direction = 1;
      this.limiteDeSalto = true;
    } else if (this.y + this.size / 2 >= this.canvas.height - 20) {
      this.y = this.canvas.height - 40;
      this.limiteDeSalto = false;
    }

    /* if (this.y - this.size / 2 <= 0) {
      this.direction = 1;
    } else if (this.y + this.size / 2 >= this.canvas.height - 20) {
      this.direction = -1;
    } */
  }

  checkCollisionEnemy(enemy) {
    const collideRight = this.x + this.size / 2 > enemy.x - enemy.size / 2;
    const collideLeft = this.x - this.size / 2 < enemy.x + enemy.size / 2;
    const collideTop = this.y + this.size / 2 > enemy.y - enemy.size / 2;
    const collideBottom = this.y - this.size / 2 < enemy.y + enemy.size / 2;

    if (collideRight && collideLeft && collideTop && collideBottom) {
      return true;
    }

    return false;
  }

  loseLive() {
    this.lives--;
  }
}