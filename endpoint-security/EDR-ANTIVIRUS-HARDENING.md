---
title: "Antivirus, EDR y Hardening: El Cadenero vs El Detective"
level: "intermedio"
content_type: "guia"
updated: "2026-06-29"
---

# Antivirus, EDR y Hardening: El Cadenero vs El Detective

## Objetivo de esta Guía

Distinguir antivirus, EDR y hardening por sus capacidades, telemetría y función defensiva, no por su precio.

Tener antivirus no demuestra que un incidente fuera imposible. La pregunta útil es qué controles existían, qué telemetría generaron y cómo respondió el equipo.

Las firmas siguen detectando amenazas conocidas, pero no cubren por sí solas comportamiento, abuso de herramientas legítimas ni técnicas nuevas. EDR y hardening añaden visibilidad y prevención, aunque tampoco garantizan detener todo ataque.

## La Analogía

Para entender las diferencias entre Antivirus, EDR y Hardening, imagina que la computadora de tu empresa es una discoteca de lujo.

- **Antivirus Tradicional:** Es un cadenero parado en la puerta principal. Tiene una hoja de papel con las fotos de los criminales más buscados. Mira tu cara, compara con la lista, y si coinciden, te niega la entrada. Si no coinciden, te deja pasar sin importar lo que hagas adentro.

- **EDR:** Es un detective vestido de civil caminando dentro de la discoteca. No le importa tu cara ni tu nombre. Le importa tu comportamiento. Si entras vestido de traje pero sacas un cuchillo, te neutraliza al instante sin importar si tu cara esta en su lista.

- **Hardening:** Es la arquitectura del edificio: las puertas reforzadas, las salidas de emergencia selladas, la prohibición de meter botellas de vidrio. No importa quien seas ni como te comportes: las reglas físicas del edificio te limitan.

Ninguna de las tres capas funciona sola. Las empresas más seguras usan las tres en conjunto.

## Antivirus Tradicional: Detección por Firmas

El Antivirus que conoces desde los 90 (McAfee, Norton, Avast, Defender clásico) funciona bajo una tecnología llamada Detección por Firmas.

Cada vez que se descubre un virus en el mundo, la empresa de antivirus le calcula su huella digital única: un Hash MD5 o SHA1. Añade esa huella a una base de datos gigante que se descarga a tu computadora cada vez que actualizas el antivirus.

Cuando tu abres un archivo `.exe`, el antivirus calcula su Hash en el acto y lo compara contra su base de datos de "malos". Si el Hash coincide, lo elimina.

### La Debilidad Fatal de la Firma

el hash cambia al modificar un solo bit. Es como si el antivirus buscará a un ladrón por el color de su campera, y el ladrón se cambiará la campera cada 5 minutos.

El problema es que modificar el Hash de un archivo es trivial para un atacante. Cambiar un solo bit del archivo produce un Hash completamente diferente. Los hackers tienen herramientas automáticas llamadas "crypter" o "packer" que ofuscan el malware:

1. Toman el virus original (ej. `ransomware.exe` con Hash `A123`).
2. Le añaden una capa de compresión o encriptación (packing).
3. El resultado es un archivo nuevo con Hash `B456`.
4. La base de datos del antivirus no contiene `B456`.
5. El antivirus deja pasar el archivo sin problemas.

A esto se le llama un ataque Zero-Day desde la perspectiva del antivirus: una variante de malware que la lista de firmas aún no conoce. El virus no es nuevo en el sentido estricto (el código malicioso es el mismo), pero su apariencia es nueva.

### Fileless Malware: El Fin del Antivirus Clásico

Existe una categoría de ataque que vuelve al antivirus tradicional completamente inútil: el Fileless Malware.

En lugar de escribir un archivo `.exe` en el disco duro (donde el antivirus puede escanearlo), el fileless malware opera directamente en la memoria RAM. Puede:

- Inyectarse en procesos legítimos como `explorer.exe` o `svchost.exe`.
- Ejecutarse a través de macros de Office sin tocar el disco.
- Usar herramientas nativas de Windows como PowerShell, WMI o .NET para ejecutar código malicioso.

Como no hay un archivo físico que escanear, el antivirus basado en firmas no tiene nada que comparar. El atacante ya esta dentro y el antivirus no se entera.

## EDR: Detección por Comportamiento

Para corregir el error del cadenero, la industria inventó el EDR (Endpoint Detection and Response). Ejemplos: CrowdStrike Falcon, SentinelOne, Microsoft Defender for Endpoint, Carbon Black.

