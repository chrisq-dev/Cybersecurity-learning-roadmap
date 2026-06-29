---
title: "Comandos Básicos: Navegación Táctica y Búsqueda"
level: "inicial"
content_type: "guia"
updated: "2026-06-29"
---

# Comandos Básicos: Navegación Táctica y Búsqueda

## Objetivo de esta Guía

Un analista de seguridad o un atacante no usa el ratón para abrir carpetas. Usa la terminal porque es exponencialmente más rápida y poderosa. Mientras que un usuario gráfico tarda segundos en navegar entre directorios haciendo clic, un administrador entrenado puede recorrer todo el sistema de archivos, filtrar millones de líneas de logs, y encontrar un archivo específico en menos tiempo del que le toma al sistema gráfico abrir el explorador de archivos.

Esta guía no es una lista de comandos para memorizar. Es un conjunto de patrones mentales para que pienses en la terminal como un lenguaje, no como un conjunto de herramientas sueltas. Cuando entiendes los patrones -- ubicación, filtrado, búsqueda, composicion -- los comandos individuales se vuelven irrelevantes porque puedes deducir como usar cualquiera.

La mayoría de los tutoriales de Linux te enseñan comandos en orden alfabetico. Eso es inútil. Aqui los vas a aprender en orden funcional: primero a saber donde estas, luego a ver que hay, luego a leer archivos, luego a buscar dentro de ellos, y finalmente a encadenar todo.

## La Analogía: El Buzo en Aguas Turbias

Imagina que te lanzan al océano a medianoche. No ves nada. El agua esta turbia. No sabes si hay tiburones, rocas o un barco hundido cerca. Tienes un equipo de buceo con instrumentos.

La terminal de Linux es así al principio. No hay iconos bonitos. No hay ventanas que se abren. Hay una pantalla negra con un cursor parpadeante. Pero tienes herramientas.

`pwd` es tu localizador GPS. Te dice exactamente en que coordenadas del océano estas.

`ls` es tu linterna submarina. La enciendes y ves las formas a tu alrededor -- archivos, directorios, cosas ocultas.

`cd` es tu propulsor. Te mueve de una coordenada a otra instantáneamente.

`grep` es tu detector de metales. Busca una aguja específica en un pajar de millones de particulas.

`find` es tu sonar. Escanea todo el océano buscando objetos que coincidan con criterios exactos.

El pipe `|` es un tubo que conecta tus instrumentos. Tomas la salida de tu detector de metales y la pasas a tu linterna para iluminar solo lo que te interesa.

Cuando un buzo entra en pánico, empieza a nadar sin dirección, gasta su oxígeno y comete errores. Cuando un administrador novato entra a un servidor sin saber que comando usar, empieza a escribir comandos aleatorios, se pierde en el sistema de archivos y puede dañar algo.

La clave es: no entres en pánico. Usa tus instrumentos en orden. Primero ubicate. Luego explora. Luego busca. Luego actúa.

## Donde Estas: pwd, ls, cd

Sabes cual es el error más común cuando arrancas en terminal? No saber donde estas parado. Parece una boludez, pero ahí se pierden horas.

El prompt de la terminal te da pistas, pero no siempre es confiable. Lo primero que debes hacer al conectarte a un servidor nuevo es confirmar donde estas parado.

### pwd: El GPS

`pwd` significa "Print Working Directory". No tiene opciones complicadas. Solo responde una pregunta: "en que directorio estoy ahora mismo?".

Cuando trabajas en múltiples servidores simultáneamente (algo común en respuesta a incidentes), es fácil olvidar en cual máquina estas y en que directorio. `pwd` es tu ancla. Un reflejo: cada vez que cambias de contexto, ejecuta `pwd` para orientarte.

### ls: La Linterna

`ls` lista el contenido del directorio actual. Pero hay una diferencia abismal entre `ls` a secas y `ls -la`.

`ls` solo muestra los archivos no ocultos, en formato compacto. Esto es prácticamente inútil para seguridad porque los archivos más interesantes (los de configuración, los historiales, los archivos temporales de aplicaciones) suelen comenzar con punto y están ocultos.

`ls -la` es el comando que deberías usar siempre:
- `-l` da formato largo: muestra permisos, dueño, grupo, tamaño, fecha de modificación.
- `-a` muestra todos los archivos, incluyendo los ocultos (los que empiezan con punto).

