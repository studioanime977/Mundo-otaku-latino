const data = [
  { place:'Serie', title:'ATTACK', title2:'ON TITAN', description:'Explora todas las temporadas y especiales.', image:'../../img/Attack on Titan S1.jpg', href:'../anime/attack-on-titan/attack-on-titan.html' },
  { place:'Serie', title:'BOKU', title2:'NO HERO', description:'Temporadas completas disponibles.', image:'../../img/BokunoHeroAcademia S1.png', href:'../anime/boku-no-hero-academia/boku-no-hero-academia.html' },
  { place:'Serie', title:'BUNGO', title2:'STRAY DOGS', description:'Todas las temporadas.', image:'../../img/Bungou Stray Dogs S1.jpg', href:'../anime/bungo-stray-dogs/bungo-stray-dogs.html' },
  { place:'Serie', title:'CHAINSAW', title2:'MAN', description:'Temporada 1.', image:'../../img/Chainsaw Man S1.jpg', href:'../anime/chainsaw-man/chainsaw-man.html' },
  { place:'Serie', title:'CLASSROOM', title2:'OF THE ELITE', description:'Temporadas 1 y 2.', image:'../../img/classroom of the elite  season 1.png', href:'../anime/classroom-of-the-elite/classroom-of-the-elite.html' },
  { place:'Serie', title:'DANMACHI', title2:'', description:'Temporada 1.', image:'../../img/DanMachi tem 1.png', href:'../anime/danmachi/danmachi.html' },
  { place:'Serie', title:'DEMON', title2:'SLAYER', description:'Serie y películas.', image:'../../img/Kimetsu No Yaiba temporada 1.png', href:'../anime/demon-slayer/demon-slayer.html' },
  { place:'Serie', title:'DRAGON', title2:'BALL', description:'Serie Z.', image:'../../img/Dragon Ball Z.jpg', href:'../anime/dragon-ball/dragon-ball.html' },
  { place:'Serie', title:'DB', title2:'HEROES', description:'Todas las temporadas.', image:'../../img/DRAGON BALL HEROES.png', href:'../anime/dragon-ball-heroes/dragon-ball-heroes.html' },
  { place:'Serie', title:'EVEN', title2:'GIVEN', description:'Temporada 1.', image:'../../img/Even Given the Worthless tem 1.png', href:'../anime/even-given-the-worthless/even-given-the-worthless.html' },
  { place:'Serie', title:'HORIMIYA', title2:'', description:'Temporada 1.', image:'../../img/horimiya-the-missing-pieces-key-visual-tall.png', href:'../anime/horimiya/horimiya.html' },
  { place:'Película', title:'HOTARUBI', title2:'NO MORI E', description:'Película.', image:'../../img/Hotarubi no Mori e.jpg', href:'../anime/hotarubi-no-mori-e/movie.html' },
  { place:'Serie', title:'JUJUTSU', title2:'KAISEN', description:'Temporadas y película 0.', image:'../../img/Jujutsu Kaisen S1.jpg', href:'../anime/jujutsu-kaisen/jujutsu-kaisen.html' },
  { place:'Película', title:'K-POP', title2:'DEMON HUNTER', description:'Película 1.', image:'../../img/Las guerras K-Pop Demon Hunters.jpg', href:'../anime/k-pop-demon-hunter/k-pop-demon-hunter.html' },
  { place:'Serie', title:'KONO', title2:'OTO TOMARE', description:'Temporada 1.', image:'../../img/Kono oto tomaré Season 1.png', href:'../anime/kono-oto-tomare/kono-oto-tomare.html' },
  { place:'Serie', title:'MASHLE', title2:'', description:'Temporadas 1 y 2.', image:'../../img/Mashle  temporada 1.png', href:'../anime/mashle/mashle.html' },
  { place:'Serie', title:'MOB', title2:'PSYCHO 100', description:'Serie completa.', image:'../../img/Mob Psycho 100 S1.jpg', href:'../anime/mob-psycho-100/mob-psycho-100.html' },
  { place:'Serie', title:'MUSHOKU', title2:'TENSEI', description:'Temporadas 1 y 2.', image:'../../img/Mushoku Tensei tem 1.png', href:'../anime/mushoku-tensei/mushoku-tensei.html' },
  { place:'Serie', title:'NANATSU', title2:'NO TAIZAI', description:'Todas las temporadas.', image:'../../img/Nanatsu no taizai TEM  1.jpg', href:'../anime/nanatsu-no-taizai/nanatsu-no-taizai.html' },
  { place:'Serie', title:'NARUTO', title2:'', description:'Clásico y más.', image:'../../img/Naruto Classic.jpg', href:'../anime/naruto/naruto.html' },
  { place:'Serie', title:'NAZO', title2:'NO KANOJO X', description:'Temporada 1.', image:'../../img/NAZO NO KANOJO X S1.jpg', href:'../anime/nazo-no-kanojo-x/nazo-no-kanojo-x.html' },
  { place:'Serie', title:'ONE', title2:'PIECE', description:'Serie.', image:'../../img/One Piece East Blue.png', href:'../anime/one-piece/one-piece.html' },
  { place:'Serie', title:'ONE', title2:'PUNCH MAN', description:'Temporada 1.', image:'../../img/One Punch Man S1.jpg', href:'../anime/one-punch-man/one-punch-man.html' },
  { place:'Serie', title:'PAPA NO', title2:'IUKOTO O KIKINASAI', description:'Temporada 1.', image:'../../img/Papa no Iukoto o Kikinasai.png', href:'../anime/papa-no-iukoto-o-kikinasai/papa-no-iukoto-o-kikinasai.html' },
  { place:'Serie', title:'RE', title2:'ZERO', description:'Temporadas 1–3.', image:'../../img/rezeroS1.png', href:'../anime/re-zero/re-zero.html' },
  { place:'Serie', title:'SAKAMOTO', title2:'DAYS', description:'Temporadas.', image:'../../img/sakamoto-days-art.jpg', href:'../anime/sakamoto-days/sakamoto-days.html' },
  { place:'Película', title:'SAO', title2:'PROGRESSIVE', description:'Películas.', image:'../../img/Sword Art Online Progressive Movie.png', href:'../anime/sao-progressive/sao-progressive.html' },
  { place:'Serie', title:'SHUUMATSU', title2:'NO VALKYRIE', description:'Temporadas.', image:'../../img/shuumatsu no valkyrie Temporada 2.jpg', href:'../anime/shuumatsu-no-valkyrie/shuumatsu-no-valkyrie.html' },
  { place:'Serie', title:'SOLO', title2:'LEVELING', description:'Temporadas.', image:'../../img/Solo Leveling season 1.jpg', href:'../anime/solo-leveling/solo-leveling.html' },
  { place:'Serie', title:'SUPERMAN', title2:'2025', description:'Serie.', image:'../../img/superman 2025.png', href:'../anime/superman2025/superman2025.html' },
  { place:'Serie', title:'TOKYO', title2:'GHOUL', description:'Serie y más.', image:'../../img/Tokyo Ghoul S1.jpg', href:'../anime/tokyo-ghoul/tokyo-ghoul.html' },
  { place:'Película', title:'TU', title2:'NOMBRE', description:'Película y ficha.', image:'../../img/tu-nombre.jpg', href:'../anime/tu-nombre/tu-nombre.html' },
  { place:'Serie', title:'URUSEI', title2:'YATSURA', description:'Temporada 1.', image:'../../img/Urusei Yatsura temporada 1.jpg', href:'../anime/urusei-yatsura/urusei-yatsura.html' }
]

