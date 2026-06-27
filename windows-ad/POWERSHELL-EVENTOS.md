---
title: "PowerShell y Eventos: Las Cámaras y el Misil"
---

# PowerShell y Eventos: Las Cámaras y el Misil

## Objetivo de esta Guía

Si las guías anteriores de este sitio trataban sobre la arquitectura y los componentes de Windows, esta guía trata sobre el combate cuerpo a cuerpo. Aquí cubrimos las dos herramientas que definen el día a día de un profesional de seguridad en entornos Windows: los registros de eventos (las cámaras de seguridad que graban todo lo que pasa) y PowerShell (el misil que tanto atacantes como defensores usan para hacer su trabajo).

No es coincidencia que ponga estas dos herramientas juntas. Son las dos caras de la misma moneda. Los atacantes usan PowerShell para moverse en silencio, y los defensores usan los registros de eventos para detectar ese movimiento. Entender ambas es entender el campo de batalla moderno de la ciberseguridad corporativa.

## Windows Event Log: El Sistema de Cámaras

Imagina que eres el jefe de seguridad de un edificio de 50 pisos. Has instalado 10,000 cámaras de seguridad. Cada cámara graba 24 horas al día, 7 días a la semana. Tienes una grabación de absolutamente todo lo que ocurre. El problema no es la falta de información. El problema es que hay tanta información que encontrar un evento específico (alguien entró a la oficina del CEO a las 3 AM) requiere saber exactamente qué buscar y dónde.

Windows Event Log es ese sistema de 10,000 cámaras. Cada acción del sistema genera uno o más eventos. Un evento puede ser "el usuario inició sesión", "se creó un proceso", "se instaló un servicio", "se modificó una clave del Registro". Windows 10 y Windows Server 2016+ generan fácilmente 40,000 eventos por día en una máquina corporativa típica. La mayoría son ruido. El arte del analista es filtrar el ruido y encontrar la señal.

### Sysmon: Las Cámaras de Alta Definición

El registro de eventos nativo de Windows es útil, pero limitado. Para investigaciones serias, los profesionales instalan Sysmon (System Monitor), una herramienta gratuita de Microsoft Sysinternals. Sysmon es un driver que se instala en el sistema y registra eventos mucho más detallados que los logs nativos:

- **Event ID 1 (Process Creation)**: Similar al 4688 pero con más detalles: hash del archivo (MD5, SHA1, SHA256), línea de comandos completa, proceso padre, GUID del proceso.
- **Event ID 3 (Network Connection)**: Registra cada conexión de red: IP origen y destino, puertos, protocolo, proceso que inició la conexión. Esto no existe en los logs nativos de Windows.
- **Event ID 7 (Image Loaded)**: Registra cada DLL que un proceso carga en memoria. Vital para detectar DLL hijacking.
- **Event ID 8 (CreateRemoteThread)**: Detecta inyección de hilos en procesos remotos, una técnica común de malware.
- **Event ID 11 (FileCreate)**: Registra la creación de archivos. Útil para detectar ransomware (creación masiva de archivos cifrados).
- **Event ID 13 (RegistryEvent)**: Modificaciones al Registro.

Sysmon convierte un sistema Windows ciego en uno con vigilancia HD. Su configuración (un archivo XML) decide qué eventos registrar. Una configuración bien hecha es el estándar de oro para la detección de amenazas en Windows.

### La Arquitectura del Registro de Eventos

Windows labura distinto que Linux con los logs. No son archivos de texto que puedes hacer cat. Son objetos XML con estructura.

A diferencia de Linux, donde los logs son archivos de texto en `/var/log`, Windows usa un sistema estructurado. Los eventos no son líneas de texto, son objetos XML con campos específicos. Cada evento tiene:

- **Event ID**: Un número que identifica el tipo de evento. 4624 = inicio de sesión exitoso. 4688 = nuevo proceso. 4104 = script de PowerShell ejecutado.
- **Source / Provider**: El componente que generó el evento (ej: "Microsoft-Windows-Security-Auditing", "PowerShell", "Service Control Manager").
- **Level**: La severidad (Información, Advertencia, Error, Crítico).
- **Task Category**: Una subcategoría dentro del provider (ej: "Creación de proceso", "Inicio de sesión").
- **User**: La cuenta que realizó la acción.
- **Computer**: El nombre de la máquina donde ocurrió.
- **Time Created**: La fecha y hora.
- **Data**: Campos específicos del evento, que varían según el Event ID.

