const contenedorFichas = document.getElementById('contenedor-fichas');

/*RANDOMIZACIÓN DE FICHAS*/
function mezclarArray_(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

/*GENERACIÓN DE FICHAS*/

const animalesNivelFacil = [
    { nombre: "Cat", id: "cat", imagen: "./img/cat.png"},
    { nombre: "Dog", id: "dog", imagen: "./img/dog.png"},
    { nombre: "Bird", id: "bird", imagen: "./img/bird.png"},
    { nombre: "Fish", id: "fish", imagen: "./img/fish.png"},
    { nombre: "Tortoise", id: "tortoise", imagen: "./img/tortoise.png"},
    { nombre: "Rabbit", id: "rabbit", imagen: "./img/rabbit.png"},
    { nombre: "Parrot", id: "parrot", imagen: "./img/parrot.png"},
    { nombre: "Mouse", id: "mouse", imagen: "./img/mouse.png"},
];

const animalesNivelFacilDuplicado = animalesNivelFacil.concat(
    animalesNivelFacil.map(animal => ({
        ...animal,
        id: animal.id + "b"
    }))
);


const animalesNivelFacilMezclados = mezclarArray_(animalesNivelFacilDuplicado);



const crearFicha_ = (animal) => {
    const ficha = document.createElement('div');
    ficha.className = 'ficha';
    ficha.id = `${animal.id}`;

    ficha.innerHTML = `
        <img src="./img/tapa-ficha.png" class="img-tapa">
        <div class="grupo__img-etiqueta oculto">
            <img src="${animal.imagen}" class="img-animal">
            <p class="etiqueta-animal">${animal.nombre}</p>
        </div>
    `;

    contenedorFichas.appendChild(ficha);

}

animalesNivelFacilMezclados.forEach(animal => {

    crearFicha_(animal);

    
});





/*CÓDIGO DE FICHAS IN-GAME*/

const fichas = document.getElementsByClassName('ficha');
const tapaFicha = document.getElementsByClassName('img-tapa');
const grupoImgAnimal = document.getElementsByClassName('grupo__img-etiqueta');
const etiquetaAnimal = document.getElementsByClassName('etiqueta-animal');
//TEXTOS
let textoTurnoDeJugador = document.getElementById('texto__turno-de');
let textoPuntosJugador1 = document.getElementById('puntaje-jugador1');
let textoPuntosJugador2 = document.getElementById('puntaje-jugador2');
let contenedorCartelGanador = document.getElementById('contenedor__cartel-resultado');
let ganador = document.getElementById('ganador');
let turnoDeJugador = 1;
//PUNTAJE
let puntosJugador1 = 0;
let puntosJugador2 = 0;

let fichasRestantes = fichas.length;
let fichasVistas = 0;
let etiqueta1;
let etiqueta2;
let primeraFicha;
let segundaFicha;
let nroPrimeraFicha;
let nroSegundaFicha;


for (let i=0; i < fichas.length; i++) {
    fichas[i].addEventListener('click', function(){
            //SIEMPRE QUE SE VEA UNA FICHA
            if (i !== nroPrimeraFicha) {
                tapaFicha[i].classList.add('oculto');
                grupoImgAnimal[i].classList.remove('oculto');
                fichasVistas++;
            }
            

            //ACCIONES SEGÚN SEA 1ra FICHA O 2da FICHA VISTA
            if (fichasVistas === 1) {
                etiqueta1 = etiquetaAnimal[i].textContent;
                primeraFicha = fichas[i];
                nroPrimeraFicha = i;
            } else if (fichasVistas === 2) {
                etiqueta2 = etiquetaAnimal[i].textContent;
                segundaFicha = fichas[i];
                nroSegundaFicha = i;

                //FICHAS IGUALES O DIFERENTES
                if (etiqueta1 === etiqueta2) {
                    primeraFicha.classList.add('ficha-correcto');
                    segundaFicha.classList.add('ficha-correcto');
                    setTimeout(() => {
                        if (turnoDeJugador === 1) {
                            puntosJugador1++;
                            textoPuntosJugador1.textContent = puntosJugador1;
                        } else {
                            puntosJugador2++;
                            textoPuntosJugador2.textContent = puntosJugador2;
                        }
                        
                        primeraFicha.classList.add('ficha-descubierta');
                        segundaFicha.classList.add('ficha-descubierta');
                        
                        fichasRestantes -= 2;

                    }, 1000);
                } else {
                    primeraFicha.classList.add('ficha-incorrecto');
                    segundaFicha.classList.add('ficha-incorrecto');
                    setTimeout(() => {
                        primeraFicha.classList.remove('ficha-incorrecto');
                        segundaFicha.classList.remove('ficha-incorrecto');
                        
                        tapaFicha[nroPrimeraFicha].classList.remove('oculto');
                        grupoImgAnimal[nroPrimeraFicha].classList.add('oculto');
                        tapaFicha[nroSegundaFicha].classList.remove('oculto');
                        grupoImgAnimal[nroSegundaFicha].classList.add('oculto');

                        nroPrimeraFicha = null;
                    }, 1000);

                    

                }

                //INHABILITACIÓN TEMPORAL DE CLICK
                contenedorFichas.classList.add('interaccion-inhabilitada');
                setTimeout(() => {
                    contenedorFichas.classList.remove('interaccion-inhabilitada');
                }, 1000);

                //CAMBIO DE TEXTO DE TURNO DE JUGADOR
                setTimeout(() => {
                    turnoDeJugador = (turnoDeJugador === 1) ? 2 : 1;
                        (turnoDeJugador === 1) ? 
                            textoTurnoDeJugador.textContent = 'Turn: Player 1' :
                            textoTurnoDeJugador.textContent = 'Turn: Player 2';
                    
                }, 1000);

                //ANUNCIO DE GANADOR
                setTimeout(() => {
                    if (fichasRestantes <= 0) {
                        contenedorCartelGanador.classList.remove('oculto');
                        if (puntosJugador1 > puntosJugador2) {
                            ganador.textContent = 'Player 1';
                        } else if (puntosJugador2 > puntosJugador1) {
                            ganador.textContent = 'Player 2';
                        } else {
                            ganador.textContent = 'Tie!';
                        }
                    }
                }, 2000);
                



                
                fichasVistas = 0;
            }
            
                
    });
}
        
        
        
