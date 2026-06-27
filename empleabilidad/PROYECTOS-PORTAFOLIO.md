---
title: "Proyectos y Portafolio: El Arquitecto vs El Albañil"
---

# Proyectos y Portafolio: El Arquitecto vs El Albañil

## Objetivo de esta Guía

Vamos a romper esa paradoja que te tiene loco: *"No me contratan porque no tengo experiencia, y no tengo experiencia porque no me contratan"*. Te suena, verdad?

En Recursos Humanos hay un secreto a voces: Un candidato que ha leído 100 libros sobre cómo funciona un SIEM (El Arquitecto Teórico) siempre perderá la entrevista técnica contra el candidato que instaló un SIEM gratuito en una computadora vieja en su casa y lo rompió intentando configurarlo (El Albañil Práctico).
**La experiencia no se obtiene solo en un trabajo pagado. La experiencia se construye en el laboratorio de tu casa.**

**Por que esto importa:** Un tipo con las manos sucias de tanto configurar servidores vale más que diez con certificados pero que nunca tocaron un sistema de verdad.

---

## 1. El Laboratorio Casero (Home Lab)

Un "Home Lab" es tu currículum vivo. Es la demostración física de que la Ciberseguridad no es solo un pasatiempo teórico para ti.

### ¿Qué necesitas?
con poco puedes hacer mucho.
* Una computadora personal con 16GB de RAM (32GB ideal si ejecutas múltiples VMs).
* VirtualBox o VMware Player (Gratis) o Proxmox (hipervisor tipo 1).
* Una cuenta en AWS, Azure o Google Cloud (Tienen capas gratuitas o "Free Tiers").
* Espacio en disco: 256GB-512GB SSD para VMs y almacenamiento de logs.

### Arquitectura recomendada del Home Lab
```
[Host principal (Linux/Windows)]
  ├── VMware/VirtualBox
  │   ├── VM1: Ubuntu Server (SIEM - Wazuh/Splunk)
  │   ├── VM2: Windows 10 (Endpoint monitoreado)
  │   ├── VM3: Kali Linux (Ataques controlados)
  │   ├── VM4: Metasploitable/OWASP WebGoat (Blanco)
  │   └── VM5: PfSense/OPNsense (Firewall virtual)
  └── AWS Free Tier
      ├── EC2 t2.micro (Servidor web con CloudWatch)
      ├── S3 bucket (Almacenamiento de logs)
      └── IAM roles (Práctica de gestión de identidades)
```

### Proyecto Nivel 1: El Radar del SOC (Blue Team)
este proyecto es el más piola para empezar.
* **La Tarea:** Instala una Máquina Virtual con Ubuntu Linux. Instala un software de SIEM de código abierto como **Wazuh** o **Splunk** (Versión gratuita).
* **La Acción:** Conecta la laptop de tu hermano menor al SIEM. Configura reglas para que te llegue una alerta a tu celular cada vez que tu hermano falle 5 veces seguidas la contraseña de Windows.
* **Ampliación:** Agrega un segundo endpoint (Linux) y configura reglas de detección de cambios en archivos críticos (FIM - File Integrity Monitoring). Crea un dashboard que muestre el estado de seguridad de todos los endpoints.
* **Desafío adicional:** Configura notificaciones por correo electrónico o Slack cuando se detecte un evento de severidad alta. Implementa un playbook básico de respuesta automatizada.
* **El Impacto en Entrevista:** Cuando el CISO te pregunte si tienes experiencia, le responderás: *"No he trabajado en una empresa, pero en mi casa administro un SIEM que ingiere logs en tiempo real y detecta ataques de fuerza bruta usando reglas personalizadas"*. Estás contratado. Te lo juro, funciona.

### Proyecto Nivel 2: La Nube Cifrada (Arquitectura)
* **La Tarea:** Crea una cuenta gratuita en AWS. Crea una Máquina Virtual (EC2) y expón una página web básica a Internet.
* **La Acción:** Configura un Firewall Perimetral (Security Group) para que solo tú puedas conectarte por SSH. Configura un Balanceador de Carga y un Certificado SSL para forzar HTTPS.
* **Ampliación:** Implementa WAF (AWS WAF) para bloquear SQL injection y XSS. Configura CloudTrail y CloudWatch Logs para auditoría. Crea un dashboard de seguridad en CloudWatch.
* **Desafío adicional:** Automatiza todo con Terraform (Infraestructura como Código). Documenta el despliegue con un diagrama de arquitectura. Rompe la configuración intencionalmente y documenta cómo lo diagnosticaste y solucionaste.
* **El Impacto en Entrevista:** Demuestras que sabes desplegar infraestructura segura en la Nube aplicando "Defensa en Profundidad". Es como mostrar que sabes construir una bóveda blindada, no solo que leíste sobre cómo se hace.