La estructura XML permite búsquedas muy precisas. No buscas "inicio de sesión fallido" como texto. Buscas Event ID 4625 en el canal Security. Esto permite consultas estructuradas usando herramientas como `wevtutil`, `Get-WinEvent` en PowerShell, o sistemas SIEM que ingieren estos eventos.

### Canales de Eventos Principales

Windows organiza los eventos en canales (logs). Los principales que un profesional de seguridad debe conocer:

- **Security**: El más importante. Registra inicios de sesión, creación de procesos, cambios de política, acceso a objetos, y más. Este canal es el primero que los atacantes intentan limpiar.
- **System**: Eventos del sistema operativo y drivers: servicios que inician o fallan, cambios de hora, errores de disco.
- **Application**: Eventos de aplicaciones instaladas. Depende de cada aplicación.
- **PowerShell**: Contiene los eventos de Script Block Logging (4104) cuando está habilitado.
- **ForwardedEvents**: Eventos recolectados de otras máquinas mediante suscripciones de eventos.
- **Windows Defender / Windows Defender Operational**: Eventos de detección de malware, cuarentenas, escaneos.
- **TaskScheduler**: Eventos de tareas programadas, muy útil para detectar persistencia.

### Los Event IDs Críticos para Seguridad

No necesitas memorizar todos los Event IDs. Necesitas conocer los que aparecen en el 90% de las investigaciones. Los voy a agrupar por categoría.

#### Inicios de Sesión

- **4624 (Logon Success)**: Alguien inició sesión exitosamente. Los campos críticos aquí son `LogonType` (cómo se inició sesión) y `TargetUserSid` (quién). Los LogonTypes más importantes:
  - 2: Interactivo (el usuario escribió su contraseña en la pantalla).
  - 3: Red (conexión a un recurso compartido, como una carpeta de archivos).
  - 7: Desbloqueo (la máquina estaba bloqueada y el usuario la desbloqueó).
  - 9: NewCredentials (se usaron credenciales diferentes para la conexión de red, común en RunAs).
  - 10: RemoteInteractive (Inicio de sesión remoto por RDP).

  Un LogonType 3 desde una IP externa seguido de actividades anómalas es casi siempre un ataque. Un LogonType 10 a las 3 AM desde una IP desconocida también.

- **4625 (Logon Failure)**: Alguien intentó iniciar sesión y falló. Un evento 4625 aislado es normal (el usuario se equivocó de contraseña). Cientos de 4625 en segundos desde la misma IP es un ataque de fuerza bruta.

- **4634 (Logoff)**: Un usuario cerró sesión. Útil para determinar la duración de una sesión comprometida.

- **4647 (Inicio de apagado)**: Usuario inició el apagado del sistema. Algunos atacantes apagan máquinas para cubrir sus huellas.

- **4672 (Privilegios Especiales Asignados)**: Una cuenta recibió privilegios administrativos durante el inicio de sesión. Todo inicio de sesión de administrador genera este evento. Si ves un 4672 para una cuenta que normalmente no usa privilegios, investiga.

- **4648 (Inicio de sesión con credenciales explícitas)**: Alguien usó RunAs para ejecutar un programa como otro usuario. Si ves un 4648 donde un usuario ejecuta algo como "Administrator", puede ser un atacante usando credenciales robadas.

#### Creación de Procesos

- **4688 (Nuevo Proceso Creado)**: Se creó un proceso. Este evento es oro puro para la detección de ataques. Los campos críticos:
  - `CreatorProcessName`: El proceso padre (quién creó este proceso).
  - `NewProcessName`: El proceso creado.
  - `CommandLine`: La línea de comandos completa. Aquí se ven los ataques: `powershell -enc <base64>`, `cmd /c`, `rundll32.exe javascript:`.

  La detección se basa en patrones. `winword.exe` creando `cmd.exe` es malware. `svchost.exe` en una ruta que no es `C:\Windows\System32` es malware. Una línea de comandos que contiene `-enc` con base64 es el 99% de las veces un ataque.

- **4690 (Se intentó duplicar un identificador de objeto)**: Intento de duplicar un handle, a menudo usado en ataques de robo de tokens. Si ves muchos 4690 acompañados de 4688 sospechosos, estás viendo un ataque de inyección de procesos.

#### Acceso a Objetos

- **4663 (Acceso a un objeto)**: Alguien accedió a un archivo, carpeta, clave de Registro, o cualquier otro objeto. Muy ruidoso si está habilitado para todo, pero útil si se limita a objetos críticos como `ntds.dit` o el SAM.

