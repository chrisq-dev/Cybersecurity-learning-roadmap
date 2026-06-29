---
title: "Procesos, Servicios y Logs: El Pulso de la Máquina"
level: "inicial"
content_type: "guia"
updated: "2026-06-29"
---

# Procesos, Servicios y Logs: El Pulso de la Máquina

## Objetivo de esta Guía

Un analista de seguridad o un administrador de sistemas pasa la mayor parte de su vida laboral mirando tres cosas: que esta vivo en la memoria RAM, que arranca automáticamente al encender el servidor, y que quedó escrito en las bitácoras.

Los procesos son los programas que están ejecutándose ahora mismo. Los servicios son procesos especiales que arrancan en segundo plano y se mantienen vivos independientemente de quien haya iniciado sesión. Los logs son el registro escrito de todo lo que ocurre en el sistema.

Esta guía conecta estos tres conceptos porque en seguridad no funcionan de forma aislada. Cuando investigas un incidente, sigues la cadena: el log te dice que paso, el proceso te dice que esta pasando ahora, y el servicio te dice que va a pasar cuando el sistema se reinicie.

Si no entiendes estas tres piezas, no puedes hacer respuesta a incidentes. No puedes detectar un minero de criptomonedas. No puedes encontrar un backdoor. No puedes saber si un ataque tuvo éxito.

## La Analogía: El Hospital con Pacientes, Doctores y Expedientes

Imagina un hospital. Es una analogía que funciona bien porque los tres elementos tienen paralelos claros.

Los **procesos** son los pacientes del hospital. Cada paciente ocupa una cama (memoria RAM), consume recursos (CPU), tiene un número de identificación único (PID), y puede estar en diferentes estados: activo, dormido, zombie. Cuando un paciente muere (el proceso termina), libera su cama para otro paciente.

Los **servicios** (o demonios) son los doctores del hospital. No son pacientes. No están ahí porque alguien los llamó. Están ahí porque son parte de la infraestructura del hospital. El doctor de guardia (el servidor web) esta disponible 24/7 para cuando llegue una emergencia (una petición HTTP). El doctor no necesita que alguien le de doble clic cada maniana. El sistema de turnos (systemd) lo activa automáticamente al iniciar el hospital.

Los **logs** son los expedientes médicos. Todo lo que pasa queda registrado: a que hora ingreso un paciente, que medicamentos se le administraron, si hubo complicaciones, quien autorizo cada procedimiento. Cuando algo sale mal, el director del hospital no adivina lo que paso. Lee los expedientes.

En seguridad, el paralelo es directo: cuando un servidor Linux es infectado, no verás un archivo gigante titulado "SOY-UN-VIRUS". Verás un proceso con un nombre sospechoso consumiendo CPU, o un servicio que no recuerdas haber instalado, o una entrada en los logs que muestra una conexión desde una IP extraña a las 3 AM.

## Procesos: Que Esta Vivo Ahora Mismo

Un proceso es cualquier programa que se esta ejecutando. No importa si es el navegador web, el servidor de base de datos, o un script malicioso de minería de criptomonedas. Todos son procesos.

Cada proceso tiene:
- **PID (Process ID):** Número único que identifica al proceso.
- **PPID (Parent Process ID):** PID del proceso que lo creo.
- **UID (User ID):** El usuario que ejecuta el proceso.
- **Estado:** Corriendo, dormido, zombie, detenido.
- **Uso de CPU y memoria:** Recursos que consume.
- **Nice value:** Prioridad de ejecución.

### El Árbol de Procesos

los procesos no existen en el vacio. Tienen padres, hijos, hermanos. Como una familia, pero con PIDs.

Los procesos en Linux tienen una relación jerárquica. El primer proceso que arranca el kernel (tradicionalmente `init`, hoy `systemd`) tiene PID 1. Todos los demás procesos descienden de el.

Cuando ejecutas un comando en la terminal, tu shell (bash, zsh) crea un proceso hijo para ejecutar ese comando. Cuando el comando termina, el proceso hijo muere y el shell recupera el control.

`pstree` muestra esta jerarquía en forma de árbol. Es útil para ver si un proceso sospechoso es hijo de un proceso legítimo o si parece estar huertano (lo que puede indicar un ataque).

### PID 1: systemd vs init

El proceso con PID 1 es el primero que arranca el kernel y es responsable de iniciar todos los demás servicios del sistema.

