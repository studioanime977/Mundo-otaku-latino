#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para agregar script de aggressivestruggle.com a todos los archivos HTML
"""

import os
import re
from pathlib import Path

def tiene_script_aggressive(contenido):
    """
    Verifica si el HTML ya tiene el script de aggressivestruggle.com
    """
    patrones = [
        r'aggressivestruggle\.com',
        r'bKX\.V\/s\/dFG',
    ]
    
    for patron in patrones:
        if re.search(patron, contenido, re.IGNORECASE):
            return True
    return False

def agregar_script(archivo_html):
    """
    Agrega el script al archivo HTML antes del cierre de </body>
    """
    try:
        # Leer el contenido del archivo
        with open(archivo_html, 'r', encoding='utf-8') as f:
            contenido = f.read()
        
        # Verificar si ya tiene el script
        if tiene_script_aggressive(contenido):
            print(f"✓ Ya tiene el script: {archivo_html}")
            return False
        
        # Script a insertar
        script_code = '''<script>
(function(mxtv){
var d = document,
    s = d.createElement('script'),
    l = d.scripts[d.scripts.length - 1];
s.settings = mxtv || {};
s.src = "\\/\\/aggressivestruggle.com\\/bKX.V\\/s\\/dFG\\/l\\/0PYBWEcI\\/-evmn9au\\/ZoUZlDkcP\\/TmY\\/2\\/NZz\\/UM1BNQz\\/EeteNxjRYt3wNZTMUE3jMEgo";
s.async = true;
s.referrerPolicy = 'no-referrer-when-downgrade';
l.parentNode.insertBefore(s, l);
})({})
</script>
'''
        
        # Buscar el cierre del tag </body>
        match = re.search(r'</body>', contenido, re.IGNORECASE)
        
        if match:
            # Insertar justo antes del </body>
            posicion = match.start()
            nuevo_contenido = contenido[:posicion] + script_code + '\n' + contenido[posicion:]
            
            # Guardar el archivo
            with open(archivo_html, 'w', encoding='utf-8') as f:
                f.write(nuevo_contenido)
            
            print(f"✓ Script agregado: {archivo_html}")
            return True
        else:
            # Si no hay </body>, intentar agregar antes de </html>
            match_html = re.search(r'</html>', contenido, re.IGNORECASE)
            if match_html:
                posicion = match_html.start()
                nuevo_contenido = contenido[:posicion] + script_code + '\n' + contenido[posicion:]
                
                with open(archivo_html, 'w', encoding='utf-8') as f:
                    f.write(nuevo_contenido)
                
                print(f"✓ Script agregado (antes de </html>): {archivo_html}")
                return True
            else:
                print(f"✗ No se encontró </body> ni </html> en: {archivo_html}")
                return False
            
    except Exception as e:
        print(f"✗ Error procesando {archivo_html}: {str(e)}")
        return False

def buscar_archivos_html(carpeta_base):
    """
    Busca todos los archivos HTML en el proyecto
    """
    archivos_html = []
    carpeta_path = Path(carpeta_base)
    
    # Buscar recursivamente todos los archivos .html
    for archivo in carpeta_path.rglob('*.html'):
        # Excluir carpetas específicas si es necesario
        if '.git' not in str(archivo) and 'node_modules' not in str(archivo):
            archivos_html.append(str(archivo))
    
    return archivos_html

def main():
    """
    Función principal
    """
    # Ruta base del proyecto
    carpeta_base = r'C:\Users\Admin\Desktop\Mundo-otaku-latino'
    
    print("=" * 70)
    print("AGREGANDO SCRIPT DE AGGRESSIVESTRUGGLE.COM A TODOS LOS HTML")
    print("=" * 70)
    print()
    print("Script a agregar:")
    print("""
<script>
(function(mxtv){
var d = document,
    s = d.createElement('script'),
    l = d.scripts[d.scripts.length - 1];
s.settings = mxtv || {};
s.src = "//aggressivestruggle.com/bKX.V/s/dFG/l/0PYBWEcI/-evmn9au/ZoUZlDkcP/TmY/2/NZz/UM1BNQz/EeteNxjRYt3wNZTMUE3jMEgo";
s.async = true;
s.referrerPolicy = 'no-referrer-when-downgrade';
l.parentNode.insertBefore(s, l);
})({})
</script>
    """)
    print("=" * 70)
    print()
    
    # Buscar todos los archivos HTML
    archivos = buscar_archivos_html(carpeta_base)
    
    print(f"Se encontraron {len(archivos)} archivos HTML")
    print()
    
    # Contadores
    agregados = 0
    ya_tienen = 0
    errores = 0
    
    # Procesar cada archivo
    for archivo in archivos:
        resultado = agregar_script(archivo)
        if resultado is True:
            agregados += 1
        elif resultado is False:
            ya_tienen += 1
        else:
            errores += 1
    
    # Resumen
    print()
    print("=" * 70)
    print("RESUMEN")
    print("=" * 70)
    print(f"Total de archivos: {len(archivos)}")
    print(f"Script agregado: {agregados}")
    print(f"Ya tenían el script: {ya_tienen}")
    print(f"Errores: {errores}")
    print("=" * 70)
    print()
    print("✅ Proceso completado!")
    print()
    print("El script se agregó antes del cierre de </body> en cada archivo.")
    print()

if __name__ == "__main__":
    main()
