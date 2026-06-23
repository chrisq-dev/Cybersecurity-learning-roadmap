# Permisos y Auditoria en Bases de Datos

## Objetivo

Entender roles, permisos y monitoreo de actividad.

## Usuarios y Roles

Una base de datos puede tener usuarios y roles.

Ejemplos:

- App read/write limitada.
- Analista read-only.
- DBA admin.
- Servicio de backup.

## Minimo Privilegio

La app debe tener solo permisos necesarios.

Mal:

```text
App usa cuenta DBA.
```

Mejor:

```text
App puede leer/escribir tablas necesarias, no administrar servidor.
```

## Separacion de Ambientes

Ambientes:

- Desarrollo.
- Pruebas.
- Produccion.

Riesgo:

- Copiar datos reales a desarrollo sin proteccion.

## Auditoria

Eventos importantes:

- Login exitoso/fallido.
- Cambios de permisos.
- Creacion de usuarios.
- Consultas a tablas sensibles.
- Exportaciones masivas.
- Cambios de esquema.

## Alertas

Ejemplos:

- Usuario nuevo con rol admin.
- Muchos logins fallidos.
- Exportacion fuera de horario.
- Consulta masiva a datos sensibles.
- Acceso desde IP inusual.

## Practica

Crea matriz:

| Identidad | Permiso | Justificacion | Riesgo | Control |
| --- | --- | --- | --- | --- |

Incluye:

- App.
- Analista.
- DBA.
- Backup.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Diseñar roles basicos.
- Identificar permisos excesivos.
- Proponer auditoria.
- Crear alertas de DB conceptuales.
