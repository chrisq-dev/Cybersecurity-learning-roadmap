---
title: "Permisos y Usuarios: El Castillo y Sus Reglas"
---
# Permisos y Usuarios: El Castillo y Sus Reglas

## Objetivo del Módulo

Comprender que la seguridad de un servidor Linux no recae en un Antivirus mágico, sino en su **sistema paranoico de permisos**. 

En Windows, cuando descargas un programa, le das doble clic e intenta instalarse. En Linux, si descargas un programa (incluso un virus destructor) e intentas ejecutarlo, el sistema operativo te dirá: *"Lo siento, este archivo no tiene permiso de ejecución. No pasará nada"*. El 90% del trabajo defensivo de un administrador de Linux es asegurar que cada usuario y cada archivo tenga los permisos estrictamente necesarios, ni uno más.

---

## 1. La Analogía: El Rey, Los Gremios y Los Campesinos

Linux divide a los habitantes del sistema en tres categorías exactas para **cada archivo que existe**. Imagina un castillo medieval:

*   **Usuario Creador (User / Owner):** Es el Campesino que construyó la casa. Él decide qué se hace con su propiedad.
*   **El Grupo (Group):** Es el Gremio al que pertenece el campesino (Ej. "Gremio de Herreros"). Si el campesino quiere, todos los del gremio pueden entrar a su casa.
*   **Los Demás (Others):** Cualquier otra persona en el mundo. Turistas, invasores, extranjeros.

Para cada archivo, Linux te pregunta: *"¿Qué permiso le damos al Dueño? ¿Qué permiso le damos al Grupo? ¿Qué permiso le damos a Los Demás?"*

### El Rey (`root`)
Hay un usuario especial llamado `root`. Es el Rey del castillo. 
**Para el Rey, los permisos no existen**. El Rey puede entrar a tu casa, leer tus diarios privados, quemar el castillo entero o borrar el disco duro con un solo comando. El sistema operativo jamás le dirá que no al Rey.

> **El Ángulo Hacker (Privilege Escalation):**
> Un atacante nunca ataca directamente al Rey, porque el castillo del Rey está blindado. El atacante suele hackear a un Campesino (ej. vulnerando una página web que corre bajo el usuario `www-data`). Una vez adentro como campesino, el atacante busca archivos mal configurados o fallos en el sistema para "escalar sus privilegios", engañar a los guardias, robar la corona, y convertirse en el Rey (`root`). Si lo logra, el servidor está 100% comprometido.

---

## 2. El Comando Peligroso: `sudo`

Si eres el administrador legítimo del servidor, ¿deberías iniciar sesión como el Rey (`root`) todos los días para trabajar? **Absolutamente NO.**

Es el equivalente a caminar por la calle con un botón rojo nuclear en el bolsillo que se puede presionar por accidente. Si estás como `root` y tecleas mal un comando de borrado, la computadora lo borrará todo sin preguntar "Estás seguro?".

Para evitar esto, usamos el comando `sudo` (SuperUser DO).
*   **Qué hace:** Te permite trabajar como un usuario normal (Campesino), pero cuando necesitas hacer algo crítico (como instalar un programa), escribes `sudo` antes del comando. Es como sacar una placa del FBI de tu bolsillo, hacer el acto oficial, y guardar la placa inmediatamente después. Te pedirá tu contraseña para confirmar.

---

## 3. La Tríada de Permisos (rwx)

Cuando ejecutas un `ls -l` en la consola para ver un archivo, verás algo como esto a la izquierda:
`-rw-r--r--`

Esto no es código alienígena. Se divide en tres letras:
*   **r (Read - Lectura):** Permiso para abrir el archivo y ver qué dice.
*   **w (Write - Escritura):** Permiso para editar, guardar cambios o borrar el archivo.
*   **x (Execute - Ejecución):** Permiso para decirle al procesador que corra este archivo como si fuera un programa. (Si es un virus y no tiene la `x`, es solo un texto inofensivo).

Esa cadena extraña (`-rw-r--r--`) se corta en bloques de tres:
1.  **Dueño:** `rw-` (Puede Leer y Escribir, pero NO ejecutar).
2.  **Grupo:** `r--` (Solo puede Leer).
3.  **Otros:** `r--` (Solo pueden Leer).

---

## 4. `chmod` y la Matemática Hacker

Para cambiar estos permisos, los administradores usan el comando `chmod` (Change Mode). Puedes usar letras, pero los profesionales usan números (Octal).

*   `r` vale **4**
*   `w` vale **2**
*   `x` vale **1**

Si quieres que el Dueño tenga Lectura y Escritura, sumas sus números: `4 + 2 = 6`.
Si quieres que el Grupo tenga Lectura, Escritura y Ejecución: `4 + 2 + 1 = 7`.

### El Infame Comando `chmod 777`
Si escribes `chmod 777 archivo.txt`, le estás diciendo al sistema:
*   Dueño: `7` (rwx - Todo)
*   Grupo: `7` (rwx - Todo)
*   Otros: `7` (rwx - Todo)

> **Importante:**
> ¡Nunca, jamás uses `chmod 777` en un entorno de producción! Le estás dando permiso absoluto a CUALQUIER PERSONA o malware en el mundo para leer, modificar o ejecutar ese archivo. Es el error número uno de los principiantes que solo quieren "que el programa funcione" sin entender de seguridad.

---

## 5. El Dueño de las Cosas: `chown`

El comando `chown` (Change Owner) se usa para transferir la propiedad de un archivo de un usuario a otro.
*   **Comando:** `sudo chown maria reporte.txt`
*   **Resultado:** El archivo ahora le pertenece a la usuaria `maria`. Solo ella (y el Rey `root`) podrán editarlo.

Un control de seguridad clave en servidores web es usar `chown` para asegurarse de que el servidor web sea el dueño de la carpeta donde están las fotos, pero NO sea el dueño de la carpeta donde están las contraseñas del sistema.

---

## 6. Criterio de Dominio (Autoevaluación)

Mide tu nivel de administrador Linux:

1. Estás auditando un servidor y ves un archivo con permisos `rwx------`. ¿Qué significa eso para cualquier usuario que no sea el dueño legítimo o el usuario root?
2. Entras a un foro buscando ayuda porque tu programa en Linux no arranca. Alguien te dice: *"Solo corre `chmod 777` al archivo y listo"*. ¿Por qué esa persona te está dando un consejo terrible a nivel de ciberseguridad?
3. ¿Cuál es el propósito real del comando `sudo` y por qué es infinitamente mejor que iniciar sesión directamente con la cuenta `root`?
4. Un atacante sube un script maligno llamado `virus.sh` a tu servidor a través de una página web mal programada. Sin embargo, el atacante se frustra porque el sistema le dice "Permiso Denegado" al intentar correrlo. ¿Qué letra de permisos (`r`, `w`, o `x`) le falta al archivo para poder ejecutarse?
