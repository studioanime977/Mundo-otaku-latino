## Objetivo
- Replicar exactamente el aspecto de Attack on Titan en los demás overviews: mismo CSS y grilla de 4 tarjetas por fila en desktop.

## Cambios
- Insertar un bloque CSS de override en cada overview para homogeneizar:
```css
.series-hero .hero-content{position:relative;z-index:1;max-width:1100px;margin:0 auto;padding:4rem 1rem;display:grid;gap:12px}
.episodes-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.season-switch{display:flex;gap:12px;align-items:center;flex-wrap:wrap}
.download-btn{display:inline-flex;align-items:center}
```
- Archivos a actualizar: boku-no-hero-academia.html, bungo-stray-dogs.html, chainsaw-man.html, classroom-of-the-elite.html, danmachi.html, demon-slayer.html, dragon-ball.html, dragon-ball-heroes.html.

## Verificación
- En desktop, los episodios se muestran en 4 columnas; en móvil se mantienen 2 columnas por media query existente.
- El botón de descarga aparece junto al selector como en Attack on Titan.

¿Aplico estos overrides en todos los overviews listados?