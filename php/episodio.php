<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Reproductor — Episodio (Plantilla)</title>
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
  <header class="site-header">
    <div class="container header-inner">
      <div class="logo" onclick="location.href='index.html'">Tu<span>Anime</span></div>
      <nav class="main-nav">
        <a href="index.html">Inicio</a>
        <a href="#genres">Géneros</a>
      </nav>
      <div class="actions">
        <button id="darkToggle3" aria-label="Cambiar modo">🌙</button>
      </div>
    </div>
  </header>

  <main class="container">
    <nav class="breadcrumbs" id="breadcrumbs">
      <a href="index.html">Inicio</a> › <a href="anime.html">Días de Sakamoto</a> › <span id="epTitle">Capítulo 1</span>
    </nav>

    <section class="player-section">
      <h1 id="pageTitle">Días de Sakamoto — Capítulo 22</h1>
      <p class="meta-line">TV · Audio: Latino · Estreno: Sept 23, 2025 · <span id="views">34</span> vistas</p>

      <div class="player-wrapper" id="playerWrapper">
        <div class="player-toolbar">
          <label for="serverSelect">Elige un servidor:</label>
          <select id="serverSelect" aria-label="Seleccionar servidor"></select>

          <div class="player-controls">
            <button id="lightsOffBtn" title="Apagar luces">💡</button>
            <button id="prevBtn" title="Anterior">⟨ Ant.</button>
            <button id="listBtn" title="Todos los episodios">Lista</button>
            <button id="nextBtn" title="Siguiente">Sig. ⟩</button>
            <button id="expandBtn" title="Pantalla completa">⤢</button>
          </div>
        </div>

        <div class="video-area">
          <iframe id="playerFrame" src="about:blank" frameborder="0" allowfullscreen sandbox="allow-same-origin allow-scripts allow-forms allow-presentation"></iframe>
        </div>

      </div>

      <article class="sinopsis-ep">
        <h3>Sinopsis</h3>
        <p id="description">Kanaguri es testigo de los logros de Akira, pero su cámara acaba destrozada al caer al océano, para su consternación. (texto de ejemplo)</p>
      </article>

      <section class="comments" id="commentsSection">
        <h3>Comentarios</h3>
        <form id="commentForm">
          <input id="cname" placeholder="Nombre" required>
          <textarea id="cmsg" placeholder="Tu comentario" required></textarea>
          <button type="submit">Publicar</button>
        </form>
        <ul id="commentList"></ul>
      </section>

    </section>

  </main>

  <div id="lightsOverlay" class="lights-overlay" hidden></div>

  <footer class="site-footer">
    <div class="container">
      <div class="footer-inner">
        <div>© <span id="year3"></span> TuAnime — Demo.</div>
      </div>
    </div>
  </footer>

  <script src="assets/js/player.js" defer></script>
  <script src="assets/js/main.js" defer></script>
</body>
</html>