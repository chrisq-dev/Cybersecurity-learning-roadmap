---
title: "Equipos de Seguridad: Los Juegos de Guerra"
---

# Equipos de Seguridad: Los Juegos de Guerra

## Objetivo de esta Guía

Destruir el mito de Hollywood de que la ciberseguridad se trata exclusivamente de ponerse una capucha negra y hackear bancos.

En la vida real corporativa, la ciberseguridad es una operación militar altamente estructurada. Existen equipos separados con presupuestos separados, y el 90% del dinero (y de los empleos) no está en atacar, está en defender. Las películas te venden pura mentira.

Esta guía desglosa la estructura organizativa de la ciberseguridad empresarial, los roles, las herramientas que usa cada equipo y cómo interactúan en el mundo real.

---

## 1. Red Team (Los Asesinos a Sueldo)

* **La Analogía:** Eres el Rey de un castillo. Crees que tus defensas son perfectas. Para estar seguro, contratas legalmente a un grupo de mercenarios expertos y les pagas para que intenten colarse al castillo a las 3:00 AM y "secuestrar" a la princesa. Si lo logran, te entregan un reporte de cómo lo hicieron.

* **En Informática:** El Red Team (Equipo Rojo) hace *Offensive Security* (Pentesting, Ingeniería Social). Su trabajo es simular ser un grupo de hackers rusos (APT) para encontrar las vulnerabilidades de la empresa antes de que los criminales reales lo hagan.

### Herramientas y Metodologías del Red Team

El Red Team opera con un arsenal especializado que refleja el de los atacantes reales:

**Frameworks de Explotación:**
- **Metasploit Framework:** La navaja suiza del pentesting. Contiene miles de módulos de explotación, payloads y auxiliares. Permite automatizar la explotación de vulnerabilidades conocidas.
- **Cobalt Strike:** Herramienta comercial de post-explotación y simulación de adversarios. Utilizada por equipos rojos avanzados y, lamentablemente, también por ransomware gangs como Conti y LockBit. Su funcionalidad de "comandos y control" (C2) permite mantener acceso persistente.
- **Sliver & Havoc:** Alternativas open-source a Cobalt Strike para simulación de adversarios sin licencias costosas.

**Herramientas de Reconocimiento y Enumeración:**
- **Nmap:** Escaneo de puertos y detección de servicios. Un atacante o Red Team utiliza flags como `-sS` (SYN stealth), `-sV` (detección de versión), `-O` (detección de SO) y `-A` (agresivo). Ejemplo: `nmap -sS -sV -O -p- 10.0.0.0/24` para escanear todos los puertos TCP de una subred.
- **BloodHound:** Herramienta para mapear relaciones en Active Directory. Utiliza teoría de grafos para encontrar rutas de escalación de privilegios: "¿Cómo puedo pasar de usuario del dominio a Administrador del Dominio?".
- **Burp Suite / ZAP:** Interceptores de tráfico web para analizar y modificar peticiones HTTP. Burp Suite es el estándar de facto para pentesting web. Su módulo Intruder permite automatizar ataques de fuerza bruta y fuzzing.

**Metodologías Profesionales:**
- **PTES (Penetration Testing Execution Standard):** Define 7 fases: Pre-engagement, Reconocimiento, Enumeración, Explotación, Post-explotación, Reporte y Remediación.
- **OSSTMM (Open Source Security Testing Methodology Manual):** Enfoque más científico y orientado a métricas.
- **OWASP Testing Guide:** Estándar para pentesting de aplicaciones web.

### Tipos de Engagements

- **Black Box:** El Red Team no tiene información previa del objetivo. Simula un atacante externo.
- **White Box:** El Red Team recibe toda la información (código fuente, credenciales, diagramas de red). Enfoque en profundidad, no en evasión.
- **Grey Box:** Punto medio. El equipo tiene credenciales de usuario estándar pero no conoce la arquitectura interna.

