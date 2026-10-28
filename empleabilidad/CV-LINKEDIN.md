---
title: "CV y LinkedIn: El Pitch de Ventas"
level: "inicial"
content_type: "guia"
updated: "2026-06-29"
---

# CV y LinkedIn: El Pitch de Ventas

## Objetivo de esta Guía

Y no, no entiende.

El filtro número 1 para conseguir tu primer empleo en Ciberseguridad no es el CISO (Director de Seguridad), es un agente de Recursos Humanos que tiene 6 segundos para leer tu Curriculum Vitae (CV) antes de tirarlo a la basura. Si escribes tu CV como si fuera un manual técnico de Linux, jamás llegarás a la entrevista.

Tu CV no es un documento técnico. **Tu CV es un Pitch de Ventas (Propuesta Comercial).**

pasa si escribes como si hablaras con otro ingeniero? El de RRHH no entiende nada y tu CV vuela al descarte. Aprende esta lección ya.

---

## 1. El Formato del CV (El M&M Inverso)

Tu CV debe ser exactamente lo opuesto: Suave y digerible por fuera (Para Recursos Humanos), y extremadamente técnico y duro por dentro (Para la entrevista técnica final).

**Por qué esto importa:** RRHH necesita entender rápido de qué va tu CV. El CISO después va a querer ver los detalles técnicos. Si le das la misma info a los dos, uno de los dos no te va a entender.

**Criterio de legibilidad:** Prioriza una estructura simple, texto seleccionable, encabezados convencionales y una sola columna cuando el CV deba pasar por un ATS. Los elementos gráficos pueden perder información durante el análisis automático, pero su comportamiento depende del sistema utilizado.

### Estructura recomendada del CV

**1. Encabezado**
- Nombre completo (tamaño 16-18).
- Título profesional: "Analista de Ciberseguridad Jr | Blue Team | SOC".
- Teléfono, correo electrónico profesional, LinkedIn, GitHub.
- Ubicación (ciudad, país). No incluyas dirección completa.

**2. Resumen Profesional (3-4 líneas máximo)**
```
Analista de ciberseguridad con formación en seguridad de redes, administración de sistemas Linux/Windows y configuración de SIEM. Experiencia práctica en detección de incidentes, hardening de servidores y despliegue de infraestructura en cloud. Enfoque en Blue Team y respuesta a incidentes con conocimientos de GRC y cumplimiento normativo.
```

**3. Habilidades Técnicas (lista de 2 columnas, sin íconos)**
- Redes: TCP/IP, DNS, DHCP, VPN, Firewall (iptables), Wireshark.
- Sistemas: Linux (Ubuntu, CentOS), Windows Server, Active Directory.
- Seguridad: SIEM (Wazuh, Splunk), EDR, IDS/IPS, Hardening (CIS Benchmarks).
- Cloud: AWS (EC2, S3, IAM, VPC), Azure fundamentals.
- Herramientas: Nmap, Metasploit, Burp Suite, Wazuh, TheHive.
- GRC: ISO 27001, NIST CSF, GDPR, PCI-DSS, evaluación de riesgos.
- Automatización: Bash, Python, PowerShell, Terraform.

**4. Experiencia (formato STAR en viñetas)**

Para cada experiencia (incluyendo proyectos de Home Lab y prácticas):
```
Nombre del proyecto/empresa | Tecnología principal | Fecha
- Verbo de acción + Herramienta/Tecnología + Impacto medible.
- Verbo de acción + Herramienta/Tecnología + Impacto medible.
- Verbo de acción + Herramienta/Tecnología + Impacto medible.
```

**Ejemplo para Home Lab:**
```
Proyecto Home Lab: SIEM y Detección de Amenazas | Wazuh, Linux, Windows | Ene 2025 - Presente
- Desplegué un SIEM open source (Wazuh) en un entorno virtualizado, ingiriendo logs de 3 endpoints para monitoreo centralizado.
- Configuré reglas de correlación personalizadas para detección de fuerza bruta SSH, reduciendo falsos positivos en un 40%.
- Implementé FIM (File Integrity Monitoring) detectando cambios no autorizados en archivos críticos del sistema.
- Documenté la arquitectura completa en GitHub con diagramas de red, capturas de pantalla y guías de replicación.
```

