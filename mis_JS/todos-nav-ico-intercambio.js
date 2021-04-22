const i1 = document.getElementById("check");
const img11 = document.querySelector('#img11');
const img22 = document.querySelector('#img22');

img11.src = 'mis_IMAGENES/ico3.png';
img22.src = 'mis_IMAGENES/ico4.png';

////////////////////////////// E V E N T O S ///////////////////////////////////////////////////////////

i1.addEventListener('click', (e) => {

    //la función e (podemos darle cualquier nombre) es un objeto que tiene las siguientes propiedades:
    // target: es la referencia del objeto que generó el evento
    // type: el nombre del evento (en este caso es click)
    // button: el botón del mouse presionado (0=izq, 1=medio, 2=der)
    // keyCode: el caracter del teclado presionado (en caso que corresponda)
    // shiftKey: true o false, en caso de estar presionada esta tecla

    if (i1.checked) {
        //si esta check
        img11.classList.remove('sichecked');
        img11.classList.add('nochecked');
        img22.classList.remove('nochecked');
        img22.classList.add('sichecked');
    }else{
        //si no esta check
        img11.classList.add('sichecked');
        img11.classList.remove('nochecked');
        img22.classList.add('nochecked');
        img22.classList.remove('sichecked');
    }
});