* **Por que esto importa:** Un engagement Black Box es costoso (el equipo pasa semanas en reconocimiento), pero revela vulnerabilidades reales desde la perspectiva de un atacante externo. Un White Box es más rápido y barato, y encuentra vulnerabilidades profundas en el código. La mayoría de las empresas optan por Grey Box como balance costo-beneficio.

* **La Realidad Laboral:** Es el trabajo que todos los novatos quieren porque se ve genial en las películas. Sin embargo, representa menos del 10% de los empleos reales en el mercado. Por que esto importa: un atacante solo necesita tener suerte una vez; el defensor necesita tener suerte todos los días. Es como jugar al fútbol donde el otro equipo solo necesita un gol y tú tienes que mantener el arco en cero toda la temporada.

## 2. Blue Team (La Guardia del Castillo)

* **La Analogía:** Son los soldados en las murallas, los operadores del foso con cocodrilos, y los analistas de las cámaras de seguridad.
* **En Informática:** El Blue Team (Equipo Azul) hace *Defensive Security*. Construyen Firewalls, administran el Antivirus EDR, y monitorean los logs en el SOC (Security Operations Center) 24/7.

### Estructura del SOC

El SOC se organiza típicamente en tres niveles de analistas:

**SOC Tier 1 (Monitorización):**
- Revisa alertas del SIEM en tiempo real. Clasifica incidentes como verdaderos positivos, falsos positivos o sospechosos.
- Gestión inicial de tickets. Escala incidentes confirmados al Tier 2.
- Habilidades: Entender logs, conocer los indicadores de compromiso (IoC) básicos.

**SOC Tier 2 (Respuesta):**
- Investiga incidentes confirmados. Realiza análisis profundo de logs y artefactos.
- Contención: aísla endpoints infectados, bloquea IPs maliciosas, deshabilita cuentas comprometidas.
- Habilidades: Análisis forense básico, scripting (Python, PowerShell), conocimiento de MITRE ATT&CK.

**SOC Tier 3 (Threat Hunting & Forense):**
- Busca proactivamente amenazas que evadieron las defensas automatizadas.
- Análisis forense avanzado (memoria, disco, tráfico de red).
- Caza de amenazas basada en hipótesis: "¿Qué pasaría si un atacante estuviera usando PowerShell sin registro?"
- Habilidades: Reversing de malware, análisis de memoria (Volatility), inteligencia de amenazas.

### Herramientas del Blue Team

**SIEM (Security Information and Event Management):**
- **Splunk:** El estándar corporativo. Recibe logs de firewalls, servidores, endpoints y aplicaciones. Su lenguaje de búsqueda (SPL) permite correlacionar eventos. Ejemplo: `index=windows EventCode=4625 | stats count by src_ip` para contar intentos de inicio de sesión fallidos por IP.
- **ELK Stack (Elasticsearch, Logstash, Kibana):** Alternativa open-source.
- **Wazuh:** SIEM open-source con capacidades de EDR integradas y cumplimiento de estándares (PCI DSS, GDPR).

**EDR (Endpoint Detection and Response):**
- **CrowdStrike Falcon:** Agente único en la nube. Detecta ataques sin firma mediante machine learning y análisis de comportamiento.
- **SentinelOne:** EDR autónomo con capacidad de revertir ataques automáticamente.
- **Microsoft Defender for Endpoint:** Integrado en el ecosistema Microsoft, común en entornos corporativos Windows.
- **Wazuh / Velociraptor:** Alternativas open-source.

* **La Realidad Laboral:** Es la columna vertebral del internet. Aquí es donde están los presupuestos millonarios de los bancos y corporaciones. Si te gusta construir arquitecturas masivas, investigar telemetría forense y salvar empresas de la quiebra en tiempo real, este es tu equipo.

## 3. Purple Team (La Mesa de Negociaciones)

Históricamente, el Red Team y el Blue Team se odiaban. No es broma, el Red Team se burlaba de que lograba entrar al castillo fácilmente, y el Blue Team se quejaba de que el Red Team solo rompía cosas sin ayudar a arreglarlas. Una guerra civil total.

