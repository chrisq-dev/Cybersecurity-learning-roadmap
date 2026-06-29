---
title: "YARA y SIGMA: Los Carteles de Se Busca"
level: "intermedio"
content_type: "guia"
updated: "2026-06-29"
---

# YARA y SIGMA: Los Carteles de Se Busca

## Objetivo de esta Guía

Aprender como los defensores comparten información sobre ataques para que cuando un banco es comprometido en Europa, los bancos en America estén protegidos al día siguiente. YARA y SIGMA son los formatos universales que permiten esa colaboración global sin importar que tecnología use cada organización.

Cuando el FBI descubre a un nuevo criminal, no asume que todos los policías del país conocen su cara. Imprime un cartel de "Se Busca" con foto, altura, y tatuajes, y lo distribuye a todas las comisarías. En ciberseguridad, esos carteles se llaman YARA (para buscar dentro de archivos) y SIGMA (para buscar dentro de logs). Sin estos formatos, cada empresa tendría que descubrir los mismos ataques por su cuenta, una y otra vez.

## YARA: Escaneando el ADN de los Archivos

Imagina que el criminal es un archivo de computadora. Si el atacante es inteligente, le cambiará el nombre a "foto.jpg" para engañarte. No puedes confiar en el nombre. Tienes que mirar su ADN interno: los bytes que lo componen, las cadenas de texto que contiene, las secciones que lo estructuran.

YARA (Yet Another Ridiculous Acronym) es un lenguaje creado por Victor M. Alvarez de VirusTotal en 2009. Lo usan todos los EDRs, antivirus, y herramientas de análisis de malware del mundo para describir el interior de un archivo malicioso. Funciona independientemente del nombre, la extensión, o la ubicación del archivo.

### Anatomía de una Regla YARA

```
rule Detect_Malicious_Document {
    meta:
        author = "Analista SOC"
        description = "Detecta documento Office con macro maliciosa"
        date = "2024-01-15"
        hash = "a1b2c3d4e5f6..."
    strings:
        $macro = "AutoOpen" nocase
        $payload = "powershell" nocase
        $url = /https?:\/\/[^\s]{10,50}\.exe/i
        $mz = { 4D 5A 90 }  // Cabecera MZ de ejecutables Windows
    condition:
        $macro and ($payload or $url) and $mz
}
```

**Sección meta:**
Metadatos que no afectan la detección pero son utiles para mantener el repositorio de reglas: autor, descripción, fecha, referencias a CVEs o reportes. Permite a otros analistas entender el contexto de la regla.

**Sección strings:**
Define los patrones a buscar dentro del archivo:
- Texto literal: `"powershell"` busca esa cadena exacta. Modificadores: `nocase` (ignora mayúsculas), `wide` (unicode), `fullword` (palabra completa).
- Hexadecimal: `{ 4D 5A }` busca esos bytes exactos. Útil para cabeceras de archivos, firmas de protocolos, o secuencias de opcodes.
- Regex: `/https?:\/\/[^\s]+/i` busca patrones complejos como URLs. Más flexibles pero más lentos.

**Sección condition:**
Define la lógica que determina si la regla coincide:
- AND / OR / NOT: Combinaciones lógicas básicas.
- `#` : Número de ocurrencias. `#macro > 3` significa que "macro" debe aparecer más de 3 veces.
- `@` : Offset de la ocurrencia. `@macro < 1024` significa que "macro" debe aparecer en los primeros 1024 bytes.
- `filesize`: Tamaño del archivo. `filesize < 500KB` limita el escaneo a archivos pequeños.
- Funciones: `pe.sections[0].name == ".text"` accede a estructuras del formato PE (Portable Executable de Windows).

### YARA en Acción

Cuando el equipo de seguridad de Microsoft descubre un nuevo malware en sus sistemas, escribe una regla YARA y la publica en plataformas como VirusTotal, GitHub, o listas de correo. En minutos, cualquier empresa del mundo puede descargar esa regla, importarla a su EDR, y proteger todas sus computadoras.

