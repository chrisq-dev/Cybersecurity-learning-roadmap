# Cheatsheet Blue Team

Referencia rapida para investigar alertas, separar evidencia de hipotesis y proponer respuesta.

## Preguntas de Alerta

- Que paso?
- Cuando paso?
- Donde paso?
- Que usuario?
- Que IP?
- Hay actividad posterior?
- Hay impacto?
- Que accion tomar?

## Triage Rapido

| Pregunta | Por que importa |
| --- | --- |
| Que activo? | criticidad e impacto |
| Que usuario? | privilegios y contexto |
| Que IP/origen? | ubicacion y reputacion |
| Que hora? | timeline |
| Que fuente? | confiabilidad del dato |
| Sigue activo? | urgencia de contencion |

## Evidencia vs Hipotesis

- Evidencia: dato observado.
- Hipotesis: explicacion posible.
- Conclusion: evaluacion basada en evidencia.

## Fuentes de Evidencia

- logs de autenticacion;
- EDR;
- DNS;
- proxy/web gateway;
- firewall;
- cloud audit logs;
- email gateway;
- logs de aplicacion.

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
| creacion de tarea/servicio | Persistence |
| lectura de credenciales | Credential Access |
| enumeracion de usuarios | Discovery |
| descarga masiva | Collection/Exfiltration |

## Respuesta a Incidentes

1. Preparacion.
2. Identificacion.
3. Contencion.
4. Erradicacion.
5. Recuperacion.
6. Lecciones aprendidas.

## Contencion Comun

- deshabilitar cuenta;
- revocar sesiones;
- aislar endpoint;
- bloquear IP/dominio/hash;
- hacer privado un recurso expuesto;
- rotar credenciales;
- preservar logs.

## Deteccion

Documentar:

- Objetivo.
- Fuente.
- Campos.
- Logica.
- Falsos positivos.
- Severidad.
- Respuesta.

## Severidad

Considera:

- criticidad del activo;
- privilegios;
- datos sensibles;
- alcance;
- actividad confirmada;
- si sigue ocurriendo;
- controles existentes.

## Errores Comunes

- cerrar alertas sin justificar;
- confundir hipotesis con evidencia;
- no revisar actividad posterior;
- no documentar falsos positivos;
- no convertir hallazgos repetibles en detecciones.