En sistemas Linux modernos, PID 1 es `systemd`. En sistemas más antiguos (o minimalistas), puede ser `init` (SysV init) o `runit`.

La migración de SysV init a systemd fue controvertida. systemd es más rápido, permite paralelizar el arranque de servicios, y ofrece características como dependency resolution, pero es más complejo y algunos lo consideran una violación de la filosofía Unix de "hacer una cosa y hacerla bien".

Para el profesional de seguridad, systemd ofrece ventajas: mejor registro de logs (journald), mejor aislamiento de servicios, y mejor control de dependencias.

### Procesos Zombie

Un proceso zombie es un proceso que ha terminado su ejecución pero su entrada en la tabla de procesos no ha sido eliminada porque el proceso padre no recolecto su código de salida.

Los zombies no consumen CPU ni memoria (ya terminaron), pero ocupan una entrada en la tabla de procesos, que es un recurso limitado. Si se acumulan demasiados zombies, el sistema no puede crear nuevos procesos.

Un atacante podría crear intencionalmente procesos zombie para agotar la tabla de procesos y causar una denegación de servicio. Pero es más común que los zombies aparezcan por errores de programación en el proceso padre.

### Procesos Huertanos

Un proceso huertano es un proceso cuyo padre ha terminado pero el hijo sigue ejecutándose. En Linux, los procesos huertanos son adoptados por el proceso init (PID 1).

Los atacantes a veces usan esto para desvincular su malware del proceso que lo lanzo. Por ejemplo, un exploit que compromete un servidor web (como `www-data`) puede ejecutar un payload que se desvincula del proceso padre y queda adoptado por init, haciendo más difícil rastrear el origen del ataque.

### Estados de un Proceso

Un proceso en Linux puede estar en varios estados:

- **R (Running o Runnable):** El proceso esta ejecutándose o listo para ejecutarse.
- **S (Sleeping):** El proceso esta esperando algún evento (una señal o E/S).
- **D (Uninterruptible Sleep):** El proceso esta esperando E/S directamente, no puede ser interrumpido ni con `kill -9`. Común cuando hay problemas de disco.
- **Z (Zombie):** El proceso terminó pero no fue recolectado.
- **T (Stopped):** El proceso fue detenido por una señal (Ctrl+Z).
- **X (Dead):** El proceso esta muerto y será eliminado pronto.

Un proceso en estado D por mucho tiempo puede indicar problemas con el almacenamiento (disco lento, NFS colgado, etc.).

## top y htop: Monitoreo en Tiempo Real

`top` es el comando clásico para ver los procesos en tiempo real. Muestra una pantalla que se actualiza cada pocos segundos con los procesos que más CPU y memoria están consumiendo.

### Lo que debes mirar en top

**Encabezado:** Muestra información del sistema: uptime, número de usuarios, carga del sistema (load average), y uso de CPU y memoria.

**Columnas:**
- PID: Identificador del proceso.
- USER: Usuario que ejecuta el proceso.
- PR/NI: Prioridad y nice value.
- VIRT/RES/SHR: Memoria virtual, residente y compartida.
- S: Estado del proceso.
- %CPU: Porcentaje de CPU que consume.
- %MEM: Porcentaje de memoria RAM que consume.
- TIME+: Tiempo total de CPU usado.
- COMMAND: Nombre del comando.

### Teclas utiles en top

- `1`: Muestra uso de CPU por núcleo.
- `M`: Ordena por uso de memoria.
- `P`: Ordena por uso de CPU.
- `k`: Mata un proceso (te pide el PID).
- `u`: Filtra por usuario.
- `q`: Salir.

### htop: La Versión Moderna

`htop` es una versión mejorada de `top`. No viene instalada por defecto en todas las distribuciones, pero es la primera herramienta que instalo en cualquier servidor que administro.

Diferencias con top:
- Interfaz a color.
- Puedes hacer scroll vertical y horizontal.
- Puedes matar procesos con la tecla F9 sin recordar el PID.
- Muestra el árbol de procesos con F5.
- Soporta seleccion multiple de procesos.

En htop, presta atención a los procesos que aparecen con colores rojos en la barra de CPU. Eso indica alto consumo, y en un servidor que debería estar mayormente inactivo, es una señal de alarma.

## ps: La Fotografía Instantanea

Mientras que `top` te muestra el estado actual en tiempo real, `ps` te da una foto estática de los procesos en un momento específico. Es útil para scripting y para búsquedas específicas.

