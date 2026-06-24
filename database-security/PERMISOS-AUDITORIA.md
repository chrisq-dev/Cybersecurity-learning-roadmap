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

El objetivo no es crear muchos roles por crear complejidad. El objetivo es que cada identidad tenga una razon clara para existir, permisos limitados y evidencia revisable.

Una identidad puede ser:

- Persona: DBA, analista, desarrollador.
- Servicio: aplicacion, worker, tarea programada, backup.
- Integracion: BI, ETL, monitoreo, auditoria.

Cada una debe responder:

- Para que existe?
- Quien es responsable?
- Desde donde se conecta?
- Que datos necesita?
- Que acciones puede ejecutar?
- Cuando se reviso por ultima vez?

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

## Modelo de Roles Sugerido

| Rol | Uso | Permisos tipicos | Riesgo si se abusa |
| --- | --- | --- | --- |
| `app_rw` | Backend principal | Leer/escribir tablas necesarias | Modificacion o lectura de datos de negocio |
| `app_readonly` | Consultas internas | Solo lectura limitada | Exfiltracion si lee demasiado |
| `analyst_ro` | Analisis/BI | Vistas o tablas anonimizadas | Fuga de PII o secretos |
| `backup_svc` | Respaldos | Lectura/exportacion controlada | Fuga masiva por dumps |
| `migration_svc` | Migraciones | Cambios de esquema controlados | Alteracion de estructura |
| `dba_admin` | Administracion | Privilegios altos | Control total de DB |

La cuenta admin debe usarse solo para administracion real, no para operacion diaria de la app.

## Permisos Peligrosos

Estos permisos requieren justificacion fuerte:

- Crear usuarios.
- Modificar roles.
- Otorgar permisos a otros.
- Ejecutar comandos del sistema desde DB.
- Leer todas las bases o esquemas.
- Exportar datos completos.
- Desactivar auditoria.
- Modificar logs o configuracion de seguridad.

No siempre se llaman igual en cada motor, pero el criterio es el mismo: si permite ampliar privilegios, borrar evidencia o extraer todo, es sensible.

## Separacion de Ambientes

Ambientes:

- Desarrollo.
- Pruebas.
- Produccion.

Riesgo:

- Copiar datos reales a desarrollo sin proteccion.

Buenas practicas:

- Produccion tiene controles mas estrictos.
- Desarrollo usa datos sinteticos o anonimizados.
- Las credenciales de desarrollo no sirven en produccion.
- Las redes de dev/test no tienen acceso directo a produccion.
- Los backups de produccion no se restauran en equipos personales.

## Auditoria

Eventos importantes:

- Login exitoso/fallido.
- Cambios de permisos.
- Creacion de usuarios.
- Consultas a tablas sensibles.
- Exportaciones masivas.
- Cambios de esquema.

La auditoria debe ayudar a contestar:

- Quien accedio?
- Desde donde?
- A que datos?
- Que cambio?
- Cuando ocurrio?
- Fue normal para ese usuario?
- Hay evidencia suficiente para investigar?

Auditar todo sin criterio puede generar demasiado ruido. Lo importante es registrar eventos de seguridad y operaciones sensibles con suficiente contexto.

## Alertas

Ejemplos:

- Usuario nuevo con rol admin.
- Muchos logins fallidos.
- Exportacion fuera de horario.
- Consulta masiva a datos sensibles.
- Acceso desde IP inusual.

## Senales de Riesgo

| Senal | Posible explicacion | Accion inicial |
| --- | --- | --- |
| Muchos logins fallidos | Fuerza bruta, error de app o credencial vieja | Revisar origen, usuario y patron |
| Nuevo usuario admin | Cambio autorizado o escalacion indebida | Confirmar ticket/aprobacion |
| Exportacion grande | BI, backup o exfiltracion | Validar owner, horario y destino |
| Acceso fuera de pais/region | VPN legitima o cuenta comprometida | Correlacionar con identidad y MFA |
| Cambios de esquema no planeados | Deploy, migracion o actividad maliciosa | Revisar pipeline y usuario |
| Auditoria desactivada | Mantenimiento o intento de ocultar actividad | Escalar de inmediato |

## Matriz de Permisos

Matriz de ejemplo:

| Identidad | Permiso | Justificacion | Riesgo | Control |
| --- | --- | --- | --- | --- |

Incluye:

- App.
- Analista.
- DBA.
- Backup.

Ejemplo:

| Identidad | Permiso | Justificacion | Riesgo | Control |
| --- | --- | --- | --- | --- |
| `app_rw` | SELECT/INSERT/UPDATE en tablas de negocio | Funcionamiento de la app | Abuso si app se compromete | Consultas parametrizadas, red privada, logs |
| `analyst_ro` | SELECT en vistas anonimizadas | Reportes | Fuga de informacion | Sin PII, MFA, auditoria |
| `backup_svc` | Lectura/exportacion controlada | Respaldos | Dump completo robado | Cifrado, storage privado, rotacion |
| `dba_admin` | Administracion | Mantenimiento | Control total | JIT, MFA, aprobacion, logs |

## Revision Periodica

Una revision util busca:

- Cuentas sin uso.
- Llaves o passwords antiguos.
- Permisos wildcard.
- Usuarios personales con privilegios permanentes.
- Roles duplicados.
- Accesos de proveedores.
- Cuentas compartidas.
- Logs desactivados.

La pregunta central es: si esta identidad se compromete hoy, que puede hacer?

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Diseñar roles basicos.
- Identificar permisos excesivos.
- Proponer auditoria.
- Crear alertas de DB conceptuales.
- Explicar por que una cuenta de aplicacion no debe ser DBA.
- Revisar una matriz de permisos y detectar riesgos.
