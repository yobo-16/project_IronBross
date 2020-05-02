class Empty {
    constructor(canvas, y) {
        this.size = 20;
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
        let positionY = this.y;
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(positionX, positionY, this.size * 2, this.size + 21);
    }

    setDirection(direction) {
        this.direction = direction;
    }
}