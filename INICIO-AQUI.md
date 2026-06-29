---
title: "Inicio Aquí"
level: "inicial"
content_type: "ruta"
updated: "2026-06-29"
---

# Inicio Aquí

Hola, soy Christian Quiñones. Creé esta web para ordenar lo que voy aprendiendo sobre ciberseguridad y compartirlo con otras personas que, como yo, pueden sentirse perdidas entre tantos temas, herramientas y recursos.

No pretende ser una fuente definitiva ni reemplazar la documentación oficial. Es una guía abierta que seguiré corrigiendo y ampliando conforme estudio, practico de forma responsable y recibo aportes de la comunidad.

Mi objetivo es facilitar el acceso al conocimiento, explicar los fundamentos con claridad y ayudar a que más personas encuentren un punto de partida.

Esta web es una guía de ciberseguridad organizada para ofrecer una ruta de aprendizaje clara y estructurada. Cada sección aborda un área específica del conocimiento de seguridad informática, con explicaciones detalladas, casos prácticos y preguntas de verificación.

El propósito es conectar los conceptos fundamentales con aplicaciones prácticas, proporcionando contexto y profundidad sin asumir conocimientos previos.

## Objetivo de esta Guía

Este archivo es el punto de partida de la web. No contiene un tutorial ni una secuencia rígidamente fija. Su propósito es ofrecerte una comprensión de cómo está organizado el mapa, cuáles son los distintos caminos que puedes tomar para adentrarte en la ciberseguridad y cómo cada guía se conecta con las demás.

Piensa en este archivo como la estación central desde la cual parten todos los trenes: cada guía, cada glosario y cada playbook es un destino distinto; tú eliges adónde ir según lo que necesites.

La ciberseguridad no es una disciplina que se aprenda de forma lineal. No existe un orden único y universal que funcione para todos. Lo que sí existe son fundamentos que se apoyan unos en otros, especializaciones que requieren bases sólidas y una mentalidad que se construye con la exposición constante a problemas reales. Esta web refleja esa realidad: no espera que leas todo de principio a fin, sino que uses cada guía como un recurso de consulta, estudio y reflexión.

### Qué es esta web

Es una colección de guías conceptuales que cubren la mayoría de las áreas de la ciberseguridad moderna. Cada guía está escrita con un enfoque en la comprensión profunda de los conceptos, no en la ejecución de comandos o la configuración de herramientas. El objetivo es que entiendas qué son las cosas, por qué existen, cómo fallan y cómo se relacionan con el ecosistema más amplio de la seguridad de la información.

La web cubre las siguientes áreas: fundamentos técnicos de computación, sistemas operativos y redes; criptografía y sus aplicaciones; seguridad ofensiva y defensiva; respuesta a incidentes y threat hunting; gobierno, riesgo y cumplimiento; seguridad en la nube, aplicaciones, APIs, contenedores y dispositivos móviles; ingeniería social y OSINT; malware y forénsica; privacidad; seguridad en IA; cultura hacker y profesional; y empleabilidad en ciberseguridad.

Cada una de estas áreas se aborda desde una perspectiva conceptual. No encontrarás listas de comandos para ejecutar ni recetas de configuración. Encontrarás explicaciones de por qué esos comandos existen, qué problema resuelven y cómo encajan en el panorama general de la seguridad.

### Qué no es esta web

No es un curso paso a paso. No es un manual de herramientas. No es una guía para aprobar un examen de certificación. No contiene laboratorios prácticos ni ejercicios de programación. No es un sustituto de la experiencia práctica.

Lo que ofrece es el contexto conceptual que necesitas para dar sentido a todo lo demás: las herramientas que usarás, las certificaciones que estudiarías, las prácticas que verás en la industria y los incidentes que leerás en las noticias. Es el mapa que te permite entender el territorio antes de recorrerlo.

### La metáfora del mapa de la ciudad

Imagina que la ciberseguridad es una ciudad enorme con distintos distritos. Cada distrito tiene su propia cultura, su propio lenguaje y sus propias reglas. Esta web es un mapa de esa ciudad. Cuando abres una guía, estás leyendo sobre un distrito en particular: sus calles principales, sus edificios importantes, los peligros que acechan en esa zona y cómo los habitantes de ese distrito se protegen.

