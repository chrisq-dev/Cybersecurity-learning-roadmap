---
title: "Threat Intelligence: Conociendo al Enemigo"
level: "intermedio"
content_type: "guia"
updated: "2026-06-29"
---

# Threat Intelligence: Conociendo al Enemigo

Threat Intelligence es la disciplina de recopilacion y análisis de información sobre amenazas ciberneticas. Proporciona conocimiento sobre quien ataca, como lo hace, cuando y con que herramientas. No es adivinacion, sino análisis sistemático de datos para anticipar al atacante.

La ciberseguridad reactiva espera el ataque y responde. Threat Intelligence busca anticiparlo mediante el estudio de patrones, tácticas y comportamientos de los actores de amenazas.

## La Analogía: Inteligencia Militar

Un ejército no espera el ataque enemigo para reaccionar. Tiene inteligencia: satélites, agentes, interceptaciones. Sabe donde esta el enemigo, sus movimientos, su capacidad.

Cuando un ejército no tiene inteligencia? Lo invaden.

Threat Intelligence es la inteligencia militar de la ciberseguridad. Si no sabes quien te apunta, no puedes defenderte.

## El Ciclo de Inteligencia

### 1. Requisitos

Que necesitas saber? A que te expones? Que activos son críticos?

Una empresa fintech necesita saber que grupos apuntan al sector financiero. Un hospital necesita saber campañas de ransomware contra salud. Si no necesitas, cualquier inteligencia te sirve... y ninguna te sirve.

### 2. Recolección

Datos de fuentes abiertas (OSINT), feeds de IOC, foros de la dark web, informes de la industria, telemetría propia.

### 3. Procesamiento

Los datos brutos se filtran, estructuran, enriquecen. Una IP sospechosa se enriquece con geolocalizacion, ASN, reputación, historial. Un dato solo no sirve. Un dato con contexto, si.

### 4. Análisis

Convertir datos procesados en inteligencia accionable. "El grupo X esta atacando VPNs sin parchear en el sector Y. Tienes VPNs. Parchealas."

### 5. Difusion

Compartir con quien necesita saber: equipo SOC, CISO, administradores de sistemas. No le mandes un reporte de 50 páginas al que solo necesita una IP para bloquear.

### 6. Retroalimentacion

La inteligencia se evalua: fue útil? Se actuó? Se previno el ataque? Si no sirvió, para que sirve?

## Niveles de Inteligencia

### Estrategica

Alta dirección. Tendencias, grupos, geo-política. Informes trimestrales sobre el panorama de amenazas.

Ejemplo: "Ransomware-as-a-Service crecio 40% en 2024, con grupos rusoparlantes dominando el mercado."

Esto no le sirve al analista de SOC hoy, pero al CISO para planificar presupuesto, si.

### Táctica

Equipo de defensa. TTPs de grupos específicos. Como opera un grupo, que herramientas usa.

Ejemplo: "El grupo LockBit usa PsExec para despliegue masivo, desactiva Windows Defender con reglas de registro, y cifra con AES-256."

### Operacional

SOC y analysts. IOCs específicos: hashes, IPs, dominios, URLs. Detección inmediata.

Ejemplo: "IP C2 del grupo LockBit: 185.130.5.xxx. Hash de muestra: a3f5b8... Dominio: lockbit-xxxxxx.onion."

### Técnica

Forenses y malware analysts. Detalles de exploits, vulnerabilidades, código.

Ejemplo: "El ransomware LockBit 3.0 usa la API de Windows CryptEncrypt con AES-256 en modo CBC."

## Tipos de Fuentes

### OSINT

Feeds públicos: AlienVault OTX, MISP, VirusTotal, AbuseIPDB, URLhaus. Gratis, pero tienes que filtrar mucho ruido.

### Fuentes Comerciales

Recorded Future, Mandiant, CrowdStrike, Palo Alto Unit 42, Kaspersky, Intel471. Pago mensual, datos curados con análisis. La calidad se paga.

### Fuentes Gubernamentales

CISA (USA), INCIBE (España), NCSC (UK), CERTs nacionales. Suelen ser gratuitas y confiables.

