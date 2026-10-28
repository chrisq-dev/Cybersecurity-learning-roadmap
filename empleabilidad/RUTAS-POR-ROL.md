---
title: "Rutas de Carrera: Las Clases RPG"
level: "inicial"
content_type: "ruta"
updated: "2026-06-29"
---

# Rutas de Carrera: Las Clases RPG

## Objetivo de esta Guía

la Ciberseguridad no es una carrera, es una industria entera. No puedes ser "Experto en Ciberseguridad", de la misma forma que un médico no es "Experto en Medicina", sino Especialista en Cardiología o Neurología. tienes que elegir.

En los videojuegos de rol (RPG), tú no eliges jugar como "Aventurero". Tienes que elegir una Clase: El Guerrero (Tanque), el Arquero (Ataque a distancia) o el Mago (Soporte). En Ciberseguridad Corporativa, ocurre exactamente lo mismo. debes elegir tu Clase si quieres llegar a algún lado.

---

## 1. El Guardia de la Torre (SOC Analyst Nivel 1)

Es una puerta de entrada habitual para perfiles iniciales.
* **La Misión:** Estás sentado en la torre más alta del castillo mirando 5 monitores. Tu trabajo es mirar el Radar (SIEM) y decidir si la mancha roja que se acerca es un dragón real (Un Hacker) o simplemente una paloma grande (Un Falso Positivo).
* **Las Habilidades (Skills):**
  * Entender de Redes para saber si la IP pertenece a Rusia o a la oficina de ventas.
  * Saber leer Logs de Windows y Linux.
  * Si detectas al dragón, tocas la alarma y escalas el problema al Nivel 2.
* **Ideal para:** Personas analíticas que disfrutan resolviendo rompecabezas de datos y buscando agujas en pajares.

**Compensación:** depende del país, modalidad, sector, experiencia y alcance real del puesto. Consulta fuentes salariales locales con fecha y metodología visibles.

**Certificaciones recomendadas:** CompTIA Security+, CySA+, SC-200 (Microsoft Sentinel), Splunk Core Certified User.

**Día a día típico:**
- Revisión de triage de alertas del SIEM (100-300 alertas por turno).
- Clasificación de incidentes: falso positivo, benigno, confirmado.
- Documentación en la herramienta de ticketing (ServiceNow, Jira, TheHive).
- Escalamiento al nivel 2 o 3 según severidad y tipo de incidente.
- Participación en reuniones diarias de incidentes (stand-up de seguridad).

**Cómo escalar desde SOC N1:**
- SOC N2: 1-2 años de experiencia, análisis más profundo, caza de amenazas (threat hunting).
- SOC N3: 3+ años, forense digital, análisis de malware, mentoría al equipo.
- Especialización: DFIR, Threat Intelligence, Detección de Amenazas (Detection Engineering).

---

## 2. El Bombero (Incident Responder / DFIR)

(Mid a Senior-Level). Es como pasar de policía de tránsito a SWAT.
* **La Misión:** La alarma del castillo sonó. El dragón (Ransomware) ya está quemando el patio principal. El Analista SOC Nivel 1 te llama a las 3:00 AM. Tú eres el bombero forense que llega con el extintor (Playbooks) a apagar el fuego, erradicar el virus, y luego usar pinzas para recoger las escamas del dragón (Evidencia Forense) para saber exactamente por dónde entró.
* **Las Habilidades (Skills):**
  * Nervios de acero absoluto (Manejo de Crisis).
  * Análisis de Malware y Forense Digital.
  * Conocimiento profundo de sistemas operativos (Windows, Linux, macOS).
  * Automatización de respuesta (playbooks en SOAR).
* **Ideal para:** Adictos a la adrenalina que funcionan perfectamente bajo presión extrema corporativa.

**Compensación:** depende del país, modalidad, sector, experiencia y alcance real del puesto. Consulta fuentes salariales locales con fecha y metodología visibles.

**Certificaciones recomendadas:** GCFE/GCFA (SANS), CHFI, GNFA, DFIR Certifications.

