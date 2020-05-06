class Enemy {
    constructor(canvas, x) {
        this.size = 30;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.x = x;
        this.y = this.canvas.height - this.size
        this.speed = 5;
        this.direction = -1;
        this.img = new Image;
        this.img.src = "img/enemy_1.png"

    }

    update() {
        this.x = this.x + this.direction * this.speed;
    }

    draw() {
        let positionX = this.x - this.size / 2;
        let positionY = this.y - 10;
        this.ctx.drawImage(this.img, positionX, positionY - 10, this.size, this.size);
    }

    setDirection(direction) {
        this.direction = direction;
    }
};