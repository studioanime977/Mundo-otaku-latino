## Objetivo
- Hacer que el botón "Inicio" del header en el catálogo siempre apunte a `index.html` (pantalla de bienvenida).

## Cambios
- Convertir el ítem "Inicio" del menú en `public/html/catalogo.html` a un `<a href="../../index.html">`.
- Ajustar `assets/css/catalogo.css` para aplicar el mismo estilo a `<a>` que ya tienen los `<div>` del menú:
  - Desktop: `nav > div:last-child > a` y sus estados `.active` y `:hover`.
  - Móvil: `nav.open .nav-links > a`.

## Verificación
- Abrir el catálogo y pulsar "Inicio": navega a `http://localhost:8000/`.
- El estilo del ítem "Inicio" se mantiene igual en desktop y móvil.

¿Aplico estos cambios ahora?