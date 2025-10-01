<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Días de Sakamoto — TuAnime (Plantilla)</title>
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
  <header class="site-header">
    <div class="container header-inner">
      <div class="logo" onclick="location.href='index.html'">Tu<span>Anime</span></div>
      <nav class="main-nav">
        <a href="index.html">Inicio</a>
        <a href="#genres">Géneros</a>
        <a href="javascript:surprise()">¡Sorpréndeme!</a>
      </nav>
      <div class="actions">
        <button id="darkToggle2" aria-label="Cambiar modo">🌙</button>
      </div>
    </div>
  </header>

  <main class="container">
    <nav class="breadcrumbs"><a href="index.html">Inicio</a> › <span>Días de Sakamoto</span></nav>

    <article class="serie-detail">
      <div class="poster">
        <img src="https://picsum.photos/seed/sakamoto/600/800" alt="Días de Sakamoto">
      </div>
      <div class="meta">
        <h1>Días de Sakamoto</h1>
        <p class="meta-line"><strong>Tipo:</strong> TV · <strong>Estado:</strong> En emisión · <strong>Géneros:</strong> Comedia, Escolar</p>
        <p class="sinopsis">Sinopsis corta: Akira Sakamoto es un estudiante que destaca por su estilo perfecto y travesuras cómicas... (texto de ejemplo)</p>

        <h3>Episodios</h3>
        <ul class="episodes" id="episodeList">
          <!-- Episodios generados por JS -->
        </ul>

      </div>
    </article>

  </main>

  <footer class="site-footer">
    <div class="container">
      <div class="footer-inner">
        <div>© <span id="year2"></span> TuAnime — Demo.</div>
      </div>
    </div>
  </footer>

  <script src="assets/js/main.js" defer></script>
</body>
</html>