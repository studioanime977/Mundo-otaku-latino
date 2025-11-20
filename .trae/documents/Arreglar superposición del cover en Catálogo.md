## Diagnóstico
- El elemento `cover` tiene `z-index: 100` y ocupa toda la pantalla, por eso se dibuja por encima de los textos y el botón `Descubrir`.
- El `body` empieza con clase `no-js` que oculta `cover`, pero el script inline la elimina siempre (`catalogo.html:157`). Si GSAP no carga o tarda, `cover` queda visible y tapa el contenido.
- La animación inicial usa `gsap.to('.cover', ...)` para sacar el overlay; si GSAP falla, no se ejecuta y el overlay permanece.

## Cambios Propuestos
- CSS: bajar el nivel del overlay y evitar que intercepte clics.
  - En `assets/css/catalogo.css` (líneas ~700–708) cambiar `z-index: 100` por `z-index: 10` y añadir `pointer-events: none;` en `.cover`.
- HTML: evitar mostrar el overlay si GSAP no está listo.
  - Quitar el script inline que hace `document.body.classList.remove('no-js')` en `catalogo.html` (línea 157).
- JS: remover `no-js` solo cuando GSAP esté disponible e iniciar.
  - En `assets/js/catalogo.js`, dentro de `start()` antes de `init()`, añadir:
    - `if (window.gsap) { document.body.classList.remove('no-js') }`
  - Mantener la animación de `.cover` tal como está para que se deslice fuera; con el nuevo `z-index` ya no tapará el contenido visualmente ni los clics.
- Robustez extra (opcional): si `gsap` no existe, no llamar a `init()` en el `catch` para evitar errores repetidos; el `no-js` quedará y ocultará el overlay.

## Verificación
- Abrir `catalogo.html` y confirmar que los títulos y el botón `Descubrir` son visibles desde el inicio y clicables.
- Ver que el overlay se anima hacia fuera sin cubrir el contenido; comprobar en desktop y móviles (breakpoints existentes).
- Validar que, si GSAP no carga, el overlay permanece oculto y la página no se bloquea.