**5. Educación**
- Título, institución, año.
- Cursos relevantes (no los listes todos, solo los de seguridad).
- Promedio (solo si es alto y relevante).

**6. Certificaciones**
- Nombre de la certificación, organismo emisor, año.
- Si estás estudiando: "En progreso — fecha estimada".

**7. Idiomas**
- Español (nativo / C2).
- Inglés (técnico: lectura de documentación; conversacional: B1-B2; avanzado: C1-C2).

**8. Proyectos / Logros**
- Enlace a GitHub (1 línea).
- Participación en CTFs (si aplica).
- Charlas o publicaciones técnicas.

---

## 2. Cómo Escribir la Experiencia (El Método STAR)

Muchos candidatos describen únicamente tareas. Un CV resulta más informativo cuando explica alcance, decisiones y resultados verificables.

* **El CV del Novato (Malo):**
  * *"Sé usar Wireshark para analizar red".*
  * *"Configuré un Firewall en Linux".*
  * *"Hice pentesting a una página web".*

* **El Pitch de Ventas (El CV Profesional):**
  En ciberseguridad corporativa, tú no te vendes como un "hacker". Te vendes como un **Gestor de Riesgos**. Usa el formato Acción + Herramienta + Impacto en el Negocio.
  * *"Analicé el tráfico de red utilizando Wireshark (Acción + Herramienta), reduciendo el tiempo de detección de incidentes en un 20% (Impacto de Negocio)".*
  * *"Diseñé políticas de Firewall perimetral basadas en el modelo Zero Trust, mitigando el riesgo de infiltración externa y asegurando el cumplimiento con PCI-DSS (Impacto - GRC)".*
  * *"Identifiqué y reporté vulnerabilidades de Inyección SQL en aplicaciones web mediante pentesting manual, protegiendo los datos financieros de más de 500 usuarios simulados".*

¿Ves la diferencia? El reclutador no sabe qué es Wireshark, pero **sí sabe qué es "reducir el tiempo de detección" o "cumplir con PCI-DSS"**. Estás hablando el idioma del dinero.

**Verbos de acción recomendados para CV de seguridad:**

| Categoría | Verbos |
|---|---|
| Defensa | Implementé, Configuré, Desplegué, Monitoreé, Detecté, Contuve |
| Análisis | Analicé, Correlacioné, Diagnosticé, Evalué, Documenté |
| Prevención | Diseñé, Hardeneé, Asegué, Segmenté, Aislé |
| Cumplimiento | Auditó, Verifiqué, Reporté, Certifiqué, Alinéé |
| Automatización | Automatizé, Scripteé, Orquesté, Optimicé |

**Por qué esto importa:** A RRHH no le importa si sabes usar 50 herramientas. Le importa si sabes evitar que la empresa pierda plata. Es así de simple.

### Traducción de Experiencia No-Seguridad a Seguridad

Si vienes de otro rubro, traduce tus habilidades:

- **Soporte IT:** "Resolución de incidentes → Aplicación de playbooks de troubleshooting con documentación de tiempos de resolución (MTTR)."
- **Desarrollo:** "Revisión de código → Identificación de vulnerabilidades OWASP Top 10 en code reviews, aplicando SAST."
- **Administración de sistemas:** "Hardening de servidores → Aplicación de CIS Benchmarks, reducción de superficie de ataque."
- **Atención al cliente:** "Comunicación con usuarios → Explicación técnica a audiencias no técnicas, reportes ejecutivos."
- **Logística/Operaciones:** "Gestión de procesos → Documentación de procedimientos operativos, control de calidad."

---

## 3. Optimización de LinkedIn (El Megáfono Digital)

Sabes qué faltaba? LinkedIn. :

Tu CV es lo que entregas cuando pides trabajo. Tu LinkedIn es tu "Megáfono" para que el trabajo te encuentre a ti.

### El Perfil Completo (Checklist)

**Foto profesional:**
- Fondo neutro (blanco, gris claro, azul oscuro).
- Ropa formal o business casual.
- Sonrisa natural, mirada directa.
- Buena iluminación (luz frontal, no lateral ni superior).
- Sin filtros, sin selfies, sin fondo de playa.

