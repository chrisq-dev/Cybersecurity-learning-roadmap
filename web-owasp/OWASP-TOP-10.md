---
title: "OWASP Top 10: El Catálogo Universal de Vulnerabilidades"
---

# OWASP Top 10: El Catálogo Universal de Vulnerabilidades

## Objetivo de esta Guía

Entender por que este documento rige a la industria entera de la programación y como usarlo para priorizar defensas. No puedes protegerte contra todo, pero si puedes protegerte contra lo más común.

En ciberseguridad hay cientos de formas de hackear una empresa. Sin embargo, no puedes obligar a todos los programadores del mundo a aprenderse 5,000 vulnerabilidades matemáticas complejas. Necesitaban un estándar, una lista concisa y brutal de las formas más fáciles y comunes de destruir tu pagina web. Ese es el OWASP Top 10.

Esta guía no pretende ser un sustituto del documento oficial de OWASP (que deberías leer si trabajas en seguridad). Es una introducción pragmatica desde la experiencia de alguien que ha visto como las empresas ignoran estas advertencias y pagan las consecuencias.

## Que es OWASP?

OWASP (Open Worldwide Application Security Project) es una fundación sin fines de lucro. Imagínalos como la Organización Mundial de la Salud (OMS), pero para el internet.

Su objetivo es analizar estadísticamente como están hackeando a las empresas a nivel mundial y publicar guías gratuitas para que los programadores (Blue Team) dejen de cometer los mismos errores una y otra vez.

OWASP no vende productos, no certifica personas (aunque hay examenes basados en sus guías), y no tiene interes económico en ninguna tecnología. Esto le da una credibilidad que las empresas de seguridad comercial no tienen.

El documento más famoso que publican es el **OWASP Top 10**, pero también producen:

- **OWASP ASVS (Application Security Verification Standard):** Un estándar detallado para verificar la seguridad de aplicaciones. Usado por auditors y consultores.
- **OWASP Testing Guide:** Una guía completa de como hacer pentesting web.
- **OWASP Cheat Sheets:** Guías rápidas de referencia para temas específicos (SQL Injection, XSS, etc.).
- **OWASP ZAP:** Una herramienta de seguridad de codigo abierto para encontrar vulnerabilidades en aplicaciones web.
- **OWASP Juice Shop:** Una aplicación intencionalmente vulnerable para practicar hacking ético.

### El Ángulo del Hacker: Por que Debes Conocer el OWASP Top 10

Si quieres ser auditor de seguridad, tendrás que memorizarte esta lista. No porque vayas a hackear con ella, sino porque tu reporte de auditoría debe incluir en que categoría exacta del Top 10 fallo la empresa. Los clientes esperan que tu hallazgo este mapeado a OWASP.

Cuando una empresa contrata un pentest, el reporte final típicamente incluye una tabla como esta:

| Vulnerabilidad | Categoría OWASP | Severidad |
|---|---|---|
| IDOR en endpoint de facturas | A01: Broken Access Control | Alta |
| SQLi en búsqueda de productos | A03: Injection | Crítica |
| XSS almacenado en comentarios | A03: Injection | Media |

Sin el mapeo a OWASP, el reporte parece amateur. Con el mapeo, el cliente entiende el contexto industrial y puede justificar la inversión en parches ante su dirección.

## La Ley y las Multas (Compliance)

Por que a una corporación millonaria le importa una lista gratuita hecha por una fundación? Por la ley y el dinero.

Existen estándares de seguridad obligatorios que las empresas deben cumplir si quieren operar en ciertos sectores.

**PCI-DSS (Payment Card Industry Data Security Standard):** Es el estándar que te permite procesar pagos con tarjetas de crédito Visa o Mastercard. Su regla 6.5 dice: "Usted debe entrenar a sus programadores para prevenir las vulnerabilidades listadas en el OWASP Top 10 vigente. Si usted no cumple, le quitaremos el derecho a procesar tarjetas de crédito."

**ISO 27001:** El estándar internacional de seguridad de la información. Las auditorías ISO 27001 frecuentemente referencian OWASP como la guía técnica para seguridad de aplicaciones.

**GDPR (General Data Protection Regulation):** La ley de protección de datos europea. No menciona OWASP directamente, pero si una empresa sufre una breach por una vulnerabilidad del Top 10, la multa puede ser del 4% de los ingresos globales anuales.