El EDR no se para en la puerta. Se instala dentro del sistema operativo y monitorea constantemente el comportamiento de cada proceso en la memoria RAM.

### Como Detecta el EDR

El EDR utiliza múltiples técnicas simultáneas:

1. **Análisis de Comportamiento (Behavioral Analysis):** Observa secuencias de acciones que son anómalas. Por ejemplo, un proceso `word.exe` que de repente ejecuta `powershell.exe` es una señal de alerta clásica.

2. **Machine Learning:** Modelos entrenados con millones de muestras de malware que pueden identificar patrones maliciosos incluso en variantes nunca antes vistas.

3. **Indicadores de Ataque (IoA):** A diferencia de los IoC (Indicadores de Compromiso) que buscan "que" (archivos malos), los IoA buscan "como" (técnicas MITRE ATT&CK).

4. **Detección de Procesos Encadenados:** Monitorea el árbol de procesos. Si `outlook.exe` ejecuta `cmd.exe`, que a su vez ejecuta `powershell.exe`, que se conecta a una IP externa, cada paso es una alerta progresiva.

### El Caso Técnico Clásico

Un usuario de contabilidad abre Microsoft Excel (un programa legal y confiable). El EDR no hace nada.

Pero ese mismo Excel intenta ejecutar una consola de PowerShell oculta. El EDR detecta que Excel esta generando un proceso hijo (PowerShell), lo cual es extremadamente raro. El EDR bloquea a PowerShell antes de que ejecute cualquier comando.

Luego, el EDR aísla la computadora de la red automáticamente (Network Isolation). El usuario ve un mensaje: "Su computadora ha sido puesta en cuarentena por actividad sospechosa. Contacte al departamento de TI."

El ataque fue detenido en menos de 500 milisegundos, mucho antes de que el ransomware pudiera encriptar algún archivo.

### Las Firmas Sigma en el EDR

Las reglas SIGMA (vistas en la guía de Detección) son el equivalente en YARA para logs. Se escriben en formato YAML y describen patrones de comportamiento en los logs del sistema.

Un EDR moderno permite importar reglas SIGMA personalizadas. Ejemplo de una regla:

```yaml
title: PowerShell Encoded Command
detection:
  selection:
    EventID: 1
    CommandLine|contains: '-EncodedCommand'
  condition: selection
```

Esta regla detecta cualquier proceso PowerShell que use el parámetro `-EncodedCommand`, una técnica común para ofuscar comandos maliciosos. El EDR ejecuta esta regla en tiempo real.

## Hardening: Cerrar las Ventanas

Incluso con el mejor EDR, dejar que los usuarios hagan lo que quieran es suicidio. Ahí entra el Hardening: endurecimiento del sistema operativo.

### Principio del Menor Privilegio

El mínimo privilegio reduce el impacto de gran parte del malware porque limita los cambios que puede realizar el proceso comprometido. El ransomware necesita permisos elevados para:

- Modificar el registro de Windows.
- Deshabilitar el antivirus.
- Encriptar archivos del sistema.
- Borrar los Shadow Copies (para impedir la recuperación).

Si el usuario opera como usuario estándar (sin permisos de Admin), el ransomware solo puede encriptar los archivos del perfil del usuario. Los archivos del sistema y del resto de la red permanecen intactos.

### Políticas de Restricción de Software (AppLocker)

AppLocker permite definir exactamente que ejecutables pueden correr en las computadoras corporativas. Se configura por GPO (Group Policy Object):

- Permitir solo ejecutables firmados por Microsoft.
- Bloquear la ejecución desde carpetas temporales (%TEMP%, %APPDATA%).
- Bloquear scripts no firmados.

Si un empleado descarga `factura.pdf.exe` y le da doble clic, AppLocker lo bloquea aunque el EDR no lo haya detectado aún. Es una capa de defensa previa.

### Deshabilitacion de Puertos USB

Los ataques de "USB Drop" son clásicos del Red Team: dejar memorias USB infectadas en el estacionamiento. Cuando un empleado curioso las conecta, el sistema ejecuta automáticamente el malware.

Las políticas de Hardening incluyen:

- Deshabilitar puertos USB mediante GPO.
- Permitir solo dispositivos USB autorizados (whitelisting por hardware ID).
- Cifrar todas las unidades USB corporativas con BitLocker To Go.

### Reducción de la Superficie de Ataque

