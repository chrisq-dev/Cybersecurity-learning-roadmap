---
title: "Fundamentos de Linux: El Idioma de los Servidores"
level: "inicial"
content_type: "guia"
updated: "2026-06-29"
---

# Fundamentos de Linux: El Idioma de los Servidores

## Objetivo de esta Guía

Si quieres trabajar en ciberseguridad, hay una verdad que no puedes esquivar: la infraestructura crítica del mundo corre sobre Linux. Los servidores web, las bases de datos bancarias, los sistemas de control aereo, los routers, los firewalls de grado empresarial, los satélites y hasta las herramientas de hacking que usan los equipos rojos están construidas sobre este sistema operativo.

Esta guía no es un manual de usuario. Es un mapa para que entiendas por qué Linux piensa como piensa, por qué su filosofía de diseño es la clave de su seguridad, y como navegar su geografía interna sin perderte. No te voy a enseñar a instalar Linux. Te voy a enseñar a entenderlo.

Conocer únicamente Windows deja una brecha importante para analizar servidores, contenedores y gran parte de la infraestructura basada en Linux. Los incidentes de seguridad no ocurren en pantallas bonitas con iconos. Ocurren en terminales negras donde un administrador escribe comandos mientras el servidor se esta incendiando.

## El Problema de Fondo: Por qué Linux Existe

Linux no nacio en un laboratorio corporativo. Nacio en 1991 de la frustración de un estudiante finlandes llamado Linus Torvalds. En esa epoca, los sistemas operativos Unix eran poderosos pero costosos y cerrados. Windows apenas comenzaba su dominio en el mercado de escritorios. Torvalds quería algo que funcionara como Unix pero que cualquiera pudiera modificar, estudiar y compartir sin pagar licencias millonarias.

Esa decisión de diseño cambio todo. Al hacer el kernel de Linux público bajo la licencia GPL, Torvalds creo un ecosistema donde miles de programadores alrededor del mundo podían revisar el código, encontrar vulnerabilidades y proponer parches. Este modelo de desarrollo colaborativo es la razón por la que Linux tiene menos vulnerabilidades conocidas que Windows, y por la que cuando aparece una, la comunidad la parchea en horas, no en meses.

Para un profesional de seguridad, esto significa algo concreto: puedes auditar tu propio sistema operativo. Puedes saber exactamente que hace cada línea de código que se ejecuta en tu máquina. En Windows, el código fuente del kernel es propiedad de Microsoft y no lo puedes ver. En Linux, todo esta ahí en sitios como kernel.org para que lo examines. Esa transparencia radical es la base de la confianza que la industria de seguridad deposita en el.

