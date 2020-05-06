"use stric"

class Coins {
    constructor(canvas, y) {
        this.size = 20;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.x = this.canvas.width;
        this.y = this.canvas.height - this.size
        this.speed = 5;
        this.direction = -1;
        this.img = new Image;
        this.img.src = "img/coin.png"
    }

    update() {
        this.x = this.x + this.direction * this.speed;
    }

    draw() {
        let positionX = this.x - this.size / 2;
        let positionY = this.y - 40;
        this.ctx.fillStyle = "yellow";
        this.ctx.drawImage(this.img, positionX, positionY, this.size, this.size + 21);
    }

    setDirection(direction) {
        this.direction = direction;
    }
}