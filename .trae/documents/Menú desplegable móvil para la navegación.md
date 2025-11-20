## Cambios propuestos
- HTML: añadir botón `menu-toggle` dentro del `nav` y marcar el contenedor de enlaces como `nav-links`.
- CSS: ocultar enlaces en móvil y mostrarlos como dropdown cuando `nav` tenga clase `open`; posicionar el panel bajo la barra.
- JS: añadir manejador al botón para alternar la clase `open` y cerrar al tocar fuera.

## Archivos
- `public/html/catalogo.html`
- `assets/css/catalogo.css`
- `assets/js/catalogo.js`

## Verificación
- En móvil (≤600px), ver el icono hamburguesa; al tocarlo, se despliega el menú con “Inicio, Temporadas, Películas, Series, Ofertas, Contacto”.
- Al tocar fuera o un enlace, el menú se cierra.
- En escritorio, la navegación se mantiene como estaba.