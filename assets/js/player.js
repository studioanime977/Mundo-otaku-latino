// Datos de ejemplo: mapea servidores a URLs de vídeo/embed. Reemplaza con tus servidores.
const PLAYER_DATA = {
  seriesSlug: 'dias-de-sakamoto',
  episodes: {
    22:{
      title:'Días de Sakamoto — Capítulo 22',
      description:'Kanaguri es testigo de los logros de Akira, pero su cámara acaba destrozada... (demo)',
      views:34,
      servers:[
        {id:'srv1', label:'Servidor 1 (Embed)', url:'https://www.youtube.com/embed/ScMzIvxBSi4'},
        {id:'srv2', label:'Servidor 2 (MP4 demo)', url:'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'}
      ]
    }
  }
};

function readQuery(){
  const params = new URLSearchParams(location.search);
  return {slug:params.get('slug')||PLAYER_DATA.seriesSlug, ep:parseInt(params.get('ep')||22,10)};
}

function renderPlayerPage(){
  const q = readQuery();
  const epData = PLAYER_DATA.episodes[q.ep] || Object.values(PLAYER_DATA.episodes)[0];
  document.getElementById('pageTitle').textContent = `${q.slug.replace(/-/g,' ')} — Capítulo ${q.ep}`;
  document.getElementById('epTitle').textContent = `Capítulo ${q.ep}`;
  document.getElementById('description').textContent = epData.description;
  document.getElementById('views').textContent = epData.views;

  const select = document.getElementById('serverSelect');
  select.innerHTML = '';
  epData.servers.forEach(s=>{ const opt = document.createElement('option'); opt.value=s.url; opt.textContent=s.label; select.appendChild(opt); });

  // cargar primer servidor por defecto
  loadServer(select.value);

  select.addEventListener('change',e=> loadServer(e.target.value));

  // botones
  document.getElementById('expandBtn').addEventListener('click',toggleFullScreen);
  document.getElementById('lightsOffBtn').addEventListener('click',toggleLights);
  document.getElementById('listBtn').addEventListener('click',()=> location.href = `anime.html?slug=${q.slug}`);
  document.getElementById('prevBtn').addEventListener('click',()=> location.href = `episodio.html?slug=${q.slug}&ep=${Math.max(1,q.ep-1)}`);
  document.getElementById('nextBtn').addEventListener('click',()=> location.href = `episodio.html?slug=${q.slug}&ep=${q.ep+1}`);

  // comments
  bindComments();
}

function loadServer(url){
  const iframe = document.getElementById('playerFrame');
  // Si es mp4, usamos <video> en lugar de iframe para mejor experiencia — detecta con extensión
  if(url.match(/\.mp4(\?|$)/i)){
    // crear elemento video
    const videoHTML = `<video controls autoplay style=\"width:100%;height:100%\"><source src=\"${url}\" type=\"video/mp4\"></video>`;
    // usar srcdoc para incrustarlo dentro del iframe sandbox
    iframe.srcdoc = `<html><body style=\"margin:0;background:black;\">${videoHTML}</body></html>`;
  } else {
    // para embeds (youtube etc.) solo ponemos src
    iframe.removeAttribute('srcdoc');
    iframe.src = url;
  }
}

function toggleFullScreen(){
  const el = document.getElementById('playerWrapper');
  if(!document.fullscreenElement){
    el.requestFullscreen?.();
  } else { document.exitFullscreen?.(); }
}

function toggleLights(){
  const overlay = document.getElementById('lightsOverlay');
  if(overlay.hidden){ overlay.hidden = false; overlay.style.pointerEvents = 'auto'; }
  else { overlay.hidden = true; overlay.style.pointerEvents = 'none'; }
}

// Comentarios simples guardados por URL en localStorage (demo)
function bindComments(){
  const form = document.getElementById('commentForm');
  const list = document.getElementById('commentList');
  const key = 'comments:'+location.pathname+location.search;

  function load(){
    list.innerHTML='';
    const arr = JSON.parse(localStorage.getItem(key)||'[]');
    arr.forEach(c=>{ const li = document.createElement('li'); li.className='comment-item'; li.innerHTML = `<strong>${escapeHtml(c.name)}</strong><div>${escapeHtml(c.msg)}</div><small>${new Date(c.t).toLocaleString()}</small>`; list.appendChild(li); });
  }

  form.addEventListener('submit',e=>{
    e.preventDefault();
    const name = document.getElementById('cname').value.trim();
    const msg = document.getElementById('cmsg').value.trim();
    if(!name||!msg) return;
    const arr = JSON.parse(localStorage.getItem(key)||'[]');
    arr.unshift({name,msg,t:Date.now()});
    localStorage.setItem(key,JSON.stringify(arr));
    form.reset(); load();
  });

  load();
}

function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c=> ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

// Inicialización
document.addEventListener('DOMContentLoaded',()=>{
  if(location.pathname.endsWith('episodio.html')) renderPlayerPage();
});