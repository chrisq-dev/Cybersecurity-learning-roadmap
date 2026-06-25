# Teams y Hats en Ciberseguridad

Este archivo aclara que equipos existen, que hace cada uno, que debes estudiar y que NO debes perseguir.

## Resumen Rápido

| Nombre | Qué es | Es profesional? | Enfoque |
| --- | --- | --- | --- |
| Blue Team | Equipo defensivo | Si | Detección, monitoreo, respuesta |
| Red Team | Equipo ofensivo autorizado | Si | Simulacion de adversarios |
| Purple Team | Colaboracion Red + Blue | Si | Mejorar detecciones y controles |
| White Team | Coordinacion de ejercicios | Si | Reglas, alcance, evaluación |
| AppSec Team | Seguridad de aplicaciones | Si | Código, SDLC, OWASP, revisiones |
| Cloud Security Team | Seguridad cloud | Si | IAM, logging, redes, storage |
| DFIR Team | Forense y respuesta | Si | Evidencia, timeline, incidentes |
| Threat Intel Team | Inteligencia de amenazas | Si | Actores, TTPs, IOCs, contexto |
| GRC Team | Gobierno, riesgo y cumplimiento | Si | Políticas, controles, auditoria |
| White Hat | Persona ética/autorizada | Si | Seguridad legal y responsable |
| Black Hat | Atacante malicioso | No | Actividad no autorizada |
| Gray Hat | Zona ambigua | Riesgoso | Puede carecer de permiso claro |

## Teams Profesionales

### Blue Team

Defiende sistemas y responde a actividad sospechosa.

Responsabilidades:

- Monitorear logs y alertas.
- Investigar eventos.
- Responder incidentes.
- Crear detecciones.
- Mejorar controles.
- Reducir falsos positivos.

Ruta sugerida:

- [blue-team/FUNDAMENTOS-BLUE-TEAM.md](../blue-team/FUNDAMENTOS-BLUE-TEAM.md)
- [blue-team/LOGS-Y-ALERTAS.md](../blue-team/LOGS-Y-ALERTAS.md)
- [blue-team/SIEM-MITRE.md](../blue-team/SIEM-MITRE.md)
- [blue-team/RESPUESTA-INCIDENTES.md](../blue-team/RESPUESTA-INCIDENTES.md)
- [blue-team/DETECTION-ENGINEERING.md](../blue-team/DETECTION-ENGINEERING.md)

Señales de comprensión:

- Análisis de logs.
- Comunicación de una alerta.
- Lógica de detección.
- Flujo de respuesta a incidente.

### Red Team

Simula técnicas de adversarios para probar defensas, siempre con permiso, alcance y reglas.

Responsabilidades:

- Reconocimiento autorizado.
- Enumeración.
- Pruebas de seguridad en laboratorios o entornos aprobados.
- Reporte de hallazgos.
- Recomendaciones de remediación.

Ruta sugerida:

- [red-team/METODOLOGIA-ETICA.md](../red-team/METODOLOGIA-ETICA.md)
- [red-team/RECONOCIMIENTO-ENUMERACION.md](../red-team/RECONOCIMIENTO-ENUMERACION.md)
- [red-team/REPORTE-REMEDIACION.md](../red-team/REPORTE-REMEDIACION.md)
- [web-owasp/FUNDAMENTOS-WEB.md](../web-owasp/FUNDAMENTOS-WEB.md)
- [web-owasp/OWASP-TOP-10.md](../web-owasp/OWASP-TOP-10.md)
- [windows-ad/ACTIVE-DIRECTORY.md](../windows-ad/ACTIVE-DIRECTORY.md)

Señales de comprensión:

- Análisis permitido en entornos autorizados.
- Explicación de impacto y remediación.
- Comprensión de causa raíz y correccion.
- Metodología ética y reproducible.

### Purple Team

Une Red Team y Blue Team. El objetivo no es "ganar", sino mejorar detección, respuesta y controles.

Responsabilidades:

- Ejecutar una técnica controlada.
- Observar si Blue Team la detecta.
- Mejorar logs, alertas y playbooks.
- Mapear actividad a MITRE ATT&CK.
- Validar controles.

Ruta sugerida:

