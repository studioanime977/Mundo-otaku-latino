(() => {
  const langButtons = document.querySelectorAll('.lang-btn');
  const serverCards = document.querySelectorAll('.server-card');
  const frame = document.getElementById('player-frame');
  const PREF_NS = 'serverPrefV1';

  let currentLanguage = 'lat';

  function setActiveLanguage(lang) {
    currentLanguage = lang;
    langButtons.forEach(btn => {
      const isActive = btn.dataset.language === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
    });
    const activeCard = document.querySelector('.server-card.active') || serverCards[0];
    if (activeCard) loadServer(activeCard);
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
    if (!url || url === '#' || url === 'about:blank') return;

    const key = getServerKey(card);
    const pref = getPref(key); // 'primary' | 'fallback'
    const initial = pref === 'fallback' && fallback ? fallback : url;
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
      loadServer(card);
    });
  });

  setActiveLanguage('lat');
})();