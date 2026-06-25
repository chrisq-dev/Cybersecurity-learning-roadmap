---
title: "Comandos Básicos: Navegación Táctica y Búsqueda"
---
# Comandos Básicos: Navegación Táctica y Búsqueda

## Objetivo de esta Guía

Aprender a moverse rápido y encontrar agujas en pajares de texto.

Un Analista de Seguridad o un Hacker no usa el ratón para abrir carpetas una por una buscando un archivo escondido. Usan la consola porque es **exponencialmente más rápida y poderosa** que cualquier interfaz gráfica. En esta guía, aprenderás a moverte a ciegas por el sistema operativo y a encadenar comandos para que la máquina haga el trabajo pesado de buscar evidencias.

---

## 1. Navegación a Ciegas (Caminando por el Laberinto)

Imagina que la consola de Linux es como despertar en medio de un inmenso laberinto a oscuras. No puedes ver qué hay a tu alrededor hasta que usas una linterna.

### Los 3 Comandos de Ubicación
*   `pwd` **(Print Working Directory):** Es mirar el GPS. Te responde exactamente en qué habitación del laberinto estás parado en este momento (Ej. `/home/juan/Descargas`).
*   `ls` **(List):** Es encender la linterna. Te muestra todos los archivos y carpetas que hay en la habitación donde estás parado.
    *   *El truco pro:* Siempre usa `ls -la`. La `-l` te da formato de lista detallada (quién es el dueño, los permisos), y la `-a` (All) ilumina los archivos ocultos (los que empiezan con un punto, como `.bash_history`), que son los favoritos de los hackers para esconder cosas.
*   `cd` **(Change Directory):** Es caminar hacia otra habitación. 
    *   `cd /var/log` (Te teletransporta directamente a la sala de bitácoras).
    *   `cd ..` (Te hace retroceder una habitación hacia atrás).

---

## 2. Lectura Rápida (Sin abrir Word)

Cuando encuentras un archivo sospechoso, no le das "doble clic" para abrirlo en un bloc de notas. Lo lees directamente en la pared de la consola.

*   `cat archivo.txt` **(Concatenate):** Toma todo el texto del archivo y te lo escupe de golpe en la pantalla. Útil para archivos cortos. Si el archivo tiene 10,000 líneas, tu pantalla se volverá loca.
*   `less archivo.txt`: Es la versión inteligente. Te muestra el archivo página por página y puedes usar las flechas del teclado para bajar o subir. (Para salir presionas la letra `q`).
*   `head -n 20 archivo.txt`: Solo te muestra las primeras 20 líneas.
*   `tail -n 20 archivo.txt`: Solo te muestra las **últimas** 20 líneas. 
    *   *Ángulo de Ciberseguridad:* Usamos `tail -f /var/log/auth.log` (`-f` de Follow). Esto "clava" tus ojos en el final del archivo en tiempo real. Si alguien intenta hackear tu servidor en este momento, verás las líneas rojas aparecer mágicamente en tu pantalla al instante.

---

## 3. Buscando Agujas en Pajares (La Magia Hacker)

Aquí es donde la interfaz gráfica muere y la consola brilla.

### `grep` (El Filtro Mágico)
`grep` busca una palabra específica dentro de millones de líneas de texto en segundos.
*   **Comando:** `grep "Failed password" /var/log/auth.log`
*   **Lo que hace:** En lugar de hacerte leer las 50,000 líneas de la bitácora del sistema, `grep` filtra y te muestra *únicamente* las líneas donde alguien falló la contraseña. Es la herramienta número uno de un analista de incidentes (Blue Team).

### `find` (El Perro Sabueso)
`find` busca archivos perdidos en todo el disco duro basado en reglas complejas, no solo por su nombre.
*   **Ejemplo 1 (Por nombre):** `find / -name "passwords.txt"` (Busca desde la raíz `/` un archivo que se llame así).
*   **Ejemplo Hacker (Por tamaño):** `find / -size +1G` (Encuentra todos los archivos que pesen más de 1 Gigabyte en todo el servidor, ideal para encontrar bases de datos robadas escondidas).
*   **Ejemplo Hacker (Por tiempo):** `find / -mmin -10` (Encuentra cualquier archivo en todo el sistema que haya sido modificado en los **últimos 10 minutos**. Si acabas de ser hackeado, este comando te dirá exactamente qué archivos tocó el atacante).

---

## 4. Las Tuberías (Pipes `|`): Concatenando el Poder

¿Qué pasa si quieres usar el filtro mágico (`grep`) pero sobre el resultado de otro comando? Para eso usamos la Tubería o *Pipe* (el símbolo `|`).

El Pipe toma la salida o resultado del Comando A, y se lo inyecta como entrada al Comando B.

**Ejemplo de uso maestro:**
Queremos ver qué programas están corriendo en la memoria RAM, pero solo nos interesa saber si "python" está corriendo.
1. El comando `ps aux` muestra TODOS los procesos de la computadora.
2. Si usamos un Pipe: `ps aux | grep "python"`
3. **El resultado:** El sistema genera la lista inmensa de procesos invisibles, la lanza por la tubería hacia `grep`, y `grep` filtra la lista, escupiéndote en pantalla solo las líneas que digan "python".

> **Importante:**
> Dominar el uso del Pipe (`|`) es la diferencia entre un principiante que escribe comandos a lo loco, y un administrador de sistemas que automatiza búsquedas de seguridad en milisegundos.

---

## 5. Criterio de Dominio (Autoevaluación)

¿Estás listo para usar una consola Linux de verdad?

1. Estás investigando un hackeo y alguien te dice que escondieron el virus en una carpeta oculta. Entras a la carpeta sospechosa, escribes `ls` y te sale vacío. ¿Qué bandera o letra le faltó a tu comando para ver la verdad?
2. Entras a un servidor remoto que no conoces. Todo está negro. ¿Qué comando usas de inmediato para que el sistema te diga en qué carpeta estás posicionado?
3. Tienes un archivo de registros (log) de 4 millones de líneas. Sospechas que ayer el hacker se logueó con el usuario "admin". ¿Qué comando usarías para extraer solo las líneas que mencionan la palabra "admin"?
4. Un colega escribe `cat archivo.txt | less`. ¿Qué está logrando al combinar esos dos comandos con la tubería (`|`)?
