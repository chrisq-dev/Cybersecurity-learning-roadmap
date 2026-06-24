# IAM Corporativo

## Objetivo

Entender como una empresa administra identidades y accesos durante el ciclo de vida de usuarios.

## Ciclo Joiner, Mover, Leaver

### Joiner

Persona entra a la organizacion.

Controles:

- Crear cuenta.
- Asignar rol.
- MFA.
- Accesos minimos.
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

Single Sign-On permite autenticacion centralizada.

Beneficios:

- Menos contraseñas.
- Mejor control.
- Mejor logging.
- MFA centralizado.

## MFA

MFA reduce riesgo de contraseña comprometida.

Prioridad:

- Admins.
- Acceso remoto.
- Correo.
- Cloud.
- Sistemas criticos.

## RBAC

Role-Based Access Control.

Permisos por rol:

- Analista.
- Administrador.
- Finanzas.
- Soporte.

## Access Reviews

Revision periodica de accesos.

Preguntas:

- Esta persona aun necesita acceso?
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

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar joiner/mover/leaver.
- Explicar MFA y SSO.
- Explicar RBAC.
- Diseñar access review basico.
