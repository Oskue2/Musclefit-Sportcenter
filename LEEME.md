# MuscleFit Sport Center — Sitio web

Sitio informativo de una sola página (one-page) en HTML, CSS y JavaScript puro.
No requiere instalación ni servidor: se abre haciendo doble clic en `index.html`.

## Estructura

```
MuscleFit Sport Center/
├── index.html          ← todo el contenido de la página
├── css/styles.css      ← estilos (colores, tipografías, responsive)
├── js/main.js          ← configuración + interacciones
├── images/
│   ├── Logo.jpg        ← logo (ya incluido)
│   ├── hero.jpg        ← (opcional) foto de fondo del inicio
│   ├── gimnasio.jpg    ← (opcional) foto de las instalaciones
│   ├── personalizado.jpg ← (opcional) foto de entrenamiento 1 a 1
│   ├── productos/      ← fotos de los productos de la tienda
│   └── entrenadores/   ← fotos del equipo
└── LEEME.md
```

## 1. Datos que debes cambiar (lo más importante)

Abre `js/main.js` y edita **solo** el bloque `CONFIG` del inicio:

```js
const CONFIG = {
  whatsapp: '573000000000',   // número real, sin +, sin espacios, con indicativo (57 = Colombia)
  telefono: '+57 300 000 0000',
  email:    'contacto@musclefit.com',
  direccion:'Calle 00 # 00-00, Barrio, Ciudad',
  redes: {
    instagram: 'https://instagram.com/tu_usuario',
    facebook:  'https://facebook.com/tu_pagina',
    tiktok:    'https://tiktok.com/@tu_usuario'
  },
  mapsUrl: ''   // déjalo vacío y se genera solo desde la dirección
};
```

Eso actualiza automáticamente: los **20+ botones de WhatsApp**, el teléfono, el correo,
la dirección en la sección de contacto y en el pie de página, los iconos de redes
sociales y el botón "Cómo llegar".

## 2. El mapa de Google

En `index.html`, busca el comentario `<!-- Reemplaza el valor de q= ... -->` y cambia
la dirección dentro del `src`:

```html
src="https://www.google.com/maps?q=Calle+10+%2345-67+Medellin&output=embed"
```

También puedes ir a Google Maps → buscar el gimnasio → **Compartir → Insertar un mapa**
→ copiar el `src` del iframe y pegarlo ahí.

## 3. Las fotos

Todas las imágenes son **opcionales**: si el archivo no existe, la página muestra un
marcador de posición elegante en lugar de romperse. Solo copia tus fotos con estos
nombres exactos y aparecerán solas:

| Archivo                              | Dónde se ve                      | Tamaño sugerido |
|--------------------------------------|----------------------------------|-----------------|
| `images/hero.jpg`                    | Fondo de la portada              | 1920 × 1080 px  |
| `images/gimnasio.jpg`                | Sección "Nosotros"               | 900 × 760 px    |
| `images/personalizado.jpg`           | Entrenamiento personalizado      | 900 × 760 px    |
| `images/productos/proteina.jpg`      | Tienda → Suplementos             | 600 × 600 px    |
| `images/productos/creatina.jpg`      | Tienda → Suplementos             | 600 × 600 px    |
| `images/productos/preentreno.jpg`    | Tienda → Suplementos             | 600 × 600 px    |
| `images/productos/bcaa.jpg`          | Tienda → Suplementos             | 600 × 600 px    |
| `images/productos/camiseta.jpg`      | Tienda → Ropa                    | 600 × 600 px    |
| `images/productos/leggins.jpg`       | Tienda → Ropa                    | 600 × 600 px    |
| `images/productos/short.jpg`         | Tienda → Ropa                    | 600 × 600 px    |
| `images/productos/top.jpg`           | Tienda → Ropa                    | 600 × 600 px    |
| `images/productos/shaker.jpg`        | Tienda → Accesorios              | 600 × 600 px    |
| `images/productos/guantes.jpg`       | Tienda → Accesorios              | 600 × 600 px    |
| `images/productos/cinturon.jpg`      | Tienda → Accesorios              | 600 × 600 px    |
| `images/productos/straps.jpg`        | Tienda → Accesorios              | 600 × 600 px    |
| `images/entrenadores/coach1..4.jpg`  | Sección "Entrenadores"           | 600 × 720 px    |

## 4. Textos, precios y productos

Todo está en `index.html`, en secciones bien marcadas con comentarios:
`HERO`, `NOSOTROS`, `SERVICIOS`, `PLANES`, `TIENDA`, `ENTRENADORES`,
`TESTIMONIOS`, `UBICACION`, `FAQ`, `FOOTER`.

Para **agregar un producto**, copia un bloque `<article class="product">` completo y
cambia el nombre, la descripción, el precio y el texto de `data-wa`.

## 5. Colores

Se controlan en las primeras líneas de `css/styles.css`:

```css
--cyan:        #22c5e8;   /* color principal, tomado del logo */
--cyan-bright: #6fe4ff;
--bg:          #08090b;   /* fondo */
```

## 6. Publicar el sitio

Cualquiera de estas opciones sirve y son gratuitas:

- **Netlify Drop** (`app.netlify.com/drop`): arrastra la carpeta completa. Listo en segundos.
- **Vercel** o **GitHub Pages**: sube la carpeta a un repositorio y conéctalo.
- **Hosting propio**: sube todos los archivos por FTP a la raíz (`public_html`).
