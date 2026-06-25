---
title: "PowerShell y Eventos: Las Cámaras y el Misil"
---
# PowerShell y Eventos: Las Cámaras y el Misil

## Objetivo de esta Guía

Aprender qué herramientas usa un Defensor (Blue Team) para cazar atacantes invisibles en Windows, y qué herramientas usa el Hacker (Red Team) para volverse invisible en primer lugar.

En Linux vimos que `/var/log` es el expediente médico y la consola `bash` es la herramienta de trabajo. Windows tiene sus propios equivalentes, pero son infinitamente más densos, ruidosos y peligrosos: El Visor de Eventos (Event Viewer) y PowerShell.

---

## 1. Event Viewer: El Sistema de Cámaras de Seguridad

Windows no guarda sus bitácoras en simples archivos de texto legibles. Usa una base de datos gigante a la que accedes abriendo la aplicación **Event Viewer (Visor de Eventos)**.

Si el Registro de Windows es el ADN del sistema, el Visor de Eventos son **las cámaras de seguridad del castillo**. Absolutamente todo queda grabado.

El problema es el "Ruido".
Si prendes el Visor de Eventos en una laptop corporativa normal, verás que la máquina generó **40,000 eventos** en un solo día: "El WiFi encendió", "El mouse se conectó", "La hora se actualizó". Buscar a un hacker ahí es buscar una aguja en un pajar.

### Los 3 Eventos de Seguridad Críticos (Security IDs)
Para no enloquecer, los cazadores de amenazas se aprenden de memoria ciertos Event IDs (Números de Evento).

*   **Event ID 4624 (Acceso Exitoso):** Significa que alguien, de alguna forma, inició sesión exitosamente.
*   **Event ID 4625 (Acceso Denegado):** Alguien intentó iniciar sesión pero falló la contraseña.
    *   *El Ángulo Hacker:* Si tu Visor de Eventos marca **un** Evento 4625, es normal; alguien se equivocó al teclear. Si marca **cuatrocientos eventos 4625 en el último minuto**, estás bajo un ataque de Fuerza Bruta inminente.
*   **Event ID 4688 (Nuevo Proceso Creado):** Se creó un nuevo proceso. 
    *   *El Ángulo Hacker:* Si el Evento 4688 muestra que el proceso "Calculadora" fue el "Padre" que creó al proceso hijo "Consola de Comandos", estás viendo cómo un malware secuestró una aplicación inofensiva para intentar tomar control. (Una calculadora real jamás intenta abrir una terminal).

---

## 2. PowerShell: El Misil Nuclear

Antiguamente, Windows tenía la famosa terminal negra de comandos (`cmd.exe`). Era bastante inútil y primitiva comparada con Linux. Para arreglar eso, Microsoft creó **PowerShell** (la terminal azul).

PowerShell no es solo una terminal para crear carpetitas. Es un lenguaje de programación orientado a objetos completo, integrado en lo más profundo del sistema operativo.
*   **Para el Administrador:** Es mágico. Un administrador puede usar un script de PowerShell de 5 líneas para buscar en el Controlador de Dominio a todos los empleados que no han iniciado sesión en 3 meses, desactivar sus cuentas y borrar sus archivos automáticamente.
*   **Para el Hacker:** Es el arma definitiva. Dado que PowerShell es una herramienta *legítima* creada por Microsoft y firmada criptográficamente por ellos, los antivirus antiguos confían en ella ciegamente.

### Fileless Malware (El Malware sin Archivos)
El concepto de seguridad más aterrador y avanzado de esta década.

1.  **El ataque clásico:** Te envío un correo con un archivo llamado `virus.exe`. Lo descargas a tu disco duro. Tu Antivirus escanea tu disco duro, ve el virus y lo borra. Fracaso total del atacante.
2.  **El ataque PowerShell (Fileless):** Te envío un documento de Word que dice "Salarios.docx". Al abrirlo, el archivo tiene una línea de código incrustada. Ese código no descarga nada al disco duro; simplemente obliga a **PowerShell** a abrirse de fondo y ejecutar un comando directamente **en la memoria RAM** para robar tus contraseñas.
    *   Como no se descargó ningún `.exe` al disco duro, el Antivirus tradicional nunca vio nada.
    *   Como PowerShell es un programa legal de Microsoft, el sistema lo dejó correr.

> **Importante para Defensores:**
> Hoy en día, la única forma de detener los ataques *Fileless* en Windows es activar políticas avanzadas de auditoría, como *PowerShell Script Block Logging* (Evento 4104), que obliga a las cámaras de seguridad (Event Viewer) a grabar literalmente el código de cada script de PowerShell que se intente ejecutar en la memoria RAM, sin importar de dónde venga.

---

## 3. Criterio de Dominio (Autoevaluación)

Revisa si tu ojo de analista está calibrado:

1. Estás leyendo el Visor de Eventos y notas el Evento `4624` (Login exitoso) seguido inmediatamente de 50 eventos `4688` (Creación masiva de procesos como comandos de borrado y apagado de redes). ¿Qué deduces de esta cadena de cámaras de seguridad?
2. Un empleado del banco abre un PDF malicioso. Su antivirus (Endpoint Protection) jura que no detectó ningún ejecutable ni archivo peligroso caer en el disco duro, pero 10 minutos después el atacante vació la base de datos de clientes. ¿Qué tipo de ataque ejecutó el hacker y qué herramienta de Windows probablemente usó como vehículo?
3. En Linux, para leer los accesos fallidos usas `cat /var/log/auth.log | grep "Failed"`. En Windows, ¿Cómo se llama la aplicación gráfica o la base de datos donde irías a buscar ese mismo error de acceso?
4. ¿Por qué PowerShell es considerado una herramienta de "doble filo" (Doble-Edge Sword) en el entorno de Active Directory?
