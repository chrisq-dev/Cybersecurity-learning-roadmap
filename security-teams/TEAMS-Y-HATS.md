# Teams y Hats en Ciberseguridad

Este archivo aclara que equipos existen, que hace cada uno, que debes estudiar y que NO debes perseguir.

## Resumen Rapido

| Nombre | Que es | Es profesional? | Enfoque |
| --- | --- | --- | --- |
| Blue Team | Equipo defensivo | Si | Deteccion, monitoreo, respuesta |
| Red Team | Equipo ofensivo autorizado | Si | Simulacion de adversarios |
| Purple Team | Colaboracion Red + Blue | Si | Mejorar detecciones y controles |
| White Team | Coordinacion de ejercicios | Si | Reglas, alcance, evaluacion |
| AppSec Team | Seguridad de aplicaciones | Si | Codigo, SDLC, OWASP, revisiones |
| Cloud Security Team | Seguridad cloud | Si | IAM, logging, redes, storage |
| DFIR Team | Forense y respuesta | Si | Evidencia, timeline, incidentes |
| Threat Intel Team | Inteligencia de amenazas | Si | Actores, TTPs, IOCs, contexto |
| GRC Team | Gobierno, riesgo y cumplimiento | Si | Politicas, controles, auditoria |
| White Hat | Persona etica/autorizada | Si | Seguridad legal y responsable |
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

Senales de comprension:

- Analisis de logs.
- Comunicacion de una alerta.
- Logica de deteccion.
- Flujo de respuesta a incidente.

### Red Team

Simula tecnicas de adversarios para probar defensas, siempre con permiso, alcance y reglas.

Responsabilidades:

- Reconocimiento autorizado.
- Enumeracion.
- Pruebas de seguridad en laboratorios o entornos aprobados.
- Reporte de hallazgos.
- Recomendaciones de remediacion.

Ruta sugerida:

- [red-team/METODOLOGIA-ETICA.md](../red-team/METODOLOGIA-ETICA.md)
- [red-team/RECONOCIMIENTO-ENUMERACION.md](../red-team/RECONOCIMIENTO-ENUMERACION.md)
- [red-team/REPORTE-REMEDIACION.md](../red-team/REPORTE-REMEDIACION.md)
- [web-owasp/FUNDAMENTOS-WEB.md](../web-owasp/FUNDAMENTOS-WEB.md)
- [web-owasp/OWASP-TOP-10.md](../web-owasp/OWASP-TOP-10.md)
- [windows-ad/ACTIVE-DIRECTORY.md](../windows-ad/ACTIVE-DIRECTORY.md)

Senales de comprension:

- Analisis permitido en entornos autorizados.
- Explicacion de impacto y remediacion.
- Comprension de causa raiz y correccion.
- Metodologia etica y reproducible.

### Purple Team

Une Red Team y Blue Team. El objetivo no es "ganar", sino mejorar deteccion, respuesta y controles.

Responsabilidades:

- Ejecutar una tecnica controlada.
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

Senales de comprension:

- Tabla tecnica ofensiva vs deteccion.
- Mejora de logica de deteccion.
- Flujo de respuesta ajustado.
- Identificacion de brechas de logging.

### White Team

Coordina ejercicios de seguridad. Define reglas, alcance, tiempos, objetivos y evaluacion.

Responsabilidades:

- Definir scope.
- Autorizar actividades.
- Evitar dano operativo.
- Medir resultados.
- Resolver disputas entre equipos.
- Revisar comunicacion de resultados.

Ruta sugerida:

- [writeups/PLANTILLA-REPORTE.md](../writeups/PLANTILLA-REPORTE.md)
- [grc/RIESGO-CONTROLES.md](../grc/RIESGO-CONTROLES.md)
- [grc/FUNDAMENTOS-GRC.md](../grc/FUNDAMENTOS-GRC.md)
- [red-team/METODOLOGIA-ETICA.md](../red-team/METODOLOGIA-ETICA.md)

Senales de comprension:

- Reglas de engagement ficticias.
- Matriz de alcance.
- Criterios de exito.
- Comunicacion final del ejercicio.

### AppSec Team

Protege aplicaciones durante diseño, desarrollo, pruebas y despliegue.

Responsabilidades:

- Revisar codigo.
- Hacer threat modeling.
- Revisar autenticacion y autorizacion.
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

Estudia amenazas, actores, tacticas, tecnicas, procedimientos e indicadores.

Responsabilidades:

- Analizar IOCs.
- Entender TTPs.
- Mapear actividad a MITRE ATT&CK.
- Producir contexto para deteccion y defensa.
- Priorizar amenazas relevantes.

Ruta sugerida:

- [blue-team/SIEM-MITRE.md](../blue-team/SIEM-MITRE.md)
- [blue-team/THREAT-HUNTING.md](../blue-team/THREAT-HUNTING.md)
- [malware-basico/FUNDAMENTOS-MALWARE.md](../malware-basico/FUNDAMENTOS-MALWARE.md)

### GRC Team

Gobernanza, riesgo y cumplimiento. Conecta seguridad con negocio, controles y auditoria.

Responsabilidades:

- Politicas.
- Riesgos.
- Controles.
- Evidencia.
- Auditorias.
- Cumplimiento.
- Priorizacion.

Ruta sugerida:

- [grc/FUNDAMENTOS-GRC.md](../grc/FUNDAMENTOS-GRC.md)
- [grc/RIESGO-CONTROLES.md](../grc/RIESGO-CONTROLES.md)
- [vulnerability-management/FUNDAMENTOS.md](../vulnerability-management/FUNDAMENTOS.md)
- [vulnerability-management/PRIORIZACION-Y-CVSS.md](../vulnerability-management/PRIORIZACION-Y-CVSS.md)
- [privacy/FUNDAMENTOS-PRIVACIDAD.md](../privacy/FUNDAMENTOS-PRIVACIDAD.md)

## Hats

### White Hat

Persona que trabaja de forma etica, legal y autorizada.

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

Persona que puede encontrar vulnerabilidades sin intencion maliciosa, pero sin autorizacion clara. Es riesgoso porque puede ser ilegal o danar a terceros.

Regla practica: si no tienes permiso explicito, no lo hagas.

## Colores Menos Comunes

Estos terminos aparecen a veces, pero no siempre son estandar:

- Green Team: seguridad desde operaciones, sustentabilidad de controles o mejora continua, segun contexto.
- Yellow Team: builders o developers que construyen sistemas.
- Orange Team: educacion, entrenamiento y transferencia de conocimiento entre equipos.
- Gold Team: liderazgo, estrategia o direccion de seguridad, segun algunas organizaciones.

No memorices estos como si fueran universales. En entrevistas, Red, Blue, Purple, White y hats son los mas importantes.

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
- Que evidencia produce un pentester etico.
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

Tu base debe ser etica: White Hat.