El `-la` no es opcional. Es el estándar. Cualquier tutorial o guía que muestre `ls` sin banderas te esta ensenando la versión incompleta.

`ls -lah` añade `-h` para mostrar tamanos en formato humano (KB, MB, GB). Esto es útil cuando buscas archivos grandes que no deberían estar ahí, como un atacante que almacena una base de datos robada.

Un truco que uso en investigaciones: `ls -la --sort=time` ordena los archivos por fecha de modificación, mostrando primero los más recientes. Cuando investigas un incidente, los archivos que el atacante tocó suelen estar entre los más recientemente modificados.

Otro: `ls -laR` es una búsqueda recursiva que muestra todo el contenido de subdirectorios. Es ruidoso pero útil para hacer un inventario rápido de lo que hay en una carpeta sospechosa.

### cd: El Propulsor

`cd` es el comando de movimiento. `cd /var/log` te lleva a logs. `cd ~` te lleva a tu home. `cd ..` sube un nivel. `cd -` te regresa al directorio anterior (un truco poco conocido pero útil cuando navegas entre dos directorios).

No hay mucho misterio en `cd`. El error común es escribir rutas relativas sin entender donde estas parado. Si ejecutas `cd logs` estando en `/var`, llegas a `/var/logs`. Si ejecutas `cd logs` estando en `/etc`, te dará error porque `/etc/logs` no existe.

Siempre usa `pwd` antes de `cd` si no estas seguro de tu posición.

## Lectura Estrategica: cat, less, head, tail

Cuando encuentras un archivo en una investigación, no lo abres con un editor gráfico. Lo lees en la terminal. La razón es simple: velocidad. Un editor gráfico carga el archivo entero en memoria, lo que puede tardar segundos o minutos si el archivo es enorme. La terminal te muestra solo lo que necesitas.

### cat: Lectura Directa

`cat` imprime el contenido completo de un archivo en la terminal. Para archivos pequeños, es perfecto. Para archivos grandes, es desastroso -- el texto pasará volando por la pantalla sin que puedas leerlo.

El nombre viene de "concatenate" porque originalmente se usaba para unir archivos: `cat archivo1.txt archivo2.txt > archivo_unido.txt`. Hoy se usa principalmente para lectura rápida.

Nunca uses `cat` en archivos binarios. El resultado será un ruido incomprensible en tu terminal que puede incluso romper la configuración de tu sesión (algunos caracteres de control alteran la terminal).

### less: Lectura Paginada

`less` es la versión inteligente de `cat`. Muestra el archivo página por página. Puedes navegar con las flechas, buscar texto escribiendo `/` seguido del término, y salir con `q`.

`less` no carga el archivo entero en memoria. Solo carga la parte que estas viendo. Esto significa que puedes abrir un archivo de 10GB sin que la terminal se congele. En ciberseguridad, esto es crucial porque los logs de servidores grandes pueden pesar gigabytes.

Truco útil: `less -N archivo.log` muestra los números de línea al costado, lo que ayuda cuando necesitas referenciar una línea específica en un reporte forense.

Después de buscar con `/` en less, presiona `n` para ir a la siguiente coincidencia y `N` para ir a la anterior.

### head: Las Primeras Líneas

`head -n 20 archivo.txt` te muestra las primeras 20 líneas. Sin la bandera `-n`, head muestra 10 líneas por defecto.

Es útil para echar un vistazo rápido a la estructura de un archivo sin abrirlo entero. Cuando recibes un archivo de log de un SIEM y quieres ver su formato antes de procesarlo, `head` es tu comando.

### tail: Las Últimas Líneas

`tail -n 20 archivo.txt` te muestra las últimas 20 líneas. Pero la verdadera potencia esta en `tail -f`.

`tail -f` (follow) se queda ejecutando y muestra en tiempo real las nuevas líneas que se anaden al archivo. Esto es indispensable para monitorear logs en vivo.

Escenario real: Estas respondiendo a un ataque de fuerza bruta activo. Abres una terminal, ejecutas `tail -f /var/log/auth.log`, y ves aparecer en pantalla, en tiempo real, cada intento de conexión fallido. Ves la IP del atacante, el usuario que intenta usar, y cada cuanto lo hace. Con esa información, puedes tomar decisiones inmediatas: bloquear la IP con `iptables`, o notificar al equipo de red para que la filtre en el borde.

