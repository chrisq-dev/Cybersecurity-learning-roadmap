---
title: "Windows Básico: Las Catacumbas del Sistema"
---
# Windows Básico: Las Catacumbas del Sistema

## Objetivo de esta Guía

Entender cómo funciona Windows por debajo de las ventanas bonitas.
Cuando un usuario normal tiene un problema en Windows, reinicia la computadora. Cuando un malware tiene un problema en Windows, excava en las catacumbas del sistema (El Registro) para asegurarse de sobrevivir incluso si el usuario formatea el disco duro. 

Para defender o atacar Windows, debes dominar tres conceptos fundamentales: El Registro, los Permisos NTFS y los Procesos Ocultos.

---

## 1. El Registro de Windows (El ADN del Sistema)

Si abres el menú inicio y escribes `regedit`, entrarás al lugar más peligroso y poderoso de Windows: El Editor del Registro.

Imagina que el Registro es **el código de ADN de la computadora**. Es una base de datos gigantesca que guarda absolutamente todas las configuraciones del sistema, desde el color de tu fondo de pantalla hasta las reglas de seguridad del hardware.

*   Linux usa miles de archivos de texto regados por la carpeta `/etc` para configurarse.
*   Windows usa **una sola base de datos centralizada** (El Registro) estructurada en un árbol de carpetas lógicas llamadas *Hives* (Colmenas).

### Las dos Colmenas críticas para el Hacker:
1.  **HKEY_LOCAL_MACHINE (HKLM):** Controla el ADN físico de la máquina entera. Lo que escribas aquí afectará a todos los usuarios que inicien sesión. Solo un Administrador puede modificarla.
2.  **HKEY_CURRENT_USER (HKCU):** Controla el ADN de la cuenta que está usándose en este preciso instante (Tú).

> **El Ángulo Hacker (Persistencia):**
> Si un hacker logra infectar tu PC, su mayor temor es que tú la apagues. Para sobrevivir al reinicio, el hacker entra al Registro, busca una llave específica llamada `Run` (Ubicada en `HKLM\Software\Microsoft\Windows\CurrentVersion\Run`), y escribe: *"Cada vez que Windows encienda, por favor ejecuta en secreto mi_virus.exe"*. A esto se le llama **Persistencia por Registro**, y es lo primero que revisa el *Blue Team* durante un ataque.

---

## 2. Permisos NTFS (Más allá de `rwx`)

En la guía de Linux aprendimos que los permisos son simples: Dueño, Grupo y Otros tienen Lectura, Escritura o Ejecución (`rwx`). 

Windows utiliza el sistema de archivos **NTFS (New Technology File System)**. Los permisos en NTFS son brutalmente complejos. En lugar de una regla de 3 letras, Windows usa **Listas de Control de Acceso (ACLs)** para cada carpeta.

Puedes darle a un usuario el permiso de "Crear un archivo", pero negarle el permiso de "Borrarlo".
Puedes darle a otro usuario el permiso de "Leer", pero prohibirle "Tomar Propiedad" de la carpeta.

### El Usuario `SYSTEM` (El Dios de Windows)
En Linux existe `root`. En Windows existe el grupo `Administradores`, pero sorpresa: **El Administrador NO es el dios del sistema**.

Existe una cuenta oculta llamada `NT AUTHORITY\SYSTEM`. Es la cuenta que el propio Windows usa para respirar. Tiene poderes muy por encima del Administrador normal.
*   Muchos archivos críticos del sistema operativo, o bases de datos de contraseñas locales (como el archivo SAM), están bloqueados. Si tú, como Administrador, intentas abrirlos, Windows te dirá "Acceso Denegado". Solo `SYSTEM` puede tocarlos.

> **El Ángulo Hacker (Escalada a SYSTEM):**
> La meta dorada de un atacante que vulnera una laptop corporativa no es volverse Administrador. Su meta es abusar de una vulnerabilidad para engañar a un servicio del sistema y ejecutar código como `SYSTEM`. Si lo logra, la máquina entera, incluyendo sus secretos criptográficos más oscuros, le pertenece.

---

## 3. Procesos y Servicios en Windows

A diferencia del `top` de Linux, Windows usa el famoso **Administrador de Tareas (Task Manager)**. Sin embargo, los profesionales de seguridad no usan eso. Usan herramientas forenses como `Process Explorer` o `Process Hacker`.

Un analista de malware busca tres cosas vitales en los procesos de Windows:
1.  **El Árbol Genealógico (Parent-Child):** Todo programa es abierto por otro programa. Si Word (`winword.exe`) de pronto abre una consola de comandos negra (`cmd.exe`) y luego abre PowerShell (`powershell.exe`), estás 100% infectado por una macro maliciosa. Un documento de Word no tiene por qué estar abriendo terminales de código.
2.  **Archivos Huérfanos en `svchost.exe`:** Windows usa un proceso legítimo llamado `svchost` (Service Host) para correr docenas de servicios de fondo. Es completamente normal tener 50 `svchost.exe` corriendo. Los hackers escriben su malware con el mismo nombre y lo camuflan entre la multitud. Un analista revisará la *ruta* de cada uno para ver si es un clon falso.
3.  **Los Servicios (Services.msc):** Igual que `systemd` en Linux, Windows usa Servicios para arrancar programas invisibles. Un Ransomware siempre intentará instalarse como un Servicio, y lo configurará para arrancar en modo "Automático" cada vez que la máquina encienda.

---

## 4. Criterio de Dominio (Autoevaluación)

¿Entiendes cómo se defiende Windows por debajo del cofre?

1. Sospechas que tu PC tiene malware que sobrevive cada vez que reinicias la máquina, pero tu carpeta de "Inicio" está vacía. ¿Qué herramienta exacta vas a abrir para cazar el código del atacante?
2. Entras con tu usuario personal (sin permisos administrativos) y descubres una vulnerabilidad para modificar la colmena `HKEY_CURRENT_USER` (HKCU). Si logras esconder un virus ahí, ¿se infectará también la cuenta de tu mamá cuando ella inicie sesión en la misma PC? ¿Por qué?
3. Lograste robar la contraseña de la cuenta del Administrador local de la computadora y te logueaste exitosamente, pero al intentar abrir los hashes de seguridad del archivo SAM, Windows te sigue diciendo "Acceso Denegado". ¿Quién es el único ente con permiso superior al tuyo en esa máquina?
4. Un archivo de Excel legítimo (`excel.exe`) acaba de lanzar un proceso secundario silencioso (`powershell.exe`) que se conectó a internet a las 3 AM. ¿Cómo se le llama a la relación entre esos dos procesos que hace saltar todas las alarmas en el Blue Team?
