# IAM Corporativo

## Objetivo

Entender como una empresa administra identidades y accesos durante el ciclo de vida de usuarios.

## Ciclo Joiner, Mover, Leaver

IAM corporativo busca que cada identidad tenga el acceso correcto durante el tiempo correcto. El problema no es solo crear usuarios; también es ajustar permisos cuando cambian de puesto y retirar accesos cuando salen. Muchas brechas ocurren por cuentas olvidadas, permisos acumulados o accesos que nadie revisa.

### Joiner

Persona entra a la organización.

Controles:

- Crear cuenta.
- Asignar rol.
- MFA.
- Accesos mínimos.
- Registro de aprobacion.

### Mover

Persona cambia de puesto.

Riesgo:

- Acumular permisos antiguos.

Control:

- Revisar y ajustar accesos.

### Leaver

Persona sale.

Controles:

- Desactivar cuentas.
- Revocar sesiones.
- Recuperar dispositivos.
- Rotar secretos si aplica.

## SSO

Single Sign-On permite autenticación centralizada.

Beneficios:

- Menos contraseñas.
- Mejor control.
- Mejor logging.
- MFA centralizado.

SSO mejora seguridad cuando está bien configurado, pero también concentra riesgo. Si el proveedor de identidad se compromete, muchos sistemas quedan expuestos. Por eso SSO debe combinarse con MFA, políticas condicionales, monitoreo y recuperación segura.

## MFA

MFA reduce riesgo de contraseña comprometida.

Prioridad:

- Admins.
- Acceso remoto.
- Correo.
- Cloud.
- Sistemas críticos.

## RBAC

Role-Based Access Control.

Permisos por rol:

- Analista.
- Administrador.
- Finanzas.
- Soporte.

RBAC evita asignar permisos usuario por usuario sin estructura. El riesgo aparece cuando los roles crecen sin control o se usan como excepciones permanentes. Un buen rol representa una función real del negocio y tiene permisos mínimos para esa función.

## Access Reviews

Revisión periodica de accesos.

Preguntas:

- Esta persona aún necesita acceso?
- El rol sigue siendo correcto?
- Hay permisos excesivos?
- La cuenta tiene owner?

## Ejemplo de Matriz de Acceso

Una matriz de accesos puede verse asi:

| Rol | Sistema | Permiso | Justificacion | Aprobador |
| --- | --- | --- | --- | --- |

La matriz debe contemplar momentos del ciclo de vida como:

- Nuevo empleado.
- Cambio de puesto.
- Salida de empleado.

## Señales de Riesgo

- Usuarios sin owner.
- Cuentas antiguas activas.
- Permisos heredados de puestos anteriores.
- Grupos demasiado amplios.
- Acceso a sistemas críticos sin MFA.
- Cuentas compartidas.
- Falta de revisión periodica.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar joiner/mover/leaver.
- Explicar MFA y SSO.
- Explicar RBAC.
- Diseñar access review básico.