### tac: La Versión Inversa

`tac` es `cat` al reves. Muestra el archivo empezando por la última línea. Esto es útil cuando los logs escriben la fecha más reciente al final y quieres ver primero lo último ocurrido.

## Búsqueda en Contenido: grep

`grep` es la herramienta más importante del analista de seguridad. No es una exageración. Hay analistas que resuelven el 80% de sus investigaciones solo con `grep` y pipes.

El nombre viene de "Global Regular Expression Print". En su forma más simple, busca un patrón de texto dentro de uno o varios archivos y muestra las líneas que coinciden.

### Uso Básico en Seguridad

`grep "Failed password" /var/log/auth.log` te muestra todos los intentos fallidos de inicio de sesión. Pero eso es solo el principio.

`grep "Accepted password" /var/log/auth.log` te muestra los inicios de sesión exitosos. Si ves un inicio de sesión exitoso a las 3 AM desde una IP que no reconoces, tienes un indicio de compromiso.

`grep -r "password" /etc/` busca recursivamente en todo `/etc` archivos que contengan la palabra "password". Esto es útil para encontrar configuraciones que exponen contraseñas en texto plano.

### Banderas Críticas de grep

`-i`: Ignora mayúsculas/minusculas. `grep -i "error"` encuentra "Error", "ERROR", "error".

`-v`: Invierte la búsqueda. Muestra las líneas que NO coinciden. `grep -v "^#"` muestra líneas que no son comentarios en un archivo de configuración.

`-c`: Cuenta las coincidencias en vez de mostrarlas. `grep -c "Failed" /var/log/auth.log` te da el número total de intentos fallidos.

`-n`: Muestra el número de línea donde encontró la coincidencia. Útil para referenciar ubicaciones exactas.

`-A 5` y `-B 5`: Muestra 5 líneas después (After) y 5 líneas antes (Before) de la coincidencia. `grep -B 2 -A 2 "192.168.1.100" /var/log/apache2/access.log` te muestra 2 líneas antes y 2 después de cada petición hecha desde esa IP, dandote contexto de la actividad del atacante.

### Patrones con Expresiones Regulares

`grep` acepta expresiones regulares, lo que lo convierte en un motor de búsqueda extremadamente poderoso:

- `grep "^Jan 1" /var/log/auth.log`: Busca líneas que empiecen con "Jan 1".
- `grep "192\.168\." /var/log/syslog`: Busca direcciones IP en el rango 192.168.x.x.
- `grep "[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}" archivo`: Busca cualquier dirección IP (formato básico, no perfecto pero útil).

Una trampa común: los caracteres como el punto (.) en regex significan "cualquier carácter". Si buscas "192.168.1.1", el `.` coincidira con `192X168X1X1` también. Por eso debes escaparlo con `\.`.

### Escenarios Reales con grep

**Detectar escaneo de puertos:** `grep -c "connect to" /var/log/syslog` te dice cuántas conexiones fallidas hubo. Un número anormalmente alto sugiere un escaneo.

**Detectar descargas de malware:** En logs de servidor web: `grep -i "\.exe\|\.zip\|\.scr\|\.ps1" /var/log/apache2/access.log` busca descargas de archivos potencialmente maliciosos.

**Detectar intentos de directory traversal:** `grep "\.\.\/" /var/log/apache2/access.log` busca intentos de salir del directorio raíz del servidor web.

## Búsqueda de Archivos: find

`find` busca archivos en el sistema de archivos según criterios que tu defines. No solo por nombre: también por tamaño, fecha de modificación, permisos, dueño, y más.

### Búsqueda por Nombre

`find / -name "*.conf"` busca todos los archivos que terminan en `.conf` desde la raíz. Este comando puede tardar minutos en discos grandes. Por eso es buena práctica limitar la búsqueda: `find /etc -name "*.conf"` busca solo en `/etc`.

### Búsqueda por Tamaño

`find / -size +1G` encuentra archivos de más de 1GB. Esto es útil en investigaciones forenses donde el atacante pudo haber comprimido datos robados en archivos grandes para extraerlos.

`find /home -size +100M` busca archivos grandes en los directorios de usuarios, donde podrían estar escondiendo material no autorizado.

