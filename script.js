document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el carrusel
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carrusel-item');
    const totalSlides = slides.length;

    // Mostrar la primera diapositiva
    showSlide(currentSlide);

    // Función para mostrar una diapositiva específica
    function showSlide(index) {
        // Ocultar todas las diapositivas
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Asegurarse de que el índice esté dentro de los límites
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }

        // Mostrar la diapositiva actual
        slides[currentSlide].classList.add('active');

        // Actualizar los puntos indicadores
        updatePuntos();
    }

    // Función para cambiar a la siguiente o anterior diapositiva
    window.cambiarSlide = function(step) {
        showSlide(currentSlide + step);
    };

    // Función para actualizar los puntos indicadores
    function updatePuntos() {
        const puntosContainer = document.querySelector('.carrusel-puntos');

        // Si no existe el contenedor de puntos, lo creamos
        if (!puntosContainer) {
            const puntos = document.createElement('div');
            puntos.className = 'carrusel-puntos';

            // Crear un punto por cada diapositiva
            for (let i = 0; i < totalSlides; i++) {
                const punto = document.createElement('div');
                punto.className = 'punto' + (i === currentSlide ? ' activo' : '');
                punto.addEventListener('click', () => showSlide(i));
                puntos.appendChild(punto);
            }

            document.querySelector('.carrusel').appendChild(puntos);
        } else {
            // Actualizar la clase 'activo' de los puntos existentes
            const puntos = document.querySelectorAll('.punto');
            puntos.forEach((punto, index) => {
                if (index === currentSlide) {
                    punto.classList.add('activo');
                } else {
                    punto.classList.remove('activo');
                }
            });
        }
    }

    // Cambiar automáticamente de diapositiva cada 5 segundos
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    // Pausar el carrusel cuando el mouse está sobre él
    const carrusel = document.querySelector('.carrusel');
    let intervalo;

    function iniciarAutoPlay() {
        intervalo = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }

    function detenerAutoPlay() {
        clearInterval(intervalo);
    }

    carrusel.addEventListener('mouseenter', detenerAutoPlay);
    carrusel.addEventListener('mouseleave', iniciarAutoPlay);

    // Iniciar el autoplay al cargar la página
    iniciarAutoPlay();
});
