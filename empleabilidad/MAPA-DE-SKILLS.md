---
title: "El Mapa de Skills: El Árbol de Habilidades"
level: "inicial"
content_type: "guia"
updated: "2026-06-29"
---

# El Mapa de Skills: El Árbol de Habilidades

## Objetivo de esta Guía

aqui vamos a conectar los puntos. ninguna herramienta de ciberseguridad vive aislada. Todo se conecta.

En un videojuego, tienes un "Árbol de Habilidades" (Skill Tree). No puedes desbloquear la habilidad de "Lanzar Fuego" Nivel 3 si no aprendiste primero a "Encender una chispa" Nivel 1.
Sabes qué hacen los novatos? Querer aprender Kubernetes sin saber cómo funciona una Dirección IP. Eso crea "Agujeros de Conocimiento" que los destruirán en las entrevistas de trabajo.

**Por qué esto importa:** Es como querer construir un rascacielos sin saber poner ladrillos. En la entrevista, cuando te pregunten lo básico, te vas a caer.

---

## 1. El Árbol de la Infraestructura (El Cimiento)

Error. Si no sabes cómo se construye el castillo, no puedes defenderlo. Punto.

### Nivel 1: Redes y Sistemas

Dominio fundamental sin excepción. Todo ataque y toda defensa ocurre sobre una red y un sistema operativo.

**Redes:**
- Modelo OSI completo: capa física, enlace, red, transporte, sesión, presentación, aplicación. No se trata de memorizar las 7 capas, sino de entender cómo viaja un paquete HTTP desde un navegador hasta un servidor web en otro continente.
- TCP/IP: handshake de 3 vías, ventanas deslizantes, puertos bien conocidos (1-1023), registrados (1024-49151) y efímeros (49152-65535).
- Subnetting y CIDR: cálculo de máscaras de subred, VLSM, diseño de esquemas de direccionamiento IPv4.
- Protocolos esenciales: DNS (resolución, registros A/AAAA/CNAME/MX/NS), DHCP (concesión, renovación, relay), ARP (resolución de direcciones, spoofing), ICMP (tipos de mensajes, traceroute).
- HTTP/HTTPS: métodos (GET, POST, PUT, DELETE, PATCH), códigos de estado (1xx, 2xx, 3xx, 4xx, 5xx), cabeceras, cookies, sesiones.
- NAT y PAT: funcionamiento, sobrecarga, forwarding de puertos.
- VLANs y trunking: 802.1Q, etiquetado, separación de dominios de broadcast.

**Linux:**
- Jerarquía del sistema de archivos (FHS): `/etc`, `/var`, `/proc`, `/sys`, `/tmp`, `/usr`.
- Permisos: simbólicos (rwx) y octales (chmod 755), ACLs extendidas, sticky bit, SUID/SGID.
- Gestión de procesos: `ps`, `top`, `htop`, `systemctl`, señales (SIGTERM, SIGKILL, SIGHUP).
- Logs del sistema: `journalctl`, `/var/log/syslog`, `/var/log/auth.log`, rotación con logrotate.
- Red desde terminal: `ip`, `ss`, `tcpdump`, `nmap`, `iptables`, `netstat`.
- Automatización: scripting en bash, cron, systemd timers.

**Windows:**
- Active Directory: dominios, controladores, OU, GPO, trusts, Kerberos.
- Event Viewer: logs de seguridad (ID 4624, 4625, 4720, 4732, 4688), suscripciones, Wevtutil.
- PowerShell: cmdlets básicos, ejecución de scripts, Execution Policy, registros de transcript.
- Permisos NTFS: herencia, propagación, effective access.
- Procesos y servicios: Task Manager, `sc`, `Get-Service`, análisis de procesos sospechosos.

* **Nivel 2 (La Nube y la Orquestación):** Una vez que dominas un servidor físico, saltas a la Nube (AWS/Azure) y a los Contenedores (Docker/K8s).

**Cloud Fundamentals:**
- Modelo de responsabilidad compartida: qué asegura el proveedor vs. qué asegura el cliente.
- IaaS, PaaS, SaaS: diferencias de seguridad en cada modelo.
- AWS: VPC, subredes públicas/privadas, Security Groups, NACLs, S3 (políticas de acceso, buckets públicos), IAM (roles, políticas, usuarios), CloudTrail (auditoría).
- Azure: Virtual Networks, NSG, Microsoft Entra ID, RBAC, Key Vault, Policy.
- Principios de hardening en la nube: mínimo privilegio, cifrado en reposo y en tránsito, logging centralizado.