* **La Analogía:** Después del juego de guerra, los mercenarios y los guardias del castillo se sientan en una sala de conferencias a tomar café. El mercenario (Red) le dice al guardia (Blue): *"Logré entrar por la ventana trasera del piso 3"*. El guardia responde: *"Interesante, mi cámara de seguridad no vio eso. Ayúdame a calibrarla para que la próxima vez sí te vea"*.
* **En Informática:** El Purple Team (Equipo Púrpura) no es un grupo de personas nuevas. Es la **metodología** temporal donde ambos equipos colaboran en tiempo real para mejorar la postura defensiva (GRC).

### Ejercicios Purple Team

- **Ejercicio con tabla en vivo:** El Red Team ejecuta un ataque mientras el Blue Team observa en vivo las telemetrías. Al detectar el ataque, se detiene la simulación y se discute qué señales emitió el atacante y cómo mejorar la detección.
- **Ejercicios automatizados:** Herramientas como **Atomic Red Team** (libería de pruebas de MITRE ATT&CK) y **CALDERA** (marco de emulación de adversarios) permiten ejecutar técnicas de ataque de forma segura y validar si el Blue Team las detecta.

* **Por que esto importa:** Un Purple Team bien ejecutado reduce el tiempo entre la identificación de una vulnerabilidad y la implementación de una defensa, pasando de semanas a horas.

## 4. Más Allá de los Tres Colores

### White Hat, Grey Hat, Black Hat

La terminología de "sombreros" proviene de las películas del viejo oeste, donde los héroes usaban sombrero blanco y los villanos, negro.

**White Hat (Sombrero Blanco):** El hacker ético autorizado. Opera con permisos legales por escrito (Autorización firmada por el dueño del sistema). Incluye tanto a pentesters del Red Team como a bug bounty hunters (cazadores de recompensas) en plataformas como HackerOne o Bugcrowd.

**Black Hat (Sombrero Negro):** El atacante criminal. Opera sin autorización con intención de lucro, daño o espionaje. Incluye ransomware gangs (LockBit, BlackCat/ALPHV), APT (grupos patrocinados por estados) y script kiddies.

**Grey Hat (Sombrero Gris):** Zona legalmente ambigua. Un grey hat descubre una vulnerabilidad y la publica sin permiso del dueño, o la explota para demostrar el daño sin robar datos. Aunque sus intenciones puedan ser "buenas", legalmente sigue siendo intrusión no autorizada.

### Roles de Seguridad Adicionales

**DevSecOps (Equipo Verde — Green Team):**
- Ingenieros que integran seguridad en el ciclo de desarrollo de software (CI/CD).
- Implementan SAST (Análisis Estático), DAST (Análisis Dinámico), y SCA (Análisis de Composición de Software).
- Herramientas: SonarQube, Snyk, Trivy, Dependabot, GitHub Advanced Security.
- Escriben reglas de infraestructura como código (IaC) usando Terraform o CloudFormation con políticas de seguridad integradas (Checkov, tfsec).

**Equipo de Threat Intelligence (CTI):**
- Investiga actores de amenazas, sus tácticas (TTPs) y la infraestructura que usan.
- Alimenta al SOC con IoCs (Indicadores de Compromiso) actualizados.
- Fuentes: MISP (Malware Information Sharing Platform), VirusTotal, AbuseIPDB, feeds de MITRE ATT&CK y foros de la dark web.

**Equipo DFIR (Digital Forensics & Incident Response):**
- Responde cuando el SOC escala un incidente confirmado.
- Realiza análisis forense de discos (FTK Imager, Autopsy, Sleuth Kit), memoria (Volatility, Rekall) y redes (Wireshark, NetworkMiner).
- Documenta la línea de tiempo del ataque (timelining) para determinar alcance, vector de entrada y datos comprometidos.

### Certificaciones por Rol

