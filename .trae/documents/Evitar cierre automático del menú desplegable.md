## Objetivo
- Mantener el menú desplegable abierto hasta que el usuario lo cierre explícitamente o seleccione un ítem.

## Cambios en JS
- Eliminar el cierre por clic fuera de `nav` en el listener global.
- Mantener cierre solo al tocar un ítem de menú y al presionar `Escape`.
- Ubicación: `assets/js/catalogo.js` bloque de navegación.

## Verificación
- Abrir el menú y no interactuar: permanece abierto incluso cuando cargan overlays/animaciones.
- Cerrar con el botón hamburguesa o al seleccionar un ítem del menú.
- `Escape` cierra el menú.

¿Aplico estos cambios ahora?