## Diagnóstico
- El menú aparece y se cierra inmediatamente en móviles porque el cierre se ejecuta en cualquier clic dentro de `.nav-links`.
- Código que provoca el cierre inmediato: `assets/js/catalogo.js:322-326`.
- El botón del hamburguesa no detiene la propagación del clic: `assets/js/catalogo.js:318-321`.
- Las reglas CSS móviles ya están, incluyendo `position: fixed` y `z-index`, ver `assets/css/catalogo.css:888-906`.

## Objetivo
- Mantener el panel abierto tras tocar el botón.
- Cerrar solo cuando el usuario toque un elemento del menú, toque fuera del panel, o presione `Escape`.
- Conservar accesibilidad (`aria-expanded`).

## Cambios en JS
- Añadir `e.stopPropagation()` en el `click` de `.menu-toggle`.
- Cambiar la lógica de cierre:
  - Cerrar solo si el `target` coincide con un item del menú usando `closest('.nav-links a, .nav-links .nav-link')`.
  - Mantener cierre al tocar fuera de `nav`.
  - Añadir cierre por `Escape`.
- Ubicación: reemplazar el bloque actual en `assets/js/catalogo.js:314-328` por el siguiente:

```js
const navToggle = document.querySelector('.menu-toggle')
const navEl = document.querySelector('nav')
const navLinks = document.querySelector('.nav-links')
if (navToggle && navEl && navLinks) {
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation()
    const isOpen = navEl.classList.toggle('open')
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false')
    document.body.style.overflow = isOpen ? 'hidden' : ''
  })
  document.addEventListener('click', (e) => {
    const target = e.target
    const clickedMenuItem = target.closest('.nav-links a, .nav-links .nav-link')
    if (!navEl.contains(target)) navEl.classList.remove('open')
    if (clickedMenuItem) navEl.classList.remove('open')
    if (!navEl.classList.contains('open')) document.body.style.overflow = ''
  })
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navEl.classList.remove('open')
      document.body.style.overflow = ''
    }
  })
}
```

## Cambios en HTML
- Hacer los items del menú clicables como enlaces o añadirles clase `.nav-link` para que la detección funcione.
- Ubicación: `public/html/catalogo.html:24-41`.
- Ejemplo propuesto:

```html
<div class="nav-links">
  <a class="nav-link active" href="../../index.html#inicio">Inicio</a>
  <a class="nav-link" href="#">Temporadas</a>
  <a class="nav-link" href="#">Películas</a>
  <a class="nav-link" href="#">Series</a>
  <a class="nav-link" href="#">Ofertas</a>
  <a class="nav-link" href="#">Contacto</a>
  <button class="svg-container" aria-label="Buscar">...</button>
  <button class="svg-container" aria-label="Perfil">...</button>
</div>
```

## CSS
- No se requieren cambios funcionales; confirmar que se mantiene:
  - Mostrar/ocultar en móvil: `assets/css/catalogo.css:888-906`.
  - `z-index` del panel (`1000`) superior a otros elementos.

## Verificación
- Probar en móvil:
  - Tocar el hamburguesa: el panel permanece abierto.
  - Desplazarse dentro del panel: no se cierra.
  - Tocar un elemento del menú: el panel se cierra y navega.
  - Tocar fuera del panel o presionar `Escape`: el panel se cierra.

¿Confirmo aplicar estos cambios? 