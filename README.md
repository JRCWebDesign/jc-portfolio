# Jessica Casella · Portfolio

Portfolio personal de desarrollo web. HTML, CSS y JavaScript, sin dependencias de compilación.

## Ejecutar localmente

Desde la raíz del repositorio:

```sh
python -m http.server 4184 --directory dist
```

Abrir http://localhost:4184.

## Publicar en Cloudflare Pages

1. Crear un proyecto de **Pages** conectado a este repositorio de GitHub.
2. Seleccionar la rama `main`.
3. Usar estos valores:

| Configuración | Valor |
| --- | --- |
| Framework preset | None |
| Build command | `exit 0` |
| Build output directory | `dist` |
| Root directory | Dejar vacío (raíz del repositorio) |

No requiere variables de entorno. Los cambios enviados a `main` se publican automáticamente una vez conectado el repositorio.

Documentación: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/

## Archivos

- `dist/index.html`: contenido y enlaces.
- `dist/styles.css`: tipografía, colores y diseño adaptable.
- `dist/app.js`: proyectos adicionales, pestañas y ampliación de capturas.
- `dist/assets/`: capturas reales de los cuatro proyectos destacados.

Las fuentes Space Grotesk e IBM Plex Mono se cargan desde Google Fonts, con fuentes locales de respaldo. El contacto abre el correo del visitante; no hay backend ni formulario que almacene datos.

## Proyectos destacados

- Estudio jurídico (demo ficticia): https://jrcwebdesign.github.io/demo-estudio/#inicio
- Benja Barber: https://benjabarber.com.uy/
- Menú digital: https://menu-digital-mvp.pages.dev/
- Personalizados Cathy: https://jrcwebdesign.github.io/PersonalizadosCathy/

Capturas tomadas el 29 de septiembre de 2026.

## Vista previa al compartir

La portada está en `dist/assets/portada-social.png`. Los metadatos Open Graph y Twitter Card usan `https://jessicacasella.pages.dev/` como dominio público confirmado por Jessica. Si Cloudflare asigna otro dominio, actualizar las URL absolutas de `dist/index.html`.

La página y la imagen deben ser públicas y responder sin Cloudflare Access para que las aplicaciones puedan obtener la vista previa.