const _ = (id)=>document.getElementById(id)
const cards = data.map((i, index)=>`<div class="card" id="card${index}" style="background-image:url('${i.image}')"></div>`).join('')
const cardContents = data.map((i, index)=>`<div class="card-content" id="card-content-${index}">
<div class="content-start"></div>
<div class="content-place">${i.place}</div>
<div class="content-title-1">${i.title}</div>
<div class="content-title-2">${i.title2}</div>
</div>`).join('')
const slideNumbers = data.map((_, index)=>`<div class="item" id="slide-item-${index}">${index+1}</div>`).join('')
const demoEl = _('demo');
const slideNumbersEl = _('slide-numbers');
if (demoEl) demoEl.innerHTML = cards + cardContents;
if (slideNumbersEl) slideNumbersEl.innerHTML = slideNumbers;

let order = Array(data.length).map((_, i)=>i)
order = data.map((_, i)=>i)
let detailsEven = true;

let offsetTop = 200;
let offsetLeft = 700;
let cardWidth = 200;
let cardHeight = 300;
let gap = 40;
let numberSize = 50;
let heroHeight = window.innerHeight;
const ease = "sine.inOut";

function configureLayout() {
  const { innerHeight: height, innerWidth: width } = window;
  if (width <= 360) {
    cardWidth = 80;
    cardHeight = 120;
    gap = 8;
    numberSize = 24;
    offsetLeft = 10;
    heroHeight = Math.round(height * 0.36);
    offsetTop = heroHeight + 10;
  } else if (width <= 480) {
    cardWidth = 100;
    cardHeight = 150;
    gap = 10;
    numberSize = 28;
    offsetLeft = 12;
    heroHeight = Math.round(height * 0.42);
    offsetTop = heroHeight + 14;
  } else if (width <= 600) {
    cardWidth = 110;
    cardHeight = 165;
    gap = 12;
    numberSize = 32;
    offsetLeft = 14;
    heroHeight = Math.round(height * 0.46);
    offsetTop = heroHeight + 18;
  } else if (width <= 900) {
    cardWidth = 140;
    cardHeight = 210;
    gap = 16;
    numberSize = 40;
    offsetLeft = 40;
    offsetTop = 140;
    heroHeight = Math.round(height * 0.7);
  } else {
    cardWidth = 200;
    cardHeight = 300;
    gap = 40;
    numberSize = 50;
    offsetLeft = width - 830;
    offsetTop = 160;
    heroHeight = height;
  }
}