**Contenedores:**
- Docker: imágenes, capas, Dockerfile, docker-compose, volúmenes, redes (bridge, host, overlay).
- Seguridad en Docker: usuarios no root, imágenes firmadas, escaneo de vulnerabilidades (Trivy, Clair), límites de recursos.
- Kubernetes: pods, servicios, deployments, namespaces, RBAC, Network Policies, secrets.
- Kubernetes security: Pod Security Standards, OPA/Gatekeeper, Falco, seccomp, AppArmor.
- Hardening de imágenes: minimizar capas, eliminar herramientas innecesarias, actualizar dependencias.

**Bases de Datos:**
- SQL vs. NoSQL: diferencias de modelo y seguridad.
- Inyección SQL: cómo ocurre, cómo prevenirla (consultas parametrizadas, ORM, WAF).
- Hardening: puertos, autenticación, cifrado, auditoría de consultas.
- Logs de base de datos: detección de accesos anómalos, consultas lentas, intentos de inyección.

---

## 2. El Árbol de la Defensa (La Muralla)

Este es el núcleo del Blue Team. aqui es donde realmente empieza la acción.

### Nivel 1: Visibilidad

No puedes defender lo que no puedes ver. Aquí entra tu dominio de la Arquitectura de Seguridad y la ingesta de Logs en el SIEM.

**SIEM (Security Information and Event Management):**
- Arquitectura: colectores, forwarders, motor de correlación, almacenamiento, dashboard.
- Ingesta de logs: Syslog (UDP 514, TCP 514, RELP), Windows Event Forwarding, API REST, agentes.
- Normalización de logs: CEF, LEEF, formato JSON, extracción de campos clave.
- Reglas de correlación: basadas en umbrales, ventanas de tiempo, secuencias de eventos.
- Tipos de SIEM: Splunk (SPL), Wazuh (Open Source), Elastic Stack (ELK), QRadar, Sentinel (Microsoft).
- Dashboards: creación de visualizaciones para monitoreo en tiempo real.

**Arquitectura de Seguridad:**
- Diagramas de red: segmentación, zonas (DMZ, interna, gestión), controles de perímetro.
- Inventario de activos: hardware, software, datos, clasificación por criticidad.
- Baseline de seguridad: configuración base de sistemas, hardening guides (CIS Benchmarks).
- Monitoreo de integridad: FIM (File Integrity Monitoring), cambios en archivos críticos.

### Nivel 2: Respuesta Rápida

Ya ves al atacante, ¿Qué haces? Dominar los Playbooks de Respuesta a Incidentes. Saber aislar la red de una máquina comprometida.

**Incident Response (IR):**
- Ciclo de vida: Preparación, Identificación, Contención, Erradicación, Recuperación, Lecciones Aprendidas.
- Playbooks: documentos procedurales para tipos específicos de incidentes (ransomware, phishing, DDoS, filtración de datos).
- TRIAGE: priorización por criticidad del activo afectado, tipo de incidente, alcance.
- Contención: aislar host (desconectar cable, deshabilitar puerto de switch, bloquear IP en firewall), preservar evidencia.
- Erradicación: eliminar malware, parchear vulnerabilidad, rotar credenciales, reconstruir sistemas.
- Recuperación: restaurar desde backups, verificar integridad, monitorear reinfección.
- Herramientas de IR: TheHive (gestión de casos), Shuffle (orquestación), Velociraptor (recolección forense).

**Threat Intelligence:**
- Fuentes: MITRE ATT&CK (tácticas y técnicas), CVE/NVD (vulnerabilidades), AlienVault OTX, MISP, VirusTotal, Shodan.
- Indicadores de Compromiso (IoC): IPs maliciosas, hashes de archivos, dominios, URLs, patrones de red.
- Indicadores de Ataque (IoA): comportamiento sospechoso, técnicas en curso.
- Feeds de inteligencia: comerciales (Recorded Future, Anomali), gratuitos (AbuseIPDB, PhishTank).
- Integración con SIEM: correlacionar IoCs contra logs para detección proactiva.

### Nivel 3: Análisis Forense

El atacante está contenido. Ahora debes diseccionar el cadáver.

