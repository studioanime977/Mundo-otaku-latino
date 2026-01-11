// Data de anime
const data = [
  { place: 'Serie', title: 'ATTACK', title2: 'ON TITAN', description: 'Explora todas las temporadas y especiales.', image: '../../img/Attack on Titan S1.jpg', href: '../anime/attack-on-titan/attack-on-titan.html' },
  { place: 'Serie', title: 'BOKU', title2: 'NO HERO', description: 'Temporadas completas disponibles.', image: '../../img/BokunoHeroAcademia S1.png', href: '../anime/boku-no-hero-academia/boku-no-hero-academia.html' },
  { place: 'Serie', title: 'BORUTO', title2: 'NEXT GENERATIONS', description: 'Sub Español (MEGA).', image: '../../img/Boruto Next Generations.png', href: '../anime/boruto/boruto.html' },
  { place: 'Serie', title: 'BUNGO', title2: 'STRAY DOGS', description: 'Todas las temporadas.', image: '../../img/Bungou Stray Dogs S1.jpg', href: '../anime/bungo-stray-dogs/bungo-stray-dogs.html' },
  { place: 'Serie', title: 'CHAINSAW', title2: 'MAN', description: 'Temporada 1.', image: '../../img/Chainsaw Man S1.jpg', href: '../anime/chainsaw-man/chainsaw-man.html' },
  { place: 'Serie', title: 'CLASSROOM', title2: 'OF THE ELITE', description: 'Temporadas 1 y 2.', image: '../../img/classroom of the elite  season 1.png', href: '../anime/classroom-of-the-elite/classroom-of-the-elite.html' },
  { place: 'Serie', title: 'DANMACHI', title2: '', description: 'Temporada 1.', image: '../../img/DanMachi tem 1.png', href: '../anime/danmachi/danmachi.html' },
  { place: 'Serie', title: 'DEMON', title2: 'SLAYER', description: 'Serie y películas.', image: '../../img/Kimetsu No Yaiba temporada 1.png', href: '../anime/demon-slayer/demon-slayer.html' },
  { place: 'Serie', title: 'DRAGON', title2: 'BALL', description: 'Serie Z.', image: '../../img/Dragon Ball Z.jpg', href: '../anime/dragon-ball/dragon-ball.html' },
  { place: 'Serie', title: 'DB', title2: 'HEROES', description: 'Todas las temporadas.', image: '../../img/DRAGON BALL HEROES.png', href: '../anime/dragon-ball-heroes/dragon-ball-heroes.html' },
  { place: 'Serie', title: 'EVEN', title2: 'GIVEN', description: 'Temporada 1.', image: '../../img/Even Given the Worthless tem 1.png', href: '../anime/even-given-the-worthless/even-given-the-worthless.html' },
  { place: 'Serie', title: 'HORIMIYA', title2: '', description: 'Temporada 1.', image: '../../img/horimiya-the-missing-pieces-key-visual-tall.png', href: '../anime/horimiya/horimiya.html' },
  { place: 'Película', title: 'HOTARUBI', title2: 'NO MORI E', description: 'Película.', image: '../../img/Hotarubi no Mori e.jpg', href: '../anime/hotarubi-no-mori-e/movie.html' },
  { place: 'Serie', title: 'JUJUTSU', title2: 'KAISEN', description: 'Temporadas y película 0.', image: '../../img/Jujutsu Kaisen S1.jpg', href: '../anime/jujutsu-kaisen/jujutsu-kaisen.html' },
  { place: 'Película', title: 'K-POP', title2: 'DEMON HUNTER', description: 'Película 1.', image: '../../img/Las guerras K-Pop Demon Hunters.jpg', href: '../anime/k-pop-demon-hunter/k-pop-demon-hunter.html' },
  { place: 'Serie', title: 'KONO', title2: 'OTO TOMARE', description: 'Temporada 1.', image: '../../img/Kono oto tomaré Season 1.png', href: '../anime/kono-oto-tomare/kono-oto-tomare.html' },
  { place: 'Serie', title: 'MASHLE', title2: '', description: 'Temporadas 1 y 2.', image: '../../img/Mashle  temporada 1.png', href: '../anime/mashle/mashle.html' },
  { place: 'Serie', title: 'MOB', title2: 'PSYCHO 100', description: 'Serie completa.', image: '../../img/Mob Psycho 100 S1.jpg', href: '../anime/mob-psycho-100/mob-psycho-100.html' },
  { place: 'Serie', title: 'MUSHOKU', title2: 'TENSEI', description: 'Temporadas 1 y 2.', image: '../../img/Mushoku Tensei tem 1.png', href: '../anime/mushoku-tensei/mushoku-tensei.html' },
  { place: 'Serie', title: 'NANATSU', title2: 'NO TAIZAI', description: 'Todas las temporadas.', image: '../../img/Nanatsu no taizai TEM  1.jpg', href: '../anime/nanatsu-no-taizai/nanatsu-no-taizai.html' },
  { place: 'Serie', title: 'NARUTO', title2: '', description: 'Clásico y más.', image: '../../img/Naruto Classic.jpg', href: '../anime/naruto/naruto.html' },
  { place: 'Serie', title: 'NAZO', title2: 'NO KANOJO X', description: 'Temporada 1.', image: '../../img/NAZO NO KANOJO X S1.jpg', href: '../anime/nazo-no-kanojo-x/nazo-no-kanojo-x.html' },
  { place: 'Serie', title: 'ONE', title2: 'PIECE', description: 'Serie.', image: '../../img/One Piece East Blue.png', href: '../anime/one-piece/one-piece.html' },
  { place: 'Serie', title: 'ONE', title2: 'PUNCH MAN', description: 'Temporada 1.', image: '../../img/One Punch Man S1.jpg', href: '../anime/one-punch-man/one-punch-man.html' },
  { place: 'Serie', title: 'OWARI', title2: 'NO SERAPH', description: 'Temporadas 1 y 2.', image: '../../img/Owari%20no%20Seraph%20cads%20s1.webp', href: '../anime/owari-no-seraph/owari-no-seraph.html' },
  { place: 'Serie', title: 'PAPA NO', title2: 'IUKOTO O KIKINASAI', description: 'Temporada 1.', image: '../../img/Papa no Iukoto o Kikinasai.png', href: '../anime/papa-no-iukoto-o-kikinasai/papa-no-iukoto-o-kikinasai.html' },
  { place: 'Serie', title: 'RE', title2: 'ZERO', description: 'Temporadas 1–3.', image: '../../img/rezeroS1.png', href: '../anime/re-zero/re-zero.html' },
  { place: 'Serie', title: 'SAKAMOTO', title2: 'DAYS', description: 'Temporadas.', image: '../../img/sakamoto-days-art.jpg', href: '../anime/sakamoto-days/sakamoto-days.html' },
  { place: 'Película', title: 'SAO', title2: 'PROGRESSIVE', description: 'Películas.', image: '../../img/Sword Art Online Progressive Movie.png', href: '../anime/sao-progressive/sao-progressive.html' },
  { place: 'Serie', title: 'SHUUMATSU', title2: 'NO VALKYRIE', description: 'Temporadas.', image: '../../img/shuumatsu no valkyrie Temporada 2.jpg', href: '../anime/shuumatsu-no-valkyrie/shuumatsu-no-valkyrie.html' },
  { place: 'Serie', title: 'SOLO', title2: 'LEVELING', description: 'Temporadas.', image: '../../img/Solo Leveling season 1.jpg', href: '../anime/solo-leveling/solo-leveling.html' },
  { place: 'Serie', title: 'SUPERMAN', title2: '2025', description: 'Serie.', image: '../../img/superman 2025.png', href: '../anime/superman2025/superman2025.html' },
  { place: 'Serie', title: 'TOKYO', title2: 'GHOUL', description: 'Serie y más.', image: '../../img/Tokyo Ghoul S1.jpg', href: '../anime/tokyo-ghoul/tokyo-ghoul.html' },
  { place: 'Película', title: 'TU', title2: 'NOMBRE', description: 'Película y ficha.', image: '../../img/tu-nombre.jpg', href: '../anime/tu-nombre/tu-nombre.html' },
  { place: 'Serie', title: 'URUSEI', title2: 'YATSURA', description: 'Temporada 1.', image: '../../img/Urusei Yatsura temporada 1.jpg', href: '../anime/urusei-yatsura/urusei-yatsura.html' }
]