**Banner / Portada:**
- Imagen profesional relacionada con tecnología (código, redes, abstracto técnico).
- Sin texto excesivo. Dimensiones: 1584 x 396 px.
- Herramientas: Canva (plantillas LinkedIn), Photoshop, o una captura de pantalla de un dashboard de seguridad con blur.

**Título (Headline):**
No pongas *"Estudiante de Ciberseguridad"*. Pon *"Analista de Ciberseguridad Jr | Blue Team | SIEM & Respuesta a Incidentes"*. Véndete por el puesto que quieres, no por el que tienes. Es como ponerle "Cajero" cuando quieres ser Gerente del Banco.

Ejemplos de headlines efectivos:
- "Analista SOC Jr | Monitoreo de Seguridad | SIEM (Wazuh, Splunk) | Linux & Redes".
- "Cybersecurity Analyst | Blue Team | Threat Detection | Incident Response".
- "Security Operations Associate | SIEM & EDR | Cloud Security (AWS)".

**Acerca de (About / Resumen):**
```
Soy profesional de ciberseguridad con enfoque en Blue Team y operaciones de seguridad. Mi experiencia incluye la configuración de SIEM para monitoreo en tiempo real, hardening de sistemas Linux/Windows y respuesta a incidentes de seguridad en entornos simulados y cloud.

Actualmente desarrollo proyectos prácticos de detección de amenazas, análisis forense básico y automatización de respuestas, documentando cada laboratorio en GitHub como evidencia de mi capacidad técnica.

Busco mi primera oportunidad profesional en un equipo SOC donde pueda aplicar mis conocimientos técnicos, seguir aprendiendo de profesionales experimentados y contribuir a la protección de activos digitales.

📌 GitHub: [url]
📧 Email: [email]
```

**Experiencia:**
- Mismo formato STAR que el CV. Incluye proyectos de Home Lab como experiencia.
- Usa fechas, descripciones con impacto, tecnologías mencionadas.
- Agrega medios (capturas, documentos) cuando sea relevante.

**Educación y Certificaciones:**
- Educación formal y cursos destacados.
- Certificaciones con fecha de obtención (o "En curso").

**Habilidades:**
- Pide recomendaciones de habilidades a contactos que conozcan tu trabajo.
- Prioriza: SIEM, Linux, Security, Incident Response, Networking, Cloud.
- Mantén máximo 10-15 habilidades con endorsements.

**Recomendaciones:**
- Solicita 2-3 recomendaciones breves de profesores, mentores o compañeros de estudio.
- No tienen que ser de jefes. Cualquier persona que pueda hablar de tu profesionalismo sirve.

### Publicar Valor (Open Source Intelligence)

Documenta tu aprendizaje. Cada vez que termines un laboratorio práctico (TryHackMe) o leas sobre una vulnerabilidad nueva, publica un pequeño resumen técnico en LinkedIn. Los reclutadores usan herramientas OSINT para buscar talento apasionado. Alguien que publica contenido técnico una vez a la semana destruye a 100 candidatos con maestría que nunca publican nada.

**Tipos de publicaciones en LinkedIn:**

**1. Walkthrough de laboratorio (1-2 veces por semana):**
```
Acabo de completar el laboratorio "Investigating Windows" en TryHackMe.

Aprendizajes clave:
- Análisis de eventos del sistema (ID 4624, 4625) para detectar accesos anómalos.
- Uso de registros de PowerShell para identificar ejecución de comandos maliciosos.
- Correlación de líneas de tiempo en el Event Viewer.

Mi approach: Empecé con los logs de autenticación, luego revisé procesos sospechosos y finalmente correlacioné con conexiones de red salientes.

#Cybersecurity #BlueTeam #TryHackMe #SOC
```