**Día a día típico:**
- Recepción de incidentes críticos escalados del SOC.
- Ejecución de playbooks de contención y erradicación.
- Análisis forense de discos, memoria y redes.
- Redacción de informes post-mortem para dirección.
- Colaboración con legal para cadena de custodia.
- Investigación proactiva: threat hunting, búsqueda de IoCs.

**Herramientas comunes:**
- Análisis forense: FTK Imager, Autopsy, Volatility, Velociraptor.
- Análisis de malware: Ghidra, IDA Pro, x64dbg, Cuckoo Sandbox.
- SOAR: Splunk SOAR, Palo Alto XSOAR, Shuffle.
- SIEM: consultas complejas para búsqueda de IoCs.

---

## 3. El Arquitecto Defensivo (Cloud Security Engineer)

(Senior-Level). Si llegas aquí, la rompiste.
* **La Misión:** Eres el ingeniero que diseña y construye el castillo desde cero para que el dragón nunca pueda entrar. Construyes los fosos con cocodrilos (Firewalls), diseñas las bóvedas blindadas (Cifrado) y aíslas a los habitantes en burbujas de cristal impenetrables (Contenedores/Kubernetes).
* **Las Habilidades (Skills):**
  * Dominio absoluto de la Nube (AWS, Azure, GCP).
  * Principios avanzados de Zero Trust y Defensa en Profundidad.
  * Infraestructura como Código (Terraform, CloudFormation, Pulumi).
  * Seguridad en CI/CD (DevSecOps): SAST, DAST, escaneo de secretos.
* **Ideal para:** Constructores metódicos que odian las emergencias a las 3:00 AM y prefieren prevenir el desastre diseñando infraestructuras inquebrantables.

**Por qué esto importa:** Si eres de los que prefieren prevenir que curar, esta es tu clase. Duermes tranquilo sabiendo que tu castillo está blindado.

**Compensación:** depende del país, modalidad, sector, experiencia y alcance real del puesto. Consulta fuentes salariales locales con fecha y metodología visibles.

**Certificaciones recomendadas:** AWS Security Specialty, Azure Security Engineer (AZ-500), CCSK, CCSP.

**Día a día típico:**
- Diseño y revisión de arquitecturas cloud seguras.
- Implementación de controles de seguridad como código (policy-as-code).
- Automatización de hardening de imágenes y contenedores.
- Gestión de identidades y accesos (IAM) federados.
- Respuesta a incidentes de infraestructura cloud.
- Revisiones de seguridad en pipelines CI/CD.

---

## 4. El Penetration Tester (Pentester / Red Team)

Rol ofensivo autorizado. El atacante contratado para encontrar fallas antes que los atacantes reales.
* **La Misión:** Eres el explorador que se infiltra en el castillo disfrazado para encontrar las grietas en los muros antes de que el dragón real las descubra.
* **Las Habilidades (Skills):**
  * Explotación de vulnerabilidades web, red, móvil y cloud.
  * Ingeniería social controlada (phishing simulado, pretexting).
  * Programación: Python, Bash, PowerShell, scripting personalizado.
  * Conocimiento de OWASP Top 10, MITRE ATT&CK.
* **Ideal para:** Personas metódicas con mentalidad de "romper para construir".

**Compensación:** depende del país, modalidad, sector, experiencia y alcance real del puesto. Consulta fuentes salariales locales con fecha y metodología visibles.

**Certificaciones recomendadas:** OSCP, PNPT, GPEN, GWAPT, OSWE.

**Día a día típico:**
- Planificación de pruebas según alcance y reglas de enfrentamiento.
- Ejecución de fases de reconocimiento, escaneo, explotación y post-explotación.
- Redacción de informes con hallazgos, impacto y recomendaciones.
- Reuniones de debriefing con equipos técnicos y dirección.
- Investigación de nuevas vulnerabilidades y técnicas.

---

## 5. El Auditor de Seguridad (Security Auditor / Compliance Analyst)