El distrito de Red Team es donde se estudia cómo piensan los atacantes. El distrito de Blue Team es donde se aprende a defender. El distrito de Criptografía es donde se fabrican las cerraduras y las llaves. El distrito de Redes es el sistema de calles y avenidas que conecta todo. El distrito de GRC es donde se redactan las leyes y normas que rigen la ciudad.

No necesitas conocer todos los distritos a la perfección antes de moverte por la ciudad. Pero sí necesitas saber que existen, dónde están y cómo llegar a ellos cuando los necesites.

---

## Como Esta Organizada la Web

Cada guía en esta web sigue una estructura consistente: una primera capa con el objetivo, la analogía central y el concepto fundamental para cualquier lector; una segunda capa con profundización que incluye contexto histórico, casos de estudio reales y modos de fallo comunes; y una tercera capa con conexiones a otras guías y un criterio de dominio con preguntas para autoevaluarte.

Existen tres tipos de archivos. Las guías técnicas son el cuerpo principal y siguen la estructura de tres capas. Los glosarios son listas de términos con definiciones expandidas que incluyen contexto corporativo y origen histórico. Los playbooks son guías de referencia rápida para respuesta a incidentes, concisos y operativos, que siguen el ciclo PICERL.

---

## Las Tres Rutas de Navegación

### Ruta secuencial: de los fundamentos a la especialización

Para quienes empiezan desde cero o sienten lagunas en su base técnica. La secuencia respeta las dependencias naturales entre temas.

Comienza con los fundamentos técnicos: computación básica, sistemas operativos, identidad y permisos, y base de seguridad. Continua con redes: fundamentos de redes, modelo OSI y TCP/IP, DNS, DHCP y NAT, subnetting, switching, VLANs y ACLs. Sigue con sistemas operativos en profundidad: Linux (fundamentos, comandos, permisos, hardening, procesos) y Windows (fundamentos, Active Directory, PowerShell, eventos). Luego fundamentos web y finalmente fundamentos de blue team.

Esa secuencia inicial de aproximadamente quince guías te da una base sólida. A partir de ahí, el camino se bifurca según tus intereses.

### Ruta por rol: según el perfil profesional

Si ya tienes base técnica y sabes qué área te interesa, puedes saltar directamente a las guías de tu rol.

**Para Blue Team (analista de SOC, respondedor de incidentes, threat hunter).** Fundamentos de blue team, logs y alertas, SIEM y MITRE, detection engineering, sigma yara, threat hunting, respuesta a incidentes, playbooks. Complementa con network security, endpoint security y email security.

**Para Red Team (pentester, ethical hacker).** Metodología ética, reconocimiento y enumeración, OWASP, API security, mobile security, Active Directory. Fundamentos de redes y Linux son especialmente importantes.

**Para GRC (gobierno, riesgo, cumplimiento).** Fundamentos de GRC, riesgo y controles, privacidad, continuidad de negocio, arquitectura de seguridad, zero trust.

**Para Ingeniería de Seguridad (DevSecOps, cloud security, AppSec).** AppSec y DevSecOps, cloud security (4 guías), contenedores y Kubernetes, API security, fundamentos de arquitectura.

**Para Forénsica y Malware Analysis.** Cadena de custodia, forénsica de disco y memoria, tipos de malware, ransomware, botnets y C2.

### Ruta por tópico: cuando necesitas un concepto específico

Si ya tienes experiencia, usa la navegación directa. Cada guía es autónoma. Busca la que necesitas, lee la primera capa para confirmar que es lo que buscas, y profundiza si hace falta.

---

## Las Cuatro Etapas

### Primera Etapa: Base Técnica

Entender los fundamentos sobre los que se construye todo lo demás: computación, sistemas operativos, redes, aplicaciones web. Sin esta base, cualquier concepto avanzado se sostiene sobre terreno frágil.

Incluye computación básica, sistemas operativos, identidad y permisos, base de seguridad, fundamentos de redes, modelo OSI y TCP/IP, DNS, DHCP y NAT, subnetting, switching y VLANs, Linux completo, Windows y Active Directory, y fundamentos web.

Al completarla, podrás explicar cómo funciona una computadora, diferenciar un SO de una aplicación, conocer los protocolos de red, navegar por Linux y entender identidad y permisos.

