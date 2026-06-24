# Deploy en Easypanel

Esta guia deja la web lista para publicarse con Docker en Easypanel.

## Configuracion del Servicio

Usa un servicio tipo Docker/Git repository.

Valores recomendados:

| Campo | Valor |
| --- | --- |
| Repository | `https://github.com/chrisq-dev/Cybersecurity-learning-roadmap` |
| Branch | `main` |
| Build context | `/` |
| Dockerfile | `Dockerfile` |
| Internal port | `3000` |
| Health path | `/api/health` |
| Command | usar el comando del Dockerfile |

Variables de entorno:

```text
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
PORT=3000
HOSTNAME=0.0.0.0
```

## Verificacion Local

Construir imagen:

```bash
docker build -t cybersecurity-learning-roadmap .
```

Ejecutar contenedor:

```bash
docker run --rm -p 3000:3000 cybersecurity-learning-roadmap
```

Probar healthcheck:

```bash
curl http://localhost:3000/api/health
```

Respuesta esperada:

```json
{"ok":true,"service":"cybersecurity-learning-roadmap"}
```

## Verificacion con Docker Compose

```bash
docker compose up --build
```

Luego abre:

```text
http://localhost:3000
```

## Despues del Deploy

Cuando Easypanel entregue una URL publica:

1. Abrir la URL publica.
2. Probar `/api/health`.
3. Probar una leccion, por ejemplo `/INICIO-AQUI`.
4. Tomar screenshot de la portada.
5. Agregar la URL al campo `Website` de GitHub.
6. Actualizar el README con preview si se desea.

## Nota Sobre el Warning de Build

`next build` puede mostrar un warning de Turbopack/NFT porque la app lee Markdown desde el directorio padre de `web/`. Es esperado en esta arquitectura: la web se mantiene separada, pero el contenido sigue siendo Markdown normal en la raiz del repositorio.
