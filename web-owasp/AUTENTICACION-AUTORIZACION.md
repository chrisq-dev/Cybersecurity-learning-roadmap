# Autenticación y Autorización

## Objetivo

Entender una de las diferencias más importantes en seguridad web: comprobar quien eres vs comprobar que puedes hacer.

Muchos incidentes no ocurren porque el login falle, sino porque la aplicación no valida correctamente que acciones puede realizar un usuario autenticado. Autenticación y autorización deben revisarse por separado.

## Mapa Mental

```text
identidad -> sesion/token -> rol -> permiso -> recurso -> acción -> auditoria
```

Pregunta central:

```text
Esta identidad puede hacer está acción sobre este recurso especifico?
```

## Autenticación

Autenticación aclara:

```text
Quién eres?
```

Ejemplos:

- Usuario y contraseña.
- MFA.
- Token.
- Certificado.
- SSO.

Controles:

- MFA;
- Rate limiting;
- Bloqueo progresivo;
- Detección de password spraying;
- Recuperación segura;
- Password hashing fuerte;
- Protección contra credential stuffing;
- Logs de login.

## Autorización

Autorización aclara:

```text
Qué puedes hacer?
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

- Inicias sesión correctamente.
- Tu usuario es `cliente`.
- Intentas entrar a `/admin`.

Resultados posibles:

- Si no estas logueado: `401 Unauthorized`.
- Si estas logueado pero no tienes permiso: `403 Forbidden`.

## 401 vs 403

- 401: no hay identidad valida o falta autenticación.
- 403: hay identidad, pero no permiso.

Usarlos bien ayuda a depurar y a monitorear.

## Sesiones

Después del login, una aplicación suele crear una sesión.

Flujo:

1. Usuario envia credenciales.
2. Servidor valida.
3. Servidor crea sesión.
4. Servidor envia cookie de sesión.
5. Navegador reenvia cookie en requests futuras.

Controles de sesión:

- Cookie `HttpOnly`;
- Cookie `Secure`;
- Cookie `SameSite`;
- Expiracion;
- Rotación después de login;
- Invalidacion en logout;
- Revocacion ante riesgo;
- Protección contra fijacion de sesión.

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

Buenas prácticas:

- Expiracion corta cuando aplique;
- Scopes;
- Audience correcta;
- Rotación;
- Revocacion;
- No guardar tokens en logs;
- Proteger refresh tokens.

## Fallas Comunes

### Contraseñas Debiles

Mitigacion:

- Políticas razonables.
- MFA.
- Detección de fuerza bruta.

### Falta de MFA

Mitigacion:

- MFA para cuentas sensibles.

### Control de Acceso Roto

Ejemplo:

```text
/users/1001/invoices
/users/1002/invoices
```

Si cambias `1001` por `1002` y ves datos ajenos, hay un problema de autorización.

### Sesiones Inseguras

Mitigacion:

- Cookies `HttpOnly`, `Secure`, `SameSite`.
- Expiracion.
- Rotación de sesión después de login.
- Logout real.

### Falta de Autorización por Objeto

La app valida el rol general, pero no el recurso especifico.

Ejemplo:

```text
Usuario A puede ver factura 1001.
Usuario A no debería ver factura 1002.
```

### Mass Assignment

La API acepta campos que el usuario no debería controlar.

Ejemplo conceptual:

```json
{
  "name": "Ana",
  "role": "admin"
}
```

Si el backend acepta `role` desde el cliente, hay riesgo.

## Ejemplo de Matriz de Acceso

Esta aplicación imaginaria permite razonar sobre roles y recursos:

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

En una revisión informativa conviene considerar:

- Que endpoints existirian;
- Que respuesta daria cada caso no permitido;
- Que eventos registrarias;
- Que acciones requieren MFA o reautenticacion.

## Criterios de Revisión de Acceso

Una matriz de acceso ayuda a razonar sobre:

- Roles;
- Recursos;
- Acciones;
- Reglas permitidas;
- Reglas denegadas;
- Respuestas esperadas;
- Eventos de auditoria;
- Casos donde se requiere MFA o reautenticacion.

## Controles Que Deben Entenderse

- MFA en cuentas sensibles reduce abuso de credenciales.
- Rate limit en login reduce fuerza bruta y automatización.
- Password hashing fuerte reduce impacto si se filtran hashes.
- Cookies seguras reducen robo o envio indebido de sesión.
- Rotar sesión después de login reduce fijacion de sesión.
- Autorización por recurso evita Broken Access Control.
- El backend debe validar permisos; el frontend no es confiable.
- Errores 401/403 correctos ayudan a separar autenticación y autorización.
- Logs de acciones sensibles permiten investigación posterior.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar autenticación.
- Explicar autorización.
- Explicar sesiones.
- Entender cookies de sesión.
- Dar un ejemplo de Broken Access Control.
- Construir una matriz de permisos y pruebas de autorización.
