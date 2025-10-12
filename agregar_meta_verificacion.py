#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para agregar la meta tag de verificación a todos los archivos HTML
"""

import os
import re
from pathlib import Path

def tiene_meta_verificacion(contenido):
    """
    Verifica si el HTML ya tiene la meta tag de verificación
    """
    patron = r'<meta\s+name="f08cd2b5211f5b0a95753720000f639c66350c1d"'
    return bool(re.search(patron, contenido, re.IGNORECASE))

def agregar_meta_verificacion(archivo_html):
    """
    Agrega la meta tag de verificación al archivo HTML
    """
    try:
        # Leer el contenido del archivo
        with open(archivo_html, 'r', encoding='utf-8') as f:
            contenido = f.read()
        
        # Verificar si ya tiene la meta tag
        if tiene_meta_verificacion(contenido):
            print(f"✓ Ya tiene meta verificación: {archivo_html}")
            return False
        
        # Meta tag a insertar
        meta_tag = '    <meta name="f08cd2b5211f5b0a95753720000f639c66350c1d" content="f08cd2b5211f5b0a95753720000f639c66350c1d" />\n'
        
        # Buscar el tag <head> para insertar después de él
        match_head = re.search(r'<head[^>]*>', contenido, re.IGNORECASE)
        
        if match_head:
            # Insertar justo después del <head>
            posicion = match_head.end()
            nuevo_contenido = contenido[:posicion] + '\n' + meta_tag + contenido[posicion:]
            
            # Guardar el archivo
            with open(archivo_html, 'w', encoding='utf-8') as f:
                f.write(nuevo_contenido)
            
            print(f"✓ Meta verificación agregada: {archivo_html}")
            return True
        else:
            print(f"✗ No se encontró <head> en: {archivo_html}")
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
    print("AGREGANDO META TAG DE VERIFICACIÓN A TODOS LOS ARCHIVOS HTML")
    print("=" * 70)
    print()
    print("Meta tag a agregar:")
    print('<meta name="f08cd2b5211f5b0a95753720000f639c66350c1d" content="f08cd2b5211f5b0a95753720000f639c66350c1d" />')
    print()
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
        resultado = agregar_meta_verificacion(archivo)
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
    print(f"Meta tag agregada: {agregados}")
    print(f"Ya tenían meta tag: {ya_tienen}")
    print(f"Errores: {errores}")
    print("=" * 70)
    print()
    print("✅ Proceso completado!")
    print()
    print("PRÓXIMOS PASOS:")
    print("1. Sube los cambios a tu repositorio")
    print("2. Espera a que se despliegue en Vercel")
    print("3. Haz clic en 'Verificar' en el panel de verificación")
    print()

if __name__ == "__main__":
    main()
