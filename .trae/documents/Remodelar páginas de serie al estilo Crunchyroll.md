## Objetivo
- Remodelar la página overview de Attack on Titan para soportar múltiples temporadas (S1–S4) al estilo Crunchyroll.
- Generar grilla de episodios por temporada con enlaces a su reproductor: `seasonN.html?ep=X`.
- Hacer que todas las páginas de temporada (S1–S4) acepten `?ep=` y carguen el episodio inicial.

## Cambios
- `public/anime/attack-on-titan/attack-on-titan.html`:
  - Hero con fondo, título, badges, y botón “Comenzar a ver S1 E1”.
  - Selector de temporada y grilla de episodios dinámica.
  - Footer consistente.
- `public/anime/attack-on-titan/season1.html`, `season2.html`, `season3.html`, `season4.html`:
  - Leer `URLSearchParams` y llamar `loadEpisode` para el `ep` indicado.

## Verificación
- Seleccionar una temporada en overview: la grilla refleja cantidad correcta.
- Hacer clic en un episodio: abre la temporada y carga el episodio correspondiente.
- Footer presente y sin desplazamiento horizontal.

Tras esto, puedo replicar la misma estructura a otros animes por lotes.