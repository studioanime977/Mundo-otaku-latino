# Script to update navigation paths in all HTML files
$animeFolder = "c:\Users\Admin\Desktop\castillo-infinito\anime"

# Get all HTML files in the anime folder and subfolders
$files = Get-ChildItem -Path $animeFolder -Filter "*.html" -Recurse -File

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Update navigation paths
    $content = $content -replace "\.\./\.\./ANIME TEMPORADAS CON EPISODIOS/", "../../anime/"
    $content = $content -replace "\.\./ANIME TEMPORADAS CON EPISODIOS/", "../anime/"
    $content = $content -replace "ANIME TEMPORADAS CON EPISODIOS/", "anime/"
    
    # Update index.html references to catalogo.html
    $content = $content -replace 'href="\.\./\.\./html/index\.html"', 'href="../../html/catalogo.html"'
    $content = $content -replace 'href="\.\./index\.html"', 'href="../html/catalogo.html"'
    
    # Save the updated content
    Set-Content -Path $file.FullName -Value $content
    Write-Host "Updated: $($file.FullName)"
}

Write-Host "Path updates complete!"
