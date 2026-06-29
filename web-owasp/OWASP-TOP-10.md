---
title: "OWASP Top 10: El Catálogo Universal de Vulnerabilidades"
level: "inicial"
content_type: "guia"
updated: "2026-06-29"
reviewed: "2026-06-28"
reviewed_against: "OWASP Top 10:2025 y PCI DSS v4.0.1"
official_sources:
  - title: "OWASP Top 10:2025"
    url: "https://owasp.org/Top10/2025/"
  - title: "PCI SSC — Biblioteca de documentos PCI DSS v4.0.1"
    url: "https://www.pcisecuritystandards.org/document_library/"
  - title: "ICO Annual Report 2020-21 — British Airways y Marriott"
    url: "https://ico.org.uk/media2/migrated/2620166/hc-354-information-commissioners-ara-2020-21.pdf"
  - title: "MDN Web Security"
    url: "https://developer.mozilla.org/en-US/docs/Web/Security"
---

# OWASP Top 10: El Catálogo Universal de Vulnerabilidades

## Objetivo de esta Guía

Entender qué representa OWASP Top 10:2025, cómo usar su vocabulario y cuáles son sus límites. Es un documento de concienciación sobre riesgos de aplicaciones web, no una metodología completa ni una prioridad universal.

Las aplicaciones pueden fallar de muchas maneras. OWASP Top 10 agrupa riesgos frecuentes y relevantes en diez categorías para facilitar comunicación, formación y mejora de prácticas de desarrollo.

Esta guía no pretende ser un sustituto del documento oficial de OWASP (que deberías leer si trabajas en seguridad). Es una introducción pragmatica desde la experiencia de alguien que ha visto como las empresas ignoran estas advertencias y pagan las consecuencias.

## Que es OWASP?

OWASP (Open Worldwide Application Security Project) es una fundación sin fines de lucro. Imagínalos como la Organización Mundial de la Salud (OMS), pero para el internet.

OWASP mantiene proyectos abiertos para mejorar la seguridad del software. El Top 10 combina datos aportados por organizaciones con una encuesta a la comunidad y documenta su metodología.

OWASP es una organización sin fines de lucro y sus materiales son abiertos. Sus documentos deben evaluarse por su metodología, alcance y versión, igual que cualquier otra fuente técnica.

El documento más famoso que publican es el **OWASP Top 10**, pero también producen:

- **OWASP ASVS (Application Security Verification Standard):** Un estándar detallado para verificar la seguridad de aplicaciones. Usado por auditors y consultores.
- **OWASP Testing Guide:** Una guía completa de como hacer pentesting web.
- **OWASP Cheat Sheets:** Guías rápidas de referencia para temas específicos (SQL Injection, XSS, etc.).
- **OWASP ZAP:** Una herramienta de seguridad de código abierto para encontrar vulnerabilidades en aplicaciones web.
- **OWASP Juice Shop:** Una aplicación intencionalmente vulnerable para practicar hacking ético.

### Uso profesional del OWASP Top 10

Auditores, desarrolladores y equipos de seguridad utilizan la clasificación para comunicar patrones de riesgo. Un hallazgo puede mapearse a OWASP, CWE y otros marcos cuando esa relación aporta contexto, pero el mapeo no sustituye evidencia, impacto ni remediación.

Cuando una empresa contrata un pentest, el reporte final típicamente incluye una tabla como esta:

| Vulnerabilidad | Categoría OWASP | Severidad |
|---|---|---|
| IDOR en endpoint de facturas | A01: Broken Access Control | Alta |
| SQLi en búsqueda de productos | A05: Injection | Crítica |
| XSS almacenado en comentarios | A05: Injection | Media |

El mapeo ayuda a relacionar el hallazgo con un lenguaje conocido. Un reporte profesional también debe incluir evidencia reproducible, alcance, impacto, severidad y una recomendación concreta.

## Relación con cumplimiento y regulación

OWASP Top 10 no es una ley ni una certificación. Puede utilizarse como referencia técnica dentro de programas de desarrollo seguro, evaluaciones y requisitos contractuales.

**PCI DSS v4.0.1:** establece requisitos para proteger datos de pago y desarrollar software a medida de forma segura. OWASP puede ayudar a organizar formación y pruebas, pero el cumplimiento debe evaluarse contra el texto vigente de PCI DSS, no contra esta lista por sí sola.

**ISO/IEC 27001:2022:** define requisitos para un sistema de gestión de seguridad de la información. Los controles técnicos de aplicaciones se seleccionan según riesgos y contexto; OWASP es una posible fuente de apoyo, no un requisito equivalente a la certificación.

**GDPR y leyes de privacidad:** exigen medidas técnicas y organizativas apropiadas según el riesgo. Una categoría OWASP puede describir la debilidad técnica, pero la responsabilidad legal depende de hechos, jurisdicción, datos afectados y obligaciones aplicables.

