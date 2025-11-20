## Causa
- Elevamos `z-index` del catálogo, y `.details` en móvil está posicionado con `bottom`, lo que puede sacarlo del área del héroe y quedar tapado por la sección de catálogo.

## Solución
- Volver a `z-index: 1` del catálogo.
- En móvil (≤600px, ≤480px, ≤360px), posicionar `.details` con `top` dentro del área del héroe (no con `bottom`) para que el CTA quede visible.

## Verificación
- El botón `Descubrir` se muestra dentro del héroe en móvil, sin quedar detrás del catálogo; el resto del layout mantiene el orden vertical.