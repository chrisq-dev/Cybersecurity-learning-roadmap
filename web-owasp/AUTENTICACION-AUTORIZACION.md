# Autenticacion y Autorizacion

## Objetivo

Entender una de las diferencias mas importantes en seguridad web: comprobar quien eres vs comprobar que puedes hacer.

Muchos incidentes no ocurren porque el login falle, sino porque la aplicacion no valida correctamente que acciones puede realizar un usuario autenticado. Autenticacion y autorizacion deben revisarse por separado.

## Mapa Mental

```text
identidad -> sesion/token -> rol -> permiso -> recurso -> accion -> auditoria
```

Pregunta central:

```text
Esta identidad puede hacer esta accion sobre este recurso especifico?
```

## Autenticacion

Autenticacion aclara:

```text
Quien eres?
```

Ejemplos:

- Usuario y contraseña.
- MFA.
- Token.
- Certificado.
- SSO.

Controles:

- MFA;
- rate limiting;
- bloqueo progresivo;
- deteccion de password spraying;
- recuperacion segura;
- password hashing fuerte;
- proteccion contra credential stuffing;
- logs de login.

## Autorizacion

Autorizacion aclara:

```text
Que puedes hacer?
```

Ejemplos:

- Un usuario normal no puede entrar al panel admin.
- Un empleado solo ve sus propios documentos.
- Un API key solo puede leer, no escribir.

Modelos comunes:

- RBAC: permisos por rol.
- ABAC: permisos por atributos.
- ReBAC: permisos por relacion.
- ACL: listas de acceso por recurso.

El modelo exacto importa menos que validarlo siempre en servidor.

## Ejemplo Simple

Escenario:

- Inicias sesion correctamente.
- Tu usuario es `cliente`.
- Intentas entrar a `/admin`.

Resultados posibles:

- Si no estas logueado: `401 Unauthorized`.
- Si estas logueado pero no tienes permiso: `403 Forbidden`.

## 401 vs 403

- 401: no hay identidad valida o falta autenticacion.
- 403: hay identidad, pero no permiso.

Usarlos bien ayuda a depurar y a monitorear.

## Sesiones

Despues del login, una aplicacion suele crear una sesion.

Flujo:

1. Usuario envia credenciales.
2. Servidor valida.
3. Servidor crea sesion.
4. Servidor envia cookie de sesion.
5. Navegador reenvia cookie en requests futuras.

Controles de sesion:

- cookie `HttpOnly`;
- cookie `Secure`;
- cookie `SameSite`;
- expiracion;
- rotacion despues de login;
- invalidacion en logout;
- revocacion ante riesgo;
- proteccion contra fijacion de sesion.

## Tokens

Algunas APIs usan tokens.

Ejemplo:

```http
Authorization: Bearer eyJ...
```

Riesgos:

- Token expuesto.
- Token sin expiracion.
- Token con demasiados permisos.
- Token guardado en lugar inseguro.

Buenas practicas:

- expiracion corta cuando aplique;
- scopes;
- audience correcta;
- rotacion;
- revocacion;
- no guardar tokens en logs;
- proteger refresh tokens.

## Fallas Comunes

### Contraseñas Debiles

Mitigacion:

- Politicas razonables.
- MFA.
- Deteccion de fuerza bruta.

### Falta de MFA

Mitigacion:

- MFA para cuentas sensibles.

### Control de Acceso Roto

Ejemplo:

```text
/users/1001/invoices
/users/1002/invoices
```

Si cambias `1001` por `1002` y ves datos ajenos, hay un problema de autorizacion.

### Sesiones Inseguras

Mitigacion:

- Cookies `HttpOnly`, `Secure`, `SameSite`.
- Expiracion.
- Rotacion de sesion despues de login.
- Logout real.

### Falta de Autorizacion por Objeto

La app valida el rol general, pero no el recurso especifico.

Ejemplo:

```text
Usuario A puede ver factura 1001.
Usuario A no deberia ver factura 1002.
```

### Mass Assignment

La API acepta campos que el usuario no deberia controlar.

Ejemplo conceptual:

```json
{
  "name": "Ana",
  "role": "admin"
}
```

Si el backend acepta `role` desde el cliente, hay riesgo.

## Ejemplo de Matriz de Acceso

Esta aplicacion imaginaria permite razonar sobre roles y recursos:

Roles:

- Usuario.
- Soporte.
- Admin.

Recursos:

- Perfil.
- Facturas.
- Panel admin.
- Logs.

Una tabla de ejemplo puede verse asi:

| Recurso | Usuario | Soporte | Admin |
| --- | --- | --- | --- |
| Perfil propio | | | |
| Facturas propias | | | |
| Facturas de todos | | | |
| Panel admin | | | |
| Logs | | | |

En una revision informativa conviene considerar:

- que endpoints existirian;
- que respuesta daria cada caso no permitido;
- que eventos registrarias;
- que acciones requieren MFA o reautenticacion.

## Criterios de Revision de Acceso

Una matriz de acceso ayuda a razonar sobre:

- roles;
- recursos;
- acciones;
- reglas permitidas;
- reglas denegadas;
- respuestas esperadas;
- eventos de auditoria;
- casos donde se requiere MFA o reautenticacion.

## Controles Que Deben Entenderse

- MFA en cuentas sensibles reduce abuso de credenciales.
- Rate limit en login reduce fuerza bruta y automatizacion.
- Password hashing fuerte reduce impacto si se filtran hashes.
- Cookies seguras reducen robo o envio indebido de sesion.
- Rotar sesion despues de login reduce fijacion de sesion.
- Autorizacion por recurso evita Broken Access Control.
- El backend debe validar permisos; el frontend no es confiable.
- Errores 401/403 correctos ayudan a separar autenticacion y autorizacion.
- Logs de acciones sensibles permiten investigacion posterior.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar autenticacion.
- Explicar autorizacion.
- Explicar sesiones.
- Entender cookies de sesion.
- Dar un ejemplo de Broken Access Control.
- Construir una matriz de permisos y pruebas de autorizacion.
