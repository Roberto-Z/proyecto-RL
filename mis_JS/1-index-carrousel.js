window.addEventListener('DOMContentLoaded', () => {// este evento se dispara cuando el contenido del archivo
    // HTML se ha cargado en el navegador, sin necesitar esperar imágenes, hojas de estilo, etc.

// window.addEventListener('load', () => {// este evento se dispara cuando el contenido del archivo
    // HTML y las referencias a todos los recursos asociados (imágenes, hojas de estilo, etc)
    // se han cargado en la memoria del navegador.

    const imagenes = ['mis_IMAGENES/02028.jpg','mis_IMAGENES/02029.jpg','mis_IMAGENES/02031.jpg',
                    'mis_IMAGENES/02032.jpg','mis_IMAGENES/02418.jpg','mis_IMAGENES/02440.jpg',
                    'mis_IMAGENES/02442.jpg','mis_IMAGENES/03040.jpg','mis_IMAGENES/03041.jpg',
                    'mis_IMAGENES/03498.jpg']
    
    const arraycodigos = ['Cód. 02028','Cód. 02029','Cód. 02031','Cód. 02032','Cód. 02418',
                    'Cód. 02440','Cód. 02442','Cód. 03040','Cód. 03041','Cód. 03498']
    
    const arrayarticulos = ['GRIFO DE CALEFACCION CHEVROLET CORSA 4 VIAS',
                    'GRIFO DE CALEFACCION 3VIAS CHEV CORSA VECTRA',
                    'GRIFO CALEFACCION CHEV CORSA 2 2002',
                    'GRIFO DE CALEFACCION CHEVROLET MERIVA 2002',
                    'KIT TAPA DISTRIBUCION CHEV CORSA NAFTA 1.4 1.6 OSSCA 3 PARTE',
                    'TAPA CULATA TAPA CILINDRO CHEVROLET CORSA TODOS',
                    'KIT TAPA DISTRIBUCION CORSAII/MERIVA 1.8 8V.',
                    'POLEA B/AGUA CHEV.COCHE PICK UP 62 78 BAJA',
                    'POLEA B/AGUA CHEVROLET CORSA MERIVA COMBO 1.7 DIESEL',
                    'POLEA  DE CIG CHEVROLET C 20 BRASILERA MOD92']
    
    const arrayprecios = ['$ 1556','$ 1470','$ 2766','$ 2509','$ 2651',
                    '$ 318','$ 3255','$ 1867','$ 2700','$ 3740']
    
/*
    document.getElementById('slideshow').addEventListener('mouseover', freno_slide);
    //cuando paso el mouse sobre el slideshow, se frena el carrousel
    document.getElementById('slideshow').addEventListener('mouseout', sigue_slide);
    //cuando paso el mouse fuera del slideshow, se continúa con el carrousel
*/    

    const img1 = document.querySelector('#img1');
    const img2 = document.querySelector('#img2');
    const barrasup = document.querySelector('#barra-sup');
    const divindicadores = document.querySelector('#indicadores');

    let i = 1;
    let porcentaje_base = 100 / imagenes.length;
    let porcentaje_actual = porcentaje_base;

    for (index=0; index<imagenes.length; index++) {
        const div = document.createElement('div');// creo un div
        div.classList.add('circulos');// al div le agrego la clase circulos de css
        div.id = index;// nombro cada id del div, con el número de index
        divindicadores.appendChild(div);// todos los divs creados como hijos de #indicadores
    }

    barrasup.style.width = `${porcentaje_base}%`;
    img1.src = imagenes[0];

    document.getElementById("codigos").innerHTML = arraycodigos[0];
    document.getElementById("articulos").innerHTML = arrayarticulos[0];
    document.getElementById("precios").innerHTML = arrayprecios[0];

    const circulos = document.querySelectorAll('.circulos');
    circulos[0].classList.add('resaltado');

    const slideshow = () => {
        img2.src = imagenes[i];
        const circulo_actual = Array.from(circulos).find(el => el.id == i);
        Array.from(circulos).forEach(cir => cir.classList.remove('resaltado'));//remueve en todos, el resaltado
        circulo_actual.classList.add('resaltado');// coloca resaltado en el siguiente
        
        img2.classList.add('active');
        document.getElementById("codigos").innerHTML = arraycodigos[i];
        document.getElementById("articulos").innerHTML = arrayarticulos[i];
        document.getElementById("precios").innerHTML = arrayprecios[i];
        i++;
        porcentaje_actual += porcentaje_base;
        barrasup.style.width = `${porcentaje_actual}%`;
        if (i == imagenes.length) {
            i = 0;
            porcentaje_actual = porcentaje_base - porcentaje_base;
        }
        
        setTimeout(() => {
            img1.src = img2.src;
            img2.classList.remove('active');
        },50)
    }
    
    setInterval(slideshow, 4000);
});

/*
const freno_slide = () => {
    debugger;
    document.getElementById('slideshow').style.backgroundColor ='rgba(226, 238, 64, 0.705)';
};

const sigue_slide = () => {
    debugger;
    document.getElementById('slideshow').style.backgroundColor ='rgba(255,255,255)';
};

function sleep (milisegundos) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    }while (currentDate - date < milisegundos);
};
*/
