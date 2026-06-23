# Cross-Site Request Forgery

## Objetivo

Entender CSRF y por que afecta acciones autenticadas.

## Que es

CSRF ocurre cuando un sitio malicioso logra que el navegador de un usuario autenticado envie una request a otra aplicacion donde ya tiene sesion.

La clave:

- El navegador envia cookies automaticamente.
- La aplicacion confia solo en la cookie.
- Falta una proteccion adicional.

## Ejemplo Conceptual

Usuario esta autenticado en `bank.local`.

Otra pagina intenta provocar:

```text
POST /transfer
```

Si la app no valida token CSRF u otros controles, podria aceptar la accion.

## Impacto

Depende de la accion:

- Cambiar email.
- Cambiar contraseña.
- Crear usuarios.
- Transferir fondos.
- Modificar configuracion.

## Mitigacion

- Tokens CSRF impredecibles.
- SameSite en cookies.
- Reautenticacion para acciones sensibles.
- Validar origen cuando aplique.
- Usar metodos adecuados.

## SameSite

Atributo de cookie que limita envio cross-site.

Valores:

- `Strict`.
- `Lax`.
- `None` con `Secure`.

## Cuando Es Menos Probable

CSRF es menos probable si:

- La app usa tokens bearer en headers no enviados automaticamente.
- Cookies tienen SameSite adecuado.
- Acciones sensibles requieren token CSRF.

## Practica Segura

Analiza una accion ficticia:

```text
POST /change-email
Cookie: session=...
Body: email=nuevo@example.com
```

Responde:

- Que control falta?
- Que impacto tiene?
- Como lo mitigarias?

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar por que las cookies importan en CSRF.
- Explicar token CSRF.
- Explicar SameSite.
- Identificar acciones sensibles.
