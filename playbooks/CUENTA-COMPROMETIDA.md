# Playbook: Cuenta Comprometida

## Objetivo

Investigar y contener posible compromiso de credenciales.

## Señales

- Multiples logins fallidos.
- Login exitoso desde IP inusual.
- MFA fatigue.
- Cambios de reglas de correo.
- Acceso a datos fuera de patron.
- Creacion de tokens.

## Evidencia

- Logs de autenticacion.
- IP origen.
- User-Agent.
- Geolocalizacion si existe.
- Cambios de contraseña.
- Sesiones activas.
- Actividad posterior.

## Pasos

1. Identificar usuario afectado.
2. Revisar timeline de logins.
3. Buscar login exitoso posterior a fallos.
4. Revisar actividad sensible.
5. Revocar sesiones si hay indicios fuertes.
6. Resetear contraseña.
7. Verificar MFA.
8. Revisar reglas de correo y tokens.
9. Documentar impacto.

## Contencion

- Revocar sesiones.
- Reset de contraseña.
- Requerir MFA.
- Deshabilitar cuenta temporalmente si es necesario.

## Preguntas

- Hubo acceso a datos sensibles?
- Hubo movimiento lateral?
- Hubo cambios de permisos?
- La cuenta tiene privilegios?
