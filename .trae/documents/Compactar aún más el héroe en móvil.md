## Objetivo
- Reducir más la altura del fondo de presentación en móvil para que se vea como en el ejemplo (más compacto).

## Cambios
- JS (`assets/js/catalogo.js` → `configureLayout`): bajar `heroHeight` por breakpoint.
  - ≤360px: 36% del alto
  - ≤480px: 42% del alto
  - ≤600px: 46% del alto
- Mantener `offsetTop = heroHeight + margen` para que el carrusel quede debajo ordenado.

## Verificación
- En móvil el héroe se ve más pequeño; el botón `Descubrir` y textos permanecen visibles; las mini tarjetas están ordenadas debajo sin solaparse.