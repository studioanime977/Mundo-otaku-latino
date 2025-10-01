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

// Función para remover botones de descarga de un archivo HTML
function removeDownloadButton(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Buscar y remover el botón de descarga con clase "download-button"
    const downloadButtonRegex = /<a[^>]*class="download-button"[^>]*>.*?<\/a>/g;
    if (downloadButtonRegex.test(content)) {
      content = content.replace(downloadButtonRegex, '');
      modified = true;
      console.log(`✅ Removido botón de descarga de: ${path.basename(filePath)}`);
    }
    
    // También buscar y remover cualquier botón con texto "Descargar" o "⬇️ Descargar"
    const downloadTextRegex = /<a[^>]*>[\s]*⬇️[\s]*Descargar[\s]*<\/a>/g;
    if (downloadTextRegex.test(content)) {
      content = content.replace(downloadTextRegex, '');
      modified = true;
      console.log(`✅ Removido botón de descarga (por texto) de: ${path.basename(filePath)}`);
    }
    
    // Buscar y remover estilos CSS relacionados con download-button
    const cssRegex = /\.download-button\s*\{[^}]*\}/g;
    if (cssRegex.test(content)) {
      content = content.replace(cssRegex, '');
      modified = true;
      console.log(`✅ Removidos estilos CSS de botón de descarga de: ${path.basename(filePath)}`);
    }
    
    // Limpiar líneas vacías múltiples que puedan haber quedado
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    } else {
      console.log(`⏭️ Sin botones de descarga encontrados en: ${path.basename(filePath)}`);
      return false;
    }
    
  } catch (error) {
    console.error(`❌ Error procesando ${filePath}:`, error.message);
    return false;
  }
}

// Función principal
function main() {
  console.log('🚀 Iniciando proceso de remoción de botones de descarga de páginas de temporadas...\n');
  
  const animeDir = path.join(__dirname, 'public', 'anime');
  
  if (!fs.existsSync(animeDir)) {
    console.error('❌ No se encontró el directorio de anime:', animeDir);
    return;
  }
  
  const seasonFiles = findSeasonFiles(animeDir);
  console.log(`📁 Encontrados ${seasonFiles.length} archivos de temporadas\n`);
  
  let removed = 0;
  let skipped = 0;
  
  for (const file of seasonFiles) {
    if (removeDownloadButton(file)) {
      removed++;
    } else {
      skipped++;
    }
  }
  
  console.log('\n📊 Resumen:');
  console.log(`✅ Archivos con botones removidos: ${removed}`);
  console.log(`⏭️ Archivos sin botones (omitidos): ${skipped}`);
  console.log(`📄 Total procesados: ${seasonFiles.length}`);
  console.log('\n🎉 ¡Proceso de remoción completado!');
}

// Ejecutar el script
main();