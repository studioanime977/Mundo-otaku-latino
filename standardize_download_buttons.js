const fs = require('fs');
const path = require('path');

// Función para encontrar todos los archivos HTML
function findHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            findHtmlFiles(filePath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });
    
    return fileList;
}

// Función para estandarizar botones de descarga
function standardizeDownloadButtons(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        // Patrones para encontrar botones de descarga con estilos inline
        const patterns = [
            // Patrón 1: class="download-btn" con style
            /class="download-btn"([^>]*?)style="[^"]*"/g,
            // Patrón 2: style con class="download-btn"
            /style="[^"]*"([^>]*?)class="download-btn"/g,
            // Patrón 3: cualquier combinación de download-btn con style
            /(class="[^"]*download-btn[^"]*"[^>]*?)style="[^"]*"/g,
            /(style="[^"]*"[^>]*?)(class="[^"]*download-btn[^"]*")/g
        ];
        
        patterns.forEach(pattern => {
            if (pattern.test(content)) {
                content = content.replace(pattern, (match, ...groups) => {
                    // Remover el atributo style y mantener solo la clase
                    let result = match.replace(/\s*style="[^"]*"/g, '');
                    // Asegurar que tenga la clase download-btn
                    if (!result.includes('class="download-btn"')) {
                        result = result.replace(/class="([^"]*)"/, 'class="$1 download-btn"');
                    }
                    modified = true;
                    return result;
                });
            }
        });
        
        // Patrón más específico para botones de descarga
        const downloadBtnPattern = /<a([^>]*?)class="([^"]*?)download-btn([^"]*?)"([^>]*?)style="[^"]*"([^>]*?)>/g;
        if (downloadBtnPattern.test(content)) {
            content = content.replace(downloadBtnPattern, '<a$1class="$2download-btn$3"$4$5>');
            modified = true;
        }
        
        // Patrón inverso
        const downloadBtnPatternReverse = /<a([^>]*?)style="[^"]*"([^>]*?)class="([^"]*?)download-btn([^"]*?)"([^>]*?)>/g;
        if (downloadBtnPatternReverse.test(content)) {
            content = content.replace(downloadBtnPatternReverse, '<a$1$2class="$3download-btn$4"$5>');
            modified = true;
        }
        
        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Actualizado: ${filePath}`);
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
    console.log('🔍 Buscando archivos HTML...');
    
    const publicDir = path.join(__dirname, 'public');
    const htmlFiles = findHtmlFiles(publicDir);
    
    console.log(`📁 Encontrados ${htmlFiles.length} archivos HTML`);
    console.log('🔧 Estandarizando botones de descarga...\n');
    
    let processedCount = 0;
    let modifiedCount = 0;
    
    htmlFiles.forEach(filePath => {
        processedCount++;
        const wasModified = standardizeDownloadButtons(filePath);
        if (wasModified) {
            modifiedCount++;
        }
    });
    
    console.log('\n📊 Resumen:');
    console.log(`   • Archivos procesados: ${processedCount}`);
    console.log(`   • Archivos modificados: ${modifiedCount}`);
    console.log(`   • Archivos sin cambios: ${processedCount - modifiedCount}`);
    console.log('\n✨ ¡Estandarización completada!');
}

// Ejecutar el script
if (require.main === module) {
    main();
}

module.exports = { standardizeDownloadButtons, findHtmlFiles };