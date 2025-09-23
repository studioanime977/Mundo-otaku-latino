# Script to update titles and relevant text in all HTML files
$projectFolder = "c:\Users\Admin\Desktop\castillo-infinito"

# Get all HTML files in the project folder and subfolders
$files = Get-ChildItem -Path $projectFolder -Filter "*.html" -Recurse -File

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Update the title tag
    $content = $content -replace '<title>.*?</title>', '<title>Mundo Otaku Latino - Catálogo de Anime</title>'
    
    # Update any logo text
    $content = $content -replace '<div class="logo">.*?</div>', '<div class="logo">🧧Mundo Otaku Latino</div>'
    
    # Update section titles if applicable
    $content = $content -replace '<h2 class="section-title">.*?</h2>', '<h2 class="section-title">🎌 Catálogo de Mundo Otaku Latino</h2>'
    
    # Save the updated content
    Set-Content -Path $file.FullName -Value $content
    Write-Host "Updated: $($file.FullName)"
}

Write-Host "Title updates complete!"