El error más frecuente aquí es apresurarse y saltar a hacking sin base sólida. Otro es estudiar los temas aislados sin conectarlos. El tercero es confundir familiaridad con comprensión.

### Segunda Etapa: Defensa y Análisis

Comprender cómo se detectan, analizan y responden las amenazas. Incluye fundamentos de blue team, logs y alertas, SIEM y MITRE, detection engineering, sigma yara, threat hunting, respuesta a incidentes, playbooks, OSINT y threat intelligence.

Al completarla, entenderás cómo funciona un SOC, la diferencia entre alerta e incidente, el marco MITRE ATT&CK, y los pasos de respuesta a incidentes.

El error principal aquí es confundir la herramienta con el proceso. Saber usar un SIEM no es saber hacer análisis. Otro es enfocarse solo en detección sin entender respuesta.

### Tercera Etapa: Seguridad Aplicada

Entender cómo se protegen aplicaciones, APIs, nube, datos e identidad. Incluye AppSec, DevSecOps, API security, cloud computing, IAM, contenedores, Kubernetes, IA, bases de datos, criptografía, PKI, TLS y privacidad.

Al completarla, podrás identificar riesgos en el ciclo de desarrollo, entender autenticación y autorización, conocer principios de seguridad en la nube y comprender cómo se protegen los datos con criptografía.

El error más común es tratar cada dominio como especialidad aislada. La seguridad de APIs no está separada de la nube. Otro error es enfocarse solo en tecnología ignorando procesos.

### Cuarta Etapa: Especialización y Portafolio

Conectar el conocimiento con el perfil profesional. Incluye GRC, riesgo y controles, continuidad de negocio, backups, forénsica, cadena de custodia, malware, ransomware, IoT, OT, hardware hacking, wireless, arquitectura, zero trust, y empleabilidad.

Al completarla, tendrás una visión integral de la seguridad en una organización real y los caminos profesionales para posicionarte.

El error principal es extender el aprendizaje sin construir evidencia tangible. Otro es ignorar GRC y arquitectura pensando que solo importa lo técnico.

---

## La Mentalidad de Seguridad

**Pensamiento basado en riesgo.** La pregunta no es "¿esto es seguro?", sino "¿cuál es el riesgo y cuáles son las consecuencias?". Ningún sistema es perfectamente seguro.

**Pensamiento adversarial.** Aprender a pensar como atacante para anticipar sus movimientos. MITRE ATT&CK es la herramienta principal para desarrollar esto.

**Pensamiento sistémico.** La seguridad no es una lista de controles, es un sistema donde todo interactúa. Un cambio en un componente afecta a los demás.

**Curiosidad técnica.** La ciberseguridad cambia constantemente. La única forma de mantenerse al día es la curiosidad genuina por entender cómo funcionan las cosas.

---

## Errores Comunes

**Leer sin pausar.** Después de leer una guía, cierrala y explica el concepto principal. Si no puedes, volve a leer.

**Saltar los fundamentos.** Sin base sólida, las guías avanzadas se sienten como ruido.

**No conectar los temas.** La criptografía no existe separada de las redes. El blue team no existe separado del red team.

**Confundir familiaridad con comprensión.** Reconocer un término al leerlo no es entenderlo.

**No autoevaluarse.** El criterio de dominio no es un adorno. Responder las preguntas con honestidad es como se aprende realmente.

---

## Criterio de Dominio General

Antes de considerar que entendiste un área, deberías poder:

- Explicar el concepto con tus palabras, sin leer la definición
- Dar un ejemplo del mundo real
- Identificar el riesgo de seguridad asociado
- Mencionar al menos un control o mitigación
- Reconocer el modo de fallo típico
- Relacionar el concepto con al menos dos otras guías
- Identificar en qué contexto corporativo es más relevante

---

## Marco Ético

**Autorización explícita.** Nunca realices pruebas en sistemas que no te pertenezcan o sin autorización escrita.

**Divulgación responsable.** Si encuentras una vulnerabilidad real, confírmala y repórtala al propietario, no la explotes ni la compartas públicamente hasta que esté reparada.

**Límites legales.** Las leyes de acceso informático y protección de datos son estrictas. Lo que haces en tu laboratorio es distinto a lo que haces en sistemas de terceros.