### ps aux

`ps aux` muestra todos los procesos del sistema. Las columnas son similares a top pero en un formato que puedes procesar con pipes y grep.

`ps aux | grep "apache"` te muestra solo los procesos de Apache.

`ps aux | grep -v "grep"` elimina la línea del propio grep (un clásico error: cuando buscas un proceso con grep, la línea del grep aparece en los resultados).

### ps ef

`ps ef` muestra procesos con información detallada del árbol de procesos. `ps auxf` muestra la jerarquía en formato árbol.

### Procesos Ocultos

Un atacante avanzado puede ocultar procesos mediante:
- **Rootkits a nivel de kernel:** Modifican las funciones del kernel que reportan procesos, haciendo que `ps` y `top` no muestren ciertos procesos.
- **Modificación de /proc:** Eliminan la entrada del proceso en `/proc` o modifican sus metadatos.
- **Process name masquerading:** Ejecutan el malware con un nombre que imita a un proceso legítimo. Por ejemplo, ejecutar un minero de criptomonedas con el nombre `httpd` o `syslogd`.

Para detectar procesos ocultos:
- Comparar la salida de `ps` con la de `ls /proc/` (cada PID tiene una entrada en `/proc`). Si `ps` muestra menos procesos que `/proc`, hay ocultacion.
- Usar herramientas forenses como `unhide` o `chkrootkit`.

## Kill: Señales a los Procesos

`kill` envía señales a los procesos. No es solo para matarlos, aunque ese es su uso más común.

### Tipos de Señales

- `SIGTERM` (15): Pide al proceso que termine graciosamente. El proceso puede ignorarla o hacer limpieza antes de salir.
- `SIGKILL` (9): Fuerza la terminacion inmediata. El proceso no puede ignorarla ni hacer limpieza. Puede dejar archivos temporales o datos corruptos.
- `SIGHUP` (1): Originalmente para colgar la línea telefónica. Hoy muchos procesos la interpretan como recargar configuración.
- `SIGINT` (2): Interrupción (Ctrl+C).
- `SIGSTOP` (19): Detiene el proceso (como Ctrl+Z).
- `SIGCONT` (18): Reanuda un proceso detenido.

### Uso Práctico

`kill 1234`: Envía SIGTERM al proceso con PID 1234.
`kill -9 1234`: Mata forzosamente el proceso.
`kill -HUP $(cat /var/run/nginx.pid)`: Recarga la configuración de nginx sin detener el servicio.
`killall apache2`: Mata todos los procesos llamados "apache2".
`pkill -u usuario`: Mata todos los procesos de un usuario específico.

### Por qué kill -9 es el Último Recurso

`kill -9` no permite que el proceso haga limpieza. Archivos abiertos pueden quedar corruptos. Datos en buffers pueden perderse. Conexiones de red pueden quedar en estado incierto.

Siempre intenta `kill` (SIGTERM) primero. Si el proceso no responde, entonces usa `kill -9`.

En respuesta a incidentes, a veces es mejor no matar el proceso inmediatamente. Primero toma una imagen de la memoria del proceso para análisis forense (`gcore` o `dd de /proc/[PID]/mem`). Una vez que tienes la evidencia, entonces mata el proceso.

## nice y renice: Prioridades

Linux permite ajustar la prioridad con la que los procesos usan la CPU. El "nice value" va de -20 (máxima prioridad) a 19 (mínima prioridad).

`nice -n 10 comando`: Ejecuta el comando con prioridad baja.
`renice -n -5 -p 1234`: Cambia la prioridad del proceso 1234 a -5 (más prioridad).

Solo root puede asignar prioridades negativas (más prioridad). Un usuario normal solo puede reducir la prioridad de sus procesos (valores positivos), no aumentarla.

En seguridad, un atacante puede darle prioridad baja a su minero de criptomonedas para que no levante sospechas cuando el administrador ejecute `top`. Pero los procesos de baja prioridad aún consumen recursos, solo que se ejecutan cuando la CPU esta desocupada. Si el servidor tiene poca carga, el minero puede consumir toda la CPU disponible sin aparecer en los primeros puestos de `top`.

## Servicios: Los Procesos Persistentes

Un servicio (o demonio) es un proceso que se ejecuta en segundo plano, usualmente iniciado automáticamente por el sistema, y que proporciona alguna funcionalidad: servir páginas web, manejar conexiones SSH, gestionar la red, etc.

