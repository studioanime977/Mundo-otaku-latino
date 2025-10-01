const fs = require('fs');
const path = require('path');

// Función para encontrar todas las páginas principales de anime
function findMainAnimePages(dir, animePages = []) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            // Buscar recursivamente en subdirectorios
            findMainAnimePages(fullPath, animePages);
        } else if (stat.isFile() && item.endsWith('.html')) {
            // Verificar si es una página principal de anime (no temporada ni película)
            const fileName = path.basename(item, '.html');
            const dirName = path.basename(path.dirname(fullPath));
            
            // Si el nombre del archivo coincide con el nombre del directorio, es la página principal
            if (fileName === dirName || fileName.includes(dirName)) {
                animePages.push(fullPath);
            }
        }
    }
    
    return animePages;
}

// Función para agregar botón de descarga a una página
function addDownloadButtonToMainPage(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Verificar si ya existe un botón de descarga general
        if (content.includes('class="download-btn"') || content.includes('href="../../../public/html/descargas.html"')) {
            console.log(`⏭️  Saltando ${filePath} - Ya tiene botón de descarga`);
            return false;
        }
        
        // Buscar el lugar donde insertar el botón - después del anime-header
        const headerEndRegex = /<\/div>\s*<div class="seasons-container">/;
        
        if (headerEndRegex.test(content)) {
            // Crear el botón de descarga
            const downloadButton = `
  <!-- Botón de Descarga General -->
  <div class="general-download-section" style="text-align: center; margin: 2rem 0; padding: 1rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 15px; box-shadow: 0 8px 32px rgba(0,0,0,0.3);">
    <a href="../../../public/html/descargas.html" class="download-btn" style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #ff6b6b, #ee5a24); color: white; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(238, 90, 36, 0.4); text-transform: uppercase; letter-spacing: 1px;">
      📥 Descargar Anime Completo
    </a>
  </div>
</div>

    <div class="seasons-container">`;
            
            // Reemplazar el contenido
            content = content.replace(headerEndRegex, downloadButton);
            
            // Escribir el archivo actualizado
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Actualizado: ${filePath}`);
            return true;
        } else {
            console.log(`⚠️  No se pudo encontrar la estructura esperada en: ${filePath}`);
            return false;
        }
        
    } catch (error) {
        console.error(`❌ Error procesando ${filePath}:`, error.message);
        return false;
    }
}

// Función principal
function main() {
    const animeDir = path.join(__dirname, 'public', 'anime');
    
    if (!fs.existsSync(animeDir)) {
        console.error('❌ No se encontró el directorio public/anime');
        return;
    }
    
    console.log('🔍 Buscando páginas principales de anime...');
    const animePages = findMainAnimePages(animeDir);
    
    console.log(`📋 Encontradas ${animePages.length} páginas principales de anime:`);
    animePages.forEach(page => console.log(`   - ${page}`));
    
    console.log('\n🚀 Agregando botones de descarga...');
    
    let updatedCount = 0;
    let skippedCount = 0;
    
    for (const page of animePages) {
        const updated = addDownloadButtonToMainPage(page);
        if (updated) {
            updatedCount++;
        } else {
            skippedCount++;
        }
    }
    
    console.log('\n📊 Resumen:');
    console.log(`✅ Páginas actualizadas: ${updatedCount}`);
    console.log(`⏭️  Páginas saltadas: ${skippedCount}`);
    console.log(`📄 Total procesadas: ${animePages.length}`);
    console.log('\n🎉 ¡Proceso completado!');
}

// Ejecutar el script
main();