const fs = require('fs');
const path = require('path');

// Ruta al archivo del catálogo
const catalogoPath = path.join(__dirname, 'public', 'html', 'catalogo.html');

// Leer el archivo HTML
let htmlContent = fs.readFileSync(catalogoPath, 'utf8');

// Buscar todas las tarjetas de anime y agregar botones de descarga
const animeCardRegex = /<div class="anime-card">\s*<img src="[^"]*" alt="[^"]*">/g;
htmlContent = htmlContent.replace(animeCardRegex, match => {
  return match + '\n          <a href="/public/html/descargas.html" class="download-btn">⬇️ Descargar</a>';
});

// Guardar el archivo modificado
fs.writeFileSync(catalogoPath, htmlContent, 'utf8');

console.log('Botones de descarga agregados a todas las tarjetas de anime en el catálogo.');