### systemd: El Sistema de Init Moderno

La mayoría de las distribuciones Linux modernas usan systemd como su sistema de init. systemd no solo inicia servicios; también gestiona dispositivos, monta sistemas de archivos, cronometra tareas, y más.

`systemctl` es el comando principal para interactuar con systemd.

#### Comandos Esenciales de systemctl

`systemctl status nombre-servicio`: Muestra el estado de un servicio, las últimas líneas de su log, y si esta activo o no.

`systemctl start nombre-servicio`: Inicia el servicio ahora.
`systemctl stop nombre-servicio`: Detiene el servicio ahora.
`systemctl restart nombre-servicio`: Detiene e inicia el servicio (útil después de cambios de configuración).
`systemctl reload nombre-servicio`: Recarga la configuración sin detener el servicio. Solo funciona si el servicio soporta recarga.

`systemctl enable nombre-servicio`: Configura el servicio para que arranque automáticamente al iniciar el sistema.
`systemctl disable nombre-servicio`: Configura el servicio para que NO arranque automáticamente.

`systemctl list-units --type=service --state=running`: Lista todos los servicios en ejecución.
`systemctl list-unit-files --state=enabled`: Lista todos los servicios configurados para arrancar automáticamente.

#### Ángulo Hacker: Persistencia via systemd

Un atacante que ha comprometido un servidor y quiere asegurarse de que su malware siga funcionando después de un reinicio crea un servicio systemd.

Paso 1: Crea un archivo `/etc/systemd/system/actualizacion.service` con contenido como:

```
[Unit]
Description=Actualizacion del sistema

[Service]
ExecStart=/tmp/.oculto/actualizador.sh
Restart=always

[Install]
WantedBy=multi-user.target
```

Paso 2: Habilita el servicio: `systemctl enable actualizacion.service`

Paso 3: Inicia el servicio: `systemctl start actualizacion.service`

Ahora el script malicioso se ejecutará automáticamente al arrancar el sistema. La directiva `Restart=always` asegura que si el administrador mata el proceso, systemd lo reiniciara automáticamente.

Para detectar estos servicios maliciosos, los administradores revisan periodicamente `systemctl list-unit-files --state=enabled` y comparan los servicios listados con una línea base de servicios conocidos.

Las herramientas de monitoreo de integridad de archivos (como AIDE, Tripwire, o Osquery) pueden alertar cuando se crea un nuevo archivo en `/etc/systemd/system/`.

#### Journald: El Sistema de Logs de systemd

systemd incluye `journald`, un sistema de logs que centraliza los mensajes de todos los servicios. A diferencia de los logs tradicionales en `/var/log`, journald almacena los logs en formato binario en `/var/log/journal/`.

`journalctl` es el comando para leer estos logs:

`journalctl -u nginx.service`: Muestra logs del servicio nginx.
`journalctl -u sshd.service --since "1 hour ago"`: Logs de SSH de la última hora.
`journalctl -u apache2.service -f`: Sigue los logs de Apache en tiempo real (como `tail -f`).
`journalctl --list-boots`: Lista los arranques del sistema. Puedes ver logs de arranques anteriores con `-b -1`.

journald tiene una ventaja para la investigación forense: los logs se almacenan en formato binario que no se puede modificar fácilmente con un editor de texto. Sin embargo, el atacante con privilegios root puede borrar el archivo completo del journal.

#### Tiempos de Arranque y Apagado

`journalctl --list-boots` es útil en investigaciones forenses. Si ves arranques del sistema que no corresponden a mantenimientos programados, puede indicar que un atacante reinicio el sistema (quizas para activar un kernel comprometido o para borrar evidencia en memoria).

### SysV init: El Sistema Antiguo

En sistemas sin systemd, los servicios se gestionan con scripts en `/etc/init.d/` y el comando `service`:

`service apache2 status`
`service apache2 start`
`service apache2 stop`
`update-rc.d apache2 enable` (equivalente a `systemctl enable`)

Aunque systemd es el estándar hoy, es posible que encuentres sistemas antiguos o minimalistas que usen SysV init. Saber ambos sistemas es útil.

### Servicios Sospechosos y Como Identificarlos

En una auditoría de seguridad, revisa:

1. `systemctl list-units --type=service --state=running`: Mira cada servicio. Si ves algo como "systemd-networkd-update" y no suena familiar, investiga.