### Búsqueda por Fecha

`find / -mmin -10` encuentra archivos modificados en los últimos 10 minutos. Si detectaste un ataque en curso, esto te dice exactamente que archivos tocó el atacante.

`find / -mtime -1` archivos modificados en las últimas 24 horas.

`find / -atime +30` archivos que no se han accedido en más de 30 días. Esto puede indicar archivos que el atacante dejó y a los que no ha vuelto.

### Búsqueda por Permisos

`find / -perm -4000` encuentra archivos con el bit SUID activado. Estos son programas que se ejecutan con los permisos del dueño, no del usuario que los ejecuta. Un atacante que logra escribir un archivo SUID puede usarlo para escalar privilegios.

`find / -perm -o+w` busca archivos que cualquiera puede escribir (world-writable). Un atacante podría modificar estos archivos para inyectar código malicioso.

### Combinaciones utiles

`find / -name "*.sh" -mmin -60` busca scripts de shell modificados en la última hora. Los atacantes suelen descargar scripts en el momento del ataque.

`find /tmp -type f -exec ls -la {} \;` lista todos los archivos en `/tmp` con detalles. Esto es útil porque los atacantes usan `/tmp` como base de operaciones.

## Tuberías: El Pipe `|`

El pipe es el pegamento que conecta comandos. Toma la salida de un comando y la usa como entrada del siguiente. Esto permite construir cadenas de procesamiento poderosas con comandos simples.

### El Patrón Fundamental

`comando_A | comando_B | comando_C`

La salida de A se vuelve la entrada de B, y la salida de B se vuelve la entrada de C.

### Ejemplos Prácticos

`ps aux | grep "apache"`: Lista todos los procesos y filtra solo los que tienen "apache" en su nombre.

`cat /var/log/auth.log | grep "Failed" | awk '{print $NF}' | sort | uniq -c | sort -nr`: Esta cadena hace lo siguiente:
1. Lee el log de autenticación
2. Filtra solo las líneas con "Failed"
3. Extrae la última columna (la dirección IP)
4. Ordena las IPs
5. Cuenta ocurrencias unicas
6. Ordena numericamente en reversa

El resultado es una lista de IPs ordenadas por número de intentos fallidos de conexión. La IP que más intentos hizo aparece primero. Eso es probablemente el atacante.

`dmesg | grep -i "usb" | tail -20`: Muestra los últimos 20 mensajes del kernel relacionados con dispositivos USB. Útil si sospechas que alguien conecto un dispositivo no autorizado.

### Redirección vs Pipe

Los principiantes confunden `|` con `>` y `>>`. Son diferentes:

- `|` (pipe): Conecta la salida de un comando a la entrada de otro.
- `>` (redirección): Envía la salida a un archivo, sobrescribiendolo.
- `>>` (redirección): Añade la salida al final de un archivo.

`grep "error" log.txt > errores.txt` guarda los resultados en un archivo.
`grep "error" log.txt | wc -l` cuenta las líneas con error.

## Redirección y Composicion Avanzada

### tee: Ver y Guardar al Mismo Tiempo

`tee` divide la salida en dos: la muestra en pantalla y la guarda en un archivo.

`cat /var/log/auth.log | grep "Accepted" | tee entradas-exitosas.txt`

Esto te muestra en pantalla los inicios de sesión exitosos y simultáneamente los guarda en un archivo para análisis posterior.

### xargs: Pasar Resultados como Argumentos

`xargs` toma la salida de un comando y la convierte en argumentos para otro comando.

`find /tmp -name "*.tmp" -mtime +7 | xargs rm`

Esto encuentra archivos temporales con más de 7 días de antigüedad y los elimina. Sin `xargs`, tendrías que hacerlo manualmente uno por uno.

### wc: Contar Líneas, Palabras, Caracteres

`wc -l archivo.txt` cuenta las líneas. `wc -w` cuenta palabras. `wc -c` cuenta caracteres.

`cat /var/log/auth.log | wc -l` te dice cuántas líneas tiene el archivo. Si un atacante borró parte del log, el número de líneas puede ser anormalmente bajo.

### sort y uniq: Ordenar y Contar

`sort` ordena líneas alfabéticamente o numericamente. `uniq` elimina duplicados (pero solo funciona si los duplicados están consecutivos, por eso se usa con `sort` primero).

