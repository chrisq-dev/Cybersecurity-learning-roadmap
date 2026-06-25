---
title: "Subida de Archivos (File Upload): El Caballo de Troya"
tiempo_estimado: "5 min"
minutos_lectura: 5
secciones: 5
---
# Subida de Archivos (File Upload): El Caballo de Troya

## Objetivo del Módulo

Entender por qué darle al usuario el poder de subir archivos a tu servidor es la acción técnica más peligrosa que un programador puede programar, y cómo un atacante usa esta función para destruir el sistema desde adentro.

Casi todas las páginas modernas te piden subir algo: una foto de perfil, un currículum en PDF, o un documento de Excel. Cuando haces esto, estás físicamente tomando un archivo de tu computadora y guardándolo permanentemente en el disco duro del servidor de la empresa. Para un hacker, esta es una invitación abierta.

---

## 1. La Analogía: El Caballo de Troya

Imagina que el Servidor Web es un castillo fuertemente protegido. Nadie puede entrar a la sala de control.
El castillo tiene un pequeño buzón de correos donde la gente del pueblo puede meter sus fotos de perfil. El guardia de la puerta toma las fotos y las guarda en el almacén del castillo.

1.  El Hacker no intenta romper la puerta.
2.  Toma un soldado enemigo (un virus), lo esconde adentro de un caballo de madera, le pone una etiqueta que dice `"foto_de_gatito.jpg"` y lo empuja por el buzón.
3.  El guardia del castillo (un mal programador) solo lee la etiqueta externa, asume que es una foto, y mete el caballo de madera al almacén interno del castillo.
4.  A medianoche, el soldado enemigo sale del caballo de madera falso, camina por los pasillos del castillo, roba las llaves maestras y le abre la puerta al ejército atacante.

Esto es exactamente lo que hace una **Web Shell**.

---

## 2. La Web Shell (El Soldado Enemigo)

Una Web Shell es un archivo pequeñito de código maligno (generalmente escrito en PHP, Python o ASP). Si un atacante logra subir una Web Shell al servidor, y luego "visita" ese archivo a través de su navegador, el atacante obtiene una consola de comandos con los poderes del servidor.

**El Escenario:**
La página web tiene un formulario: *"Sube tu foto de perfil (Solo JPG)"*.
El hacker crea un archivo maligno llamado `virus.php`.

**Paso 1: Evadir las Defensas Tontas (Frontend)**
El programador junior puso una defensa en JavaScript (en el navegador) que dice: *"Si el archivo no termina en .jpg, muestra un error rojo"*.
*   *El Hack:* El atacante usa Burp Suite (un proxy proxy interceptor). En su navegador, sube un archivo real llamado `gato.jpg` para engañar a Chrome. Pero mientras el archivo viaja por el aire en las manos del Mesero (HTTP), el atacante intercepta el paquete en Burp Suite, le borra la palabra `.jpg` y escribe `.php` con el código maligno adentro. El servidor trasero recibe el PHP directamente.

**Paso 2: La Ejecución**
El servidor guarda el archivo felizmente en: `empresa.com/uploads/virus.php`.
El atacante simplemente abre su navegador y entra a esa URL. El servidor "ejecuta" el archivo PHP pensando que es parte de la página web. La pantalla del atacante se convierte en una terminal negra con acceso total a las bases de datos de la empresa. *Game Over.*

---

## 3. La Defensa (El Blue Team)

Subir archivos de forma segura es extremadamente difícil. Requiere Defensa en Profundidad (Capas).

1.  **Nunca confíes en la extensión (El Nombre):** Que el archivo se llame `.jpg` no significa que sea una foto. Un programador debe analizar los **Magic Bytes** del archivo (el código binario interno) para verificar si matemáticamente *es* una foto real.
2.  **Quítales el poder de ejecución:** La carpeta donde se guardan las fotos (`/uploads/`) jamás debe tener permisos de ejecución (Recuerda los permisos `rwx` de Linux). Si el hacker logra subir `virus.php`, el servidor debe configurarse para decir: *"Esta carpeta es un calabozo. Nada aquí adentro tiene derecho a correr como un programa. Solo te mostraré como texto aburrido"*.
3.  **Cambia el Nombre:** Si el hacker sube `virus.php`, el servidor debe renombrarlo instantáneamente a un número aleatorio indescifrable como `9843658934.txt`. Así el hacker nunca sabrá qué URL visitar para activar su bomba.
4.  **Usa un Bucket Externo:** Las grandes empresas (AWS) ya no guardan las fotos de perfil en el mismo servidor donde corre la página web. Las guardan en un cuarto separado (S3 Buckets). Si la bomba explota, explota en un cuarto vacío de Amazon, no en el servidor de la empresa.

---

## 4. Criterio de Dominio (Autoevaluación)

Revisa si puedes asegurar el buzón del castillo:

1. ¿Por qué es un error fatal de diseño programar las validaciones de "Subida Segura de Archivos" exclusivamente en el código Frontend (JavaScript) del navegador del usuario, en lugar del Backend? *(Pista: Piensa en herramientas como Burp Suite).*
2. Lograste subir una Web Shell (archivo malicioso en PHP) exitosamente al servidor de una universidad en la ruta `/imagenes/shell.php`. Sin embargo, al visitar la URL en tu navegador, la página no ejecuta los comandos, solo te muestra tu propio código fuente en texto plano. ¿Qué regla de "Hardening" configuró correctamente el Blue Team en esa carpeta?
3. Para engañar al filtro de extensiones del servidor, un atacante decide nombrar a su archivo `virus.php.jpg`. Explica cómo podría este "Doble Nombre" llegar a confundir al sistema operativo trasero si está mal configurado.
4. ¿Por qué cambiar el nombre del archivo del usuario a un valor aleatorio complejo (Ej. de `foto.png` a `a2b4c6...png`) ayuda drásticamente a prevenir que una Web Shell se active?
