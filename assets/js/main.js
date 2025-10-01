// Datos de ejemplo — reemplaza por tu CMS o por datos reales
const DATA = {
  featured:[
    {title:'Días de Sakamoto', img:'https://picsum.photos/seed/saka1/1200/600', slug:'dias-de-sakamoto'},
    {title:'Anime Ejemplo 2', img:'https://picsum.photos/seed/a2/1200/600', slug:'anime-ejemplo-2'},
    {title:'Anime Ejemplo 3', img:'https://picsum.photos/seed/a3/1200/600', slug:'anime-ejemplo-3'}
  ],
  recent:[
    {title:'Días de Sakamoto — Cap 22','img':'https://picsum.photos/seed/r1/400/600','slug':'dias-de-sakamoto','ep':22,'audio':'Lat'},
    {title:'Anime Ejemplo 2 — Cap 05','img':'https://picsum.photos/seed/r2/400/600','slug':'anime-ejemplo-2','ep':5,'audio':'Lat'},
    {title:'Anime Ejemplo 3 — Cap 01','img':'https://picsum.photos/seed/r3/400/600','slug':'anime-ejemplo-3','ep':1,'audio':'Cast'}
  ],
  popular:[
    {title:'Días de Sakamoto','img':'https://picsum.photos/seed/p1/200/300','slug':'dias-de-sakamoto'},
    {title:'Anime Ejemplo 2','img':'https://picsum.photos/seed/p2/200/300','slug':'anime-ejemplo-2'}
  ]
}

// --- Renderizar carrusel y listas ---
function renderHome(){
  document.getElementById('year').textContent = new Date().getFullYear();

  const carousel = document.getElementById('carousel');
  DATA.featured.forEach((f,i)=>{
    const slide = document.createElement('div');
    slide.className='slide'+(i===0?' active':'');
    slide.innerHTML = `
      <img src="${f.img}" alt="${f.title}">
      <div class="slide-caption">
        <h2>${f.title}</h2>
        <a class="cta" href="anime.html?slug=${f.slug}">Ver serie</a>
      </div>`;
    carousel.appendChild(slide);
  });

  const recentList = document.getElementById('recentList');
  if(recentList){
    DATA.recent.forEach(item=>{
      const c = document.createElement('article');
      c.className='card';
      c.innerHTML = `
        <img src="${item.img}" alt="${item.title}">
        <div class='card-body'>
          <div class='card-title'>${item.title}</div>
          <div class='card-meta'>${item.audio} · Cap ${item.ep}</div>
        </div>`;
      c.addEventListener('click',()=>{ location.href = `episodio.html?slug=${item.slug}&ep=${item.ep}` });
      recentList.appendChild(c);
    })
  }

  const popularNode = document.getElementById('popularList');
  if(popularNode){
    DATA.popular.forEach(it=>{
      const d = document.createElement('div'); d.className='popular-item';
      d.innerHTML = `<a href="anime.html?slug=${it.slug}"><img src="${it.img}" alt="${it.title}" style="width:48px;height:72px;object-fit:cover;border-radius:6px;margin-right:8px"> ${it.title}</a>`;
      popularNode.appendChild(d);
    })
  }
}

// Carrusel simple
let slideIndex=0;function nextSlide(n=1){
  const slides = document.querySelectorAll('.carousel .slide');
  if(!slides.length) return; slides[slideIndex].classList.remove('active');
  slideIndex = (slideIndex + n + slides.length) % slides.length;
  slides[slideIndex].classList.add('active');
}

// Sorpresa aleatoria
function surprise(){
  const all = DATA.featured.concat(DATA.popular).concat(DATA.recent);
  const pick = all[Math.floor(Math.random()*all.length)];
  if(pick){
    if(pick.ep) location.href = `episodio.html?slug=${pick.slug}&ep=${pick.ep}`;
    else location.href = `anime.html?slug=${pick.slug}`;
  }
}

// Render detalle serie (anime.html)
function renderAnimeDetail(){
  document.getElementById('year2').textContent = new Date().getFullYear();
  const epList = document.getElementById('episodeList');
  if(!epList) return;
  // Simular 24 episodios
  for(let i=1;i<=24;i++){
    const li = document.createElement('li');
    li.innerHTML = `<a href="episodio.html?slug=dias-de-sakamoto&ep=${i}">Capítulo ${i}</a>`;
    epList.appendChild(li);
  }
}

// manejar botones header y dark mode
function bindHeader(){
  document.getElementById('year')?.textContent ?? '';
  document.getElementById('prevSlide')?.addEventListener('click',()=>nextSlide(-1));
  document.getElementById('nextSlide')?.addEventListener('click',()=>nextSlide(1));

  // toggles dark mode (simple)
  document.querySelectorAll('#darkToggle,#darkToggle2,#darkToggle3').forEach(btn=>{
    btn?.addEventListener('click',()=>{
      document.documentElement.classList.toggle('light-mode');
      // persistencia rápida
      localStorage.setItem('theme',document.documentElement.classList.contains('light-mode')?'light':'dark');
    })
  })

  const saved = localStorage.getItem('theme');
  if(saved==='light') document.documentElement.classList.add('light-mode');
}

// Al cargar cada página
document.addEventListener('DOMContentLoaded',()=>{
  bindHeader();
  if(document.body.contains(document.getElementById('carousel'))){ renderHome(); }
  if(document.body.classList.contains('anime-detail') || location.pathname.endsWith('anime.html')){ renderAnimeDetail(); }
  document.getElementById('year')?.textContent = new Date().getFullYear();
  document.getElementById('year2')?.textContent = new Date().getFullYear();
  document.getElementById('year3')?.textContent = new Date().getFullYear();
});

// Deshabilitar clic derecho y selección de texto
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('selectstart', function(e) {
    e.preventDefault();
});

// Bloquear combinaciones de teclas para inspección
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.key === 'i' || e.key === 'I')) {
        e.preventDefault();
    }
    if (e.key === 'F12') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I')) {
        e.preventDefault();
    }
});