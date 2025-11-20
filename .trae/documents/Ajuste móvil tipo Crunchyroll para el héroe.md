## Cambios propuestos (móvil)
- Reposicionar el bloque del héroe cerca del borde inferior (como la captura): `bottom` fijo, sin `translateY(-50%)`.
- CTA `Descubrir` a ancho completo, con icono de “play” a la izquierda y sombra.
- Overlay gradiente detrás del texto más intenso en móvil para contrastar sobre el fondo.
- Botón de marcador junto al CTA con estilo compacto.
- Mantener el carrusel y paginación existentes sin romper la animación.

## Archivos a modificar
- `assets/css/catalogo.css` en los breakpoints `@media (max-width: 600px)`, `@media (max-width: 480px)` y `@media (max-width: 360px)`.

## Verificación
- Recargar en el teléfono: ver héroe con texto al fondo, CTA grande con icono y buena legibilidad.
- Confirmar que los clics funcionan y la paginación no se superpone.