El proceso es:
1. Investigador encuentra muestra de malware.
2. Analiza la muestra: extrae strings, estudia su comportamiento, identifica patrones unicos.
3. Escribe regla YARA que capture esos patrones.
4. Publica la regla (usualmente bajo licencia abierta).
5. Empresas de todo el mundo importan la regla a sus sistemas.
6. Todas las computadoras protegidas ahora pueden detectar ese malware.

### Limitaciones de YARA

**Ofuscación:** Si el malware esta empaquetado o cifrado con una herramienta diferente, los bytes visibles cambian y la regla no coincide. Solución: las reglas deben apuntar a características del descifrador o del comportamiento, no del contenido ofuscado.

**Polimorfismo:** Algunos malwares cambian su código en cada replicación. Las reglas basadas en strings fijos son inútiles. Solución: usar reglas basadas en comportamiento o en características estructurales que el polimorfismo no altera.

**Rendimiento:** Ejecutar miles de reglas YARA en cada archivo consume CPU. En endpoints con recursos limitados, la batería de reglas debe priorizarse. Las reglas más pesadas (con regex o búsquedas de archivos grandes) deben ejecutarse solo cuando hay suficiente capacidad de procesamiento.

**Cobertura ciega:** YARA solo ve archivos en disco. Los ataques fileless (malware que solo existe en memoria) no dejan archivos que YARA pueda escanear. Para esos casos se necesita SIGMA o detección por comportamiento del EDR.

### Buenas Prácticas para Escribir Reglas YARA

- **Especificidad balanceada:** Ni muy genérica (detecta todo) ni muy específica (detecta solo una muestra). La regla debe detectar variantes del mismo malware.
- **Usar meta:** Documentar siempre autor, fecha, y que malware detecta. Sin meta, las reglas son imposibles de mantener.
- **Probar antes de publicar:** Verificar con muestras conocidas del malware y con archivos limpios (para evitar falsos positivos).
- **Priorizar rendimiento:** Las condiciones simples (AND de strings) son más rápidas que regex complejas.
- **Evitar strings demasiado comunes:** Buscar "This program cannot be run in DOS mode" (presente en casi todos los .exe) es inútil.

## SIGMA: Escaneando el Comportamiento en Logs

YARA es excelente para archivos. Pero los atacantes modernos usan tácticas "fileless": no instalan nada en disco, solo ejecutan comandos en memoria. Si no hay archivo, YARA es ciego.

SIGMA es el equivalente de YARA para logs. No busca dentro de archivos, busca dentro de los registros de eventos que los sistemas generan. Fue creado por Florian Roth y Thomas Patzke en 2017. Es un formato abierto respaldado por la comunidad.

### Anatomía de una Regla SIGMA

```yaml
title: PowerShell Download from Internet
id: a1b2c3d4-e5f6-7890-abcd-ef1234567890
status: experimental
description: Detects PowerShell downloading files from the internet
references:
    - https://attack.mitre.org/techniques/T1059/001/
author: SOC Team
date: 2024-01-15
tags:
    - attack.execution
    - attack.t1059.001

logsource:
    category: process_creation
    product: windows

detection:
    selection_parent:
        ParentImage|endswith: '\powershell.exe'
    selection_commands:
        CommandLine|contains|all:
            - 'Net.WebClient'
            - 'DownloadString'
            - 'DownloadFile'
    condition: selection_parent and selection_commands

falsepositives:
    - Legitimate administrative scripts
    - Software update mechanisms

level: high
```

**Campos importantes:**

`title`: Nombre descriptivo de la regla. Debe permitir al analista entender que detecta sin leer la regla completa.

`id`: Identificador único universal (UUID). Permite referenciar la regla en reportes, incidentes, y comunicaciones.

