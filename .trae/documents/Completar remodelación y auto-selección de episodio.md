## Objetivo
- Terminar la unificación del header y hero estilo catálogo en los overviews restantes.
- Agregar soporte `?ep=` para auto-seleccionar el episodio inicial en todas las páginas de temporada.

## Cambios propuestos
- Overviews ya actualizados: Attack on Titan, Boku no Hero, Bungou Stray Dogs, Chainsaw Man, Classroom of the Elite, Danmachi, Demon Slayer, Dragon Ball, Dragon Ball Heroes.
- Agregar snippet `URLSearchParams('ep')` en estas páginas para auto-clic del episodio:
  - Boku no Hero: `public/anime/boku-no-hero-academia/temporada-1.html` … `temporada-7.html`
  - Bungou Stray Dogs: `temporada-1.html` … `temporada-5.html`
  - Chainsaw Man: `season1.html`
  - Classroom of the Elite: `season1.html`, `temporada-2.html`
  - Danmachi: `season1.html`
  - Demon Slayer: `temporada-1.html` … `temporada-4.html`
  - Dragon Ball: `super.html`
  - Dragon Ball Heroes: `season.html`, `season2.html`

## Implementación del snippet
- Insertar, justo antes de `</body>`, el bloque:
```html
<script>
(function(){
  const p = new URLSearchParams(window.location.search)
  const ep = parseInt(p.get('ep'))
  if (Number.isFinite(ep) && ep >= 1) {
    const buttons = document.querySelectorAll('.episode-btn')
    const target = buttons[ep-1]
    if (target) target.click()
  }
})()
</script>
```
- Sin alterar la lógica existente; sólo dispara el episodio elegido si está en rango.

## Verificación
- Desde overview, hacer clic en SxEy debe abrir la temporada y cargar ese episodio.
- No debe haber desplazamiento horizontal; el header permanece igual al catálogo.

¿Procedo a aplicar estos cambios en las páginas listadas?