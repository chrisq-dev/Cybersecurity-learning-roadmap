---
title: "Permisos y Usuarios: El Castillo y Sus Reglas"
---

# Permisos y Usuarios: El Castillo y Sus Reglas

## Objetivo de esta Guía

La seguridad de un servidor Linux no recae en antivirus ni en firewalls externos. Recae en su sistema de permisos. Linux heredo su modelo de seguridad de Unix, que fue diseñado en los laboratorios Bell en los años 70. Linus Torvalds creo Linux en 1991 manteniendo esa misma filosofía: asumir que múltiples personas y procesos comparten la misma máquina y no deben poder interferir entre si.

En Windows, cuando descargas un programa y le das doble clic, este intenta ejecutarse. En Linux, si descargas un programa destructivo e intentas ejecutarlo, el sistema te dirá: "Permiso denegado". No hay una ventana preguntando si quieres ejecutarlo con permisos de administrador. Simplemente no se ejecuta.

Esa diferencia no es accidental. Responde a una filosofía de diseno donde el principio de mínimo privilegio esta integrado en el sistema operativo desde su base, no anadido como una capa posterior. Entender como funcionan los permisos en Linux no es una opción para un profesional de seguridad: es el requisito mínimo para poder defender un servidor.

Esta guía cubre usuarios, grupos, permisos clasicos (rwx), permisos especiales (SUID, SGID, sticky bit), sudo, y como cada uno de estos conceptos puede ser tanto una herramienta de defensa como un vector de ataque.

## La Analogía: El Edificio de Departamentos

Voy a alejarme del castillo medieval que se usa en tantos tutoriales. En su lugar, imagina un edificio de departamentos con administración.

El **edificio** es el servidor Linux. Tiene áreas comunes y departamentos privados.

Los **usuarios** son los inquilinos. Cada inquilino tiene su propio departamento (`/home/usuario`) donde puede hacer lo que quiera: mover muebles, pintar las paredes, esconder cosas. Pero no puede entrar al departamento de otro inquilino.

Los **grupos** son como las asociaciones de inquilinos. El "Grupo de Mantenimiento" puede acceder a la sala de calderas. El "Grupo de Seguridad" puede acceder al cuarto de cámaras. Un inquilino puede pertenecer a varios grupos.

Los **permisos** son las cerraduras de las puertas. El dueño del departamento decide quien tiene llave de su puerta (lectura), quien puede modificar la cerradura (escritura), y quien puede cruzar la puerta (ejecución).

El **root** es el dueño del edificio. Tiene una llave maestra que abre absolutamente todas las puertas, incluyendo la caja fuerte del banco en el primer piso. No hay cerradura que lo detenga.

La **administración** a través de `sudo` es como tener un sistema donde los inquilinos pueden pedirle al superintendente que abra una puerta específica, pero solo si el superintendente (sudo) tiene registrado que ese inquilino tiene permiso para esa puerta en particular.

Esta analogía es útil porque refleja la realidad de los permisos en Linux: no son globales, sino específicos por recurso. Cada archivo, cada directorio, cada dispositivo tiene su propia lista de quien puede hacer que.

## Usuarios y Grupos: La Base del Modelo

pasa si no entiendes usuarios y grupos en Linux? No puedes asegurar nada. Es como tener un edificio sin saber quien vive en cada departamento.

Linux es un sistema multiusuario. Desde su diseno original, asume que múltiples personas pueden usar la misma máquina al mismo tiempo, ya sea a través de terminales físicas, conexiones de red, o procesos que se ejecutan en segundo plano.

### El Usuario Root

El usuario root (UID 0) es el administrador supremo. No tiene restricciones de permisos. Puede leer, escribir y ejecutar cualquier archivo, matar cualquier proceso, modificar cualquier configuración.

El poder absoluto del root es necesario pero peligroso. Un error típico de administradores novatos es iniciar sesión como root para todo el trabajo diario. Esto significa que cualquier error, cualquier script malicioso, cualquier comando mal escrito tiene acceso total al sistema.

La regla de oro: usa root solo para tareas específicas de administración que lo requieran. Para todo lo demás, usa una cuenta de usuario normal y `sudo`.