### Fuentes Propias

Telemetría de EDR, logs de firewall, datos de SIEM, informes de incidentes previos. La mejor inteligencia a veces es la que ya tienes y no estas usando.

### Dark Web

Foros, mercados, canales Telegram. Monitoreo de discusiones sobre exploits, credenciales, vulnerabilidades.

## Frameworks de Inteligencia

### MITRE ATT&CK

Base de conocimiento de tácticas y técnicas del adversario. Organizado en 14 tácticas (Reconocimiento, Acceso Inicial, Ejecución, Persistencia, etc.).

Cada técnica tiene ID (T1566 para Phishing), descripción, ejemplos, detección, mitigación. Si no conoces MITRE, estas operando a ciegas.

### Kill Chain (Ciber Kill Chain)

7 pasos del ataque:
1. Reconocimiento.
2. Weaponizacion.
3. Delivery.
4. Explotación.
5. Instalacion.
6. C2.
7. Acción sobre objetivos.

**Por qué esto importa:** Si sabes en que paso esta el atacante, hacer.

### Diamond Model

4 vertices: Adversario, Capacidad, Infraestructura, Víctima. Relaciones entre ellos. Conectar los puntos te da la imagen completa.

## Indicadores de Compromiso (IOC)

### Tipos de IOC

- Hash (MD5, SHA-1, SHA-256): Archivos maliciosos.
- IP: Servidores C2, fuentes de ataque.
- Dominio: C2, phishing.
- URL: Página de phishing.
- Cadena: Nombre de proceso, ruta, registro.
- Comportamiento: Patrón de red, secuencia de eventos.

### Ciclo de Vida de un IOC

Nace cuando se detecta. Tiene vida útil limitada (el atacante cambia IPs). Muere cuando deja de ser relevante. Un IOC de hace 6 meses probablemente ya no sirve.

### False Positives

Un IOC puede ser falso positivo (IP legítima reportada como C2). Siempre verificar. No bloquees una IP solo porque aparece en un feed.

## TTPs (Tácticas, Técnicas, Procedimientos)

Los IOCs cambian constantemente. Los TTPs son más estables.

Ejemplo: El grupo usa spear phishing con adjunto malicioso en PDF (técnica T1566). El IOC (hash del PDF) cambia cada campana, pero la técnica persiste. Si solo miras IOCs, perdes el bosque por el árbol.

## Inteligencia Accionable

La inteligencia que no genera acción no sirve.

IOC accionable: "Bloquear IP 185.130.5.xxx en firewall." (Acción inmediata.)

TTP accionable: "Implementar AMSI para detectar PowerShell malicioso." (Acción de configuración.)

Inteligencia estrategica accionable: "Asignar presupuesto para segmentación de red." (Acción de inversión.)

## Compartir Inteligencia

### MISP (Malware Information Sharing Platform)

Plataforma open source para compartir IOCs entre organizaciones. Comunidades sectoriales comparten inteligencia en tiempo real.

### ISACs (Information Sharing and Analysis Centers)

Centros sectoriales: FS-ISAC (financiero), H-ISAC (salud), R-ISAC (retail).

### TAXII/STIX

Protocolo estandarizado para compartir inteligencia. STIX es el formato. TAXII es el transporte.

## Formas de Falla

Sobrecarga de IOCs: Miles de IOCs sin priorizar. El equipo no puede procesarlos. Pasa todo el tiempo.

IOCs desactualizados: Usar IOCs de hace 6 meses. El atacante ya cambio todo.

No integrar con herramientas: La inteligencia en un PDF no sirve. Debe estar en SIEM, firewall, EDR.

Falta de contexto: "IP X es mala" sin explicar por qué, para que, de que grupo. La gente no confía en lo que no entiende.

Inteligencia sin acción: Reportes que nadie lee.

No compartir: Cada organización ve solo su ángulo. Compartir beneficia a todos. El ataque que le paso a otro, te puede pasar a ti.

## El Ángulo del Hacker

### El Atacante También Hace Inteligencia

El atacante investiga a la víctima: tecnologías, empleados, horarios, procesos. OSINT del objetivo. Mientras tu lo investigas a el, el te investiga a ti.