**2. Análisis de vulnerabilidad actual (1 vez por semana):**
```
La vulnerabilidad [CVE-ID] me llamó la atención esta semana. Es una vulnerabilidad crítica en [sistema] que permite ejecución remota de código.

Puntos clave:
- CVSS: 9.8 (Crítica).
- Vector: Red, baja complejidad, sin autenticación.
- Mitigación: Parche disponible en [versión].

¿Qué haría en un SOC?
1. Identificar activos con el software vulnerable.
2. Priorizar parche basado en criticidad del activo.
3. Monitorear intentos de explotación en SIEM con regla temporal.
4. Implementar WAF rule como mitigación temporal si no se puede parchear.

#InfoSec #VulnerabilityManagement #CVE
```

**3. Consejo / Lección aprendida (1 vez cada 2 semanas):**
```
Error que cometí configurando un SIEM: no normalizar los logs antes de crear reglas de correlación.

Estaba generando alertas de fuerza bruta basadas en texto plano, pero los logs llegaban en 3 formatos diferentes (JSON, syslog, CEF). Mis reglas no gatillaban correctamente para todos los formatos.

Solución: Estandarizar los logs a un formato común antes de la correlación. En Wazuh, esto se hace con decoders personalizados.

Lección: En seguridad, la calidad de los datos de entrada determina la calidad de la detección.

#BlueTeam #SIEM #Wazuh
```

**Estrategia de contenido:**
- Frecuencia: 2-3 publicaciones por semana.
- Horario: 8:00-10:00 AM o 6:00-8:00 PM (horario laboral/comunitario).
- Hashtags: #Cybersecurity #BlueTeam #SOC #InfoSec #SecurityOperations.
- Formato: Texto corto (100-300 palabras) + 1-2 imágenes/diagramas.
- Engagement: Responde a comentarios, comenta en publicaciones de otros.
- Networking: Sigue a reclutadores, CISO, líderes de seguridad. Comenta con valor añadido.

---

## 4. Errores Comunes en CV y LinkedIn

### CV
- **Fotos, colores, gráficos:** El ATS no los lee. Tu CV será descartado.
- **Errores ortográficos:** Una falta de ortografía en "ciberseguridad" es fatal.
- **Información irrelevante:** "Me gusta leer y viajar" no suma. Cada línea debe aportar.
- **Mentiras:** "Experto en..." cuando apenas conoces la herramienta. En la entrevista se descubre.
- **Referencias disponibles:** No pongas "Referencias disponibles". Todos lo asumen. Solo incluye si las piden.
- **Idiomas falsos:** "Inglés avanzado" cuando no puedes mantener una conversación. Te descubren en la primera entrevista en inglés.
- **Formato inconsistente:** Fuentes, tamaños y espaciados diferentes. Denota falta de atención al detalle.

### LinkedIn
- **Perfil incompleto:** Sin foto, sin banner, sin resumen, sin experiencia → perfil fantasma.
- **Título genérico:** "Estudiante" o "En búsqueda laboral".
- **Sin actividad:** Última publicación hace 2 años.
- **Solicitudes de conexión sin mensaje:** Envía siempre un mensaje personalizado.
- **Spam en grupos:** Publicar solo cuando buscas trabajo, sin aportar valor.
- **Quejarse públicamente:** De empresas, de reclutadores, del mercado. Quema puentes.
- **Perfil en solo un idioma:** Si buscas trabajo remoto internacional, LinkedIn en inglés al menos.

---

## 5. Plantilla de CV (Texto Plano para ATS)