| Rol | Certificaciones Recomendadas |
|-----|------------------------------|
| Red Team / Pentester | OSCP (Offensive Security Certified Professional), PNPT, GPEN, eCPPT, OSWE (Web), OSEP (Evasion) |
| Blue Team / SOC | Security+, CySA+, GCIA, GCIH, BTL1 (Blue Team Level 1) |
| Purple Team | No hay certificación específica; se recomienda experiencia combinada Red+Blue |
| DFIR | GCFA, GCFE, CHFI, FOR500/508 (SANS) |
| Threat Intelligence | CTIA (Certified Threat Intelligence Analyst) |
| DevSecOps | CSSLP, AWS Security Specialty, Certified Kubernetes Security Specialist |
| GRC / CISO | CISM, CISSP, CRISC, CISA, CCISO |

### Operación del SOC: Métricas y KPIs

El SOC se mide con indicadores clave de rendimiento para justificar el presupuesto y demostrar efectividad:

- **MTTD (Mean Time to Detect):** Tiempo promedio entre que un ataque ocurre y el SOC lo detecta. Objetivo: < 1 hora.
- **MTTR (Mean Time to Respond):** Tiempo promedio entre detección y contención. Objetivo: < 4 horas.
- **FPR (False Positive Rate):** Porcentaje de alertas que son falsos positivos. Objetivo: < 5%.
- **Alertas procesadas por turno:** Volumen que cada analista puede manejar. Promedio: 50-100 alertas/día.
- **Tasa de escalamiento:** Porcentaje de alertas que pasan de Tier 1 a Tier 2. Objetivo: 20-30%.

### Staffing del SOC

Un SOC 24/7 requiere personal suficiente para cubrir turnos rotativos:

- **Turnos:** 3 turnos de 8 horas (mañana, tarde, noche) o 4 turnos de 12 horas (día/noche) con 4 días de trabajo y 4 de descanso (esquema Panamá: 12 horas, 3-4 días, 3-4 off).
- **Cobertura mínima:** 2 analistas por turno para evitar el punto único de falla humana.
- **Personal total:** Para cubrir 3 turnos × 2 analistas considerando vacaciones (15 días/año), enfermedad (10 días/año), y capacitación (10 días/año), se necesitan 9-12 analistas.
- **Estructura típica de un SOC corporativo:**
  - 1 SOC Manager
  - 2-3 Tier 3 (Threat Hunters)
  - 4-6 Tier 2 (Responders)
  - 6-8 Tier 1 (Monitors)
  - 1-2 Ingenieros SIEM

### Casos Reales de Coordinación Entre Equipos

**Caso 1: Respuesta a Phishing Avanzado (2022)**
Un empleado de finanzas recibe un correo de phishing que evade el gateway de email. El empleado hace clic y sus credenciales son robadas.
1. **EDR (Blue Team):** Detecta un inicio de sesión anómalo desde Nigeria 30 minutos después del clic. Alerta al SIEM.
2. **SOC Tier 1:** Revisa la alerta, confirma que el empleado está en la oficina (geolocalización IP imposible). Escala a Tier 2.
3. **SOC Tier 2:** Deshabilita la cuenta del empleado, fuerza un reset de contraseña, bloquea la IP origen. Revisa si hubo acceso a datos sensibles.
4. **Red Team:** Usa la misma técnica de phishing como aprendizaje. Crea una campaña de concientización dirigida.
5. **GRC:** Documenta el incidente, actualiza la política de acceso remoto.

**Caso 2: Ataque de Ransomware Contenido (2023)**
Un ransomware comienza a cifrar archivos en un servidor de archivos.
1. **EDR (SentinelOne):** Detecta comportamiento de ransomware (escritura masiva de archivos con extensión .locked). Revierte automáticamente los cambios.
2. **SOC Tier 3:** Investiga el vector de entrada. Descubre que el ransomware entró via RDP expuesto (puerto 3389 abierto a internet).
3. **Red Team:** Confirma que hay otros sistemas con RDP expuesto en el mismo segmento de red.
4. **DevSecOps:** Implementa regla de firewall bloqueando RDP desde internet. Configura VPN como único método de acceso remoto.
5. **GRC:** Actualiza el registro de riesgos. El tratamiento cambia de "riesgo aceptado" a "riesgo mitigado".

