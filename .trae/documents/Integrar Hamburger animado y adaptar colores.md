## Enfoque
- Mantener el dropdown móvil ya implementado y sustituir el botón por un hamburger con tres barras animadas, inspirado en tu CSS.
- Usar colores del tema (texto blanco y acento naranja) para que combine con la página.

## Cambios
- HTML (`public/html/catalogo.html`): reemplazar el contenido del `button.menu-toggle` por tres barras internas.
- CSS (`assets/css/catalogo.css`): añadir estilos de las barras y las transformaciones al estado `nav.open` para animar de hamburguesa → X; mostrar el botón solo en móvil.
- JS (ya existente): reutilizar el `nav.open` al tocar el botón y cerrar al tocar fuera.

## Verificación
- En ≤600px: ver el botón; al tocar se anima a X y muestra el menú; al tocar fuera se cierra y vuelve a hamburguesa.
- Colores: barras en `var(--text-primary)`, hover/acento con `var(--crunchyroll-orange)`.