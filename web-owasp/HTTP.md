# HTTP

## Objetivo

Entender HTTP, el protocolo base de la web. Antes de estudiar vulnerabilidades web, debes entender requests, responses, headers, cookies y codigos de estado.

## Cliente y Servidor

En la web normalmente hay:

- Cliente: navegador, app movil, script o herramienta como `curl`.
- Servidor: aplicacion que responde peticiones.

El cliente envia una request. El servidor devuelve una response.

## Request HTTP

Una request tiene:

- Metodo.
- Ruta.
- Version.
- Headers.
- Body opcional.

Ejemplo:

```http
GET /login HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0
Accept: text/html
```

## Response HTTP

Una response tiene:

- Codigo de estado.
- Headers.
- Body.

Ejemplo:

```http
HTTP/1.1 200 OK
Content-Type: text/html
Set-Cookie: session=abc123; HttpOnly; Secure

<html>...</html>
```

## Metodos HTTP

| Metodo | Uso comun |
| --- | --- |
| GET | Obtener informacion |
| POST | Enviar o crear informacion |
| PUT | Reemplazar recurso |
| PATCH | Actualizar parcialmente |
| DELETE | Eliminar |
| OPTIONS | Ver metodos permitidos |

## Codigos de Estado

| Codigo | Significado |
| --- | --- |
| 200 | OK |
| 201 | Created |
| 301/302 | Redirect |
| 400 | Bad Request |
| 401 | No autenticado |
| 403 | No autorizado |
| 404 | No encontrado |
| 500 | Error del servidor |

## Headers Importantes

- `Host`: dominio solicitado.
- `User-Agent`: cliente usado.
- `Cookie`: cookies enviadas.
- `Set-Cookie`: cookie enviada por servidor.
- `Authorization`: credenciales o token.
- `Content-Type`: tipo de contenido.
- `Location`: destino de redireccion.

## Cookies

Una cookie es un dato que el servidor pide al navegador guardar y reenviar.

Uso comun:

- Sesiones.
- Preferencias.
- Tracking.

Atributos importantes:

- `HttpOnly`: JavaScript no puede leer la cookie.
- `Secure`: solo se envia por HTTPS.
- `SameSite`: reduce ciertos ataques CSRF.

## HTTPS

HTTPS es HTTP sobre TLS.

TLS ayuda a proteger:

- Confidencialidad.
- Integridad.
- Autenticidad del servidor.

Sin HTTPS, alguien en la red podria ver o modificar trafico.

## Observacion Segura

En un entorno propio o contra un sitio de ejemplo puedes observar HTTP con:

```bash
curl -I https://example.com
curl -v https://example.com
```

La lectura importante es:

- codigo de estado;
- headers;
- si hay redireccion;
- tipo de contenido;
- diferencia entre `-I` y `-v`.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar request y response.
- Diferenciar GET y POST.
- Explicar 401 vs 403.
- Explicar cookies.
- Explicar por que HTTPS importa.