## 5. Cómo los Equipos se Coordinan en la Práctica

En una corporación real, el flujo de trabajo entre equipos sigue este ciclo:

1. **CTI** detecta que un grupo ransomware está atacando activamente el sector financiero.
2. **SOC (Blue Team)** busca IoCs compartidos por CTI en los endpoints y redes de la empresa.
3. **Red Team** realiza un ejercicio dirigido a emular las TTPs del grupo detectado por CTI.
4. **Purple Team** analiza las detecciones y brechas identificadas durante el ejercicio.
5. **DevSecOps** implementa controles técnicos (reglas de WAF, parches, hardening) basados en los hallazgos.
6. **GRC** documenta los cambios en las políticas de seguridad y asegura el cumplimiento normativo.

---

## 6. El Ángulo del Hacker

Un atacante real (Black Hat) conoce la estructura de equipos de defensa corporativa y la explota:

- **Contra el Red Team:** No pueden hacer nada directamente, pero pueden fingir ser un pentester legítimo para obtener acceso (suplantación de identidad). Los falsos "pentesters" son un vector de ataque real.
- **Contra el Blue Team:** Saben que el SOC tiene fatiga de alertas. Un atacante puede generar miles de alertas falsas (alert flooding) para esconder el ataque real entre el ruido.
- **Contra la estructura:** Atacan en fines de semana o días festivos, cuando la dotación del SOC es mínima. El 45% de los ataques de ransomware ocurren fuera del horario laboral.
- **El eslabón más débil:** Saben que los equipos tienen conflictos internos. Un atacante explota la falta de comunicación entre equipos para moverse lateralmente sin ser detectado.

## 7. Criterio de Dominio (Autoevaluación)

Revisa si entiendes la estructura militar corporativa:

1. Un estudiante de universidad argumenta que quiere dedicar su vida exclusivamente a ser "Hacker Ético" (Red Team) porque cree que las empresas gastan todo su dinero en pagarle a personas para que ataquen sus sistemas. Usa el concepto de "Riesgo Financiero" para explicarle por qué las corporaciones destinan el 90% de su presupuesto de ciberseguridad al Blue Team en lugar del Red Team.

2. Usando la analogía de los "Juegos de Guerra", explica cuál es la diferencia entre un Penetration Test tradicional (Red Team) y una operación de colaboración **Purple Team**. ¿Cuál de los dos métodos aporta más valor rápido al equipo de defensa?

3. Un analista del **Blue Team** está monitoreando alertas en su pantalla a las 3:00 AM y detecta que un empleado intentó iniciar sesión 50 veces desde Rusia. ¿Por qué el analista del Blue Team debe seguir estrictamente un "Playbook" (Plan de Respuesta) en lugar de intentar apagar los servidores por su propia cuenta para detener el ataque?

4. El equipo directivo decide despedir a todo el Blue Team y quedarse solo con el Red Team para ahorrar dinero, argumentando que "la mejor defensa es un buen ataque". ¿Por qué esta decisión corporativa garantiza matemáticamente que la empresa será destruida por un Ransomware en menos de un mes?

5. Un CISO necesita contratar personal para un SOC que operará 24/7. Explica por qué se requieren al menos 5-6 analistas para cubrir un turno (considerando vacaciones, enfermedad y rotación), y cómo se distribuyen las responsabilidades entre los Tiers 1, 2 y 3 del SOC.

6. Durante un ejercicio de Purple Team, el Red Team utiliza BloodHound para encontrar una ruta de escalación de privilegios en Active Directory que el Blue Team no estaba monitoreando. Explica qué valor aporta este hallazgo al equipo de defensa y cómo debería documentarse en el playbook del SOC.
