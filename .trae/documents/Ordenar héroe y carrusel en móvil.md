## Qué haré
- Mover las miniaturas del carrusel por debajo del héroe en móvil para que no se monten con el título y CTA.
- Aumentar la altura de `#demo` para que incluya el héroe y el carrusel.

## Cambios
- JS (`assets/js/catalogo.js`):
  - En `configureLayout`, para ≤600/≤480/≤360, fijar `offsetTop = heroHeight + margen` en vez de porcentaje del viewport.
  - En `init`, establecer la altura de `#demo` como `Math.max(heroHeight, offsetTop + cardHeight + 30)`.

## Verificación
- En móvil, el título y el botón quedan en el héroe; las tarjetas se ven ordenadas debajo; la paginación aparece bajo las tarjetas y sin solaparse.