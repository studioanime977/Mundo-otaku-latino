const fs = require('fs');
const path = require('path');

// Mapa de enlaces de descarga por anime y temporada
const downloadLinks = {
  'kimetsu-no-yaiba': {
    'temporada-1': 'https://exe.io/KimetsuNoYaibaS1',
    'temporada-2': 'https://exe.io/tem2KimetsunoYaiba',
    'temporada-3': 'https://exe.io/kimetsuS3',
    'temporada-4': 'https://exe.io/kimetsuS4',
    'tren-infinito': 'https://exe.io/KimetsunoYaibaTrenInfino',
    'entrenamiento-pilar': 'https://exe.io/entrenamientopilar',
    'castillo-infinito': 'https://exe.io/SUBTCastillofullhd',
    'rugido-victoria': 'https://exe.io/KimetsuNoYaibarugidodevictoria'
  },
  'nanatsu-no-taizai': {
    'temporada-1': 'https://exe.io/NanatsunotaizaiTEM1',
    'temporada-2': 'https://exe.io/NanatsunotaizaiTEM2',
    'temporada-3': 'https://exe.io/NanatsunotaizaiTEM3',
    'temporada-4': 'https://exe.io/NanatsunotaizaiTEM4',
    'temporada-5': 'https://exe.io/NanatsunotaizaiTEM5',
    'prisioneros-cielo': 'https://exe.io/NanatsuPrisionerosdelCielo',
    'maldicion-luz': 'https://exe.io/7pecadosLaMaldiciondelaLuz'
  },
  're-zero': {
    'season1': 'https://exe.io/ReZeroS1',
    'season2': 'https://exe.io/ReZeroS2',
    'season3': 'https://exe.io/ReZeroS3'
  },
  'solo-leveling': {
    'temporada-1': 'https://exe.io/sololevelingS1',
    'temporada-2': 'https://exe.io/SoloLevelingS2'
  },
  'sakamoto-days': {
    'temporada-1': 'https://exe.io/sakamotodays',
    'temporada-2': 'https://exe.io/sakamotodaysS2'
  },
  'classroom-of-the-elite': {
    'temporada-1': 'https://exe.io/classroomoftheelites1',
    'temporada-2': 'https://exe.io/classroomoftheelites2'
  },
  'mashle': {
    'temporada-1': 'https://exe.io/Mashletemporada1',
    'temporada-2': 'https://exe.io/Mashletem2'
  },
  'boku-no-hero-academia': {
    'temporada-1': 'https://exe.io/BokunoHeroAcademiaS1'
  },
  'horimiya': {
    'temporada-1': 'https://exe.io/HorimiyaS1',
    'temporada-2': 'https://exe.io/HorimiyaS2'
  },
  'mushoku-tensei': {
    'temporada-1': 'https://exe.io/MushokuTenseitem1',
    'temporada-2': 'https://exe.io/MushokuTenseiS2'
  },
  'bungo-stray-dogs': {
    'temporada-1': 'https://exe.io/BungouStrayDogsS1',
    'temporada-2': 'https://exe.io/BungouStrayDogsS2',
    'temporada-3': 'https://exe.io/BungouStrayDogsS3',
    'temporada-4': 'https://exe.io/BungouStrayDogsS4'
  },
  'dragon-ball-heroes': {
    'temporada-1': 'https://exe.io/DRAGONBALLHEROES'
  },
  'even-given-the-worthless': {
    'temporada-1': 'https://exe.io/EvenGiventheWorthlessS1'
  },
  'sword-art-online': {
    'progressive-movie': 'https://exe.io/SwordArtOnlineProgressiveMovie'
  },
  'kono-oto-tomare': {
    'temporada-1': 'https://exe.io/KonoototomareS1'
  },
  'papa-no-iukoto-o-kikinasai': {
    'temporada-1': 'https://exe.io/PapanoIukotooKikinasai'
  },
  'danmachi': {
    'temporada-1': 'https://exe.io/DanMachitem1'
  },
  'urusei-yatsura': {
    'temporada-1': 'https://exe.io/UruseiYatsuratemporada1'
  }
};

// Enlace genérico para animes que no tienen un enlace específico
const genericDownloadLink = '/public/html/descargas.html';