```
[ NOMBRE COMPLETO ]
[ Título Profesional ]
[ Teléfono ] | [ Email ] | [ LinkedIn URL ] | [ GitHub URL ]
[ Ubicación ]

RESUMEN PROFESIONAL
[3-4 líneas como se indica arriba]

HABILIDADES TÉCNICAS
Seguridad: SIEM (Wazuh, Splunk), EDR, IDS/IPS, Hardening CIS, Firewall (iptables, pfSense)
Redes: TCP/IP, DNS, DHCP, VPN, VLAN, Wireshark, Nmap
Sistemas: Linux (Ubuntu, CentOS, Debian), Windows Server, Active Directory
Cloud: AWS (EC2, S3, IAM, VPC, CloudTrail), Azure Fundamentals
Automatización: Bash, Python, PowerShell, Terraform
GRC: ISO 27001, NIST CSF, GDPR, PCI-DSS, Evaluación de Riesgos
Herramientas: Wazuh, TheHive, Velociraptor, Splunk, Burp Suite, Metasploit

EXPERIENCIA

Home Lab: SIEM y Centro de Monitoreo | Wazuh, Linux, Windows | Ene 2025 - Presente
- Desplegué plataforma SIEM open source (Wazuh) en entorno virtualizado con 3 endpoints, centralizando logs de seguridad.
- Configuré reglas de correlación para detección de fuerza bruta SSH, reduciendo falsos positivos en 40% mediante ajuste de thresholds.
- Implementé monitoreo de integridad de archivos (FIM) detectando modificaciones no autorizadas en binarios críticos del sistema.
- Automatizé respuestas a incidentes mediante scripts de contención (aislamiento de host en firewall).

Proyecto AWS: Infraestructura Segura en la Nube | AWS, Terraform | Mar 2025 - May 2025
- Diseñé e implementé VPC con subredes públicas y privadas, aplicando principio de mínimo privilegio en Security Groups.
- Desplegué servidor web EC2 con balanceador de carga y certificado SSL, forzando HTTPS en todas las conexiones.
- Configuré CloudTrail y CloudWatch Logs para auditoría de accesos y acciones de API, cumpliendo con requerimientos de logging.

EDUCACION
[ Título ] | [ Institución ] | [ Año ]

CERTIFICACIONES
- CompTIA Security+ (en progreso)
- [Otra certificación] | [Fecha]

IDIOMAS
- Español: Nativo
- Inglés: Técnico / Conversacional / Avanzado

PROYECTOS
- GitHub: [URL] — Repositorio con documentación de proyectos de seguridad, laboratorios y scripts.
```

---

## 6. Criterio de Dominio (Autoevaluación)

Revisa si tu propuesta comercial está lista:

1. El Agente de Recursos Humanos está utilizando un sistema ATS (Applicant Tracking System) para filtrar 500 CVs. Explica técnicamente por qué un CV diseñado en Canva, con logotipos gráficos de Kali Linux y barras circulares de progreso, será descartado instantáneamente antes de que un humano lo lea.

2. Compara estas dos viñetas de experiencia laboral:
  * *Opción A:* "Corrí Nmap y encontré puertos abiertos".
  * *Opción B:* "Ejecuté escaneos de vulnerabilidades utilizando Nmap, identificando y cerrando 5 servicios críticos expuestos, lo que redujo la superficie de ataque del servidor".
  Usando el concepto del "Impacto en el Negocio", argumenta por qué el Director Financiero (CFO) aprobaría la contratación del candidato de la Opción B.

3. El concepto de "Zero Trust" dicta no confiar en nadie. ¿Por qué es fundamental asumir que el reclutador de Recursos Humanos (RRHH) tiene "Cero Conocimiento Técnico" y cómo esto debe cambiar la forma en la que redactas la sección de Resumen Profesional de tu CV?

4. Imagina que pasaste los filtros de RRHH gracias a tu "Pitch de Ventas". Ahora te entregarán el currículum al Director Técnico (CISO) para tu entrevista final. ¿Por qué el formato "M&M Inverso" garantiza que el CISO también quedará impresionado por tu perfil?

5. Un profesional tiene 7 años de experiencia en desarrollo de software y quiere pivotear a ciberseguridad. Traduce estas 3 habilidades de desarrollo a lenguaje de seguridad usando el formato Acción + Herramienta + Impacto: (a) "Revisé código en GitHub", (b) "Configuré pipelines de CI/CD en Jenkins", (c) "Administré bases de datos PostgreSQL". Reescribe cada una como viñeta de CV de ciberseguridad.

6. Un estudiante pública contenido técnico en LinkedIn 3 veces por semana durante 2 meses sin obtener ninguna oferta laboral directa de esas publicaciones. El estudiante considera que "publicar no funciona". Explica por qué esta conclusión es incorrecta, detallando los beneficios indirectos de la estrategia de contenido: (a) posicionamiento en búsquedas OSINT, (b) construcción de autoridad, (c) networking pasivo, (d) material de conversación en entrevistas. ¿Cuál es el horizonte temporal realista para ver resultados de esta estrategia?
