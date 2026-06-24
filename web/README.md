# Web del Roadmap de Ciberseguridad

Aplicacion Next.js para leer las guias del repositorio como una plataforma web en espanol.

La app lee los archivos Markdown del directorio padre, genera rutas estaticas y permite navegar los modulos como una plataforma local de estudio.

## Requisitos

- Node.js.
- npm.
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

## Como Funciona

- `lib/markdown.js` lee los Markdown del repositorio.
- El indice publico esta curado: la web muestra guias de estudio, no documentos internos del repo.
- `app/page.js` genera la portada con categorias y buscador.
- `app/[...slug]/page.js` renderiza cada leccion.
- `app/api/health/route.js` expone healthcheck para Docker/Easypanel.
- `components/MarkdownRenderer.jsx` convierte Markdown a HTML.
- `components/TableOfContents.jsx` genera la tabla de contenido.
- `components/CategoryList.jsx` maneja busqueda, filtros y rutas por perfil.

## Convenciones de Contenido

Para que una leccion funcione bien en la web:

- usa un solo `# Titulo` principal;
- separa secciones con `##`;
- usa `###` para subsecciones;
- agrega bloques de codigo cuando haya comandos;
- incluye practica y criterio de dominio;
- usa ejemplos, mapas mentales y puntos a observar;
- evita depender de imagenes externas cuando no sean necesarias.

## Contenido Visible

La web debe mostrar recursos para alumnos en orden de estudio. La navegacion principal debe estar centrada en guias, labs, playbooks, cheatsheets y recursos profesionales utiles.

## Navegacion Actual

La web incluye:

- busqueda por titulo y categoria;
- busqueda por contenido;
- filtros por nivel;
- rutas sugeridas por perfil;
- navegacion por rutas;
- tabla de contenido;
- enlaces anterior/siguiente entre guias.

## Nota

La app asume que se ejecuta desde `web/` y que los contenidos Markdown viven en el directorio padre.

## Deploy con Docker en Easypanel

El `Dockerfile` esta en la raiz del repositorio porque la web necesita leer los Markdown del directorio padre.

Configuracion sugerida:

- Build context: raiz del repositorio.
- Dockerfile: `Dockerfile`.
- Puerto interno: `3000`.
- Health path: `/api/health`.
- Comando: usar el comando definido en la imagen.

Prueba local:

```bash
docker build -t cibersecurity-web .
docker run --rm -p 3000:3000 cibersecurity-web
```

Prueba con Docker Compose desde la raiz:

```bash
docker compose up --build
```

## Nota Sobre Build

`next build` puede mostrar un warning de Turbopack/NFT porque la app lee Markdown e imagenes desde el directorio padre del proyecto `web/`. Es una decision intencional para mantener el contenido como archivos Markdown normales en la raiz del repositorio. El build sigue generando las paginas correctamente.

## Criterio de Calidad

La web debe sentirse como una guia informativa, no como una lista de tareas. El contenido puede mostrar ejemplos, criterios, mapas mentales y practicas sugeridas, pero debe evitar lenguaje de entregas obligatorias.
