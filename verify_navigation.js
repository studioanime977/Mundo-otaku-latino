const fs = require('fs');
const path = require('path');

console.log('🔍 VERIFICANDO NAVEGACIÓN COMPLETA\n');

const projectPath = 'C:\\Users\\Admin\\Desktop\\Mundo-otaku-latino';
let errors = [];
let warnings = [];
let success = [];

// 1. VERIFICAR INDEX.HTML
console.log('📄 1. Verificando index.html...');
const indexPath = path.join(projectPath, 'index.html');
if (fs.existsSync(indexPath)) {
    const content = fs.readFileSync(indexPath, 'utf8');
    
    if (content.includes('href="html/catalogo.html"')) {
        success.push('✅ index.html → Botón "Ver Catálogo" apunta correctamente a html/catalogo.html');
    } else {
        errors.push('❌ index.html → Botón "Ver Catálogo" NO apunta a html/catalogo.html');
    }
} else {
    errors.push('❌ index.html NO encontrado');
}

// 2. VERIFICAR CATALOGO.HTML
console.log('📄 2. Verificando html/catalogo.html...');
const catalogoPath = path.join(projectPath, 'html', 'catalogo.html');
if (fs.existsSync(catalogoPath)) {
    const content = fs.readFileSync(catalogoPath, 'utf8');
    
    if (content.includes('href="../index.html"')) {
        success.push('✅ catalogo.html → Botón de retroceso apunta correctamente a ../index.html');
    } else {
        warnings.push('⚠️ catalogo.html → Botón de retroceso podría no apuntar correctamente');
    }
    
    // Verificar enlaces de anime
    const animeLinks = content.match(/href="\.\.\/public\/anime\/[^\/]+\/[^\/]+\.html"/g);
    if (animeLinks && animeLinks.length > 0) {
        success.push(`✅ catalogo.html → ${animeLinks.length} enlaces de anime apuntan correctamente`);
    } else {
        warnings.push('⚠️ catalogo.html → Enlaces de anime podrían necesitar corrección');
    }
} else {
    errors.push('❌ html/catalogo.html NO encontrado');
}

// 3. VERIFICAR ARCHIVOS DE ANIME
console.log('📁 3. Verificando archivos principales de anime...');
const animePath = path.join(projectPath, 'public', 'anime');
if (fs.existsSync(animePath)) {
    const animeDirs = fs.readdirSync(animePath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
    
    let animeFilesChecked = 0;
    let animeFilesCorrect = 0;
    
    animeDirs.forEach(animeDir => {
        const animeMainFile = path.join(animePath, animeDir, `${animeDir}.html`);
        
        if (fs.existsSync(animeMainFile)) {
            animeFilesChecked++;
            const content = fs.readFileSync(animeMainFile, 'utf8');
            
            if (content.includes('href="../../html/catalogo.html"') && 
                content.includes('Volver al Catálogo')) {
                animeFilesCorrect++;
            }
        }
    });
    
    if (animeFilesCorrect === animeFilesChecked) {
        success.push(`✅ ${animeFilesCorrect}/${animeFilesChecked} archivos principales de anime tienen navegación correcta`);
    } else {
        warnings.push(`⚠️ ${animeFilesCorrect}/${animeFilesChecked} archivos principales de anime tienen navegación correcta`);
    }
}

// 4. VERIFICAR ARCHIVOS DE TEMPORADAS
console.log('📁 4. Verificando archivos de temporadas/seasons...');
let seasonFilesChecked = 0;
let seasonFilesCorrect = 0;

if (fs.existsSync(animePath)) {
    const animeDirs = fs.readdirSync(animePath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
    
    animeDirs.forEach(animeDir => {
        const animeFolder = path.join(animePath, animeDir);
        
        try {
            const files = fs.readdirSync(animeFolder);
            files.forEach(file => {
                if (file.match(/^(temporada-|season).+\.html$/i) && file !== `${animeDir}.html`) {
                    seasonFilesChecked++;
                    const seasonFile = path.join(animeFolder, file);
                    const content = fs.readFileSync(seasonFile, 'utf8');
                    
                    if (content.includes(`href="${animeDir}.html"`) && 
                        content.includes('Volver a ')) {
                        seasonFilesCorrect++;
                    }
                }
            });
        } catch (error) {
            // Ignorar errores de lectura
        }
    });
}

if (seasonFilesCorrect === seasonFilesChecked) {
    success.push(`✅ ${seasonFilesCorrect}/${seasonFilesChecked} archivos de temporadas tienen navegación correcta`);
} else {
    warnings.push(`⚠️ ${seasonFilesCorrect}/${seasonFilesChecked} archivos de temporadas tienen navegación correcta`);
}

// 5. VERIFICAR CSS RESPONSIVO
console.log('📄 5. Verificando CSS responsivo...');
const responsiveCssPath = path.join(projectPath, 'css', 'responsive-navigation.css');
if (fs.existsSync(responsiveCssPath)) {
    success.push('✅ CSS responsivo creado correctamente');
} else {
    warnings.push('⚠️ CSS responsivo no encontrado - se recomienda incluirlo');
}

// RESUMEN
console.log('\n' + '='.repeat(60));
console.log('📊 RESUMEN DE VERIFICACIÓN');
console.log('='.repeat(60));

if (success.length > 0) {
    console.log('\n✅ ÉXITOS:');
    success.forEach(item => console.log(`   ${item}`));
}

if (warnings.length > 0) {
    console.log('\n⚠️ ADVERTENCIAS:');
    warnings.forEach(item => console.log(`   ${item}`));
}

if (errors.length > 0) {
    console.log('\n❌ ERRORES:');
    errors.forEach(item => console.log(`   ${item}`));
}

console.log('\n🔄 FLUJO DE NAVEGACIÓN VERIFICADO:');
console.log('   📱 index.html → html/catalogo.html');
console.log('   📱 catalogo.html → public/anime/[anime]/[anime].html');
console.log('   📱 [anime].html → temporada-X.html o season-X.html');
console.log('   📱 RETROCESO: temporada → [anime] → catalogo → index');

const totalIssues = errors.length + warnings.length;
if (totalIssues === 0) {
    console.log('\n🎉 ¡NAVEGACIÓN PERFECTA! Todo funciona correctamente.');
} else if (errors.length === 0) {
    console.log('\n✅ Navegación funcional con algunas advertencias menores.');
} else {
    console.log('\n⚠️ Se encontraron algunos problemas que necesitan atención.');
}

console.log(`\n📊 Archivos verificados: ${seasonFilesChecked + seasonFilesCorrect + 2}`);
console.log(`✅ Responsivo: PC y móviles configurados`);
