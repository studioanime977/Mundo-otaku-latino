#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script optimizado para agregar script a todos los HTML usando herramientas del sistema
"""

import os
from pathlib import Path

def obtener_todos_html(carpeta_base):
    """
    Obtiene la lista de todos los archivos HTML
    """
    archivos = []
    carpeta = Path(carpeta_base)
    
    for archivo in carpeta.rglob('*.html'):
        if '.git' not in str(archivo) and 'node_modules' not in str(archivo):
            archivos.append(str(archivo))
    
    return archivos

def main():
    carpeta_base = r'C:\Users\Admin\Desktop\Mundo-otaku-latino'
    archivos = obtener_todos_html(carpeta_base)
    
    print(f"Total de archivos HTML encontrados: {len(archivos)}")
    print("\nListado de archivos:")
    for i, archivo in enumerate(archivos, 1):
        nombre = archivo.replace(carpeta_base + '\\', '')
        print(f"{i:3}. {nombre}")
    
    print(f"\n\nGuardar lista en: archivos_html.txt")
    with open(os.path.join(carpeta_base, 'archivos_html.txt'), 'w', encoding='utf-8') as f:
        for archivo in archivos:
            f.write(archivo + '\n')

if __name__ == "__main__":
    main()