Rol de verificación y cumplimiento. El que revisa que se sigan las reglas.
* **La Misión:** Eres el inspector que revisa que el castillo cumpla con los planos aprobados y los códigos de construcción.
* **Las Habilidades (Skills):**
  * Conocimiento de marcos normativos (ISO 27001, NIST, PCI-DSS, GDPR).
  * Técnicas de auditoría: revisión de evidencias, entrevistas, pruebas de control.
  * Comunicación escrita: reportes de auditoría claros y accionables.
* **Ideal para:** Personas detallistas, metódicas, con capacidad crítica y objetividad.

**Compensación:** depende del país, modalidad, sector, experiencia y alcance real del puesto. Consulta fuentes salariales locales con fecha y metodología visibles.

**Certificaciones recomendadas:** ISO 27001 LA, CISA, CISM, CRISC.

**Día a día típico:**
- Planificación de auditorías internas y externas.
- Revisión de políticas, procedimientos y evidencias.
- Pruebas de efectividad de controles.
- Redacción de hallazgos y recomendaciones.
- Seguimiento de planes de remediación.

---

## 6. El Analista GRC (Governance, Risk & Compliance)

Rol estratégico enfocado en la gestión de riesgos y cumplimiento normativo.
* **La Misión:** Eres el estratega que evalúa los riesgos del castillo, asegura que cumpla con las leyes del reino y traduce amenazas técnicas a lenguaje de negocio.
* **Las Habilidades (Skills):**
  * Evaluación de riesgos: cualitativa y cuantitativa.
  * Gestión de políticas: redacción, revisión, comunicación y enforcement.
  * Gestión de proveedores (Third Party Risk Management).
  * Conocimiento regulatorio: GDPR, PCI-DSS, HIPAA, SOX, LGPD.
* **Ideal para:** Personas con visión estratégica, capacidad de análisis y comunicación ejecutiva.

**Compensación:** depende del país, modalidad, sector, experiencia y alcance real del puesto. Consulta fuentes salariales locales con fecha y metodología visibles.

**Certificaciones recomendadas:** CRISC, CISM, CISA, ISO 27001 Lead Implementer.

**Día a día típico:**
- Evaluación de riesgos de nuevos proyectos y proveedores.
- Mantenimiento del registro de riesgos y planes de tratamiento.
- Preparación para auditorías de certificación.
- Elaboración de reportes de cumplimiento para dirección.
- Coordinación con legal y áreas de negocio.
- Capacitación en políticas de seguridad.

---

## 7. El Cazador de Amenazas (Threat Hunter)

Rol proactivo de búsqueda de amenazas. No espera alertas, sale a buscar.
* **La Misión:** Eres el rastreador que busca huellas del dragón incluso cuando las torres de vigilancia no han visto nada.
* **Las Habilidades (Skills):**
  * Análisis avanzado de datos: consultas complejas en SIEM, detección de anomalías.
  * Hipótesis basadas en inteligencia de amenazas (TTPs de MITRE ATT&CK).
  * Automatización de detecciones personalizadas.
* **Ideal para:** Investigadores curiosos que disfrutan encontrando lo que otros pasan por alto.

**Compensación:** depende del país, modalidad, sector, experiencia y alcance real del puesto. Consulta fuentes salariales locales con fecha y metodología visibles.

**Certificaciones recomendadas:** GCFA, GNFA, Certified Threat Hunter (EC-Council).

**Día a día típico:**
- Formulación de hipótesis de ataque basadas en nuevas TTPs.
- Búsqueda en SIEM y logs de endpoints con consultas específicas.
- Creación de nuevas reglas de detección y alimentación al SOC.
- Documentación de hallazgos y enriquecimiento de inteligencia.
- Colaboración con el equipo de detección engineering.

---

## 8. Tabla Comparativa de Roles

