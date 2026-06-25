# Sistemas Operativos: El Administrador del Caos

## Objetivo del Módulo

Entender por qué el Sistema Operativo (OS) es la barrera más importante entre el hardware de la computadora y el mundo exterior, y cómo los atacantes abusan de sus reglas para tomar el control de una máquina.

El hardware por sí solo no entiende qué es un usuario, qué es una contraseña o qué es un archivo. Toda esa "ilusión" la crea el Sistema Operativo. En este módulo, vamos a abrir el capó de Windows y Linux para entender sus diferencias críticas desde el punto de vista de la seguridad (mapeado a los conceptos de **CompTIA Security+**).

---

## 1. La Arquitectura Base: El Rey y los Campesinos

Si instalas un programa maligno, ¿por qué este programa no puede simplemente decirle al hardware que queme el procesador o que borre todos los datos de los demás programas? La respuesta es el diseño de anillos de seguridad del sistema operativo.

Para entender esto, imagina un reino medieval:
*   **User Space (El Pueblo):** Es donde viven los programas normales que abres todos los días (Chrome, Word, Spotify, e incluso el malware). Aquí los programas no tienen poder directo. No pueden hablar con el hardware. Si Chrome quiere guardar un archivo o mandar un paquete por internet, tiene que pedirle permiso al Rey enviando una "carta" oficial (esto se llama **Syscall** o llamada al sistema).
*   **Kernel Space (El Castillo del Rey):** El Kernel (Núcleo) es el corazón del Sistema Operativo. Tiene poder absoluto sobre el hardware (CPU, Memoria, Disco, Red). Si el Kernel confía en ti, te da lo que pides. Si no, te destruye (cierra el programa con un error).

### El Ángulo de Ciberseguridad (Rootkits)
Normalmente, el malware vive en el *User Space*, por lo que un buen antivirus (que corre con privilegios cercanos al Kernel) puede detectarlo y matarlo. 
Pero existe un malware extremadamente avanzado llamado **Rootkit**. Un Rootkit es un código maligno que logra colarse dentro del *Kernel Space* (El Castillo). Cuando un atacante toma control del Kernel, se vuelve invisible. El Rootkit puede mentirle al antivirus y decirle "aquí no pasa nada", porque ahora el malware es literalmente parte del cerebro del sistema operativo.

---

## 2. Windows vs Linux: Dos Filosofías de Diseño

En ciberseguridad corporativa, te encontrarás con ambos. Windows domina los escritorios y los directorios de empresas, mientras que Linux es el rey indiscutible de los servidores de internet y la infraestructura web.

### 2.1 El Registro de Windows (Windows Registry)
Windows usa una inmensa base de datos jerárquica centralizada llamada el **Registro** para guardar casi toda su configuración. Todo está ahí: contraseñas guardadas en caché, qué programas arrancan al inicio, qué fondo de pantalla tienes y configuraciones de red.
*   **El Riesgo:** Si el Registro se corrompe, todo el sistema muere. Los atacantes suelen modificar llaves del registro específicas (llamadas *Run Keys*) para garantizar que su virus se ejecute automáticamente cada vez que enciendes la PC (Persistencia).

### 2.2 La Filosofía de Linux: "Todo es un Archivo"
En Linux, no existe un Registro centralizado. Todo en Linux se maneja a través de **archivos de texto plano** esparcidos en directorios específicos, y el hardware (como tu mouse o tu disco duro) también se representa como un archivo falso dentro de la carpeta `/dev`.
*   **El Riesgo:** Si en Linux la configuración son archivos de texto, la seguridad de todo el servidor depende exclusivamente de **quién tiene permiso de lectura y escritura (Permisos de Archivo)** sobre esos textos críticos (como el archivo `/etc/shadow` donde están los hashes de las contraseñas). Si los permisos están mal puestos, la máquina caerá en segundos.

---

## 3. El Sistema de Archivos (NTFS vs ext4)

Un disco duro vacío es solo un bloque de metal magnético o chips de silicio. Para poder guardar fotos y documentos, el OS tiene que dibujar un mapa encima. A ese mapa lógico se le llama Sistema de Archivos.