- [blue-team/SIEM-MITRE.md](../blue-team/SIEM-MITRE.md)
- [blue-team/DETECTION-ENGINEERING.md](../blue-team/DETECTION-ENGINEERING.md)
- [red-team/METODOLOGIA-ETICA.md](../red-team/METODOLOGIA-ETICA.md)
- [playbooks/CUENTA-COMPROMETIDA.md](../playbooks/CUENTA-COMPROMETIDA.md)
- [playbooks/SERVIDOR-EXPUESTO.md](../playbooks/SERVIDOR-EXPUESTO.md)

Señales de comprensión:

- Tabla técnica ofensiva vs detección.
- Mejora de lógica de detección.
- Flujo de respuesta ajustado.
- Identificación de brechas de logging.

### White Team

Coordina ejercicios de seguridad. Define reglas, alcance, tiempos, objetivos y evaluación.

Responsabilidades:

- Definir scope.
- Autorizar actividades.
- Evitar dano operativo.
- Medir resultados.
- Resolver disputas entre equipos.
- Revisar comunicación de resultados.

Ruta sugerida:

- [writeups/PLANTILLA-REPORTE.md](../writeups/PLANTILLA-REPORTE.md)
- [grc/RIESGO-CONTROLES.md](../grc/RIESGO-CONTROLES.md)
- [grc/FUNDAMENTOS-GRC.md](../grc/FUNDAMENTOS-GRC.md)
- [red-team/METODOLOGIA-ETICA.md](../red-team/METODOLOGIA-ETICA.md)

Señales de comprensión:

- Reglas de engagement ficticias.
- Matriz de alcance.
- Criterios de éxito.
- Comunicación final del ejercicio.

### AppSec Team

Protege aplicaciones durante diseño, desarrollo, pruebas y despliegue.

Responsabilidades:

- Revisar código.
- Hacer threat modeling.
- Revisar autenticación y autorización.
- Analizar dependencias.
- Integrar SAST, DAST y secret scanning.
- Guiar remediaciones.

Ruta sugerida:

- [appsec-devsecops/FUNDAMENTOS-APPSEC.md](../appsec-devsecops/FUNDAMENTOS-APPSEC.md)
- [appsec-devsecops/DEVSECOPS.md](../appsec-devsecops/DEVSECOPS.md)
- [web-owasp/OWASP-TOP-10.md](../web-owasp/OWASP-TOP-10.md)
- [api-security/FUNDAMENTOS-API.md](../api-security/FUNDAMENTOS-API.md)
- [api-security/RIESGOS-CONTROLES.md](../api-security/RIESGOS-CONTROLES.md)

### Cloud Security Team

Protege entornos AWS, Azure, GCP y servicios cloud.

Responsabilidades:

- IAM.
- Logging.
- Storage.
- Redes cloud.
- Secret management.
- Monitoreo.
- Configuraciones seguras.

Ruta sugerida:

- [cloud-security/FUNDAMENTOS-CLOUD.md](../cloud-security/FUNDAMENTOS-CLOUD.md)
- [cloud-security/IAM-STORAGE-LOGGING.md](../cloud-security/IAM-STORAGE-LOGGING.md)
- [cloud-security/IAM-AVANZADO.md](../cloud-security/IAM-AVANZADO.md)
- [containers-kubernetes/CONTENEDORES.md](../containers-kubernetes/CONTENEDORES.md)
- [containers-kubernetes/KUBERNETES-SEGURIDAD.md](../containers-kubernetes/KUBERNETES-SEGURIDAD.md)

### DFIR Team

Digital Forensics and Incident Response. Investiga incidentes, preserva evidencia y reconstruye que paso.

Responsabilidades:

- Preservar evidencia.
- Analizar logs, disco, memoria o artefactos.
- Reconstruir lineas de tiempo.
- Contener incidentes.
- Documentar hallazgos.

Ruta sugerida:

- [forense/FUNDAMENTOS-FORENSE.md](../forense/FUNDAMENTOS-FORENSE.md)
- [blue-team/RESPUESTA-INCIDENTES.md](../blue-team/RESPUESTA-INCIDENTES.md)
- [playbooks/CUENTA-COMPROMETIDA.md](../playbooks/CUENTA-COMPROMETIDA.md)
- [playbooks/MALWARE-ENDPOINT.md](../playbooks/MALWARE-ENDPOINT.md)