| Rol | ¿Suele ser inicial? | Trabajo remoto | Presión operativa | Enfoque principal |
|---|---|---|---|---|
| SOC Analyst N1 | Sí | Frecuente | Media | Monitoreo y triage |
| Incident Responder | No | Frecuente | Alta | Contención e investigación |
| Cloud Security Engineer | No | Frecuente | Media | Arquitectura y automatización |
| Pentester | Pocas veces | Variable | Media | Evaluación ofensiva autorizada |
| Auditor de seguridad | Sí | Frecuente | Baja-media | Evidencia y controles |
| Analista GRC | Sí | Frecuente | Media | Riesgo y cumplimiento |
| Threat Hunter | No | Frecuente | Media-alta | Búsqueda proactiva |

---

## 9. Progresión de Carrera en el Tiempo

**Año 0-1:** Estudio + Certificaciones básicas (Security+, eJPT) + Home Lab.

**Año 1-3:** Primer empleo (SOC N1, pasantía). Experiencia práctica. Certificaciones intermedias (CySA+, OSCP).

**Año 3-5:** Especialización (SOC N2, Pentester Junior, Cloud Sec Junior). Certificaciones avanzadas.

**Año 5-8:** Senior (SOC N3, Lead, Arquitecto). Gestión de equipos pequeños. Certificaciones élite (SANS, CISSP).

**Año 8+:** Estrategia (CISO, Head of Security, Consultor Principal). MBA opcional. Visión de negocio.

---

## 10. Cómo Elegir tu Clase

Preguntas para auto-diagnóstico:

1. ¿Prefieres reaccionar a emergencias o construir sistemas que las eviten? → IR vs Arquitecto.
2. ¿Te gusta romper cosas o analizar cómo funcionan? → Pentester vs Defensa.
3. ¿Disfrutas escribir reportes y analizar riesgos o prefieres estar en la terminal? → GRC vs Técnico.
4. ¿Trabajas bien bajo presión constante? → SOC/IR no son para todos.
5. ¿Prefieres trabajar solo o en equipo? → Afecta roles como Threat Hunter vs SOC.
6. ¿Buscas estabilidad (9-5) o horarios variables? → Auditor/GRC vs IR/SOC.

---

## 11. Criterio de Dominio (Autoevaluación)

Revisa si sabes elegir tu clase:

1. Un estudiante recién graduado aplica directamente a un puesto de "Ingeniero Arquitecto Cloud Security" y es rechazado de inmediato, a pesar de tener un currículum excelente. Basado en la analogía de las "Clases RPG", explica por qué el rol de "Arquitecto Defensivo" no es una clase para novatos (Entry-Level) y requiere haber pasado primero por las trincheras.

2. Compara el día a día de un **Analista SOC Nivel 1** ("El Guardia de la Torre") frente al de un **Incident Responder** ("El Bombero"). ¿Cuál de los dos roles tiene la responsabilidad de ejecutar los Playbooks de Erradicación cuando el ataque se confirma como verdadero?

3. Un profesional disfruta construir laboratorios complejos, configurar reglas de segmentación de red y crear entornos de "Zero Trust", pero odia las emergencias de madrugada y el pánico del código rojo. De las tres Clases de RPG mencionadas, ¿Cuál es la ruta de carrera perfecta para él y por qué?

4. El trabajo del **Analista SOC** consiste en diferenciar los ataques reales (Dragones) de los "Falsos Positivos" (Palomas grandes). Explica por qué un exceso de Falsos Positivos (Alert Fatigue) en el SIEM de la empresa puede causar que un ataque de Ransomware real logre destruir la red sin que el Analista se dé cuenta.

5. Un candidato tiene experiencia en Linux, scripting en Bash y Python, y disfruta la investigación ofensiva, pero no tiene interés en cumplimiento normativo ni en documentación extensa. Entre Pentester, SOC Analyst, y Analista GRC, ¿cuál es la ruta más natural y por qué? ¿Qué certificación debería priorizar?

6. Una empresa mediana busca contratar un profesional de seguridad que pueda manejar desde la configuración del firewall hasta la redacción de políticas para una auditoría ISO 27001. La empresa no tiene presupuesto para un equipo grande. Explica qué combinación de roles (y en qué orden de prioridad) debería buscar, y qué perfil ("clase") cubriría la mayor parte de las necesidades.
