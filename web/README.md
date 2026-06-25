# Web del Roadmap de Ciberseguridad

Aplicación Next.js para leer las guías del repositorio como una plataforma web en español.

La app lee los archivos Markdown del directorio padre, genera rutas estaticas y permite navegar las guías como una plataforma local de estudio.

## Requisitos

- Node.js.
- Npm.
- El repositorio completo, no solo la carpeta `web`.

## Desarrollo

```bash
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
```

## Cómo Funciona

- `lib/markdown.js` lee los Markdown del repositorio.
- El indice público está curado: la web muestra guías de estudio, no documentos internos del repo.
- `app/page.js` genera la portada con categorías y buscador.
- `app/[...slug]/page.js` renderiza cada lectura.
- `app/api/health/route.js` expone healthcheck para Docker/Easypanel.
- `components/MarkdownRenderer.jsx` convierte Markdown a HTML.
- `components/TableOfContents.jsx` genera la tabla de contenido.
- `components/CategoryList.jsx` maneja busqueda, filtros y rutas por perfil.

## Convenciones de Contenido

Para que una lectura funcione bien en la web:

- Usa un solo `# Titulo` principal;
- Separa secciones con `##`;
- Usa `###` para subsecciones;
- Agrega bloques de código cuando haya comandos;
- Incluye práctica y criterio de dominio;
- Usa ejemplos, mapas mentales y puntos a observar;
- Evita depender de imágenes externas cuando no sean necesarias.

## Contenido Visible

La web debe mostrar recursos para alumnos en orden de estudio. La navegación principal debe estar centrada en guías, labs, playbooks, cheatsheets y recursos profesionales útiles.

## Navegación Actual

La web incluye:

- Busqueda por titulo y categoría;
- Busqueda por contenido;
- Filtros por nivel;
- Rutas sugeridas por perfil;
- Navegación por rutas;
- Tabla de contenido;
- Enlaces anterior/siguiente entre guías.

## Nota

La app asume que se ejecuta desde `web/` y que los contenidos Markdown viven en el directorio padre.

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
docker build -t cibersecurity-web .
docker run --rm -p 3000:3000 cibersecurity-web
```

Prueba con Docker Compose desde la raíz:

```bash
docker compose up --build
```

## Nota Sobre Build

`next build` puede mostrar un warning de Turbopack/NFT porque la app lee Markdown e imágenes desde el directorio padre del proyecto `web/`. Es una decisión intencional para mantener el contenido como archivos Markdown normales en la raíz del repositorio. El build sigue generando las páginas correctamente.

## Criterio de Calidad

La web debe sentirse como una guía informativa, no como una lista de tareas. El contenido puede mostrar ejemplos, criterios, mapas mentales y prácticas sugeridas, pero debe evitar lenguaje de entregas obligatorias.