- **4656 (Se abrió un identificador a un objeto)**: Similar al 4663 pero registra la apertura del objeto, no el acceso específico.

#### Cambios en Cuentas y Grupos

- **4720 (Cuenta de usuario creada)**: Alguien creó un nuevo usuario. Un atacante que crea una cuenta de backdoor genera este evento.
- **4728 (Miembro agregado a grupo global de seguridad)**: Alguien agregó un usuario a un grupo. Si el grupo es "Domain Admins" y el usuario no es el administrador legítimo, es un ataque.
- **4732 (Miembro agregado a grupo local de seguridad)**: Similar al anterior pero para grupos locales.
- **4740 (Cuenta bloqueada)**: Una cuenta fue bloqueada por demasiados intentos fallidos. Puede indicar un ataque de fuerza bruta o un atacante que ya tiene la contraseña pero prueba variaciones.

#### Cambios en Políticas

- **4719 (Política de auditoría del sistema cambiada)**: Alguien modificó la configuración de auditoría. Los atacantes cambian estas políticas para deshabilitar la auditoría y evitar ser detectados. Si ves un 4719, es una bandera roja inmediata.

#### Eventos de PowerShell

- **4103 (Pipeline de PowerShell)**: Registra la ejecución de comandos de PowerShell cuando Module Logging está habilitado. Captura el comando completo.
- **4104 (ScriptBlock)**: El más importante. Registra el contenido de cada script block ejecutado por PowerShell. Si el atacante ejecuta `powershell -enc <base64>`, el script block decodificado queda registrado aquí. Pero ojo: solo funciona si Script Block Logging está habilitado.
- **4105 y 4106**: Inicio y fin de ejecución de un script. Útiles para saber cuánto duró la ejecución.
- **53504**: Conexiones de PowerShell Remoting.

#### Eventos de Servicios

- **7036 (Cambio de estado de servicio)**: Un servicio inició, se detuvo, o cambió de estado. Los atacantes instalan servicios maliciosos y este evento lo registra.
- **7045 (Servicio nuevo instalado)**: Se instaló un nuevo servicio en el sistema. Esto es altamente sospechoso en un entorno normal, a menos que sea una instalación de software legítima.

#### Limpieza de Eventos

- **1102 (Registro de auditoría borrado)**: Alguien borró el registro de seguridad. Si ves este evento, es casi seguro que un atacante está cubriendo sus huellas. La ausencia de eventos durante un período de tiempo también es sospechosa (un atacante puede borrar eventos más antiguos pero mantener los actuales para no levantar sospechas).

### Políticas de Auditoría

Windows no registra todos los eventos por defecto. Muchos eventos críticos requieren políticas de auditoría explícitas. Hay dos niveles de política:

**Políticas Básicas (Audit Policy)**: Las configuraciones legacy que aún funcionan en Windows 10/Server. Accesibles desde `secpol.msc`.

**Políticas Avanzadas (Advanced Audit Policy)**: El sistema moderno, más granular. Se configuran como parte de las GPOs en `Computer Configuration > Windows Settings > Security Settings > Advanced Audit Policy Configuration`.

Las configuraciones recomendadas para un equipo de defensa:

- `Audit Logon`: Éxito y Fracaso.
- `Audit Process Creation`: Éxito (incluir línea de comandos mediante política adicional).
- `Audit Account Logon`: Éxito y Fracaso.
- `Audit Account Management`: Éxito y Fracaso.
- `Audit Directory Service Access`: Fracaso (para evitar ruido en aciertos normales).
- `Audit Policy Change`: Éxito y Fracaso.
- `Audit Privilege Use`: Fracaso (Éxito genera demasiado ruido).

### Modos de Falla del Registro de Eventos

**Tamaño Máximo del Log**: Por defecto, los logs tienen un tamaño máximo. Cuando se llenan, sobrescriben los eventos más antiguos. En un entorno con alta actividad, los logs pueden rotar en horas, perdiendo evidencia crítica. La configuración recomendada es aumentar el tamaño máximo y configurar el log para que se archive antes de sobrescribir.

**Log Deshabilitado**: Algunas instalaciones tienen ciertos logs deshabilitados por defecto. El log de PowerShell (Microsoft-Windows-PowerShell/Operational) debe habilitarse manualmente.

**Log Saturado de Ruido**: Un atacante puede generar eventos falsos para enterrar los reales. Por ejemplo, iniciar sesión cientos de veces con cuentas legítimas para que los eventos 4624 legítimos se mezclen con los de su ataque.

