# Guía rápida: aplicar toggle de episodios y placeholder de suscripción

## Objetivo
- Mostrar el mensaje inicial en el reproductor: "Selecciona idioma y servidor… Suscríbete al canal".
- Convertir el enlace "lista de episodios" en un botón que despliega/oculta el bloque de episodios con scroll suave.

## Uso del script (recomendado)
- Requisito: Python 3 instalado en Windows.
- Comando ejemplo:
  - `python scripts/update_anime_layout.py public/anime/demon-slayer/temporada-2.html`
  - `python scripts/update_anime_layout.py public/anime/demon-slayer/temporada-3.html --dry-run`

### Qué hace el script
- Sustituye el enlace de navegación por un botón `id="toggle-episodes"`.
- Asegura que el contenedor tenga `id="episodes-container"` y se muestre oculto por defecto (`hidden`).
- Elimina la auto-carga del primer episodio y los auto-clicks de idioma/servidor.
- Inyecta el bloque JS del toggle si no existe.
- Añade la carga de `assets/js/server-selector.js` si falta.
- Crea un respaldo `.bak` del archivo antes de escribir cambios.

## Snippets para aplicación manual

### Botón en navegación
Reemplaza el enlace "lista de episodios" por:

```html
<button id="toggle-episodes" class="nav-btn" aria-expanded="false"
  style="padding:10px 16px; border-radius:8px; background:#6c63ff; color:#fff; border:none; justify-self:center;">
  lista de episodios
</button>
```

### Contenedor de episodios
Asegura que el bloque tenga:

```html
<div class="episodes-container" id="episodes-container" hidden>
  <!-- ... episodios ... -->
</div>
```

### Script de toggle y scroll suave
Inserta cerca del final del `<script>` de la página:

```js
// Toggle de lista de episodios con scroll suave
const toggleBtn = document.getElementById('toggle-episodes');
const episodesBox = document.getElementById('episodes-container');
if (toggleBtn && episodesBox) {
  toggleBtn.addEventListener('click', () => {
    const isHidden = episodesBox.hasAttribute('hidden');
    if (isHidden) {
      episodesBox.removeAttribute('hidden');
      toggleBtn.setAttribute('aria-expanded', 'true');
      episodesBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      episodesBox.setAttribute('hidden', '');
      toggleBtn.setAttribute('aria-expanded', 'false');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}
```

### Evitar auto-reproducción
- Elimina cualquier `loadEpisode(episodes[0]);`.
- Quita los auto-clicks del idioma/servidor dentro de `loadEpisode`.

### Placeholder del reproductor
- Verifica que se cargue `assets/js/server-selector.js`:

```html
<script src="../../../assets/js/server-selector.js"></script>
```

## Validación visual
- Abre la página en vista previa y confirma:
  - El reproductor inicia con el mensaje y CTA de suscripción.
  - Al elegir idioma/servidor, se oculta el placeholder y se carga el video.
  - El botón "lista de episodios" despliega/oculta el bloque con scroll suave.