## Objetivo
- Usar el mismo header que el catálogo en Attack on Titan.
- Alinear el botón de descarga exactamente al lado del selector (izquierda) en todas las series.
- Aplicar el mismo fondo/estética que Attack on Titan en las demás páginas.

## Cambios por Archivo
- Attack on Titan (`public/anime/attack-on-titan/attack-on-titan.html`):
  - Sustituir el `<header class="header">...</header>` por el `<nav>` del catálogo con `menu-toggle` y `nav-links`.
  - Importar `../../../assets/css/catalogo.css?v=2`.
  - Mantener `margin-top:64px` en `.series-hero` para que el header no lo tape.

- Overviews restantes (Boku no Hero, Bungou Stray Dogs, Chainsaw Man, Classroom, Danmachi, Demon Slayer, Dragon Ball, DB Heroes):
  - Asegurar bloque CSS consistente para el selector:
    - `.season-switch{display:flex;gap:12px;align-items:center;flex-wrap:wrap;position:relative;z-index:5}`
    - `.download-btn{display:inline-flex;align-items:center;padding:8px 12px;border-radius:8px;background:#27ae60;color:#fff;text-decoration:none;font-weight:700}`
  - Forzar el botón inmediatamente después del `<select>` en el HTML (ya insertado) sin `margin-left:auto` para mantenerlo junto al selector.
  - Aplicar fondo y estética homogénea:
    - `.series-hero .hero-content{position:relative;z-index:1;max-width:1100px;margin:0 auto;padding:4rem 1rem;display:grid;gap:12px}`
    - `.episodes-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}`
    - `body{background:#121314}` o el gradiente utilizado en Attack on Titan (según prefieras, lo pondré en todas).

## Verificación
- En cada overview, el botón aparece pegado al selector y responde al cambio de temporada.
- El header es el mismo del catálogo y el hero queda debajo sin taparse.
- La grilla muestra 4 tarjetas en desktop, 2 en móvil, con el mismo fondo/estética.

¿Aplico estos cambios ahora para unificar por completo el header, el botón y el fondo?