### Proyecto Nivel 3: Detección y Respuesta (EDR/SOAR)
* **La Tarea:** Instala un EDR Open Source como **Wazuh** (módulo de EDR) o **Velociraptor** en tu laboratorio.
* **La Acción:** Configura reglas de detección de ransomware (creación masiva de archivos con extensiones sospechosas, modificaciones en el registro de Windows). Implementa respuesta automatizada: al detectar el comportamiento, aislar el endpoint de la red automáticamente.
* **Ampliación:** Integra tu SIEM con un SOAR (Shuffle o Wazuh integrado). Crea un playbook que: reciba la alerta → consulte Threat Intelligence (VirusTotal) → aísle el host → cree un ticket en TheHive → notifique al equipo.
* **El Impacto en Entrevista:** Muestras que entiendes el ciclo completo de respuesta a incidentes, desde la detección hasta la remediación automatizada.

### Proyecto Nivel 4: Threat Hunting (Búsqueda Proactiva)
* **La Tarea:** Usa MITRE ATT&CK como marco de referencia. Selecciona una técnica (ej: T1059 - Command and Scripting Interpreter) y busca evidencias en tus logs.
* **La Acción:** Crea consultas personalizadas en tu SIEM para detectar la técnica. Documenta la hipótesis, la búsqueda, los hallazgos y las conclusiones.
* **Ampliación:** Crea un mapa de calor de MITRE ATT&CK mostrando qué técnicas puedes detectar y cuáles no (brechas de visibilidad).
* **El Impacto en Entrevista:** Demuestras que puedes pasar de reactivo (esperar alertas) a proactivo (buscar amenazas). Es una habilidad de nivel Senior.

### Proyecto Nivel 5: Cumplimiento y GRC
* **La Tarea:** Toma un marco normativo (ISO 27001 Anexo A o NIST 800-53) y crea una tabla de asignación de controles.
* **La Acción:** Para cada control, documenta: objetivo del control, cómo se implementa técnicamente, qué evidencia se necesita para demostrar cumplimiento.
* **Ampliación:** Realiza una autoevaluación de riesgos ficticia de tu propio Home Lab: identifica activos, amenazas, vulnerabilidades, calcula riesgo inherente y residual.
* **El Impacto en Entrevista:** Demuestras que entiendes el lado administrativo y de cumplimiento de la seguridad, diferenciándote de candidatos puramente técnicos.

---

## 2. Documentación Pública (GitHub)

Sabes qué pasa si haces todo el trabajo pero no lo subes a GitHub? No pasó nada. Hacer el laboratorio en tu casa no sirve de nada si el Reclutador no puede verlo.
* **El Repositorio:** Crea una cuenta de GitHub. Por cada proyecto que hagas en tu Home Lab, escribe un artículo en Markdown explicando el problema, los pasos que seguiste y capturas de pantalla del resultado. : documenta hasta los errores.
* **El Pitch:** Pon el enlace de tu GitHub hasta arriba en tu CV. Recursos Humanos probablemente no lo lea, pero cuando tu CV llegue al Director Técnico (CISO), él hará clic en el enlace, verá tus capturas de pantalla de Splunk y sabrá que eres material de élite.

**Estructura recomendada para cada repositorio de proyecto:**

```
proyecto-wazuh-siem/
├── README.md
│   ├── Título y descripción del proyecto
│   ├── Arquitectura (diagrama)
│   ├── Tecnologías utilizadas
│   ├── Pasos de implementación
│   ├── Capturas de pantalla (dashboard, alertas, logs)
│   ├── Desafíos encontrados y soluciones
│   └── Lecciones aprendidas
├── config/
│   ├── reglas de correlación XML/JSON
│   └── configuraciones de agentes
├── scripts/
│   ├── automatización (.sh, .ps1, .py)
│   └── consultas de ejemplo (SPL, KQL)
├── docs/
│   ├── diagrama de red (draw.io, Excalidraw)
│   └── guía de instalación
└── screenshots/
    └── dashboard-login.png
```

**Consejos para GitHub profesional:**
- README principal del perfil: configurar con `README.md` en el repositorio especial `username/username`.
- Pines: fijar los 3-6 proyectos más relevantes.
- Commits frecuentes: muestra actividad constante.
- Issues y proyectos: usar tablero para planificar laboratorios.
- GitHub Actions: automatizar escaneo de seguridad de tus propios repositorios (Trivy, Gitleaks).
- Contribuciones a proyectos open source de seguridad: Wazuh, TheHive, MISP, Velociraptor.
- Lenguaje profesional: descripciones en español o inglés técnico, sin slang, sin emojis excesivos.

**Qué documentar obligatoriamente en cada proyecto:**
- Objetivo del proyecto (¿qué problema resuelve?).
- Arquitectura (diagrama de red o infraestructura).
- Pasos de implementación (no solo "lo instalé", sino cómo lo configuraste).
- Errores y cómo los resolviste (esto es ORO para entrevistas).
- Resultados: alertas funcionando, dashboards, métricas.
- Cómo replicar el proyecto (para que otros lo hagan).

**Por que esto importa:** Es como tener un portafolio de fotos de tus proyectos de construcción. Si no lo muestras, nadie sabe que sabes construir.

---

## 3. Plataformas de Práctica Adicionales

Más allá del Home Lab propio, estas plataformas proveen escenarios estructurados:

| Plataforma | Enfoque | Costo |
|---|---|---|
| TryHackMe | Red Team y Blue Team | Freemium |
| Hack The Box | Red Team, CTF | Freemium |
| Blue Team Labs Online | Defensa, SOC, Forense | Freemium |
| LetsDefend | SOC simulado | Freemium |
| CyberDefenders | Forense y SOC | Freemium |
| PicoCTF | CTF educativo | Gratis |
| RangeForce | Defensa corporativa | Pago |
| Immersive Labs | Ciberseguridad aplicada | Pago |

**Estrategia de uso:**
- Completa un laboratorio → documenta en GitHub → publica en LinkedIn → menciona en entrevista.
- No acumules certificados de plataformas sin documentar. El valor está en lo que aprendes y cómo lo muestras.

---

## 4. Blog Técnico y Contenido

Escribir sobre lo que aprendes tiene multiplicadores de impacto:
- Refuerza tu propio entendimiento (enseñar es aprender dos veces).
- Crea una huella digital profesional que los reclutadores encuentran.
- Demuestra capacidad de comunicación técnica (habilidad crítica).

**Dónde publicar:**
- LinkedIn (artículos nativos o posts cortos).
- Medium / Dev.to (blogs técnicos).
- GitHub (como parte de los README de proyectos).
- Blog propio (GitHub Pages + Jekyll/Hugo).

**Qué publicar:**
- Walkthroughs de laboratorios (TryHackMe, HTB).
- Tutoriales de configuración de herramientas.
- Análisis de vulnerabilidades (CVE recientes).
- Comparativas técnicas (SIEM A vs SIEM B).
- Traducciones o resúmenes de documentos técnicos.

**Frecuencia recomendada:** 1 publicación por semana o al menos 2-3 por mes.

---

## 5. Errores Comunes en el Portafolio

1. **Repositorios vacíos:** Un README solo con "Mi proyecto de seguridad" es peor que no tener repositorio.
2. **Código sin documentar:** Scripts sin comentarios, sin README, sin contexto.
3. **Capturas de pantalla borrosas o mal iluminadas:** Muestran falta de cuidado.
4. **No incluir el paso a paso:** "Instalé Wazuh" no basta. ¿Qué versión? ¿Qué sistema operativo? ¿Qué problemas encontraste?
5. **Olvidar los errores:** Documentar los fracasos es más valioso que documentar solo los éxitos.
6. **No actualizar:** Un portafolio con 2 años de antigüedad sugiere abandonó.
7. **Proyectos irrelevantes:** Proyectos de otras áreas (desarrollo web, apps móviles) no demuestran habilidades de seguridad.
8. **Plagio:** Copiar proyectos de otros y presentarlos como propios se descubre en la primera pregunta técnica.

---

## 6. Criterio de Dominio (Autoevaluación)

Revisa si tu portafolio está listo para el mundo real:

1. El concepto de "Home Lab" (Laboratorio Casero) rompe la paradoja de la experiencia laboral. Utilizando la analogía del "Arquitecto Teórico vs el Albañil Práctico", explica por qué un Director Técnico valorará más a un candidato con un repositorio de GitHub lleno de capturas de pantalla de servidores configurados en su casa, que a un candidato con 3 certificaciones teóricas sin experiencia práctica.

2. Un estudiante decide hacer un proyecto instalando un software EDR en la computadora de su familia. Si el estudiante omite publicar este proceso en un "Repositorio de GitHub", ¿Por qué este esfuerzo será financieramente inútil al momento de buscar empleo?

3. En el Proyecto Nivel 1 (El Radar del SOC), el estudiante configura una alerta para intentos fallidos de contraseña. Explica cómo este proyecto casero demuestra entendimiento directo de la **Fase 15 (Gestión de Identidades - IAM)** y la detección de ataques de Fuerza Bruta.

4. Un reclutador técnico (CISO) entra a tu perfil de LinkedIn y ve una publicación donde relatas cómo intentaste configurar un Firewall en tu cuenta gratuita de AWS, pero cometiste un error y perdiste acceso a tu propio servidor durante 3 horas antes de poder arreglarlo. ¿Por qué documentar y publicar tus **fracasos técnicos** en un Home Lab te hace un candidato mucho más atractivo para las empresas que alguien que finge saberlo todo?

5. Diseña la estructura completa de un repositorio de GitHub para un proyecto de "Detección de Ransomware con Wazuh + TheHive + Shuffle" (SIEM + Case Management + SOAR). Incluye: directorios, archivos esperados, contenido del README principal, y qué capturas de pantalla incluirías. Explica cómo cada elemento del repositorio aporta evidencia de una habilidad específica demandada en el mercado laboral.

6. Un candidato tiene 20 proyectos en su GitHub, pero todos son walkthroughs de TryHackMe copiados textualmente de writeups existentes, sin ningún proyecto original ni documentación de errores. Compara este perfil contra otro con 3 proyectos originales bien documentados (un SIEM casero, un despliegue en AWS con Terraform, y un análisis de malware básico). ¿Cuál perfil demuestra más "potencial analítico" y por qué? Justifica tu respuesta usando criterios que un CISO evaluaría en una entrevista.
