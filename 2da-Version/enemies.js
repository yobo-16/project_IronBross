class Enemy {
    constructor(canvas, y) {
        this.size = 40;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.x = this.canvas.width;
        this.y = this.canvas.height - this.size
        this.speed = 5;
        this.direction = -1;
    }

    update() {
        this.x = this.x + this.direction * this.speed;
    }

    draw() {
        let positionX = this.x - this.size / 2;
        let positionY = this.y - this.size / 2;
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(positionX, positionY, this.size / 2, this.size);
    }

    setDirection(direction) {
        this.direction = direction;
    }
}