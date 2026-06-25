# Cheatsheet Blue Team

Referencia rapida para investigar alertas, separar evidencia de hipótesis y proponer respuesta.

## Preguntas de Alerta

- Qué paso?
- Cuándo paso?
- Dónde paso?
- Qué usuario?
- Qué IP?
- Hay actividad posterior?
- Hay impacto?
- Qué acción tomar?

## Triage Rápido

| Pregunta | Por que importa |
| --- | --- |
| Qué activo? | criticidad e impacto |
| Qué usuario? | privilegios y contexto |
| Qué IP/origen? | ubicación y reputación |
| Qué hora? | timeline |
| Qué fuente? | confiabilidad del dato |
| Sigue activo? | urgencia de contención |

## Evidencia vs Hipótesis

- Evidencia: dato observado.
- Hipótesis: explicación posible.
- Conclusión: evaluación basada en evidencia.

## Fuentes de Evidencia

- Logs de autenticación;
- EDR;
- DNS;
- Proxy/web gateway;
- Firewall;
- Cloud audit logs;
- Email gateway;
- Logs de aplicación.

## MITRE Tacticas

- Initial Access.
- Execution.
- Persistence.
- Privilege Escalation.
- Defense Evasion.
- Credential Access.
- Discovery.
- Lateral Movement.
- Exfiltration.
- Impact.

## Mapeo Simple

| Evidencia | Posible tactica |
| --- | --- |
| login inusual | Initial Access |
| ejecucion de comandos | Execution |
| creación de tarea/servicio | Persistence |
| lectura de credenciales | Credential Access |
| enumeración de usuarios | Discovery |
| descarga masiva | Collection/Exfiltration |

## Respuesta a Incidentes

1. Preparacion.
2. Identificación.
3. Contención.
4. Erradicacion.
5. Recuperación.
6. Lecciones aprendidas.

## Contención Común

- Deshabilitar cuenta;
- Revocar sesiones;
- Aislar endpoint;
- Bloquear IP/dominio/hash;
- Hacer privado un recurso expuesto;
- Rotar credenciales;
- Preservar logs.

## Detección

Documentar:

- Objetivo.
- Fuente.
- Campos.
- Lógica.
- Falsos positivos.
- Severidad.
- Respuesta.

## Severidad

Considera:

- Criticidad del activo;
- Privilegios;
- Datos sensibles;
- Alcance;
- Actividad confirmada;
- Si sigue ocurriendo;
- Controles existentes.

## Errores Comunes

- Cerrar alertas sin justificar;
- Confundir hipótesis con evidencia;
- No revisar actividad posterior;
- No documentar falsos positivos;
- No convertir hallazgos repetibles en detecciones.