**Forense Digital (DFIR):**
- Cadena de custodia: documentación de cada manipulación de evidencia, integridad (hashes SHA256).
- Adquisición de memoria RAM: `FTK Imager`, `Belkasoft`, `LiME`, `DumpIt` — capturar volátil antes de apagar.
- Análisis de memoria: `Volatility` (procesos, conexiones de red, DLLs inyectadas, rootkits).
- Adquisición de disco: imágenes forenses (dd, E01, AFF), write blockers, hash de integridad.
- Análisis de disco: `Autopsy`, `Sleuth Kit`, sistemas de archivos (NTFS, ext4, FAT32), archivos borrados, registros de eventos.
- Análisis de Malware: sandboxing (Cuckoo, Any.Run), análisis estático (strings, PE structure), análisis dinámico (API calls).
- Línea de tiempo: reconstrucción de eventos (Plaso), correlación de marcas de tiempo.
- Forense de red: PCAP analysis, Wireshark, extracción de archivos del tráfico, identificación de C2.

---

## 3. El Árbol del Negocio (La Cúspide Ejecutiva)

aqui está el verdadero diferenciador. Aquí es donde la tecnología se traduce en Dinero y Leyes. Es la habilidad que separa a un Analista Junior de un Director (CISO).

### Nivel Único: GRC — Gobierno, Riesgo y Cumplimiento

La Ciberseguridad no es sobre "Hackear". Es sobre calcular que si el servidor de la Base de Datos se cae, la empresa pierde $100,000 dólares por hora.

**Gobierno (Governance):**
- Políticas de seguridad: documentos de alto nivel que definen la postura de seguridad de la organización.
- Estándares: ISO 27001/27002 (SGSI), NIST Cybersecurity Framework (CSF), COBIT.
- Procedimientos: pasos detallados para cumplir las políticas, documentación operativa.
- Comité de seguridad: estructura de gobierno, roles y responsabilidades (CISO, DPO, CRO).
- Métricas y KPIs: tiempo medio de detección (MTTD), tiempo medio de respuesta (MTTR), % de parches aplicados.

**Riesgo (Risk Management):**
- Evaluación de Riesgos: identificación de activos, amenazas, vulnerabilidades, impacto y probabilidad.
- Metodologías: análisis cualitativo (matriz de riesgo 5x5), cuantitativo (ALE, SLE, ARO).
- Tratamiento: mitigar (reducir riesgo), transferir (seguro cibernético), aceptar (riesgo residual), evitar (eliminar actividad).
- Riesgo de Terceros (TPRM): evaluación de proveedores, due diligence, SLA de seguridad.
- Riesgo de Cumplimiento: multas, sanciones, daño reputacional por incumplimiento normativo.

**Cumplimiento (Compliance):**
- GDPR: Reglamento General de Protección de Datos (Europa). Derechos ARCO, notificación de brechas (72h), DPO, multas de hasta 20M EUR o 4% de facturación anual.
- PCI-DSS: Estándar de Seguridad de Datos para Industria de Tarjetas de Pago. 12 requisitos, evaluación anual, alcance, SAQ, ASV.
- HIPAA: Protección de datos de salud (EE.UU.), reglas de privacidad y seguridad, notificación de brechas.
- SOX: Ley Sarbanes-Oxley, controles financieros, retención de registros, auditoría de accesos.
- ISO 27001: Certificación del SGSI, auditoría interna y externa, mejora continua (PDCA).
- NIST 800-53: Controles de seguridad para sistemas federales de EE.UU.

**Habilidades de Comunicación Ejecutiva:**
- Reportes ejecutivos: traducir vulnerabilidades técnicas a riesgo de negocio con impacto financiero.
- Presentaciones al Board: lenguaje no técnico, métricas claras, recomendaciones accionables.
- Gestión presupuestaria: justificar inversiones en seguridad basándose en reducción de riesgo.
- Negociación: balance entre seguridad y productividad, excepciones, aceptación de riesgo.

**Por qué esto importa:** puedes ser el mejor técnico del mundo, pero si no sabes hablar en plata, te van a pagar como a un técnico. El que traduce tecnología a dinero, ese es el que gana.

---

## 4. Habilidades Transversales (Soft Skills Técnicas)

Habilidades que aplican a todos los árboles y diferencian a un profesional completo:

