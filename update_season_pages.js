const fs = require('fs');
const path = require('path');

// Directorio base de anime
const animeDir = path.join(__dirname, 'public', 'anime');

// Plantilla HTML para las páginas de temporadas
function generateTemplate(animeTitle, seasonTitle, episodes) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${animeTitle} - ${seasonTitle} - StudioOtaku</title>
  
  <link rel="stylesheet" href="../../../css/temporadas.css">
</head>
<body>

  <header class="header">
    <a href="../../../index.html" class="logo">StudioOtaku</a>
    <a href="../../../public/html/catalogo.html" class="back-btn">🏠 Inicio</a>
  </header>

  <main class="main-content">
    <a href="${animeTitle.toLowerCase().replace(/\s+/g, '-')}.html" class="back-btn">← Volver a ${animeTitle}</a>

    <div class="title-container">
        <h1 class="season-title">${animeTitle} - ${seasonTitle}</h1>
        <h2 class="episode-title" id="current-episode-title">Episodio 1</h2>
    </div>

    <div class="contenedor-video">
      <div class="player-options">
        <button id="opcion1-btn" class="player-btn active" onclick="switchPlayer('opcion1')">OPCIÓN 1</button>
        <button id="opcion2-btn" class="player-btn" onclick="switchPlayer('opcion2')">OPCIÓN 2</button>
        <button id="opcion3-btn" class="player-btn" onclick="switchPlayer('opcion3')">OPCIÓN 3</button>
        <button id="opcion4-btn" class="player-btn" onclick="switchPlayer('opcion4')">OPCIÓN 4</button>
      </div>
      <div class="reproductor-video">
        <div id="opcion1-player" class="player-container active">
          <iframe src="" allowfullscreen></iframe>
        </div>
        <div id="opcion2-player" class="player-container">
          <iframe src="" allowfullscreen></iframe>
        </div>
        <div id="opcion3-player" class="player-container">
          <iframe src="" allowfullscreen></iframe>
        </div>
        <div id="opcion4-player" class="player-container">
          <iframe src="" allowfullscreen></iframe>
        </div>
      </div>
    </div>

    <div class="episodes-container">
        <h3 style="text-align:center; margin-bottom: 1.5rem; font-size: 1.8rem;">Episodios</h3>
        <div class="episodes-grid" id="episodes-grid">
            <!-- Los episodios se generarán con JavaScript -->
        </div>
    </div>
  </main>

  <script>
    // Preservar los datos de episodios existentes o crear una estructura básica
    ${episodes}

    // Generar botones de episodios
    const episodesGrid = document.getElementById('episodes-grid');
    episodes.forEach(episode => {
      const episodeBtn = document.createElement('div');
      episodeBtn.className = 'episode-btn';
      episodeBtn.textContent = \`Ep \${episode.num}\`;
      episodeBtn.onclick = () => loadEpisode(episode);
      episodesGrid.appendChild(episodeBtn);
    });

    // Cargar episodio
    function loadEpisode(episode) {
      document.querySelectorAll('.episode-btn').forEach((btn, index) => {
        btn.classList.toggle('active', index === episode.num);
      });
      
      document.getElementById('current-episode-title').textContent = \`Episodio \${episode.num}\${episode.title ? ': ' + episode.title : ''}\`;
      
      document.querySelector('#opcion1-player iframe').src = episode.op1 || '';
      document.querySelector('#opcion2-player iframe').src = episode.op2 || '';
      document.querySelector('#opcion3-player iframe').src = episode.op3 || '';
      document.querySelector('#opcion4-player iframe').src = episode.op4 || '';
      
      switchPlayer('opcion1');
    }

    // Cambiar reproductor
    function switchPlayer(option) {
      document.querySelectorAll('.player-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      document.getElementById(\`\${option}-btn\`).classList.add('active');
      
      document.querySelectorAll('.player-container').forEach(container => {
        container.classList.remove('active');
      });
      document.getElementById(\`\${option}-player\`).classList.add('active');
    }

    // Cargar el primer episodio por defecto
    if (episodes.length > 0) {
      loadEpisode(episodes[0]);
    }
  </script>
</body>
</html>`;
}

// Función para extraer los datos de episodios del archivo HTML existente
function extractEpisodesData(fileContent) {
  const episodesMatch = fileContent.match(/const episodes = \[([\s\S]*?)\];/);
  if (episodesMatch && episodesMatch[1]) {
    return `const episodes = [${episodesMatch[1]}];`;
  }
  
  // Si no se encuentra, crear una estructura básica
  return `const episodes = [
    { num: 1, title: "Episodio 1", op1: "", op2: "", op3: "", op4: "" }
  ];`;
}

// Función para obtener el título del anime desde el nombre del directorio
function getAnimeTitle(dirName) {
  return dirName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Función para obtener el título de la temporada desde el nombre del archivo
function getSeasonTitle(fileName) {
  if (fileName.includes('temporada-')) {
    const seasonNumber = fileName.match(/temporada-(\d+)/)[1];
    return `Temporada ${seasonNumber}`;
  } else if (fileName.includes('season')) {
    const seasonNumber = fileName.match(/season(\d*)/)[1] || '1';
    return `Temporada ${seasonNumber}`;
  }
  return 'Temporada';
}

// Función para actualizar un archivo HTML de temporada
function updateSeasonPage(filePath) {
  try {
    // Leer el archivo existente
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Extraer los datos de episodios
    const episodesData = extractEpisodesData(fileContent);
    
    // Obtener el título del anime y la temporada
    const dirParts = path.dirname(filePath).split(path.sep);
    const animeDir = dirParts[dirParts.length - 1];
    const animeTitle = getAnimeTitle(animeDir);
    const seasonTitle = getSeasonTitle(path.basename(filePath));
    
    // Generar el nuevo contenido HTML
    const newContent = generateTemplate(animeTitle, seasonTitle, episodesData);
    
    // Escribir el nuevo contenido al archivo
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Actualizado: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error al actualizar ${filePath}:`, error);
    return false;
  }
}

// Función para buscar y actualizar todas las páginas de temporadas
function updateAllSeasonPages() {
  // Obtener todos los directorios de anime
  const animeDirs = fs.readdirSync(animeDir).filter(dir => {
    return fs.statSync(path.join(animeDir, dir)).isDirectory();
  });
  
  let totalUpdated = 0;
  let totalFailed = 0;
  
  // Procesar cada directorio de anime
  animeDirs.forEach(dir => {
    const animePath = path.join(animeDir, dir);
    try {
      const files = fs.readdirSync(animePath);
      
      // Filtrar archivos de temporadas
      const seasonFiles = files.filter(file => {
        return (file.includes('temporada-') || file.includes('season')) && file.endsWith('.html');
      });
      
      // Actualizar cada archivo de temporada
      seasonFiles.forEach(file => {
        const filePath = path.join(animePath, file);
        const success = updateSeasonPage(filePath);
        if (success) {
          totalUpdated++;
        } else {
          totalFailed++;
        }
      });
    } catch (error) {
      console.error(`Error al procesar directorio ${animePath}:`, error);
    }
  });
  
  console.log(`\nResumen:`);
  console.log(`Total de páginas actualizadas: ${totalUpdated}`);
  console.log(`Total de páginas con errores: ${totalFailed}`);
}

// Ejecutar la actualización
updateAllSeasonPages();