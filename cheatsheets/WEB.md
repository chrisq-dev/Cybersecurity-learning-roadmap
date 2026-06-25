# Cheatsheet Web

Referencia rapida para interpretar HTTP, sesiones, controles web y riesgos OWASP.

## HTTP Methods

- GET: obtener.
- POST: enviar/crear.
- PUT: reemplazar.
- PATCH: actualizar.
- DELETE: eliminar.

## Request / Response

```http
GET /perfil HTTP/1.1
Host: app.local
Cookie: session=abc
```

```http
HTTP/1.1 200 OK
Content-Type: text/html
Set-Cookie: session=xyz; HttpOnly; Secure; SameSite=Lax
```

## Codigos

- 200 OK.
- 201 Created.
- 301/302 Redirect.
- 400 Bad Request.
- 401 No autenticado.
- 403 No autorizado.
- 404 No encontrado.
- 500 Error servidor.

## 401 vs 403

- `401`: falta autenticación o la sesión/token no es valido.
- `403`: hay identidad, pero no permiso.

## Headers

- Host.
- Cookie.
- Set-Cookie.
- Authorization.
- Content-Type.
- Location.

## Headers de Seguridad

| Header | Propósito |
| --- | --- |
| `Content-Security-Policy` | reducir impacto de XSS |
| `Strict-Transport-Security` | forzar HTTPS |
| `X-Content-Type-Options` | evitar MIME sniffing |
| `Referrer-Policy` | controlar información enviada como referrer |
| `Permissions-Policy` | limitar APIs del navegador |

## Cookies Seguras

- HttpOnly.
- Secure.
- SameSite.

## Authn vs Authz

- Autenticación: quien eres.
- Autorización: que puedes hacer.

Broken Access Control suele aparecer cuando el backend no valida permisos por recurso.

## OWASP Rápido

- Broken Access Control.
- Cryptographic Failures.
- Injection.
- Insecure Design.
- Security Misconfiguration.
- Vulnerable Components.
- Authentication Failures.
- Integrity Failures.
- Logging/Monitoring Failures.
- SSRF.

## Riesgos por Flujo

| Flujo | Riesgos frecuentes |
| --- | --- |
| Login | fuerza bruta, credential stuffing, sesiones inseguras |
| Perfil | IDOR/BOLA, datos sensibles |
| Admin | falta de autorización, acciones críticas |
| Upload | archivo ejecutable, malware, DoS |
| API | tokens excesivos, rate limit ausente, mass assignment |

## Señales de Alerta

- IDs modificables en URL.
- Errores internos visibles.
- Cookies sin flags.
- Uploads sin validación.
- Redirecciones abiertas.
- CORS demasiado permisivo.
- Logs sin eventos de seguridad.

## Controles Base

- Validación en servidor;
- Autorización por recurso;
- Consultas parametrizadas;
- Escape por contexto;
- Tokens CSRF cuando aplica;
- Cookies seguras;
- Logging de acciones sensibles;
- Rate limiting.
