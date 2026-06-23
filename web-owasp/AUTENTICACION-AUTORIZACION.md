# Autenticacion y Autorizacion

## Objetivo

Entender una de las diferencias mas importantes en seguridad web: comprobar quien eres vs comprobar que puedes hacer.

## Autenticacion

Autenticacion responde:

```text
Quien eres?
```

Ejemplos:

- Usuario y contraseña.
- MFA.
- Token.
- Certificado.
- SSO.

## Autorizacion

Autorizacion responde:

```text
Que puedes hacer?
```

Ejemplos:

- Un usuario normal no puede entrar al panel admin.
- Un empleado solo ve sus propios documentos.
- Un API key solo puede leer, no escribir.

## Ejemplo Simple

Escenario:

- Inicias sesion correctamente.
- Tu usuario es `cliente`.
- Intentas entrar a `/admin`.

Resultados posibles:

- Si no estas logueado: `401 Unauthorized`.
- Si estas logueado pero no tienes permiso: `403 Forbidden`.

## Sesiones

Despues del login, una aplicacion suele crear una sesion.

Flujo:

1. Usuario envia credenciales.
2. Servidor valida.
3. Servidor crea sesion.
4. Servidor envia cookie de sesion.
5. Navegador reenvia cookie en requests futuras.

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

## Practica

Analiza una aplicacion imaginaria:

Roles:

- Usuario.
- Soporte.
- Admin.

Recursos:

- Perfil.
- Facturas.
- Panel admin.
- Logs.

Crea una tabla:

| Recurso | Usuario | Soporte | Admin |
| --- | --- | --- | --- |
| Perfil propio | | | |
| Facturas propias | | | |
| Facturas de todos | | | |
| Panel admin | | | |
| Logs | | | |

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar autenticacion.
- Explicar autorizacion.
- Explicar sesiones.
- Entender cookies de sesion.
- Dar un ejemplo de Broken Access Control.
