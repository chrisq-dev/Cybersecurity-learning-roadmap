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

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar PAM.
- Explicar JIT.
- Identificar cuentas privilegiadas.
- Proponer controles para service accounts.
