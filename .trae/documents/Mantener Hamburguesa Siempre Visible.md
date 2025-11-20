## Objetivo
- El botón de hamburguesa debe estar siempre visible en el header en todas las resoluciones.
- Evitar que desaparezca por animaciones o reglas CSS.

## Cambios
- CSS: Mostrar `.menu-toggle` por defecto (no `display:none`). Ubicación: `assets/css/catalogo.css` en la regla `nav .menu-toggle`.
- JS: No ocultar `nav` con GSAP al iniciar. Reemplazar `gsap.set("nav", { y: -200, opacity: 0 })` por visible y eliminar el `gsap.to("nav", ...)` posterior. Ubicación: `assets/js/catalogo.js` dentro de `init()`.

## Verificación
- Revisar en escritorio y móvil que el botón esté siempre presente.
- Abrir/cerrar menú sin afectar la presencia del botón.