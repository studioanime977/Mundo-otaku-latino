const fs = require('fs');
const path = require('path');

// Función para buscar todos los archivos HTML de temporadas
function findSeasonFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      findSeasonFiles(fullPath, files);
    } else if (item.endsWith('.html') && (item.includes('temporada') || item.includes('season') || item.includes('movie'))) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Función para añadir botón de descarga a una página
function addDownloadButton(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Verificar si ya tiene un botón de descarga
    if (content.includes('download-button')) {
      console.log(`✓ ${filePath} ya tiene botón de descarga`);
      return false;
    }
    
    // Buscar la sección de player-options y añadir el botón
    const playerOptionsRegex = /(<div class="player-options">[\s\S]*?)(<\/div>)/;
    const match = content.match(playerOptionsRegex);
    
    if (match) {
      const downloadButton = '\n        <a href="/public/html/descargas.html" class="download-button" target="_blank">⬇️ Descargar</a>';
      const newPlayerOptions = match[1] + downloadButton + '\n      ' + match[2];
      content = content.replace(playerOptionsRegex, newPlayerOptions);
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Botón de descarga añadido a: ${filePath}`);
      return true;
    } else {
      console.log(`⚠️ No se encontró player-options en: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error procesando ${filePath}:`, error.message);
    return false;
  }
}

// Función principal
function main() {
  console.log('🚀 Iniciando proceso de añadir botones de descarga a páginas de temporadas...\n');
  
  const animeDir = path.join(__dirname, 'public', 'anime');
  
  if (!fs.existsSync(animeDir)) {
    console.error('❌ No se encontró el directorio de anime:', animeDir);
    return;
  }
  
  const seasonFiles = findSeasonFiles(animeDir);
  console.log(`📁 Encontrados ${seasonFiles.length} archivos de temporadas\n`);
  
  let updated = 0;
  let skipped = 0;
  
  for (const file of seasonFiles) {
    if (addDownloadButton(file)) {
      updated++;
    } else {
      skipped++;
    }
  }
  
  console.log('\n📊 Resumen:');
  console.log(`✅ Archivos actualizados: ${updated}`);
  console.log(`⏭️ Archivos omitidos: ${skipped}`);
  console.log(`📄 Total procesados: ${seasonFiles.length}`);
  console.log('\n🎉 ¡Proceso completado!');
}

// Ejecutar el script
main();