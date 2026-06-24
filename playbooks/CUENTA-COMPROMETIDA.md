# Playbook: Cuenta Comprometida

## Objetivo

Investigar y contener posible compromiso de credenciales.

## Severidad Inicial

Sube severidad si:

- la cuenta es admin;
- hay login exitoso desde IP inusual;
- hubo acceso a datos sensibles;
- se crearon tokens o reglas de correo;
- se deshabilito MFA;
- hay actividad en varios sistemas.

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

## Primeros 15 Minutos

1. Confirmar usuario e identidad afectada.
2. Revisar si hay sesion activa sospechosa.
3. Preservar logs de autenticacion.
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

## Timeline Minimo

| Hora | Evento | Fuente | Evidencia | Interpretacion |
| --- | --- | --- | --- | --- |

## Contencion

- Revocar sesiones.
- Reset de contraseña.
- Requerir MFA.
- Deshabilitar cuenta temporalmente si es necesario.

## Erradicacion

- Eliminar tokens no reconocidos.
- Eliminar reglas de correo maliciosas.
- Rotar credenciales relacionadas.
- Revisar dispositivos confiables.
- Corregir MFA debil o ausente.

## Recuperacion

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

- no hay sesiones sospechosas activas;
- credenciales fueron rotadas;
- MFA esta validado;
- actividad posterior fue revisada;
- impacto fue documentado;
- deteccion o control fue mejorado si aplica.
