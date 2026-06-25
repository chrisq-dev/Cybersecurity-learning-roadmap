---
title: "OSINT: El Arte de Buscar en Fuentes Abiertas"
---
# OSINT: El Arte de Buscar en Fuentes Abiertas

## Objetivo de esta Guía

Entender que la fase más crítica de un ciberataque (o de una investigación defensiva) casi nunca requiere tirar una sola línea de código malicioso. Consiste simplemente en "Saber buscar".

El **OSINT** (Open Source Intelligence) es el proceso de recolectar, analizar y tomar decisiones basadas en información que es de acceso público. Si alguna vez buscaste la cuenta de Instagram de una persona usando solo su primer nombre y la ciudad donde vive, felicidades: hiciste OSINT amateur. En ciberseguridad, profesionalizamos esta técnica para encontrar secretos corporativos antes de lanzar el primer ciberataque.

---

## 1. La Fase de Reconocimiento Pasivo

En el Hacking Ético (Red Team), existe una regla de oro: **Nunca toques el servidor de tu víctima si no es necesario**.

* **Reconocimiento Activo:** Escanear los puertos de una empresa (Nmap). Esto hace ruido, deja rastros en el Firewall y el Blue Team puede bloquearte.
* **Reconocimiento Pasivo (OSINT):** Es ser un fantasma. Nunca interactúas con los servidores de la empresa. Buscas la información que ellos mismos, o terceros, filtraron por accidente en internet.

Si quieres saber qué sistema operativo usa la empresa objetivo, no los escaneas. Entras a su perfil de LinkedIn, miras las ofertas de trabajo y ves que buscan "Especialista en Windows Server 2019". ¡Bum! Acaban de revelarte su infraestructura sin darse cuenta.

---

## 2. Herramientas Clave: Google Dorks

Google no es solo un buscador; es la base de datos de vulnerabilidades más grande del mundo, si sabes hablar su idioma. Los **Google Dorks** son operadores lógicos que te permiten hacer búsquedas quirúrgicas.

Ejemplos de Dorking:
* `site:banco.com filetype:pdf "contraseña"` -> Busca documentos PDF dentro del servidor del banco que contengan la palabra "contraseña".
* `inurl:admin.php intitle:"Panel de Control"` -> Busca páginas web en internet que tengan un panel de administrador expuesto al público.

> **Importante:**
> Los hackers usan Google Dorks constantemente para encontrar servidores configurados incorrectamente que exponen archivos `.env` (donde los programadores guardan las contraseñas de las bases de datos).

---

## 3. Metadatos: El Rastro Invisible (EXIF)

Cuando tomas una fotografía con tu celular y la subes a internet sin procesarla, no solo estás compartiendo los píxeles de la imagen. Estás compartiendo **Metadatos** (Datos sobre los datos).

El formato EXIF de las fotografías incluye:
* Latitud y Longitud GPS exactas de dónde se tomó la foto.
* El modelo de tu celular.
* La fecha y hora exacta.

Si un cibercriminal o investigador de OSINT descarga la foto que el CEO de la empresa subió a su blog personal, puede extraer estos metadatos con herramientas como `exiftool` y descubrir dónde vive, cuáles son sus horarios de movimiento y planear un ataque de Ingeniería Social físico.

---

## Criterio de Dominio (Autoevaluación)

1. Explica la diferencia principal entre el Reconocimiento Activo y el OSINT (Reconocimiento Pasivo) en cuanto al riesgo de ser detectado por el Blue Team.
2. ¿Qué es un "Google Dork" y por qué un analista defensivo debería usarlos contra su propia empresa?
3. Un empleado del banco se toma una selfie en su escritorio con su nuevo gafete de acceso y la sube a Twitter (X) para celebrar. ¿Qué tipos de datos podrías extraer (visualmente y con metadatos) mediante OSINT?
