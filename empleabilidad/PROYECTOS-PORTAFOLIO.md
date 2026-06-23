# Proyectos de Portafolio

Estos proyectos estan pensados para demostrar habilidad real. No tienen que ser enormes. Deben estar terminados, explicados y ser faciles de revisar.

## Proyecto 1: Analizador de Logs de Autenticacion

Area: Blue Team / Python.

Objetivo:

- Leer logs de ejemplo.
- Detectar intentos fallidos.
- Contar IPs o usuarios con mas fallos.
- Generar un reporte Markdown.

Evidencia:

- Script en `scripts/`.
- Logs de ejemplo sin datos sensibles.
- Reporte en `labs/`.
- Explicacion de falsos positivos.

Habilidades demostradas:

- Python.
- Logs.
- Deteccion basica.
- Reporte tecnico.

## Proyecto 2: Guia de Hardening Linux

Area: Linux / Blue Team.

Objetivo:

- Crear una checklist de hardening basico.
- Explicar cada control.
- Probar configuraciones en lab.

Controles sugeridos:

- Actualizaciones.
- Usuarios y sudo.
- SSH seguro.
- Firewall local.
- Permisos.
- Logs.

Evidencia:

- Guia en `linux/`.
- Lab documentado.
- Comandos usados.

## Proyecto 3: OWASP Top 10 con Labs

Area: Seguridad web.

Objetivo:

- Documentar 5 vulnerabilidades OWASP.
- Resolver labs permitidos.
- Explicar causa, impacto y mitigacion.

Vulnerabilidades iniciales:

- Broken Access Control.
- SQL Injection.
- XSS.
- SSRF.
- Security Misconfiguration.

Evidencia:

- Writeups permitidos en `writeups/`.
- Tabla comparativa.
- Notas en `web-owasp/`.

## Proyecto 4: Laboratorio de Red Segmentada

Area: Redes / Cisco.

Objetivo:

- Diseñar una red con VLANs.
- Separar segmentos.
- Aplicar ACLs.
- Documentar conectividad permitida y bloqueada.

Evidencia:

- Diagrama.
- Configuracion.
- Pruebas de conectividad.
- Explicacion de seguridad.

## Proyecto 5: Investigacion de Alerta Simulada

Area: SOC / Blue Team.

Objetivo:

- Tomar una alerta simulada.
- Revisar evidencia.
- Formular hipotesis.
- Concluir si es incidente o falso positivo.
- Recomendar acciones.

Evidencia:

- Reporte en `labs/`.
- Timeline.
- IOCs si aplica.
- Relacion con MITRE ATT&CK.

## Proyecto 6: Inventario de Activos Simple

Area: Python / Seguridad Operativa.

Objetivo:

- Leer un CSV con activos.
- Identificar equipos sin owner, sin criticidad o sin fecha de actualizacion.
- Generar reporte.

Evidencia:

- Script.
- CSV de ejemplo ficticio.
- Reporte Markdown.

## Proyecto 7: Checklist de Cloud Security

Area: Cloud Security.

Objetivo:

- Crear checklist basica para IAM, storage, logging y secretos.
- Explicar errores comunes.
- Proponer mitigaciones.

Evidencia:

- Guia en `cloud-security/`.
- Tabla de riesgos.
- Referencias oficiales.

## Como Presentar Cada Proyecto

Cada proyecto debe tener:

- Problema.
- Objetivo.
- Herramientas.
- Pasos.
- Resultado.
- Riesgos detectados.
- Remediacion.
- Que aprendi.

## Prioridad Recomendada

1. Analizador de logs.
2. Guia de hardening Linux.
3. OWASP Top 10 con labs.
4. Investigacion de alerta simulada.
5. Laboratorio de red segmentada.