### Usuarios del Sistema vs Usuarios Humanos

Linux distingue entre dos tipos de cuentas:

**Usuarios humanos:** Tienen inicio de sesión, contraseña, carpeta personal en `/home`, y un shell asignado. Ejemplos: `juan`, `maria`, `admin`.

**Usuarios del sistema (system accounts):** No representan personas reales. Existen para que los servicios del sistema tengan una identidad con la cual ejecutarse. Ejemplos: `www-data` (servidor web), `mysql` (base de datos), `sshd` (servicio SSH).

Estos usuarios del sistema no tienen contraseña (tienen `!` o `*` en `/etc/shadow`) y su shell suele ser `/usr/sbin/nologin` o `/bin/false`, lo que impide que alguien inicie sesión como ellos.

La separacion entre usuarios de sistema y humanos es una medida de seguridad. Si un atacante compromete el servidor web, gana acceso como `www-data`, no como root. Para hacer daño significativo, necesita escalar privilegios.

### El Archivo /etc/passwd

Cada línea en `/etc/passwd` representa un usuario y tiene el formato:

`usuario:x:UID:GID:descripcion:/home/usuario:/bin/bash`

Campos:
- `usuario`: Nombre de la cuenta.
- `x`: Indica que la contraseña esta en `/etc/shadow`. Si este campo esta vacio, la cuenta no tiene contraseña.
- `UID`: User ID. 0 es root, 1-999 son usuarios del sistema, 1000+ son usuarios humanos.
- `GID`: Group ID del grupo primario del usuario.
- `descripcion`: Nombre completo o descripción del usuario (GECOS field).
- `/home/usuario`: Ruta al directorio personal.
- `/bin/bash`: Shell que se ejecuta al iniciar sesión.

### El Archivo /etc/shadow

Contiene las contraseñas hasheadas y solo es legible por root. Formato:

`usuario:$6$salt$hash:18345:0:99999:7:...`

- `$6$`: Algoritmo de hash (SHA-512). `$2y$` es Blowfish, `$5$` es SHA-256.
- `salt`: Valor aleatorio anadido al hash para prevenir ataques de tablas rainbow.
- `hash`: El hash de la contraseña.
- `18345`: Dias desde el 1 de enero de 1970 hasta el último cambio de contraseña.
- `0`: Dias minimos entre cambios de contraseña.
- `99999`: Dias máximos antes de que la contraseña expire.
- `7`: Dias de advertencia antes de la expiracion.

Si ves `!` o `*` en el campo de hash, la cuenta esta bloqueada o deshabilitada.

Un atacante que logra leer `/etc/shadow` intentará romper los hashes. La velocidad de ruptura depende del algoritmo:
- MD5 (`$1$`): Miles de millones de intentos por segundo con hardware moderno.
- SHA-512 (`$6$`): Cientos de miles de intentos por segundo.
- bcrypt (`$2y$`): Miles de intentos por segundo (mucho más seguro).
- yescrypt: El estándar más reciente, diseñado para ser costoso computacionalmente.

### Grupos

Los grupos permiten gestionar permisos para conjuntos de usuarios. Cada usuario tiene un grupo primario (definido en `/etc/passwd`) y puede pertenecer a grupos secundarios (definidos en `/etc/group`).

El archivo `/etc/group` tiene el formato:
`nombre:x:GID:usuario1,usuario2,usuario3`

Comandos para gestionar grupos:
- `groups`: Muestra los grupos del usuario actual.
- `groups usuario`: Muestra los grupos de un usuario específico.
- `groupadd nombre`: Crea un grupo nuevo.
- `usermod -aG grupo usuario`: Añade un usuario a un grupo (la `-a` es importante porque sin ella reemplaza todos los grupos del usuario).

Un error común es olvidar la `-a` en `usermod -G`. Sin ella, el usuario pierde todos los grupos que no estén en la lista, lo que puede causar pérdida de acceso a archivos y directorios.

## La Triada de Permisos (rwx)

Cuando ejecutas `ls -l`, la primera columna muestra una cadena como `-rwxr-xr--`. Esta cadena codifica los permisos del archivo.

### Estructura

