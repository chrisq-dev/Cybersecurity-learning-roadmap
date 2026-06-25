---
title: "Forense de Disco: Recuperando Fantasmas"
---
# Forense de Disco: Recuperando Fantasmas

## Objetivo del Módulo

Aprender el secreto más sucio de la computación comercial: Cuando le das clic a "Vaciar Papelera de Reciclaje", tu computadora te miente descaradamente. Nada se ha borrado.

Un hacker inexperto ataca un servidor, se asusta, borra todas sus herramientas de *hacking* de la carpeta de descargas, y se desconecta creyendo que eliminó las pruebas. El trabajo del Analista Forense es recuperar esos archivos fantasmas del disco duro y mandarlo a la cárcel.

---

## 1. La Mentira de "Borrar" un Archivo

*   **La Analogía:** Un disco duro de 1 Terabyte es como un libro de 1 millón de páginas. Las páginas están llenas del texto de tus fotos y documentos. Para no perderse, el libro tiene un **Índice** al principio (En Windows esto se llama *MFT - Master File Table*).

Cuando tú borras un archivo pesadísimo de 10 Gigabytes, Windows termina la tarea en 1 milisegundo. ¿Cómo borró tanta información tan rápido?
**La respuesta es que no lo hizo.** 

Windows simplemente fue a la primera página del libro (el Índice), tachó el nombre del archivo con un lápiz, y le puso un letrero que dice: *"Espacio Disponible"*.
El archivo de 10 Gigabytes sigue ahí, intacto, flotando en las páginas del medio del libro. Pero como Windows tachó su nombre del índice, a ti ya no te aparece en el Explorador de Archivos. 

El archivo no desaparecerá realmente hasta que tú descargues una película nueva y Windows **sobrescriba** esas páginas exactas.

---

## 2. File Carving (Esculpiendo Archivos)

El Analista Forense sabe que Windows es un mentiroso. Así que cuando incauta el disco duro del hacker, no usa el Explorador de Archivos normal.

El analista usa herramientas forenses como **Autopsy** o **EnCase**. Estas herramientas ignoran completamente el Índice del libro (MFT) y empiezan a leer el disco duro bit a bit, página por página, buscando huellas dactilares.

A esta técnica se le llama **File Carving (Esculpir)**.

### Los Magic Numbers (La firma del archivo)
¿Cómo sabe la herramienta forense qué es lo que está leyendo en medio de la basura?
Todo tipo de archivo empieza con una firma hexadecimal oculta llamada "Número Mágico".
*   Si el analista ve un pedazo de disco duro que empieza con los números hexadecimales `FF D8 FF E0`, sabe inmediatamente que acaba de chocar contra el inicio de una fotografía **.JPG**.
*   Si ve los números `25 50 44 46`, sabe que acaba de chocar contra el inicio de un documento **.PDF**.

La herramienta forense corta el disco desde donde empieza el número mágico, y "esculpe" el archivo, resucitándolo de la muerte para presentarlo como evidencia.

---

## 3. Anti-Forense: Cómo sí borrar algo de verdad

Sabiendo esto, los hackers profesionales desarrollaron tácticas *Anti-Forenses* para destruir evidencia de verdad.

Si el hacker realmente quiere borrar un documento, utiliza herramientas como `shred` (en Linux) o CCleaner.
Estas herramientas van al Índice del libro, tachan el nombre del archivo, van a las páginas donde estaba escrito el documento, y **escriben ceros y unos encima del documento 35 veces seguidas**. (Proceso de sobrescritura o *Wiping*).

Cuando el Analista Forense llega con su herramienta e intenta hacer *File Carving*, no encontrará un número mágico de PDF, solo encontrará un desierto de ceros matemáticos. La evidencia fue destruida con éxito.

---

## 4. Criterio de Dominio (Autoevaluación)

Revisa si podrías recuperar la evidencia:

1. Un criminal descarga planos de un edificio en formato PDF. Al escuchar las sirenas de la policía, vacía la papelera de reciclaje de Windows y formatea rápidamente el disco duro (Formateo Rápido / Quick Format). ¿Por qué un analista forense, usando *Autopsy*, todavía podrá recuperar los planos en formato PDF casi al 100%?
2. Usando la analogía del "Libro y el Índice", explica qué es exactamente lo que hace el sistema operativo cuando seleccionas un archivo y le das clic a "Eliminar".
3. Durante una investigación forense, el analista hace *File Carving* en el "Espacio No Asignado" (Unallocated Space) del disco duro buscando archivos borrados. ¿Qué son los "Números Mágicos" (Magic Numbers) o Firmas de Archivo, y por qué son indispensables para que esta técnica funcione?
4. El abogado del hacker argumenta que su cliente usó el comando de Linux `shred -uz -n 10 archivo.txt` (Sobrescribir 10 veces con datos aleatorios y luego con ceros). Como analista forense, ¿Por qué tendrías que admitir ante el juez que es matemáticamente imposible recuperar ese archivo de texto?
