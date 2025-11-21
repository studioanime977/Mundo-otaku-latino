(() => {
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