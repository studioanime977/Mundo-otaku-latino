const fs = require('fs');
const path = require('path');

// Función para buscar archivos HTML de temporadas recursivamente
function findSeasonFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat && stat.isDirectory()) {
            // Buscar recursivamente en subdirectorios
            results = results.concat(findSeasonFiles(filePath));
        } else if (file.endsWith('.html') && (file.includes('temporada') || file.includes('season'))) {
            results.push(filePath);
        }
    });
    
    return results;
}

// Función para añadir botón de descarga a una página de temporada
function addDownloadButtonToSeason(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Verificar si ya tiene un botón de descarga
        if (content.includes('download-btn') || content.includes('Descargar')) {
            console.log(`Ya existe botón de descarga en: ${filePath}`);
            return false;
        }
        
        // Buscar el contenedor de video y añadir el botón de descarga
        const videoContainerRegex = /<div class="contenedor-video">/;
        
        if (videoContainerRegex.test(content)) {
            // Añadir el botón de descarga justo después del contenedor-video
            content = content.replace(
                /<div class="contenedor-video">/,
                `<div class="contenedor-video">
      <a href="/public/html/descargas.html" class="download-btn" target="_blank">⬇️ Descargar</a>`
            );
            
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✓ Botón de descarga añadido a: ${filePath}`);
            return true;
        } else {
            console.log(`⚠️ No se encontró contenedor-video en: ${filePath}`);
            return false;
        }
        
    } catch (error) {
        console.error(`Error procesando ${filePath}:`, error.message);
        return false;
    }
}

// Función principal
function main() {
    const animeDir = path.join(__dirname, 'public', 'anime');
    
    if (!fs.existsSync(animeDir)) {
        console.error('No se encontró el directorio de anime:', animeDir);
        return;
    }
    
    console.log('Buscando archivos de temporadas...');
    const seasonFiles = findSeasonFiles(animeDir);
    
    console.log(`Encontrados ${seasonFiles.length} archivos de temporadas`);
    
    let updatedCount = 0;
    seasonFiles.forEach(file => {
        if (addDownloadButtonToSeason(file)) {
            updatedCount++;
        }
    });
    
    console.log(`\n✅ Proceso completado. ${updatedCount} archivos actualizados.`);
}

// Ejecutar el script
main();