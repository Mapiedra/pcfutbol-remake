Este directorio contiene la música de fondo del juego organizada por colecciones.

Para agregar una nueva colección de música:
1. Crea una subcarpeta con el nombre de la colección (ej: "Mis Favoritos").
2. Copia tus archivos .mp3 dentro de esa carpeta.
3. El sistema generará automáticamente la playlist o puedes crear un archivo `playlist.json` manualmente con el formato: ["cancion1.mp3", "cancion2.mp3"]
4. Añade la nueva opción en `src/templates/settings.html` para que aparezca en el menú del juego.

Colecciones actuales:
- PCFutbol 7: Música original del juego clásico.
- PCFutbol Remake: Nuevas versiones y temas actuales.
