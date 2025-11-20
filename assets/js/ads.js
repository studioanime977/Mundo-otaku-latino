(() => {
  function injectScript(src) {
    if (document.querySelector(`script[src="${src}"]`)) return;
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    document.head.appendChild(s);
  }
  function makeSlot(position) {
    const slot = document.createElement('div');
    slot.style.width = '100%';
    slot.style.display = 'block';
    slot.style.margin = '12px 0';
    if (position === 'top') {
      document.body.insertBefore(slot, document.body.firstChild);
    } else {
      document.body.appendChild(slot);
    }
    return slot;
  }
  function injectIframe(src, position) {
    const slot = makeSlot(position);
    const f = document.createElement('iframe');
    f.src = src;
    f.width = '100%';
    f.height = '100';
    f.style.border = 'none';
    f.style.overflow = 'hidden';
    f.allow = 'autoplay';
    slot.appendChild(f);
  }
  function init() {
    injectScript('//pl28083598.effectivegatecpm.com/fa/fd/c7/fafdc79dfba42fa99c475ec93b44cfbc.js');
    injectScript('//pl28083609.effectivegatecpm.com/ab/ec/46/abec46d039b00848567c45e1c5552b98.js');
    injectIframe('https://www.effectivegatecpm.com/g71km9rd?key=3dd0d64887dc4e4a06a9e86fa43bf371', 'top');
    injectIframe('https://www.effectivegatecpm.com/g71km9rd?key=3dd0d64887dc4e4a06a9e86fa43bf371', 'bottom');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();