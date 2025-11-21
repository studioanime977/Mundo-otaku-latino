## Diagnóstico
- Las imágenes no cargan por referencias a nombres que no existen en `img` y, en algunos casos, por rutas inconsistentes.
- Confirmado el inventario real en `c:\Users\Admin\Desktop\Mundo-otaku-latino\img` y las páginas en `public/anime`.

## Estrategia de Corrección
- Auditar todas las páginas HTML en `public/anime/**` y unificar la ruta a `../../../img/<archivo-real>`.
- Sustituir nombres usados por los existentes en `img` y ajustar mayúsculas/espacios exactamente como están.
- Mantener el patrón: héroe usa una imagen representativa; el grid usa `thumb` por temporada/película con el nombre correcto.
- Donde falte imagen para una temporada/arco, usar `../../../img/fondo.png` de forma provisional.

## Mapa de Archivos (principales)
- Attack on Titan: OK (`Attack on Titan S1/2/3/4.jpg`, `Attack on Titan movie.jpg`).
- Jujutsu Kaisen: `Jujutsu Kaisen S1.jpg`, `Jujutsu Kaisen S2.jpg`, `Jujutsu Kaisen Movie 0.jpg`.
- Chainsaw Man: `Chainsaw Man S1.jpg`, `Chain saw man reze arc .jpg`.
- Boku no Hero: `BokunoHeroAcademia S1–S6.png`, `BokunoHeroAcademia S7.jpg`.
- Bungo Stray Dogs: `Bungou Stray Dogs S1.jpg`, `S2.jpg`, ` S3.png` (doble espacio), `S4.jpg`.
- Demon Slayer: usar imágenes por arco: `Kimetsu No Yaiba temporada 1.png`, `Kimetsu No Yaiba temporada 3.jpg`, `kimetsu tem 4.png`, `Kimetsu no Yaiba Tren Infino.png`, `castillo infinito.png`, `entrenamiento pilar.png`.
- Dragon Ball: `Dragon Ball Super.jpg` (Super), DB/Z/GT según página.
- Dragon Ball Heroes: `DRAGON BALL HEROES.png`.
- DanMachi: `DanMachi tem 1.png`.
- Even Given the Worthless: `Even Given the Worthless tem 1.png`.
- Horimiya: `HorimiyaS2.jpg` o `horimiya-the-missing-pieces-key-visual-tall.png` (si es S1, usar esta última).
- Hotarubi no Mori e: `Hotarubi no Mori e.jpg`.
- K-POP Demon Hunter: `Las guerras K-Pop Demon Hunters.jpg`.
- Kono Oto Tomare: `Kono oto tomaré Season 1.png`.
- Mashle: `Mashle  temporada 1.png`, `mashle temporada 2.jpg`.
- Mob Psycho 100: `Mob Psycho 100 S1.jpg` (y `S2.jpg`, `S3.jpg` si aplica).
- Mushoku Tensei: `Mushoku Tensei tem 1.png`, `Mushoku Tensei temporada 2.jpg` (o `MushokuTenseiS2.jpg`).
- Nanatsu no Taizai: `Nanatsu no taizai TEM  1.jpg` … `TEM  5.jpg`; películas: `Nanatsu no taizai Prisioneros del Cielo.jpg`, `Nanatsu no taizai La Maldición de la Luz.jpg`.
- Naruto: `Naruto Classic.jpg`.
- Nazo no Kanojo X: `NAZO NO KANOJO X S1.jpg`.
- One Punch Man: `One Punch Man S1.jpg`, `One Punch Man S2.jpg`.
- One Piece: usar `One Piece East Blue.png` para T1 o `One Piece Wano.jpg` como portada general.
- Re:Zero: `rezeroS1.png`, `rezeroS2.png`, `ReZeroS3.png`.
- Sakamoto Days: `Sakamoto days season 1.jpg`, `Sakamoto days season 2 .png`.
- SAO Progressive: `Sword Art Online Progressive Movie.png`.
- Shuumatsu no Valkyrie: `shuumatsu-no-valkyrie.jpg` (T1), `shuumatsu no valkyrie Temporada 2.jpg` (T2).
- Solo Leveling: `Solo Leveling season 1.jpg`, `Solo Leveling season 2.jpg`.
- Superman 2025: `superman 2025.png`.
- Tokyo Ghoul: `Tokyo Ghoul S1.jpg`, `Tokyo Ghoul S2.jpg`, `Tokyo Ghoul re.jpg`.
- Tu Nombre: `tu-nombre.jpg`.
- Urusei Yatsura: `Urusei Yatsura temporada 1.jpg`.

## Implementación
- Recorrer cada HTML en `public/anime/*/*.html` y:
  - Corregir hero `background-image:url('../../../img/...')` con el nombre exacto.
  - Corregir `thumb` en el objeto `seasons`/equivalente para cada temporada/película.
  - Mantener la ruta relativa `../../../img/` en todos los casos.
- Aplicar fallback `../../../img/fondo.png` donde falte imagen en `img`.

## Verificación
- Abrir `http://localhost:8000/public/anime/...` para 5–10 páginas representativas y confirmar carga de imágenes (sin 404 en Network).
- Revisar especialmente nombres con espacios dobles y acentos.
- Ajustar cualquier referencia residual tras la prueba.

## Entrega
- Realizar todos los cambios en una sola pasada y reportar las páginas ajustadas con una lista breve.
- No se crearán archivos nuevos, solo se editarán referencias existentes.

¿Confirmas que proceda con esta corrección en todas las páginas de `public/anime`? 