*   **NTFS (New Technology File System):** Es el estándar moderno de Windows. 
    *   **Ángulo de Seguridad:** NTFS soporta algo llamado **Alternate Data Streams (ADS)**. Esto permite ocultar un archivo (ej. un virus) "detrás" de otro archivo legítimo (ej. una foto). Al abrir la foto no pasa nada raro, pero el archivo está ahí escondido del usuario común. Además, NTFS permite configurar permisos súper granulares (ACLs - Listas de Control de Acceso) para cada carpeta.
*   **ext4 (Fourth Extended Filesystem):** Es el estándar común en servidores Linux.
    *   **Ángulo de Seguridad:** Es rápido y confiable, pero maneja los permisos de manera más rústica (Dueño, Grupo, Otros) usando comandos básicos como `chmod` y `chown`. 

---

## 4. Persistencia: Cómo los atacantes sobreviven al apagón

Imagínate que un atacante logra infectar tu computadora y correr su código maligno en tu RAM. El atacante sabe que cuando te vayas a dormir, apagarás la PC, la RAM se borrará y él perderá el control de tu máquina.
Para evitarlo, debe crear **Persistencia** (obligar al OS a arrancar su programa maligno automáticamente la próxima vez que prendas el equipo).

### Mecanismos de Persistencia Comunes
1.  **En Windows (Startup Folder & Registry):** El atacante coloca el programa en la carpeta de "Inicio" automática de tu usuario, o agrega un comando en el Registro (`HKLM\Software\Microsoft\Windows\CurrentVersion\Run`).
2.  **En Linux (Cronjobs & Systemd):** Linux tiene un sistema llamado `cron` diseñado para programar tareas automatizadas (por ejemplo, hacer un backup todos los días a las 3 AM). El atacante crea un cronjob malicioso que diga: "cada 5 minutos, conéctate a la máquina del hacker y envíale una consola de comandos".

Un Analista de Seguridad defensivo invierte gran parte de su día revisando estos lugares exactos buscando programas que no deberían estar ahí.

---

## 5. Laboratorio Visual: Rutas Críticas

Es vital que memorices y explores la geografía básica de los sistemas.

### Si tienes Windows:
Abre el Explorador de Archivos y busca estas rutas:
1.  `C:\Windows\System32` -> El corazón del sistema operativo. Si un archivo ajeno logra escribirse aquí, tienes un problema masivo. Aquí viven los ejecutables reales (como `cmd.exe`).
2.  `C:\Users\` -> Las carpetas de los usuarios. Aquí viven las carpetas ocultas de configuración como `AppData` (un lugar favorito de los malware para esconderse, ya que los usuarios estándar tienen permiso para escribir ahí).

### Si tienes Linux (o WSL):
En tu terminal, usa el comando `cd` y `ls` para explorar:
1.  `/etc/` -> El directorio sagrado de las configuraciones. Aquí viven archivos críticos como `/etc/passwd`.
2.  `/var/log/` -> El directorio donde se guardan todos los archivos de registros (Logs). Un atacante intentará borrar esta carpeta para cubrir sus huellas.
3.  `/tmp/` -> Directorio temporal. Cualquiera puede escribir aquí. Es usado constantemente por atacantes para descargar herramientas de hackeo al servidor sin requerir permisos de administrador.

---

## 6. Criterio de Dominio (Autoevaluación)

Mide tu conocimiento con estas preguntas de repaso:

1. Estás analizando un malware muy avanzado que ni siquiera el Antivirus puede ver o matar, a pesar de estar encendido. ¿En qué "anillo" lógico o espacio del sistema se instaló este malware?
2. Un atacante quiere que su virus arranque cada vez que enciendes tu computadora Windows. Nombra una base de datos central de Windows donde podría modificar una "llave" para lograr esto.
3. Si en Linux las configuraciones son archivos de texto, ¿por qué los usuarios no pueden simplemente abrir el archivo de contraseñas (`/etc/shadow`) y cambiar su contraseña a voluntad? (Pista: Piensa en permisos y el Rey).
4. ¿Qué es la "Persistencia" en el contexto de un ataque informático y por qué es vital para el atacante?

Comprender estas fronteras y mapas dentro del sistema operativo te preparará para entender exactamente cómo auditar configuraciones seguras (Hardening) y defender infraestructuras empresariales.
