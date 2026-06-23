# Fundamentos de Arquitectura de Seguridad

## Objetivo

Entender como diseñar sistemas con controles coherentes, no solo herramientas sueltas.

## Defensa en Profundidad

Significa tener varias capas de defensa.

Ejemplo:

- MFA.
- Minimo privilegio.
- Segmentacion.
- EDR.
- Logs.
- Backups.
- Respuesta a incidentes.

Si una capa falla, otra puede reducir impacto.

## Superficie de Ataque

Todo lo que puede ser atacado:

- Puertos.
- APIs.
- Usuarios.
- Aplicaciones.
- Proveedores.
- Credenciales.
- Repositorios.

Reducir superficie:

- Desactivar servicios innecesarios.
- Restringir acceso.
- Parchar.
- Eliminar cuentas antiguas.

## Segmentacion

Separar sistemas para limitar movimiento lateral.

Ejemplos:

- Usuarios.
- Servidores.
- Administracion.
- Invitados.
- Produccion.
- Desarrollo.

## Controles

### Preventivos

Evitan:

- MFA.
- Firewall.
- Validacion de entrada.

### Detectivos

Detectan:

- Logs.
- SIEM.
- EDR.

### Correctivos

Corrigen o recuperan:

- Backups.
- Rotacion de credenciales.
- Reimagen de equipos.

## Practica

Diseña arquitectura para una app:

- Frontend.
- Backend.
- Base de datos.
- Admin.
- Logs.

Define:

- Segmentos.
- Controles preventivos.
- Controles detectivos.
- Controles correctivos.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar defensa en profundidad.
- Explicar segmentacion.
- Identificar superficie de ataque.
- Elegir controles por riesgo.
