# AWS, Azure y GCP: Los Tres Reyes de la Nube

## Objetivo del Módulo

Aprender a no dejarte intimidar por el marketing. Entender que sin importar si la empresa usa Amazon, Microsoft o Google, la infraestructura subyacente que vas a hackear o defender es exactamente la misma; solo le cambian el nombre comercial.

El mercado mundial de la nube está dominado por tres corporaciones gigantes. Si entiendes cómo funciona una, entenderás cómo funcionan las otras dos simplemente comprando un diccionario de traducciones.

---

## 1. Amazon Web Services (AWS)

Es el Rey indiscutible. Fue el primero en llegar al mercado y tiene la mayor cuota del mundo.
*   **Perfil:** Si una empresa es una Startup tecnológica (Netflix, Airbnb, Uber), casi seguro usan AWS.
*   **La Ventaja/Desventaja:** Tiene más de 200 servicios diferentes. Es tan complejo que las empresas suelen configurarlo mal, dejando agujeros de seguridad masivos.

**El Diccionario de AWS:**
*   **EC2 (Elastic Compute Cloud):** Así le llama Amazon a una simple Computadora Virtual (Un servidor Linux o Windows).
*   **S3 (Simple Storage Service):** Así le llama Amazon a un disco duro gigante donde guardas fotos o backups (Bodegas).
*   **IAM (Identity and Access Management):** El sistema de control de usuarios y permisos.

---

## 2. Microsoft Azure

Es el segundo jugador más grande, pero el favorito del sector corporativo tradicional.
*   **Perfil:** Si el cliente es un Banco, un Hospital o una oficina de Gobierno que lleva 20 años usando Windows y Active Directory, casi 100% seguro usarán Azure, porque se integra perfectamente con las licencias de Microsoft que ya pagan.
*   **La Ventaja/Desventaja:** Su integración con Office 365 y Windows es insuperable. Pero su complejidad de permisos es infame entre los analistas de seguridad.

**El Diccionario de Azure (La Traducción):**
*   **Virtual Machines (VM):** El equivalente a las EC2 de Amazon. (Computadoras).
*   **Blob Storage:** El equivalente a los S3 de Amazon. (Bodegas).
*   **Entra ID (Antes Azure Active Directory):** El equivalente a IAM. Es el corazón de la seguridad de Microsoft.

---

## 3. Google Cloud Platform (GCP)

El tercer jugador. Tiene menos cuota de mercado global, pero es amado por los ingenieros de datos y la inteligencia artificial.
*   **Perfil:** Empresas que manejan *Big Data*, Inteligencia Artificial o que usan intensivamente Kubernetes (inventado por Google).
*   **La Ventaja/Desventaja:** Es mucho más fácil de usar y su red interna es asombrosamente rápida.

**El Diccionario de GCP (La Traducción):**
*   **Compute Engine:** El equivalente a las EC2 o VMs.
*   **Cloud Storage:** El equivalente a los S3 o Blobs.
*   **Cloud IAM:** El control de accesos.

---

## 4. El Hacker Multi-Nube (Cloud Agnostic)

Como profesional de ciberseguridad, no puedes decir *"Yo solo sé hackear AWS"*. Debes ser **Agnóstico a la Nube**.

Un hacker no ataca "un EC2" o "un Compute Engine". El hacker ataca un servidor Linux que tiene un puerto 22 abierto. A Linux no le importa en qué nube está flotando; las técnicas de Inyección SQL, XSS o Fuerza Bruta aplican exactamente igual en Amazon que en la computadora debajo de tu cama.

**La Diferencia Real (La API):**
Donde las nubes SÍ son diferentes, es en cómo las controlas por fuera.
Si un atacante roba tus llaves secretas (API Keys) de AWS, usará un comando en su terminal llamado `aws s3 ls` para robar tus archivos.
Si el atacante roba tus llaves de Google, usará el comando `gcloud storage ls`.

El objetivo (robar datos) es el mismo; solo cambia la herramienta de control remoto.

---

## 5. Criterio de Dominio (Autoevaluación)

Revisa si tu mente ya traduce los conceptos comerciales a conceptos de ingeniería:

1. Estás leyendo un reporte de inteligencia y dice: *"El atacante vulneró una instancia EC2 y luego exfiltró datos de un bucket S3"*. Traduce esta oración al idioma de Microsoft Azure.
2. Un desarrollador te dice: *"Vamos a mover nuestro servidor local a la nube de AWS (IaaS). Como AWS tiene ingenieros de seguridad brillantes, ya no necesito parchear las vulnerabilidades de mi Linux"*. Basado en lo que aprendiste en el módulo anterior, ¿Por qué este desarrollador está equivocado?
3. Si descubres que la página web de tu cliente es vulnerable a Inyección SQL (SQLi). ¿La forma de ejecutar el ataque matemático SQLi cambia dependiendo de si el servidor está en AWS, Azure o GCP? ¿Por qué?
4. ¿Por qué el servicio "Entra ID" (Azure AD) es el objetivo final y más codiciado para cualquier atacante que vulnera una red corporativa moderna alojada en la nube de Microsoft?
