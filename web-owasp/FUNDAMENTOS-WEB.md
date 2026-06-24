# Fundamentos Web

## Objetivo

Entender como funciona la web antes de estudiar vulnerabilidades.

La seguridad web no empieza con XSS o SQL Injection. Empieza entendiendo como viajan las peticiones, como se mantiene una sesion, como se toman decisiones de autorizacion y donde se rompe la confianza entre cliente, servidor, base de datos y terceros.

## Mapa Mental

```text
navegador -> HTTP -> servidor -> aplicacion -> base de datos -> respuesta
```

Preguntas clave:

- Que envia el cliente?
- Que valida el servidor?
- Que datos se consultan o modifican?
- Que identidad tiene el usuario?
- Que permisos se aplican?
- Que queda registrado en logs?

## HTTP

Una peticion HTTP tiene:

- Metodo.
- Ruta.
- Headers.
- Body opcional.

Una respuesta HTTP tiene:

- Codigo de estado.
- Headers.
- Body.

Ejemplo de peticion:

```http
POST /login HTTP/1.1
Host: app.local
Content-Type: application/json
Cookie: session=abc123

{"email":"user@example.com","password":"example"}
```

Ejemplo de respuesta:

```http
HTTP/1.1 200 OK
Content-Type: application/json
Set-Cookie: session=xyz789; HttpOnly; Secure; SameSite=Lax

{"ok":true}
```

## Metodos Comunes

- GET: solicitar informacion.
- POST: enviar informacion.
- PUT/PATCH: actualizar informacion.
- DELETE: eliminar informacion.

## Codigos Comunes

- 200 OK.
- 301/302 redirect.
- 400 bad request.
- 401 unauthenticated.
- 403 forbidden.
- 404 not found.
- 500 server error.

## Headers Importantes

- `Host`: dominio solicitado.
- `User-Agent`: cliente usado.
- `Content-Type`: formato del body.
- `Authorization`: credenciales o token.
- `Cookie`: cookies enviadas por el navegador.
- `Set-Cookie`: cookies que el servidor entrega.
- `Location`: destino de redireccion.
- `X-Forwarded-For`: IP original cuando hay proxy.

En seguridad, los headers ayudan a entender autenticacion, sesiones, proxies, CORS, cache, redirecciones y configuraciones debiles.

## Autenticacion vs Autorizacion

- Autenticacion: demostrar quien eres.
- Autorizacion: demostrar que puedes hacer.

Ejemplo:

- Login correcto: autenticacion.
- Acceder al panel admin: autorizacion.

Error comun: una aplicacion valida que el usuario inicio sesion, pero no valida si puede acceder al recurso especifico.

Ejemplo:

```text
/api/users/1001/invoices
/api/users/1002/invoices
```

Si un usuario cambia `1001` por `1002` y ve datos ajenos, el problema es de autorizacion.

## Sesiones y Cookies

Una sesion mantiene estado entre peticiones.

Controles importantes:

- Cookies con `HttpOnly`.
- Cookies con `Secure`.
- Cookies con `SameSite`.
- Expiracion razonable.
- Invalidacion al cerrar sesion.
- Rotacion despues de login.

## Superficie de Ataque Web

Revisa:

- Formularios.
- Parametros en URL.
- APIs.
- Uploads.
- Login y recuperacion de contrasena.
- Paneles admin.
- Redirecciones.
- CORS.
- Cookies.
- Dependencias frontend/backend.

## Errores Comunes de Principiante

- Probar payloads sin entender el flujo.
- Confundir autenticacion con autorizacion.
- No revisar requests reales con DevTools o proxy.
- Ignorar codigos 301/302.
- Confiar en validacion del frontend.
- No documentar impacto.

## Practica Guiada

Ejecuta:

```bash
curl -I https://example.com
curl -v https://example.com
curl -s -D headers.txt https://example.com -o body.html
```

Documenta:

- Codigo HTTP.
- Headers.
- Servidor si aparece.
- Tipo de contenido.
- Redirecciones si existen.

Despues abre DevTools en tu navegador y revisa:

1. Pestaña Network.
2. Metodo usado.
3. Headers.
4. Cookies.
5. Codigo de respuesta.
6. Tiempo de respuesta.

## OWASP

Cuando estudies una vulnerabilidad, usa este formato:

- Que es.
- Por que ocurre.
- Como se explota en laboratorio.
- Que impacto tiene.
- Como se mitiga.

## Mini Laboratorio: Anatomia de una Peticion

Una nota de ejemplo, `anatomia-http.md`, puede incluir:

1. Una peticion HTTP capturada con DevTools o `curl -v`.
2. Explicacion de metodo, ruta, headers y body.
3. Una respuesta HTTP con codigo, headers y body.
4. Tres posibles riesgos en ese flujo.
5. Tres controles defensivos.

## Tabla de Relacion con OWASP

| Concepto base | Vulnerabilidad relacionada |
| --- | --- |
| Autorizacion | Broken Access Control |
| Sesiones | Identification and Authentication Failures |
| Inputs | Injection, XSS |
| Uploads | Unrestricted File Upload, RCE |
| Dependencias | Vulnerable and Outdated Components |
| Logs | Security Logging and Monitoring Failures |

## Criterio de Dominio

Puedes avanzar cuando puedas explicar:

- Request y response.
- Headers.
- Cookies.
- Sesiones.
- Autenticacion vs autorizacion.
- Que es OWASP Top 10.
- Como leer una peticion y una respuesta reales.
