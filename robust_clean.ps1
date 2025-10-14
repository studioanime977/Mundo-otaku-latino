$basePath = "C:\Users\Admin\Desktop\Mundo-otaku-latino"
$files = Get-ChildItem -Path $basePath -Recurse -File -Include "*.html" | Where-Object { $_.FullName -notlike "*.git*" -and $_.FullName -notlike "*node_modules*" }

$cleaned = 0
$alreadyClean = 0
$errors = 0

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "ELIMINANDO SCRIPT MALICIOSO DE AGGRESSIVESTRUGGLE.COM" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Se encontraron $($files.Count) archivos HTML" -ForegroundColor Yellow

foreach ($file in $files) {
    try {
        $content = Get-Content -Path $file.FullName -Encoding UTF8 -Raw

        if ($content -notmatch "aggressivestruggle") {
            Write-Host "✓ No tiene script malicioso: $($file.Name)" -ForegroundColor Green
            $alreadyClean++
            continue
        }

        $originalContent = $content

        # Use a more flexible approach to remove script blocks containing aggressivestruggle
        $lines = $content -split "`n"
        $newLines = @()
        $inMaliciousScript = $false
        $braceCount = 0

        for ($i = 0; $i -lt $lines.Count; $i++) {
            $line = $lines[$i]

            # Check if this line starts a malicious script
            if ($line.Trim() -match '<script>' -and $lines[$i+1].Trim() -match 'function\(mxtv\)') {
                $inMaliciousScript = $true
                $braceCount = 0
                continue
            }

            if ($inMaliciousScript) {
                # Count braces to find the end
                $braceCount += ($line | Select-String -Pattern '[\{\}]' -AllMatches).Matches.Count
                if ($line.Trim() -eq '</script>') {
                    $inMaliciousScript = $false
                    continue
                }
                # Skip this line if we're in a malicious script
                continue
            }

            $newLines += $line
        }

        $content = $newLines -join "`n"

        if ($content -ne $originalContent) {
            Set-Content -Path $file.FullName -Value $content -Encoding UTF8
            Write-Host "✓ Script malicioso eliminado: $($file.Name)" -ForegroundColor Green
            $cleaned++
        } else {
            Write-Host "✗ No se pudo eliminar el script: $($file.Name)" -ForegroundColor Red
            $errors++
        }

    } catch {
        Write-Host "✗ Error procesando $($file.Name): $($_.Exception.Message)" -ForegroundColor Red
        $errors++
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "RESUMEN" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Total de archivos: $($files.Count)" -ForegroundColor White
Write-Host "Script malicioso eliminado: $cleaned" -ForegroundColor Green
Write-Host "Ya estaban limpios: $alreadyClean" -ForegroundColor Yellow
Write-Host "Errores: $errors" -ForegroundColor Red
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Limpieza completada!" -ForegroundColor Green