`-rwxr-xr--` se divide en:
- Posición 1: Tipo de archivo (`-` regular, `d` directorio, `l` link, etc.).
- Posiciones 2-4: Permisos del dueño (user).
- Posiciones 5-7: Permisos del grupo (group).
- Posiciones 8-10: Permisos de otros (others).

### Los Tres Permisos

**r (Read - Lectura, valor 4):** Permite abrir el archivo y ver su contenido. En un directorio, permite listar los archivos que contiene (pero no necesariamente acceder a ellos).

**w (Write - Escritura, valor 2):** Permite modificar el contenido del archivo. En un directorio, permite crear y borrar archivos dentro de el (incluso si no eres dueño de esos archivos).

**x (Execute - Ejecución, valor 1):** Permite ejecutar el archivo como un programa. En un directorio, permite atravesarlo (entrar a el) y acceder a los archivos dentro, incluso si no puedes listarlos.

### La Interacción Peligrosa entre r, w y x en Directorios

Los permisos en directorios se comportan diferente que en archivos, y esto es fuente de confusión y vulnerabilidades:

- `r` en un directorio te permite listar su contenido (con `ls`).
- `w` en un directorio te permite crear y borrar archivos dentro de el.
- `x` en un directorio te permite acceder a archivos dentro si conoces su nombre.

La combinación `-wx` (sin `r`) es interesante para seguridad. Te permite crear y borrar archivos, y acceder a archivos si conoces su nombre exacto, pero no puedes listar el contenido del directorio. Esto se usa en directorios compartidos donde los usuarios deben poder depositar archivos pero no ver los archivos de otros.

La combinación `r-x` te permite listar y acceder, pero no crear ni borrar archivos.

La combinación `rwx` te da control total sobre el directorio.

### Notacion Simbolica vs Notacion Octal

Los permisos se pueden expresar de dos formas:

**Simbolica:** `chmod u+x archivo.sh` añade ejecución al dueño. `chmod g-w archivo` quita escritura al grupo. `chmod o=r archivo` pone solo lectura para otros.

**Octal (numérica):** `chmod 755 archivo` asigna rwxr-xr-x. Esta es la forma preferida por administradores experimentados porque es más precisa y menos propensa a errores.

Cálculo de 755:
- Dueño: rwx = 4+2+1 = 7
- Grupo: r-x = 4+0+1 = 5
- Otros: r-x = 4+0+1 = 5

### Permisos por Defecto y umask

Cuando creas un archivo nuevo, Linux le asigna permisos por defecto. El comando `umask` determina que permisos se QUITAN al crear archivos y directorios.

La umask es una máscara de bits. Una umask de `022` significa que los permisos de escritura para grupo y otros se quitan:
- Archivos se crean con `666 - 022 = 644` (rw-r--r--).
- Directorios se crean con `777 - 022 = 755` (rwxr-xr-x).

Una umask de `077` es más restrictiva: los archivos se crean con `600` (solo el dueño puede leer/escribir) y directorios con `700`.

En servidores de producción, una umask restrictiva (077) es recomendable para evitar exposición accidental de datos sensibles.

## Cambio de Permisos: chmod

`chmod` modifica los permisos de archivos y directorios.

### Uso con Octal

`chmod 644 archivo.txt`: rw-r--r--. Estándar para archivos de texto.
`chmod 755 script.sh`: rwxr-xr-x. Estándar para scripts ejecutables.
`chmod 600 clave.pem`: rw-------. Estándar para claves privadas SSH.
`chmod 700 directorio/`: rwx------. Solo el dueño puede acceder.

### Uso con Símbolos

`chmod +x archivo`: Añade ejecución para todos (dueño, grupo, otros).
`chmod o-r archivo`: Quita lectura para otros.
`chmod u=rwx,g=rx,o= archivo`: Dueño tiene todo, grupo tiene rx, otros no tienen nada.

### La Opción Recursiva -R

`chmod -R 755 directorio/` cambia permisos recursivamente en todo un árbol de directorios. Esto es peligroso porque puede poner permisos incorrectos en archivos que no deberían ser ejecutables.

Mejor práctica: separar archivos y directorios:
`find directorio/ -type d -exec chmod 755 {} \;`
`find directorio/ -type f -exec chmod 644 {} \;`

