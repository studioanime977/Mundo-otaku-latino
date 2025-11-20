## Problema
- En móvil se siguen solapando elementos del héroe (CTA, texto) con la paginación/mini tarjetas.

## Cambios propuestos
- CSS: ocultar la paginación en móvil (`≤600px`) para evitar la superposición bajo el héroe.
- JS: mantener posiciones actuales del carrusel, sin tocar animaciones.
- Revisión visual: confirmar que héroe → mini tarjetas → catálogo quedan en orden vertical sin solapes.

## Verificación
- En ≤600px el CTA y el título quedan limpios; no aparece la barra de paginación ni flechas; el carrusel y el catálogo se muestran en orden.