`status`: Estado de madurez de la regla. `experimental` (en desarrollo), `testing` (en pruebas), `production` (desplegada), `deprecated` (obsoleta).

`logsource`: Específica que fuente de logs debe ser consultada. `category: process_creation` y `product: windows` significa "logs de creación de procesos en Windows" (Event ID 4688).

`detection`: La lógica de detección. `selection` define condiciones, `condition` las combina. Soporta operadores: `contains`, `endswith`, `startswith`, `contains|all`, `contains|any`.

`falsepositives`: Lista de escenarios conocidos que pueden generar falsos positivos. Ayuda a los analistas a contextualizar.

`level`: Severidad: `informational`, `low`, `medium`, `high`, `critical`.

### SIGMA como Traductor Universal

El problema del Blue Team es que cada empresa usa un SIEM diferente. SIGMA es el "esperanto" de la detección: escribes la regla una vez en formato YAML, y herramientas como `sigma-cli` la convierten automáticamente:

**A SPL (Splunk):**
```
index=windows EventCode=1 Image=*\\powershell.exe CommandLine=*Net.WebClient* AND *DownloadString*
```

**A KQL (Microsoft Sentinel):**
```
SecurityEvent | where EventID == 4688 | where ProcessName endswith "\\powershell.exe" | where CommandLine contains "Net.WebClient" and CommandLine contains "DownloadString"
```

**A EQL (Elastic):**
```
process where process.name == "powershell.exe" and process.command_line : ("*Net.WebClient*", "*DownloadString*")
```

Gracias a SIGMA, si un banco con Splunk crea una regla efectiva, puede compartir el archivo SIGMA con otro banco con Elastic, y ambos están protegidos sin reescribir la regla.

### El Repositorio Sigma

El proyecto Sigma mantiene un repositorio público en GitHub con miles de reglas contribuidas por la comunidad. Cualquier equipo puede descargarlo, seleccionar reglas relevantes, y convertirlas a su SIEM.

El repositorio esta organizado por:
- Tipos de ataques (ransomware, phishing, troyanos).
- Técnicas MITRE ATT&CK.
- Plataformas (Windows, Linux, macOS, cloud).
- Aplicaciones específicas (IIS, Exchange, SQL Server).

Las reglas son revisadas por mantenedores antes de ser aceptadas. El proyecto recibe contribuciones de empresas como Elastic, Splunk, y Microsoft.

### Limitaciones de SIGMA

- **Dependencia del logsource:** La regla solo funciona si la fuente de logs especificada esta disponible en el SIEM. Si no recolectas Event ID 4688, las reglas de process_creation no funcionaran.
- **Falsos positivos por entorno:** Una regla que funciona en un entorno puede generar falsos positivos en otro con diferente software, configuraciones, o procesos de negocio.
- **Traducción imperfecta:** No todos los conceptos de SIGMA se traducen perfectamente a todos los SIEMs. Algunas capacidades de un SIEM pueden no tener equivalente en otro.

## YARA + SIGMA: Defensa en Capas

En una arquitectura madura:
- YARA protege el endpoint contra archivos maliciosos conocidos.
- SIGMA protege el SIEM contra comportamientos maliciosos conocidos.

Un ataque típico requiere ambas:

1. Correo con PDF adjunto llega al usuario.
2. **YARA** detecta que el PDF contiene un exploit (regla YARA).
3. El PDF, al abrirse, ejecuta PowerShell.
4. **SIGMA** detecta PowerShell descargando contenido (regla SIGMA).
5. El malware descargado es detectado por **YARA** nuevamente.

Si cualquiera de estas capas falla, la otra puede atrapar al atacante.

## Casos Reales

### La Regla YARA que Detuvo una Campana Global (2020)

Un investigador público una regla YARA para un malware bancario en America Latina. En 24 horas, EDRs de toda la region estaban bloqueando el malware. Sin YARA, cada banco habría tenido que analizar el malware individualmente.