**Log Borrado**: Un atacante con privilegios puede borrar el log usando `wevtutil cl Security` o `Clear-EventLog`. La detección de esta acción es el evento 1102, pero si el atacante borra ese evento también... El visor de eventos no puede registrar su propio borrado.

**Desbordamiento del Disco**: Si el log crece sin control, puede llenar el disco y causar una denegación de servicio. Los atacantes aprovechan esto para forzar un reinicio o una caída del sistema.

### Event Tracing for Windows (ETW)

Debajo del sistema de Event Logs hay una capa más profunda: ETW (Event Tracing for Windows). ETW es un mecanismo de tracing a nivel de kernel que permite a las aplicaciones y al sistema operativo generar eventos de rendimiento y depuración con mínima sobrecarga. Los Event Logs que ves en el Visor de Eventos son solo la superficie: son eventos ETW que han sido capturados, estructurados y escritos en archivos .evtx.

Los atacantes conocen ETW y a veces intentan deshabilitarlo para evitar ser detectados. Un ataque avanzado puede usar una herramienta como `etw-explorer` o modificar el Registro para deshabilitar proveedores ETW específicos. Si ETW está deshabilitado, los eventos de seguridad no se generan, pero el sistema operativo sigue funcionando.

La detección de deshabilitación de ETW es difícil. Una técnica es monitorear el Event ID 4824 (deshabilitación del proveedor de auditoría) o usar herramientas de terceros que monitorean la integridad de ETW.

### Just Enough Administration (JEA)

JEA es una característica de PowerShell que permite delegar tareas administrativas específicas sin dar acceso completo a una cuenta privilegiada. Por ejemplo: puedes darle a un técnico de soporte la capacidad de reiniciar un servicio específico y leer logs de ese servicio, pero no la capacidad de ejecutar comandos arbitrarios como administrador.

JEA funciona creando "puntos finales" de PowerShell remoto que solo exponen cmdlets específicos. El usuario se conecta a ese punto final y solo puede ejecutar los comandos permitidos, actuando bajo una cuenta privilegiada temporal.

Desde la perspectiva de seguridad, JEA reduce el riesgo de que un atacante use una cuenta comprometida de soporte técnico para escalar privilegios. Pero JEA es complejo de configurar y mantener, por lo que pocas organizaciones lo implementan correctamente.

## PowerShell: El Misil Nuclear

PowerShell comenzó como un reemplazo moderno para `cmd.exe`. Microsoft quería una terminal que no diera vergüenza comparada con bash. Terminaron creando algo mucho más grande: un motor de automatización completo, orientado a objetos, integrado en el sistema operativo.

Lo que hace a PowerShell único es que trabaja con objetos .NET, no con texto. Cuando ejecutas `Get-Process` en Linux, obtienes texto. Cuando ejecutas `Get-Process` en PowerShell, obtienes un objeto Process con propiedades como `.Name`, `.Id`, `.CPU`, `.StartTime`. Puedes filtrar, ordenar, y manipular estos objetos de formas que son imposibles con texto plano.

### Cómo los Administradores Usan PowerShell

Un administrador de TI puede hacer en 5 líneas de PowerShell lo que antes tomaba horas con clics. Ejemplos reales:

```powershell
# Encontrar todas las cuentas de usuario inactivas en AD
Search-ADAccount -AccountInactive -TimeSpan 90:00:00:00 -UsersOnly | Disable-ADAccount

# Listar todos los miembros del grupo Domain Admins
Get-ADGroupMember -Identity "Domain Admins"

# Buscar eventos de inicio de sesión fallidos en las últimas 24 horas
Get-WinEvent -FilterHashtable @{LogName='Security'; ID=4625; StartTime=(Get-Date).AddDays(-1)}
```

Estos comandos son legítimos y necesarios para la administración diaria. Pero un atacante puede usar los mismos comandos para reconocimiento y ataque. Esa dualidad es lo que hace a PowerShell tan peligroso.

### PowerShell Remoting (WinRM)

PowerShell Remoting permite ejecutar comandos en máquinas remotas usando WinRM (Windows Remote Management) en el puerto 5985 (HTTP) o 5986 (HTTPS). Es equivalente a SSH pero para Windows.

```powershell
# Ejecutar un comando en una máquina remota
Invoke-Command -ComputerName SERVER01 -ScriptBlock { Get-Service | Where-Object Status -eq 'Running' }
```