**Propósito educativo.** Esta web existe para educar. El conocimiento de cómo funcionan los ataques no es peligroso. Lo que determina la ética es el uso que se le da.

---

## Conecta con

**Glosarios:** [GLOSARIO.md](glosario/GLOSARIO.md), [GLOSARIO-CULTURA-HACKER.md](recursos/GLOSARIO-CULTURA-HACKER.md)

**Fundamentos:** [Computación-BASICA.md](fundamentos/COMPUTACION-BASICA.md), [SISTEMAS-OPERATIVOS.md](fundamentos/SISTEMAS-OPERATIVOS.md), [IDENTIDAD-PERMISOS.md](fundamentos/IDENTIDAD-PERMISOS.md), [BASE-DE-SEGURIDAD.md](fundamentos/BASE-DE-SEGURIDAD.md)

**Redes:** [FUNDAMENTOS-REDES.md](redes-cisco/FUNDAMENTOS-REDES.md), [MODELO-OSI-TCPIP.md](redes-cisco/MODELO-OSI-TCPIP.md), [DNS-DHCP-NAT.md](redes-cisco/DNS-DHCP-NAT.md), [IP-SUBNETTING.md](redes-cisco/IP-SUBNETTING.md), [SWITCHING-VLANS-ACLS.md](redes-cisco/SWITCHING-VLANS-ACLS.md)

**Linux y Windows:** [FUNDAMENTOS-LINUX.md](linux/FUNDAMENTOS-LINUX.md), [COMANDOS-BASICOS.md](linux/COMANDOS-BASICOS.md), [PERMISOS-USUARIOS.md](linux/PERMISOS-USUARIOS.md), [HARDENING-Básico.md](linux/HARDENING-BASICO.md), [PROCESOS-SERVICIOS-LOGS.md](linux/PROCESOS-SERVICIOS-LOGS.md), [FUNDAMENTOS-WINDOWS-AD.md](windows-ad/FUNDAMENTOS-WINDOWS-AD.md), [ACTIVE-DIRECTORY.md](windows-ad/ACTIVE-DIRECTORY.md), [WINDOWS-Básico.md](windows-ad/WINDOWS-BASICO.md), [POWERSHELL-EVENTOS.md](windows-ad/POWERSHELL-EVENTOS.md)

**Criptografía:** [FUNDAMENTOS-Criptografía.md](cripto/FUNDAMENTOS-CRIPTOGRAFIA.md), [HASHING-Y-PASSWORDS.md](cripto/HASHING-Y-PASSWORDS.md), [PKI-Y-TLS.md](cripto/PKI-Y-TLS.md)

**Web y Aplicaciones:** [FUNDAMENTOS-WEB.md](web-owasp/FUNDAMENTOS-WEB.md), [FUNDAMENTOS-APPSEC.md](appsec-devsecops/FUNDAMENTOS-APPSEC.md), [DEVSECOPS.md](appsec-devsecops/DEVSECOPS.md), [FUNDAMENTOS-API.md](api-security/FUNDAMENTOS-API.md), [RIESGOS-CONTROLES.md](api-security/RIESGOS-CONTROLES.md)

**Blue Team:** [FUNDAMENTOS-BLUE-TEAM.md](blue-team/FUNDAMENTOS-BLUE-TEAM.md), [LOGS-Y-ALERTAS.md](blue-team/LOGS-Y-ALERTAS.md), [SIEM-MITRE.md](blue-team/SIEM-MITRE.md), [DETECTION-ENGINEERING.md](blue-team/DETECTION-ENGINEERING.md), [SIGMA-YARA.md](blue-team/SIGMA-YARA.md), [THREAT-HUNTING.md](blue-team/THREAT-HUNTING.md), [RESPUESTA-INCIDENTES.md](blue-team/RESPUESTA-INCIDENTES.md)

**Red Team:** [METODOLOGIA-Ética.md](red-team/METODOLOGIA-ETICA.md), [RECONOCIMIENTO-ENUMERACION.md](red-team/RECONOCIMIENTO-ENUMERACION.md), [REPORTE-REMEDIACION.md](red-team/REPORTE-REMEDIACION.md)

