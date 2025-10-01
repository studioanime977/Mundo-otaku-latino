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

// Función para eliminar botón de descarga de una página
function removeDownloadButtonFromMainPage(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Verificar si existe el botón de descarga que agregamos
        if (!content.includes('class="general-download-section"') && !content.includes('📥 Descargar Anime Completo')) {
            console.log(`⏭️  Saltando ${filePath} - No tiene botón de descarga para eliminar`);
            return false;
        }
        
        // Buscar y eliminar la sección completa del botón de descarga
        const downloadSectionRegex = /\s*<!-- Botón de Descarga General -->\s*<div class="general-download-section"[\s\S]*?<\/div>\s*<\/div>\s*<div class="seasons-container">/;
        
        if (downloadSectionRegex.test(content)) {
            // Eliminar la sección del botón y restaurar la estructura original
            content = content.replace(downloadSectionRegex, '</div>\n\n    <div class="seasons-container">');
            
            // Escribir el archivo actualizado
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Eliminado botón de: ${filePath}`);
            return true;
        } else {
            // Intentar con un patrón más flexible
            const flexibleRegex = /\s*<!-- Botón de Descarga General -->[\s\S]*?📥 Descargar Anime Completo[\s\S]*?<\/div>\s*<\/div>\s*/;
            
            if (flexibleRegex.test(content)) {
                content = content.replace(flexibleRegex, '</div>\n\n    ');
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`✅ Eliminado botón de: ${filePath} (patrón flexible)`);
                return true;
            } else {
                console.log(`⚠️  No se pudo encontrar el patrón exacto en: ${filePath}`);
                return false;
            }
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
    
    console.log('\n🗑️  Eliminando botones de descarga...');
    
    let removedCount = 0;
    let skippedCount = 0;
    
    for (const page of animePages) {
        const removed = removeDownloadButtonFromMainPage(page);
        if (removed) {
            removedCount++;
        } else {
            skippedCount++;
        }
    }
    
    console.log('\n📊 Resumen:');
    console.log(`✅ Botones eliminados: ${removedCount}`);
    console.log(`⏭️  Páginas saltadas: ${skippedCount}`);
    console.log(`📄 Total procesadas: ${animePages.length}`);
    console.log('\n🎉 ¡Proceso de eliminación completado!');
}

// Ejecutar el script
main();