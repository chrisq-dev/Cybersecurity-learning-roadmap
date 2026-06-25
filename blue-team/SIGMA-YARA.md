---
title: "YARA y SIGMA: Los Carteles de \"Se Busca\""
---
# YARA y SIGMA: Los Carteles de "Se Busca"

## Objetivo de esta Guía

Aprender cómo los Defensores comparten información sobre los hackers para que, si un hacker ataca un banco en China, los bancos en México estén automáticamente protegidos al día siguiente.

Cuando el FBI descubre a un nuevo criminal, no asume que todos los policías del país saben cómo es su cara. El FBI imprime un cartel de "Se Busca" con la foto, la altura y los tatuajes del criminal, y lo pega en todas las comisarías del país.
En Ciberseguridad, a los carteles de "Se Busca" se les llama **YARA** y **SIGMA**.

---

## 1. YARA: Escaneando el ADN (Archivos)

Imagina que el criminal es un archivo de computadora (un malware llamado `virus.exe`).
Si el hacker es inteligente, le cambiará el nombre a `foto.jpg` para engañarte. No puedes confiar en el nombre. Tienes que mirar su ADN.

**YARA (Yet Another Ridiculous Acronym)** es un lenguaje universal que usan todos los Antivirus y EDRs del mundo para describir el interior matemático de un archivo malo.

Una regla YARA se lee casi como inglés básico. Dice algo como:
*"Se Busca: Un archivo. No me importa cómo se llame. Búscalo si por dentro contiene la palabra 'powershell.exe' Y TAMBIÉN contiene los números hexadecimales '4D 5A' (Que significa que es un ejecutable de Windows) Y TAMBIÉN pesa menos de 50 Kilobytes."*

**La magia de YARA:**
Si el Blue Team de Microsoft descubre un nuevo virus en internet, Microsoft escribe la Regla YARA de ese virus y la pública gratis en Twitter. Tú descargas esa regla, la metes a tu Antivirus corporativo, y en un segundo, todas las computadoras de tu empresa están inmunizadas contra ese virus específico. Has compartido inteligencia (Threat Intelligence).

---

## 2. SIGMA: Escaneando el Comportamiento (Logs)

YARA es excelente para atrapar *Archivos*. Pero hoy en día, los hackers más peligrosos usan tácticas "Fileless" (Sin archivos). No instalan nada en tu disco duro; simplemente entran a tu Windows y escriben comandos maliciosos en la terminal.
Si no hay archivo, YARA es ciego.

Aquí entra **SIGMA**.
SIGMA es el hermano gemelo de YARA, pero en lugar de buscar adentro de archivos, **busca adentro de los Logs del SIEM**.

Una regla SIGMA es un cartel de "Se Busca" para un comportamiento humano. Dice algo como:
*"Se Busca: Alerta si un Usuario inicia sesión a las 3:00 AM, Y en menos de 5 minutos ejecuta el comando `whoami`, Y luego intenta borrar la Papelera de Reciclaje."*

### El Traductor Universal
El problema del Blue Team es que cada empresa usa un SIEM diferente. Algunos usan Splunk, otros usan Elastic, otros usan Wazuh. Cada uno de estos SIEMs tiene su propio lenguaje de programación (Es como si uno hablara inglés, otro chino y otro español).

**SIGMA es el Esperanto.** Tú escribes la regla en formato SIGMA (que es un archivo YAML muy fácil de leer), y usas una herramienta gratuita que automáticamente "Traduce" tu regla al idioma de Splunk, o al idioma de Elastic.
Gracias a SIGMA, si un banco que usa Splunk crea una regla increíble para atrapar a un hacker, puede compartir la regla SIGMA con otro banco que usa Wazuh, y ambos estarán protegidos.

---

## 3. Criterio de Dominio (Autoevaluación)

Revisa si entiendes los formatos de inteligencia:

1. Un atacante diseña un virus en `.exe`. Para evitar ser detectado por los Antivirus, el atacante usa una herramienta de "Ofuscación" que revuelve y cifra el código interno del virus. ¿Por qué esto inutiliza temporalmente las reglas YARA existentes que el Blue Team tenía para cazar a ese virus específico?
2. Sabiendo que los hackers pueden cambiar el código de su virus fácilmente, ¿Por qué una regla SIGMA que detecta el comportamiento de "Borrar los Logs del Sistema" es mucho más resistente y duradera que una regla YARA que busca un virus llamado "borrador.exe"?
3. Eres el jefe de ciberseguridad de un Banco en Colombia. Te llega una noticia de que un Banco en Europa acaba de ser hackeado, y el gobierno europeo pública públicamente las Reglas SIGMA del ataque. ¿Qué debes ordenarle inmediatamente a tu ingeniero de SIEM (Splunk) que haga con ese archivo SIGMA?
4. Diferencia principal: YARA analiza _______ (ej. `malware.exe`), mientras que SIGMA analiza _______ (ej. `EventID 4624 de Windows`). Rellena los espacios.