Cada programa instalado es un potencial agujero de seguridad. Microsoft publica recomendaciones de Attack Surface Reduction (ASR) que incluyen:

- Bloquear macros de Office ejecutadas desde Internet.
- Bloquear la creación de procesos hijos en aplicaciones de Office.
- Bloquear llamadas a la API de Windows desde ejecutables sospechosos.

## Casos Reales

### El Ataque que CrowdStrike Detuvo en Tiempo Real (2016)

Durante las elecciones de Estados Unidos en 2016, el equipo de seguridad del Comité Nacional Democrático (DNC) tenía CrowdStrike instalado. CrowdStrike detecto actividad anómala: procesos de Windows que establecían conexiones salientes hacia servidores en Rusia.

El EDR pudo rastrear la cadena completa del ataque:

1. Un correo de phishing con un enlace malicioso.
2. La descarga de un archivo comprimido.
3. La ejecución de PowerShell para establecer persistencia.
4. La conexión con servidores de comando y control (C2).

El EDR documento cada paso, lo que permitió a los investigadores atribuir el ataque al grupo Fancy Bear (APT28).

### El Fallo del Antivirus en NotPetya (2017)

En junio de 2017, el ransomware NotPetya se propago globalmente usando una vulnerabilidad de Windows (EternalBlue) y credenciales robadas.

Las empresas afectadas (Maersk, Merck, FedEx) tenían antivirus actualizados. Ninguno detuvo la propagación porque:

- NotPetya usaba técnicas de Living-off-the-Land (LotL): herramientas nativas de Windows.
- Se movía lateralmente usando WMI y PsExec en lugar de escribir archivos maliciosos en disco.
- No había una firma que detectar porque el malware se escondía en procesos legítimos.

Las empresas que sobrevivieron mejor fueron las que tenían EDR y políticas de Hardening (AppLocker, restricción de ejecución remota).

### SolarWinds y la Evasión de EDR (2020)

El ataque SolarWinds fue particularmente sofisticado porque el malware (Sunburst) fue firmado digitalmente con certificados robados de SolarWinds.

El malware:

- Esperaba 14 días antes de activarse (evadiendo sandboxes).
- Se comunicaba con C2 usando dominios que imitaban servicios legítimos.
- Usaba técnicas de ofuscación de tráfico HTTPS.

Algunos EDR detectaron la actividad anómala, pero las alertas se perdieron en el ruido. La lección fue que incluso el mejor EDR necesita un SOC humano que sepa interpretar las alertas.

### El Criptominero en Kubernetes (2018)

En 2018, atacantes encontraron un dashboard de Kubernetes expuesto sin autenticación en la infraestructura de Tesla. Usaron el API de Kubernetes para desplegar contenedores de minería de criptomonedas.

El EDR en los nodos worker detecto el alto consumo de CPU, pero no pudo detener la creación de contenedores porque el ataque se orquesto desde el API de Kubernetes, no desde el sistema operativo.

La lección: el EDR no es suficiente cuando el atacante opera en la capa de orquestación.

## Modos de Falla

### Falla 1: Exceso de Confianza en el EDR

Muchas empresas compran un EDR caro y asumen que están protegidas. El EDR es una herramienta, no una solución mágica. Sin personal que analice las alertas (SOC), el EDR es solo ruido.

### Falla 2: Hardening Sin Pruebas

Aplicar políticas de Hardening agresivas sin probarlas puede romper aplicaciones críticas. Ejemplo: bloquear PowerShell en todos los equipos puede impedir que el departamento de IT ejecute scripts de mantenimiento.

### Falla 3: Logs Sin Acción

El EDR genera miles de eventos por hora. Sin reglas de correlación y filtrado, el equipo de seguridad se ahoga en falsos positivos. Es mejor tener 10 alertas reales que 1,000 alertas ignoradas.

### Falla 4: Ignorar el Componente Humano

La mejor tecnología no detiene a un empleado que hace clic en todo. La concienciación y la simulación de phishing son tan importantes como el EDR.

## La Mirada del Hacker

Como atacante, mi objetivo no es enfrentarme al EDR. Mi objetivo es evadirlo.

### Evasión de EDR: EDR Telemetry Bypass

Los EDR dependen de fuentes de telemetría como:

- ETW (Event Tracing for Windows).
- Kernel callbacks.
- Minifilters del sistema de archivos.

Un atacante avanzado puede:

- Deshabilitar ETW mediante modificación del registro.
- Usar llamadas directas al kernel (Syscall) para evitar los hooks del EDR.
- Inyectar código en procesos que el EDR tiene en la lista blanca.

### Living-off-the-Land (LotL)

Como atacante, no necesito descargar herramientas externas. El sistema operativo ya tiene todo lo que necesito:

- `powershell.exe` para ejecución remota.
- `wmic.exe` para moverme lateralmente.
- `rundll32.exe` para cargar DLLs maliciosas.
- `certutil.exe` para descargar archivos desde internet.

Para el EDR, estos procesos son legítimos. Solo el análisis de comportamiento revela que algo esta mal.

### Pasar Desapercibido

Como atacante, conozco las reglas del EDR. Si se que el EDR alerta cuando Excel ejecuta PowerShell, voy a usar una técnica diferente: inyectar código directamente en Excel usando VBA y llamadas a la API de Windows.

Otra técnica: el "proc hollowing". Creo un proceso legítimo (ej. `svchost.exe`) en estado suspendido, reemplazo su memoria con mi código malicioso, y reanudo el proceso. Para el EDR, solo hay un `svchost.exe` ejecutándose.

### Timing Attacks

Se que los sandboxes (usados por EDR para análisis) ejecutan el archivo por 2-3 minutos. Mi malware incluye un retraso:

- No hacer nada por 10 minutos.
- Si detecta que se esta ejecutando en una máquina virtual (VM), apagarse.
- Solo activarse en horario laboral (9 AM - 6 PM) para parecer legítimo.

## Indicadores de Compromiso (IoC) vs Indicadores de Ataque (IoA)

El EDR introduce un cambio de paradigma en como pensamos la detección. En lugar de buscar "que" (el archivo malo), busca "como" (la técnica de ataque).

### Indicadores de Compromiso (IoC)

Son evidencias forenses de un ataque que ya ocurrió:
- Un hash SHA1 de un archivo malicioso.
- Una dirección IP de un servidor C2.
- Un nombre de dominio malicioso.
- Una ruta de archivo específica.

**Problema:** Los IoC son fáciles de cambiar para el atacante. Cambiar el hash de un archivo es trivial. Las IPs y dominios se rotan constantemente.

### Indicadores de Ataque (IoA)

Son patrones de comportamiento que indican un ataque en progreso, independientemente de los archivos específicos:
- Un proceso descendiente de otro proceso que no debería tener hijos (word.exe -> powershell.exe).
- Un proceso que se inyecta en otro proceso legítimo.
- Una modificación no autorizada del registro de Windows.
- Un acceso a un endpoint de metadatos de cloud desde una aplicación web.

**Ventaja:** Los IoA no dependen de conocer el malware específico. Detectan la técnica, no el archivo.

### Mapa MITRE ATT&CK

El MITRE ATT&CK framework categoriza las técnicas de ataque. Un EDR moderno mapea sus detecciones a este framework:

- **T1059.001:** PowerShell (detección de comandos ofuscados).
- **T1055.012:** Process Hollowing (detección de inyección de procesos).
- **T1003.001:** Credential Dumping (detección de Mimikatz).
- **T1021.006:** Windows Remote Management (detección de movimiento lateral).

Cada alerta del EDR incluye la referencia MITRE, lo que ayuda al analista a entender que fase del ataque esta viendo.

## EDR en la Nube: Cloud Workload Protection

El EDR tradicional protege laptops y servidores físicos. Pero los servidores en la nube (EC2, VM, Compute Engine) también necesitan protección. A esto se le llama CWPP (Cloud Workload Protection Platform).

### Desafíos del EDR en la Nube

Los servidores en la nube son efímeros: se crean y destruyen constantemente (auto-scaling). El EDR debe:

1. Instalarse automáticamente en nuevas instancias (bootstrapping).
2. Reportar a un tenant central independientemente de la región.
3. Manejar la rotación de IPs y nombres de host.
4. No interferir con el escalado automático.

### Agentes vs. Agentesless

- **EDR con Agente:** Se instala un software en cada servidor (CrowdStrike, SentinelOne). Mayor visibilidad pero consume recursos.
- **EDR Agentless:** Escanea los discos de las VMs desde afuera (Amazon GuardDuty, Azure Defender). Menos visibilidad en tiempo real pero sin consumo de recursos.

La mayoría de empresas usan ambos: agente en servidores críticos, agentless en servidores secundarios.

## Casos Reales Adicionales

### El Ransomware Ryuk y el Hardening (2019-2020)