2. `systemctl list-unit-files --type=service --state=enabled`: Identifica que servicios arrancan automáticamente. Compara con una línea base.

3. Revisa los scripts de inicio en `/etc/init.d/` (en sistemas SysV) y `/etc/systemd/system/` (para servicios systemd personalizados).

4. Busca servicios con descripciones genéricas o faltantes en el campo `Description` del archivo `.service`.

Señales de alerta:
- Nombres de servicios que imitan a servicios legítimos pero con ligeras variaciones: `systemd-logind.service` (real) vs `systemd-login.service` (falso).
- Servicios que ejecutan scripts desde `/tmp` o `/dev/shm`.
- Servicios con `ExecStart` que apunta a binarios en ubicaciones no estándar.
- Servicios que aparecen en la lista de habilitados pero no están corriendo (pueden estar esperando una condición para activarse).

## Logs: La Caja Negra

En ciberseguridad hay un dicho: "si no hay logs, el crimen no ocurrió". Los logs son la única evidencia de que algo paso. Sin ellos, cualquier investigación forense es imposible.

### El Directorio /var/log

Este es el directorio más importante del sistema para un analista de seguridad. Aprende a navegarlo.

**`/var/log/syslog` o `/var/log/messages`:** El log general del sistema. Casi todo lo que no tiene un log dedicado termina aqui. En Debian/Ubuntu es `syslog`. En Red Hat es `messages`.

**`/var/log/auth.log` o `/var/log/secure`:** El log de autenticación. Cada inicio de sesión, cada intento de sudo, cada fallo de autenticación se registra aqui. Es el primer archivo que revisas cuando sospechas de un acceso no autorizado.

Línea tipica de intento fallido:
`Jun 26 03:15:22 servidor sshd[12345]: Failed password for root from 192.168.1.100 port 54321 ssh2`

Esto te dice: fecha, hora, servicio que registro (sshd), PID del proceso (12345), evento (Failed password), usuario (root), IP origen (192.168.1.100), puerto (54321), y protocolo (ssh2).

**`/var/log/kern.log`:** Mensajes del kernel. Información sobre hardware, controladores, y eventos de bajo nivel.

**`/var/log/dmesg`:** Buffer de mensajes del kernel desde el arranque. Útil para diagnosticar problemas de hardware.

**`/var/log/btmp`:** Intentos de conexión fallidos (binario). Se lee con `lastb`.

**`/var/log/wtmp`:** Historial de inicios de sesión exitosos (binario). Se lee con `last`.

**`/var/log/lastlog`:** Último inicio de sesión de cada usuario (binario). Se lee con `lastlog`.

**`/var/log/apache2/` o `/var/log/nginx/`:** Logs del servidor web. Contienen cada petición HTTP. Dos archivos principales: `access.log` (todas las peticiones) y `error.log` (errores del servidor).

**`/var/log/mysql/`:** Logs de la base de datos MySQL/MariaDB.

### Lectura Táctica de Logs

Nunca abras un log de 2GB en un editor de texto. Usa las herramientas de línea de comandos:

`grep "Failed password" /var/log/auth.log`: Encuentra intentos de conexión fallidos.
`grep "Accepted" /var/log/auth.log`: Encuentra inicios de sesión exitosos (utiles para detectar accesos no autorizados).
`tail -f /var/log/auth.log`: Monitorea en tiempo real los intentos de conexión.
`grep "error" /var/log/apache2/error.log`: Encuentra errores del servidor web.
`journalctl -u sshd.service --since yesterday`: Logs de SSH desde ayer (con sistema de logs de systemd).

### Extracción de IPs de Atacantes

Un patrón clásico para identificar atacantes:

`grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -nr`

Esto extrae las IPs de todos los intentos fallidos, las cuenta y las ordena de mayor a menor. La IP con más intentos es probablemente un atacante activo.

Para logs de servidor web:

`cat /var/log/apache2/access.log | awk '{print $1}' | sort | uniq -c | sort -nr | head -20`

Te muestra las 20 IPs que más peticiones hicieron a tu servidor web. Una IP con miles de peticiones en minutos probablemente esta escaneando el sitio.

### Rotación de Logs con logrotate

`logrotate` gestiona la rotación, compresion y eliminación de logs. Se configura en `/etc/logrotate.conf` y `/etc/logrotate.d/`.

Una configuración tipica:

