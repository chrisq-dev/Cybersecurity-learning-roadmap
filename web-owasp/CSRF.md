# Cross-Site Request Forgery

## Objetivo

Entender CSRF y por que afecta acciones autenticadas.

CSRF es una falla de confianza en el navegador. La aplicación cree que una request es intencional solo porque trae cookies validas, pero el navegador puede enviar cookies automaticamente aunque la acción haya sido provocada desde otro sitio.

## Mapa Mental

```text
usuario autenticado -> sitio externo provoca request -> navegador envia cookie -> app acepta acción
```

La defensa consiste en exigir una prueba adicional de intencion.

## Qué es

CSRF ocurre cuando un sitio malicioso logra que el navegador de un usuario autenticado envie una request a otra aplicación donde ya tiene sesión.

La clave:

- El navegador envia cookies automaticamente.
- La aplicación confia solo en la cookie.
- Falta una protección adicional.

## Ejemplo Conceptual

Usuario está autenticado en `bank.local`.

Otra página intenta provocar:

```text
POST /transfer
```

Si la app no valida token CSRF u otros controles, podria aceptar la acción.

## Requisitos Conceptuales

CSRF normalmente requiere:

- Usuario autenticado;
- Cookie o credencial enviada automaticamente;
- Acción que cambia estado;
- Ausencia de token o control equivalente;
- Endpoint que acepta la request.

## Impacto

Depende de la acción:

- Cambiar email.
- Cambiar contraseña.
- Crear usuarios.
- Transferir fondos.
- Modificar configuración.

Acciones más sensibles:

- Cambiar email;
- Cambiar password;
- Agregar MFA;
- Desactivar MFA;
- Crear API keys;
- Agregar usuarios;
- Modificar permisos;
- Hacer pagos;
- Cambiar configuración de seguridad.

## Mitigacion

- Tokens CSRF impredecibles.
- SameSite en cookies.
- Reautenticacion para acciones sensibles.
- Validar origen cuando aplique.
- Usar métodos adecuados.

## Token CSRF

Un token CSRF debe:

- Ser impredecible;
- Estar asociado a la sesión;
- Validarse en servidor;
- No depender solo de JavaScript;
- No reutilizarse de forma insegura en flujos sensibles.

La idea es que otro sitio no pueda fabricar una request valida porque no conoce el token.

## SameSite

Atributo de cookie que limita envio cross-site.

Valores:

- `Strict`.
- `Lax`.
- `None` con `Secure`.

`SameSite=Lax` ayuda en muchos casos, pero no reemplaza tokens para acciones sensibles en aplicaciones críticas.

## Cuándo Es Menos Probable

CSRF es menos probable si:

- La app usa tokens bearer en headers no enviados automaticamente.
- Cookies tienen SameSite adecuado.
- Acciones sensibles requieren token CSRF.

## Validación de Origin y Referer

Puede ser control adicional:

- Verificar que `Origin` sea esperado;
- Usar `Referer` con cuidado;
- No depender solo de headers si el caso es crítico;
- Registrar fallos.

## Errores Comunes

- Proteger solo formularios y olvidar APIs internas.
- Usar GET para acciones que cambian estado.
- Pensar que CORS resuelve CSRF automaticamente.
- No proteger cambio de email o MFA.
- Tokens predecibles o no validados.

## Ejemplo de Análisis CSRF

Esta acción ficticia muestra un cambio de estado sensible:

```text
POST /change-email
Cookie: session=...
Body: email=nuevo@example.com
```

El análisis debe cubrir:

- Qué control falta?
- Qué impacto tiene?
- Cómo lo mitigarias?

En una revisión informativa conviene considerar:

- Que cookie flags usarias;
- Si pedirias reautenticacion;
- Que logs registrarias;
- Que código de respuesta daria si falta token.

## Criterios de Revisión

Para entender si una acción es sensible, revisa:

- Si cambia estado;
- Si usa cookies automaticamente;
- Si requiere token CSRF;
- Que política `SameSite` aplica;
- Si requiere reautenticacion;
- Que evento de log ayuda a investigar abuso;
- Que respuesta debe devolverse si falta el token.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar por que las cookies importan en CSRF.
- Explicar token CSRF.
- Explicar SameSite.
- Identificar acciones sensibles.
- Diferenciar CSRF de XSS y CORS.
