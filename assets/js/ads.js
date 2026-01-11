(() => {
  // --- CONFIGURACIÓN ---
  const ENABLE_ADS = true;
  const MAX_BANNER_PER_PAGE = 1;
  const MAX_NATIVE_PER_PAGE = 1;
  const BANNER_KEY = '5db2e541f4eeb65e0b1a7f8737d508e2';
  const NATIVE_SCRIPT = 'https://pl28456274.effectivegatecpm.com/8c45de82310a6956f5339c6a9b3f7c81/invoke.js';
  const NATIVE_CONTAINER_ID = 'contenedor-8c45de82310a6956f5339c6a9b3f7c81';

  // --- SEGURIDAD: OCULTAR ANUNCIOS A BOTS (Googlebot, etc.) ---
  function cargarAdsSeguro() {
    const ua = navigator.userAgent.toLowerCase();
    const bots = /googlebot|bingbot|yandex|duckduckbot|slurp/i;
    return !bots.test(ua);
  }

  // --- CONTROL DE INYECCIÓN (NO REPETIR ANUNCIOS) ---
  let bannerInserted = false;
  let nativeInserted = false;

  function insertBanner() {
    if (!ENABLE_ADS || !cargarAdsSeguro() || bannerInserted) return;
    bannerInserted = true;
    const div = document.createElement('div');
    div.className = 'ad-banner-300';
    div.style.cssText = 'margin:20px auto;text-align:center;';
    div.innerHTML = `
      <script>
        atOptions = {
          'key' : '${BANNER_KEY}',
          'format' : 'iframe',
          'height' : 250,
          'width' : 300,
          'params' : {}
        };
        document.write('<scr' + 'ipt src="https://www.highperformanceformat.com/${BANNER_KEY}/invoke.js"></scr' + 'ipt>');
      </script>`;
    document.body.appendChild(div);
  }

  function insertNative() {
    if (!ENABLE_ADS || !cargarAdsSeguro() || nativeInserted) return;
    nativeInserted = true;
    const div = document.createElement('div');
    div.className = 'ad-native';
    div.style.cssText = 'margin:25px 0;';
    div.innerHTML = `
      <script>
        (function() {
          var s = document.createElement("script");
          s.async = true;
          s.setAttribute("data-cfasync", "false");
          s.src = "${NATIVE_SCRIPT}";
          document.currentScript.parentNode.appendChild(s);
        })();
      </script>
      <div id="${NATIVE_CONTAINER_ID}"></div>`;
    document.body.appendChild(div);
  }

  // --- DÓNDE INSERTAR (NO HOME, NO LEGALES) ---
  function shouldRunAds() {
    const path = window.location.pathname.toLowerCase();
    const noAds = [
      '/',
      '/index.html',
      '/politica-de-privacidad',
      '/aviso-legal',
      '/contacto',
      '/sitemap.xml',
      '/robots.txt'
    ];
    return !noAds.some(p => path.endsWith(p) || path.includes(p));
  }

  // --- INSERCIÓN AUTOMÁTICA (AL FINAL DEL BODY) ---
  function initAds() {
    if (!shouldRunAds()) return;
    // Insertar solo una vez cada tipo
    insertBanner();
    insertNative();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAds);
  } else {
    initAds();
  }
})();