// Variables globales para filtros
let currentFilter = 'all';
let currentSearchTerm = '';

// Renderizar grid de catálogo
// Renderizar grid de catálogo con anuncios intercalados
function renderGrid(filteredData = data) {
  const grid = document.getElementById('catalog-grid');
  const noResults = document.getElementById('noResults');
  const resultsCount = document.getElementById('resultsCount');

  if (!grid) {
    console.warn('Element catalog-grid not found');
    return;
  }

  // Actualizar contador de resultados
  if (resultsCount) {
    const count = filteredData.length;
    resultsCount.querySelector('span').textContent = count;
  }

  // Mostrar/ocultar mensaje de sin resultados
  if (filteredData.length === 0) {
    grid.style.display = 'none';
    if (noResults) noResults.style.display = 'block';
  } else {
    grid.style.display = 'grid';
    if (noResults) noResults.style.display = 'none';
  }

  // Construir HTML con anuncios cada 8 items
  let gridHTML = '';
  // Array para guardar los IDs de los contenedores de anuncios
  const adContainers = [];

  filteredData.forEach((item, index) => {
    // Insertar el item actual
    gridHTML += `
      <div class="anime-card">
        <a href="${item.href}" class="anime-link">
          <img src="${item.image}" alt="${item.title} ${item.title2}" loading="lazy">
          <div class="anime-info">
            <h3>${item.title} ${item.title2}</h3>
            <p>${item.description}</p>
            <div class="anime-status">
              <span class="status-badge">${item.place}</span>
              <span class="anime-rating">★ 8.5</span>
            </div>
          </div>
        </a>
      </div>
    `;

    // Insertar placeholder para anuncio después de cada 8 items
    if ((index + 1) % 8 === 0 && index !== filteredData.length - 1) {
      const adId = `ad-banner-cat-${index}`;
      gridHTML += `<div id="${adId}" class="ad-card" style="grid-column: 1 / -1; display: flex; justify-content: center; margin: 20px 0; background: rgba(0,0,0,0.2); padding: 15px; border-radius: 10px; min-height: 250px;"></div>`;
      adContainers.push(adId);
    }
  });

  grid.innerHTML = gridHTML;

  // Inyectar los scripts de anuncios en los placeholders creados
  adContainers.forEach(id => {
    const container = document.getElementById(id);
    if (!container) return;

    // Crear un iframe para aislar el contexto del anuncio (atOptions es global)
    const iframe = document.createElement('iframe');
    iframe.style.width = '300px';
    iframe.style.height = '250px';
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.scrolling = 'no';

    container.appendChild(iframe);

    // Escribir el script del anuncio dentro del iframe
    const doc = iframe.contentWindow || iframe.contentDocument.document || iframe.contentDocument;
    doc.document.open();
    doc.document.write(`
      <html>
        <body style="margin:0;padding:0;display:flex;justify-content:center;align-items:center;">
          <script type="text/javascript">
            atOptions = {
              'key' : '5db2e541f4eeb65e0b1a7f8737d508e2',
              'format' : 'iframe',
              'height' : 250,
              'width' : 300,
              'params' : {}
            };
          </script>
          <script type="text/javascript" src="https://www.highperformanceformat.com/5db2e541f4eeb65e0b1a7f8737d508e2/invoke.js"></script>
        </body>
      </html>
    `);
    doc.document.close();
  });
}

