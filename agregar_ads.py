import os
import re
from pathlib import Path

def agregar_ads_js(ruta_html):
    """
    Agrega el script ads.js al archivo HTML si no está presente
    """
    try:
        with open(ruta_html, 'r', encoding='utf-8') as f:
            contenido = f.read()
        
        # Verificar si el script ya existe
        if 'assets/js/ads.js' in contenido or 'ads.js' in contenido:
            print(f"✓ Ya existe ads.js en: {ruta_html}")
            return False
        
        # Calcular la ruta relativa correcta desde el archivo HTML hasta assets/js/ads.js
        ruta_archivo = Path(ruta_html)
        
        # Contar cuántos niveles hay desde el archivo hasta la raíz
        partes_ruta = ruta_archivo.parts
        indice_mundo_otaku = -1
        
        for i, parte in enumerate(partes_ruta):
            if 'Mundo-otaku-latino' in parte:
                indice_mundo_otaku = i
                break
        
        if indice_mundo_otaku == -1:
            print(f"⚠ No se pudo determinar la ruta relativa para: {ruta_html}")
            return False
        
        # Calcular niveles de profundidad desde la raíz del proyecto
        niveles = len(partes_ruta) - indice_mundo_otaku - 2  # -2 por el proyecto y el archivo mismo
        
        # Construir la ruta relativa
        if niveles > 0:
            ruta_relativa = '../' * niveles + 'assets/js/ads.js'
        else:
            ruta_relativa = 'assets/js/ads.js'
        
        # Crear el tag del script
        script_tag = f'  <script src="{ruta_relativa}" defer></script>\n'
        
        # Buscar la etiqueta </body> y agregar el script antes de ella
        if '</body>' in contenido:
            contenido_modificado = contenido.replace('</body>', script_tag + '</body>')
        else:
            print(f"⚠ No se encontró </body> en: {ruta_html}")
            return False
        
        # Guardar el archivo modificado
        with open(ruta_html, 'w', encoding='utf-8') as f:
            f.write(contenido_modificado)
        
        print(f"✓ Script agregado a: {ruta_html}")
        print(f"  Ruta usada: {ruta_relativa}")
        return True
        
    except Exception as e:
        print(f"✗ Error procesando {ruta_html}: {str(e)}")
        return False

def encontrar_archivos_html(directorio_base):
    """
    Encuentra todos los archivos HTML en el directorio y subdirectorios
    """
    archivos_html = []
    
    for root, dirs, files in os.walk(directorio_base):
        for file in files:
            if file.endswith('.html'):
                ruta_completa = os.path.join(root, file)
                archivos_html.append(ruta_completa)
    
    return archivos_html

def main():
    # Ruta base del proyecto
    directorio_base = r"C:\Users\Admin\Desktop\Mundo-otaku-latino"
    
    print("=" * 60)
    print("SCRIPT PARA AGREGAR ads.js A TODOS LOS ARCHIVOS HTML")
    print("=" * 60)
    print()
    
    # Verificar que el directorio existe
    if not os.path.exists(directorio_base):
        print(f"✗ Error: El directorio {directorio_base} no existe")
        return
    
    # Verificar que el archivo ads.js existe
    ruta_ads_js = os.path.join(directorio_base, "assets", "js", "ads.js")
    if not os.path.exists(ruta_ads_js):
        print(f"⚠ Advertencia: El archivo {ruta_ads_js} no existe")
        print("   El script continuará, pero asegúrate de crear el archivo ads.js")
        print()
    
    # Encontrar todos los archivos HTML
    print(f"Buscando archivos HTML en: {directorio_base}")
    archivos_html = encontrar_archivos_html(directorio_base)
    
    if not archivos_html:
        print("✗ No se encontraron archivos HTML")
        return
    
    print(f"✓ Se encontraron {len(archivos_html)} archivos HTML")
    print()
    
    # Procesar cada archivo
    archivos_modificados = 0
    archivos_sin_cambios = 0
    archivos_error = 0
    
    for archivo in archivos_html:
        resultado = agregar_ads_js(archivo)
        if resultado is True:
            archivos_modificados += 1
        elif resultado is False:
            archivos_sin_cambios += 1
        else:
            archivos_error += 1
    
    # Resumen
    print()
    print("=" * 60)
    print("RESUMEN")
    print("=" * 60)
    print(f"Total de archivos HTML: {len(archivos_html)}")
    print(f"Archivos modificados: {archivos_modificados}")
    print(f"Archivos sin cambios (ya tenían ads.js): {archivos_sin_cambios}")
    print(f"Archivos con error: {archivos_error}")
    print("=" * 60)

if __name__ == "__main__":
    main()
