/*
Javascript permite obtener información sobre el ratón y el teclado mediante un 
objeto especial llamado event. IE considera q este objeto forma parte del objeto 
window y el resto de los navegadores, lo consideran como el único argumento q
tienen las funciones manejadoras de eventos.
Todos los manejadores modernos crean en forma automática, un argumento q se pasa 
a la función manejadora, por lo q no es necesario incluirlo en esa función.
Para utilizar este argumento mágico, solo es necesario darle un nombre.

EN IE, el objeto event se obtiene:
var evento = window.event;

El resto de los navegadores, se obtiene:
functión manejadorEventos(elEvento){
  var evento = elEvento;
}

Una función que funcione correctamente en todos los navegadores sería:
functión manejadorEventos(elEvento){
  var evento = elEvento || window.event;
}

Una vez obtenido el objeto event, ya se puede acceder a toda la info relacionada
con el evento, que depende del tipo de evento producido.

La propiedad type indica el tipo de evento producido, esto sirve cuando una
misma función se utiliza para manejar varios eventos.
var tipo = evento.type;

function resalta(elEvento) {
  var evento = elEvento || window.event;
  switch(evento.type) {
    case 'mouseover':
      this.style.borderColor = 'black';
      break;
    case 'mouseout':
      this.style.borderColor = 'silver';
      break;
  }
}

La info de coordenadas del ratón, se puede tomar de distintas formas:
1. respecto de la pantalla del ordenador. (screenX y screenY)
2. respecto de la ventana del navegador. (clientX y clientY)
3. respecto de la propia página HTML (q se utiliza cuando el usuario
ha hecho scroll sobre la página) (pageX y pageY)

Con IE es diferente, por eso hay q saber si estoy en IE:
var ie = navigator.userAgent,toLowerCase().indexOf('msie')!=1;

*/
var veces = 0;

  function informacion(elEvento) {
    var evento = elEvento || window.event;
    debugger;

    switch(evento.type) {

      case 'mousemove':
        document.getElementById('info').style.backgroundColor = '#FFFFFF';
        var ie = navigator.userAgent.toLowerCase().indexOf('msie')!=-1;
        var coordenadaXrelativa, coordenadaYrelativa, coordenadaXabsoluta, coordenadaYabsoluta;
        if(ie) {
          if(document.documentElement && document.documentElement.scrollTop){ 
            coordenadaXabsoluta = evento.clientX + document.documentElement.scrollLeft;
            coordenadaYabsoluta = evento.clientY + document.documentElement.scrollTop;
          }
          else { 
            coordenadaXabsoluta = evento.clientX + document.body.scrollLeft;
            coordenadaYabsoluta = evento.clientY + document.body.scrollTop;
          }
        }
        else {
          coordenadaXabsoluta = evento.pageX;
          coordenadaYabsoluta = evento.pageY;
        }
        coordenadaXrelativa = evento.clientX;
        coordenadaYrelativa = evento.clientY;
        muestraInformacion(['Ratón', 'Navegador ['+coordenadaXrelativa+', '+coordenadaYrelativa+']', 'Página ['+coordenadaXabsoluta+', '+coordenadaYabsoluta+']']);
        veces = 0;
        break;

      case 'keypress':
        document.getElementById('info').style.backgroundColor = '#CCE6FF';
        var caracter = evento.charCode || evento.keyCode;
        var letra = String.fromCharCode(caracter);
        var codigo = letra.charCodeAt(0);
        muestraInformacion(['Teclado', 'Carácter ['+letra+']', 'Código ['+codigo+']']);
        veces = 0;
        break;

      case 'click':
        document.getElementById('info').style.backgroundColor = '#FFFFFC';
        var cual;
        if (evento.button == 2) {
          cual="derecho";
        }else{
          if (evento.button == 1) {
            cual="medio";
          }else{
            cual="izquierdo";// si es 0
          }
        }
        muestraInformacion(['Ratón', 'Botón ['+cual+']']);
        veces = 0;
        break;

      case 'wheel'://mover la rueda del mouse, hacia abajo nro positivo, hacia arriba nro negativo
        document.getElementById('info').style.backgroundColor = '#ff0000';
        coordenadaXrueda = evento.deltaX;// siempre 0
        coordenadaYrueda = evento.deltaY;
        coordenadaZrueda = evento.deltaZ;// siempre 0
        if (evento.deltaY<0) {
          veces++;
          if (veces == 3) {// si 3 veces seguidas muevo la rueda hacia arriba
            muestraInformacion(['Rueda', 'Rueda ['+'3 veces para arriba'+', '+coordenadaYrueda+', '+coordenadaZrueda+']']);
            veces = 0;
          }else{
            muestraInformacion(['Rueda', 'Rueda ['+veces+']']);
          }
        }else{
          veces = 0;
        }
        // muestraInformacion(['Ratón', 'Rueda ['+coordenadaXrueda+', '+coordenadaYrueda+', '+coordenadaZrueda+']']);
        // muestraInformacion('Veces');
        break;

      
    }
  }

  function muestraInformacion(mensaje) {
    document.getElementById("info").innerHTML = '<h1>'+mensaje[0]+'</h1>';
    for(var i=1; i<mensaje.length; i++) {
      document.getElementById("info").innerHTML += '<p>'+mensaje[i]+'</p>';
    }
    // document.getElementById("info").innerHTML = '<p>'+veces+'</p>';
  }

  document.onmousemove = informacion;
  document.onkeypress = informacion;
  document.onwheel = informacion;
  document.onclick = informacion;
