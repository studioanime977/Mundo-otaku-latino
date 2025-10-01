const fs = require('fs');
const path = require('path');

// Directorio base de los archivos de anime
const animeDir = path.join(__dirname, 'public', 'anime');

// Función para procesar un archivo HTML
function processHtmlFile(filePath) {
  try {
    // Leer el contenido del archivo
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Verificar si ya tiene el enlace al CSS
    if (!content.includes('href="../../../css/anime.css"') && !content.includes('href="../../css/anime.css"')) {
      // Determinar la ruta relativa correcta según la profundidad del archivo
      let cssPath = '';
      
      // Si es un archivo de temporada (está en una subcarpeta)
      if (filePath.includes('season') || filePath.includes('temporada')) {
        cssPath = '../../../css/anime.css';
      } else {
        // Es un archivo principal de anime
        cssPath = '../../css/anime.css';
      }
      
      // Reemplazar cualquier etiqueta <style> interna con el enlace al CSS externo
      const styleRegex = /<style>[\s\S]*?<\/style>/;
      if (content.match(styleRegex)) {
        content = content.replace(styleRegex, `<link rel="stylesheet" href="${cssPath}">`);
      } else {
        // Si no hay etiqueta style, agregar el enlace después del favicon
        const faviconRegex = /<link rel="icon".*?>/;
        if (content.match(faviconRegex)) {
          content = content.replace(faviconRegex, match => `${match}\n  <link rel="stylesheet" href="${cssPath}">`);
        } else {
          // Si no hay favicon, agregar después del título
          const titleRegex = /<\/title>/;
          content = content.replace(titleRegex, match => `${match}\n  <link rel="stylesheet" href="${cssPath}">`);
        }
      }
      
      // Guardar el archivo modificado
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Actualizado: ${filePath}`);
    } else {
      console.log(`✓ Ya está actualizado: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error procesando ${filePath}:`, error.message);
  }
}

// Función para recorrer recursivamente los directorios
function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stats = fs.statSync(itemPath);
    
    if (stats.isDirectory()) {
      // Es un directorio, procesarlo recursivamente
      processDirectory(itemPath);
    } else if (stats.isFile() && item.endsWith('.html')) {
      // Es un archivo HTML, procesarlo
      processHtmlFile(itemPath);
    }
  }
}

// Iniciar el procesamiento
console.log('🚀 Iniciando actualización de archivos HTML de anime...');
processDirectory(animeDir);
console.log('✨ Proceso completado.');