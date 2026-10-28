# Web del Roadmap de Ciberseguridad

Aplicación Next.js para leer las guías del repositorio como una plataforma web en español.

La app lee los archivos Markdown del directorio padre, genera rutas estáticas y permite navegar las guías como una plataforma local de estudio.

## Requisitos

- Node.js.
- Npm.
- El repositorio completo, no solo la carpeta `web`.

## Desarrollo

```bash
npm ci
npm run dev
```

Abre:

```text
http://localhost:3000
```

Healthcheck local:

```text
http://localhost:3000/api/health
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run content:check
npm run check
```

## Cómo Funciona

- `lib/markdown.js` lee los Markdown del repositorio.
- El índice público está curado: la web muestra guías de estudio, no documentos internos del repo.
- `app/page.js` genera la portada y el buscador que envía a `/guias`.
- `app/guias/page.js` muestra el catálogo agrupado en 10 áreas.
- `app/api/search/route.js` expone la búsqueda server-side.
- `app/[...slug]/page.js` renderiza cada lectura.
- `app/api/health/route.js` expone healthcheck para Docker/Easypanel.
- `components/MarkdownRenderer.jsx` convierte Markdown a HTML.
- `components/TableOfContents.jsx` genera la tabla de contenido.
- `components/GuideExplorer.jsx` maneja búsqueda, filtros y agrupación por área.

## Convenciones de Contenido

Para que una lectura funcione bien en la web:

- Usa un solo `# Título` principal;
- Separa secciones con `##`;
- Usa `###` para subsecciones;
- Agrega bloques de código cuando haya comandos;
- Incluye práctica y criterio de dominio;
- Usa ejemplos, mapas mentales y puntos a observar;
- Evita depender de imágenes externas cuando no sean necesarias.

## Contenido Visible

La web debe mostrar recursos para alumnos en orden de estudio. La navegación principal debe estar centrada en guías, rutas, playbooks, cheatsheets y recursos profesionales útiles.

## Navegación Actual

La web incluye:

- Búsqueda por título y contenido con índice en el servidor;
- Catálogo `/guias` con filtros por nivel, tipo y área;
- Página `/rutas` con perfiles y secuencia lineal;
- Navegación por rutas;
- Tabla de contenido;
- Enlaces anterior/siguiente entre guías.

## Nota

La app asume que se ejecuta desde `web/` y que los contenidos Markdown viven en el directorio padre. La búsqueda usa un índice en memoria y no envía el corpus completo al navegador. El Dockerfile copia las categorías publicadas y `assets/`.

## Deploy con Docker en Easypanel

El `Dockerfile` está en la raíz del repositorio porque la web necesita leer los Markdown del directorio padre.

Configuración sugerida:

- Build context: raíz del repositorio.
- Dockerfile: `Dockerfile`.
- Puerto interno: `3000`.
- Health path: `/api/health`.
- Comando: usar el comando definido en la imagen.

Prueba local:

```bash
docker build -t cybersecurity-web .
docker run --rm -p 3000:3000 cybersecurity-web
```

Prueba con Docker Compose desde la raíz:

```bash
docker compose up --build
```

## Nota Sobre Build

La app lee Markdown e imágenes desde el directorio padre de `web/`. Las llamadas de filesystem usan `turbopackIgnore` para evitar que el build trace todo el repositorio; por eso el Dockerfile copia explícitamente las categorías publicadas y `assets/`. Si despliegas fuera de Docker, asegúrate de incluir esos archivos en el runtime.

## Contenido público

Para que una carpeta nueva aparezca en la web, además del Markdown debe registrarse en `lib/markdown.js` (`PAGE_ORDER` y `STUDY_ORDER`), `lib/officialSources.mjs`, `lib/areas.js`, el `Dockerfile` y `INICIO-AQUI.md`. El CI valida la cobertura con `npm run content:check`.

## Criterio de Calidad

La web debe sentirse como una guía informativa, no como una lista de tareas. El contenido puede mostrar ejemplos, criterios, mapas mentales y prácticas sugeridas, pero debe evitar lenguaje de entregas obligatorias.