// Función de filtrado
function filterAnime() {
  let filtered = data;

  // Filtrar por tipo (Serie/Película)
  if (currentFilter !== 'all') {
    filtered = filtered.filter(item => item.place === currentFilter);
  }

  // Filtrar por búsqueda (busca en título, descripción y tipo)
  if (currentSearchTerm) {
    filtered = filtered.filter(item => {
      const searchLower = currentSearchTerm.toLowerCase();
      const fullTitle = `${item.title} ${item.title2}`.toLowerCase();
      const description = item.description.toLowerCase();
      const place = item.place.toLowerCase();

      // Buscar en título, descripción o tipo
      return fullTitle.includes(searchLower) ||
        description.includes(searchLower) ||
        place.includes(searchLower);
    });
  }

  renderGrid(filtered);
}

// Inicializar búsqueda
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearch');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchTerm = e.target.value;
      filterAnime();

      // Mostrar/ocultar botón de limpiar
      if (clearBtn) {
        clearBtn.style.display = currentSearchTerm ? 'flex' : 'none';
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        currentSearchTerm = '';
        clearBtn.style.display = 'none';
        filterAnime();
        searchInput.focus();
      }
    });
  }
}

// Inicializar filtros
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remover clase active de todos los botones
      filterBtns.forEach(b => b.classList.remove('active'));

      // Agregar clase active al botón clickeado
      btn.classList.add('active');

      // Actualizar filtro actual
      currentFilter = btn.getAttribute('data-filter');

      // Aplicar filtro
      filterAnime();
    });
  });
}

