"use strict";

class Heart {
    constructor(canvas, positionX, positionY, size) {
        this.size = size;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.x = positionX;
        this.y = positionY;

        this.img = new Image;
        this.img.src = "img/heart.png"


    }



    draw() {
        // this.ctx.fillStyle = "#F68476";
        this.ctx.drawImage(this.img, this.x, this.y, this.size, this.size);

    }


}