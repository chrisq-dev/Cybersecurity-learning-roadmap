# Privileged Access Management

## Objetivo

Entender como proteger cuentas privilegiadas.

## Que es PAM

PAM gestiona accesos privilegiados.

Ejemplos:

- Administradores de dominio.
- Root.
- Administradores cloud.
- Cuentas de base de datos.
- Cuentas de servicio criticas.

La idea central es que el acceso privilegiado no debe ser permanente, compartido ni invisible. Una cuenta normal puede causar daño limitado; una cuenta privilegiada puede cambiar configuraciones, leer datos sensibles, crear persistencia o borrar rastros. Por eso PAM combina prevencion, aprobacion, monitoreo y revision.

## Riesgo

Una cuenta privilegiada comprometida puede causar impacto alto:

- Acceso a datos.
- Cambios de configuracion.
- Desactivar logs.
- Crear usuarios.
- Persistencia.

## Controles

- Cuentas admin separadas.
- MFA obligatorio.
- Just-in-time access.
- Session recording en ambientes criticos.
- Password vault.
- Rotacion de secretos.
- Access reviews.
- Alertas por uso privilegiado.

## Just-in-Time

Acceso temporal y aprobado.

Ejemplo:

```text
Admin recibe permisos durante 1 hora para una tarea especifica.
```

JIT reduce la ventana de abuso. Si una credencial se compromete, el atacante no deberia encontrar privilegios administrativos activos todo el tiempo. Tambien ayuda a distinguir actividad normal de actividad sospechosa, porque cada elevacion debe tener razon, duracion y contexto.

## Cuentas de Servicio

Riesgos:

- Sin owner.
- Contraseña nunca rota.
- Permisos amplios.
- Uso desconocido.

Controles:

- Owner.
- Rotacion.
- Permisos minimos.
- Monitoreo.
- Documentacion.

Las cuentas de servicio son dificiles porque no pertenecen a una persona. Si nadie sabe que aplicacion las usa, nadie se atreve a rotarlas. Por eso necesitan owner tecnico, permisos especificos, inventario y monitoreo. Una cuenta de servicio con privilegios altos y contraseña antigua puede ser mas peligrosa que una cuenta humana.

## Ejemplo de Revision PAM

Esta cuenta muestra problemas clasicos de privilegio permanente:

```text
Cuenta: svc-backup
Permisos: administrador de dominio
Rotacion: nunca
Owner: desconocido
```

La revision debe separar:

- Riesgos.
- Controles.
- Plan de remediacion.
- Evidencia requerida.

## Señales de Riesgo

- Cuentas admin usadas para trabajo diario.
- Passwords compartidos por varias personas.
- Cuentas sin MFA en sistemas criticos.
- Service accounts con permisos de administrador.
- Secretos que nunca rotan.
- Accesos privilegiados sin alerta ni registro.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar PAM.
- Explicar JIT.
- Identificar cuentas privilegiadas.
- Proponer controles para service accounts.
