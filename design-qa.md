# JRC Web — revisión del rediseño

Fecha: 2026-10-17.

final result: passed

## Referencia y evidencia

- Boceto de color: `C:/Users/user/.codex/generated_images/01a14a4f-de55-7442-a763-3e12f63512d4/exec-76fee1bd-3194-4022-925f-bef9819f6d26.png`, 897 × 1752 px; dirección de escritorio nominal de 1440 px.
- Implementación: `http://127.0.0.1:4185/`, viewport de escritorio 1440 × 1000 CSS px; captura sin barra de desplazamiento de 1425 px de ancho.
- Comparación conjunta, ambas páginas completas normalizadas a 720 px de ancho sin deformación: `design-references/pixel-comparison.png`.
- Capturas: `design-references/pixel-implemented-desktop.png`, `design-references/pixel-implemented-mobile.png` y `design-references/pixel-portada.png`.
- Vista móvil: viewport 390 × 844 CSS px. Revisión adicional en 320 y 768 px de ancho. Sin desbordamiento horizontal en los cuatro tamaños revisados.

## Hallazgos y correcciones

1. P2, proporciones de imágenes: los atributos de altura intrínseca producían una portada demasiado alta y recortaban horizontalmente las capturas de proyectos. Se añadió altura automática y se conservó la relación de aspecto móvil original.
2. P2, recorte del escritorio: el encuadre inicial ocultaba el gato blanco. Se cambió a la relación de aspecto completa de la ilustración, con encaje sin recorte.
3. P2, jerarquía: en la primera comparación los márgenes eran demasiado amplios y la presentación se veía pequeña respecto de los proyectos. Se amplió la zona de contenido y se aumentaron los títulos de escritorio.
4. P2, captura de accesibilidad: el enlace de salto situado fuera de pantalla aparecía en la captura completa al desplazarse. Se cambió a ocultación accesible con recorte, conservando su aparición al recibir foco.

Después de esas correcciones se volvieron a capturar y comparar ambas páginas en `pixel-comparison.png`. No quedan P0/P1/P2.

## Superficies de fidelidad

- Tipografía: DM Sans para lectura y Space Grotesk para titulares. Texto de presentación a 16 px y párrafos secundarios a 14 px. Jerarquía y saltos revisados. El boceto rasterizado no conserva una escala tipográfica literal al ampliarlo a 1440 px; la implementación usa tamaños web legibles y no multiplica toda la tipografía por el factor de ampliación del boceto.
- Espaciado: portada en dos columnas, cuatro proyectos en escritorio, «Sobre mí» en tres columnas y contacto separado. En móvil se apilan presentación/contacto y se muestran dos proyectos por fila. El contenido factual adicional y «Ver más proyectos» explican las diferencias de altura entre secciones respecto del boceto.
- Color: grafito #151719, superficies #1c1f22, texto cálido #f4f1ea, acento #bda2df. Encabezados, bordes y enlaces neutros. Se evitó la iluminación violeta dominante de los bocetos previos.
- Imágenes: ilustraciones generadas por separado, con ojos verdes, pelo oscuro y gato blanco. Escritorio con madera, plantas y luz ámbar. Retrato transparente. Son variantes de los activos del boceto, no recortes exactos. Las capturas de proyectos son los archivos reales del repositorio y mantienen sus colores propios. El logo es el SVG elegido por la usuaria; iconos de Bootstrap Icons y Simple Icons.
- Texto: se conserva la presentación de desarrolladora y estudiante de Ingeniería y la experiencia .NET/C#. Se eliminó «Diseño experiencias web». Los proyectos conceptuales y demos siguen identificados como tales; no se añadieron métricas ni experiencia ficticia.

## Interacciones comprobadas

- Menú móvil abre, navega y se cierra con el estado accesible correcto.
- Los cuatro proyectos abren el diálogo con su título y captura correspondientes. Cierre y devolución del foco verificados.
- «Ver más proyectos» muestra Cathy, Alma Beauty y Estudio jurídico; «Ver menos» vuelve a ocultarlos.
- El formulario impide preparar correo con campos vacíos y genera un enlace mailto correcto con datos de prueba válidos. No se envió ningún correo. La interfaz indica explícitamente que el envío se completa en la aplicación de correo del visitante.
- No hubo errores de consola en la revisión final; no se encontraron imágenes visibles rotas.
- La publicación y la disponibilidad de los sitios externos de los proyectos no forman parte de esta verificación local.

## Diferencias aceptadas / mejoras menores

- Se prefirió conservar las capturas originales de proyectos antes que reproducir la tipografía alterada por ImageGen en el boceto.
- El retrato no usa el recuadro de fondo del boceto: el archivo transparente se integra en la base grafito y reduce aún más la presencia violeta solicitada.
- Formulario con etiquetas visibles y «Preparar correo» en lugar del envío simulado del boceto.
- P3: para un envío directo desde la web se necesitará conectar un servicio o endpoint de correo. La solución actual de mailto funciona de forma explícita y no simula éxito de envío.

Implementación verificada localmente; no publicada.

## Ajuste posterior: portada integrada

La usuaria pidió que la ilustración se funda con el fondo en escritorio y móvil. Se reemplazó su colocación como imagen independiente por una capa de fondo dentro de la portada, conservando el mismo archivo. Las máscaras de transparencia suavizan los bordes izquierdo, superior e inferior; no generan ni sustituyen la ilustración.

- Comparación conjunta con la portada del boceto: `design-references/hero-blend-comparison.png`. Misma anchura normalizada, encuadre de portada equivalente. La integración elimina el límite rectangular perceptible. Se mantienen las diferencias de escala tipográfica ya documentadas.
- Capturas actuales: `design-references/hero-blend-desktop.png` y `design-references/hero-blend-mobile.png`.
- P2 detectado durante el ajuste: en la primera versión móvil el rostro coincidía con los botones y la imagen distraía detrás del párrafo. Se desplazó el encuadre hacia abajo y se ajustó la transparencia. La captura final confirma texto sobre zona oscura y rostro visible debajo de los controles.
- Revisión en 320, 390 y 1440 px: sin desbordes horizontales. Sin errores de consola. No se alteraron fuentes, textos, color de marca, proyectos, navegación ni formulario.
- Cinco superficies: tipografía y contenido conservados; composición integrada y adaptación móvil revisadas; fondo grafito y contraste preservados; ilustración original sin deformación, con recorte adaptado y transición suave.

final result: passed