## Cambio de Dueño: chown

`chown` cambia el dueño y grupo de un archivo.

`chown usuario archivo.txt`: Cambia el dueño a `usuario`.
`chown usuario:grupo archivo.txt`: Cambia dueño y grupo.
`chown :grupo archivo.txt`: Cambia solo el grupo.

Solo root puede cambiar el dueño de un archivo. Un usuario normal no puede "regalar" un archivo a otro usuario (hay excepciones con capacidad CAP_CHOWN, pero no es común).

### Escenario de Seguridad

En servidores web, es común que los archivos estaticos (HTML, CSS, imagenes) sean propiedad de `www-data` para que el servidor web pueda leerlos, pero no de `www-data` para que si el servidor web es comprometido, el atacante no pueda modificar los archivos.

La configuración tipica:
- `/var/www/html/` es propiedad de `root:www-data`.
- Los permisos son `755` para directorios y `644` para archivos.
- El servidor web (www-data) puede leer pero no escribir.

Para aplicaciones web que necesitan subir archivos, se crea un directorio específico con permisos de escritura solo para www-data, en lugar de dar permisos generosos a todo el árbol.

## chmod 777: El Error Común

`chmod 777 archivo` da permisos totales (rwx) a todos: dueño, grupo y otros. Esto es casi siempre un error y un riesgo de seguridad.

Cuando alguien dice "no me funciona, mejor pongo 777", esta tirando la toalla en lugar de diagnosticar el problema real. Los permisos 777 significan que cualquier proceso en el sistema, incluso uno comprometido por un atacante, puede modificar o ejecutar ese archivo.

Si el archivo es un script de PHP en un servidor web, cualquier usuario del sistema puede modificarlo. Si el atacante logra acceso como cualquier usuario, puede añadir codigo malicioso al script.

Si el archivo es un directorio, cualquier usuario puede borrar archivos dentro, incluso los que no le pertenecen.

Un comando como `chmod 777 -R /var/www/` es una invitación a ser hackeado.

## Permisos Especiales: SUID, SGID, Sticky Bit

Además de los permisos básicos rwx, Linux tiene tres permisos especiales que alteran el comportamiento de ejecución y herencia.

### SUID (Set User ID) - Valor 4000

Cuando un archivo tiene el bit SUID activado, se ejecuta con los permisos del dueño del archivo, no del usuario que lo ejecuta.

Visualmente aparece como `s` en la posición del dueño: `-rwsr-xr-x`.

El ejemplo clásico es `passwd`:
`-rwsr-xr-x 1 root root 63944 ago 22 10:32 /usr/bin/passwd`

Cuando un usuario normal ejecuta `passwd`, el proceso corre como root (el dueño del archivo), permitiendo que modifique `/etc/shadow`. Sin el bit SUID, un usuario normal no podría cambiar su propia contraseña porque no tiene permisos para escribir en `/etc/shadow`.

### Peligro del SUID

El SUID es peligroso porque permite a usuarios sin privilegios ejecutar codigo con privilegios elevados. Si un binario SUID tiene una vulnerabilidad (buffer overflow, injection, etc.), cualquier usuario puede explotarla para escalar a root.

Un atacante que compromete un servidor busca inmediatamente archivos SUID con:
`find / -perm -4000 2>/dev/null`

Si encuentra binarios SUID inusuales o mal configurados, intenta explotarlos.

Técnicas de explotación de SUID:
- **SUID shell scripts:** Los shells ignoran el bit SUID por seguridad, pero otros interpretes (Python, Perl) pueden heredarlo si no están configurados correctamente.
- **SUID con inyección de variables:** Explotar `LD_PRELOAD` en binarios SUID que no lo tienen deshabilitado.
- **Path hijacking en SUID:** Si un binario SUID ejecuta otros programas sin usar rutas absolutas, se puede manipular `PATH` para que ejecute un binario malicioso.

### Mitigación de SUID

- Minimizar la cantidad de binarios SUID en el sistema.
- Monitorear cambios en la lista de binarios SUID con herramientas como `aide` o `tripwire`.
- Montar particiones como `/home` y `/tmp` con la opción `nosuid` para prevenir que usuarios creen sus propios binarios SUID.

