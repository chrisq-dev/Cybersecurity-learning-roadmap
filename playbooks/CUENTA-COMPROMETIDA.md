# Playbook: Cuenta Comprometida

## Objetivo

Investigar y contener posible compromiso de credenciales.

## Severidad Inicial

Sube severidad si:

- La cuenta es admin;
- Hay login exitoso desde IP inusual;
- Hubo acceso a datos sensibles;
- Se crearon tokens o reglas de correo;
- Se deshabilito MFA;
- Hay actividad en varios sistemas.

## Señales

- Múltiples logins fallidos.
- Login exitoso desde IP inusual.
- MFA fatigue.
- Cambios de reglas de correo.
- Acceso a datos fuera de patron.
- Creación de tokens.

## Evidencia

- Logs de autenticación.
- IP origen.
- User-Agent.
- Geolocalizacion si existe.
- Cambios de contraseña.
- Sesiones activas.
- Actividad posterior.

## Primeros 15 Minutos

1. Confirmar usuario e identidad afectada.
2. Revisar si hay sesión activa sospechosa.
3. Preservar logs de autenticación.
4. Validar privilegios de la cuenta.
5. Si hay indicios fuertes, revocar sesiones.
6. Notificar al owner o responsable.

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

## Timeline Mínimo

| Hora | Evento | Fuente | Evidencia | Interpretacion |
| --- | --- | --- | --- | --- |

## Contención

- Revocar sesiones.
- Reset de contraseña.
- Requerir MFA.
- Deshabilitar cuenta temporalmente si es necesario.

## Erradicacion

- Eliminar tokens no reconocidos.
- Eliminar reglas de correo maliciosas.
- Rotar credenciales relacionadas.
- Revisar dispositivos confiables.
- Corregir MFA débil o ausente.

## Recuperación

- Rehabilitar cuenta si fue deshabilitada.
- Confirmar acceso legitimo con usuario.
- Monitorear logins posteriores.
- Revisar sistemas donde la cuenta tenia permisos.

## Preguntas

- Hubo acceso a datos sensibles?
- Hubo movimiento lateral?
- Hubo cambios de permisos?
- La cuenta tiene privilegios?

## Cierre

Puedes cerrar cuando:

- No hay sesiones sospechosas activas;
- Credenciales fueron rotadas;
- MFA está validado;
- Actividad posterior fue revisada;
- Impacto fue documentado;
- Detección o control fue mejorado si aplica.
