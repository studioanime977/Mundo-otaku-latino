## Objetivo
- Unificar las páginas generales de serie (archivo principal .html en cada carpeta) con el mismo header del catálogo, hero con overlay, selector de temporada, grilla de episodios con miniaturas y botón de descarga dinámico.
- Enlazar episodios a sus reproductores usando `season/temporada N.html?ep=X` y soportar `?ep` en todas las páginas de temporada (si aún falta).

## Qué series y archivos
- Boku no Hero: `public/anime/boku-no-hero-academia/boku-no-hero-academia.html` + `temporada-1..7.html`
- Bungou Stray Dogs: `public/anime/bungo-stray-dogs/bungo-stray-dogs.html` + `temporada-1..5.html`
- Chainsaw Man: `public/anime/chainsaw-man/chainsaw-man.html` + `season1.html`, `reze-arc.html`
- Classroom of the Elite: `public/anime/classroom-of-the-elite/classroom-of-the-elite.html` + `season1.html`, `temporada-2.html`
- Danmachi: `public/anime/danmachi/danmachi.html` + `season1.html`
- Demon Slayer: `public/anime/demon-slayer/demon-slayer.html` + `temporada-1..4.html` y películas/arcos (`tren-infinito.html`, `castillo-infinito.html`, `entrenamiento-pilar.html`, `rugido-de-victoria.html`)
- Dragon Ball: `public/anime/dragon-ball/dragon-ball.html` + `super.html`
- Dragon Ball Heroes: `public/anime/dragon-ball-heroes/dragon-ball-heroes.html` + `season.html`, `season2.html`

## Header y overlay
- Importar `assets/css/catalogo.css?v=2` y colocar el mismo `nav` del catálogo con `menu-toggle`.
- Añadir `margin-top: 64px` al hero para que el header no lo tape.
- Reutilizar el mismo script de menú (con `Escape` y sin cierre por clic fuera).

## Grilla de episodios y miniaturas
- Crear un objeto `seasons` por serie:
  - clave: `"1".."N"` o `"temporada-1"` según naming, más claves de película/arco cuando aplique.
  - propiedades: `count`, `url` (reproductor), `thumb` (imagen de la temporada/arco), `dl` (página de descargas correspondiente).
- Renderizar la grilla con `<img>` dentro de `.ep-thumb` y el título `SxEy` o nombre del arco.
- Botón descarga a la derecha del selector: cambiar `href` y texto al seleccionar.

## Enrutamiento y soporte `?ep`
- Donde aún no esté, añadir bloque corto al final de cada `season/temporadaN.html`:
  - Leer `URLSearchParams('ep')` y si es válido, llamar `loadEpisode(episodes[ep-1])`.
- Para películas/arcos, enlazar directo sin `?ep`.

## Miniaturas y descargas
- Miniaturas: usar imágenes existentes en `img/` por temporada (p. ej. `Attack on Titan S1.jpg`). Si alguna falta, dejo fallback a la imagen principal de la serie.
- Descargas: respetar naming por carpeta:
  - Boku/Bungou/Demon: `descargar-temporadaN.html`
  - Attack/Classroom/Danmachi/Heroes: `descargar-season*.html`
  - Chainsaw: `descargar-season1.html` y `descargar-reze-arc.html`
  - Dragon Ball: `descargar-super.html`

## Verificación
- Desktop/móvil: header visible, hero desplazado, sin scroll horizontal.
- Selector de temporada: la grilla cambia y el botón de descarga apunta a la página correcta.
- Episodio clicado: abre `season/temporadaN.html?ep=X` y el reproductor carga ese episodio.

¿Confirmo y aplico estos cambios en las 9 series indicadas?