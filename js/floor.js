"use strict";

class Floor {
  constructor(canvas, y) {
    this.size = 40;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = this.canvas.width;
    this.y = this.canvas.height;
    this.speed = 5;
    this.direction = 1;
    this.img = new Image;
    this.img.src = "img/Floor_3_3.png"
  }

  update() {
    this.x = this.x + this.direction * this.speed;
  }

  draw() {
    this.ctx.drawImage(this.img, 0, this.y - this.size / 2, this.canvas.width, this.size);
  }

  setDirection(direction) {
    this.direction = direction;
  }
};