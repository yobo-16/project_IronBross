"use strict";

class Player {
  constructor(canvas, lives) {
    this.size = 40;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = this.canvas.width / 4;
    this.y = this.canvas.height - this.size;
    this.speed = 5;
    this.direction = 0;
    this.lives = lives;
    this.limiteDeSalto = false;
    this.coins = 0;

    this.img = new Image;
    this.img.src = "img/Rob1.png"

  }

  update() {
    this.y = this.y + this.direction * this.speed;
  }

  draw() {

    this.positionX = this.x;
    this.positionY = this.y - 55;
    this.ctx.drawImage(this.img, this.positionX, this.positionY + 15, this.size, 55);

  }

  setDirection(direction) {

    this.direction = direction;
  }

  checkScreen() {

    if (this.y - this.size / 2 < this.canvas.height - this.size * 5) { // Altura del salto --> this.canvas.height / 2
      this.direction = 1;
      this.limiteDeSalto = true;
    } else if (this.y + this.size / 2 >= this.canvas.height - 20) {
      this.y = this.canvas.height - this.size; // Forzando su posoción al caer   this.canvas.height - 45
      this.limiteDeSalto = false;
    }
  }

  checkCollisionEnemy(enemy) {
    const collideRight = this.x + this.size / 2 > enemy.x - enemy.size / 2;
    const collideLeft = this.x - this.size / 2 < enemy.x + enemy.size / 2;
    const collideTop = this.y + this.size / 2 > enemy.y - enemy.size / 2;
    const collideBottom = this.y - this.size / 2 < enemy.y + enemy.size / 2;

    if (collideRight && collideLeft && collideTop) {
      return true;
    }

    return false;
  }

  loseLive() {
    this.lives--;
  }

  incrementCoins() {
    this.coins += 1;
  }
}