function getCard(index) { return `#card${index}`; }
function getCardContent(index) { return `#card-content-${index}`; }
function getSliderItem(index) { return `#slide-item-${index}`; }

function animate(target, duration, properties) {
  return new Promise((resolve) => {
    gsap.to(target, { ...properties, duration: duration, onComplete: resolve });
  });
}

function init() {
  configureLayout();
  const [active, ...rest] = order;
  const detailsActive = detailsEven ? "#details-even" : "#details-odd";
  const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
  const { innerHeight: height, innerWidth: width } = window;

  gsap.set("#demo", { height: Math.max(heroHeight, offsetTop + cardHeight + 30) });
  gsap.set("#pagination", { top: offsetTop + cardHeight + 30, left: offsetLeft, y: 200, opacity: 0, zIndex: 60 });
  gsap.set("nav", { y: 0, opacity: 1 });

  gsap.set(getCard(active), { x: 0, y: 0, width: window.innerWidth, height: heroHeight });
  gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
  gsap.set(detailsActive, { opacity: 0, zIndex: 80, x: -200 });
  gsap.set(detailsInactive, { opacity: 0, zIndex: 70 });
  gsap.set(`${detailsInactive} .text`, { y: 100 });
  gsap.set(`${detailsInactive} .title-1`, { y: 100 });
  gsap.set(`${detailsInactive} .title-2`, { y: 100 });
  gsap.set(`${detailsInactive} .desc`, { y: 50 });
  gsap.set(`${detailsInactive} .cta`, { y: 60 });

  const pw = document.querySelector('.progress-sub-background')?.getBoundingClientRect().width || 500;
  gsap.set(".progress-sub-foreground", { width: pw * (1 / order.length) * (active + 1) });

  rest.forEach((i, index) => {
    gsap.set(getCard(i), { x: offsetLeft + 400 + index * (cardWidth + gap), y: offsetTop, width: cardWidth, height: cardHeight, zIndex: 20, borderRadius: 10 });
    gsap.set(getCardContent(i), { x: offsetLeft + 400 + index * (cardWidth + gap), zIndex: 40, y: offsetTop + cardHeight - 80 });
    gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
  });

  gsap.set(".indicator", { x: -window.innerWidth });
  const startDelay = 0.6;

  gsap.to(".cover", { x: width + 400, delay: 0.5, ease, onComplete: () => { setTimeout(() => { loop(); }, 500); } });
  rest.forEach((i, index) => {
    gsap.to(getCard(i), { x: offsetLeft + index * (cardWidth + gap), zIndex: 20, delay: 0.05 * index, ease, delay: startDelay });
    gsap.to(getCardContent(i), { x: offsetLeft + index * (cardWidth + gap), zIndex: 40, delay: 0.05 * index, ease, delay: startDelay });
  });
  gsap.to("#pagination", { y: 0, opacity: 1, ease, delay: startDelay });
  gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });
  document.querySelectorAll('.discover').forEach(btn=>{ btn.onclick = ()=>{ window.location.href = data[order[0]].href; }; })
}