`cat access.log | awk '{print $1}' | sort | uniq -c | sort -nr`

Esto extrae las IPs de un log de servidor web, las ordena, cuenta cuántas peticiones hizo cada una, y las ordena de mayor a menor. La IP con más peticiones podría ser un crawler legítimo o podría ser un atacante escaneando el sitio.

## Registro de Actividad: history

`history` muestra los comandos que has ejecutado en la terminal. Esto es útil pero también un riesgo de seguridad.

El archivo `~/.bash_history` almacena el historial. Si un atacante gana acceso a tu cuenta, puede leer tu historial para entender que has estado haciendo, que servicios administras, y como accedes a otros sistemas.

Trucos defensivos:
- `history -c` limpia el historial de la sesión actual.
- Configurar `HISTFILESIZE=0` en `.bashrc` para no guardar historial (útil en servidores de producción).
- Configurar `HISTTIMEFORMAT="%F %T "` para que el historial incluya la fecha y hora de cada comando.

Truco ofensivo (para entender al enemigo): Un atacante que compromete una cuenta ejecuta `history | tail -50` para ver los últimos comandos del administrador. Si el administrador escribió `sudo mysql -p` seguido de la contraseña en el mismo comando, esa contraseña quedó registrada en el historial.

## Ángulo Hacker: Como los Atacantes Usan estos Comandos

**Reconocimiento silencioso:** Un atacante que compromete un servidor ejecuta inmediatamente:
- `whoami`: para saber quien es.
- `id`: para saber sus grupos y permisos.
- `hostname`: para saber en que máquina esta.
- `ip a`: para ver la configuración de red y conexiones activas.
- `cat /etc/passwd`: para listar otros usuarios del sistema.

**Búsqueda de datos sensibles:** El atacante usa `find` y `grep` para localizar contraseñas, claves, tokens y bases de datos:
- `grep -r "password" /home/*/ --include="*.txt" --include="*.cfg"`
- `find / -type f -name "*.pem" -o -name "*.key" 2>/dev/null`
- `find / -type d -name "db" -o -name "database" 2>/dev/null`

**Ocultamiento de actividad:** Después de ejecutar comandos maliciosos, el atacante:
- `history -c`: limpia su propio historial.
- `shred -u ~/.bash_history`: destruye el archivo de historial.
- Modifica los timestamps de los archivos que tocó usando `touch -r` para que parezcan no haber sido modificados.

**Limpieza de logs:** Un atacante avanzado no solo borra logs, sino que edita selectivamente las entradas que lo mencionan:
- `grep -v "192.168.1.100" /var/log/auth.log > /tmp/clean.log && cp /tmp/clean.log /var/log/auth.log`

Esto elimina solo las líneas que contienen su IP, dejando el resto del log intacto para no levantar sospechas por ausencia total de datos.

## awk: Procesamiento de Columnas

`awk` es un lenguaje de procesamiento de texto diseñado para trabajar con datos estructurados en columnas. No es solo un comando: es un lenguaje completo, y muchos análisis iniciales pueden resolverse con un conjunto pequeño de patrones.

### Estructura Básica

`awk '{print $1, $2}' archivo.txt` imprime la primera y segunda columna de cada línea. Por defecto, awk separa las columnas por espacios o tabulaciones.

### Uso en Seguridad

Extraer direcciones IP de logs de autenticación:
`grep "Failed password" /var/log/auth.log | awk '{print $11}'`

En los logs de auth.log, la dirección IP del atacante suele estar en la columna 11. Este comando extrae solo las IPs, lo que permite procesarlas después con `sort` y `uniq`.

Extraer fechas y horas de inicio de sesión:
`grep "Accepted password" /var/log/auth.log | awk '{print $1, $2, $3}'`

Extrae la fecha y hora de cada inicio de sesión exitoso, permitiendo construir una línea de tiempo del acceso del atacante.

### awk con Campos Personalizados

A veces los logs usan delimitadores diferentes, como comas (CSV) o pipes. awk permite especificar el delimitador con `-F`:
`awk -F',' '{print $1, $3}' archivo.csv`

En logs del servidor web Apache, que usan espacios pero tienen campos entre comillas, awk puede fallar. En ese caso, herramientas como `cut` o scripts en Python son más apropiadas.