Para un atacante, WinRM es un sueño. Una vez que tiene credenciales de un administrador, puede ejecutar comandos en cualquier máquina que tenga WinRM habilitado (prácticamente todas las máquinas modernas del dominio). Es movimiento lateral limpio, rápido, y legítimo desde la perspectiva de la red.

La detección de PowerShell Remoting se basa en el Event ID 53504 y en patrones de conexión a puertos 5985/5986.

### Características de Seguridad de PowerShell

Microsoft ha agregado múltiples capas de seguridad a PowerShell para frustrar a los atacantes. Cada una tiene limitaciones y formas de evasión.

#### Execution Policy

La Execution Policy controla qué scripts pueden ejecutarse. No es un mecanismo de seguridad real (es más una "señal de alto" que un muro). Los valores principales:

- `Restricted`: No se pueden ejecutar scripts (solo comandos interactivos).
- `AllSigned`: Solo scripts firmados por un editor de confianza.
- `RemoteSigned`: Scripts descargados de internet deben estar firmados.
- `Unrestricted`: Todos los scripts se ejecutan.

La evasión es trivial: cualquier atacante conoce `powershell -ExecutionPolicy Bypass`, que ignora la política para la sesión actual. O puede ejecutar un script como un comando en línea: `powershell -Command "& { ... }"`.

#### AMSI (Antimalware Scan Interface)

AMSI es una interfaz que permite a las aplicaciones (incluyendo PowerShell) enviar contenido a un antivirus o antimalware para su análisis antes de ejecutarlo. Cuando PowerShell va a ejecutar un script, lo envía a AMSI. Si el antivirus lo detecta como malicioso, PowerShell bloquea la ejecución.

AMSI ha frustrado muchos ataques, pero los atacantes han desarrollado técnicas para evadirlo:

- **Ofuscación**: El script malicioso se ofusca para que no coincida con las firmas del antivirus. Ejemplo: reemplazar `Invoke-Mimikatz` por `Invoke-Mimik$([char]97)tz`.
- **AMSI Bypass**: Técnicas que modifican la memoria de AMSI para deshabilitarlo. El bypass más famoso: `[Ref].Assembly.GetType('System.Management.Automation.AmsiUtils').GetField('amsiInitFailed','NonPublic,Static').SetValue($null,$true)`.
- **Downgrade Attack**: Forzar a PowerShell a usar una versión anterior (v2) que no tiene soporte para AMSI. El comando: `powershell -Version 2`.

#### Constrained Language Mode (CLM)

Constrained Language Mode restringe PowerShell a un subconjunto seguro del lenguaje. Solo permite cmdlets básicos, tipos de datos limitados, y no permite llamadas a APIs de .NET. Está diseñado para evitar que los atacantes ejecuten código arbitrario.

Los administradores configuran CLM mediante GPO para cuentas sin privilegios. Sin embargo, hay técnicas conocidas para escapar de CLM si el atacante puede ejecutar código en el contexto de una cuenta con privilegios (que normalmente no tienen CLM).

#### Script Block Logging (Event 4104)

Cuando está habilitado (mediante GPO), PowerShell registra el contenido de cada script block que se ejecuta. El registro incluye el código completo, incluso si está ofuscado. La ofuscación se registra antes de ser ejecutada, y el registro captura la versión ofuscada. Pero hay esperanza: PowerShell también registra el script block "desofuscado" después de la expansión de variables en muchos casos.

La configuración recomendada es:

1. Habilitar Script Block Logging para todos los usuarios y computadoras.
2. Habilitar el registro de invocación de scripts (que registra el inicio y fin de cada script).
3. Configurar el tamaño del log de PowerShell para que sea suficientemente grande.
4. Centralizar los logs en un SIEM para evitar que un atacante los borre localmente.

#### Transcription

La transcripción (transcription) registra toda la salida de una sesión de PowerShell en un archivo de texto. Es útil para auditoría forense porque captura tanto los comandos como la salida. Se habilita mediante GPO y escribe archivos en una ubicación centralizada.

#### Module Logging

Module Logging registra el pipeline de ejecución para módulos específicos. Es más detallado que Script Block Logging para ciertos cmdlets. Combinado con Script Block Logging, proporciona una cobertura casi completa de la actividad de PowerShell.

### Ataques Fileless

El concepto de "malware sin archivos" (fileless) no significa que no haya malware. Significa que el malware nunca toca el disco duro como un archivo ejecutable. Todo ocurre en memoria. Esto evita la detección de antivirus tradicionales que escanean archivos en el disco.

#### El Flujo de un Ataque Fileless

