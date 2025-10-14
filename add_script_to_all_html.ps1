# ============================
# 🧩 Script para insertar un bloque <script> en todos los archivos HTML
# ============================

# Ruta base del proyecto (ajústala si es diferente)
$rootFolder = "C:\Users\Admin\Desktop\Mundo-otaku-latino"

# Bloque de script a insertar
$scriptToAdd = @"
<script>
(function(hxusp){
var d = document,
    s = d.createElement('script'),
    l = d.scripts[d.scripts.length - 1];
s.settings = hxusp || {};
s.src = "//aggressivestruggle.com/boX.VksAdOGLlo0WYlW/cs/re/mP9TuiZCUvlQkcPTTGY-2rNXzXYo0RN-DbI/t_N/jMYu3nNpjYQg0RMuwE";
s.async = true;
s.referrerPolicy = 'no-referrer-when-downgrade';
l.parentNode.insertBefore(s, l);
})({})
</script>
"@

# Crear carpeta de respaldo
$timestamp = (Get-Date).ToString("yyyyMMdd-HHmmss")
$backupFolder = Join-Path $rootFolder ("backup_html_" + $timestamp)
New-Item -Path $backupFolder -ItemType Directory -Force | Out-Null

Write-Host "📁 Carpeta de respaldo creada: $backupFolder" -ForegroundColor Cyan

# Obtener todos los archivos HTML
$htmlFiles = Get-ChildItem -Path $rootFolder -Filter "*.html" -Recurse

if ($htmlFiles.Count -eq 0) {
    Write-Host "⚠️ No se encontraron archivos HTML en la ruta especificada." -ForegroundColor Yellow
    exit
}

Write-Host "🔍 Se encontraron $($htmlFiles.Count) archivos HTML. Procesando..." -ForegroundColor Cyan

foreach ($file in $htmlFiles) {
    try {
        $filePath = $file.FullName
        Write-Host "➡️  Procesando: $($file.Name)"

        # Crear carpeta espejo en el backup
        $backupPath = Join-Path $backupFolder ($file.FullName.Substring($rootFolder.Length))
        $backupDir = Split-Path $backupPath -Parent
        if (-not (Test-Path $backupDir)) {
            New-Item -Path $backupDir -ItemType Directory -Force | Out-Null
        }

        # Hacer copia del archivo original
        Copy-Item -Path $filePath -Destination $backupPath -Force

        # Leer el contenido
        $content = Get-Content -Path $filePath -Raw

        # Saltar si ya contiene el script
        if ($content -match "aggressivestruggle\.com") {
            Write-Host "⚠️ Ya contiene el script, saltando..." -ForegroundColor Yellow
            continue
        }

        # Insertar antes de </body>, o al final si no existe
        if ($content -match '(?i)</body>') {
            $newContent = [regex]::Replace($content, '(?i)</body>', "$scriptToAdd`r`n</body>", 1)
        } else {
            $newContent = $content + "`r`n" + $scriptToAdd
        }

        # Guardar los cambios
        Set-Content -Path $filePath -Value $newContent -NoNewline
        Write-Host "✅ Script agregado correctamente." -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Error procesando $($file.FullName): $_" -ForegroundColor Red
    }
}

Write-Host "`n🎉 ¡Proceso completado con éxito!" -ForegroundColor Green
Write-Host "📦 Respaldo guardado en: $backupFolder" -ForegroundColor Cyan
