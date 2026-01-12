(() => {
  // --- CONFIGURACIÓN ---
  const ENABLE_ADS = true;
  const BANNER_KEY = '5db2e541f4eeb65e0b1a7f8737d508e2';
  const NATIVE_SCRIPT = 'https://pl28456274.effectivegatecpm.com/8c45de82310a6956f5339c6a9b3f7c81/invoke.js';
  const NATIVE_CONTAINER_ID = 'container-8c45de82310a6956f5339c6a9b3f7c81';

  // --- SEGURIDAD: OCULTAR ANUNCIOS A BOTS (Googlebot, etc.) ---
  function cargarAdsSeguro() {
    const ua = navigator.userAgent.toLowerCase();
    const bots = /googlebot|bingbot|yandex|duckduckbot|slurp/i;
    return !bots.test(ua);
  }

  // --- CONTROL DE INYECCIÓN (NO REPETIR ANUNCIOS) ---
  let bannerInserted = false;
  let nativeInserted = false;

  // --- HELPER: CREAR BLOQUE DE 4 ANUNCIOS ---
  function create4AdBlock() {
    const container = document.createElement('div');
    // Flex-wrap activado para que en movil bajen si no caben
    container.style.cssText = 'margin: 25px auto; display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; width: 100%;';

    const adsCount = 4; // 4 Anuncios siempre

    for (let i = 0; i < adsCount; i++) {
      const iframe = document.createElement('iframe');
      iframe.style.width = '300px';
      iframe.style.height = '250px';
      iframe.style.border = 'none';
      iframe.style.overflow = 'hidden';
      iframe.scrolling = 'no';

      container.appendChild(iframe);

      // Renderizar ad en iframe con pequeño delay escalonado
      setTimeout(() => {
        const doc = iframe.contentWindow || iframe.contentDocument.document || iframe.contentDocument;
        doc.document.open();
        doc.document.write(`
            <html>
              <body style="margin:0;padding:0;display:flex;justify-content:center;align-items:center;background:transparent;">
                <script type="text/javascript">
                  atOptions = {
                    'key' : '${BANNER_KEY}',
                    'format' : 'iframe',
                    'height' : 250,
                    'width' : 300,
                    'params' : {}
                  };
                </script>
                <script type="text/javascript" src="https://www.highperformanceformat.com/${BANNER_KEY}/invoke.js"></script>
              </body>
            </html>
          `);
        doc.document.close();
      }, 50 * (i + 1));
    }

    return container;
  }

  function insertBanner() {
    if (!ENABLE_ADS || !cargarAdsSeguro() || bannerInserted) return;
    bannerInserted = true;

    // Crear contenedor del banner (Legacy single banner)
    const container = document.createElement('div');
    container.className = 'ad-banner-300';
    container.style.cssText = 'margin:20px auto;text-align:center;max-width:300px;';

    const configScript = document.createElement('script');
    configScript.textContent = `
      atOptions = {
        'key' : '${BANNER_KEY}',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    `;

    const invokeScript = document.createElement('script');
    invokeScript.src = `https://www.highperformanceformat.com/${BANNER_KEY}/invoke.js`;

    container.appendChild(configScript);
    container.appendChild(invokeScript);
    document.body.appendChild(container);

    console.log('✅ Banner ad inserted');
  }

  function insertNative() {
    if (!ENABLE_ADS || !cargarAdsSeguro() || nativeInserted) return;
    nativeInserted = true;

    const container = document.createElement('div');
    container.className = 'ad-native';
    container.style.cssText = 'margin:25px auto;max-width:100%;';

    const adContainer = document.createElement('div');
    adContainer.id = NATIVE_CONTAINER_ID;

    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = NATIVE_SCRIPT;

    container.appendChild(adContainer);
    container.appendChild(script);
    document.body.appendChild(container);

    console.log('✅ Native ad inserted');
  }

  function insertMonetag() {
    if (!ENABLE_ADS || !cargarAdsSeguro()) return;

    console.log('💰 Inserting Monetag Ads...');

    // Vignette (Zone 10450191)
    try {
      (function (s) { s.dataset.zone = '10450191'; s.src = 'https://gizokraijaw.net/vignette.min.js' })(document.body.appendChild(document.createElement('script')));
      console.log('✅ Monetag Vignette inserted');
    } catch (e) { console.error('Monetag Vignette error:', e); }

    // Multi-Tag (Zone 10450196)
    try {
      (function (s) { s.dataset.zone = '10450196'; s.src = 'https://nap5k.com/tag.min.js' })(document.body.appendChild(document.createElement('script')));
      console.log('✅ Monetag Multi-Tag inserted');
    } catch (e) { console.error('Monetag Multi-Tag error:', e); }
  }

  // --- DÓNDE INSERTAR (NO HOME, NO LEGALES) ---
  function shouldRunAds() {
    const path = window.location.pathname.toLowerCase();
    const noAds = [
      'index.html',
      'catalogo.html',
      'politica-de-privacidad',
      'aviso-legal',
      'contacto',
      'sitemap.xml',
      'robots.txt'
    ];

    if (path === '/' || path.endsWith('/')) {
      if (path.length <= 1) return false;
    }

    const isRestricted = noAds.some(p => path.endsWith(p) || path.includes('/' + p));
    const shouldRun = !isRestricted;
    console.log('📍 Path:', path, '| Should run ads:', shouldRun);
    return shouldRun;
  }

  function insertAnimeAds() {
    console.log('⚔️ Inserting Anime Page Ads (Series Hero Page)...');

    const hero = document.querySelector('.series-hero');
    const seasonSwitch = document.querySelector('.season-switch');
    const episodesSection = document.getElementById('episodios');

    // 1. Despues del Hero
    if (hero) {
      hero.parentNode.insertBefore(create4AdBlock(), hero.nextSibling);
    }

    // 2. Despues del selector (Antes grid)
    if (seasonSwitch) {
      seasonSwitch.parentNode.insertBefore(create4AdBlock(), seasonSwitch.nextSibling);
    }

    // 3. Antes del footer (Despues de episodios)
    if (episodesSection) {
      episodesSection.parentNode.insertBefore(create4AdBlock(), episodesSection.nextSibling);
    }
  }

  // --- NUEVA FUNCIÓN: Anuncios para Paginas de Ver/Descargar (Temporada, Pelicula, Descargas) ---
  function insertWatchDownloadAds() {
    console.log('📺 Inserting Watch/Download Page Ads...');
    const main = document.querySelector('main.container') || document.querySelector('main');

    if (!main) {
      console.warn('⚠️ No <main> found for ads');
      return;
    }

    // 1. TOP: Al inicio del Main (Antes del titulo o "heart")
    // Prepend agrega al inicio del contenedor
    main.prepend(create4AdBlock());

    // 2. BOTTOM: Al final del Main (Antes del footer)
    // Append agrega al final del contenedor
    main.append(create4AdBlock());
  }


  // --- MANEJO DE GRID DE EPISODIOS (Intercalar anuncios) ---
  function monitorEpisodesGrid() {
    const grid = document.getElementById('episodes-grid');
    if (!grid) return;

    const injectInterleavedAds = () => {
      if (grid.dataset.processing === 'true') return;

      const cards = Array.from(grid.querySelectorAll('.ep-card'));
      const episodeCards = cards.filter(c => !c.classList.contains('ad-generated'));

      if (episodeCards.length === 0) return;

      grid.dataset.processing = 'true';
      grid.innerHTML = '';

      episodeCards.forEach((card, index) => {
        grid.appendChild(card);

        // Insertar fila de 4 anuncios cada 4 episodios
        if ((index + 1) % 4 === 0 && index !== episodeCards.length - 1) {
          const adContainer = create4AdBlock(); // Usamos el helper
          adContainer.classList.add('ad-generated');

          grid.appendChild(adContainer);
        }
      });

      setTimeout(() => {
        grid.dataset.processing = 'false';
      }, 100);
    };

    const observer = new MutationObserver((mutations) => {
      if (grid.dataset.processing === 'true') return;
      const hasNewEpisodes = Array.from(grid.querySelectorAll('.ep-card')).some(c => !c.parentNode.classList.contains('ad-generated'));
      if (hasNewEpisodes) {
        injectInterleavedAds();
      }
    });

    observer.observe(grid, { childList: true });
    injectInterleavedAds();
  }

  // --- INSERCIÓN AUTOMÁTICA ---
  function initAds() {
    console.log('🎯 Initializing ads...');
    if (!shouldRunAds()) {
      console.log('❌ Ads disabled for this page');
      return;
    }

    // Logica de Enrutamiento de Anuncios
    const path = window.location.pathname.toLowerCase();
    const isAnimeSeriesPage = document.querySelector('.series-hero');
    // Detectar paginas de ver temporada, pelicula, o descargas por URL
    // AÑADIDO: Si la ruta tiene '/anime/' y no es series-hero, asumimos que es reproductor/descarga
    // Esto cubre casos como 'super.html' que no dicen 'season' explicitamente
    const isWatchOrDownloadPage = /(season|temporada|movie|descargar)/i.test(path) || path.includes('/anime/');

    if (isAnimeSeriesPage) {
      // Pagina Principal de Serie (con Hero)
      insertAnimeAds();
      monitorEpisodesGrid();
      insertMonetag();
    } else if (isWatchOrDownloadPage) {
      // Paginas de Ver Temporada, Ver Pelicula, o Descargar
      insertWatchDownloadAds();
      insertMonetag();
    } else {
      // Otras paginas genericas (Home y paginas raices si habilitadas)
      insertBanner();
      insertNative();
      insertMonetag();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAds);
  } else {
    initAds();
  }
})();