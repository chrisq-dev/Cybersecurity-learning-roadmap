# Telemetría del Endpoint: Las Cámaras Corporales

## Objetivo del Módulo

Aprender de dónde diablos saca un *SOC Analyst* (Fase 8) la información para saber que un empleado a tres mil kilómetros de distancia abrió un virus de Excel en su computadora.

El SIEM (El cerebro del cuartel general de seguridad) es una máquina vacía. Si los servidores y las laptops corporativas no le envían datos voluntariamente, el Analista de Seguridad estará ciego. A este envío continuo de información se le llama **Telemetría**.

---

## 1. La Analogía: La Bodycam Policial

*   Imagina a un policía patrullando una ciudad a media noche.
*   Si ocurre un tiroteo y el policía no trae su radio, el Cuartel General no se entera de nada.
*   Por eso, la policía moderna inventó las **Bodycams** (Cámaras Corporales). La cámara graba cada palabra, cada rostro y cada acción, y transmite el video en vivo al Cuartel General.
*   Si algo sale mal, el Detective Forense puede rebobinar la cinta de la Bodycam y ver exactamente cómo ocurrieron los hechos.

En Ciberseguridad, la computadora del empleado de Finanzas es el policía patrullando. El agente de **Telemetría** es la Bodycam instalada en su pecho. El Cuartel General es el **SIEM**.

---

## 2. Windows Event Logs: La Bitácora del Barco

De fábrica, todas las computadoras con Windows ya tienen una libreta de notas integrada llamada **Windows Event Logs** (Visor de Eventos).
Cada vez que enciendes la computadora, Windows anota:
*   *"9:00 AM - El usuario Juanito inició sesión (Evento 4624)"*
*   *"9:05 AM - Juanito abrió Word.exe (Evento 4688)"*
*   *"9:06 AM - Juanito metió mal su contraseña (Evento 4625)"*

El problema es que Windows borra esta libreta cada pocos días para ahorrar espacio en el disco duro. Si el equipo Forense llega a investigar el hackeo 3 meses después, la libreta estará vacía. 

Por eso, el equipo de IT configura las laptops para que envíen (Log Forwarding) una copia de esta libreta, segundo a segundo, al SIEM gigante de la empresa. El SIEM nunca borra nada.

---

## 3. Sysmon: La Bodycam de Grado Militar

Los Event Logs de Windows son buenos, pero los hackers saben cómo evadirlos o borrarlos antes de que se envíen. Además, Windows no anota detalles profundos como *"¿A qué IP de internet se conectó Word.exe?"*.

Para atrapar Hackers avanzados, el *Blue Team* instala una herramienta legendaria y gratuita creada por Microsoft: **Sysmon (System Monitor)**.

Sysmon se inyecta directamente en el núcleo (Kernel) del sistema operativo. Funciona como una Bodycam indetectable y de altísima resolución.
Cuando el hacker lanza un ataque, Sysmon graba toda la evidencia destructiva:

1.  **Creación de Procesos (Event ID 1):** *"Excel.exe acaba de generar un hijo llamado PowerShell.exe"*. (La señal universal de que un ataque de *Fileless Malware* acaba de comenzar).
2.  **Conexiones de Red (Event ID 3):** *"PowerShell.exe acaba de iniciar una conexión de red hacia una dirección IP rusa en el puerto 443"*.
3.  **Archivos Creados (Event ID 11):** *"PowerShell.exe acaba de descargar y soltar un archivo llamado ransomware.exe en la carpeta temporal de Windows"*.

Cuando el SIEM (En el Cuartel General) recibe estas tres grabaciones de la Bodycam (Sysmon) provenientes de la laptop del empleado, hace sonar la Alarma Roja en la pantalla del Analista.

---

## 4. Criterio de Dominio (Autoevaluación)

Revisa si puedes darle visión al Blue Team:

1. Un Analista del SOC revisa su pantalla del SIEM y nota que no ha recibido ni un solo log de eventos de las laptops del departamento de Finanzas durante las últimas 48 horas. Usando la analogía de la Bodycam, explica qué significa este "Silencio de Telemetría" y por qué es una emergencia crítica.
2. ¿Por qué depender exclusivamente de la lectura de los "Event Logs" locales guardados en la laptop del usuario comprometido es una falla técnica durante una investigación de *Incident Response* o Forense? (Pista: Piensa en lo primero que hace un hacker profesional cuando obtiene permisos de Administrador).
3. ¿Cuál es la diferencia principal entre los Event Logs que vienen por defecto en Windows y la telemetría hiper-detallada que provee la herramienta avanzada **Sysmon**?
4. El SIEM levanta una alerta basada en la Telemetría (Sysmon Event ID 1): `powershell.exe -ExecutionPolicy Bypass -encodedCommand aW52b2tlLW1pbWlrYXR6...`. Como vimos en los módulos anteriores, ¿Por qué este simple evento (un programa legal ejecutando código ofuscado) es suficiente para que el Analista de Seguridad desconecte la máquina de la red inmediatamente?
