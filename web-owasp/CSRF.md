# Cross-Site Request Forgery

## Objetivo

Entender CSRF y por que afecta acciones autenticadas.

CSRF es una falla de confianza en el navegador. La aplicacion cree que una request es intencional solo porque trae cookies validas, pero el navegador puede enviar cookies automaticamente aunque la accion haya sido provocada desde otro sitio.

## Mapa Mental

```text
usuario autenticado -> sitio externo provoca request -> navegador envia cookie -> app acepta accion
```

La defensa consiste en exigir una prueba adicional de intencion.

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

## Requisitos Conceptuales

CSRF normalmente requiere:

- usuario autenticado;
- cookie o credencial enviada automaticamente;
- accion que cambia estado;
- ausencia de token o control equivalente;
- endpoint que acepta la request.

## Impacto

Depende de la accion:

- Cambiar email.
- Cambiar contraseña.
- Crear usuarios.
- Transferir fondos.
- Modificar configuracion.

Acciones mas sensibles:

- cambiar email;
- cambiar password;
- agregar MFA;
- desactivar MFA;
- crear API keys;
- agregar usuarios;
- modificar permisos;
- hacer pagos;
- cambiar configuracion de seguridad.

## Mitigacion

- Tokens CSRF impredecibles.
- SameSite en cookies.
- Reautenticacion para acciones sensibles.
- Validar origen cuando aplique.
- Usar metodos adecuados.

## Token CSRF

Un token CSRF debe:

- ser impredecible;
- estar asociado a la sesion;
- validarse en servidor;
- no depender solo de JavaScript;
- no reutilizarse de forma insegura en flujos sensibles.

La idea es que otro sitio no pueda fabricar una request valida porque no conoce el token.

## SameSite

Atributo de cookie que limita envio cross-site.

Valores:

- `Strict`.
- `Lax`.
- `None` con `Secure`.

`SameSite=Lax` ayuda en muchos casos, pero no reemplaza tokens para acciones sensibles en aplicaciones criticas.

## Cuando Es Menos Probable

CSRF es menos probable si:

- La app usa tokens bearer en headers no enviados automaticamente.
- Cookies tienen SameSite adecuado.
- Acciones sensibles requieren token CSRF.

## Validacion de Origin y Referer

Puede ser control adicional:

- verificar que `Origin` sea esperado;
- usar `Referer` con cuidado;
- no depender solo de headers si el caso es critico;
- registrar fallos.

## Errores Comunes

- Proteger solo formularios y olvidar APIs internas.
- Usar GET para acciones que cambian estado.
- Pensar que CORS resuelve CSRF automaticamente.
- No proteger cambio de email o MFA.
- Tokens predecibles o no validados.

## Practica Segura Guiada

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

En una revision informativa conviene considerar:

- que cookie flags usarias;
- si pedirias reautenticacion;
- que logs registrarias;
- que codigo de respuesta daria si falta token.

## Criterios de Revision

Para entender si una accion es sensible, revisa:

- si cambia estado;
- si usa cookies automaticamente;
- si requiere token CSRF;
- que politica `SameSite` aplica;
- si requiere reautenticacion;
- que evento de log ayuda a investigar abuso;
- que respuesta debe devolverse si falta el token.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar por que las cookies importan en CSRF.
- Explicar token CSRF.
- Explicar SameSite.
- Identificar acciones sensibles.
- Diferenciar CSRF de XSS y CORS.
