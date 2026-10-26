# Vista previa de mejoras — 26 de octubre de 2026

Implementación en `dist/`. Jessica autorizó subir la versión final con contacto mediante su aplicación de correo. HTML, CSS y JavaScript existentes. Abrir http://127.0.0.1:4186/ mientras esté activo el servidor local. Para reiniciarlo: `python -m http.server 4186 --bind 127.0.0.1 --directory dist`.

## Base de trabajo

Auditoría leída: `C:/Users/user/Documents/Codex/2026-10-26/referenced-chatgpt-conversation-this-is-an/outputs/auditoria-jrcweb.md`. Se conservan fondo grafito, violeta, logo, ilustraciones y trato directo en español de Uruguay.

## Cambios

- Contacto final mediante mailto, por preferencia de Jessica. El email permanece como alternativa. Etiquetas visibles, campos de 16 px, Nombre y Email apilados en móvil y ayuda sobre rubro, objetivo y web existente.
- El formulario prepara el mensaje para enviarlo desde la aplicación de correo, sin afirmar que se haya enviado. No se guarda información personal en almacenamiento local.
- Portfolio en una columna hasta 760 px y dos en tablet/escritorio; descripciones de 16 px y acciones de al menos 44 px. Etiquetas originales de web profesional, demo y concepto conservadas. No se atribuyen clientes a conceptos.
- Ampliaciones identificadas como vistas previas; cambio móvil/escritorio en Elodie, Benja Barber, Personalizados Cathy y Estudio jurídico. Se recortaron únicamente los 15 px de barra incrustada de las capturas de escritorio y Adán móvil; se conservan los originales. No se crean vistas inexistentes.
- Portada orientada al servicio; CTA principal «Consultar por mi web», secundario «Ver proyectos»; Jessica y su ilustración permanecen.
- Por indicación posterior de Jessica se retiraron los casos destacados de Adán y Elodie, el proceso en borrador y las FAQ. Sus tarjetas originales permanecen en el portfolio. El servicio se presenta como diseño y desarrollo a medida, con alcance, funcionalidades y tiempos definidos según cada proyecto.
- Foco visible, cierre de menú con Escape/al salir/con clic exterior, foco contenido y devuelto en diálogo, reducción de movimiento y bordes de formulario con mayor contraste.

## Pruebas

Navegador Edge automatizado en entorno local; no teléfonos físicos. Resultados en `design-references/ux-preview/test-results.txt`; capturas completas y de portada en la misma carpeta.

- 320, 390, 768 y 1440 px: distribución esperada y sin desbordes horizontales.
- Teclado: enlace de salto, menú, navegación, Escape y devolución del foco; diálogo, recorrido con Tab y vistas disponibles.
- Galería: expandir y contraer; vistas de escritorio cargan.
- Formulario: obligatorios, endpoint ausente, estado pendiente, error HTTP, error de red, respuesta sin confirmación y éxito controlado. Solicitudes interceptadas, sin enviar mensajes reales.
- Preferencia de movimiento reducido; galería expandida y FAQ abiertas a 320 px; reflujo con zoom CSS del 200% en 640 px (equivalente a 320 px de contenido). No equivale a probar zoom nativo en todos los navegadores.
- Sin errores JavaScript durante el recorrido.
- Contraste calculado sobre colores planos: texto principal/fondo 15,93:1; secundario/fondo 8,51:1; secundario/tarjeta 7,83:1; botón principal 8,14:1; borde de campo/fondo del campo 3,91:1. Portada inspeccionada visualmente en las capturas, sin medición exhaustiva por píxel.

No se certifica WCAG: quedan lector de pantalla, dispositivos físicos, zoom nativo adicional y entrega de correo real. No se ha vuelto a auditar la disponibilidad de las webs externas de los proyectos.

## Contacto final por indicación de Jessica

Jessica prefirió conservar el contacto original y autorizó subir los cambios. Se retiró la integración externa y su configuración. El formulario prepara un enlace mailto y explica que el envío se completa en la aplicación de correo; conserva la ayuda, etiquetas y mejoras móviles. No se contrató ningún servicio.

Las pruebas de envío asíncrono indicadas arriba corresponden a la versión anterior, retirada. El comportamiento final se comprueba preparando el mailto sin enviar correo real.

## Ajuste solicitado por Jessica

Se retiraron los bloques de casos, proceso y preguntas frecuentes. Jessica indicó que las condiciones dependen de lo que le pidan; no se requieren definiciones generales para esta vista previa. Se incorporó «diseño y desarrollo web a medida» en portada y servicios.

Las pruebas y capturas anteriores documentan la primera versión; las capturas `actualizada-*.png` muestran este ajuste. No se publicó en producción.
