---
title: "SIEM y MITRE ATT&CK: El Cerebro y El Diccionario"
---
# SIEM y MITRE ATT&CK: El Cerebro y El Diccionario

## Objetivo de esta Guía

Entender qué es la pantalla negra gigantesca que miran todos los Analistas SOC y cómo la industria mundial se puso de acuerdo en un solo lenguaje para describir a los criminales cibernéticos.

---

## 1. El SIEM: El Cerebro Central (La Pantalla Gigante)

En la guía anterior aprendimos que un banco tiene "cámaras" por todas partes (Firewalls, Antivirus, Servidores Web, Windows).

El problema físico es que no puedes poner a un Analista SOC a mirar 50 monitores diferentes (uno para el Firewall, otro para Windows, otro para Linux). Se volvería loco.

La solución es el **SIEM (Security Information and Event Management)**.
Plataformas como **Splunk, IBM QRadar o Wazuh** son gigantescas aspiradoras de datos. 
1. Absorben todos los logs de todas las cámaras del mundo en tiempo real.
2. Los traducen al mismo idioma (Parsing / Normalización).
3. Los muestran en un solo monitor, una sola barra de búsqueda para el Analista.

Si buscas la IP `10.0.0.5` en el SIEM, el SIEM te dirá instantáneamente: *"Esa IP fue vista por el Firewall hace 2 horas, fue vista por el Antivirus hace 1 hora, y acaba de iniciar sesión en Windows hace 5 minutos"*.
El SIEM correlaciona eventos dispersos y arma la película completa del robo.

---

## 2. MITRE ATT&CK: La Enciclopedia del Crimen

Imagina que dos Analistas SOC están platicando en la cafetería.
El Analista 1 dice: *"Ayer nos hackearon. El atacante usó un script de PowerShell para leer las contraseñas de la memoria RAM"*.
El Analista 2 dice: *"Ah sí, a nosotros también nos hicieron Dump de LSASS"*.

Están hablando del mismo ataque, pero usando palabras diferentes. Si el FBI quiere llevar un conteo mundial de crímenes, no puede tener 100 nombres para la misma técnica.

Aquí entra **MITRE ATT&CK**. Es una organización financiada por el gobierno de EE.UU. que creó una "Tabla Periódica" del hacking. Es un diccionario universal gratuito.

En lugar de decir *"Leyó contraseñas de la RAM"*, el mundo entero (Rusia, China, EE.UU.) acordó llamarle por su código único: **T1003 (OS Credential Dumping)**.

### Tácticas y Técnicas
El framework divide todos los ataques del mundo en:
* **Tácticas (El QUÉ):** ¿Qué quiere lograr el hacker? (Ej. Quiere "Ganar Acceso Inicial", o quiere "Robar Credenciales").
* **Técnicas (El CÓMO):** ¿Cómo lo va a lograr? (Ej. Para "Ganar Acceso Inicial", usó la técnica **T1566: Phishing**).

---

## 3. La Fusión: Cuando el SIEM conoce a MITRE

El trabajo moderno de un Defensor ya no es solo "configurar el SIEM". Es mapear el SIEM con la tabla de MITRE.

Cuando un hacker (Red Team) ataca, sus pasos dejan huellas. El Analista SOC crea reglas en el SIEM que dicen:
*"Si la computadora detecta que alguien abrió Microsoft Word e inmediatamente Word ejecutó PowerShell en la sombra... Enciende la Alerta Roja, y ponle la etiqueta **T1059: Command and Scripting Interpreter**"*.

> **El Beneficio:**
> Cuando la alerta llega a la pantalla del Analista Junior a las 3:00 AM, el analista no tiene que adivinar qué intentaba hacer el atacante. Ve la etiqueta `T1059`, la busca en la página gratuita de MITRE, y lee el manual exacto de cómo detener el ataque. MITRE hace que los defensores novatos puedan pelear contra hackers profesionales.

---

## 4. Criterio de Dominio (Autoevaluación)

Revisa si hablas el idioma universal:

1. Estás configurando un SIEM nuevo. Decides conectar los Logs del Firewall (Cisco) y los Logs de Windows. Cisco escribe la palabra `source_ip` para referirse al origen, mientras que Windows escribe `ClientAddress`. ¿Por qué es obligatorio que el SIEM pase por un proceso de "Normalización" antes de guardar esos logs?
2. Un reporte de auditoría del Red Team dice: *"Logramos vulnerar el servidor usando la técnica T1110 (Brute Force) de MITRE ATT&CK"*. Si buscas `T1110` en Google, ¿Encontrarás un tutorial de cómo hackear a tu empresa específica, o encontrarás un resumen teórico universal de cómo funciona la Fuerza Bruta?
3. ¿Por qué el Framework MITRE ATT&CK es más útil para el Blue Team (Defensores) que la propia calculadora de miedo CVSS que vimos en la guía anterior?
4. Un directivo te pregunta: *"¿Para qué pagamos $50,000 USD al año por la licencia del SIEM Splunk si ya tenemos un Antivirus y un Firewall instalados que hacen su propio trabajo?"*. Usando la analogía de las cámaras y la visión global, ¿Cómo justificas la compra del SIEM?
