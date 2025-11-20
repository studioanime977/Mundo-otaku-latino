## Objetivo
- Hacer que las presentaciones (fondo del héroe) ocupen menos alto en móvil, similar a Crunchyroll.

## Cambios
- JS (`assets/js/catalogo.js` → `configureLayout`): reducir `heroHeight` en móviles:
  - ≤360: 42% del alto
  - ≤480: 48% del alto
  - ≤600: 52% del alto
- Mantener `offsetTop = heroHeight + margen` para que las tarjetas queden ordenadas debajo.

## Verificación
- En móvil el héroe se ve más compacto y centrado; `Descubrir` permanece visible; el carrusel se organiza debajo sin solaparse.