### SGID (Set Group ID) - Valor 2000

Similar al SUID pero para el grupo. Un archivo con SGID se ejecuta con los permisos del grupo del archivo.

En directorios, el SGID tiene un efecto especial: los archivos creados dentro del directorio heredan el grupo del directorio, no el grupo primario del usuario que los crea. Esto es útil para directorios compartidos donde todos los miembros de un grupo deben poder editar los archivos.

Visualmente: `-rwxr-sr--` o `drwxrws---`.

### Sticky Bit - Valor 1000

El sticky bit se aplica a directorios. Cuando esta activado, los usuarios solo pueden borrar o renombrar archivos de los que son dueños, incluso si tienen permisos de escritura en el directorio.

Visualmente: `drwxrwxrwt` (la `t` al final).

El ejemplo clásico es `/tmp`:
`drwxrwxrwt 1 root root 4096 jun 26 10:00 /tmp`

Cualquier usuario puede escribir en `/tmp` (permisos 777), pero solo el dueño de cada archivo puede borrarlo. Sin el sticky bit, un usuario podría borrar los archivos temporales de otros usuarios.

## Sudo: La Puerta Controlada

`sudo` (SuperUser DO) permite a usuarios autorizados ejecutar comandos con los privilegios de otro usuario (normalmente root) sin compartir la contraseña de ese usuario.

### Por que sudo y no root

Usar `sudo` en lugar de iniciar sesión como root:
- **Auditoría:** Cada comando ejecutado con `sudo` queda registrado en `/var/log/auth.log`. Puedes saber exactamente quien ejecutó que y cuando.
- **Granularidad:** Puedes permitir que un usuario ejecute SOLO ciertos comandos como root, no todos.
- **Contraseña:** El usuario usa su propia contraseña, no la de root. No necesitas compartir la contraseña de root con nadie.
- **Protección contra errores:** Si ejecutas un comando destructivo sin `sudo`, el sistema te dirá "Permiso denegado". Si ejecutas el mismo comando con `sudo` (y tienes permiso), el sistema lo ejecutará. `sudo` fuerza una pausa consciente antes de acciones privilegiadas.

### El Archivo /etc/sudoers

El archivo `/etc/sudoers` define las reglas de sudo. Siempre se edita con `visudo`, que valida la sintaxis antes de guardar para evitar bloquearte del sistema.

Formato básico:
`usuario HOST=(USUARIO:GRUPO) TAG: COMANDO`

Ejemplos:
- `juan ALL=(ALL) ALL`: Juan puede ejecutar cualquier comando como cualquier usuario en cualquier host.
- `maria ALL=(ALL:ALL) ALL`: Maria puede ejecutar cualquier comando como cualquier usuario y grupo.
- `%admin ALL=(ALL) ALL`: Todos los miembros del grupo admin pueden ejecutar cualquier comando.
- `juan ALL=(root) /usr/bin/systemctl restart apache2`: Juan solo puede reiniciar Apache.
- `juan ALL=(root) NOPASSWD: /usr/bin/apt update`: Juan puede ejecutar `apt update` sin poner contraseña.

### Ángulo Hacker: Abusando de sudo

Un atacante que compromete una cuenta con acceso a sudo limitado busca formas de escapar de las restricciones:

- **Ejecución de editores:** Si el usuario puede ejecutar `vim` como root con sudo, el atacante puede usar `:!bash` dentro de vim para obtener un shell root.
- **Ejecución de less/man:** Similar a vim, `!comando` dentro de less o man permite ejecutar comandos.
- **Herramientas de búsqueda:** Si el usuario puede ejecutar `find` como root, puede usar `-exec` para ejecutar comandos: `sudo find / -exec /bin/bash \;`.
- **Cambio de contraseña:** Si el usuario puede ejecutar `passwd` como root, puede cambiar la contraseña de root.

Por eso el diseno de reglas de sudo debe ser específico y considerar las capacidades de escape de cada programa.

### sudoers Mal Configurado: Escenarios de Riesgo

`usuario ALL=(ALL) NOPASSWD: ALL`: El usuario tiene poder total sin contraseña. Si esta cuenta es comprometida, el atacante tiene root inmediato.