El desarrollo de Linux introdujo un modelo que hoy se llama "muchos ojos" (Linus's Law): "dado el número suficiente de revisores, todos los errores son superficiales". Esto no es una garantía absoluta -- vulnerabilidades como Heartbleed (2014) estuvieron presentes en OpenSSL por dos años a pesar de ser código abierto. Pero la tendencia general es que el código abierto se audita más y se parchea más rápido que el código cerrado.

## La Analogía: El Conductor, el Mecánico y el Ingeniero

Voy a usar una analogía que me hubiera gustado escuchar cuando empece. Olvídate de comparar Linux con Windows como si fueran dos autos diferentes. Son dos formas completamente distintas de relacionarte con la máquina.

Windows y macOS están diseñados para el conductor. Te subes al auto, el tablero es bonito, las luces de advertencia son amigables, y cuando algo falla, aparece una pantalla azul que no te dice nada útil y te obliga a reiniciar. No tienes acceso al motor. No puedes cambiar la relación de la transmision ni ajustar la mezcla de combustible. El fabricante decidio por ti como debe funcionar el auto.

Linux te abre el capó. Te muestra el motor, te da las herramientas para desarmarlo y te dice "haz lo que quieras, pero informate". No hay pantallas bonitas. Hay una terminal de texto. Y si metes la pata, el auto se rompe y es tu responsabilidad arreglarlo.

La ciberseguridad requiere el enfoque del mecánico. Un hacker no usa botones. Un hacker le habla directamente al motor con comandos, pidiéndole que haga cosas que el diseñador original jamás contemplo. Para hacer eso, necesitas saber exactamente donde esta cada pieza, como comunicarte con ellas en su idioma nativo, y que pasa cuando las empujas más allá de sus límites de diseño.

Pero hay un tercer nivel: el ingeniero. El ingeniero no solo sabe reparar el auto, sino que entiende los principios de diseño que lo hacen funcionar. Sabe por qué el motor usa una correa de distribución en vez de una cadena, y que implicaciones tiene eso para el mantenimiento. En Linux, el ingeniero entiende por qué el kernel separa el espacio de usuario del espacio de kernel, por qué los archivos tienen dueños y grupos, y por qué ciertos directorios existen. Ese es el nivel al que apunta esta guía.

## La Filosofía Central: Todo es un Archivo

Esta es la regla más importante de Linux y la que menos se explica en los tutoriales para principiantes. "Todo es un archivo" no es una metáfora bonita. Es una descripción literal de como funciona el sistema operativo.

En Linux, los dispositivos de hardware, los procesos en ejecución, los sockets de red, los archivos de configuración y la memoria se representan como descriptores de archivo en el sistema operativo. Esto significa que las mismas funciones del sistema que usas para leer un documento de texto (open, read, write, close) las puedes usar para leer lo que escribe el teclado, lo que recibe la tarjeta de red, o el estado actual de la memoria RAM.

### Archivos Regulares y Especiales

en Linux un archivo no es solo un archivo. Puede ser un teclado, un disco, o un canal de comunicación. Todo es un archivo, literalmente.

Linux distingue varios tipos de archivos. Cuando ejecutas `ls -l`, la primera columna te dice el tipo:

- `-`: Archivo regular. Datos normales en el disco.
- `d`: Directorio. Una carpeta que contiene otros archivos.
- `l`: Enlace simbolico (link). Un acceso directo a otro archivo.
- `c`: Dispositivo de caracteres (character device). Dispositivos como el teclado o el mouse que transfieren datos byte por byte.
- `b`: Dispositivo de bloques (block device). Dispositivos como discos duros o USBs que transfieren datos en bloques.
- `s`: Socket. Un punto de conexión entre procesos, usado para comunicación local.
- `p`: Pipe con nombre (named pipe). Un canal de comunicación entre procesos.

Entender esta distinción es clave para la seguridad. No es lo mismo un archivo regular que un dispositivo de bloque. Si alguien ejecuta `cat /dev/sda` (el disco duro completo), el sistema no le mostrará texto legible, sino datos binarios del disco. Pero si el usuario tiene permisos, puede leer literalmente todos los datos del disco, incluyendo archivos borrados que aún no han sido sobrescritos.

### Descriptores de Archivo (File Descriptors)

Cuando un proceso abre un archivo en Linux, el kernel le asigna un número llamado descriptor de archivo (file descriptor o FD). Los primeros tres siempre son:

- 0: stdin (entrada estándar, normalmente el teclado)
- 1: stdout (salida estándar, normalmente la pantalla)
- 2: stderr (salida de error, normalmente la pantalla)

Esto significa que, técnicamente, cuando escribes en la terminal, estas escribiendo en el descriptor de archivo 1. Cuando un programa imprime un error, escribe en el descriptor 2. Cuando el programa lee tu entrada, lee del descriptor 0.

Por eso la redirección funciona como funciona. `comando 2>/dev/null` redirige el descriptor 2 (errores) a `/dev/null` (el agujero negro de Linux que descarta todo lo que recibe). `comando > archivo.txt 2>&1` redirige tanto stdout como stderr al mismo archivo.

### Implicaciones de Seguridad Inmediatas

Si el teclado es un dispositivo de caracteres representado como `/dev/input/event0`, entonces leer ese archivo te da acceso a todo lo que el usuario esta escribiendo. Eso es un keylogger, pero no necesitas un programa especial. Solo necesitas permisos para leer ese archivo.

Si la memoria RAM se puede acceder a través de `/dev/mem`, entonces un proceso con los permisos adecuados puede leer la memoria de otros procesos, incluyendo las contraseñas que están en ese momento en la RAM. Por eso el acceso a `/dev/mem` esta restringido al usuario root en los sistemas modernos.

Si la pantalla es un archivo como `/dev/fb0` (framebuffer), un atacante con acceso a ese archivo puede capturar lo que se muestra en el monitor sin necesidad de tomar una captura de pantalla tradicional.

Por eso la seguridad en Linux no depende de antivirus mágicos. Depende de los permisos. Si no controlas quien puede leer y escribir en cada archivo -- incluyendo los archivos especiales -- no controlas nada. Un sistema Linux inseguro no es uno con muchos virus. Es uno donde los permisos están mal configurados y cualquier proceso puede leer los archivos de los demás.

### Donde Falla "Todo es un Archivo"

La filosofía tiene sus límites prácticos. No todo se comporta exactamente como un archivo regular:

Los sockets de red, por ejemplo, permiten operaciones como `bind()` y `connect()` que no tienen equivalente directo en archivos regulares. Los procesos tienen señales como `kill -9` que no se corresponden con operaciones de lectura/escritura. Los archivos en `/proc` son virtuales -- se crean y destruyen dinámicamente, y su "contenido" cambia cada vez que los lees porque es generado en tiempo real por el kernel.

Un error común en principiantes es intentar tratar estos archivos especiales como archivos regulares. Por ejemplo, hacer `cp /dev/sda /home/usuario/disco.img` para copiar todo el disco duro puede funcionar, pero si el disco tiene 2TB, el comando va a copiar 2TB completos a tu disco de destino. Y si el destino no tiene suficiente espacio, el sistema puede fallar.

Otro error es hacer `echo "texto" > /dev/sda`, lo que intentaria escribir directamente en el disco sin pasar por el sistema de archivos, probablemente corrompiendo la tabla de particiones y dejando el disco inservible. Linux te deja hacer esto porque confía en que sabes lo que haces.

## El Árbol Invertido: La Geografía del Sistema

En Windows, todo gira alrededor de letras de unidad. La C: es el disco principal, la D: es el lector de DVD, la E: es la USB que conectaste. Es un sistema que nacio de la limitacion técnica del DOS donde las unidades físicas se mapeaban directamente a letras.

En Linux no hay letras de unidad. Hay un solo árbol que empieza en `/`. Todo lo que conectes al sistema -- discos duros, USBs, unidades de red, particiones -- se "monta" en alguna rama de ese árbol. Cuando conectas una USB, no aparece como una letra nueva. Aparece como contenido dentro de un directorio que tu eliges, típicamente en `/media/usuario/` o `/mnt/`.

El comando `mount` administra estas conexiones. El archivo `/etc/fstab` (file system table) define que dispositivos se montan automáticamente al arrancar el sistema y en que directorios.

### La Raíz: `/`

El directorio raíz es el punto de partida. Todo en el sistema cuelga de `/`. Si tu particion raíz se corrompe o se llena, la máquina puede dejar de funcionar aunque otras particiones estén intactas.

El Estándar de Jerarquía del Sistema de Archivos (FHS) define que debe ir en cada directorio bajo `/`. Es un estándar que siguen la mayoría de las distribuciones Linux. No cumplirlo puede causar problemas de compatibilidad.

Algunos errores clasicos:
- Un administrador novato instala todo bajo `/` sin separar particiones. Cuando `/var/log` crece sin control (por logs mal configurados), llena toda la particion raíz y el sistema deja de funcionar. La solución es tener `/var` como una particion separada para que si los logs se desbordan, no afecten al resto del sistema.
- Alguien ejecuta `rm -rf /` por error (o como parte de un script mal escrito). El comando borra recursivamente todo el sistema de archivos desde la raíz, incluyendo los binarios necesarios para operar el sistema. La única recuperación posible es desde un backup externo.

En un ataque real, los atacantes que logran acceso al sistema suelen buscar primero archivos en `/root` (el hogar del administrador) porque ahí los administradores guardan cosas sensibles como claves SSH privadas, scripts de backup con contraseñas en texto plano, archivos de configuración de VPN, y registros de conexiones a otros servidores.

### `/home`: Los Apartamentos de los Usuarios

Cada usuario humano tiene una carpeta aqui con su nombre. `/home/juan`, `/home/maria`. Dentro de estas carpetas, los usuarios pueden escribir libremente. Pero no pueden escribir fuera de ahí sin permisos especiales.

Un ataque típico involucra ganar acceso a un usuario con pocos privilegios y luego buscar en `/home` archivos mal protegidos. Los usuarios suelen guardar contraseñas en archivos de texto, llaves SSH sin frase de paso, o historiales de terminal que contienen comandos con contraseñas en texto plano.

El archivo `~/.bash_history` en cada `/home/usuario` contiene los comandos que el usuario ejecutó. Si el usuario escribió `mysql -u root -pMiContraseña` directamente (un error clásico), esa contraseña quedó registrada en el historial. Un atacante con acceso a esta cuenta puede leer el historial completo.

El caso real de la violación de datos de Dropbox en 2012 comenzó cuando un atacante encontró un documento con contraseñas en la carpeta personal de un empleado que había sido comprometida. No fue un exploit técnico sofisticado. Fue un empleado que guardó sus contraseñas en un archivo de texto en su escritorio.

### `/etc`: El Centro de Mando

Aqui viven los archivos de configuración del sistema. Se pronuncia "etsi", del latín "et cetera". Cada programa que se instala en el sistema suele dejar uno o más archivos de configuración en `/etc`.

Los archivos más críticos para seguridad:

`/etc/passwd`: Contiene los nombres de usuario del sistema. Es legible por todos los usuarios, lo que permite a un atacante local listar todas las cuentas existentes. En sistemas antiguos, este archivo contenia las contraseñas hasheadas. Hoy las contraseñas están en `/etc/shadow`, pero `/etc/passwd` sigue siendo útil para enumeración. El formato es `usuario:contraseña:UID:GID:descripcion:home:shell`. Si ves `usuario:x:0:0:root:/root:/bin/bash`, el `x` indica que la contraseña esta en `/etc/shadow`. Si ves `usuario::0:0::/root:/bin/bash` (sin `x`), la cuenta no tiene contraseña, lo que es una vulnerabilidad grave.

`/etc/shadow`: Contiene los hashes de las contraseñas de los usuarios. Solo el usuario root puede leer este archivo. Si un atacante logra leer `/etc/shadow`, puede intentar romper los hashes con herramientas como John the Ripper o Hashcat. Un hash de contraseña en este archivo se ve como `$6$salt$hash`, donde `$6$` indica SHA-512.

`/etc/ssh/sshd_config`: Configura como funciona el servidor SSH. Una mala configuración aqui es la puerta de entrada para ataques de fuerza bruta. Configuraciones como `PermitRootLogin yes` o `PasswordAuthentication yes` son riesgos de seguridad bien conocidos.

`/etc/sudoers`: Define quien puede ejecutar comandos como root usando `sudo`. Errores en este archivo pueden permitir a un usuario normal escalar privilegios. Por ejemplo, una línea como `usuario ALL=(ALL) NOPASSWD:ALL` le da a `usuario` poder total sin contraseña. Si esa cuenta es comprometida, el atacante tiene acceso root inmediato.

`/etc/hosts`: Mapea nombres de dominio a direcciones IP localmente, antes de consultar DNS. Si un atacante logra escribir aqui, puede redirigir el tráfico de `micr0soft.com` a su servidor malicioso para robar credenciales. Es una forma primitiva pero efectiva de phishing.

`/etc/crontab`: Define tareas programadas que se ejecutan automáticamente. Un atacante que modifique este archivo puede hacer que su malware se ejecute periodicamente. Por ejemplo, añadir una línea que ejecute un script cada minuto desde `/tmp` asegura que si el administrador mata el proceso, este se reactive en 60 segundos.

`/etc/hosts.allow` y `/etc/hosts.deny`: Control de acceso a servicios de red basado en direcciones IP (TCP Wrappers). Aunque en desuso, muchos sistemas aún lo tienen configurado.

### `/var`: Datos Variables y la Caja Negra

`/var` contiene datos que cambian constantemente: bases de datos, colas de impresion, correos electrónicos, y lo más importante para los profesionales de seguridad: logs.

`/var/log` es el directorio que todo analista de seguridad debe conocer. Ahí el sistema escribe todo lo que ocurre:

`/var/log/syslog` o `/var/log/messages`: Registro general del sistema. En Debian/Ubuntu es syslog. En Red Hat es messages. Contiene mensajes de diversos servicios, del kernel, y de aplicaciones.

`/var/log/auth.log` o `/var/log/secure`: Registro de autenticaciones. Cada intento de inicio de sesión, exitoso o fallido, se anota aqui. Es el primer archivo que revisa un analista forense cuando sospecha de un acceso no autorizado.

`/var/log/kern.log`: Mensajes del kernel del sistema operativo. Incluye información sobre hardware, controladores, y eventos de bajo nivel.

`/var/log/dmesg`: Mensajes del anillo de buffer del kernel. Muestra información desde el arranque del sistema. Útil para diagnosticar problemas de hardware.

`/var/log/apache2/` o `/var/log/nginx/`: Logs del servidor web. Contienen cada petición HTTP que recibe el servidor. Son una fuente rica de información sobre ataques web como SQL injection, XSS, y directory traversal.

`/var/log/btmp`: Registra intentos de conexión fallidos. Se lee con `lastb` en vez de `cat` porque es un archivo binario.

`/var/log/wtmp`: Registra inicios de sesión historicos (exitosos). Se lee con `last`.

`/var/log/lastlog`: Muestra el último inicio de sesión de cada usuario. Se lee con `lastlog`.

Un atacante experimentado, después de comprometer un sistema, edita o borra los logs en `/var/log` para eliminar su rastro. Los frameworks de seguridad modernos mitigan esto enviando los logs a un servidor centralizado (SIEM) donde el atacante no puede modificarlos.

El comando `logrotate` gestiona la rotación de logs, comprimiendo y eliminando logs antiguos automáticamente. Una mala configuración de logrotate puede resultar en:
- Logs que crecen sin control hasta llenar el disco.
- Logs que se borran demasiado rápido, eliminando evidencia antes de que pueda ser investigada.
- Permisos incorrectos en los logs rotados, exponiendo información sensible.

### `/tmp`: El Terreno de Nadie

`/tmp` es el único directorio del sistema donde cualquier usuario puede escribir, leer y ejecutar. Esto lo convierte en el punto de entrada favorito para ataques.

Un atacante que logra ejecutar código en un servidor web (por ejemplo, a través de una vulnerabilidad de subida de archivos como las que se explican en [OWASP File Upload](../web-owasp/FILE-UPLOAD.md)) normalmente descarga sus herramientas en `/tmp` porque ahí no necesita permisos especiales para escribir. Los scripts de minería de criptomonedas, los backdoors, y los exploit kits suelen residir en `/tmp` antes de moverse a ubicaciones más permanentes.

El problema es que los administradores limitados confían en que `/tmp` se limpia al reiniciar. Pero los sistemas modernos con systemd pueden configurar `/tmp` para que se monte en memoria RAM (tmpfs), lo que significa que el contenido se pierde al reiniciar. Sin embargo, si el atacante establecio persistencia mediante servicios systemd o entradas en crontab, el malware se descargara nuevamente en cada reinicio.

También existe `/dev/shm` (shared memory), que es un sistema de archivos en RAM donde cualquier usuario puede escribir. Los atacantes avanzados prefieren `/dev/shm` sobre `/tmp` porque:
- Es menos monitoreado que `/tmp`.
- Existe en casi todos los sistemas Linux modernos.
- Opera completamente en RAM, lo que significa que no deja rastro en disco.

Durante el incidente de la botnet Mirai, los atacantes usaban `/tmp` para descargar los binarios de los bots. En investigaciones de respuesta a incidentes, el primer paso es revisar `/tmp` y `/dev/shm` en busca de archivos sospechosos.

### `/usr`: Programas del Sistema

`/usr` contiene la mayoría de los programas, bibliotecas y documentación del sistema. Originalmente significaba "user system resources", aunque la interpretacion de "Unix System Resources" es más precisa.

Dentro de `/usr`:
- `/usr/bin/`: Comandos esenciales del sistema (ls, cp, mv, etc.).
- `/usr/sbin/`: Comandos de administración del sistema (fdisk, shutdown, etc.).
- `/usr/lib/`: Bibliotecas compartidas usadas por los programas.
- `/usr/local/`: Programas instalados localmente por el administrador, no por el gestor de paquetes.

Los atacantes a veces colocan binarios maliciosos en `/usr/local/bin` con nombres que suenan a programas legítimos. Por ejemplo, crear un script llamado `sudu` que en realidad es un keylogger que captura contraseñas de sudo, o reemplazar el binario `ps` con una versión modificada que no muestra procesos maliciosos.

Para detectar esta suplantación, los administradores verifican los hashes de los binarios usando herramientas como `sha256sum` o `rpm --verify`.

### `/boot`: El Arranque del Sistema

`/boot` contiene el kernel de Linux y los archivos necesarios para arrancar el sistema, incluyendo el cargador de arranque (GRUB). Un atacante con acceso físico o privilegios de root puede modificar el kernel en `/boot` para cargar un kernel malicioso (bootkit).

En 2015, se descubrió un bootkit llamado "Bootkitty" que comprometia el proceso de arranque de Linux, cargandose antes que el sistema operativo y permaneciendo invisible para las herramientas de seguridad que se ejecutan dentro del sistema comprometido.

### `/proc`: Archivos Falsos que se Inventan Datos

`/proc` es un sistema de archivos virtual que no existe en el disco duro. El kernel lo crea en memoria y lo actualiza constantemente. Cada proceso en ejecución tiene una carpeta aqui con su número de PID.

Los archivos más utiles en `/proc` para seguridad:
- `/proc/[PID]/cmdline`: El comando exacto que inicio el proceso. Un atacante puede ocultar un proceso modificando `argv`, pero el cmdline original queda registrado aqui.
- `/proc/[PID]/environ`: Las variables de entorno del proceso. Pueden contener contraseñas, tokens de API, o secretos pasados al proceso al iniciarlo.
- `/proc/[PID]/fd/`: Archivos abiertos por el proceso. Incluye conexiones de red y archivos del disco.
- `/proc/[PID]/maps`: Mapa de memoria del proceso, mostrando que bibliotecas están cargadas.
- `/proc/[PID]/status`: Estado del proceso, incluyendo el UID real y efectivo.
- `/proc/cpuinfo`: Información detallada del procesador.
- `/proc/meminfo`: Información sobre el uso de memoria.
- `/proc/net/tcp` y `/proc/net/udp`: Lista de conexiones de red activas. Herramientas como `netstat` y `ss` leen estos archivos internamente.

Un comando útil para investigación forense es `cat /proc/[PID]/cmdline` para ver exactamente que ejecutó un proceso sospechoso, incluso si el proceso cambio su nombre en la tabla de procesos para ocultarse. También se puede ver `ls -la /proc/[PID]/exe` que muestra el binario original del proceso, incluso si el archivo fue borrado después de la ejecución.

### `/sys`: Información del Kernel Moderno

`/sys` es otro sistema de archivos virtual, más nuevo que `/proc`. Expone información estructurada sobre dispositivos, controladores y características del kernel. Es utilizado por herramientas como `udev` para gestionar dispositivos conectados al sistema.

## Enlaces: Simbolicos vs Duros

Linux tiene dos tipos de enlaces para referenciar archivos desde múltiples ubicaciones:

**Enlace simbolico (symlink):** Es como un acceso directo en Windows. Apunta a otro archivo por su ruta. Si el archivo original se mueve o se borra, el enlace simbolico se rompe (queda "colgando"). Se crea con `ln -s`.

**Enlace duro (hard link):** Es una entrada adicional en el sistema de archivos que apunta al mismo inodo (los metadatos del archivo). A diferencia del enlace simbolico, no se rompe si borras el archivo original, porque el archivo solo se elimina realmente cuando se borran todos los enlaces duros. Se crea con `ln` sin la opción `-s`.

Los enlaces simbolicos son un vector de ataque conocido. Un atacante puede crear un symlink desde un archivo que el controla a un archivo privilegiado. Si un programa con privilegios elevados escribe en la ubicación del symlink, el atacante puede hacer que el programa escriba en un archivo que no debería. Esta técnica se llama "symlink attack" o "symlink race condition".

## Montaje de Dispositivos: /etc/fstab

El archivo `/etc/fstab` define como y donde se montan los sistemas de archivos al arrancar. Su formato es: `dispositivo punto_de_montaje tipo_de_fs opciones dump pass`.

Las opciones de montaje tienen implicaciones directas de seguridad:
- `noexec`: No permite ejecutar binarios en esta particion. Útil para particiones como `/home` o `/tmp` donde los usuarios no deberían ejecutar programas.
- `nosuid`: Ignora los bits SUID/SGID en esta particion. Evita que usuarios normales ejecuten programas con privilegios elevados desde ahí.
- `nodev`: No permite archivos de dispositivo en esta particion.
- `ro`: Monta la particion como solo lectura. Útil para particiones de sistema en entornos altamente seguros.

Una configuración común de hardening para servidores es montar `/tmp` con `noexec,nosuid,nodev` para prevenir que los atacantes ejecuten malware desde ahí.

## Variables de Entorno y el Shell

Cada proceso en Linux tiene un conjunto de variables de entorno que definen su comportamiento. El shell (bash, zsh, sh) es el interprete de comandos que lee lo que escribes y lo ejecuta.

Las variables de entorno más importantes para seguridad:
- `PATH`: Lista de directorios donde el shell busca ejecutables. Si un atacante modifica `PATH`, puede hacer que el usuario ejecute un binario malicioso en vez del legítimo. Ejemplo: si pones `/tmp` al inicio del `PATH`, y hay un script llamado `ls` en `/tmp`, cuando el administrador ejecute `ls`, el sistema ejecutará el script malicioso.
- `LD_PRELOAD`: Permite cargar bibliotecas compartidas antes que cualquier otra. Es una técnica de "library injection" usada tanto para depuracion como para malware.
- `HOME`: Directorio personal del usuario.
- `SHELL`: El shell que se usa para la sesión.
- `USER` y `LOGNAME`: Nombre del usuario actual.

`LD_PRELOAD` es particularmente peligroso. Un atacante que puede modificar esta variable para un proceso con privilegios puede inyectar código en ese proceso. Por eso, los binarios SUID ignoran `LD_PRELOAD` como medida de seguridad.

## El Proceso de Arranque (Boot Sequence)

Entender como arranca Linux es importante para entender donde un atacante puede plantar código en diferentes etapas:

1. **BIOS/UEFI**: El firmware de la placa madre encuentra el cargador de arranque. Ataques a este nivel son raros pero devastadores (firmware implants).
2. **Cargador de arranque (GRUB)**: Carga el kernel en memoria. Un atacante con acceso físico puede modificar GRUB para arrancar un kernel diferente o añadir parámetros maliciosos.
3. **Kernel**: Se inicializa el kernel, se monta el sistema de archivos raíz temporal (initramfs), se cargan los controladores necesarios.
4. **init/systemd**: El primer proceso del sistema (PID 1) se ejecuta. Inicia todos los servicios del sistema.
5. **Servicios del sistema**: Los servicios definidos en systemd o en scripts de init se ejecutan.

Un rootkit de nivel de arranque (bootkit) compromete el sistema antes de que el kernel cargue completamente, lo que lo hace extremadamente difícil de detectar.

## El Kernel y el Espacio de Usuario

No puedes entender la seguridad de Linux sin entender la división entre kernel space y user space.

El kernel es el núcleo del sistema operativo. Corre en el nivel más privilegiado del procesador (Ring 0). Tiene acceso directo a la memoria física, al hardware, a las interrupciones. Si el kernel falla, la máquina entera falla con un "kernel panic".

Los programas de usuario (y el malware) corren en user space (Ring 3). No tienen acceso directo al hardware. Cuando un programa quiere leer un archivo o enviar datos por la red, tiene que pedirselo al kernel a través de una "system call" (llamada al sistema). El kernel decide si permite la operación basándose en los permisos del usuario que ejecuta el programa.

Las system calls son la interfaz entre user space y kernel space. Algunas de las más comunes:
- `open()`: Abre un archivo.
- `read()`: Lee datos de un descriptor de archivo.
- `write()`: Escribe datos en un descriptor de archivo.
- `fork()`: Crea un nuevo proceso.
- `execve()`: Ejecuta un programa.
- `socket()`: Crea un socket de red.
- `connect()`: Conecta un socket a una dirección remota.

Un atacante que quiere hacer algo que requiere privilegios elevados (como leer la memoria de otro proceso) necesita:
1. Ejecutar código en un contexto que ya tiene esos privilegios (escalada de privilegios), o
2. Explotar una vulnerabilidad en el kernel que le permita ejecutar código en kernel space (kernel exploit).

Esta separación es la base de la seguridad de Linux. Incluso si un programa es malicioso, no puede hacer daño directo al hardware a menos que explote una vulnerabilidad en el kernel mismo.

### Cuando Falla la Separacion

Históricamente, vulnerabilidades como **Dirty COW** (CVE-2016-5195) permitieron a un atacante local escalar privilegios explotando una condición de carrera en el manejo de copy-on-write del kernel. Dirty COW estuvo presente en el kernel de Linux por nueve años antes de ser descubierta y parcheada.

Otra vulnerabilidad famosa fue **CVE-2014-3153** (conocida como "towelroot"), que afectaba el manejo de futexes del kernel y permitia escalar privilegios en dispositivos Android. Fue usada ampliamente para rootear dispositivos.

**CVE-2017-1000112** fue una vulnerabilidad en el manejo de UDP del kernel que permitia denegación remota de servicio o potencialmente ejecución de código.

**CVE-2021-3493** fue una vulnerabilidad en el sistema de archivos overlayfs de Linux que permitia a un usuario local escalar privilegios a root. Afectaba a Ubuntu y otras distribuciones.

Estos casos ilustran por qué mantener el kernel actualizado es la medida de seguridad más importante en cualquier servidor Linux. Un servidor con kernel antiguo es vulnerable a exploits públicos que cualquier atacante con acceso local puede ejecutar.

## Distribuciones: El Mismo Motor, Diferentes Carrocerias

Técnicamente, "Linux" es solo el kernel. Lo que la mayoría de la gente llama "Linux" es en realidad una distribución: el kernel de Linux empaquetado junto con programas, bibliotecas, un gestor de paquetes y configuraciones por defecto.

Diferentes distribuciones toman decisiones de diseño distintas que afectan la seguridad. No es lo mismo administrar un Ubuntu Desktop que un Red Hat Enterprise Linux o un Alpine Linux minimalista.

### Familias de Distribuciones

La mayoría de las distribuciones derivan de tres grandes familias:

**Debian y derivados (Ubuntu, Kali Linux, Parrot OS):** Usan el gestor de paquetes `apt` y paquetes `.deb`. Ubuntu es la distribución más popular en servidores web y cloud computing. Kali Linux es una distribución basada en Debian pre-cargada con herramientas de pentesting. El modelo de actualizaciones de Debian es extremadamente conservador, priorizando la estabilidad sobre la novedad, lo cual es bueno para servidores pero malo para soporte de hardware reciente.

**Red Hat y derivados (CentOS, Fedora, Rocky Linux, AlmaLinux):** Usan el gestor de paquetes `dnf` (antes `yum`) y paquetes `.rpm`. Red Hat Enterprise Linux (RHEL) es el estándar en entornos corporativos y gubernamentales, con ciclos de soporte de hasta 10 años. CentOS, que antes era la versión gratuita de RHEL, cambio su modelo a CentOS Stream (rolling release), lo que llevo a la creación de Rocky Linux y AlmaLinux como reemplazos.

**Arch Linux y derivados:** Usan `pacman` y siguen un modelo rolling release donde las actualizaciones son continuas. No recomendado para servidores de producción por su naturaleza inestable, pero excelente para aprender el funcionamiento interno de Linux porque te obliga a configurar todo manualmente.

**Distribuciones minimalistas (Alpine Linux):** Usan `apk` y están diseñadas para ser lo más pequeñas posible. Son populares en contenedores Docker por su tamaño reducido (~5MB). Sin embargo, usan `musl` en vez de `glibc`, lo que puede causar incompatibilidades con software que espera la biblioteca estándar de GNU.

### Implicaciones de Seguridad por Distribución

No es lo mismo administrar seguridad en Debian que en RHEL. Algunas diferencias prácticas:

**AppArmor vs SELinux**: Debian/Ubuntu usan AppArmor por defecto; Red Hat usa SELinux. Ambos son sistemas de control de acceso obligatorio (MAC), pero su configuración es radicalmente diferente. SELinux es más granular pero más complejo de configurar. AppArmor es más fácil de usar pero menos flexible.

**Parches de seguridad**: RHEL tiene un ciclo de soporte de 10 años con parches backporteados. Ubuntu LTS tiene 5 años (extensible a 10 con Ubuntu Pro). Debian estable tiene aproximadamente 3 años de soporte. Alpine tiene un ciclo de soporte variable.

**Configuraciones por defecto**: Ubuntu instala muchos servicios innecesarios por defecto. Alpine instala lo mínimo indispensable. Un servidor Ubuntu recién instalado tiene mayor superficie de ataque que uno Alpine, pero también es más fácil de administrar para un principiante.

Un error que cometen los principiantes es asumir que todas las distribuciones se configuran igual. Un comando como `firewall-cmd` solo funciona en Red Hat. En Debian usas `ufw` o `iptables` directamente. Y en Alpine usas `iptables` o `nftables` directamente.

Otra diferencia crítica: en Ubuntu, los servicios se administran con `systemctl`. En algunas distribuciones antiguas o minimalistas, los servicios se administran con scripts en `/etc/init.d/`. Si intentas usar `systemctl` en un sistema sin systemd, el comando fallará.

## Casos Reales de Incidentes de Seguridad Relacionados

**El Ataque a Equifax (2017):** Equifax sufrio una de las filtraciones más grandes de la historia (147 millones de personas) por no parchear una vulnerabilidad en Apache Struts. El servidor afectado corria Linux. El equipo de seguridad sabia de la vulnerabilidad desde hacia meses pero no aplico el parche. Este caso muestra que la seguridad de Linux no depende del sistema operativo sino de la disciplina del administrador. El sistema operativo más seguro del mundo es inseguro si no se actualiza.

**El Gusano Mirai (2016):** Mirai infectaba dispositivos IoT que corrian Linux en versiones antiguas con contraseñas por defecto sin cambiar. Los dispositivos comprometidos (cámaras IP, routers, DVRs) formaron una botnet que lanzo ataques DDoS de hasta 1 Tbps contra Dyn, derribando sitios como Twitter, Netflix y Reddit. La lección: no importa que Linux sea seguro si el administrador deja la contraseña por defecto. El código fuente de Mirai se público en líneas, lo que llevo a innumerables variantes.

**El Hackeo a los Servidores de la Universidad de Cambridge (2020):** Atacantes comprometieron servidores Linux de la universidad a través de vulnerabilidades en servicios expuestos -- SSH con contraseñas débiles y servidores web sin parchear. Los atacantes instalaron mineros de criptomonedas en `/tmp` y establecieron persistencia mediante servicios systemd ocultos. El incidente se detecto porque un administrador noto que el comando `top` mostraba uso de CPU anormalmente alto durante horas de baja actividad.

**El Caso de la Linux Mint Website (2016):** Atacantes comprometieron el sitio web de Linux Mint y reemplazaron la imagen ISO oficial con una versión modificada que contenia un backdoor. Los usuarios que descargaron e instalaron el sistema desde esa ISO comprometida recibieron un sistema infectado de fábrica. Esto muestra que la cadena de suministro (supply chain) es un vector de ataque incluso para el software de código abierto más confiable.

**Dirty COW (2016):** Dirty COW (CVE-2016-5195) fue una vulnerabilidad en el kernel de Linux que permitia a cualquier usuario local escalar privilegios a root. La vulnerabilidad existio por 9 años en el kernel antes de ser descubierta. Afectaba a todas las distribuciones Linux. Los atacantes usaban un exploit simple que se podía descargar y compilar en segundos para obtener acceso root en cualquier servidor donde tuvieran una cuenta local.

## Ángulo Hacker: Como los Atacantes Explotan estos Conceptos

Un atacante que compromete un servidor Linux suele seguir estos pasos:

**Enumeración inicial:** El atacante lista los usuarios del sistema leyendo `/etc/passwd` (que es legible por todos). Identifica cuentas humanas vs cuentas de servicio, y busca cuentas inactivas o mal configuradas. También revisa `/etc/group` para entender la estructura de grupos.

**Búsqueda de configuraciones débiles:** El atacante busca archivos con permisos incorrectos: archivos world-writable, archivos SUID/SGID que no deberían tener ese bit, directorios con permisos 777.

**Escalada de privilegios:** El atacante busca archivos SUID mal configurados con `find / -perm -4000`. Si encuentra un binario SUID que no debería serlo, puede explotarlo para volverse root. También busca kernels vulnerables con exploits públicos, por ejemplo ejecutando `uname -a` para obtener la versión del kernel y comparandola con una base de datos de vulnerabilidades.

**Persistencia:** El atacante crea archivos en `/etc/cron.d/` o instala un servicio systemd que arranque su malware automáticamente. La técnica favorita es añadir una línea en `/etc/crontab` que ejecute un script desde `/tmp` cada minuto. También puede modificar `~/.bashrc` o `~/.profile` del administrador para ejecutar código cada vez que el administrador inicia sesión.

**Limpieza de rastros:** El atacante modifica o elimina archivos de log en `/var/log`. También puede modificar `~/.bash_history` para eliminar comandos incriminatorios. Los atacantes avanzados usan `logrotate` para forzar la rotación de logs antes de tiempo, eliminando evidencia de forma que parezca una operación normal del sistema.

**Uso de /tmp como base de operaciones:** Descarga herramientas en `/tmp`, ejecuta el exploit desde ahí, y si logra persistencia, mueve el malware a `/usr/local/bin` con un nombre que imite a un programa legítimo como `syslogd` o `crond`.

**Movimiento lateral:** Usa las claves SSH que encuentra en `/home/*/.ssh/` para conectarse a otros servidores. Un solo servidor comprometido puede ser la puerta de entrada a toda la red corporativa.

## Modos de Falla Comunes

**Permisos 777 en archivos críticos:** Ejecutar `chmod 777 -R /var/www` para que "el sitio funcione" deja todo el servidor web expuesto a modificaciones por cualquier proceso del sistema.

**Firewall desactivado o mal configurado:** Instalar un servicio de base de datos y olvidar configurar el firewall para que solo acepte conexiones locales. La base de datos queda expuesta a Internet.

**SSH con PermitRootLogin yes:** Permitir que el usuario root inicie sesión directamente por SSH expone el sistema a ataques de fuerza bruta sobre la cuenta más poderosa del sistema.

**Logs sin rotación:** Dejar que los logs crezcan sin control hasta llenar el disco. Cuando el disco se llena, los servicios dejan de funcionar y el sistema entero se vuelve inestable.

**Actualizaciones automáticas desactivadas:** Configurar el sistema para que no instalé actualizaciones de seguridad porque "podría romper algo". El sistema se vuelve vulnerable a exploits públicos.

**Montar /tmp sin restricciones:** No usar las opciones `noexec,nosuid,nodev` en `/tmp` permite a los atacantes ejecutar malware directamente desde ahí.

**Usar la cuenta root para todo:** Trabajar como root permanentemente en vez de usar `sudo`. Cualquier error, una tecla mal presionada, y el sistema puede quedar inservible.

**Confiar en la seguridad por oscuridad:** Pensar que cambiar el puerto de SSH basta para proteger el servidor. No detiene a un atacante real, solo reduce el ruido de los bots.

## Autoevaluación

1. Tu servidor Linux deja de arrancar. El mensaje de error indica que la particion raíz esta corrupta. Sin embargo, tienes otra particion con datos intactos en `/home`. Explica por qué el sistema no puede arrancar aunque los datos de los usuarios estén intactos, y describe que pasos tomarias para recuperar el sistema.

2. Encuentras un archivo sospechoso en `/tmp` llamado `.systemd-update.sh`. Cuando lo abres con `cat`, ves código que descarga un binario desde una IP extraña y lo ejecuta. Explica por qué el atacante eligio `/tmp` y que podrías hacer para prevenir la ejecución de este tipo de archivos sin impedir que las aplicaciones legítimas usen `/tmp`.

3. Un administrador te dice que su servidor Linux es seguro porque instalo un antivirus y el antivirus no encuentra nada malo. Explica por qué el modelo de permisos de Linux es más fundamental que cualquier antivirus, y menciona al menos tres técnicas de ataque que un antivirus no detectaria.

4. Durante una investigación forense, encuentras que los archivos de log en `/var/log/auth.log` fueron borrados, pero los logs del servicio web en `/var/log/apache2/` están intactos. Que te dice esto sobre el nivel de sofisticacion del atacante? Que prioridades tuvo y por qué no borró los otros logs?

5. Descargas un programa desde Internet y al ejecutarlo, el sistema dice "Permission denied". Ni siquiera te pregunta si quieres ejecutarlo con permisos de administrador. Explica que mecanismo de seguridad de Linux esta bloqueando la ejecución y por qué esto es mejor que el modelo de Windows donde un doble clic puede ejecutar cualquier descarga.

6. Un colega insiste en usar Ubuntu Desktop para un servidor web de producción crítico. Tu prefieres usar Debian Server o una distribución minimalista. Defiende tu posición basándote en superficie de ataque, servicios por defecto, ciclo de actualizaciones y comunidad de soporte.

7. Examinas `/etc/passwd` y ves que hay una cuenta llamada `backup` con shell `/bin/bash` que ha estado inactiva por 3 años. La contraseña de la cuenta tiene 20 caracteres. Explica por qué esta cuenta sigue siendo un riesgo de seguridad, incluso con una contraseña fuerte.

8. Un atacante logra acceso a tu servidor como el usuario `www-data` (el usuario del servidor web). Explica por qué este es solo el primer paso y describe que debe hacer el atacante para volverse root. Menciona al menos dos técnicas específicas de escalada de privilegios que usaria.
