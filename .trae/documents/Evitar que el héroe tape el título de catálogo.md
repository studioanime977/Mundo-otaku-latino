## Diagnóstico
- El contenedor del héroe (`.details`) tiene `z-index` alto (80) y su pseudo‑overlay queda por encima de `.catalog-main` (`z-index: 1`), por eso el título “Catálogo de Anime” aparece detrás del botón.

## Cambios Propuestos
- Subir el `z-index` de `.catalog-main` para que todo su contenido (título y grid) esté por encima de cualquier overlay del héroe.
- Mantener `details` en 80 para seguir encima del carrusel, pero debajo de la sección.

## Verificación
- Recargar en móvil: el título “Catálogo de Anime” queda visible y no se tapa; el CTA del héroe se muestra solo en su área; el catálogo se lee en orden vertical.