### Ransomware y SIGMA (2021)

Cuando se descubrió una nueva técnica de ransomware para eliminar backups via WMI, la comunidad SIGMA público una regla específica en horas. Empresas que actualizaron sus reglas pudieron detectar el comportamiento antes de que el ransomware se activara.

### Colaboración Bancaria (2022)

Un consorcio de bancos latinoamericanos creo un canal compartido de reglas SIGMA. Cuando un banco detectaba un nuevo patrón, compartia la regla en horas. Los 12 bancos del grupo estaban protegidos contra nuevas amenazas en el mismo día.

## Modos de Falla

Reglas demasiado específicas que solo detectan una muestra. Falta de pruebas contra datos reales. Exceso de confianza cuantitativa (creer que más reglas = más seguridad). Reglas sin mantenimiento que se vuelven obsoletas. Ignorar el rendimiento (ejecutar demasiadas reglas YARA colapsa endpoints).

## La Perspectiva del Atacante

Un atacante que sabe que su objetivo usa YARA y SIGMA tomará precauciones: ofuscara su código, probara contra VirusTotal (con cuidado), usara herramientas nativas (LOLBins), y revisara los repositorios públicos de SIGMA para saber que comportamientos están monitoreados.

El atacante más sofisticado sabe que YARA y SIGMA son solo el primer nivel. Si puede evadirlos, aún enfrenta al analista humano, que es más imprevisible.

## Autoevaluación

1. Un atacante ofusca su .exe cifrando el código interno. Por qué esto evita las reglas YARA? Que enfoque alternativo detectaria el comportamiento malicioso?
2. Por qué una regla SIGMA que detecta "borrar logs del sistema" es más robusta que una regla YARA que busca "borrador.exe"?
3. Eres jefe de seguridad en Colombia. Recibes reglas SIGMA de un ataque bancario en Europa. Que ordenas a tu equipo en las próximas horas?
4. YARA analiza _____ mientras SIGMA analiza _____. Proporciona un ejemplo concreto de cada uno.
5. Un ataque fileless solo existe en memoria. Que herramienta (YARA o SIGMA) lo detecta mejor? Por qué?
6. Tu equipo tiene 1000 reglas YARA en cada endpoint. El rendimiento baja. Como priorizas cuáles mantener? Que criterios usas?
7. Descargas el repositorio Sigma completo y conviertes todas las reglas a Splunk. El SIEM colapsa. Donde estuvo el error?
8. Un analista crea una regla YARA buscando "This program cannot be run in DOS mode" (presente en todo .exe). Por qué es pésima?

## Sigma - Sintaxis Avanzada

### Tipos de Seleccion

**Seleccion por campos específicos:**
```yaml
detection:
  selection:
    EventID: 4688
    NewProcessName|endswith: '
eg.exe'
```
**Seleccion con modificadores:**
- `|contains`: El campo contiene el valor (parcial).
- `|startswith`: El campo comienza con el valor.
- `|endswith`: El campo termina con el valor.
- `|re`: El campo coincide con la expresión regular.
- `|base64`: El valor esta codificado en base64.
- `|all`: Todos los valores en el campo están presentes.

**Condiciones compuestas:**
```yaml
condition: selection1 and not selection2
```
```yaml
condition: selection1 or selection2
```
```yaml
condition: 1 of selection*
```
```yaml
condition: all of them
```

### Log Sources en Sigma

Sigma define log sources de forma abstracta:
- `product: windows`, `service: security`: Logs de Windows Security.
- `product: windows`, `service: sysmon`: Logs de Sysmon.
- `product: linux`, `service: auditd`: Logs de auditd en Linux.
- `product: linux`, `service: auth`: Logs de autenticación en Linux.
- `product: webserver`, `service: access`: Logs de acceso de servidores web.

Cada log source se mapea a diferentes backends (Splunk, Elastic, QRadar) según las capacidades de cada SIEM.

