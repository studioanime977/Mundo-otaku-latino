# ============================
# Script para agregar meta etiqueta referrer a todos los archivos HTML
# ============================

# Ruta base del proyecto
$rootFolder = "C:\Users\Admin\Desktop\Mundo-otaku-latino"

# Meta etiqueta a agregar
$metaTagToAdd = '<meta name="referrer" content="no-referrer-when-downgrade" />'

# Crear carpeta de respaldo
$timestamp = (Get-Date).ToString("yyyyMMdd-HHmmss")
$backupFolder = Join-Path $rootFolder ("backup_html_referrer_" + $timestamp)
New-Item -Path $backupFolder -ItemType Directory -Force | Out-Null

Write-Host "Carpeta de respaldo creada: $backupFolder"

# Obtener todos los archivos HTML
$htmlFiles = Get-ChildItem -Path $rootFolder -Filter "*.html" -Recurse

if ($htmlFiles.Count -eq 0) {
    Write-Host "No se encontraron archivos HTML en la ruta especificada."
    exit
}

Write-Host "Se encontraron $($htmlFiles.Count) archivos HTML. Procesando..."

foreach ($file in $htmlFiles) {
    try {
        $filePath = $file.FullName
        Write-Host "Procesando: $($file.Name)"

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

        # Saltar si ya contiene la meta etiqueta referrer
        if ($content -match 'name="referrer"') {
            Write-Host "Ya contiene la meta etiqueta referrer, saltando..."
            continue
        }

        # Buscar la etiqueta </head> para insertar antes de ella
        if ($content -match '(?i)</head>') {
            $newContent = [regex]::Replace($content, '(?i)</head>', "$metaTagToAdd`r`n  </head>", 1)
        } else {
            # Si no encuentra </head>, buscar <head> y agregar después
            if ($content -match '(?i)<head[^>]*>') {
                $newContent = [regex]::Replace($content, '(?i)(<head[^>]*>)', "`$1`r`n  $metaTagToAdd", 1)
            } else {
                Write-Host "No se encontró etiqueta <head>, saltando..."
                continue
            }
        }

        # Guardar los cambios
        Set-Content -Path $filePath -Value $newContent -NoNewline
Write-Host "Meta etiqueta referrer agregada correctamente."
    }
    catch {
        Write-Host "❌ Error procesando $($file.FullName): $_" -ForegroundColor Red
    }
}

Write-Host "Proceso completado con exito!"
Write-Host "Respaldo guardado en: $backupFolder"
