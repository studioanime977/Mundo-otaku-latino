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

  function insertBanner() {
    if (!ENABLE_ADS || !cargarAdsSeguro() || bannerInserted) return;
    bannerInserted = true;

    // Crear contenedor del banner
    const container = document.createElement('div');
    container.className = 'ad-banner-300';
    container.style.cssText = 'margin:20px auto;text-align:center;max-width:300px;';

    // Crear el script de configuración
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

    // Crear el script de invocación
    const invokeScript = document.createElement('script');
    invokeScript.src = `https://www.highperformanceformat.com/${BANNER_KEY}/invoke.js`;

    // Agregar al DOM
    container.appendChild(configScript);
    container.appendChild(invokeScript);
    document.body.appendChild(container);

    console.log('✅ Banner ad inserted');
  }

  function insertNative() {
    if (!ENABLE_ADS || !cargarAdsSeguro() || nativeInserted) return;
    nativeInserted = true;

    // Crear contenedor principal
    const container = document.createElement('div');
    container.className = 'ad-native';
    container.style.cssText = 'margin:25px auto;max-width:100%;';

    // Crear el div del contenedor del anuncio
    const adContainer = document.createElement('div');
    adContainer.id = NATIVE_CONTAINER_ID;

    // Crear el script
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = NATIVE_SCRIPT;

    // Agregar al DOM
    container.appendChild(adContainer);
    container.appendChild(script);
    document.body.appendChild(container);

    console.log('✅ Native ad inserted');
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

    const shouldRun = !noAds.some(p => path.endsWith(p) || path.includes(p));
    console.log('📍 Path:', path, '| Should run ads:', shouldRun);
    return shouldRun;
  }

  // --- INSERCIÓN AUTOMÁTICA (AL FINAL DEL BODY) ---
  function initAds() {
    console.log('🎯 Initializing ads...');
    if (!shouldRunAds()) {
      console.log('❌ Ads disabled for this page');
      return;
    }

    // Insertar anuncios
    insertBanner();
    insertNative();
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAds);
  } else {
    initAds();
  }
})();