La conclusión operativa es simple: mapear una vulnerabilidad a OWASP ayuda a comunicarla, pero no demuestra por sí mismo cumplimiento ni incumplimiento.

### El Costo Real de No Cumplir

Caso real: British Airways fue multada con 20 millones de libras (reducida de 183 millones por COVID) por una breach en 2018 donde un atacante inyecto código JavaScript en el sitio de pagos (un XSS que OWASP clasifica). Los datos de 500,000 clientes fueron robados. La vulnerabilidad era conocida y evitable.

Caso real: Marriott fue multada con 18.4 millones de libras (reducida de 99 millones) por una breach que expuso datos de 339 millones de huespedes. La vulnerabilidad inicial fue un acceso no autorizado a través de herramientas mal configuradas (A01: Broken Access Control).

## Por qué la Lista Cambia

OWASP publica ediciones periódicas porque cambian la evidencia disponible, las prácticas de desarrollo y la forma de agrupar los riesgos. La edición vigente en 2026 es **OWASP Top 10:2025**, la octava edición del proyecto.

La lista de 2025 combina datos de vulnerabilidades con una encuesta a profesionales. No es una medición exacta de la probabilidad de ataque de una aplicación concreta ni sustituye un análisis de riesgo.

Cambios relevantes frente a 2021:

- **A01 Broken Access Control** permanece en el primer lugar e incorpora SSRF dentro de su alcance.
- **A02 Security Misconfiguration** asciende al segundo lugar.
- **A03 Software Supply Chain Failures** amplía la categoría anterior de componentes vulnerables y desactualizados.
- **A05 Injection** sigue siendo crítica, pero cambia de posición.
- **A07 Authentication Failures** adopta un nombre más directo.
- **A09 Security Logging and Alerting Failures** enfatiza que registrar sin alertar no produce una respuesta útil.
- **A10 Mishandling of Exceptional Conditions** es una categoría nueva sobre errores, estados anómalos y comportamientos que fallan de manera insegura.

Los riesgos específicos de aplicaciones con modelos de lenguaje se mantienen en el **OWASP GenAI Security Project**, que es un proyecto separado.

## Las 10 Categorías en Detalle

Estas son las categorías oficiales de OWASP Top 10:2025. El orden expresa la clasificación del proyecto, no una prioridad automática para todas las organizaciones.

### A01: Broken Access Control

Una aplicación falla al aplicar permisos de manera consistente. Incluye IDOR, elevación de privilegios, acceso a funciones administrativas y SSRF. Los controles centrales son autorización del lado del servidor, denegación por defecto, mínimo privilegio y pruebas sistemáticas de acceso.

### A02: Security Misconfiguration

Configuraciones inseguras, servicios innecesarios, credenciales predeterminadas, permisos excesivos o mensajes de error detallados amplían la superficie de ataque. La configuración debe estar versionada, endurecida, revisada y ser consistente entre entornos.

### A03: Software Supply Chain Failures

Cubre fallos en dependencias, repositorios, procesos de construcción, CI/CD y distribución. No se limita a bibliotecas con CVE. Requiere inventario de componentes, procedencia verificable, versiones fijadas, revisión de cambios y protección del pipeline.

### A04: Cryptographic Failures

La información sensible queda expuesta por algoritmos inadecuados, gestión deficiente de claves, cifrado ausente o validación incorrecta de certificados. Se deben usar protocolos actuales, bibliotecas mantenidas y una política explícita de claves y secretos.

### A05: Injection

Datos no confiables alteran una consulta, comando o intérprete. Incluye SQL, NoSQL, comandos del sistema, LDAP y XSS. Las defensas principales son APIs parametrizadas, separación entre datos y comandos, validación contextual y codificación de salida.

### A06: Insecure Design

El sistema tiene controles insuficientes desde el diseño, aunque la implementación no contenga un error puntual. El modelado de amenazas, los casos de abuso, los límites de confianza y los requisitos verificables ayudan a prevenirlo.

### A07: Authentication Failures

La autenticación o la gestión de sesión permite suplantación, reutilización de credenciales o secuestro de sesiones. Se recomienda MFA resistente al phishing cuando sea viable, controles de abuso, sesiones seguras y recuperación de cuenta robusta.

### A08: Software or Data Integrity Failures

El sistema confía en código, actualizaciones o datos sin verificar su integridad. Incluye deserialización insegura y actualizaciones no firmadas. Se requieren firmas, validación de procedencia y controles que preserven los límites de confianza.

### A09: Security Logging and Alerting Failures

Eventos relevantes no se registran, no se protegen o no generan alertas accionables. Los registros deben contener contexto suficiente, integrarse con detecciones y tener responsables y procedimientos de respuesta.

### A10: Mishandling of Exceptional Conditions