let clicks = 0;

function step() {
  return new Promise((resolve) => {
    order.push(order.shift());
    detailsEven = !detailsEven;
    const detailsActive = detailsEven ? "#details-even" : "#details-odd";
    const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

    document.querySelector(`${detailsActive} .place-box .text`).textContent = data[order[0]].place;
    document.querySelector(`${detailsActive} .title-1`).textContent = data[order[0]].title;
    document.querySelector(`${detailsActive} .title-2`).textContent = data[order[0]].title2;
    document.querySelector(`${detailsActive} .desc`).textContent = data[order[0]].description;

    gsap.set(detailsActive, { zIndex: 80 });
    gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
    gsap.to(`${detailsActive} .text`, { y: 0, delay: 0.1, duration: 0.7, ease });
    gsap.to(`${detailsActive} .title-1`, { y: 0, delay: 0.15, duration: 0.7, ease });
    gsap.to(`${detailsActive} .title-2`, { y: 0, delay: 0.15, duration: 0.7, ease });
    gsap.to(`${detailsActive} .desc`, { y: 0, delay: 0.3, duration: 0.4, ease });
    gsap.to(`${detailsActive} .cta`, { y: 0, delay: 0.35, duration: 0.4, onComplete: resolve, ease });
    gsap.set(detailsInactive, { zIndex: 70 });

    const [active, ...rest] = order;
    const prv = rest[rest.length - 1];

    gsap.set(getCard(prv), { zIndex: 10 });
    gsap.set(getCard(active), { zIndex: 20 });
    gsap.to(getCard(prv), { scale: 1.5, ease });

    gsap.to(getCardContent(active), { y: offsetTop + cardHeight - 10, opacity: 0, duration: 0.3, ease });
    gsap.to(getSliderItem(active), { x: 0, ease });
    gsap.to(getSliderItem(prv), { x: -numberSize, ease });
    const pw2 = document.querySelector('.progress-sub-background')?.getBoundingClientRect().width || 500;
    gsap.to(".progress-sub-foreground", { width: pw2 * (1 / order.length) * (active + 1), ease });

    gsap.to(getCard(active), { x: 0, y: 0, ease, width: window.innerWidth, height: heroHeight, borderRadius: 0, onComplete: () => {
        const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
        gsap.set(getCard(prv), { x: xNew, y: offsetTop, width: cardWidth, height: cardHeight, zIndex: 20, borderRadius: 10, scale: 1 });
        gsap.set(getCardContent(prv), { x: xNew, y: offsetTop + cardHeight - 80, opacity: 1, zIndex: 40 });
        gsap.set(getSliderItem(prv), { x: rest.length * numberSize });
        gsap.set(detailsInactive, { opacity: 0 });
        gsap.set(`${detailsInactive} .text`, { y: 100 });
        gsap.set(`${detailsInactive} .title-1`, { y: 100 });
        gsap.set(`${detailsInactive} .title-2`, { y: 100 });
        gsap.set(`${detailsInactive} .desc`, { y: 50 });
        gsap.set(`${detailsInactive} .cta`, { y: 60 });
        clicks -= 1; if (clicks > 0) { step(); }
    }});

    rest.forEach((i, index) => {
      if (i !== prv) {
        const xNew = offsetLeft + index * (cardWidth + gap);
        gsap.set(getCard(i), { zIndex: 20 });
        gsap.to(getCard(i), { x: xNew, y: offsetTop, width: cardWidth, height: cardHeight, ease, delay: 0.1 * (index + 1) });
        gsap.to(getCardContent(i), { x: xNew, y: offsetTop + cardHeight - 80, opacity: 1, zIndex: 40, ease, delay: 0.1 * (index + 1) });
        gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
      }
    });
  });
}