**Nube y Contenedores:** [FUNDAMENTOS-CLOUD.md](cloud-security/FUNDAMENTOS-CLOUD.md), [AWS-AZURE-GCP.md](cloud-security/AWS-AZURE-GCP.md), [IAM-STORAGE-LOGGING.md](cloud-security/IAM-STORAGE-LOGGING.md), [IAM-AVANZADO.md](cloud-security/IAM-AVANZADO.md), [CONTENEDORES.md](containers-kubernetes/CONTENEDORES.md), [KUBERNETES-SEGURIDAD.md](containers-kubernetes/KUBERNETES-SEGURIDAD.md)

**Identidad y Acceso:** [IAM-CORPORATIVO.md](identity-access/IAM-CORPORATIVO.md), [PAM.md](identity-access/PAM.md)

**GRC, Riesgo y Continuidad:** [FUNDAMENTOS-GRC.md](grc/FUNDAMENTOS-GRC.md), [RIESGO-CONTROLES.md](grc/RIESGO-CONTROLES.md), [CONTINUIDAD-DRP.md](business-continuity/CONTINUIDAD-DRP.md), [BACKUPS.md](business-continuity/BACKUPS.md)

**Red y Endpoint:** [FIREWALLS-IDS-IPS.md](network-security/FIREWALLS-IDS-IPS.md), [VPN-PROXY-SEGMENTACION.md](network-security/VPN-PROXY-SEGMENTACION.md), [EDR-ANTIVIRUS-HARDENING.md](endpoint-security/EDR-ANTIVIRUS-HARDENING.md), [TELEMETRIA-ENDPOINT.md](endpoint-security/TELEMETRIA-ENDPOINT.md)

**OSINT, Threat Intelligence y Privacidad:** [FUNDAMENTOS-OSINT.md](osint-cti/FUNDAMENTOS-OSINT.md), [HERRAMIENTAS-Y-PRIVACIDAD.md](osint-cti/HERRAMIENTAS-Y-PRIVACIDAD.md), [THREAT-INTELLIGENCE.md](osint-cti/THREAT-INTELLIGENCE.md), [FUNDAMENTOS-PRIVACIDAD.md](privacy/FUNDAMENTOS-PRIVACIDAD.md)

**Malware y Forénsica:** [TIPOS-DE-MALWARE.md](malware-basico/TIPOS-DE-MALWARE.md), [RANSOMWARE.md](malware-basico/RANSOMWARE.md), [BOTNETS-Y-C2.md](malware-basico/BOTNETS-Y-C2.md), [CADENA-DE-CUSTODIA.md](forense/CADENA-DE-CUSTODIA.md), [FORENSE-DE-DISCO.md](forense/FORENSE-DE-DISCO.md), [FORENSE-DE-MEMORIA.md](forense/FORENSE-DE-MEMORIA.md)

**Móvil, IoT y Wireless:** [FUNDAMENTOS-MOBILE.md](mobile-security/FUNDAMENTOS-MOBILE.md), [OWASP-MOBILE-TOP-10.md](mobile-security/OWASP-MOBILE-TOP-10.md), [REVERSE-ENGINEERING.md](mobile-security/REVERSE-ENGINEERING.md), [FUNDAMENTOS-IOT.md](iot-ot-security/FUNDAMENTOS-IOT.md), [HARDWARE-HACKING.md](iot-ot-security/HARDWARE-HACKING.md), [SCADA-Y-OT.md](iot-ot-security/SCADA-Y-OT.md), [FUNDAMENTOS-WIFI.md](wireless-security/FUNDAMENTOS-WIFI.md)

**IA y Seguridad:** [FUNDAMENTOS-IA.md](ai-security/FUNDAMENTOS-IA.md), [OWASP-TOP-10-LLM.md](ai-security/OWASP-TOP-10-LLM.md), [IA-EN-DEFENSA.md](ai-security/IA-EN-DEFENSA.md)

**Ingeniería Social y Email:** [FUNDAMENTOS-PHISHING.md](social-engineering/FUNDAMENTOS-PHISHING.md), [PRETEXTING-OSINT.md](social-engineering/PRETEXTING-OSINT.md), [FUNDAMENTOS-EMAIL.md](email-security/FUNDAMENTOS-EMAIL.md), [GATEWAYS-Y-FILTROS.md](email-security/GATEWAYS-Y-FILTROS.md)

