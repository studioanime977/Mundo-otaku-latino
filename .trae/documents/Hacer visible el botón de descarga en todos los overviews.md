## Objetivo
- Asegurar que el botón “Descargar Temporada/Película” se muestre al lado del selector en todas las series, como ya ocurre en Attack on Titan.

## Cambios
- Añadir un pequeño bloque CSS consistente en cada overview para el contenedor del selector:
```css
.season-switch{display:flex;gap:12px;align-items:center;flex-wrap:wrap}
.download-btn{display:inline-flex;align-items:center}
```
- Insertar el bloque justo antes de `</head>` en:
  - boku-no-hero-academia.html
  - bungo-stray-dogs.html
  - chainsaw-man.html
  - classroom-of-the-elite.html
  - danmachi.html
  - demon-slayer.html
  - dragon-ball.html
  - dragon-ball-heroes.html
- Opcional: aplicar también en attack-on-titan.html para uniformidad.

## Verificación
- Abrir cada overview y confirmar que el botón aparece junto al `<select>` y actualiza su `href` y texto al cambiar la temporada/arco.

¿Aplico estos cambios ahora?