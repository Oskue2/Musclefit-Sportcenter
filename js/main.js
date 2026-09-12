/* ============================================================
   MuscleFit Sport Center - JavaScript principal
   ============================================================ */

/* ------------------------------------------------------------
   >>> CONFIGURACION <<<
   Este es el UNICO bloque que necesitas editar con los datos
   reales del gimnasio. Todo lo demas se actualiza solo.
   ------------------------------------------------------------ */
const CONFIG = {
  // Numero de WhatsApp en formato internacional, SIN +, espacios ni guiones.
  // Colombia = 57. Ejemplo: 573001234567
  whatsapp: '573203258615',

  // Datos de contacto que se muestran en la pagina
  telefono: '+57 320 325 8615',
  email:    'contacto@musclefit.com',

  // PENDIENTE: falta el numero exacto (ej. "Calle 6 # 12-34").
  direccion:'Calle 6, Comuna Suroriental - Florencia, Caqueta',

  // Redes sociales (pega la URL completa del perfil).
  // Si una red se deja vacia ('') su icono se oculta automaticamente.
  redes: {
    instagram: 'https://www.instagram.com/musclefit_sportcenter/',
    facebook:  'https://www.facebook.com/',   // PENDIENTE: falta la URL real de la pagina
    tiktok:    ''
  },

  // Link del boton "Como llegar" (abre la ficha real del gimnasio en Google Maps).
  // Si se deja vacio ('') se genera automaticamente desde la direccion.
  mapsUrl: 'https://maps.app.goo.gl/BLhaWdCbNsefHB4B8'
};

/* ------------------------------------------------------------
   1. Enlaces de WhatsApp
   Cualquier elemento con data-wa="mensaje" abre el chat
   ------------------------------------------------------------ */
function initWhatsApp() {
  const base = 'https://wa.me/' + CONFIG.whatsapp + '?text=';

  document.querySelectorAll('[data-wa]').forEach(function (el) {
    const url = base + encodeURIComponent(el.getAttribute('data-wa'));

    if (el.tagName === 'A') {
      el.href = url;
      el.target = '_blank';
      el.rel = 'noopener';
    } else {
      el.addEventListener('click', function () {
        window.open(url, '_blank', 'noopener');
      });
    }
  });
}

/* ------------------------------------------------------------
   2. Datos de contacto y redes sociales
   ------------------------------------------------------------ */
function initDatos() {
  document.querySelectorAll('[data-phone]').forEach(function (el) {
    el.textContent = CONFIG.telefono;
  });
  document.querySelectorAll('[data-email]').forEach(function (el) {
    el.textContent = CONFIG.email;
  });
  document.querySelectorAll('[data-address]').forEach(function (el) {
    el.textContent = CONFIG.direccion;
  });

  // Las redes sin URL configurada se ocultan en vez de quedar como enlace muerto
  document.querySelectorAll('[data-social]').forEach(function (el) {
    const red = el.getAttribute('data-social');
    if (CONFIG.redes[red]) {
      el.href = CONFIG.redes[red];
    } else {
      el.remove();
    }
  });

  const maps = CONFIG.mapsUrl ||
    'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(CONFIG.direccion);
  document.querySelectorAll('[data-maps]').forEach(function (el) {
    el.href = maps;
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
}

/* ------------------------------------------------------------
   3. Header al hacer scroll + menu movil
   ------------------------------------------------------------ */
function initHeader() {
  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const nav    = document.getElementById('nav');

  const onScroll = function () {
    header.classList.toggle('is-stuck', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const cerrar = function () {
    nav.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  };

  burger.addEventListener('click', function () {
    const abierto = nav.classList.toggle('is-open');
    burger.classList.toggle('is-open', abierto);
    burger.setAttribute('aria-expanded', String(abierto));
    document.body.classList.toggle('nav-open', abierto);
  });

  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', cerrar);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') cerrar();
  });

  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && !burger.contains(e.target)) cerrar();
  });
}

/* ------------------------------------------------------------
   4. Link activo segun la seccion visible
   ------------------------------------------------------------ */
function initNavActivo() {
  const links = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
  const secciones = links
    .map(function (l) { return document.querySelector(l.getAttribute('href')); })
    .filter(Boolean);

  if (!secciones.length) return;

  const obs = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (!e.isIntersecting) return;
      links.forEach(function (l) {
        l.classList.toggle('is-active', l.getAttribute('href') === '#' + e.target.id);
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  secciones.forEach(function (s) { obs.observe(s); });
}

/* ------------------------------------------------------------
   5. Animaciones al hacer scroll
   ------------------------------------------------------------ */
function initReveal() {
  const elementos = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    elementos.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  const obs = new IntersectionObserver(function (entradas, observer) {
    entradas.forEach(function (e, i) {
      if (!e.isIntersecting) return;
      setTimeout(function () { e.target.classList.add('is-visible'); }, i * 90);
      observer.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  elementos.forEach(function (el) { obs.observe(el); });
}

/* ------------------------------------------------------------
   6. Contadores del hero
   ------------------------------------------------------------ */
function initContadores() {
  const nums = document.querySelectorAll('[data-count]');
  if (!nums.length) return;

  const animar = function (el) {
    const destino = parseInt(el.getAttribute('data-count'), 10);
    const duracion = 1600;
    const inicio = performance.now();

    const paso = function (ahora) {
      const p = Math.min((ahora - inicio) / duracion, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * destino).toLocaleString('es-CO');
      if (p < 1) requestAnimationFrame(paso);
      else el.textContent = destino.toLocaleString('es-CO') + (destino >= 100 ? '+' : '');
    };
    requestAnimationFrame(paso);
  };

  const obs = new IntersectionObserver(function (entradas, observer) {
    entradas.forEach(function (e) {
      if (!e.isIntersecting) return;
      animar(e.target);
      observer.unobserve(e.target);
    });
  }, { threshold: 0.5 });

  nums.forEach(function (n) { obs.observe(n); });
}

/* ------------------------------------------------------------
   7. Tabs de la tienda
   ------------------------------------------------------------ */
function initTabs() {
  const tabs = document.querySelectorAll('.tab');
  const paneles = document.querySelectorAll('.tab-panel');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const destino = tab.getAttribute('data-tab');

      tabs.forEach(function (t) { t.classList.toggle('is-active', t === tab); });

      paneles.forEach(function (p) {
        const activo = p.getAttribute('data-panel') === destino;
        p.classList.toggle('is-active', activo);
        if (activo) {
          p.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
        }
      });
    });
  });
}

/* ------------------------------------------------------------
   8. FAQ: abrir uno cierra los demas
   ------------------------------------------------------------ */
function initFaq() {
  const items = document.querySelectorAll('.faq details');
  items.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      items.forEach(function (otro) { if (otro !== item) otro.open = false; });
    });
  });
}

/* ------------------------------------------------------------
   Arranque
   ------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', function () {
  initWhatsApp();
  initDatos();
  initHeader();
  initNavActivo();
  initReveal();
  initContadores();
  initTabs();
  initFaq();
});