### Niveles de Sigma

- `low`: Información general, baja certeza de ataque.
- `medium`: Sospecha moderada, requiere contexto adicional.
- `high`: Alta certeza de comportamiento malicioso.
- `critical`: Evidencia casi concluyente de ataque.

## YARA - Sintaxis Avanzada

### Reglas de Texto y Hex

**Texto (strings):**
```yara
rule Detect_Mimikatz_String {
  strings:
    $a = "mimikatz" ascii wide nocase
    $b = "sekurlsa" ascii wide nocase
  condition:
    $a or $b
}
```

**Hexadecimal:**
```yara
rule Detect_Shellcode {
  strings:
    $a = { EB 02 EB 02 EB 02 }   // JMP instructions
    $b = { 0F 05 }               // SYSCALL in x86_64
  condition:
    $a and $b
}
```

**Combinaciones (Text + Hex + Regex):**
```yara
rule Advanced_Malware {
  strings:
    $text = "C2Server" ascii wide
    $hex = { 00 01 02 03 04 05 }
    $regex = /http[s]?:\/\/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/
  condition:
    $text and ($hex or $regex)
}
```

### Modificadores de Strings

- `ascii`: Busca en encoding ASCII.
- `wide`: Busca en encoding Unicode (UTF-16LE).
- `nocase`: Búsqueda case-insensitive.
- `fullword`: La coincidencia debe ser una palabra completa.
- `xor`: Busca la string con XOR simple (para ofuscación básica).

### Modulos de YARA

**PE Module:** Analiza archivos PE (Portable Executable).
```yara
import "pe"
rule Has_UpX_Compression {
  condition:
    pe.section_contians_name(".upx")
}
```

**Cuckoo Module:** Analiza comportamiento en sandbox.
```yara
import "cuckoo"
rule Creates_Persistent_Service {
  condition:
    cuckoo.sync_action("create_service")
}
```

**Hash Module:** Verifica hashes de archivos.
```yara
import "hash"
rule Known_Good_File {
  condition:
    hash.sha256(0, filesize) == "valid_hash_here"
}
```

## Ecosistema de Herramientas

### Sigma

**Convertidores:**
- `sigmac`: La herramienta oficial de conversión a diferentes formatos SIEM.
- `sigma-cli`: Interfaz de línea de comandos moderna.
- `sigmac-windows`: Versión para PowerShell.

**Validación:**
- `sigma-schema-converter`: Valida reglas contra el esquema oficial.
- Validación automática en pipelines CI/CD.

### YARA

**Creación y Prueba:**
- `yara`: La herramienta oficial para escanear archivos.
- `yargen`: Generador automático de reglas YARA.
- `yaracy`: Escaneo masivo de directorios.

**Gestión de Reglas:**
- `Valhalla` (Nextron): Base de datos de reglas YARA.
- `YARAify`: API de inteligencia de amenazas para YARA.
- `UnpacMe`: Servicio de desempaquetado automatizado con YARA.

## Preguntas Adicionales

9. Creas una regla YARA que detecta el C2 de un grupo APT. La regla funciona perfectamente en tu laboratorio. Al desplegarla en producción, detecta un antivirus legítimo en 10,000 endpoints. Como ajustas la regla sin perder la detección del APT?
10. Tu equipo quiere implementar un pipeline CI/CD para reglas Sigma. Que etapas incluirias? Que herramientas usarías para validar y probar las reglas antes de desplegarlas?
11. Un analista crea una regla Sigma con una condición compleja que solo el entiende. Como documentas la lógica de la regla para que otros miembros del equipo puedan mantenerla cuando el analista se vaya?
12. Tienes una regla YARA que detecta malware correctamente pero tarda 30 segundos en escanear cada archivo. La regla se ejecuta en el EDR de todos los endpoints. El rendimiento se degrada significativamente. Como optimizas la regla para reducir el tiempo de escaneo?
