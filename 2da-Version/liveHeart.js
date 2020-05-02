"use strict";

class Heart {
    constructor(canvas, lives) {
        this.size = 50; // Valor original 40
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.x = this.canvas.width / 2 - this.size; //
        this.y = this.size; //this.canvas.height - 40; Cambio de medida segun el personaje

    }

    update() {
        this.y = this.y + this.direction * this.speed;
    }

    draw() {


        let positionX = this.x - this.size / 2;
        let positionY = this.y - this.size / 2;
        this.ctx.fillStyle = "rose";
        this.ctx.fillRect(positionX, positionY, this.size, this.size);




        /*
        let positionX = this.x - this.size / 2;
        let positionY = this.y - this.size / 2;
        this.ctx.fillStyle = "purple";
        this.ctx.fillRect(positionX, positionY, this.size, this.size);

        */
    }





}