```
/var/log/auth.log {
    weekly
    rotate 4
    compress
    delaycompress
    missingok
    postrotate
        systemctl reload rsyslog > /dev/null
    endscript
}
```

Esto rota el log semanalmente, mantiene 4 rotaciones (4 semanas), comprime los rotados, y recarga rsyslog después de rotar.

Errores comunes de logrotate:
- Rotación demasiado frecuente: pierdes datos historicos.
- Rotación demasiado infrecuente: los logs crecen sin control.
- Permisos incorrectos en logs rotados: después de rotar, los archivos pueden quedar con permisos más abiertos que el original.
- No recargar el servicio que escribe el log: el servicio sigue escribiendo en el archivo que ahora esta comprimido.

### Logs en Blanco y su Significado Forense

Cuando investigas un incidente y encuentras logs faltantes o con lagunas, esto puede indicar:

- **Borrado selectivo:** El atacante eliminó entradas específicas que lo mencionaban.
- **Rotación forzada:** El atacante ejecutó `logrotate -f` para forzar la rotación antes de tiempo.
- **Escritura directa:** El atacante sobrescribio el archivo de log con datos falsos.
- **Desactivacion del servicio de logs:** El atacante detuvo rsyslog o syslog-ng antes de realizar sus actividades.

Para mitigar esto, los logs deben enviarse a un servidor centralizado (SIEM) tan pronto como se generen. Un atacante puede borrar logs locales, pero no puede borrar logs que ya fueron transmitidos a un sistema externo.

### Timestamps y Zonas Horarias

Un detalle que parece menor pero que en investigaciones forenses es crítico: la zona horaria de los logs. Si tu servidor esta configurado en UTC pero tu equipo de seguridad trabaja en GMT-5, una entrada de log a las "03:00" puede interpretarse como las 10 PM del día anterior (o las 11 PM, dependiendo del horario de verano).

Siempre verifica y documenta la zona horaria del servidor antes de hacer análisis temporal. El comando `timedatectl` muestra la configuración de hora del sistema.

## Casos Reales

**El Minero de Criptomonedas en los Servidores de Tesla (2018):** Atacantes comprometieron la consola de administración de Kubernetes de Tesla porque no tenía contraseña. Instalaron mineros de criptomonedas en los contenedores. El incidente se detecto cuando un administrador noto que el uso de CPU en los nodos era anormalmente alto en `top`. Los logs de Kubernetes mostraban pods desconocidos ejecutándose.

**El Ataque a Code Spaces (2014):** Un atacante obtuvo acceso a la consola de administración de AWS de Code Spaces. Desde ahí, ejecutó `kill` masivamente en los servidores Linux, matando procesos críticos. Cuando los administradores intentaron recuperar el acceso, el atacante uso los mismos permisos para eliminar logs y backups. La empresa na pudo recuperarse y cerró operaciones.

**El Incidente de SolarWinds (2020):** Los atacantes crearon un servicio systemd malicioso llamado `solarwinds-orion-agent.service` que imitaba al servicio legítimo de Orion. El servicio se ejecutaba con altos privilegios y establecia persistencia. Los logs del sistema no mostraban anomalías porque el servicio tenía un nombre y unas características que pasaban las revisiones rutinarias.

**El Gusano Stuxnet (2010):** Aunque es más conocido por atacar sistemas SCADA, Stuxnet también infectaba sistemas Linux usados como estaciones de trabajo de ingeniería. El malware ocultaba sus procesos usando rootkits a nivel de kernel que interceptaban las llamadas a `/proc` para que `ps` y `top` no mostraran los procesos maliciosos.

## Ángulo Hacker: Como los Atacantes Manipulan Procesos, Servicios y Logs

**Ocultamiento de procesos:** El atacante puede:
- Usar rootkits a nivel de kernel que interceptan syscalls como `getdents()` para ocultar entradas en `/proc`.
- Modificar el nombre del proceso via `prctl(PR_SET_NAME, ...)` para que aparezca como un proceso legítimo.
- Ejecutar payloads que se "inyectan" en procesos legítimos existentes (process injection usando `ptrace()` o `process_vm_writev()`).

**Persistencia mediante servicios:** El atacante crea servicios systemd que parecen legítimos. Usan nombres como `systemd-essentials.service` o `network-manager-reload.service`. La descripción del servicio suele ser vaga.

