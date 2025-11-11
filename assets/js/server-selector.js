(() => {
  const langButtons = document.querySelectorAll('.lang-btn');
  const serverCards = document.querySelectorAll('.server-card');
  const frame = document.getElementById('player-frame');
  const frameWrap = document.querySelector('.player-frame-wrap');
  const PREF_NS = 'serverPrefV1';

  let currentLanguage = null; // No idioma seleccionado por defecto
  let placeholderEl = null;

  const isValidUrl = (u) => u && u !== '#' && u !== 'about:blank' && !/^https?:\/\/example\.com\//i.test(u);

  function showPlaceholder() {
    if (!frameWrap) return;
    if (placeholderEl) return;
    placeholderEl = document.createElement('div');
    placeholderEl.className = 'player-placeholder';
    placeholderEl.innerHTML = `
      <div class="placeholder-inner">
        <img src="../../../ico/suscribete.png" alt="Suscríbete" class="placeholder-icon" />
        <div class="placeholder-text">Selecciona idioma y servidor para reproducir. Mientras, apóyanos:</div>
        <a class="placeholder-cta" href="https://www.youtube.com/@STUDIOOTAKU1" target="_blank" rel="noopener">Suscríbete al canal</a>
      </div>
    `;
    frameWrap.appendChild(placeholderEl);
    if (frame) frame.src = 'about:blank';
  }

  function hidePlaceholder() {
    if (placeholderEl) {
      placeholderEl.remove();
      placeholderEl = null;
    }
  }

  function updateServerAvailabilityForLanguage(lang) {
    serverCards.forEach(card => {
      const primary = lang === 'lat' ? card.dataset.urlLat : card.dataset.urlSub;
      const fallback = lang === 'lat' ? card.dataset.fallbackLat : card.dataset.fallbackSub;
      const available = isValidUrl(primary) || isValidUrl(fallback);
      card.classList.toggle('disabled', !available);
      card.setAttribute('aria-disabled', String(!available));
    });
  }

  function findPreferredCardForLanguage(lang) {
    for (const card of serverCards) {
      const primary = lang === 'lat' ? card.dataset.urlLat : card.dataset.urlSub;
      const fallback = lang === 'lat' ? card.dataset.fallbackLat : card.dataset.fallbackSub;
      if (isValidUrl(primary) || isValidUrl(fallback)) return card;
    }
    return null;
  }

  function setActiveLanguage(lang) {
    currentLanguage = lang;
    langButtons.forEach(btn => {
      const isActive = btn.dataset.language === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
    });
    // Actualizar disponibilidad según idioma
    updateServerAvailabilityForLanguage(lang);
    // Cargar automáticamente el primer servidor válido para el idioma elegido
    const preferred = findPreferredCardForLanguage(lang);
    if (preferred) {
      loadServer(preferred);
    }
  }

  function getServerKey(card) {
    const label = (card.getAttribute('aria-label') || (card.querySelector('span') && card.querySelector('span').textContent) || 'server').toLowerCase().trim();
    return `${PREF_NS}:${label}:${currentLanguage}`;
  }

  function getPref(key) {
    try { return localStorage.getItem(key) || 'primary'; } catch (_) { return 'primary'; }
  }

  function setPref(key, value) {
    try { localStorage.setItem(key, value); } catch (_) {}
  }

  function loadServer(card) {
    const url = currentLanguage === 'lat' ? card.dataset.urlLat : card.dataset.urlSub;
    const fallback = currentLanguage === 'lat' ? card.dataset.fallbackLat : card.dataset.fallbackSub;
    if (!isValidUrl(url) && !isValidUrl(fallback)) return;

    const key = getServerKey(card);
    const pref = getPref(key); // 'primary' | 'fallback'
    let initial = pref === 'fallback' && isValidUrl(fallback) ? fallback : url;
    if (!isValidUrl(initial) && isValidUrl(fallback)) { initial = fallback; setPref(key, 'fallback'); }
    hidePlaceholder();
    frame.src = initial;
    serverCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    // Verifica primario, si falla, memoriza fallback para próximas cargas
    try {
      fetch(url, { mode: 'no-cors' })
        .then(() => setPref(key, 'primary'))
        .catch(() => { if (fallback) { frame.src = fallback; setPref(key, 'fallback'); } });
    } catch (_) {
      if (fallback) { frame.src = fallback; setPref(key, 'fallback'); }
    }
  }

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => setActiveLanguage(btn.dataset.language));
  });

  serverCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      // Requiere selección de idioma antes de cargar
      if (!currentLanguage) {
        // Quitar estados activos visuales iniciales si existen
        langButtons.forEach(btn => { btn.classList.remove('active'); btn.setAttribute('aria-selected', 'false'); });
        return;
      }
      // No permitir clic si no hay enlace disponible
      if (card.classList.contains('disabled') || card.getAttribute('aria-disabled') === 'true') {
        return;
      }
      loadServer(card);
    });
  });
  // Estado inicial: sin idioma/servidor activo y mostrar placeholder
  langButtons.forEach(btn => { btn.classList.remove('active'); btn.setAttribute('aria-selected', 'false'); });
  serverCards.forEach(c => c.classList.remove('active'));
  showPlaceholder();
  // Al inicio, todos los servidores sombreados hasta elegir idioma
  updateServerAvailabilityForLanguage(null);
})();