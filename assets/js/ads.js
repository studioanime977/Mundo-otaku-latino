(() => {
  function appendScript(src) {
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    document.head.appendChild(s);
  }
  function addIframe(src, h) {
    const wrap = document.createElement('div');
    wrap.style.textAlign = 'center';
    wrap.style.margin = '12px 0';
    const f = document.createElement('iframe');
    f.src = src;
    f.width = '100%';
    f.height = String(h || 100);
    f.style.border = 'none';
    f.style.overflow = 'hidden';
    f.allow = 'autoplay';
    wrap.appendChild(f);
    document.body.appendChild(wrap);
  }
  const s1 = '//pl28083598.effectivegatecpm.com/fa/fd/c7/fafdc79dfba42fa99c475ec93b44cfbc.js';
  const s2 = '//pl28083609.effectivegatecpm.com/ab/ec/46/abec46d039b00848567c45e1c5552b98.js';
  const i1 = 'https://www.effectivegatecpm.com/v27wbcqe?key=7d1586d18ef6eda218f888b9468a6a80';
  const i2 = 'https://www.effectivegatecpm.com/g71km9rd?key=3dd0d64887dc4e4a06a9e86fa43bf371';
  function init() {
    appendScript(s1);
    appendScript(s2);
    addIframe(i1, 100);
    addIframe(i2, 100);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();