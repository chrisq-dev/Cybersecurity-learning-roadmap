# Fundamentos Web

## Objetivo

Entender como funciona la web antes de estudiar vulnerabilidades.

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

## Autenticacion vs Autorizacion

- Autenticacion: demostrar quien eres.
- Autorizacion: demostrar que puedes hacer.

Ejemplo:

- Login correcto: autenticacion.
- Acceder al panel admin: autorizacion.

## Practica

Ejecuta:

```bash
curl -I https://example.com
curl -v https://example.com
```

Documenta:

- Codigo HTTP.
- Headers.
- Servidor si aparece.
- Tipo de contenido.
- Redirecciones si existen.

## OWASP

Cuando estudies una vulnerabilidad, usa este formato:

- Que es.
- Por que ocurre.
- Como se explota en laboratorio.
- Que impacto tiene.
- Como se mitiga.

## Criterio de Dominio

Puedes avanzar cuando puedas explicar:

- Request y response.
- Headers.
- Cookies.
- Sesiones.
- Autenticacion vs autorizacion.
- Que es OWASP Top 10.