`usuario ALL=(root) /usr/bin/vim`: El usuario puede ejecutar vim como root. Vim permite ejecutar comandos del shell con `:!comando`. El atacante puede ejecutar cualquier cosa.

`usuario ALL=(root) /bin/cat /var/log/auth.log`: Parece restrictivo, pero el usuario no necesita restriccion porque `cat` es de solo lectura. Sin embargo, si el atacante puede leer archivos privilegiados, podría leer `/etc/shadow`.

## Modos de Falla Comunes

**Permisos 777 en producción:** Es el error más común. Un administrador novato ejecuta `chmod 777 -R /var/www` para solucionar un problema de permisos temporalmente. Lo "temporal" se vuelve permanente, y el servidor queda abierto a modificaciones no autorizadas.

**Contraseñas en texto plano en scripts:** Guardar la contraseña de root o de bases de datos en scripts shell con permisos 755. Cualquier usuario del sistema puede leer el script y obtener las credenciales.

**Cuentas sin contraseña:** Crear una cuenta y olvidar asignarle contraseña. La cuenta queda sin protección. Cualquiera que conozca el nombre de usuario puede iniciar sesión.

**Cuentas de sistema con shell activo:** Usuarios del sistema como `ftp` o `nobody` con shell `/bin/bash` en vez de `/usr/sbin/nologin`. Si alguien logra autenticarse como ese usuario, obtiene un shell interactivo.

**Grupo sudo heredado:** Añadir un usuario al grupo `sudo` (o `wheel` en Red Hat) y olvidar que ese grupo tiene acceso completo. No hay registro de por que se le dio acceso, y nadie lo revoca cuando ya no es necesario.

**Sticky bit faltante en /tmp:** Si el sticky bit no esta en `/tmp`, cualquier usuario puede borrar los archivos temporales de otros, lo que puede usarse para sabotear procesos que dependen de archivos temporales.

**SUID en scripts shell:** Linux ignora el bit SUID en scripts shell interpretados (los que empiezan con `#!`), pero no en scripts binarios o scripts de otros interpretes como Python (si no están configurados correctamente). Esto puede permitir escalada de privilegios si el script tiene una vulnerabilidad.

**Directorio personal de root accesible:** `/root` con permisos 755 permite a cualquier usuario listar su contenido y, en algunos casos, leer archivos de configuración que contienen claves SSH o credenciales.

## Casos Reales

**El Ataque a los Servidores de la Universidad de California (2021):** Un atacante comprometio un servidor Linux a través de una vulnerabilidad en un plugin de WordPress. El servidor web corria como `www-data`. El atacante encontró un binario SUID mal configurado en `/usr/local/bin` (un script de backup con SUID root) y lo uso para escalar privilegios a root inmediatamente. Una vez como root, instalo un rootkit que ocultaba su presencia durante 6 meses antes de ser detectado.

**El Incidente de la Configuración de Docker (2019):** Un administrador anadio su usuario al grupo `docker` para no tener que usar `sudo` con cada comando de Docker. El grupo docker equivale a acceso root sin contraseña. Un proceso malicioso dentro de un contenedor pudo montar el sistema de archivos del host y leer `/etc/shadow`.

**El Caso del Script SUID en un Entorno Compartido (2018):** En un servidor de desarrollo compartido, un desarrollador creo un script con SUID root para que su equipo pudiera reiniciar un servicio sin necesidad de contraseña. El script ejecutaba comandos basados en variables de entorno. Un atacante interno manipuló las variables de entorno para ejecutar comandos arbitrarios como root.

**La Violación de Datos de 23andMe (2023):** Aunque no fue un ataque técnico, el principio de mínimo privilegio se violo a nivel de datos: un atacante obtuvo acceso a una cuenta y, como el sistema no estaba segmentado ni tenía controles de acceso granular, pudo acceder a datos de millones de usuarios. En Linux, la misma lógica aplica: si pones todos los archivos con permisos 777, no importa que tan fuertes sean las contraseñas.

## Ángulo Hacker: Técnicas de Escalada de Privilegios