1. El atacante envía un correo de phishing con un documento de Word o Excel.
2. El documento contiene una macro VBA maliciosa.
3. Cuando la víctima abre el documento, la macro ejecuta un comando de PowerShell:
   ```powershell
   powershell -NoP -NonI -W Hidden -Exec Bypass -Enc <base64_blob>
   ```
4. PowerShell descifra el base64, que contiene un script que se carga directamente en memoria.
5. El script se conecta a un servidor C2 (Command and Control) y descarga una carga útil directamente en memoria.
6. La carga útil (por ejemplo, un keylogger o un ransomware) se ejecuta sin escribir ningún archivo en el disco.

#### Técnicas de Ofuscación en PowerShell

Los atacantes invierten mucho esfuerzo en ofuscar sus scripts de PowerShell para evadir AMSI y las firmas de antivirus. Técnicas comunes:

- **Encoding**: El script completo se codifica en base64. El comando `-Enc` acepta base64 directamente.
- **Compresión**: El script se comprime y se descomprime en memoria. El script visible es solo un cargador.
- **División de cadenas**: Las cadenas maliciosas se dividen y concatenan para evitar detección por patrón.
- **Reemplazo de caracteres**: Se usan `$()` y cálculos para construir cadenas: `$([char]68)$([char]97)$([char]118)$([char]105)$([char]100)` forma "David".
- **Variables con nombres aleatorios**: Las variables tienen nombres que cambian cada ejecución.
- **Invocación indirecta**: Usar `& (Get-Command ...)` en lugar de invocar cmdlets directamente.

#### Detección de Ataques Fileless

La detección de fileless se basa en:

- Event ID 4688 con línea de comandos sospechosa: `powershell -enc`, `-Exec Bypass`, `-WindowStyle Hidden`.
- Event ID 4104 con contenido de script block sospechoso.
- Conexiones de red a IPs externas desde procesos de PowerShell.
- Análisis de comportamiento: un proceso de Office que inicia PowerShell es casi siempre malicioso.
- AMSI cuando logra detectar el payload antes de la ejecución.

### Herramientas de Ataque Basadas en PowerShell

Varios frameworks de ataque usan PowerShell como vehículo principal:

- **PowerSploit**: Una colección de módulos de PowerShell para todas las fases de un ataque: reconocimiento, escalada, persistencia, exfiltración.
- **Empire**: Un framework post-explotación que usa PowerShell para los agentes (listeners) y módulos.
- **Cobalt Strike**: La herramienta comercial de los equipos rojos. Su payload por defecto usa PowerShell `-stager` que carga el Beacon en memoria.
- **Nishang**: Framework de PowerShell para ataques, incluyendo reverse shells, keyloggers, y recolección de credenciales.

Estas herramientas son conocidas por los defensores, y sus firmas están en AMSI y los antivirus. Por eso los atacantes invierten tanto en ofuscación personalizada.

### El Ángulo del Defensor: PowerShell para Caza de Amenazas

PowerShell no es solo para atacantes. Es la herramienta principal de los defensores en entornos Windows. Aquí hay algunos usos defensivos:

```powershell
# Buscar eventos de creación de procesos sospechosos
Get-WinEvent -FilterHashtable @{LogName='Security'; ID=4688} |
    Where-Object { $_.Properties[5].Value -match '-enc' -or $_.Properties[5].Value -match '-WindowStyle Hidden' }

# Buscar cambios en cuentas privilegiadas
Get-WinEvent -FilterHashtable @{LogName='Security'; ID=4728,4732,4756} -MaxEvents 100

# Verificar el estado de servicios críticos
Get-Service -Name Spooler, WinRM, W3SVC | Select Name, Status, StartType

# Analizar conexiones de red desde máquinas
Get-NetTCPConnection | Where-Object State -eq 'Established'

# Obtener información de usuarios conectados a una máquina
Get-WmiObject -Class Win32_ComputerSystem | Select UserName
```

### Modos de Falla de las Defensas de PowerShell

**Script Block Logging Deshabilitado**: La mayoría de las organizaciones no tienen habilitado Script Block Logging. Sin él, los ataques fileless son prácticamente invisibles en los logs.

**Log Local vs Centralizado**: Si los logs de PowerShell solo existen localmente en la máquina comprometida, un atacante puede borrarlos después del ataque. La centralización en un SIEM es crítica.

**AMSI No Actualizado**: AMSI depende de las firmas de los antivirus. Si el antivirus no está actualizado, las firmas no detectarán los scripts ofuscados más recientes.

