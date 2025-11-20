## Objetivo
- Mostrar una pantalla de bienvenida animada en `index.html` con mensaje "Bienvenido a Mundo Otaku Latino".
- Mostrar un loader animado.
- Redirigir automáticamente a `public/html/catalogo.html` tras unos segundos.

## Cambios
- Editar `index.html` para:
  - Estructura correcta de `<head>` y `<body>`.
  - CSS inline con fondo dinámico, texto con glow, y barra/círculo de carga.
  - JavaScript que inicia la animación y redirige pasado un tiempo.
  - Botón opcional "Entrar ahora" para redirección inmediata.

## Verificación
- Abrir `http://localhost:8000/`.
- Ver la animación y, tras ~3s, navegar automáticamente al catálogo.
- Probar el botón "Entrar ahora" para acceder instantáneamente.