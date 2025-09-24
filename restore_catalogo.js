const fs = require('fs');

let catalogoContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Catálogo de Anime - StudioOtaku</title>
  <link rel="icon" type="image/x-icon" href="../img/demon-slayer.ico">
  <script>
    window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };
  </script>
  <script defer src="/_vercel/speed-insights/script.js"></script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #0f0f23 0%, #2d1b69 50%, #0f0f23 100%);
      color: #fff;
      min-height: 100vh;
    }

    /* Header */
    .header {
      background: rgba(0, 0, 0, 0.9);
      padding: 1rem 2rem;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      backdrop-filter: blur(10px);
      border-bottom: 2px solid #ff5cad;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 1.8rem;
      font-weight: bold;
      background: linear-gradient(45deg, #ff5cad, #ff8a80);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .search-bar {
      display: flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 25px;
      padding: 0.5rem 1rem;
      border: 1px solid rgba(255, 92, 173, 0.3);
    }

    .search-bar input {
      background: transparent;
      border: none;
      color: #fff;
      padding: 0.5rem;
      font-size: 1rem;
      width: 300px;
      outline: none;
    }

    .search-bar input::placeholder {
      color: #b0b0b0;
    }

    .search-bar button {
      background: linear-gradient(45deg, #ff5cad, #ff8a80);
      border: none;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      cursor: pointer;
      margin-left: 0.5rem;
      transition: all 0.3s ease;
    }

    .search-bar button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255, 92, 173, 0.3);
    }

    .user-actions {
      display: flex;
      gap: 1rem;
    }

    .auth-btn {
      background: linear-gradient(45deg, #ff5cad, #ff8a80);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      text-decoration: none;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-block;
    }

    .auth-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255, 92, 173, 0.3);
    }

    /* Main Container */
    .main-container {
      display: flex;
      margin-top: 80px;
      min-height: calc(100vh - 80px);
    }

    /* Left Sidebar */
    .left-sidebar {
      width: 250px;
      background: rgba(0, 0, 0, 0.3);
      padding: 2rem 1rem;
      border-right: 1px solid rgba(255, 92, 173, 0.2);
    }

    .sidebar-nav {
      list-style: none;
    }

    .sidebar-nav li {
      margin-bottom: 1rem;
    }

    .sidebar-nav a {
      color: #b0b0b0;
      text-decoration: none;
      padding: 0.8rem 1rem;
      border-radius: 10px;
      display: block;
      transition: all 0.3s ease;
    }

    .sidebar-nav a:hover,
    .sidebar-nav a.active {
      background: linear-gradient(45deg, #ff5cad, #ff8a80);
      color: white;
      transform: translateX(5px);
    }

    /* Main Content */
    .main-content {
      flex: 1;
      padding: 2rem;
      background: rgba(0, 0, 0, 0.1);
    }

    .section-title {
      font-size: 2rem;
      margin-bottom: 2rem;
      background: linear-gradient(45deg, #ff5cad, #ff8a80);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-align: center;
    }

    /* Anime Grid */
    .anime-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
      padding: 1rem 0;
    }

    .anime-card {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 15px;
      overflow: hidden;
      border: 1px solid rgba(255, 92, 173, 0.2);
      transition: all 0.3s ease;
      cursor: pointer;
      position: relative;
    }

    .anime-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 40px rgba(255, 92, 173, 0.2);
      border-color: rgba(255, 92, 173, 0.5);
    }

    .anime-card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .anime-info {
      padding: 1.5rem;
    }

    .anime-info h3 {
      color: #fff;
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
    }

    .anime-info p {
      color: #b0b0b0;
      font-size: 0.9rem;
      line-height: 1.4;
      margin-bottom: 1rem;
    }

    .anime-status {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
    }

    .status-badge {
      background: linear-gradient(45deg, #ff5cad, #ff8a80);
      color: white;
      padding: 0.3rem 0.8rem;
      border-radius: 15px;
      font-size: 0.8rem;
      font-weight: bold;
    }

    .anime-rating {
      color: #ffd700;
      font-weight: bold;
    }

    .anime-link {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      text-decoration: none;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .main-container {
        flex-direction: column;
      }
      
      .left-sidebar {
        width: 100%;
        padding: 1rem;
      }
      
      .sidebar-nav {
        display: flex;
        overflow-x: auto;
        gap: 1rem;
      }
      
      .sidebar-nav li {
        margin-bottom: 0;
        white-space: nowrap;
      }
      
      .search-bar input {
        width: 200px;
      }
      
      .user-actions {
        flex-wrap: wrap;
      }
      
      .anime-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1rem;
      }
    }

    @media (max-width: 480px) {
      .header {
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
      }
      
      .search-bar input {
        width: 150px;
      }
      
      .anime-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <!-- Encabezado -->
  <div class="header">
    <div class="logo">🧧StudioOtaku</div>
    <div class="search-bar">
      <input type="text" placeholder="Buscar anime..." id="search-input">
      <button onclick="buscarAnime()">🔍</button>
    </div>
    <div class="user-actions">
      <button class="auth-btn">🔒 Login</button>
      <button class="auth-btn">✎ Registro</button>
      <a href="../index.html" class="auth-btn">🏠 Inicio</a>
    </div>
  </div>

  <div class="main-container">
    <!-- Barra lateral izquierda -->
    <div class="left-sidebar">
      <ul class="sidebar-nav">
        <li><a href="../index.html">🏠 Inicio</a></li>
        <li><a href="#" class="active">🎌 Anime</a></li>
        <li><a href="#peliculas">🎬 Películas</a></li>
        <li><a href="#generos">📚 Géneros</a></li>
        <li><a href="#estrenos">⭐ Estrenos</a></li>
        <li><a href="#top">🏆 Top Anime</a></li>
        <li><a href="#live-action">🎭 Live Action</a></li>
        <li><a href="#programacion">📺 Programación</a></li>
        <li><a href="https://exe.io/ANIMETV" target="_blank">📱 APK</a></li>
      </ul>
    </div>

    <!-- Contenido principal -->
    <div class="main-content">
      <h2 class="section-title">🎌 Catálogo de Anime</h2>
      <div class="anime-grid">`;

// Agregar todas las cards de anime con rutas corregidas
const animeCards = [
  { name: 'attack-on-titan', title: 'Attack on Titan', img: 'Attack on Titan S1.jpg', desc: 'La humanidad lucha por sobrevivir contra los titanes gigantes.', status: 'Completo', rating: '9.0' },
  { name: 'demon-slayer', title: 'Kimetsu no Yaiba', img: 'Kimetsu No Yaiba temporada 1.png', desc: 'Tanjiro se convierte en cazador de demonios para salvar a su hermana.', status: 'Completo', rating: '8.7' },
  { name: 'jujutsu-kaisen', title: 'Jujutsu Kaisen', img: 'Jujutsu Kaisen S1.jpg', desc: 'Yuji Itadori se une al mundo de la hechicería para combatir maldiciones.', status: 'En emisión', rating: '8.6' },
  { name: 'my-hero-academia', title: 'My Hero Academia', img: 'BokunoHeroAcademia S1.png', desc: 'Izuku Midoriya sueña con convertirse en el héroe número uno.', status: 'En emisión', rating: '8.5' },
  { name: 'one-piece', title: 'One Piece', img: 'One Piece East Blue.png', desc: 'Monkey D. Luffy busca el tesoro más grande del mundo.', status: 'En emisión', rating: '9.1' },
  { name: 'naruto', title: 'Naruto', img: 'Naruto Classic.jpg', desc: 'Un ninja adolescente busca reconocimiento y sueña con ser Hokage.', status: 'Completo', rating: '8.4' },
  { name: 'dragon-ball', title: 'Dragon Ball', img: 'Dragon Ball Z.jpg', desc: 'Goku y sus amigos protegen la Tierra de poderosos enemigos.', status: 'Completo', rating: '8.8' },
  { name: 'tokyo-ghoul', title: 'Tokyo Ghoul', img: 'Tokyo Ghoul S1.jpg', desc: 'Ken Kaneki se convierte en un ghoul y lucha por su humanidad.', status: 'Completo', rating: '7.8' },
  { name: 'one-punch-man', title: 'One Punch Man', img: 'One Punch Man S1.jpg', desc: 'Saitama es un héroe que puede vencer a cualquier enemigo de un golpe.', status: 'En emisión', rating: '8.9' },
  { name: 'mob-psycho-100', title: 'Mob Psycho 100', img: 'Mob Psycho 100 S1.jpg', desc: 'Un estudiante con poderes psíquicos intenta vivir una vida normal.', status: 'Completo', rating: '8.8' },
  { name: 'solo-leveling', title: 'Solo Leveling', img: 'Solo Leveling season 1.jpg', desc: 'Sung Jin-Woo evoluciona de ser el cazador más débil al más fuerte.', status: 'En emisión', rating: '8.9' },
  { name: 'chainsaw-man', title: 'Chainsaw Man', img: 'Chainsaw Man S1.jpg', desc: 'Denji se fusiona con su demonio mascota para convertirse en Chainsaw Man.', status: 'En emisión', rating: '8.4' }
];

animeCards.forEach(anime => {
  catalogoContent += `
        <div class="anime-card">
          <img src="../img/${anime.img}" alt="${anime.title}">
          <div class="anime-info">
            <h3>${anime.title}</h3>
            <p>${anime.desc}</p>
            <div class="anime-status">
              <span class="status-badge">${anime.status}</span>
              <span class="anime-rating">⭐ ${anime.rating}</span>
            </div>
          </div>
          <a href="../public/anime/${anime.name}/${anime.name}.html" class="anime-link"></a>
        </div>`;
});

catalogoContent += `
      </div>
    </div>
  </div>

  <script>
    // Función de búsqueda
    function buscarAnime() {
      const searchTerm = document.getElementById('search-input').value.toLowerCase();
      const animeCards = document.querySelectorAll('.anime-card');
      
      animeCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    }
    
    // Búsqueda en tiempo real
    document.getElementById('search-input').addEventListener('input', buscarAnime);
    
    // Navegación del sidebar
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
      link.addEventListener('click', function(e) {
        if (!this.href.includes('http') && !this.href.includes('../')) {
          e.preventDefault();
          document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
          this.classList.add('active');
        }
      });
    });

    // Hacer las tarjetas clickeables
    document.querySelectorAll('.anime-card').forEach(card => {
      card.addEventListener('click', function() {
        const link = this.querySelector('.anime-link');
        if (link) {
          window.location.href = link.href;
        }
      });
    });
  </script>
</body>
</html>`;

fs.writeFileSync('C:\\Users\\Admin\\Desktop\\Mundo-otaku-latino\\html\\catalogo.html', catalogoContent, 'utf8');
console.log('✅ Catálogo restaurado con estructura original y rutas corregidas!');