**SOX (Sarbanes-Oxley Act):** Para empresas que cotizan en bolsa en EE.UU. Requiere controles internos sobre los sistemas financieros, y las vulnerabilidades de seguridad son vistas como fallas de control.

**Ley de Protección de Datos Personales en Latinoamerica:** Varios países (México, Argentina, Brasil, Colombia, Peru, Chile) tienen leyes que exigen "medidas de seguridad técnicas apropiadas". Un juez interpretara que no tener protección contra SQL Injection no es una medida apropiada.

### El Costo Real de No Cumplir

Caso real: British Airways fue multada con 20 millones de libras (reducida de 183 millones por COVID) por una breach en 2018 donde un atacante inyecto codigo JavaScript en el sitio de pagos (un XSS que OWASP clasifica). Los datos de 500,000 clientes fueron robados. La vulnerabilidad era conocida y evitable.

Caso real: Marriott fue multada con 18.4 millones de libras (reducida de 99 millones) por una breach que expuso datos de 339 millones de huespedes. La vulnerabilidad inicial fue un acceso no autorizado a través de herramientas mal configuradas (A01: Broken Access Control).

## Por que la Lista Cambia

El OWASP Top 10 se actualiza aproximadamente cada 4 años (2013, 2017, 2021). Los errores de programación evolucionan al igual que la tecnología.