Errores, recursos agotados, resultados inesperados o estados incompletos provocan comportamientos inseguros. La aplicación debe fallar de forma cerrada, manejar excepciones de manera centralizada, limitar recursos y probar condiciones anómalas.

## Como Leer el OWASP Top 10 como Profesional

El OWASP Top 10 no es una checklist de seguridad ni un reemplazo de un análisis de riesgos. Es una guía de concientización (awareness). Un profesional de seguridad lo usa así:

1. **Priorización:** Si tu empresa no tiene recursos para arreglar todo, empieza por A01 (Broken Access Control) porque es el más común.

2. **Comunicación:** Usa el lenguaje OWASP para hablar con desarrolladores y gerentes. "Esto es un A01: Broken Access Control" es más claro que "hay un IDOR".

3. **Entrenamiento:** Usa el Top 10 como currículum básico para capacitar a desarrolladores en seguridad.

4. **Métricas:** Mide cuántos hallazgos de cada categoría encuentra tu equipo en cada release. Si ves que A05 (Injection) sube, el entrenamiento en SQLi no esta funcionando.

OWASP Top 10 es una guía de concienciación. Los riesgos fuera de sus categorías deben identificarse mediante modelado de amenazas, requisitos de negocio y estándares más detallados como ASVS.

Las limitaciones del OWASP Top 10 son importantes: no cubre seguridad en infraestructura, no cubre seguridad en redes, no cubre seguridad física, y no reemplaza un análisis de amenazas específico para tu aplicación.

## El OWASP Top 10 para APIs

OWASP también pública un "OWASP API Security Top 10" que es diferente del Top 10 web. Las vulnerabilidades de API son distintas porque la superficie de ataque es diferente.

**Las principales diferencias:**
- Las APIs no tienen interfaz gráfica, por lo que ataques como clickjacking no aplican.
- Las APIs exponen endpoints directamente, lo que hace que la enumeración sea más fácil.
- Las APIs frecuentemente no tienen protección contra rate limiting.
- La autenticación en APIs usa tokens (JWT, OAuth) que tienen sus propias vulnerabilidades.

**Aprende más en:** La guía completa en `api-security/RIESGOS-CONTROLES.md`.

## Modos de Falla con OWASP

**Tratar el Top 10 como una checklist:** "Revisamos A01 a A10, estamos seguros." Esto es peligroso porque el Top 10 es un documento de concienciación y no cubre todos los riesgos posibles.

**Ignorar el contexto de la aplicación:** No todas las categorías aplican a todas las aplicaciones. Una API interna sin interfaz de usuario no debería priorizar XSS sobre BOLA.

**Actualizar dependencias sin verificar:** No basta con tener la última versión de una librería. Debes verificar el changelog de seguridad y probar que la actualización no introduce problemas.

**Confundir OWASP con un estándar de compliance:** Pasar un pentest basado en OWASP no significa que tu aplicación sea segura. Solo significa que no se encontraron los problemas más comunes en ese momento.

## Autoevaluación

1. Entras a trabajar como auditor y encuentras una vulnerabilidad de Inyección SQL en el servidor de pagos del cliente. En tu reporte final, por qué es vital que vincules tu hallazgo explícitamente a la categoría "A05: Injection" del OWASP Top 10?

2. Un desarrollador argumenta que no necesita leer el OWASP Top 10 porque el programa en un lenguaje moderno llamado Rust, que "no tiene bugs de memoria". Basado en el #1 actual (Broken Access Control), por qué su lenguaje mágico no lo salvará de ser hackeado?

3. Por qué las vulnerabilidades de inyección matemática pura están bajando lentamente de puesto en la lista OWASP a lo largo de los años, mientras que las fallas de lógica humana (como el Control de Acceso) están subiendo?

4. Si la fundación OWASP publicara su lista en 2040, crees que la lista seguiría igual o cambiaría drásticamente debido a la adopción masiva de Inteligencia Artificial? Justifica.

5. Tu empresa usa una librería Open Source con una vulnerabilidad de severidad crítica (CVE conocida). El equipo de desarrollo dice que "no es prioridad" porque la librería solo se usa en un módulo secundario. Usando la categoría A03 (Software Supply Chain Failures) como marco, por qué esta decisión es peligrosa?

6. Encuentras que tu aplicación no registra los intentos de login fallidos. Bajo la categoría A09 (Security Logging and Monitoring Failures), explica como esta omision podría permitir que un ataque de fuerza bruta pase desapercibido por meses.

7. Un cliente te pide que priorities las vulnerabilidades de su aplicación. Tiene SQL Injection (A03), IDOR (A01), y falta de HSTS (A02). Todas son reales. Cual arreglarias primero y por qué?

8. Explica por qué el OWASP Top 10 no es suficiente como único estándar de seguridad para una aplicación que maneja datos financieros. Que otros estándares o guías complementarias debería usar la empresa?