Un atacante que ha comprometido un servidor como usuario normal necesita escalar privilegios. Estas son las técnicas que usan:

**Búsqueda de SUID/SGID:** `find / -perm -4000 -o -perm -2000 2>/dev/null`. Si encuentra binarios inusuales, los explota. Hay listas públicas de binarios SUID vulnerables.

**sudo -l:** El atacante ejecuta `sudo -l` para listar los comandos que su usuario puede ejecutar como root. Si encuentra herramientas como `vim`, `less`, `awk` o `python`, las usa para escapar a un shell root.

**Kernel exploits:** El atacante ejecuta `uname -a` para obtener la versión del kernel y la busca en bases de datos de exploits públicos. Si el kernel es vulnerable, compila y ejecuta un exploit que le da acceso root.

**Búsqueda de archivos world-writable:** `find / -perm -o+w -type f 2>/dev/null`. Si encuentra archivos de configuración o scripts que cualquiera puede modificar, los altera para ejecutar codigo cuando root los ejecute.

**Búsqueda de archivos con contraseñas:** `grep -r "password" /etc/ /opt/ /usr/local/etc/ 2>/dev/null`. Los administradores suelen dejar contraseñas en archivos de configuración.

**Explotación de cron jobs:** El atacante revisa `/etc/crontab` y los archivos en `/etc/cron.d/` para identificar tareas programadas que se ejecuten como root y que involucren scripts o directorios que el atacante pueda modificar.

**Abuso de capabilities:** Linux capabilities permite asignar privilegios específicos sin SUID. Si un binario tiene la capacidad `CAP_DAC_OVERRIDE`, puede leer cualquier archivo del sistema.

**Escalada via NFS:** Si el sistema exporta directorios via NFS con opciones inseguras (como `no_root_squash`), un atacante con acceso a un cliente NFS puede crear archivos con UID 0 (root) que, al ser ejecutados en el servidor, corren como root.

## Autoevaluación

1. Estas auditando un servidor y encuentras un archivo con permisos `-rwx------ 1 root root 1024 jun 10 09:00 secretos.txt`. Explica exactamente quien puede leer, escribir y ejecutar este archivo, y justifica si esta configuración es adecuada para un archivo que contiene claves criptográficas.

2. Un desarrollador te pide ayuda: "Mi aplicación web necesita escribir archivos en `/var/www/app/uploads/`. Le puse permisos 777 al directorio para que funcione, pero se que esta mal. Que configuración de permisos y dueño debería tener realmente?" Diseña la solución paso a paso.

3. Encuentras en el servidor el binario `/usr/local/bin/custom-backup` con permisos `-rwsr-xr-x 1 root root 24500 jun 10 09:00`. Tu tarea es determinar si esto representa un riesgo. Que comandos ejecutarias para investigar? Que factores determinan si el SUID es peligroso aqui?

4. Explica la diferencia entre ejecutar `sudo /usr/bin/vim /etc/hosts` y tener el binario vim con SUID root. Cual es más seguro y por que? Que implicaciones tiene cada uno para la auditoría?

5. Durante una investigación forense, encuentras que un atacante ejecutó `chmod 777 /etc/shadow`. Explica que logró el atacante con esto y como podrías detectar este cambio. Que monitoreo preventivo recomendarias para detectar cambios similares?

6. Tu servidor tiene la particion `/tmp` montada sin la opción `nosuid`. Un usuario normal crea un binario SUID en `/tmp`. Explica por que esto es peligroso y como lo mitigarias. Que comando usarías para verificar si la particion tiene la opción correcta?

7. Un administrador dice: "No necesito preocuparme por los permisos porque configuró sudo para que los usuarios solo puedan ejecutar `less` como root." Explica por que esta configuración es insegura y como un atacante podría escapar de `less` para obtener un shell root.

8. Revisas `/etc/sudoers` y encuentras estas líneas. Identifica cuáles son riesgos de seguridad y explica por que:
   - `pedro ALL=(ALL) NOPASSWD: ALL`
   - `%researchers ALL=(root) /usr/bin/python3 /home/researchers/scripts/*`
   - `laura ALL=(root) /bin/kill`
   - `backup ALL=(root) /usr/bin/rsync`
