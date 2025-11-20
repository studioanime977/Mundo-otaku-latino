## Diagnóstico
- Aunque `html` y `body` ya tienen `overflow-x: hidden`, algunos elementos animados y posicionados absolutamente (`#demo` y `.card`, `.cover`) pueden expandirse fuera del viewport y reintroducir desplazamiento lateral.
- El panel móvil del menú (`nav.open .nav-links`) puede producir ancho extra si su contenido desborda.

## Objetivo
- Bloquear cualquier desbordamiento horizontal en todas las vistas, especialmente móvil.

## Cambios en CSS
- Añadir `overflow: hidden` a `#demo` para encapsular tarjetas y capas animadas.
- Añadir `overflow-x: hidden` a `nav.open .nav-links` para prevenir desbordes durante el menú abierto.
- Añadir `overscroll-behavior-x: none` a `body` para evitar overscroll lateral.

## Ubicaciones
- `assets/css/catalogo.css`:
  - En el bloque `#demo` agregar `overflow: hidden;`.
  - En el bloque `@media (max-width: 600px) nav.open .nav-links` agregar `overflow-x: hidden;`.
  - En `body` agregar `overscroll-behavior-x: none;`.

## Verificación
- Abrir `http://localhost:8000/public/html/catalogo.html` en móvil/inspector.
- Comprobar que no existe barra ni gesto de desplazamiento horizontal.
- Abrir/cerrar menú: sin desplazamiento lateral.

¿Aplico estos cambios ahora?