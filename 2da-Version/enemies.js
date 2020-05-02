class Enemy {
    constructor(canvas, x) {
        this.size = 40;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.x = x;
        this.y = this.canvas.height - this.size
        this.speed = 5;
        this.direction = -1;
    }

    update() {
        this.x = this.x + this.direction * this.speed;
    }

    draw() {
        let positionX = this.x - this.size / 2;
        let positionY = this.y;
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(positionX, positionY, this.size / 2, this.size / 2);
    }

    setDirection(direction) {
        this.direction = direction;
    }
}