**PowerShell v2 Instalado**: Windows incluye PowerShell v2 por defecto. Los atacantes pueden forzar el downgrade a v2, que no tiene Script Block Logging, AMSI, ni Constrained Language Mode. La mitigación es desinstalar PowerShell v2.

**Logs Saturados**: Un atacante puede ejecutar miles de scripts inofensivos para llenar los logs de PowerShell, forzando la sobrescritura de los eventos maliciosos.

**Ejecución en Memoria sin Logging de Procesos**: Sin la política "Include Command Line in Process Creation Events" (que agrega la línea de comandos al Event 4688), PowerShell ejecutándose con `-Enc` no deja rastro en la línea de comandos.

## El Ángulo del Hacker en Eventos y PowerShell

### Evasión de Eventos

Los atacantes tienen varias estrategias para evitar dejar rastros en los Event Logs:

1. **Deshabilitar la auditoría**: Si tienen privilegios, modifican las políticas de auditoría para deshabilitar eventos específicos. El Event ID 4719 registra este cambio, pero si deshabilitan la auditoría antes, el cambio mismo no se registra.

2. **Borrar logs selectivamente**: Usan `wevtutil` para borrar logs específicos: `wevtutil cl Security`. Algunos atacantes más sofisticados usan APIs de Windows para borrar eventos individuales en lugar de todo el log.

3. **Sobrescribir eventos**: Generan eventos legítimos para empujar los eventos maliciosos fuera del log.

4. **Desconexión del SIEM**: Si la máquina está comprometida, el atacante puede detener el servicio que envía eventos al SIEM (como WinRM o el agente de recolección). La falta de latidos (heartbeats) debería alertar al equipo de seguridad, pero no siempre es monitoreado.

### Uso Ofensivo de PowerShell

El flujo ofensivo típico:

1. **Delivery**: El atacante entrega un payload inicial (macro de Office, enlace de phishing, exploit de navegador).
2. **Staging**: El payload ejecuta un comando de PowerShell que descarga el siguiente stage en memoria.
3. **Reconocimiento**: El atacante usa cmdlets de PowerShell para mapear el dominio: `Get-ADUser`, `Get-ADGroup`, `Get-ADComputer`.
4. **Credential Access**: Ejecuta Mimikatz a través de PowerShell para extraer credenciales de la memoria.
5. **Lateral Movement**: Usa `Invoke-Command` o `Enter-PSSession` para saltar a otras máquinas.
6. **Persistence**: Instala un servicio o tarea programada usando PowerShell.
7. **Exfiltration**: Comprime y envía datos mediante `Invoke-WebRequest` o `System.Net.WebClient`.

### Centralización de Logs

Un principio fundamental de la seguridad de eventos es que los logs locales no son confiables. Si un atacante compromete una máquina con privilegios de administrador, puede modificar o borrar los logs locales. La solución es centralizar los logs en un servidor remoto que el atacante no controla.

Windows ofrece varias formas de centralizar logs:

- **Windows Event Forwarding (WEF)**: Los equipos cliente envían eventos a un recolector central usando el protocolo WinRM. La configuración se hace mediante GPO.
- **Syslog**: Mediante herramientas de terceros, los eventos de Windows se envían a servidores Syslog (como rsyslog en Linux).
- **SIEM**: Agentes especializados (Splunk Universal Forwarder, Elastic Beats, Wazuh) leen los logs locales y los envían a un servidor central de análisis.

La centralización permite:
- Detectar la limpieza de logs local: si un ataque borra los logs de una máquina, el SIEM ya tiene los eventos originales.
- Correlación entre máquinas: un inicio de sesión desde la Máquina A hacia la Máquina B puede ser un ataque de movimiento lateral si no es un patrón normal.
- Retención a largo plazo: los logs locales se rotan, pero el SIEM puede almacenar meses o años de datos.

### Cómo los Atacantes Detectan la Auditoría

Antes de ejecutar un ataque, los atacantes a veces verifican si la auditoría está habilitada:

```powershell
# Verificar políticas de auditoría actuales
auditpol /get /category:*

# Verificar si Script Block Logging está habilitado
(Get-ItemProperty -Path "HKLM:\Software\Policies\Microsoft\Windows\PowerShell\ScriptBlockLogging").EnableScriptBlockLogging
```

Si detectan que la auditoría está habilitada, pueden optar por técnicas más sigilosas o deshabilitarla si tienen privilegios.

## Criterio de Dominio: Autoevaluación

Estas preguntas asumen que no solo leíste esta guía, sino que puedes conectar los conceptos con situaciones reales de ataque y defensa.

