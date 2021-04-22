document.addEventListener("DOMContentLoaded", function(){

    // Variables
    var buttonUp = document.querySelector('#check2');
    // var buttonUp = document.querySelector('a[href="#up"]');
    var easings = {
        linear(t) {return t;},
        easeInQuad(t) {return t * t;},
        easeOutQuad(t) {return t * (2 - t);},
        easeInOutQuad(t) {return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;},
        easeInCubic(t) {return t * t * t;},
        easeOutCubic(t) {return (--t) * t * t + 1;},
        easeInOutCubic(t) {return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;},
        easeInQuart(t) {return t * t * t * t;},
        easeOutQuart(t) {return 1 - (--t) * t * t * t;},
        easeInOutQuart(t) {return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;},
        easeInQuint(t) {return t * t * t * t * t;},
        easeOutQuint(t) {return 1 + (--t) * t * t * t * t;},
        easeInOutQuint(t) {return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;}
    };

    // Functions
    /**
     * Animated scroll to up
     */
    function scrollUp(duration, easing) {
        var start = window.pageYOffset;
        var startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
        var documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
        var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;

        if ('requestAnimationFrame' in window === false) {
            window.scroll(0, 0);
            return;
        }
        // Animation
        function scroll() {
            var now = 'now' in window.performance ? performance.now() : new Date().getTime();
            var time = Math.min(1, ((now - startTime) / duration));
            var timeFunction = easings[easing](time);
            window.scroll(0, Math.ceil((timeFunction * (0 - start)) + start));
            if (window.pageYOffset === 0) {
                return;
            }
            requestAnimationFrame(scroll);
        }
        // Move
        scroll();
    }


    // esta función muestra u oculta el botón de volver arriba, dependiendo de la posición de la página
    function esVisibleBoton() {
        var h1 = parseInt(buttonUp.getAttribute('height-hide'))
        var heightHide = parseInt(buttonUp.getAttribute('height-hide')) || 100;
        var h2 = document.body.scrollTop; 
        var h3 = document.documentElement.scrollTop; 
        if (h2 > heightHide || h3 > heightHide) {
            // Show    
            document.getElementById("check2").classList.remove('s1hide');
            document.getElementById("check2").classList.add('s1show');
            document.querySelector('#volver label').classList.remove('s1hide');
            document.querySelector('#volver label').classList.add('s1show');
        } else {
            // Hide
            document.getElementById("check2").classList.remove('s1show');
            document.getElementById("check2").classList.add('s1hide');
            document.querySelector('#volver label').classList.remove('s1show');
            document.querySelector('#volver label').classList.add('s1hide');
        }
    }

    // EVENTOS

    // Cuando detecta un Click en el botón de volver arriba, se pasa la duración 
    // y el tipo de desplazamiento a la función scrollUp
    buttonUp.addEventListener('click', function() {
        // Get attributes
        var duration = parseInt(buttonUp.getAttribute('duration')) || 500;
        var easing = buttonUp.getAttribute('easing') || 'easeInOutQuad';
        // Run
        scrollUp(duration, easing);
    });

    // Evento automático que se activa cuando detecta que se ha desplazado
    // la vista del documento en un scroll, verifica la función esVisibleBoton
    window.addEventListener('scroll', esVisibleBoton);
    });