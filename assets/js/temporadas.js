document.addEventListener('DOMContentLoaded', () => {
  const temporadas = [
    { id: 1, nombre: "Temporada 1", url: "temporada1.html" },
    { id: 2, nombre: "Temporada 2", url: "temporada2.html" },
    { id: 3, nombre: "Temporada 3", url: "temporada3.html" },
  ];

  const menu = document.getElementById('menu-temporadas');
  const contenido = document.getElementById('contenido-temporada');

  // Generar botones dinámicamente
  temporadas.forEach(temporada => {
    const boton = document.createElement('li');
    boton.innerHTML = `<button data-url="${temporada.url}">${temporada.nombre}</button>`;
    menu.appendChild(boton);
  });

  // Manejar clic en los botones
  menu.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const url = e.target.getAttribute('data-url');
      cargarContenido(url);
    }
  });

  // Función para cargar contenido dinámico
  function cargarContenido(url) {
    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error('Error al cargar la temporada');
        return response.text();
      })
      .then(html => {
        contenido.innerHTML = html;
      })
      .catch(error => {
        contenido.innerHTML = `<p>Error: ${error.message}</p>`;
      });
  }
});