**Vulnerabilidades y Arquitectura:** [FUNDAMENTOS.md](vulnerability-management/FUNDAMENTOS.md), [PRIORIZACION-Y-CVSS.md](vulnerability-management/PRIORIZACION-Y-CVSS.md), [FUNDAMENTOS-ARQUITECTURA.md](security-architecture/FUNDAMENTOS-ARQUITECTURA.md), [ZERO-TRUST.md](security-architecture/ZERO-TRUST.md)

**Cultura y Comunidad:** [CULTURA-TECH-Y-CIBERSEGURIDAD.md](cultura-geek/CULTURA-TECH-Y-CIBERSEGURIDAD.md), [Ética-HACKER-Y-OPEN-SOURCE.md](cultura-geek/ETICA-HACKER-Y-OPEN-SOURCE.md), [TEAMS-Y-HATS.md](security-teams/TEAMS-Y-HATS.md)

**Programación:** [FUNDAMENTOS-PYTHON-SEGURIDAD.md](programacion/FUNDAMENTOS-PYTHON-SEGURIDAD.md), [PYTHON-Básico.md](programacion/PYTHON-BASICO.md), [LOGS-JSON-CSV-APIS.md](programacion/LOGS-JSON-CSV-APIS.md)

**Bases de Datos:** [FUNDAMENTOS-DB.md](database-security/FUNDAMENTOS-DB.md), [PERMISOS-AUDITORIA.md](database-security/PERMISOS-AUDITORIA.md)

**Playbooks:** [PHISHING.md](playbooks/PHISHING.md), [MALWARE-ENDPOINT.md](playbooks/MALWARE-ENDPOINT.md), [SERVIDOR-EXPUESTO.md](playbooks/SERVIDOR-EXPUESTO.md), [CUENTA-COMPROMETIDA.md](playbooks/CUENTA-COMPROMETIDA.md), [FUGA-DATOS.md](playbooks/FUGA-DATOS.md)

**Empleabilidad:** [RUTA-TRABAJO.md](empleabilidad/RUTA-TRABAJO.md), [CV-LINKEDIN.md](empleabilidad/CV-LINKEDIN.md), [ENTREVISTAS.md](empleabilidad/ENTREVISTAS.md), [MAPA-DE-SKILLS.md](empleabilidad/MAPA-DE-SKILLS.md), [RUTAS-POR-ROL.md](empleabilidad/RUTAS-POR-ROL.md), [PROYECTOS-PORTAFOLIO.md](empleabilidad/PROYECTOS-PORTAFOLIO.md), [CHECKLIST-APLICAR.md](empleabilidad/CHECKLIST-APLICAR.md), [EMPLEO-READY.md](empleabilidad/EMPLEO-READY.md)

**Recursos de Apoyo:** [COMO-USAR-ESTA-GUIA.md](recursos/COMO-USAR-ESTA-GUIA.md), [ROADMAP-90-Días.md](recursos/ROADMAP-90-DIAS.md), [PLATAFORMAS-DE-PRACTICA.md](recursos/PLATAFORMAS-DE-PRACTICA.md), [CURSOS-Y-CERTIFICACIONES.md](recursos/CURSOS-Y-CERTIFICACIONES.md)

## Detalle de las Áreas

### Fundamentos Técnicos

Esta área es la puerta de entrada. Cubre los conceptos básicos que subyacen a toda la ciberseguridad: cómo funcionan las computadoras, los sistemas operativos, la identidad digital y los principios fundamentales de seguridad.

Los archivos incluidos son Computación-BASICA.md (hardware, memoria, almacenamiento, procesamiento), SISTEMAS-OPERATIVOS.md (kernel, procesos, sistemas de archivos, llamadas al sistema), IDENTIDAD-PERMISOS.md (usuarios, grupos, permisos, autenticación, autorización) y BASE-DE-SEGURIDAD.md (triada CIA, gestión de riesgos, principios fundamentales).

No tiene prerequisitos. Es el punto de partida para cualquier lector. Se conecta con todas las demás áreas: los conceptos de permisos aparecen en Linux, Windows, bases de datos y cloud; la triada CIA aparece en GRC, criptografía y blue team.

### Redes