## sed: Edición de Texto sin Abrir el Archivo

`sed` (Stream Editor) permite modificar archivos de texto sin abrirlos en un editor. Es útil para hacer cambios masivos en archivos de configuración o para limpiar datos.

### Uso Básico

`sede 's/old/new/g' archivo.txt` reemplaza todas las ocurrencias de "old" por "new" en el archivo (la `g` significa "global", sin ella solo reemplaza la primera ocurrencia por línea).

`sede -i 's/old/new/g' archivo.txt` hace el reemplazo directamente en el archivo (in-place). Sin `-i`, solo muestra el resultado en pantalla.

### Uso en Seguridad

Sanitizar logs para eliminar IPs sensibles antes de compartirlos:
`sede -i 's/[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}/REDACTED/g' acceso.log`

Eliminar líneas de comentarios de archivos de configuración:
`sede '/^#/d' /etc/ssh/sshd_config` (la `d` es de delete)

## Control de Trabajos (Job Control)

La terminal de Linux permite ejecutar múltiples comandos simultáneamente y controlar su ejecución.

### Ejecución en Segundo Plano

Añadir `&` al final de un comando lo ejecuta en segundo plano:
`sleep 1000 &`

El comando se ejecuta pero la terminal queda libre para seguir escribiendo. El sistema muestra un número de trabajo (job) y un PID.

### Gestión de Trabajos

- `jobs`: Lista los trabajos en segundo plano.
- `fg %1`: Trae el trabajo número 1 al primer plano (foreground).
- `bg %1`: Reanuda un trabajo detenido en segundo plano.
- `Ctrl+Z`: Detiene (suspende) el trabajo actual y lo manda a segundo plano detenido.

### nohup: Ejecutar sin Dependencia de la Terminal

`nohup comando &` ejecuta un comando que sigue corriendo incluso si cierras la terminal. `nohup` significa "no hang up" (no colgar). La salida del comando se guarda en `nohup.out`.

Esto es útil en seguridad cuando inicias un escaneo largo (como un `nmap` de toda una red) y necesitas cerrar la terminal sin matar el proceso.

### screen y tmux: Terminales Persistentes

Para escenarios más avanzados, `screen` y `tmux` permiten crear sesiones de terminal persistentes que sobreviven a desconexiones. Puedes iniciar un escaneo, cerrar la terminal, volver a conectar horas después, y ver el resultado.

En respuesta a incidentes, es común que múltiples analistas compartan una misma sesión de tmux para colaborar en tiempo real durante la investigación.

## Alias: Atajos Personalizados

Los alias son accesos directos para comandos largos o que usas frecuentemente. Se definen en `~/.bashrc` o `~/.bash_aliases`:

`alias ll='ls -la'`
`alias grep='grep --color=auto'`
`alias netstat='ss -tulanp'`

Un alias defensivo útil:
`alias rm='rm -i'`

Esto hace que `rm` siempre pregunte antes de borrar, evitando borrados accidentales.

Pero los alias también son un vector de ataque. Si un atacante modifica tu `~/.bashrc` para añadir `alias sudo='sudo /tmp/keylogger'`, cada vez que ejecutes sudo, estaras ejecutando el keylogger del atacante antes del comando real.

## El Comando watch: Observación Periódica

`watch` ejecuta un comando cada 2 segundos (por defecto) y muestra la salida en pantalla, actualizandola constantemente.

`watch -n 5 'ps aux | grep httpd'` muestra cada 5 segundos los procesos de Apache que están corriendo.

En seguridad, `watch` es útil para monitorear cambios en tiempo real:
`watch -d 'ls -la /tmp/'` muestra los archivos en `/tmp` con las diferencias resaltadas (`-d`). Si un atacante descarga algo a `/tmp`, lo verás aparecer.

## Modos de Falla Comunes

**Ejecutar comandos sin entender el output:** Usar `ls` y que la terminal muestre `?` o caracteres extraños porque el archivo tiene un nombre en un encoding que la terminal no soporta. Solución: usar `ls -b` que escapa caracteres no imprimibles.

**Olvidar escapar espacios:** `cd /home/usuario/Mis Documentos` falla. Debe ser `cd /home/usuario/Mis\ Documentos` o `cd "/home/usuario/Mis Documentos"`.