**Manipulación de logs:** El atacante:
- Borra logs específicos: `rm /var/log/auth.log`
- Edita selectivamente: `grep -v "192.168.1" auth.log > auth.log.clean && mv auth.log.clean auth.log`
- Detiene rsyslog antes de actuar: `systemctl stop rsyslog`
- Añade entradas falsas para confundir a los investigadores.

**Uso de journald como ventaja:** Algunos atacantes borran `/var/log/journal/` completo pero olvidan que los logs también pueden estar en `/run/log/journal/` (en sistemas que usan journald con almacenamiento volátil).

**Mata procesos de seguridad:** Un atacante con suficientes privilegios puede matar agentes de monitoreo, antivirus, y herramientas de detección antes de ejecutar su carga maliciosa. Por eso los agentes de seguridad modernos implementan protecciones contra "kill" usando capacidades de Linux o ejecutando en modos protegidos.

## Modos de Falla Comunes

**Confundir "detener" con "deshabilitar" un servicio:** `systemctl stop apache2` detiene Apache ahora, pero si el servicio esta habilitado, arrancará de nuevo en el próximo reinicio. Para evitar que arranque, necesitas `systemctl disable apache2`.

**No revisar logs por volumen:** Tener un SIEM que recibe millones de logs y no configurar alertas. Los atacantes pueden esconderse en el ruido generando falsos positivos o simplemente actuando entre el volumen normal de tráfico.

**Depender solo de logs locales:** Si el servidor es comprometido, el atacante puede borrar los logs locales. Sin un SIEM o syslog centralizado, pierdes toda la evidencia.

**Omitir la revisión de servicios habilitados:** Nunca revisar `systemctl list-unit-files --state=enabled`. Los atacantes pueden tener servicios maliciosos habilitados por semanas sin ser detectados.

**Matar procesos sin tomar evidencia forense:** Cuando detectas un proceso sospechoso, lo primero es tomar una imagen de su memoria (`gcore`), no matarlo. Una vez que lo matas, pierdes información valiosa sobre su comportamiento y origen.

**Ignorar procesos zombies:** Los procesos zombies no consumen CPU, pero si se acumulan pueden indicar un problema en el sistema o un ataque de denegación de servicio.

**No monitorear journald:** En distribuciones modernas, los logs del sistema pasan por journald antes de ir a archivos de texto. Si solo monitoreas archivos en `/var/log`, te pierdes información que journald puede tener en su base de datos binaria.

## Autoevaluación

1. Tu servidor web se siente lento. Los usuarios reportan tiempos de carga de 30 segundos. Que comandos ejecutas para determinar que esta consumiendo los recursos del sistema? Describe los pasos exactos y que información buscas en cada uno.

2. Descubres un proceso sospechoso llamado `crond` (con una 'd' al final, diferente del legítimo `cron`) consumiendo 95% de CPU. El PID es 4099. Describe paso a paso como investigarias este proceso: que información extraes de `/proc/4099/`, como determinas si tiene persistencia, y que haces con el proceso.

3. Durante un análisis forense, encuentras que `/var/log/auth.log` tiene exactamente 0 líneas para el periodo de 2:00 AM a 3:00 AM del día del incidente. El resto del log esta intacto. Explica dos posibles causas de esta anomalía y como determinarias cual de las dos ocurrió realmente.

4. Un administrador te dice: "Reinicie el servidor por mantenimiento, pero el servicio malicioso volvió a aparecer después del reinicio." Explica como establecio persistencia el atacante y que comandos usarías para encontrar y eliminar esa persistencia.

5. En tu servidor, el comando `ps aux` muestra 50 procesos. Pero listas `/proc/` y ves 52 entradas. Cual es la discrepancia? Que herramienta o técnica usarías para investigar los dos procesos adicionales que `ps` no muestra?

6. Configuras un servidor de aplicaciones y creas un servicio systemd para ella. El servicio no arranca al iniciar el sistema a pesar de que usaste `systemctl enable`. Que revisarias primero? Menciona al menos tres posibles causas.

7. Durante una auditoría, encuentras un servicio llamado `system-update.service` en `/etc/systemd/system/`. El `ExecStart` apunta a `/usr/local/bin/system-updater`. No recuerdas haber instalado este servicio. Describe los pasos exactos que seguiras para investigar si es legítimo o malicioso.

8. Un atacante comprometio un servidor y ejecutó `kill -9` en el proceso de rsyslog. Explica el impacto de esta acción (que logs se pierden y cuáles no) y como podrías detectar que rsyslog fue detenido intencionalmente.
