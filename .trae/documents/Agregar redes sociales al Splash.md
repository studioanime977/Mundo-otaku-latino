## Objetivo
- Incluir los enlaces de redes sociales en `index.html` dentro de la pantalla de bienvenida.
- Mostrar el título “Mundo Otaku Latino | StudioOtaku”.

## Cambios
- Añadir un bloque de footer compacto dentro del contenedor `.scene` con los enlaces proporcionados y un título.
- Estilos mínimos para una grilla responsive, con scroll interno si excede el alto.
  - `.footer-splash` con `max-height` y `overflow-y: auto` para no romper el layout.
  - `.social-links` grid y `.social-item` con fondo y borde coherentes al splash.

## Verificación
- Abrir `http://localhost:8000/` y ver la sección de redes dentro del splash.
- Probar los enlaces y confirmar que la redirección automática al catálogo sigue funcionando.

¿Aplico estos cambios ahora?