**grep sin comillas:** `grep palabra con espacios archivo.txt` falla porque `grep` interpreta "palabra", "con" y "espacios" como argumentos separados. Siempre: `grep "palabra con espacios" archivo.txt`.

**Confundir rutas absolutas y relativas:** `rm -rf /tmp` es seguro (borra archivos temporales). `rm -rf tmp` borra la carpeta `tmp` en el directorio actual, que puede ser cualquier cosa.

**Catástrofe con redirección:** `cat archivo.txt > archivo.txt` trunca el archivo a cero bytes ANTES de leerlo. El resultado: destruyes el archivo. Usa `sponge` de `moreutils` si necesitas leer y escribir al mismo archivo.

**Ejecutar pipes sin entender que el primer comando fallo:** `cat /var/log/auth.log | grep "Failed"` funciona porque `cat` no falla. Pero si el archivo no existe, `cat` muestra error y `grep` espera entrada que nunca llega hasta que el usuario presiona Ctrl+C. Mejor: `grep "Failed" /var/log/auth.log` que es más directo y maneja mejor el error de archivo inexistente.

**Buscar en archivos binarios con grep:** `grep -r "texto" /usr/bin/` escanea binarios y muestra resultados incomprensibles mezclados con caracteres de control que pueden romper la terminal. Usa `grep -rI "texto"` para ignorar archivos binarios.

## Casos Reales

El análisis forense del ataque a Capital One en 2019 revelo que el atacante uso comandos básicos de Linux para navegar por los servidores comprometidos. Después de explotar un firewall de aplicación web mal configurado, el atacante ejecutó `ls`, `cat`, `grep` y `find` para localizar archivos de configuración con credenciales de AWS. Con esas credenciales, extrajo datos de 100 millones de clientes.

Durante el incidente de SolarWinds (2020), los atacantes usaron comandos de `find` para localizar archivos de construcción y despliegue, y `grep` para buscar contraseñas y tokens incrustados en scripts. La limpieza de logs fue parte central de su operación para evitar detección.

En 2018, un atacante comprometio un servidor Jenkins mal configurado en una empresa de tecnología. Uso `find / -type f -name "*.pem" 2>/dev/null` para localizar claves privadas SSH, y luego las uso para moverse lateralmente a otros servidores.

## Autoevaluación

1. Te conectas a un servidor por primera vez y ves un prompt que muestra `usuario@servidor:~$`. Sin embargo, no sabes si ese `~` es realmente `/home/usuario` o si alguien modifico el prompt para confundirte. Que comando ejecutas para confirmar tu ubicación exacta en el sistema de archivos?

2. Un compañero de trabajo ejecuta `cat /dev/sda` y su terminal se llena de caracteres extraños. La sesión se vuelve inestable y tiene que cerrar la terminal. Que explico sobre la diferencia entre archivos regulares y archivos de dispositivo? Que comando debería haber usado para examinar el disco correctamente?

3. Durante una investigación de incidentes, necesitas encontrar todos los archivos que el atacante modifico en las últimas 2 horas. El servidor tiene 5TB de almacenamiento. Como usarías `find` para hacer esto sin esperar 30 minutos a que termine el escaneo de todo el disco?

4. Recibes un log de autenticación de 2GB. Te interesan solo los intentos de conexión del usuario "admin" desde la IP "10.0.0.50". Escribe el comando `grep` exacto que usarías, y explica por qué es mejor que abrir el archivo en un editor de texto.

5. Te piden auditar un servidor para asegurarte de que no hay scripts sospechosos ejecutándose. Usas `ps aux` y la lista tiene 300 líneas. Como usarías un pipe para encontrar instantáneamente si algún proceso es un script `bash` o `python` que no debería estar ahí?

6. Un administrador ejecuta `cat file.txt > file.txt`. El archivo termina vacio. Explica por qué ocurre esto y como se podría haber evitado.

7. Estas revisando los logs de un servidor web y encuentras 50,000 peticiones desde una IP china en los últimos 5 minutos. Quieres ver las últimas 10 peticiones de esa IP para entender que estaba haciendo el atacante. Escribe el comando completo usando `grep`, `tail`, y pipes.

8. Tu compañero ejecuta `find / -name *config*` y el comando tarda una eternidad. Que dos errores cometió y como podría haber limitado la búsqueda para que fuera más rápida y precisa?