// Conectar la lupa del nav con el buscador
function initNavSearch() {
  const searchIcon = document.querySelector('nav .svg-container:first-of-type');
  const searchInput = document.getElementById('searchInput');

  if (searchIcon && searchInput) {
    searchIcon.addEventListener('click', () => {
      // Hacer scroll al buscador
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Enfocar el input después de un pequeño delay
      setTimeout(() => {
        searchInput.focus();
      }, 500);
    });
  }
}

// Iniciar todo
renderGrid();
initSearch();
initFilters();
initNavSearch();

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

// ========== CARRUSEL DE ANIME ==========
class AnimeCarousel {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll('.carousel-slide');
    this.dots = document.querySelectorAll('.indicator-dot');
    this.prevBtn = document.querySelector('.carousel-control.prev');
    this.nextBtn = document.querySelector('.carousel-control.next');
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000; // 5 segundos

    if (this.slides.length === 0) return;

    this.init();
  }

  init() {
    // Event listeners para botones de navegación
    this.prevBtn?.addEventListener('click', () => this.prevSlide());
    this.nextBtn?.addEventListener('click', () => this.nextSlide());

    // Event listeners para indicadores
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    const carouselContainer = document.querySelector('.carousel-container');

    carouselContainer?.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselContainer?.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });

    const handleSwipe = () => {
      const swipeThreshold = 50;
      if (touchStartX - touchEndX > swipeThreshold) {
        this.nextSlide();
      } else if (touchEndX - touchStartX > swipeThreshold) {
        this.prevSlide();
      }
    };

    this.handleSwipe = handleSwipe;

    // Auto-play
    this.startAutoPlay();

    // Pausar auto-play al hacer hover
    carouselContainer?.addEventListener('mouseenter', () => this.stopAutoPlay());
    carouselContainer?.addEventListener('mouseleave', () => this.startAutoPlay());
  }

  goToSlide(index) {
    // Remover clase active de slide actual
    this.slides[this.currentSlide]?.classList.remove('active');
    this.dots[this.currentSlide]?.classList.remove('active');

    // Actualizar índice
    this.currentSlide = index;

    // Agregar clase active al nuevo slide
    this.slides[this.currentSlide]?.classList.add('active');
    this.dots[this.currentSlide]?.classList.add('active');

    // Reiniciar auto-play
    this.resetAutoPlay();
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prevIndex);
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}

// Inicializar carrusel cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new AnimeCarousel();
  });
} else {
  new AnimeCarousel();
}

// Inicializar el modal de Brave (vacío para evitar errores)
const braveModal = {
  init: () => {
    // No hacer nada - el modal está desactivado
  }
};

// Exponer método global para compatibilidad
window.BraveModal = braveModal;

// Agregar animación fadeOut al CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;
document.head.appendChild(style);