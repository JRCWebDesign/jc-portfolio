# SEO de JRC Web

Actualización: 18 de octubre de 2026.

## Implementado

- Título y descripción centrados en diseño y desarrollo web en Uruguay, con Jessica Casella identificada como persona detrás de JRC Web.
- Datos estructurados WebSite, WebPage, Person y Service, usando la URL canónica https://www.jrcweb.tech/.
- Contenido visible de servicios y contexto de los proyectos. Sin métricas, testimonios, dirección comercial ni credenciales inventadas.
- Favicon cuadrado de 192 y 96 px en rutas estables, ICO de varios tamaños y Apple Touch Icon. Se conserva el avatar aprobado.
- robots.txt y sitemap.xml accesibles; fecha de última modificación actualizada.
- Página 404 propia para evitar el fallback SPA de Cloudflare Pages que respondía 200 en rutas inexistentes; noindex en la página de error.
- Normalización de /index.html a / mediante redirección permanente.

## Acciones externas

- Search Console: inspeccionar https://www.jrcweb.tech/ y solicitar indexación después del despliegue; comprobar sitemap.xml.
- El dominio sin www todavía responde 200. Se recomienda redirección 301 hacia https://www.jrcweb.tech/, conservando rutas y parámetros. La revisión automática rechazó crear esta regla de Cloudflare sin autorización específica. No se modificó la infraestructura del dominio.
- Google decide cuándo actualiza título e icono. Cumplir los requisitos no garantiza favicon ni posición. Mantener las rutas de los iconos estables.

## Siguientes mejoras de contenido

- Desarrollar casos de proyecto con necesidad, trabajo realizado y decisiones concretas; distinguir demos de trabajos publicados.
- Mantener perfiles de GitHub e Instagram consistentes con JRC Web, Jessica Casella y el dominio público.
- Revisar consultas e impresiones en Search Console antes de ampliar páginas o cambiar palabras clave. No crear páginas de localidades sin contenido propio.

## Referencias

- https://developers.google.com/search/docs/appearance/favicon-in-search/
- https://developers.google.com/search/docs/appearance/site-names
- https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- https://developers.cloudflare.com/pages/configuration/redirects/