### Evasion de Inteligencia

El atacante:
- Cambia IOCs constantemente (DGA, fast-flux).
- Usa infraestructura efimera.
- Mezcla tráfico malicioso con legítimo.
- Estudia las defensas de la víctima antes de atacar.

### Contrainteligencia

El atacante puede plantar IOCs falsos para desviar la atención. O puede monitorear foros de inteligencia para saber si su infraestructura esta siendo reportada. A veces lo que encuentras es basura que plantaron para confundirte.

## Integración de Inteligencia en SIEM

La inteligencia debe integrarse en el SIEM para generar alertas automáticas.

### STIX/TAXII

STIX (Structured Threat Information Expression): Formato estándar para representar inteligencia de amenazas.

TAXII (Trusted Automated Exchange of Intelligence Reasoning): Protocolo para intercambiar STIX.

### Feeds en SIEM

AlienVault OTX, MISP, feeds comerciales. Correlacion de logs con IOCs.

### Automatización de Respuesta

Al detectar IOC, el SIEM puede: bloquear IP en firewall, aislar endpoint en EDR, crear ticket en SOAR, notificar al analysta.

## Evaluación de Fuentes de Inteligencia

No toda inteligencia es confiable.

### Criterios

- Reputación de la fuente.
- Antigüedad del IOC.
- Número de falsos positivos historicos.
- Corroboración con otras fuentes.
- Contexto del IOC.

### Fuentes de Baja Confianza

Feeds abiertos sin moderacion. IOCs de usuarios anonimos. Datos sin contexto.

### Fuentes de Alta Confianza

CERTs nacionales, equipos de respuesta, vendors de seguridad reputados, ISACs sectoriales.

## Inteligencia para Diferentes Roles

### CISO

Informes ejecutivos: tendencias, riesgos, presupuesto, compliance.

### SOC Manager

Alertas priorizadas: que mirar hoy, que grupos activos.

### Analysta SOC

IOCs accionables: bloquear, investigar, escalar.

### Administrador de Sistemas

Vulnerabilidades a parchear, configuraciones a ajustar.

## Maturity Model de Inteligencia

Nivel 1: Reactivo. Sin inteligencia. Responde a incidentes sin contexto.

Nivel 2: Básico. Usa feeds abiertos de IOCs. Bloquea IPs conocidas.

Nivel 3: Operacional. Tiene equipo de inteligencia. Produce informes. Integra SIEM.

Nivel 4: Proactivo. Correlaciona inteligencia con telemetría propia. Anticipa ataques.

Nivel 5: Adaptativo. Inteligencia en tiempo real. Respuesta automática. Comparte activamente.

La mayoría de las empresas están en nivel 1 o 2. Si llegas a nivel 3, ya estas mejor que el 80%.

## Caso Práctico: Inteligencia contra Ransomware

### Escenario

Feed de inteligencia reporta: Grupo LockBit activo contra sector manufactura, usando CVE-2023-xxx en VPNs.

### Acciones

1. Identificar VPNs en la red.
2. Verificar si están parcheadas.
3. Si no, parchear o aislar.
4. Buscar IOCs en logs (conexiones a C2 de LockBit).
5. Revisar telemetría EDR por comportamiento de LockBit.
6. Reportar al CISO el riesgo mitigado.

## El Futuro de la Inteligencia

### IA en Inteligencia

Análisis automático de foros. Clasificación de amenazas. Predicción de próximos objetivos.

### Automatización Total

Detección -> Inteligencia -> Respuesta, sin intervención humana.

### Comparticion en Tiempo Real

Plataformas donde la detección de un ataque en una organización alerta inmediatamente a todas las demás.

## Casos Prácticos de Inteligencia

### Detección de Campana de Phishing

Feed de inteligencia reporta dominio `micr0soft-verify.com`. Buscar en logs: algún empleado se conecto? Bloquear dominio en proxy y DNS.

### Anticipación de Ransomware

Inteligencia reporta que grupo LockBit ataca sector logística. Revisar controles: backups, MFA, segmentación. Buscar IOCs en SIEM.

### Respuesta a CVE Crítico