- **Comunicación escrita:** reportes de incidentes claros, documentación técnica, correos profesionales.
- **Pensamiento crítico:** cuestionar suposiciones, validar hipótesis, no aceptar resultados al pie de la letra.
- **Trabajo bajo presión:** mantener la calma durante incidentes, priorizar tareas en crisis.
- **Aprendizaje continuo:** la industria cambia rápido, lectura diaria de feeds de seguridad, laboratorios semanales.
- **Trabajo en equipo:** colaborar con otras áreas (IT, legal, negocio), compartir conocimiento.
- **Mentoring:** enseñar a otros refuerza el propio entendimiento.

---

## 5. Matriz de Certificaciones por Árbol

| Árbol | Certificaciones Recomendadas |
|---|---|
| Infraestructura (Nivel 1) | CompTIA Network+, Linux Essentials, LPIC-1, MTA Windows |
| Infraestructura (Nivel 2) | AWS Solutions Architect, Azure Administrator, CKA (Kubernetes) |
| Defensa (Nivel 1-2) | CompTIA Security+, CySA+, SC-200, Splunk Core Certified |
| Defensa (Nivel 3) | GCFE/GCFA (SANS), CHFI, GNFA |
| Negocio (GRC) | CISA, CISM, CRISC, CISSP, ISO 27001 Lead Auditor |
| Integración Total | CISSP (requiere 5 años de experiencia) |

---

## 6. Estrategias de Aprendizaje por Árbol

**Mapa de dependencias:** No existe un orden único, pero hay prerrequisitos lógicos:
1. Redes + Linux/Windows antes que Cloud.
2. Cloud antes que Contenedores (K8s requiere entender redes, Linux y cloud).
3. SIEM y Defensa requieren entender redes y sistemas.
4. Forense requiere entender SIEM y sistemas.
5. GRC requiere una base técnica y conocimiento regulatorio.
6. Habilidades transversales se desarrollan en paralelo.

**Laboratorios recomendados por árbol:**
- Infraestructura: Packet Tracer (redes), VirtualBox/VMware (SO), AWS Free Tier (cloud).
- Defensa: Wazuh (SIEM), Metasploitable (práctica de detección), REMnux (forense).
- GRC: plantillas de políticas ISO 27001, assessment de riesgos simulado, lectura de leyes.

---

## 7. Criterio de Dominio (Autoevaluación)

Revisa si tu Árbol de Habilidades está balanceado:

1. Un estudiante decide que las "Redes de Computadoras" (Modelo OSI, TCP/IP) son muy aburridas y decide saltarse esa fase para estudiar directamente "Seguridad en la Nube de AWS". Explica el "Agujero de Conocimiento" fatal que enfrentará cuando AWS le pida configurar un *VPC (Virtual Private Cloud)* y subredes para aislar sus servidores.

2. Compara el **Árbol de la Defensa** con el **Árbol del Negocio**. Si un Analista SOC domina la detección técnica de un ataque de Phishing (Árbol de Defensa), ¿Por qué necesita el Árbol del Negocio para explicarle la gravedad de este ataque al Director Financiero (CFO) de la empresa?

3. En la analogía del "Árbol de Habilidades", ¿Por qué el dominio del Sistema Operativo Linux (Terminal, Permisos, Procesos) se considera un requisito bloqueante (Nivel 1) antes de intentar entender la tecnología de Contenedores y Docker (Nivel 2)?

4. En una entrevista de trabajo, el CISO te pregunta cuál es tu fortaleza principal. Tú respondes: *"Entender la trazabilidad de los ataques desde los paquetes de red (Cimiento) hasta su impacto financiero en el cumplimiento normativo (GRC)"*. ¿Qué le estás diciendo al CISO sobre la estructura de tu propio Árbol de Habilidades?

5. Supón que eres un Analista SOC y detectas que un endpoint está haciendo conexiones salientes a una IP en un país no autorizado por la política corporativa. Describe el flujo completo de acciones que tomarías para: (a) confirmar que no es un falso positivo, (b) contener el host, (c) recolectar evidencia forense, (d) reportar el incidente con impacto en el negocio a la gerencia. Identifica qué árbol(es) de habilidad intervienen en cada paso.

6. Un CISO debe decidir entre contratar a un candidato con perfil exclusivamente técnico (CISSP, 10 años en SOC) y otro con perfil técnico más GRC (CISM, experiencia en compliance y gestión de riesgos). La empresa está siendo auditada por PCI-DSS y necesita demostrar controles. Explica por qué el perfil con conocimientos de GRC podría ser más valioso en este contexto específico, a pesar de tener menos años de experiencia hands-on.
