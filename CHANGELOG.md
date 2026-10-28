# Changelog

## [Unreleased]

### Añadido

- Catálogo público `/guias` con búsqueda server-side, filtros y agrupación en 10 áreas.
- Página 404 real, enlace de salto al contenido y pie de página con licencias.
- Validación de cobertura de `PAGE_ORDER`, `STUDY_ORDER`, áreas, Dockerfile y `INICIO-AQUI.md`.
- CI, Dependabot, CodeQL, plantillas de contribución y política de seguridad.

### Cambiado

- La sección de seguridad personal pasó a formar parte del índice, la navegación y el Dockerfile.
- El buscador usa un índice en memoria del servidor y conserva el contenido de los bloques de código.
- Se actualizó Next.js y `eslint-config-next` a 16.4.3.
- Se corrigieron cifras de OWASP, terminología editorial y enlaces de la documentación.
- Se autoalojaron las fuentes, se corrigieron enlaces `mailto:` y se completaron etiquetas de accesibilidad.
- Se pulieron los filtros móviles del catálogo, se evitó repetir el nombre del área y se mejoró el desplazamiento accesible de tablas.
- Se actualizó la imagen social con las cifras vigentes del proyecto.
- `npm audit` queda en 0 vulnerabilidades tras actualizar `postcss` a 8.5.32.

## [0.1.0] - 2026-06-29

- Primera versión pública del mapa y la aplicación web.
