const fs = require('fs');
const path = require('path');

// Función para encontrar todos los archivos HTML de anime
function findAnimeHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            findAnimeHtmlFiles(filePath, fileList);
        } else if (file.endsWith('.html') && !file.includes('temporada') && !file.includes('season') && !file.includes('movie')) {
            // Solo archivos principales de anime, no temporadas ni películas individuales
            fileList.push(filePath);
        }
    });
    
    return fileList;
}

// Función para reemplazar botones de descarga simples con estructura de servidores
function updateDownloadButtons(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        // Buscar botones de descarga simples y reemplazarlos con estructura de servidores
        const downloadBtnPattern = /<a[^>]*href="([^"]*)"[^>]*target="_blank"[^>]*class="download-btn"[^>]*>([^<]*)<\/a>/g;
        
        let matches = [];
        let match;
        while ((match = downloadBtnPattern.exec(content)) !== null) {
            matches.push({
                fullMatch: match[0],
                url: match[1],
                text: match[2]
            });
        }
        
        // Si no encuentra con el primer patrón, probar con otro orden de atributos
        if (matches.length === 0) {
            const alternativePattern = /<a[^>]*class="download-btn"[^>]*href="([^"]*)"[^>]*target="_blank"[^>]*>([^<]*)<\/a>/g;
            while ((match = alternativePattern.exec(content)) !== null) {
                matches.push({
                    fullMatch: match[0],
                    url: match[1],
                    text: match[2]
                });
            }
        }
        
        // Patrón más flexible para cualquier orden de atributos
        if (matches.length === 0) {
            const flexiblePattern = /<a[^>]*class="download-btn"[^>]*>([^<]*)<\/a>/g;
            let flexMatch;
            while ((flexMatch = flexiblePattern.exec(content)) !== null) {
                // Extraer href del match completo
                const hrefMatch = flexMatch[0].match(/href="([^"]*)"/);
                if (hrefMatch) {
                    matches.push({
                        fullMatch: flexMatch[0],
                        url: hrefMatch[1],
                        text: flexMatch[1]
                    });
                }
            }
        }
        
        if (matches.length > 0) {
            // Reemplazar cada botón simple con estructura de servidores
            matches.forEach((matchInfo, index) => {
                const serverStructure = `<div class="download-servers-section">
                    <div class="servers-title">Descargar Temporada Completa</div>
                    <div class="servers-grid-compact">
                        <a href="${matchInfo.url}" target="_blank" class="download-link terabox">📦 TeraBox</a>
                        <a href="#" class="download-link mega unavailable-server">🔴 MEGA</a>
                        <a href="#" class="download-link mediafire unavailable-server">📁 MediaFire</a>
                        <a href="#" class="download-link dropbox unavailable-server">📦 Dropbox</a>
                        <a href="#" class="download-link fichier unavailable-server">📄 1Fichier</a>
                        <a href="#" class="download-link stape unavailable-server">🔗 Stape</a>
                    </div>
                </div>`;
                
                content = content.replace(matchInfo.fullMatch, serverStructure);
                modified = true;
            });
        }
        
        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Actualizado: ${filePath} (${matches.length} botones reemplazados)`);
            return true;
        } else {
            console.log(`⏭️  Sin cambios: ${filePath}`);
            return false;
        }
        
    } catch (error) {
        console.error(`❌ Error procesando ${filePath}:`, error.message);
        return false;
    }
}

// Función principal
function main() {
    console.log('🔍 Buscando archivos HTML de anime...');
    
    const animeDir = path.join(__dirname, 'public', 'anime');
    const htmlFiles = findAnimeHtmlFiles(animeDir);
    
    console.log(`📁 Encontrados ${htmlFiles.length} archivos HTML de anime`);
    console.log('🔧 Actualizando botones de descarga...\n');
    
    let processedCount = 0;
    let modifiedCount = 0;
    
    htmlFiles.forEach(filePath => {
        processedCount++;
        const wasModified = updateDownloadButtons(filePath);
        if (wasModified) {
            modifiedCount++;
        }
    });
    
    console.log('\n📊 Resumen:');
    console.log(`   • Archivos procesados: ${processedCount}`);
    console.log(`   • Archivos modificados: ${modifiedCount}`);
    console.log(`   • Archivos sin cambios: ${processedCount - modifiedCount}`);
    console.log('\n✨ ¡Actualización de servidores completada!');
}

// Ejecutar el script
if (require.main === module) {
    main();
}

module.exports = { updateDownloadButtons, findAnimeHtmlFiles };