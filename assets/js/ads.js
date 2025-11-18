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
  const a1 = '//aggressivestruggle.com/b/X/VSstd.GKlT0DY-W/cX/qeemK9zusZRU/lCkpPmTlYb2DNizYUT1/NhzGEft/NcjEYX3tNKTBUy3bMcgN';
  const a2 = '//aggressivestruggle.com/b.XJVusldVGblt0-Y_WJcp/Ue/mt9JuIZGU/lWkKP/T/YY2ANnzXYT0lNRDFIqtUNzjqY/3/NkjSQj0UMUwR';
  const i3 = 'https://impeccable-sense.com/2lT0ce';
  function appendAggressive(src) {
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.referrerPolicy = 'no-referrer-when-downgrade';
    const l = document.scripts[document.scripts.length - 1];
    if (l && l.parentNode) l.parentNode.insertBefore(s, l); else document.head.appendChild(s);
  }
  function init() {
    appendScript(s1);
    appendScript(s2);
    addIframe(i1, 100);
    addIframe(i2, 100);
    appendAggressive(a1);
    appendAggressive(a2);
    addIframe(i3, 100);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();