Cubre cómo se comunican los dispositivos en una red. Sin entender redes, no puedes entender cómo se intercepta el tráfico, cómo se configuran firewalls, cómo funciona la segmentación o cómo se producen los ataques de red.

Los archivos incluidos son FUNDAMENTOS-REDES.md (topologías, dispositivos, medios de transmision), MODELO-OSI-TCPIP.md (las siete capas y su implementación práctica), DNS-DHCP-NAT.md (protocolos de infraestructura), IP-SUBNETTING.md (direccionamiento y división de redes) y SWITCHING-VLANS-ACLS.md (segmentación a nivel de capa 2 y 3).

Esta área es fundamental para absolutamente todos los perfiles de ciberseguridad. Se conecta con network security, cloud security, wireless security y blue team.

### Linux y Windows

Cubre los sistemas operativos que encontrarás en la mayoría de los entornos corporativos. Linux domina en servidores y cloud; Windows domina en estaciones de trabajo con Active Directory.

Linux incluye FUNDAMENTOS-LINUX.md, COMANDOS-BASICOS.md, PERMISOS-USUARIOS.md, HARDENING-Básico.md y PROCESOS-SERVICIOS-LOGS.md. Windows incluye FUNDAMENTOS-WINDOWS-AD.md, ACTIVE-DIRECTORY.md, WINDOWS-Básico.md y POWERSHELL-EVENTOS.md.

Es fundamental para blue team (análisis de logs), red team (explotación de sistemas) y engineering (hardening). Se conecta con endpoint security, blue team, red team y hardening.

### Criptografía

Cubre los principios de la criptografía moderna: qué hace, por qué existe y cómo se usa en la práctica. No se enfoca en matemáticas, sino en comprensión conceptual.

Los archivos son FUNDAMENTOS-Criptografía.md (cifrado simétrico y asimétrico, historia), HASHING-Y-PASSWORDS.md (funciones hash, almacenamiento de contraseñas, ataques) y PKI-Y-TLS.md (infraestructura de clave pública, certificados, TLS).

Se conecta con web security (HTTPS), API security (autenticación), network security (VPNs) e identity access (SAML, OIDC).

### Web y Aplicaciones

Cubre la seguridad de aplicaciones web, APIs, el ciclo de desarrollo seguro y DevSecOps. La web es el vector de ataque más común.

Los archivos son FUNDAMENTOS-WEB.md (HTTP, sesiones, cookies), FUNDAMENTOS-APPSEC.md (OWASP Top 10, SDLC seguro), DEVSECOPS.md (seguridad en CI/CD), FUNDAMENTOS-API.md y RIESGOS-CONTROLES.md.

Es fundamental para AppSec, DevSecOps, pentesters web y desarrolladores. Se conecta con OWASP, cloud security, API security y mobile security.

### Blue Team

Cubre la defensa: detección, análisis y respuesta a incidentes. Es el corazón de la seguridad operativa.

Los archivos son FUNDAMENTOS-BLUE-TEAM.md (SOC, niveles de analista), LOGS-Y-ALERTAS.md, SIEM-MITRE.md, DETECTION-ENGINEERING.md, SIGMA-YARA.md, THREAT-HUNTING.md y RESPUESTA-INCIDENTES.md.

Es el destino principal para perfiles de SOC, incident response y threat hunting. Se conecta con network security, endpoint security, email security y todos los playbooks.

### Red Team

Cubre la evaluación ofensiva autorizada: pentesting, ethical hacking y adversary emulation.

Los archivos son METODOLOGIA-Ética.md (rules of engagement, alcance, legal), RECONOCIMIENTO-ENUMERACION.md (OSINT, escaneo, fingerprinting) y REPORTE-REMEDIACION.md (comunicación de hallazgos).

Se conecta con OWASP (vulnerabilidades web), API security, mobile security y Active Directory.

### Nube y Contenedores

Cubre la seguridad en entornos cloud y contenedores, cada vez más la norma en la industria.

Los archivos son FUNDAMENTOS-CLOUD.md, AWS-AZURE-GCP.md, IAM-STORAGE-LOGGING.md, IAM-AVANZADO.md, CONTENEDORES.md y KUBERNETES-SEGURIDAD.md.

Fundamental para ingenieros de cloud, DevSecOps y arquitectos. Se conecta con AppSec, API security e identity access.