CVE-2024-xxx con CVSS 9.8 y explotación activa. Identificar sistemas vulnerables. Aplicar parche o mitigación temporal.

## El Rol del Analysta de Inteligencia

Habilidades: investigación, pensamiento crítico, comunicación. Capacidad de resumir información técnica para audiencias no técnicas. No solo recolectar datos: convertirlos en acción.

## Triangulo de Inteligencia

Personas (quien ataca), Capacidades (como ataca), Oportunidades (que vulnerabilidades). El análisis conjunto de los tres vertices produce inteligencia accionable.

## Comparticion de Inteligencia

Plataformas: MISP, ISACs, TAXII. Beneficio: entre todos se detectan patrones que uno solo no ve. Riesgo: compartir información sensible. Balance con confidencialidad.

## Inteligencia para PYMEs

Las empresas pequeñas no tienen equipo de inteligencia. Soluciones: feeds gratuitos (AlienVault OTX), ISACs sectoriales, servicios MSSP.

## Indicadores de Ataque (IOA) vs IOC

IOA: Comportamiento, no firma. Ejemplo: "Un proceso PowerShell hace conexión de red" vs "Hash X es malicioso". Los IOA detectan ataques nuevos que no tienen IOC conocido.

## Inteligencia de Vulnerabilidades

CVE, CVSS, EPSS, exploit availability, vendor patch status, threat actor interest.

## Madurez de Inteligencia

Nivel 1: Sin inteligencia. Nivel 2: Feeds de IOCs. Nivel 3: Análisis de TTPs. Nivel 4: Inteligencia predictiva. Nivel 5: Inteligencia automática y compartida.

## Obstaculos Comunes

Falta de presupuesto. Falta de personal capacitado. Sobrecarga de datos. Dificultad de compartir por confidencialidad.

## La Inteligencia como Proceso

No es un producto, es un proceso continuo. Ciclo: requisitos -> recolección -> procesamiento -> análisis -> difusion -> retroalimentacion.

## Caso de Uso: M&A Due Diligence

Evaluar riesgos de ciberseguridad de empresa a adquirir. Inteligencia sobre breach previos, vulnerabilidades, reputación.

## Perfil del Analysta de Inteligencia

Curiosidad, pensamiento crítico, capacidad de sintesis. Comunicación clara. Conocimiento de TTPs, frameworks, fuentes.

## Herramientas del Analysta

MISP para gestión de IOCs. SIEM para correlacion. OSINT para recolección. Python para automatización.

## Fuentes de Inteligencia Gratuitas

AlienVault OTX, URLhaus, AbuseIPDB, MISP Public, CISA Alerts, Feodo Tracker.

## Evaluación de Alertas

Cada alerta requiere: verificar IOC, buscar contexto, determinar impacto, priorizar respuesta, documentar resultado.

## Automatización de Inteligencia

SOAR (Security Orchestration Automation and Response) automatiza la respuesta a IOCs conocidos. Playbooks: al detectar IOC, bloquear IP, aislar host, notificar al analysta.

## Inteligencia para la Alta Dirección

Reportes ejecutivos: riesgo general, tendencias, impacto en negocio. Lenguaje no técnico. Métricas: ataques bloqueados, tiempo de detección, IOC procesados.

## Autoevaluación

1. Diferencia entre IOC y TTP. Por qué los TTPs son más valiosos a largo plazo?

2. El SOC recibe 10,000 IOCs de un feed. Que haces para priorizar?

3. Un informe de inteligencia dice: "Grupo X ataca sector financiero con phishing." Que acciones tomas como CISO?

4. Que es MISP? Por qué compartir inteligencia beneficia a todos?

5. La kill chain tiene 7 pasos. En que paso(s) actúa TEHas?

6. Que es un falso positivo en inteligencia de amenazas? Como lo manejas?

7. Un IOC tiene 3 meses de antigüedad. Lo usas? Por qué?

8. Explica el Diamond Model con un ejemplo real.

9. Por qué la inteligencia estrategica no sirve al analista de SOC en tiempo real?

10. Tu organización detecto un ataque. Que IOCs compartirias y cuáles no?
