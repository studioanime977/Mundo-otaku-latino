(() => {
  const SHOULD_PROTECT = typeof window !== 'undefined' && typeof window.location !== 'undefined' && (/\/public\/anime\//i.test(window.location.pathname) || /\/public\/html\/catalogo\.html$/i.test(window.location.pathname));
  const PASSWORD = 'Cs3437532922';
  const STORAGE_KEY = 'mol_auth_ok';
  let modalOpen = false;

  function deny() {
    document.documentElement.innerHTML = '';
    try {
      window.location.replace('about:blank');
    } catch (_) {
      window.location.href = 'about:blank';
    }
  }

  function isAuthed() {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === '1';
    } catch (_) {
      return false;
    }
  }

  function setAuthed() {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch (_) {}
  }

  function ensureLoginModal() {
    if (document.getElementById('mol-login-overlay')) return;

    const style = document.createElement('style');
    style.id = 'mol-login-style';
    style.textContent = `
      #mol-login-overlay{position:fixed;inset:0;display:none;align-items:center;justify-content:center;background:#000;z-index:2147483647}
      #mol-login-modal{width:min(420px,92vw);border-radius:18px;background:#121218;border:1px solid rgba(255,255,255,.14);box-shadow:0 18px 60px rgba(0,0,0,.55);color:#fff;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif}
      #mol-login-head{display:flex;align-items:center;justify-content:center;padding:18px 18px 8px;position:relative}
      #mol-login-title{font-size:34px;font-weight:800;letter-spacing:.3px;line-height:1;margin:0}
      #mol-login-close{position:absolute;right:14px;top:10px;border:0;background:transparent;color:#fff;font-size:22px;cursor:pointer;line-height:1;padding:8px;opacity:.9}
      #mol-login-body{padding:10px 18px 18px}
      .mol-field{display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:999px;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.06);margin-top:12px}
      .mol-input{width:100%;background:transparent;border:0;outline:0;color:#fff;font-size:14px}
      .mol-input::placeholder{color:rgba(255,255,255,.75)}
      #mol-login-actions{margin-top:16px}
      #mol-login-btn{width:100%;border:0;border-radius:999px;background:#fff;color:#111;font-weight:800;padding:12px 16px;cursor:pointer;font-size:15px}
      #mol-login-error{margin-top:10px;color:#ffb3b3;font-size:13px;min-height:18px;text-align:center}
    `;
    document.head.appendChild(style);

    const overlay = document.createElement('div');
    overlay.id = 'mol-login-overlay';
    overlay.innerHTML = `
      <div id="mol-login-modal" role="dialog" aria-modal="true" aria-label="Login">
        <div id="mol-login-head">
          <button id="mol-login-close" type="button" aria-label="Cerrar">×</button>
          <h2 id="mol-login-title">Login</h2>
        </div>
        <div id="mol-login-body">
          <div class="mol-field">
            <input id="mol-login-pass" class="mol-input" type="password" autocomplete="current-password" placeholder="Password">
          </div>
          <div id="mol-login-actions">
            <button id="mol-login-btn" type="button">Login</button>
            <div id="mol-login-error"></div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    const passEl = document.getElementById('mol-login-pass');
    const btnEl = document.getElementById('mol-login-btn');
    const closeEl = document.getElementById('mol-login-close');
    const errEl = document.getElementById('mol-login-error');

    function hide() {
      modalOpen = false;
      overlay.style.display = 'none';
      if (passEl) passEl.value = '';
      if (errEl) errEl.textContent = '';
    }

    function submit() {
      const pass = (passEl && passEl.value) ? passEl.value : '';
      if (pass !== PASSWORD) {
        if (errEl) errEl.textContent = 'Contraseña incorrecta';
        return;
      }
      setAuthed();
      hide();
    }

    btnEl && btnEl.addEventListener('click', submit);
    passEl && passEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submit();
      if (e.key === 'Escape') deny();
    });
    closeEl && closeEl.addEventListener('click', deny);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) deny();
    });
  }

  function pedirPasswordYValidar() {
    if (isAuthed()) return true;
    if (modalOpen) return false;
    modalOpen = true;
    ensureLoginModal();
    const overlay = document.getElementById('mol-login-overlay');
    const passEl = document.getElementById('mol-login-pass');
    if (overlay) overlay.style.display = 'flex';
    setTimeout(() => { passEl && passEl.focus(); }, 0);
    return false;
  }

  if (SHOULD_PROTECT) {
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      if (!isAuthed()) pedirPasswordYValidar();
    });

    document.addEventListener('keydown', function (e) {
      const key = (e.key || '').toLowerCase();

      if (e.key === 'F12') {
        e.preventDefault();
        if (!isAuthed()) pedirPasswordYValidar();
        return;
      }

      if (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(key)) {
        e.preventDefault();
        if (!isAuthed()) pedirPasswordYValidar();
        return;
      }

      if (e.ctrlKey && ['u', 's', 'p'].includes(key)) {
        e.preventDefault();
        if (!isAuthed()) pedirPasswordYValidar();
      }
    });
  }

  if (document.body && document.body.dataset && document.body.dataset.adsInit) return;
  if (document.body) document.body.dataset.adsInit = '1';
  function injectScript(src) {
    if (document.querySelector(`script[src="${src}"]`)) return;
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    document.head.appendChild(s);
  }
  function createSlot() {
    const slot = document.createElement('div');
    slot.style.width = '100%';
    slot.style.display = 'block';
    slot.style.margin = '12px 0';
    slot.className = 'ad-slot';
    return slot;
  }
  function injectIframeInto(container, src, where) {
    if (!container) return;
    const slot = createSlot();
    const f = document.createElement('iframe');
    f.src = src;
    f.width = '100%';
    f.height = '100';
    f.style.border = 'none';
    f.style.overflow = 'hidden';
    f.allow = 'autoplay';
    if (where === 'before') container.parentNode.insertBefore(slot, container);
    else if (where === 'after') container.parentNode.insertBefore(slot, container.nextSibling);
    else container.appendChild(slot);
    slot.appendChild(f);
  }
  function injectGlobal(position) {
    const slot = createSlot();
    const f = document.createElement('iframe');
    f.src = 'https://www.effectivegatecpm.com/g71km9rd?key=3dd0d64887dc4e4a06a9e86fa43bf371';
    f.width = '100%';
    f.height = '100';
    f.style.border = 'none';
    f.style.overflow = 'hidden';
    f.allow = 'autoplay';
    if (position === 'top' && document.body.firstChild) document.body.insertBefore(slot, document.body.firstChild);
    else document.body.appendChild(slot);
    slot.appendChild(f);
  }
  function placeInlineAds() {
    const hero = document.querySelector('.series-hero');
    injectIframeInto(hero, 'https://www.effectivegatecpm.com/g71km9rd?key=3dd0d64887dc4e4a06a9e86fa43bf371', 'after');
    const grid = document.getElementById('episodes-grid');
    if (grid && grid.children && grid.children.length) {
      const a = grid.children[3];
      const b = grid.children[7];
      injectIframeInto(a || grid.firstElementChild, 'https://www.effectivegatecpm.com/g71km9rd?key=3dd0d64887dc4e4a06a9e86fa43bf371', 'after');
      if (b) injectIframeInto(b, 'https://www.effectivegatecpm.com/g71km9rd?key=3dd0d64887dc4e4a06a9e86fa43bf371', 'after');
    }
    const dl = document.getElementById('download-link');
    injectIframeInto(dl, 'https://www.effectivegatecpm.com/g71km9rd?key=3dd0d64887dc4e4a06a9e86fa43bf371', 'before');
  }
  function init() {
    injectScript('//pl28083598.effectivegatecpm.com/fa/fd/c7/fafdc79dfba42fa99c475ec93b44cfbc.js');
    injectScript('//pl28083609.effectivegatecpm.com/ab/ec/46/abec46d039b00848567c45e1c5552b98.js');
    placeInlineAds();
    injectGlobal('top');
    injectGlobal('bottom');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();