// Función para agregar botón de descarga a una página
function addDownloadButton(htmlContent, animeDir, seasonFile) {
  // Extraer el nombre del anime y la temporada del path
  const animeName = path.basename(animeDir);
  const seasonName = path.basename(seasonFile, '.html');
  
  // Buscar si existe un enlace específico para este anime y temporada
  let downloadLink = genericDownloadLink;
  if (downloadLinks[animeName] && downloadLinks[animeName][seasonName]) {
    downloadLink = downloadLinks[animeName][seasonName];
  }
  
  // Verificar si ya existe un botón de descarga
  if (htmlContent.includes('class="download-button"')) {
    // Actualizar el enlace existente
    return htmlContent.replace(
      /<a[^>]*class="download-button"[^>]*>[^<]*<\/a>/g,
      `<a href="${downloadLink}" class="download-button" target="_blank">Descargar</a>`
    );
  }
  
  // Agregar CSS para el botón de descarga si no existe
  if (!htmlContent.includes('.download-button')) {
    const styleTag = htmlContent.match(/<style[^>]*>([\s\S]*?)<\/style>/);
    if (styleTag) {
      const newStyle = `
    .download-button {
      background-color: #e74c3c;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      font-weight: bold;
      text-decoration: none;
      display: inline-block;
      margin: 10px 0;
      transition: background-color 0.3s, transform 0.2s;
    }
    
    .download-button:hover {
      background-color: #c0392b;
      transform: translateY(-2px);
    }
    
    .player-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }`;
      
      htmlContent = htmlContent.replace(styleTag[0], styleTag[0].replace('</style>', `${newStyle}\n</style>`));
    }
  }
  
  // Buscar la sección de opciones del reproductor para agregar el botón
  if (htmlContent.includes('class="player-options"')) {
    // Agregar el botón a las opciones existentes
    return htmlContent.replace(
      /<div class="player-options">([\s\S]*?)<\/div>/,
      `<div class="player-options">$1<a href="${downloadLink}" class="download-button" target="_blank">Descargar</a></div>`
    );
  } else {
    // Crear una nueva sección de opciones del reproductor con el botón
    return htmlContent.replace(
      /<div class="video-container">/,
      `<div class="player-options">
        <div class="player-selector">
          <button onclick="switchPlayer('fembed')" class="player-button">Fembed</button>
          <button onclick="switchPlayer('streamtape')" class="player-button">Streamtape</button>
        </div>
        <a href="${downloadLink}" class="download-button" target="_blank">Descargar</a>
      </div>
      <div class="video-container">`
    );
  }
}

// Función para agregar un enlace a la página de descargas en el menú
function addDownloadPageLink(htmlContent) {
  // Verificar si ya existe un enlace a la página de descargas
  if (htmlContent.includes('href="/public/html/descargas.html"')) {
    return htmlContent;
  }
  
  // Buscar la sección del menú para agregar el enlace
  if (htmlContent.includes('<a href="../../index.html" class="logo">')) {
    return htmlContent.replace(
      /<a href="\.\.\/\.\.\/index\.html" class="logo">/,
      `<a href="../../index.html" class="logo">StudioOtaku</a>
      <div class="nav-links">
        <a href="/public/html/catalogo.html">Catálogo</a>
        <a href="/public/html/descargas.html">Descargas</a>
      </div>`
    );
  }
  
  return htmlContent;
}

// Función principal para procesar todos los archivos
async function updateSeasonPages() {
  const baseDir = path.join(__dirname, 'public', 'anime');
  const animeDirs = fs.readdirSync(baseDir).filter(file => 
    fs.statSync(path.join(baseDir, file)).isDirectory()
  );
  
  let updatedCount = 0;
  
  for (const animeDir of animeDirs) {
    const animePath = path.join(baseDir, animeDir);
    const files = fs.readdirSync(animePath);
    
    // Filtrar archivos HTML que parezcan páginas de temporada
    const seasonFiles = files.filter(file => 
      file.endsWith('.html') && 
      (file.includes('temporada') || file.includes('season') || file.includes('movie'))
    );
    
    for (const seasonFile of seasonFiles) {
      const filePath = path.join(animePath, seasonFile);
      let htmlContent = fs.readFileSync(filePath, 'utf8');
      
      // Agregar botón de descarga
      const updatedContent = addDownloadButton(htmlContent, animeDir, seasonFile);
      
      // Agregar enlace a la página de descargas en el menú
      const finalContent = addDownloadPageLink(updatedContent);
      
      // Guardar los cambios si se hicieron modificaciones
      if (finalContent !== htmlContent) {
        fs.writeFileSync(filePath, finalContent, 'utf8');
        updatedCount++;
        console.log(`Actualizado: ${filePath}`);
      }
    }
  }
  
  console.log(`Proceso completado. Se actualizaron ${updatedCount} páginas.`);
}

// Ejecutar la función principal
updateSeasonPages().catch(err => console.error('Error:', err));