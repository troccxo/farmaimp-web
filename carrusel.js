/* ──────────────────────────────────────────────────────────────────────────
   Carrusel de capturas de la aplicacion.

   Sin librerias: la pista es un contenedor con scroll horizontal y
   scroll-snap, asi que el gesto de arrastre en tactil y el scroll con dos
   dedos en trackpad funcionan solos. El JS solo agrega flechas, puntos y
   teclado, y se apoya en scrollTo — si el JS no carga, el carrusel sigue
   siendo navegable a mano.

   Sin autoplay a proposito: son capturas con texto que la gente necesita
   leer, y una que se mueve sola mientras la miras es peor que ninguna.
   ────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  document.querySelectorAll('[data-carrusel]').forEach(function (raiz) {
    var pista  = raiz.querySelector('[data-pista]');
    var slides = Array.prototype.slice.call(pista.children);
    var puntos = raiz.querySelector('[data-puntos]');
    var prev   = raiz.querySelector('[data-prev]');
    var next   = raiz.querySelector('[data-next]');
    if (!pista || slides.length === 0) return;

    var actual = 0;

    // Puntos
    slides.forEach(function (s, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'carrusel-punto';
      b.setAttribute('aria-label', 'Ver captura ' + (i + 1) + ' de ' + slides.length);
      b.addEventListener('click', function () { ir(i); });
      puntos.appendChild(b);
    });

    function ir(i) {
      i = Math.max(0, Math.min(slides.length - 1, i));
      pista.scrollTo({ left: slides[i].offsetLeft - pista.offsetLeft, behavior: 'smooth' });
    }

    function pintar() {
      // El slide activo es el que esta mas cerca del borde izquierdo de la pista.
      var mejor = 0, dist = Infinity;
      slides.forEach(function (s, i) {
        var d = Math.abs(s.offsetLeft - pista.offsetLeft - pista.scrollLeft);
        if (d < dist) { dist = d; mejor = i; }
      });
      actual = mejor;
      Array.prototype.forEach.call(puntos.children, function (p, i) {
        p.classList.toggle('activo', i === actual);
        p.setAttribute('aria-current', i === actual ? 'true' : 'false');
      });
      if (prev) prev.disabled = actual === 0;
      if (next) next.disabled = actual === slides.length - 1;
    }

    if (prev) prev.addEventListener('click', function () { ir(actual - 1); });
    if (next) next.addEventListener('click', function () { ir(actual + 1); });

    pista.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); ir(actual + 1); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); ir(actual - 1); }
    });

    var t = null;
    pista.addEventListener('scroll', function () {
      if (t) clearTimeout(t);
      t = setTimeout(pintar, 60);
    }, { passive: true });

    window.addEventListener('resize', pintar);
    pintar();
  });
})();
