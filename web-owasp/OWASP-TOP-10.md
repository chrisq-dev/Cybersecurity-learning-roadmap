# OWASP Top 10: El Catálogo Universal

## Objetivo del Módulo

Entender por qué este documento rige a la industria entera de la programación.
En Ciberseguridad hay cientos de formas de hackear una empresa. Sin embargo, no puedes obligar a todos los programadores del mundo a aprenderse 5,000 vulnerabilidades matemáticas complejas. Necesitaban un estándar, una lista concisa y brutal de "Las 10 Formas más fáciles y comunes de destruir tu página web". Ese es el OWASP Top 10.

---

## 1. ¿Qué es OWASP?

**OWASP (Open Worldwide Application Security Project)** es una fundación sin fines de lucro. Imagínalos como la Organización Mundial de la Salud (OMS), pero para el Internet.

Su objetivo es analizar estadísticamente cómo están hackeando a las empresas a nivel mundial y publicar guías gratuitas para que los programadores (Blue Team) dejen de cometer los mismos estúpidos errores una y otra vez.

El documento más famoso que publican es el **OWASP Top 10**.

> **Importante:**
> El OWASP Top 10 NO es un manual de hacking. Es un documento de Concientización (*Awareness*). Si quieres ser auditor de seguridad, tendrás que memorizarte esta lista, no porque vayas a hackear con ella, sino porque **tu reporte de auditoría debe incluir en qué categoría exacta del Top 10 falló la empresa.**

---

## 2. La Ley y las Multas (Compliance)

¿Por qué a una corporación millonaria le importa una lista gratuita hecha por una fundación? Por la **Ley y el Dinero**.

Existen estándares de seguridad obligatorios que las empresas deben cumplir si quieren operar. Por ejemplo, el **PCI-DSS** (El estándar que te permite procesar pagos con Tarjetas de Crédito Visa o Mastercard).
*   El PCI-DSS dice literalmente en su regla 6.5: *"Usted debe entrenar a sus programadores para prevenir las vulnerabilidades listadas en el OWASP Top 10 vigente. Si usted no cumple, le quitaremos el derecho a procesar tarjetas de crédito"*.

Si un programador novato comete el error #1 del OWASP, el atacante robará las tarjetas, Visa demandará a la empresa, y la empresa quebrará. Por eso OWASP es una Biblia corporativa.

---

## 3. ¿Por qué la lista cambia?

El OWASP Top 10 se actualiza aproximadamente cada 4 años (2013, 2017, 2021). 
Los errores de programación evolucionan al igual que la tecnología.

*   **En 2013:** La Inyección de código (SQL Injection) era el rey absoluto (El Error #1). Todos los atacantes destruían bases de datos porque los programadores no sabían filtrar el texto.
*   **En 2021:** La Inyección bajó al puesto #3. ¿Por qué? ¿Los hackers se rindieron? No. Los lenguajes modernos (como React, Angular y los ORM modernos de Backend) comenzaron a integrar defensas automáticas contra inyección. El programador ya no tiene que pensarlo, la herramienta lo defiende por defecto.
*   **El Nuevo Rey (2021):** *Broken Access Control* (Control de Acceso Roto) subió al Puesto #1. Hoy en día, el error más común no es romper el código; es que el programador olvidó verificar si el Usuario A tiene permiso legal para ver la factura del Usuario B (IDOR).

---

## 4. Las Categorías Clave que Aprenderás

A partir de este punto, los siguientes archivos de este módulo te enseñarán a atacar y defender las vulnerabilidades más críticas de esta lista:

1.  **A01: Broken Access Control (Control de Acceso Roto):** Entrar a lugares que no te corresponden.
2.  **A02: Cryptographic Failures (Fallos Criptográficos):** Guardar las contraseñas en texto plano (sin cifrar).
3.  **A03: Injection (Inyección):** SQL Injection, XSS (Mentirle al sistema).
4.  **A07: Identification and Authentication Failures:** Permitir contraseñas débiles como `123456` o no requerir Autenticación de Dos Factores (2FA).
5.  **A10: Server-Side Request Forgery (SSRF):** Secuestrar al mesero (El servidor web) para que ataque a la red interna.

---

## 5. Criterio de Dominio (Autoevaluación)

¿Entiendes el peso del estándar OWASP?

1. Entras a trabajar como Auditor (Pentester) y encuentras una vulnerabilidad de *Inyección SQL* en el servidor de pagos del cliente. En tu reporte final, ¿por qué es vital que vincules tu hallazgo explícitamente a la categoría "A03: Injection" del OWASP Top 10?
2. Un desarrollador argumenta que no necesita leer el OWASP Top 10 porque él programa en un lenguaje modernísimo llamado Rust, que "no tiene bugs de memoria". Basado en el #1 actual (*Broken Access Control*), ¿por qué su lenguaje mágico no lo salvará de ser hackeado?
3. ¿Por qué las vulnerabilidades de inyección matemática pura están bajando lentamente de puesto en la lista OWASP a lo largo de los años, mientras que las fallas de lógica humana (como el Control de Acceso) están subiendo?
4. Si la fundación OWASP publicara su lista en el año 2040, ¿Crees que la lista seguiría igual o cambiaría drásticamente debido a la adopción masiva de la Inteligencia Artificial? Justifica.
