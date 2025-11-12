import argparse
import re
from pathlib import Path

TOGGLE_BUTTON_HTML = (
    '<button id="toggle-episodes" class="nav-btn" aria-expanded="false" '
    'style="padding:10px 16px; border-radius:8px; background:#6c63ff; color:#fff; border:none; justify-self:center;">'
    'lista de episodios'
    '</button>'
)

TOGGLE_SCRIPT_JS = (
    "\n    // Toggle de lista de episodios con scroll suave\n"
    "    const toggleBtn = document.getElementById('toggle-episodes');\n"
    "    const episodesBox = document.getElementById('episodes-container');\n"
    "    if (toggleBtn && episodesBox) {\n"
    "      toggleBtn.addEventListener('click', () => {\n"
    "        const isHidden = episodesBox.hasAttribute('hidden');\n"
    "        if (isHidden) {\n"
    "          episodesBox.removeAttribute('hidden');\n"
    "          toggleBtn.setAttribute('aria-expanded', 'true');\n"
    "          episodesBox.scrollIntoView({ behavior: 'smooth', block: 'start' });\n"
    "        } else {\n"
    "          episodesBox.setAttribute('hidden', '');\n"
    "          toggleBtn.setAttribute('aria-expanded', 'false');\n"
    "          window.scrollTo({ top: 0, behavior: 'smooth' });\n"
    "        }\n"
    "      });\n"
    "    }\n"
)

def replace_nav_link_with_button(html: str) -> str:
    pattern = re.compile(r'<a[^>]*class="nav-btn"[^>]*>\s*lista de episodios\s*</a>', re.IGNORECASE)
    return pattern.sub(TOGGLE_BUTTON_HTML, html)

def ensure_episodes_container_hidden(html: str) -> str:
    # Add id and hidden to episodes container
    def repl(m):
        tag = m.group(0)
        if 'id="episodes-container"' not in tag:
            tag = tag.replace('>', ' id="episodes-container" hidden>') if 'hidden' not in tag else tag.replace('>', ' id="episodes-container">')
        if 'hidden' not in tag:
            tag = tag.replace('>', ' hidden>')
        return tag
    return re.sub(r'<div\s+class="episodes-container"[^>]*>', repl, html, count=1)

def remove_auto_loads(html: str) -> str:
    # Quita auto-carga del primer episodio si existe
    html = re.sub(r"\s*loadEpisode\(\s*episodes\[\s*0\s*\]\s*\)\s*;\s*", "\n", html)
    # Quita posibles auto-clicks de idioma/servidor (patrones comunes)
    html = re.sub(r"\s*if\s*\(\s*[a-zA-Z_]+Btn\s*\)\s*[a-zA-Z_]+Btn\.click\(\)\s*;\s*", "\n", html)
    html = re.sub(r"\s*if\s*\(\s*mixdropCard\s*\)\s*mixdropCard\.click\(\)\s*;\s*", "\n", html)
    return html

def inject_toggle_script(html: str) -> str:
    # Inserta el bloque JS justo antes del primer cierre </script>
    if 'toggle-episodes' in html and 'episodes-container' in html and 'toggleBtn.addEventListener' in html:
        return html
    if '</script>' in html:
        return html.replace('</script>', TOGGLE_SCRIPT_JS + "\n  </script>", 1)
    return html

def ensure_server_selector_script(html: str) -> str:
    if 'assets/js/server-selector.js' in html:
        return html
    # Intenta insertar antes de </footer> o al final de </body>
    updated = re.sub(r'(</footer>\s*)', '  <script src="../../../assets/js/server-selector.js"></script>\n' + r"\1", html, count=1)
    if updated != html:
        return updated
    return re.sub(r'(</body>\s*</html>\s*)', '  <script src="../../../assets/js/server-selector.js"></script>\n' + r"\1", html, count=1)

def process_file(path: Path, dry_run: bool = False) -> bool:
    original = path.read_text(encoding='utf-8', errors='ignore')
    updated = original
    updated = replace_nav_link_with_button(updated)
    updated = ensure_episodes_container_hidden(updated)
    updated = remove_auto_loads(updated)
    updated = inject_toggle_script(updated)
    updated = ensure_server_selector_script(updated)
    changed = updated != original
    if changed and not dry_run:
        backup = path.with_suffix(path.suffix + '.bak')
        backup.write_text(original, encoding='utf-8')
        path.write_text(updated, encoding='utf-8')
    return changed

def main():
    parser = argparse.ArgumentParser(description='Actualiza páginas HTML con botón toggle de episodios y placeholder del reproductor.')
    parser.add_argument('html_path', help='Ruta del archivo HTML a actualizar')
    parser.add_argument('--dry-run', action='store_true', help='Solo muestra si habría cambios, sin escribir')
    args = parser.parse_args()
    path = Path(args.html_path)
    if not path.exists():
        print('Archivo no encontrado:', path)
        return
    changed = process_file(path, dry_run=args.dry_run)
    if changed:
        print('Actualización aplicada a:', path)
        if not args.dry_run:
            print('Se creó backup:', path.with_suffix(path.suffix + '.bak'))
    else:
        print('No se detectaron cambios necesarios en:', path)

if __name__ == '__main__':
    main()