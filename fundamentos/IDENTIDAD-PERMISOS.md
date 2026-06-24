# Identidad, Permisos y Acceso

## Objetivo

Entender como los sistemas deciden quien eres y que puedes hacer.

## Identidad

Una identidad representa a una persona, servicio o sistema.

Ejemplos:

- Usuario local.
- Usuario de dominio.
- Cuenta de servicio.
- Llave API.
- Rol cloud.

## Autenticacion

Autenticacion significa demostrar quien eres.

Factores comunes:

- Algo que sabes: contraseña.
- Algo que tienes: token, telefono, llave fisica.
- Algo que eres: biometria.

MFA significa usar mas de un factor.

## Autorizacion

Autorizacion significa decidir que puedes hacer despues de autenticarte.

Ejemplo:

- Puedes iniciar sesion en una app.
- Pero no puedes entrar al panel admin.

La primera parte es autenticacion; la segunda es autorizacion.

## Auditoria

Auditoria significa registrar acciones para poder revisarlas.

Ejemplos:

- Usuario inicio sesion.
- Usuario cambio contraseña.
- Usuario accedio a un archivo.
- Usuario agrego una regla de firewall.

## Permisos

Los permisos definen acciones permitidas.

Ejemplos:

- Leer.
- Escribir.
- Ejecutar.
- Eliminar.
- Administrar.

## Principio de Minimo Privilegio

Cada identidad debe tener solo los permisos necesarios.

Mal ejemplo:

- Todos los usuarios son administradores.

Buen ejemplo:

- Usuario normal para trabajo diario.
- Admin solo cuando se necesita.
- Cuenta de servicio con permisos especificos.

## Separacion de Funciones

No una sola persona o cuenta deberia poder hacerlo todo sin control.

Ejemplo:

- Quien desarrolla no deberia poder cambiar produccion sin revision.
- Quien aprueba pagos no deberia poder crearlos y aprobarlos solo.

## Riesgos Comunes

- Contraseñas debiles.
- MFA desactivado.
- Usuarios compartidos.
- Cuentas sin owner.
- Permisos excesivos.
- Cuentas antiguas activas.
- Llaves API expuestas.

## Ejemplo de Analisis

Estas cuentas imaginarias muestran riesgos comunes:

| Cuenta | Uso | Riesgo | Mejora |
| --- | --- | --- | --- |
| admin | Uso diario | Privilegios excesivos | Usar cuenta normal |
| backup-service | Backups | Permisos amplios | Limitar a rutas necesarias |
| ex-empleado | Sin uso | Acceso indebido | Desactivar |
| api-prod | App productiva | Secreto expuesto | Rotar y guardar en secret manager |

El patron a entender es que una identidad debe tener proposito, owner, permisos minimos y ciclo de vida claro. Cuando alguno de esos puntos falta, el riesgo aumenta aunque no exista un ataque activo.

## Criterio de Dominio

Puedes avanzar cuando puedas explicar:

- Identidad.
- Autenticacion.
- Autorizacion.
- Auditoria.
- MFA.
- Minimo privilegio.
- Por que cuentas de servicio son sensibles.
