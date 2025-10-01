const fs = require('fs');
const path = require('path');

// Lista de archivos que necesitan ser corregidos
const filesToFix = [
  'public/anime/dragon-ball/temporada-1.html',
  'public/anime/boku-no-hero-academia/temporada-5.html',
  'public/anime/boku-no-hero-academia/temporada-6.html',
  'public/anime/bungo-stray-dogs/temporada-5.html',
  'public/anime/bungo-stray-dogs/temporada-2.html',
  'public/anime/classroom-of-the-elite/temporada-2.html',
  'public/anime/demon-slayer/temporada-3.html',
  'public/anime/demon-slayer/temporada-2.html',
  'public/anime/boku-no-hero-academia/temporada-7.html',
  'public/anime/dragon-ball/temporada-3.html',
  'public/anime/demon-slayer/temporada-1.html',
  'public/anime/classroom-of-the-elite/season1.html',
  'public/anime/demon-slayer/temporada-4.html',
  'public/anime/bungo-stray-dogs/temporada-4.html',
  'public/anime/dragon-ball/temporada-2.html',
  'public/anime/danmachi/season1.html',
  'public/anime/tokyo-ghoul/temporada-1.html',
  'public/anime/bungo-stray-dogs/temporada-3.html',
  'public/anime/bungo-stray-dogs/temporada-1.html'
];

console.log('🔧 Iniciando corrección de botones de episodios...\n');

let fixedCount = 0;
let errorCount = 0;

filesToFix.forEach(filePath => {
  try {
    const fullPath = path.join(__dirname, filePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`❌ Archivo no encontrado: ${filePath}`);
      errorCount++;
      return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Buscar y reemplazar el error en el JavaScript
    const originalPattern = /btn\.classList\.toggle\('active', index === episode\.num\);/g;
    const fixedPattern = "btn.classList.toggle('active', index === episode.num - 1);";
    
    if (content.match(originalPattern)) {
      content = content.replace(originalPattern, fixedPattern);
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ Corregido: ${filePath}`);
      fixedCount++;
    } else {
      console.log(`⚠️  No se encontró el patrón en: ${filePath}`);
    }
    
  } catch (error) {
    console.log(`❌ Error procesando ${filePath}: ${error.message}`);
    errorCount++;
  }
});

console.log(`\n📊 Resumen:`);
console.log(`✅ Archivos corregidos: ${fixedCount}`);
console.log(`❌ Errores: ${errorCount}`);
console.log(`📁 Total procesados: ${filesToFix.length}`);

if (fixedCount > 0) {
  console.log('\n🎉 ¡Corrección completada! Los botones de episodios ahora deberían funcionar correctamente.');
} else {
  console.log('\n⚠️  No se realizaron correcciones. Verifica los archivos manualmente.');
}