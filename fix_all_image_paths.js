const fs = require('fs');
const path = require('path');

// Función para corregir rutas de imágenes en un archivo HTML
function fixImagePaths(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        // Reemplazar rutas incorrectas de imágenes
        // De ../../img/ a ../../../img/
        const oldPattern = /src="\.\.\/\.\.\/img\//g;
        const newPattern = 'src="../../../img/';
        
        if (content.match(oldPattern)) {
            content = content.replace(oldPattern, newPattern);
            modified = true;
        }
        
        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Corregido: ${filePath}`);
            return true;
        } else {
            console.log(`⚪ Sin cambios: ${filePath}`);
            return false;
        }
    } catch (error) {
        console.error(`❌ Error procesando ${filePath}:`, error.message);
        return false;
    }
}

// Función para procesar todos los archivos HTML en una carpeta
function processAnimeFolder(animeFolder) {
    const files = fs.readdirSync(animeFolder);
    let totalFixed = 0;
    
    files.forEach(file => {
        if (file.endsWith('.html')) {
            const filePath = path.join(animeFolder, file);
            if (fixImagePaths(filePath)) {
                totalFixed++;
            }
        }
    });
    
    return totalFixed;
}

// Función principal
function fixAllImagePaths() {
    const animeDir = path.join(__dirname, 'public', 'anime');
    
    if (!fs.existsSync(animeDir)) {
        console.error('❌ No se encontró la carpeta de anime:', animeDir);
        return;
    }
    
    console.log('🔧 Iniciando corrección de rutas de imágenes...\n');
    
    const animeFolders = fs.readdirSync(animeDir);
    let totalProcessed = 0;
    let totalFixed = 0;
    
    animeFolders.forEach(folder => {
        const folderPath = path.join(animeDir, folder);
        
        if (fs.statSync(folderPath).isDirectory()) {
            console.log(`📁 Procesando: ${folder}`);
            const fixed = processAnimeFolder(folderPath);
            totalFixed += fixed;
            totalProcessed++;
        }
    });
    
    console.log('\n📊 Resumen:');
    console.log(`- Carpetas procesadas: ${totalProcessed}`);
    console.log(`- Archivos corregidos: ${totalFixed}`);
    console.log('✅ Proceso completado');
}

// Ejecutar el script
fixAllImagePaths();