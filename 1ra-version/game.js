// Variables globales
console.log("Se ve lo que hago")

let velocidad = 50; // velocidad del fondo

let desplazamiento = 8;

let superficie = 268; // base o suelo

let bucle; // loop de repetición

let canvas = document.getElementById("canvas");

let ctx = canvas.getContext("2d")

let ancho = canvas.width; // Acceso al DOM - Se hace acá para sólo acceder una vez.

let alto = canvas.height;

let modal = document.getElementById("modal") // modal para inicial (MODIFICACIÓN LUEGO)

// Variables de salto del player

let salto;

let velocidadSalto = 25;

let desplazamientoSalto = 5;

// Clases

class Objeto {
    constructor() {
        this.img = document.createElement("img");
    }
    /*
    choque(otro){
        // Verificación de objetos alrededor
        if (this.fondo < otro.techo || this.techo > otro.fondo || this.derecha < otro.izquierda || this.izquierda > otro.derecha){
            return false;
        } else {
            return true;
        };
    };
    */
};

class Mundo {
    constructor() {
        this.x = 0;
        this.y = superficie;
        this.tamano = 15000;
        this.espacio = 32;
        this.img = document.createElement("img");
        this.img.src = "img/mundo.png";
        console.log("El mundo debería verse")
    }

    dibujar() {
        console.log("ESTO DEBERÏA SER EL SUELO")
        let tx = this.x;
        for (var i = 0; i <= this.tamano; i++) {
            ctx.drawImage(this.img, tx, this.y);
            tx += this.espacio;
        }

        //BG en movimiento

    }

    // método del movimiento
    mover() {
        this.x -= desplazamiento
    }
};

class Player extends Objeto {

    constructor() {
        super();
        this.x = 25; // separación de la pared
        this.w = 100; //el ancho (lo redefinimos luego)
        this.h = 116; // el alto (lo redefinimos luego)
        this.y = superficie - this.h // colocación del player
        this.img = document.createElement("img");
        this.img.src = "img/personaje.png";
        console.log("El PERSONAJE debería verse")
    }
    dibujar() {
        ctx.drawImage(this.img, this.x, this.y) //im y su ubicación
    }

};

// Objetos

let player = new Player();

let mundo = new Mundo();


//Funciones de control

function subir() {

    player.y -= desplazamientoSalto;

    // Altura del salto



    if (player.y <= 2) {

        clearInterval(salto);

        salto = setInterval("bajar()", velocidadSalto * 2);
    }


};


function bajar() {

    player.y += desplazamientoSalto * 3;

    if (player.y >= (superficie - player.h)) {

        clearInterval(salto);
    }
};


function iniciarSalto() {

    salto = setInterval("subir()", velocidadSalto * 2);

};


function saltar(event) {

    console.log("DEBE SALIR ESTO SI SE ESTÁ LLAMANDO A LA FUNCION DE SALTAR CORRECTAMENTE")

    if (event.keyCode == 32) { // Barra espaciadora

        iniciarSalto();
    }
};






// funciones

function dibujar() {

    ctx.clearRect(0, 0, ancho, alto);
    mundo.dibujar();
    player.dibujar()
}



function frame() {
    dibujar();
    mundo.mover();
}

function iniciar() {
    modal.style.display = "none"
    bucle = setInterval("frame()", velocidad);
}