**En 2013:** La Inyección de codigo (SQL Injection) era el rey absoluto (el error #1). Todos los atacantes destruían bases de datos porque los programadores no sabían filtrar el texto.

**En 2017:** La Inyección bajo un poco pero siguio siendo #1. Sin embargo, Broken Access Control ya aparecia en #5, subiendo.

**En 2021:** La Inyección bajo al puesto #3. Por que? Los hackers se rindieron? No. Los lenguajes modernos (como React, Angular y los ORM modernos de Backend) comenzaron a integrar defensas automáticas contra inyección. El programador ya no tiene que pensarlo, la herramienta lo defiende por defecto. Además, los frameworks de backend modernos (Spring Boot, Django, Laravel, ASP.NET Core) usan consultas parametrizadas por defecto.

**El Nuevo Rey (2021):** Broken Access Control (Control de Acceso Roto) subió al Puesto #1. Hoy en día, el error más común no es romper el codigo; es que el programador olvido verificar si el Usuario A tiene permiso legal para ver la factura del Usuario B (IDOR).

**La Tendenica para 2025/2026:** Se espera que las vulnerabilidades relacionadas con IA generativa, el abuso de LLMs (prompt injection), y la seguridad en pipelines CI/CD ganen protagonismo. OWASP ya público un "OWASP Top 10 for LLM Applications" como proyecto separado.

## Las 10 Categorías en Detalle

A continuación, las categorías del OWASP Top 10 2021 con explicación de cada una, ejemplos reales y como se conectan con otras guías de este sitio.

### A01: Broken Access Control (Control de Acceso Roto)

Es la categoría #1 actual. Ocurre cuando los usuarios pueden actuar fuera de los permisos que se les asignaron.

**Ejemplos:**
- IDOR: Cambiar el ID de la factura en la URL para ver facturas de otros usuarios.
- Escalada de privilegios: Un usuario normal accede a funciones de administrador.
- Bypass de autenticación: Modificar un token JWT para cambiar el rol de usuario.

**Por que es #1:** Porque no hay herramienta automática que lo prevenga. Depende completamente de la lógica del programador. Un ORM no te salva de un IDOR. Un firewall no detecta que estas viendo un recurso que no te pertenece.

**Caso real:** En 2021, un investigador descubrió que podía acceder a cualquier cuenta de Facebook simplemente modificando un parámetro en la respuesta del servidor. Facebook pago $40,000 en bug bounty.

### A02: Cryptographic Failures (Fallos Criptográficos)

Antes llamado "Sensitive Data Exposure". Ocurre cuando los datos sensibles no están protegidos adecuadamente.

**Ejemplos:**
- Contraseñas almacenadas en texto plano en la base de datos.
- Números de tarjetas de crédito sin encriptar.
- Certificados SSL expirados o mal configurados.
- Uso de algoritmos criptográficos débiles (MD5, SHA1, RC4, DES).

**Caso real:** En 2019, la empresa Verifications.io expuso 900 millones de registros en una base de datos MongoDB sin contraseña. Literalmente sin autenticación. Los datos incluian direcciones de correo, teléfonos e información crediticia.

### A03: Injection (Inyección)

Ocurre cuando datos no confiables son enviados a un interprete como parte de un comando o consulta. Incluye SQL Injection, NoSQL Injection, OS Command Injection, LDAP Injection, y XSS (aunque OWASP 2021 movio XSS aqui, versiones anteriores lo tenían separado).

**Aprende más en:** SQL-INJECTION.md, XSS.md.

**Caso real:** En 2016, el sitio de citas Adult Friend Finder sufrio una SQL Injection que expuso 412 millones de cuentas. Las contraseñas estaban hasheadas con SHA1 (débil) y muchas fueron descifradas.

### A04: Insecure Design (Diseno Inseguro)

Nueva categoría en 2021. Reconoce que hay vulnerabilidades que no son errores de codigo sino errores de diseno arquitectónico. No importa que tan bien programes una solución si el diseno fundamental es inseguro.

**Ejemplos:**
- Rate limiting no implementado en endpoints de login.
- No hay límite en la cantidad de datos que un usuario puede solicitar (exfiltración).
- El flujo de "olvide mi contrasena" revela si un correo esta registrado o no.

### A05: Security Misconfiguration (Mala Configuración de Seguridad)

Ocurre cuando la configuración del servidor, base de datos o aplicación no es segura.

**Ejemplos:**
- Puertos innecesarios abiertos al internet.
- Servicios con configuraciones por defecto (admin/admin).
- Directorios con listado habilitado.
- Mensajes de error detallados que revelan información interna.
- Headers de seguridad HTTP faltantes.

**Caso real:** La breach de Equifax (2017) fue causada por una mala configuración: no actualizar Apache Struts a pesar de que el parche existia. Vulnerabilidad: CVE-2017-5638.

### A06: Vulnerable and Outdated Components (Componentes Vulnerables y Desactualizados)

Usar librerías, frameworks o dependencias con vulnerabilidades conocidas.

**El problema:** Las aplicaciones modernas usan cientos de dependencias. Un programador puede escribir 1,000 líneas de codigo seguro, pero si usa una librería vulnerable (como Log4j en 2021), toda la aplicación es vulnerable.

**Caso real:** Log4Shell (CVE-2021-44228) en diciembre de 2021. Una vulnerabilidad en la librería de logging Log4j de Apache permitia ejecución remota de codigo. Afectó a millones de servidores porque Log4j estaba en casi todos los proyectos Java. Empresas como Minecraft (Microsoft), iCloud (Apple), y Steam (Valve) tuvieron que parchear de emergencia.

**Aprende más en:** DEVSECOPS.md (SCA).

### A07: Identification and Authentication Failures (Fallos de Identificación y Autenticación)

Ocurre cuando los mecanismos de autenticación son débiles o están mal implementados.

**Ejemplos:**
- Permitir contraseñas débiles como `123456` o `password`.
- No tener autenticación de dos factores (2FA).
- No bloquear cuentas después de múltiples intentos fallidos.
- Enviar credenciales por URL (GET).

**Aprende más en:** AUTENTICACION-AUTORIZACION.md.

### A08: Software and Data Integrity Failures (Fallos de Integridad de Software y Datos)

Relacionado con actualizaciones no verificadas, pipelines CI/CD inseguros, y dependencias sin verificación de integridad.

**Ejemplo:** Un atacante compromete el pipeline CI/CD de una empresa e inyecta codigo malicioso en la aplicación que se despliega automáticamente a los usuarios.

**Caso real:** En 2020, el ataque a SolarWinds comprometio el pipeline de compilacion de la empresa, inyectando codigo malicioso en actualizaciones legítimas que luego fueron descargadas por 18,000 clientes, incluyendo agencias gubernamentales de EE.UU.

**Aprende más en:** DEVSECOPS.md.

### A09: Security Logging and Monitoring Failures (Fallos de Registro y Monitoreo de Seguridad)

Ocurre cuando no hay logs suficientes para detectar, investigar y responder a incidentes.

**Ejemplos:**
- No registrar intentos de inicio de sesión fallidos.
- No registrar cambios en permisos de usuarios.
- No tener alertas automáticas para eventos sospechosos.
- Logs almacenados en el mismo servidor que puede ser comprometido.

**Por que importa:** Una breach puede durar meses sin ser detectada si no hay logging. El ataque a Marriott duro 4 años antes de ser descubierto.

### A10: Server-Side Request Forgery (SSRF)

Ocurre cuando un atacante obliga al servidor a hacer peticiones HTTP a destinos que el atacante controla o a la red interna del servidor.

**Caso real:** La breach de Capital One (2019) expuso datos de 100 millones de personas. El atacante exploto un SSRF en un servidor web que interactuaba con servicios de AWS, accediendo al metadata endpoint (169.254.169.254) para obtener credenciales IAM y descargar datos de buckets S3.

**Aprende más en:** SSRF.md.

## Como Leer el OWASP Top 10 como Profesional

El OWASP Top 10 no es una checklist de seguridad ni un reemplazo de un análisis de riesgos. Es una guía de concientización (awareness). Un profesional de seguridad lo usa así:

1. **Priorización:** Si tu empresa no tiene recursos para arreglar todo, empieza por A01 (Broken Access Control) porque es el más común.

2. **Comunicación:** Usa el lenguaje OWASP para hablar con desarrolladores y gerentes. "Esto es un A01: Broken Access Control" es más claro que "hay un IDOR".

3. **Entrenamiento:** Usa el Top 10 como curriculum básico para capacitar a desarrolladores en seguridad.

4. **Métricas:** Mide cuántos hallazgos de cada categoría encuentra tu equipo en cada release. Si ves que A03 (Injection) sube, el entrenamiento en SQLi no esta funcionando.

el OWASP Top 10 no es una biblia, es una guía de que errores no cometer. Pero el 20% restante es donde los hackers expertos encuentran su comida.

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

**Tratar el Top 10 como una checklist:** "Revisamos A01 a A10, estamos seguros." Esto es peligroso porque el Top 10 cubre solo el 80% de los problemas más comunes. El 20% restante puede ser igual de devastador.

**Ignorar el contexto de la aplicación:** No todas las categorías aplican a todas las aplicaciones. Una API interna sin interfaz de usuario no debería priorizar XSS sobre BOLA.

**Actualizar dependencias sin verificar:** No basta con tener la última versión de una librería. Debes verificar el changelog de seguridad y probar que la actualización no introduce problemas.

**Confundir OWASP con un estándar de compliance:** Pasar un pentest basado en OWASP no significa que tu aplicación sea segura. Solo significa que no se encontraron los problemas más comunes en ese momento.

## Autoevaluación

1. Entras a trabajar como auditor y encuentras una vulnerabilidad de Inyección SQL en el servidor de pagos del cliente. En tu reporte final, por que es vital que vincules tu hallazgo explícitamente a la categoría "A03: Injection" del OWASP Top 10?

2. Un desarrollador argumenta que no necesita leer el OWASP Top 10 porque el programa en un lenguaje moderno llamado Rust, que "no tiene bugs de memoria". Basado en el #1 actual (Broken Access Control), por que su lenguaje mágico no lo salvará de ser hackeado?

3. Por que las vulnerabilidades de inyección matemática pura están bajando lentamente de puesto en la lista OWASP a lo largo de los años, mientras que las fallas de lógica humana (como el Control de Acceso) están subiendo?

4. Si la fundación OWASP publicara su lista en 2040, crees que la lista seguiría igual o cambiaría drásticamente debido a la adopción masiva de Inteligencia Artificial? Justifica.

5. Tu empresa usa una librería Open Source con una vulnerabilidad de severidad crítica (CVE conocida). El equipo de desarrollo dice que "no es prioridad" porque la librería solo se usa en un modulo secundario. Usando la categoría A06 (Vulnerable and Outdated Components) como marco, por que esta decisión es peligrosa?

6. Encuentras que tu aplicación no registra los intentos de login fallidos. Bajo la categoría A09 (Security Logging and Monitoring Failures), explica como esta omision podría permitir que un ataque de fuerza bruta pase desapercibido por meses.

7. Un cliente te pide que priorities las vulnerabilidades de su aplicación. Tiene SQL Injection (A03), IDOR (A01), y falta de HSTS (A05). Todas son reales. Cual arreglarias primero y por que?

8. Explica por que el OWASP Top 10 no es suficiente como único estándar de seguridad para una aplicación que maneja datos financieros. Que otros estándares o guías complementarias debería usar la empresa?