### Threat Intelligence Team

Estudia amenazas, actores, tacticas, técnicas, procedimientos e indicadores.

Responsabilidades:

- Analizar IOCs.
- Entender TTPs.
- Mapear actividad a MITRE ATT&CK.
- Producir contexto para detección y defensa.
- Priorizar amenazas relevantes.

Ruta sugerida:

- [blue-team/SIEM-MITRE.md](../blue-team/SIEM-MITRE.md)
- [blue-team/THREAT-HUNTING.md](../blue-team/THREAT-HUNTING.md)
- [malware-básico/FUNDAMENTOS-MALWARE.md](../malware-básico/FUNDAMENTOS-MALWARE.md)

### GRC Team

Gobernanza, riesgo y cumplimiento. Conecta seguridad con negocio, controles y auditoria.

Responsabilidades:

- Políticas.
- Riesgos.
- Controles.
- Evidencia.
- Auditorias.
- Cumplimiento.
- Priorización.

Ruta sugerida:

- [grc/FUNDAMENTOS-GRC.md](../grc/FUNDAMENTOS-GRC.md)
- [grc/RIESGO-CONTROLES.md](../grc/RIESGO-CONTROLES.md)
- [vulnerability-management/FUNDAMENTOS.md](../vulnerability-management/FUNDAMENTOS.md)
- [vulnerability-management/PRIORIZACION-Y-CVSS.md](../vulnerability-management/PRIORIZACION-Y-CVSS.md)
- [privacy/FUNDAMENTOS-PRIVACIDAD.md](../privacy/FUNDAMENTOS-PRIVACIDAD.md)

## Hats

### White Hat

Persona que trabaja de forma ética, legal y autorizada.

Ejemplos:

- Pentester contratado.
- Analista SOC.
- Investigador que reporta vulnerabilidades bajo reglas.
- AppSec engineer.
- Consultor de seguridad.

Este es el camino correcto.

### Black Hat

Persona que ataca sin permiso, roba datos, extorsiona, instala malware o explota sistemas ilegalmente.

No es una ruta profesional legitima. No debes practicar contra sistemas reales sin permiso, aunque "solo sea para aprender".

### Gray Hat

Persona que puede encontrar vulnerabilidades sin intencion maliciosa, pero sin autorización clara. Es riesgoso porque puede ser ilegal o danar a terceros.

Regla práctica: si no tienes permiso explícito, no lo hagas.

## Colores Menos Comunes

Estos terminos aparecen a veces, pero no siempre son estandar:

- Green Team: seguridad desde operaciones, sustentabilidad de controles o mejora continua, según contexto.
- Yellow Team: builders o developers que construyen sistemas.
- Orange Team: educación, entrenamiento y transferencia de conocimiento entre equipos.
- Gold Team: liderazgo, estrategia o dirección de seguridad, según algunas organizaciones.

No memorices estos como si fueran universales. En entrevistas, Red, Blue, Purple, White y hats son los más importantes.

## Orden Para Ti

Tu ruta recomendada:

1. Fundamentos.
2. Blue Team.
3. Web/AppSec.
4. Cloud/IAM.
5. Red Team controlado.
6. Purple Team.
7. DFIR o Detection Engineering.
8. Especializacion laboral.

## Preguntas Que Debes Poder Responder

- Diferencia entre Red Team y Black Hat.
- Que hace Blue Team.
- Que problema resuelve Purple Team.
- Que hace White Team en un ejercicio.
- Por que Gray Hat es riesgoso.
- Que evidencia produce un SOC analyst.
- Que evidencia produce un pentester ético.
- Como se conectan AppSec, Cloud Security y GRC con los teams principales.

## Resumen Final

No necesitas escoger un color para siempre. Al inicio debes entender todos:

- Blue para defender.
- Red para entender ataque autorizado.
- Purple para mejorar detecciones.
- White para reglas y coordinacion.
- AppSec para aplicaciones.
- Cloud para infraestructura moderna.
- DFIR para incidentes.
- GRC para riesgo y negocio.

Tu base debe ser ética: White Hat.