async function loop() {
  await animate(".indicator", 2, { x: 0 });
  await animate(".indicator", 0.8, { x: window.innerWidth, delay: 0.3 });
  gsap.set(".indicator", { x: -window.innerWidth });
  await step();
  loop();
}

async function loadImage(src) { 
  return new Promise((resolve, reject) => { 
    const img = new Image(); 
    img.onload = () => resolve(img); 
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`)); 
    img.src = src; 
  }); 
}
async function loadImages() { 
  const promises = data.map(({ image }) => loadImage(image).catch(err => {
    console.warn(err.message);
    return null;
  })); 
  return Promise.all(promises); 
}

function renderGrid(){
  const grid = document.getElementById('catalog-grid');
  if (!grid) {
    console.warn('Element catalog-grid not found');
    return;
  }
  grid.innerHTML = data.map(item => `
    <div class="anime-card">
      <img src="${item.image}" alt="${item.title} ${item.title2}">
      <div class="anime-info">
        <h3>${item.title} ${item.title2}</h3>
        <p>${item.description}</p>
        <div class="anime-status">
          <span class="status-badge">${item.place}</span>
          <span class="anime-rating">★ 8.5</span>
        </div>
      </div>
      <a href="${item.href}" class="anime-link"></a>
    </div>
  `).join('');
}

async function start() {
  try {
    await loadImages();
    renderGrid();
    if (window.gsap) { document.body.classList.remove('no-js') }
    init();
  } catch (error) {
    console.error("One or more images failed to load", error);
    renderGrid();
    if (window.gsap) {
      document.body.classList.remove('no-js');
      init();
    }
  }
}

// Listener para redimensionar la ventana
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    configureLayout();
    const [active, ...rest] = order;
    const detailsActive = detailsEven ? "#details-even" : "#details-odd";
    
    gsap.set("#demo", { height: heroHeight });
    gsap.set("#pagination", { top: offsetTop + cardHeight + 30, left: offsetLeft });
    gsap.set(getCard(active), { x: 0, y: 0, width: window.innerWidth, height: heroHeight });
    
    rest.forEach((i, index) => {
      const xNew = offsetLeft + index * (cardWidth + gap);
      gsap.set(getCard(i), { x: xNew, y: offsetTop, width: cardWidth, height: cardHeight });
      gsap.set(getCardContent(i), { x: xNew, y: offsetTop + cardHeight - 80 });
      gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
    });
    
    const pw = document.querySelector('.progress-sub-background')?.getBoundingClientRect().width || 500;
    gsap.set(".progress-sub-foreground", { width: pw * (1 / order.length) * (active + 1) });
  }, 250);
});

start()

const navToggle = document.querySelector('.menu-toggle')
const navEl = document.querySelector('nav')
const navLinks = document.querySelector('.nav-links')
if (navToggle && navEl && navLinks) {
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation()
    const isOpen = navEl.classList.toggle('open')
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false')
    document.body.style.overflow = isOpen ? 'hidden' : ''
  })
  document.addEventListener('click', (e) => {
    const target = e.target
    const clickedMenuItem = target.closest('.nav-links a, .nav-links .nav-link')
    if (clickedMenuItem) navEl.classList.remove('open')
    if (!navEl.classList.contains('open')) document.body.style.overflow = ''
  })
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navEl.classList.remove('open')
      document.body.style.overflow = ''
    }
  })
}