Ryuk era un ransomware dirigido que atacaba grandes empresas. Los operadores de Ryuk pasaban semanas dentro de la red antes de activar el ransomware.

Técnicas usadas:
- Phishing para entrada inicial.
- PowerShell para movimiento lateral.
- PsExec para ejecución remota.
- Deshabilitacion de Windows Defender vía GPO.

Las empresas que sobrevivieron tenían:
- AppLocker bloqueando PowerShell para usuarios no administradores.
- EDR detectando movimiento lateral vía PsExec.
- Principio del Menor Privilegio aplicado a todas las cuentas.

### El Ataque a la Cadena de Suministro de Kaseya (2021)

Los atacantes comprometieron el software de gestión remota Kaseya VSA y usaron su actualización para distribuir el ransomware REvil a 1,500 empresas.

El EDR en los endpoints detecto el comportamiento anormal: un proceso legítimo (Kaseya) ejecutando PowerShell que descargaba y ejecutaba un archivo. Sin embargo, muchas empresas tenían al software de Kaseya en lista blanca (whitelisted) en el EDR, lo que permitió que el ataque pasará desapercibido.

La lección: incluso las aplicaciones de confianza deben monitorearse por comportamiento anómalo.

## Modos de Falla Adicionales

### Falla 5: Falsos Positivos que Cansan al SOC

Un EDR mal configurado genera miles de alertas diarias. El equipo se acostumbra al ruido y empieza a ignorar alertas. Cuando llega una alerta real, nadie la revisa.

Solución: tuning constante de reglas, uso de excepciones documentadas, y priorización por severidad.

### Falla 6: EDR Sin Conocimiento del Contexto

El EDR detecta que PowerShell se conecta a una IP externa. Pero no sabe si esa IP es un servicio legítimo (Azure, AWS) o malicioso. El contexto lo da el analista.

### Falla 7: No Probar el EDR Regularmente

Muchas empresas instalan el EDR y asumen que funciona. Sin pruebas regulares (simulaciones de ataque, Red Team), no saben si el EDR realmente detecta ataques o si hay brechas en la configuración.

Herramientas como Atomic Red Team permiten simular técnicas MITRE ATT&CK para verificar que el EDR las detecta.

## Respuesta Automatizada con EDR

Una vez que el EDR detecta una amenaza, debe responder. Los EDRs modernos incluyen capacidades de respuesta automática (EDR + XDR).

### Niveles de Respuesta

1. **Alerta:** Solo notifica al SOC. No toma acción automática. Riesgo de fatiga de alertas.

2. **Contención Automática:** Aísla el endpoint de la red automáticamente cuando se detecta una amenaza crítica. El usuario pierde conectividad pero el malware no puede propagarse.

3. **Remediación Automática:** Mata procesos maliciosos, elimina archivos, revierte cambios en el registro. Reduce el tiempo de respuesta de horas a segundos.

4. **Rollback Automático:** Revierte cambios hechos por ransomware (solo en algunos EDRs como SentinelOne). Restaura archivos encriptados a su estado original.

### Playbooks de Respuesta

El SOC define playbooks que el EDR ejecuta automáticamente:

```yaml
alerta: "Ransomware detectado"
acciones:
  - aislar_endpoint: true
  - matar_proceso: powershell.exe
  - eliminar_archivo: C:\Users\*\AppData\Local\Temp\*.exe
  - notificar_soc: true
  - crear_ticket: true
```

## Integración EDR + SIEM + SOAR

El EDR no opera en el vacío. Se integra con otras herramientas del SOC:

### EDR + SIEM

El EDR envía alertas al SIEM (Splunk, Elastic, Microsoft Sentinel) para:

- Correlación con otros eventos (firewall, DNS, VPN).
- Enriquecimiento con threat intelligence.
- Retención a largo plazo.
- Dashboards y reportes.

### EDR + SOAR

El SOAR (Security Orchestration, Automation and Response) orquesta la respuesta automática:

1. EDR detecta amenaza.
2. SOAR recibe la alerta.
3. SOAR ejecuta un playbook:
   - Consulta VirusTotal para enriquecer el IoC.
   - Bloquea la IP en el firewall.
   - Aísla el endpoint.
   - Crea un ticket en ServiceNow.
   - Envía un mensaje a Slack al equipo de respuesta.

### EDR + Threat Intelligence

El EDR se alimenta de feeds de threat intelligence para:

- Actualizar listas de IoCs (IPs, dominios, hashes).
- Identificar malware por comportamiento similar a ataques conocidos.
- Priorizar alertas basadas en la relevancia del IoC (ransomware vs adware).

## Caso de Estudio: Detección de Ransomware en Tiempo Real

Veamos como las tres capas trabajan juntas contra un ataque de ransomware:

**Paso 1: El correo de phishing**

Un empleado recibe un correo con un archivo Excel adjunto. El SEG (Secure Email Gateway) analiza el archivo en sandbox, pero el malware espera 15 minutos antes de activarse (evade el sandbox). El correo se entrega al empleado.

**Paso 2: El empleado abre el archivo**

Excel ejecuta una macro que descarga un archivo PowerShell ofuscado. El antivirus tradicional no detecta el archivo (es nuevo, sin firma).

**Paso 3: El EDR detecta la anomalía**

1. Event ID 1 de Sysmon: `excel.exe` ejecuta `powershell.exe` (anómalo).
2. Event ID 3 de Sysmon: `powershell.exe` se conecta a una IP desconocida.
3. Event ID 11 de Sysmon: `powershell.exe` descarga y escribe `ransomware.exe` en `%TEMP%`.

**Paso 4: El EDR responde**

1. Aísla el endpoint de la red.
2. Mata el proceso `powershell.exe` y `ransomware.exe`.
3. Elimina los archivos descargados.
4. Envía alerta al SIEM con todos los IoCs.

**Paso 5: Hardening previene la propagación**

Como el usuario no tiene permisos de administrador local, el ransomware no puede:

- Encriptar archivos del sistema.
- Deshabilitar el antivirus.
- Borrar los Shadow Copies.
- Propagarse a otros equipos vía SMB.

**Resultado:** El ataque fue detenido en menos de 1 segundo. Cero archivos encriptados. Cero downtime.

## Taxonomía de EDR: Que Mirar al Comprar

Si tu empresa va a comprar un EDR, estos son los criterios técnicos:

1. **Detección:** Que técnicas MITRE cubre? Tiene machine learning? Tiene detección de comportamiento?
2. **Respuesta:** Puede aislar endpoints automáticamente? Puede matar procesos? Puede revertir cambios?
3. **Rendimiento:** Cuanto CPU/RAM consume en el endpoint? Como afecta al arranque del sistema?
4. **Gestión en la Nube:** Tiene consola cloud? Como maneja múltiples tenant? Tiene API para automatización?
5. **Integraciones:** Se integra con tu SIEM? Con tu SOAR? Con tu ticketing system?
6. **Threat Hunting:** Permite búsquedas en vivo (Live Response)? Tiene capacidad de recolectar artefactos forenses?

## Autoevaluación

Responde estas preguntas para verificar si comprendes los conceptos:

1. El CEO de una empresa compró una licencia premium de un Antivirus Tradicional (basado en Firmas) para todas las laptops corporativas. Si un Hacker envía un correo con un archivo de Excel malicioso totalmente nuevo, creado esa misma mañana (Zero-Day), Por qué el Antivirus Tradicional dejará pasar el archivo sin lanzar ninguna alerta?

2. Explica la diferencia arquitectónica de enfoque entre un Antivirus Tradicional (Cadenero) y una plataforma EDR (Detective). Que observa uno y que observa el otro?

3. Sabiendo que el EDR monitorea el comportamiento de los procesos del sistema, Como utilizaría la industria las reglas SIGMA en combinación con el EDR de una computadora?

4. El proceso de Hardening corporativo exige quitarle los privilegios de Administrador local a todos los empleados sobre sus propias laptops. El equipo de Ventas se queja de que ahora tienen que llamar a Sistemas para poder instalar Spotify. Como justificas matemáticamente que esta medida drásticamente previene un ataque de Ransomware masivo?

5. Un atacante utiliza técnicas de Living-off-the-Land (usar herramientas nativas del sistema como PowerShell). Por qué el Antivirus tradicional no detecta esto, y como lo detectaría un EDR?

6. Durante el ataque NotPetya de 2017, muchas empresas con antivirus actualizado fueron infectadas. Que falla técnica del antivirus basado en firmas quedó expuesta en este ataque?

7. Un administrador aplica AppLocker para bloquear la ejecución desde carpetas temporales. Explica como esta política de Hardening detendría un ataque que descarga malware en `%TEMP%` y lo ejecuta.

8. La empresa implementa un EDR pero no tiene un equipo SOC dedicado. Cuáles son las consecuencias probables de esta decisión?
