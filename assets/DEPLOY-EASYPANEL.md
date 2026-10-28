# Despliegue en Easypanel

El contenedor necesita la aplicación web y los Markdown del repositorio, porque la web lee el contenido desde el directorio padre de `web/`.

## Configuración

- Repositorio: `chrisq-dev/Cybersecurity-learning-roadmap`.
- Build context: raíz del repositorio.
- Dockerfile: `Dockerfile`.
- Puerto interno: `3000`.
- Healthcheck: `/api/health`.
- Variables: `NEXT_TELEMETRY_DISABLED=1` (ya definida en la imagen).

## Verificación local

```bash
npm --prefix web ci
npm --prefix web run check
docker build -t cbsdev-web .
docker run --rm -p 3000:3000 cbsdev-web
```

Comprueba:

```bash
curl -fsS http://localhost:3000/api/health
curl -fsSI http://localhost:3000/
curl -fsS "http://localhost:3000/api/search?q=linux" | head
```

## Contenido

El Dockerfile copia cada carpeta publicada y `assets/`. Si añades una carpeta nueva, actualiza también `Dockerfile`, `web/lib/markdown.js`, `web/lib/areas.js` y `INICIO-AQUI.md`; el CI falla si falta alguno de esos registros.
