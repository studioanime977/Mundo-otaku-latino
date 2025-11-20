## Opciones de legibilidad
- Contorno negro del texto: `-webkit-text-stroke` para navegadores WebKit y un conjunto de `text-shadow` que simula borde en todos.
- Sombra reforzada en títulos y descripción para contraste sobre fondos claros.
- Fondo oscuro sutil detrás del bloque de detalles con un `::before` gradiente, sin interferir con los clics.

## Cambios Propuestos (aplicar ahora)
- En `assets/css/catalogo.css`:
  - A `.details .title-1, .details .title-2`: añadir `-webkit-text-stroke: 1.2px rgba(0,0,0,0.85)` y `text-shadow` múltiple para borde visible.
  - A `.details > .desc` y `.details .place-box .text`: añadir `text-shadow` suave para lectura.
  - Añadir `.details::before` como overlay con gradiente oscuro lateral: `position:absolute`, `pointer-events:none`, `z-index:-1`, cubriendo el área de texto.

## Verificación
- Recargar `catalogo.html` y comprobar que el título blanco y la descripción se leen bien sobre cualquier imagen.
- Confirmar que el botón `Descubrir` sigue operativo y los clics no se bloquean por el overlay.
- Revisar en móvil y desktop.