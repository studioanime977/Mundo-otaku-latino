## Diagnóstico
- Los textos del héroe (`#details-even/#details-odd`) están detrás de la tarjeta activa del carrusel: en JS se fija `zIndex: 15` para `details`, mientras `card` usa `z-index: 20`. Por eso no se ve el nombre ni el botón.
- El CSS de `.card` tiene `pointer-events: none`, así que el problema es visual (orden de capas), no de clic.

## Cambios Propuestos
- JS: subir el `zIndex` de `details` por encima de las tarjetas.
  - En `assets/js/catalogo.js`:
    - En `init()`: cambiar `gsap.set(detailsActive, { opacity: 0, zIndex: 15, x: -200 })` por `zIndex: 80`, y `gsap.set(detailsInactive, { opacity: 0, zIndex: 12 })` por `zIndex: 70`.
    - En `step()`: cambiar `gsap.set(detailsActive, { zIndex: 15 })` por `zIndex: 80`, y `gsap.set(detailsInactive, { zIndex: 12 })` por `zIndex: 70`.
- (Opcional) CSS: subir `z-index` base de `.details` para coherencia, aunque JS seguirá mandando.

## Verificación
- Abrir `catalogo.html` y confirmar que el título del anime activo y el botón `Descubrir` son visibles encima del fondo y de las tarjetas.
- Comprobar que el botón es clicable y navega al `href` del anime activo.
- Revisar en desktop y móvil que el texto del héroe se mantiene por encima del carrusel.