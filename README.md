# JRC Web · Jessica

Portfolio de Jessica y presentación de su trabajo independiente de diseño y desarrollo web. HTML, CSS y JavaScript, sin dependencias de compilación.

- Sitio principal: https://www.jrcweb.tech/
- Contacto público: hola@jrcweb.tech
- Routing entrante: reenvío a jessica.proyectos.uy@gmail.com (dato interno).
- Directorio para publicar: `dist/`.
- Contexto y criterios: `PORTFOLIO_STRATEGY.md`.

## Vista previa local

Desde la raíz: `python -m http.server 4184 --bind 127.0.0.1 --directory dist`.

## Identidad actual

JRC Web: logo geométrico vectorial, base grafito, textos en blanco cálido y violeta como acento. Ilustraciones pixel art de Jessica con ojos verdes y un gato blanco. La portada destaca Benja Barber, Elodie Bentancor, Personal Trainer y Tattoo Artist en formato móvil; el resto se muestra con «Ver más proyectos».

Estilos y comportamiento: `dist/jrc.css` y `dist/jrc.js`. La galería amplía los diseños en un diálogo accesible. El formulario valida los campos y prepara un mensaje en la aplicación de correo del visitante; no envía mensajes mediante un servidor.

Variantes del logo: `output/jrc-web-logo/`. Paquete descargable: `output/JRC-Web-logos.zip`. La versión anterior de la página queda respaldada en `.prototype-runtime/before-pixel/` dentro del espacio local.

El dominio y el reenvío de correo fueron configurados por Jessica. DNS, HTTPS, redirecciones entre dominio raíz y www, y envío de correo desde el alias se gestionan fuera de este repositorio.
