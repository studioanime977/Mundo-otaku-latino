## Problema
- En móvil los enlaces siguen mostrándose en una fila y producen desplazamiento horizontal.
- El panel no se comporta como dropdown vertical estático.

## Cambios propuestos
- CSS:
  - Unificar los estilos móviles para el contenedor `.nav-links` (reemplazar selectores `nav > div:last-child` por `nav .nav-links`).
  - En `@media (max-width: 600px)`, mostrar `.nav-links` como panel fijo debajo de la barra: `position: fixed; left: 0; right: 0; top: 56px; width: 100%`.
  - Forzar `flex-direction: column`, `align-items: stretch`, `overflow-y: auto`, `max-height: calc(100vh - 56px)`, y `display: block; width:100%` para cada enlace, evitando desplazamiento horizontal.
- JS:
  - Bloquear el scroll de la página al abrir el menú (`body.style.overflow = 'hidden'`) y restaurarlo al cerrar.

## Verificación
- En ≤600px el menú se despliega vertical, ocupa 100% de ancho, no genera scroll horizontal y se cierra correctamente al tocar fuera o un enlace.