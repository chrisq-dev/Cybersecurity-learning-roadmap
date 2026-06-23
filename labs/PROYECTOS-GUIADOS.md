# Proyectos Guiados

Estos proyectos sirven para aprender y tambien para mostrar evidencia en GitHub.

## Proyecto 1: Parser de Logs de Autenticacion

### Objetivo

Crear un script que lea logs ficticios y genere un reporte.

### Requisitos

El script debe:

- Leer un archivo `.log`.
- Contar logins fallidos.
- Agrupar por usuario.
- Agrupar por IP.
- Generar un reporte Markdown.

### Datos de Ejemplo

```text
2026-06-23T10:00:01 user=admin src_ip=203.0.113.10 result=failed
2026-06-23T10:00:05 user=admin src_ip=203.0.113.10 result=failed
2026-06-23T10:05:00 user=maria src_ip=10.0.0.5 result=success
```

### Entregables

- Script en `scripts/`.
- Log ficticio en `labs/data/`.
- Reporte en `labs/reportes/`.
- README explicando uso.

## Proyecto 2: Guia de Hardening Linux

### Objetivo

Crear una checklist de seguridad basica para Linux.

### Contenido

- Actualizaciones.
- Usuarios y grupos.
- Sudo.
- SSH.
- Firewall.
- Logs.
- Permisos.
- Servicios innecesarios.

### Entregables

- Guia en `linux/HARDENING-BASICO.md`.
- Lab aplicando 3 controles.
- Explicacion de riesgos mitigados.

## Proyecto 3: OWASP Top 10 Resumido con Labs

### Objetivo

Documentar vulnerabilidades web comunes con causa, impacto y mitigacion.

### Vulnerabilidades Iniciales

- Broken Access Control.
- SQL Injection.
- XSS.
- Security Misconfiguration.
- SSRF.

### Entregables

- Una nota por vulnerabilidad.
- Un lab permitido por vulnerabilidad.
- Reporte con remediacion.

## Proyecto 4: Investigacion de Incidente Simulado

### Objetivo

Simular trabajo de SOC.

### Caso

Cuenta comprometida con varios logins fallidos y un login exitoso.

### Entregables

- Linea de tiempo.
- Evidencia.
- Hipotesis.
- Acciones recomendadas.
- Mapeo MITRE ATT&CK.

## Proyecto 5: Checklist Cloud Security

### Objetivo

Crear una checklist para revisar configuraciones cloud basicas.

### Areas

- IAM.
- MFA.
- Storage.
- Logs.
- Security groups.
- Secretos.

### Entregables

- Checklist.
- Tabla de riesgos.
- Mitigaciones.
- Referencias.

## Proyecto 6: Email Security Review

### Objetivo

Documentar controles basicos contra phishing y spoofing.

### Areas

- SPF.
- DKIM.
- DMARC.
- MFA.
- Reporte de phishing.
- Concientizacion.

### Entregables

- Analisis de correo ficticio.
- Checklist de controles.
- Recomendaciones.

## Proyecto 7: Tabletop de Ransomware

### Objetivo

Simular una respuesta organizacional ante ransomware.

### Entregables

- Escenario.
- Participantes.
- Timeline.
- Decisiones.
- RTO/RPO.
- Lecciones aprendidas.

## Proyecto 8: Access Review

### Objetivo

Practicar revision de accesos.

### Entregables

- Matriz de usuarios, roles y sistemas.
- Permisos excesivos detectados.
- Recomendaciones.
- Evidencia requerida.

## Capstone Projects

Cuando termines varios proyectos pequeños, continua con:

- `capstone-projects/SOC-INVESTIGATION.md`
- `capstone-projects/SECURE-SMALL-BUSINESS.md`
- `capstone-projects/APPSEC-REVIEW.md`
- `capstone-projects/CLOUD-SECURITY-REVIEW.md`

## Como Terminar un Proyecto

Un proyecto esta terminado cuando tiene:

- README.
- Objetivo.
- Pasos.
- Evidencia.
- Resultado.
- Lecciones aprendidas.
- Limitaciones.