### GRC, Riesgo y Continuidad

Cubre la gestión de la seguridad desde una perspectiva organizacional: gobierno, riesgo, cumplimiento y continuidad.

Los archivos son FUNDAMENTOS-GRC.md, RIESGO-CONTROLES.md, CONTINUIDAD-DRP.md y BACKUPS.md.

Destino principal para perfiles de GRC, auditoría y gestión de seguridad. Se conecta con vulnerability management, security architecture y privacidad.

### OSINT, Threat Intelligence y Privacidad

Cubre la recolección de información de fuentes abiertas, inteligencia de amenazas y protección de datos.

Los archivos son FUNDAMENTOS-OSINT.md, HERRAMIENTAS-Y-PRIVACIDAD.md, THREAT-INTELLIGENCE.md y FUNDAMENTOS-PRIVACIDAD.md.

Útil para todos los perfiles. Se conecta con red team (OSINT en reconocimiento), blue team (threat intelligence para alertas) y GRC (privacidad como requisito).

### Malware y Forénsica

Cubre el análisis de código malicioso y la investigación post-incidente.

Los archivos son TIPOS-DE-MALWARE.md, RANSOMWARE.md, BOTNETS-Y-C2.md, CADENA-DE-CUSTODIA.md, FORENSE-DE-DISCO.md y FORENSE-DE-MEMORIA.md.

Destino para perfiles de forénsica y malware analysis. Se conecta con blue team (la forénsica es parte de la respuesta a incidentes) y endpoint security.

### Cultura y Empleabilidad

Cubren el contexto humano: la cultura hacker, las comunidades profesionales y el desarrollo de carrera.

Cultura incluye CULTURA-TECH-Y-CIBERSEGURIDAD.md, Ética-HACKER-Y-OPEN-SOURCE.md y TEAMS-Y-HATS.md. Empleabilidad incluye RUTA-TRABAJO.md, CV-LINKEDIN.md, ENTREVISTAS.md, MAPA-DE-SKILLS.md, RUTAS-POR-ROL.md, PROYECTOS-PORTAFOLIO.md, CHECKLIST-APLICAR.md y EMPLEO-READY.md.

## Casos de Estudio Relevantes

Tres brechas que deberías conocer porque ilustran patrones que se repiten.

**Equifax 2017.** El atacante explotó una vulnerabilidad en Apache Struts (CVE-2017-5638) que permitía ejecución remota de código. La vulnerabilidad fue parcheada dos meses antes por Apache. Equifax no aplicó el parche a tiempo. Resultado: 147 millones de registros expuestos, 1.4 mil millones de dólares en costos. Lección: la gestión de parches no es opcional.

**Target 2013.** Los atacantes entraron a través de un proveedor de climatización (Fazio Mechanical) que tenía acceso a la red de Target. Una vez dentro, se movieron lateralmente hasta los sistemas de punto de venta e instalaron malware de captura de RAM. Target tenía un sistema de detección que alertó, pero nadie respondió. Resultado: 110 millones de registros. Lecciones: el riesgo de terceros es real y las alertas sin respuesta son inútiles.

**Capital One 2019.** Una ex-empleada de AWS exploto un WAF mal configurado con SSRF para obtener credenciales de una instancia EC2 con permisos elevados y acceder a buckets S3 con datos de solicitudes de tarjetas de crédito. Resultado: 106 millones de registros. Lección: la configuración de IAM en la nube debe seguir el principio de mínimo privilegio.

## Consejos para Usar Esta Web

Lee activamente. Después de cada guía, cerrala y explica el concepto principal con tus palabras. Si no puedes, volve a leer.

Toma notas de conexiones. Cuando leas sobre un concepto, pregúntate con qué otros conceptos se relaciona.

No leas todo de una vez. El cerebro necesita tiempo para asimilar. Lee una guía, procesala, hace otra cosa, volve al día siguiente.

Usa los glosarios como referencia. Cuando encuentres un término que no conozcas, búscalo en el glosario antes de seguir leyendo.

Autoevaluate con el criterio de dominio al final de cada guía. No lo saltes. Es la única forma de saber si realmente entendiste.

No te compares con otros. Cada persona aprende a su ritmo. Lo que importa es tu progreso, no la velocidad.