### Preguntas Conceptuales

1. Estás revisando los Event Logs de una máquina corporativa y encuentras la siguiente secuencia: Event 4624 (LogonType 3) desde una IP interna desconocida, seguido de 50 eventos 4688 donde el proceso padre es `svchost.exe` y el proceso hijo es `powershell.exe` con argumentos que contienen `-enc`. ¿Qué está ocurriendo exactamente? Describe el ataque y qué otros eventos buscarías para confirmar.

2. Un atacante ejecuta un script de PowerShell ofuscado que descarga Mimikatz en memoria y extrae credenciales. Si Script Block Logging está habilitado, ¿qué información queda registrada en el Event 4104? ¿El script ofuscado o el decodificado? Explica por qué esto importa para la investigación forense.

3. El equipo de seguridad recibe una alerta de AMSI que bloqueó un script malicioso. Sin embargo, la máquina comprometida fue restaurada desde un backup de 3 meses atrás y PowerShell v2 está instalado. Explica cómo un atacante podría evadir AMSI usando este detalle de configuración. ¿Qué política de GPO agregarías para mitigar esto?

4. Durante una investigación, encuentras que el archivo de log Security.evtx está vacío. No hay eventos entre las 2:00 AM y las 5:00 AM, pero antes y después de ese período hay eventos normales. ¿Qué posibilidades explican esta brecha? ¿Hay un Event ID que indique borrado de logs? ¿Qué harías si ese Event ID también falta?

5. Un analista junior te dice: "La Execution Policy está en Restricted, así que no pueden ejecutar scripts maliciosos de PowerShell". Explica por qué esta afirmación es incorrecta y menciona al menos tres formas en que un atacante podría ejecutar código de PowerShell a pesar de Restricted.

6. Compara Script Block Logging (4104) con Module Logging (4103). ¿Qué captura cada uno que el otro no captura? ¿En qué escenario uno es superior al otro? ¿Por qué se recomienda habilitar ambos?

7. Un atacante compromete una máquina y ejecuta `wevtutil cl Security`. ¿Qué evento registra Windows cuando se borra el log de seguridad? Si el atacante ejecuta el comando con privilegios de SYSTEM y como parte de un script de PowerShell que se borra a sí mismo, ¿qué rastros quedan?

### Preguntas de Escenario

8. Tienes acceso remoto a una máquina Windows y necesitas determinar si un usuario específico inició sesión en las últimas 24 horas. ¿Qué cmdlet de PowerShell usarías? ¿Qué Event ID buscarías? ¿Cómo distinguirías entre un inicio de sesión interactivo (físico) y uno remoto (RDP) usando los campos del evento?

9. Explica por qué un atacante prefiere usar `Invoke-Command` para movimiento lateral en lugar de PsExec. ¿Qué evento de seguridad genera cada herramienta? ¿Cuál de los dos es más detectable en la red y en los logs locales?

10. Tu organización está configurando un SIEM para centralizar logs de Windows. ¿Qué canales de eventos habilitarías y con qué tamaños máximos? Justifica cada elección basándote en los costos de almacenamiento versus el valor de detección.

11. Durante un ejercicio de Red Team, detectas que Sysmon Event ID 3 (Network Connection) muestra que un proceso PowerShell se conectó a una IP externa en el puerto 443, pero el tráfico parece ser HTTPS normal. Sin embargo, el Event ID 4104 muestra que se ejecutó un script block que contiene la función `Invoke-Mimikatz`. Explica cómo encajan estas piezas. ¿Por qué el atacante usa HTTPS si ya está dentro de la red? ¿Qué técnica de C2 está usando?

12. Configuras Windows Event Forwarding para centralizar logs de seguridad. Sin embargo, el recolector central recibe eventos de 100 máquinas, y notas que algunas máquinas dejan de enviar eventos durante períodos de 2-3 horas. Al investigar, descubres que esas máquinas estaban encendidas pero el servicio de Windows Event Forwarding se había detenido. ¿Cómo detectarías automáticamente esta falta de latidos? ¿Qué evento genera el servicio WEF al iniciar y al detenerse?

13. Un atacante conoce que ETW está habilitado en el sistema y que sus scripts serían registrados por Script Block Logging. Decide deshabilitar ETW antes de ejecutar su carga útil. Describe cómo podría hacerlo y qué rastros dejaría (o no dejaría) en los logs. Si los logs no muestran el ataque, ¿qué otra evidencia podrías buscar en el sistema?
