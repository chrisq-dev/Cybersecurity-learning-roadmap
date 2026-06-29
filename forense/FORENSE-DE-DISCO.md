---
title: "Forense de Disco: Excavando el Almacenamiento Digital"
level: "avanzado"
content_type: "guia"
updated: "2026-06-29"
---

# Forense de Disco: Excavando el Almacenamiento Digital

## Objetivo de esta Guía

Aprender a recuperar, analizar y presentar evidencia de dispositivos de almacenamiento.

el disco duro es como la escena del crimen digital. Todo lo que el usuario hizo, abrió, escribió, borró y descargó queda registrado ahí. El perito forense extrae ese registro y reconstruye la historia. Y aqui va lo mejor: no importa si el disco esta formateado, dañado o parcialmente sobrescrito. Siempre hay información recuperable. El espacio nunca se borra realmente, solo se marca como disponible. Como cuando tiras algo a la basura pero sigue ahí hasta que pasa el camión.

## La Anatomía de un Disco

Antes de meterte a hacer imágenes y recovery, tienes que entender como esta organizado un disco. si no sabes leer la estructura, no vas a encontrar nada.

### La Tabla de Particiones

El disco se organiza en sectores. Los primeros sectores contienen la tabla de particiones:
- MBR (Master Boot Record): Estructura clásica, soporta hasta 2TB, máximo 4 particiones primarias.
- GPT (GUID Partition Table): Estructura moderna, soporta discos mayores a 2TB, particiones ilimitadas, backup de tabla al final.

Ambos contienen información sobre el tamaño, tipo y ubicación de cada particion.

### El Sistema de Archivos

Dentro de cada particion, el sistema de archivos organiza los datos:
- ext4 (Linux): Sistema con journaling, inodos, bloques.
- NTFS (Windows): Master File Table ($MFT), clusters, atributos.
- APFS (Mac): Copy-on-write, snapshots, cifrado nativo.
- FAT32/exFAT: Tabla de asignación de archivos, sin journaling.

Cada sistema de archivos tiene sus propias estructuras y técnicas de recuperación.

### El Area de Datos

Donde viven los archivos. Incluye espacio asignado y espacio no asignado.

## Técnicas de Recolección

Cuando alguien hace "copiar y pegar" los archivos en lugar de una imagen forense? Pierde metadatos, espacio no asignado, archivos eliminados, slack space. O sea, pierde la mitad de la evidencia.

### Imagen Forense

Copia bit a bit del dispositivo completo. `dd if=/dev/sda of=/evidencia/imagen.dd bs=4M conv=noerror,sync`

`dcfldd` agrega hashing en tiempo real. `guymager` ofrece interfaz gráfica. Y si, es fácil, pero igual tienes que entender que estas haciendo.

La imagen incluye sectores asignados, no asignados, slack space, y area de sistema.

### Imagen Lógica

Solo los archivos y carpetas, no el espacio no asignado. Más rápida pero menos completa.

### Adquisición en Vivo

Cuando el sistema esta encendido y no se puede apagar. Captura disco, memoria, y estado del sistema.

Herramientas: FTK Imager Lite, CAINE, KAPE.

### Triage Forense

Recolección rápida de los archivos más relevantes para decidir si continuar con adquisición completa.

## Recuperación de Datos Eliminados

Cuando el usuario "borra" un archivo, el sistema operativo solo marca el espacio como disponible. Los datos siguen ahí. Como cuando sacas un libro de un estante pero el espacio vacio sigue teniendo la forma del libro.

### Tablas de Archivos

NTFS: Borrar archivo marca la entrada MFT como disponible, pero los clusters siguen ahí hasta ser sobrescritos.

ext4: Eliminar inodo, liberar bloques.

### Recuperación con Herramientas

`photorec` recupera por firmas de cabecera. `scalpel` por patrones. `foremost` por tipos. `testdisk` reconstruye particiones.

Estas herramientas buscan cabeceras de archivos (JPEG empieza con FFD8, PDF con 25504446) y recuperan aunque la tabla de archivos este corrupta.

### Fragmentacion

Archivos fragmentados en varios sectores no contiguos. La recuperación requiere reconstrucción manual.

## Análisis de Archivos y Carpetas

Por qué esto importa: no es solo lo que dice el archivo, es lo que el archivo dice sin querer. Los metadatos te cuentan una historia que el usuario no sabia que estaba contando.

### Metadatos del Sistema de Archivos

- Fechas MAC (Modified, Accessed, Changed/Created)
- Permisos
- Propietario
- Tamaño
- Atributos (oculto, sistema, readonly)

### Timestamps

Timestamps críticos que el perito examina:
- MFT: Modified (contenido), Access (lectura), Creation (creación), Entry Modified (metadatos).
- ext4: ctime (cambio de metadatos o contenido), mtime (contenido), atime (acceso).
- MAC times: la discrepancia entre fechas puede indicar alteracion deliberada.

### Archivos Ocultos y de Sistema

Archivos ocultos por el SO o por el usuario. Directorios de sistema (System Volume Information, $Recycle.Bin, .Trash).

## Slack Space

Este es uno de esos conceptos que cuando lo entiendes cambia todo. El slack space es basura para el usuario pero tesoro para el perito.

Espacio entre el final del archivo y el final del clúster. Contiene fragmentos de archivos anteriores o datos de memoria RAM. Area muy valiosa para recuperación de datos.

### RAM Slack

Entre el final del archivo lógico y el final del sector. Puede contener datos de memoria que se escribieron al sector.

### File System Slack

Entre el último sector usado por el archivo y el final del clúster. Contiene datos de archivos anteriores.

## Archivos de Sistema con Valor Forense

Y si, pero con la práctica sabes cuáles mirar según el caso.

### Windows

- `$LogFile`: Registro de transacciones NTFS.
- `$UsnJrnl`: USN journal, cambios en volumen.
- `$MFT`: Tabla maestra de archivos.
- `$Recycle.Bin`: Archivos eliminados a papelera.
- `Registry`: Configuración, usuarios, programas instalados.
- `Prefetch`: Archivos ejecutados recientemente.
- `Amcache`: Programas instalados y ejecutados.
- `Event Logs`: Registro de eventos del sistema.
- `Pagefile.sys`: Memoria virtual intercambiada a disco.
- `Hiberfil.sys`: Contenido de RAM al hibernar.

### Linux

- `/var/log/`: Logs del sistema.
- `/var/log/syslog`: Eventos del sistema.
- `/var/log/auth.log`: Intentos de autenticación.
- `/var/log/apache2/`: Logs de servidor web.
- `.bash_history`: Historial de comandos del usuario.
- `/tmp/`: Archivos temporales.
- `/var/tmp/`: Archivos temporales persistentes.
- `.thumbnails/`: Miniaturas de imágenes abiertas.

## Formateo y Sobrescritura

Sabes cuántos casos se pierden porque alguien formateo el disco "para asegurarse" y en realidad solo hicieron un formateo rápido? Y otros donde hicieron formateo completo y mataron la evidencia para siempre. Hay que saber la diferencia.

### Formateo Rápido vs Completo

Formateo rápido: borra tabla de particiones o sistema de archivos. Los datos siguen ahí. Recuperables con `testdisk`.

Formateo completo en Windows: verifica sectores y los sobrescribe con ceros. Datos irrecuperables.

### Sobrescritura

`shred` (Linux), `sdelete` (Windows), `dd if=/dev/zero` + `dd if=/dev/urandom`.

Pases:
- 1 pase de ceros: suficiente contra recuperación software.
- 3+ pases: necesario contra recuperación por microscopio de fuerza magnética.

### Desgaste de SSD

Los SSD tienen desgaste de celdas y implementan TRIM. Al borrar o formatear, el controlador puede eliminar físicamente los datos. Recuperación en SSD es significativamente más difícil que en HDD.

## Evidencia en la Nube

### Desafios

- Datos distribuidos en múltiples servidores.
- Cifrado del lado del proveedor.
- Jurisdiccion internacional.
- Logs de acceso compartidos.

### Recolección Cloud

Solicitar al proveedor via orden judicial. Obtener snapshots de datos y logs. Cadena de custodia del proveedor.

## Caso Real: Enron (2001)

La investigación de Enron requirio análisis forense de miles de discos duros de empleados. Los peritos recuperaron correos electrónicos eliminados, documentos financieros, y bases de datos contables. La evidencia de disco fue central para las condenas por fraude. El caso establecio precedentes sobre la admisibilidad de evidencia digital en volumen masivo.

## Formas de Falla

Trabajar sobre el disco original: Cualquier análisis modifica el disco.

Usar sistema operativo de la víctima: Arrancar desde el disco original contamina evidencia.

Reportar sin contexto: "Encontré estos archivos" sin explicar donde y como.

Confundir tiempos: No sincronizar reloj, asumir hora local.

No documentar errores: La herramienta fallo al leer sectores. Se ignoro.

### Como Evitarlas

Siempre trabajar sobre imagen forense. Usar write-blocker hardware. Documentar cada comando.

## El Ángulo del Hacker

aqui cambia el juego. El atacante no se queda quieto mientras tu investigas. Sabe lo que buscas y va a tratar de ocultarlo.

### Anti-Forense

El atacante conoce técnicas forenses y las evade:
- Cifrado completo del disco (LUKS, BitLocker, FileVault).
- Borrado seguro con shred o sdelete.
- Sobrescritura multiple de espacio libre.
- Esteganografia en archivos multimedia.
- Uso de discos efimeros (live USB).

### Evasion de Logs

El atacante puede modificar o borrar logs del sistema si tiene privilegios de root/administrador. Apagar logging antes de actividades ilicitas.

### Timestomping

Modificar timestamps de archivos para confundir la línea de tiempo forense.

### Disk Wiping

El atacante que sospecha investigación ejecuta scripts de borrado masivo. El perito debe detectar actividad de wiping y trabajar con lo que sobrevive.

## Sistema de Archivos en Profundidad

Si realmente quieres ser perito forense, tienes que entender el sistema de archivos a nivel de bits. No alcanza con saber usar herramientas.

### NTFS en Detalle

La Master File Table ($MFT) es el corazón de NTFS. Cada archivo y directorio tiene una entrada MFT de 1KB.

Atributos de un archivo en MFT:
- $STANDARD_INFORMATION: Tiempos, permisos.
- $FILE_NAME: Nombre del archivo (puede tener dos nombres diferente en diferentes idiomas).
- $DATA: Contenido del archivo (residente si es pequeño, no residente si es grande).
- $INDEX_ROOT, $INDEX_ALLOCATION: Directorios.

Archivos de sistema NTFS con valor forense:
- `$LogFile`: Transacciones de journaling. Registra cambios antes de aplicarse.
- `$UsnJrnl`: USN journal. Registro de cambios en el volumen.
- `$Secure`: Descriptores de seguridad (ACLs).
- `$Bitmap`: Mapa de clusters libres/usados.
- `$Boot`: Sector de arranque.

### ext4 en Detalle

Inodos contienen metadados del archivo. Superblock contiene información del sistema de archivos. Journal (journal) registra cambios pendientes.

Recuperación en ext4: `debugfs`, `extundelete`, `scalpel`.

## Evidencia en Dispositivos Móviles

### Android

Particiones tipicas:
- `/boot`: Kernel y ramdisk.
- `/system`: SO (montado solo lectura).
- `/data`: Datos de usuario (cifrado).
- `/cache`: Caché de sistema.
- `/recovery`: Modo recovery.

La herramienta `dd` extrae imagen física. `JTAG` y `chip-off` para forense avanzado.

### iOS

Cifrado fuerte por hardware. Extracción via iTunes backup, checkra1n/palera1n, o Cellebrite/GrayKey para forensic comercial.

## Metadatos de Archivos

### Información que Revelan

- Fecha de creación, modificación, acceso.
- Versión del software que creo el archivo.
- Nombre del autor.
- Ruta de red (UNC) donde se guardó.
- Historial de revisiones.

### Herramientas de Extracción

ExifTool, `stat`, `strings`, Metagoofil, FOCA.

## Evidencia en Logs de Sistema

### Windows Event Logs

- Security (4624: login éxito, 4625: fallo, 4688: proceso creado).
- System (errores, servicios, drivers).
- Application (aplicaciones).
- PowerShell (4103, 4104: ejecución de scripts).

### Linux Logs

- `/var/log/auth.log` o `/var/log/secure`: Autenticación.
- `/var/log/syslog`: Sistema general.
- `/var/log/kern.log`: Mensajes del kernel.
- `/var/log/httpd/` o `/var/log/apache2/`: Servidor web.

## Recuperación de Contraseñas

### De Archivos

Documentos Office protegidos con contraseña. `john-the-ripper`, `hashcat` para crackear hashes.

### De Navegadores

Chrome, Firefox, Edge almacenan contraseñas cifradas. Extraer con herramientas forenses del navegador.

### De Archivos de Configuración

Archivos .env, config.php, web.config, application.properties pueden contener credenciales en texto plano.

## Estructura de Directorios Forense

### Windows

C:\Users\[usuario]\: Documentos, Desktop, Downloads.
C:\Windows\: System32, Temp, Prefetch.
C:\Windows\System32\config: Hives del registro.
C:\Windows\System32\winevt\Logs: Logs de eventos.
C:\Windows\Prefetch: Archivos ejecutados.
C:\$Recycle.Bin: Archivos eliminados.

### Linux

/etc/: Configuración del sistema.
/var/log/: Logs.
/home/[usuario]/: Documentos del usuario.
/tmp/: Archivos temporales.
/var/tmp/: Temporales persistentes.
/root/: Home de root.

## Análisis de Archivos Específicos

### Documentos Office

Metadatos: autor, último editor, empresa, fecha de creación, fecha de modificación, versiones anteriores.

Macros maliciosos: VBA code incrustado. Herramientas: olevba, vipermonkey.

### Archivos PDF

Metadatos: autor, software, fechas. JavaScript incrustado. URLs y enlaces. Formularios.

### Archivos de Imagen

Metadatos EXIF: cámara, GPS, fecha, software. Miniaturas (Thumbs.db) pueden contener imágenes eliminadas.

### Archivos de Base de Datos

SQLite, MySQL, MSSQL. Tablas con datos de aplicación. Logs de transacciones.

### Archivos de Log

Logs de eventos de Windows (.evtx). Logs de servidor web (access.log, error.log). Logs de firewall. Logs de aplicaciones.

## Recuperación de Particiones Danadas

### Tabla de Particiones Corrupta

testdisk puede reconstruir la tabla de particiones. Busca particiones perdidas por su firma (boot sector, superblock).

### RAID Recovery

Si el disco era parte de un RAID, reconstruir primero la configuración del RAID. mdadm para RAID software.

## Creación de Línea de Tiempo

El análisis forense requiere reconstruir la secuencia de eventos.

Herramientas: Plaso (log2timeline) para crear súper timelines. Timesketch para visualizacion.

### Eventos Clave

Cuando se creo el archivo sospechoso. Cuando se ejecutó por última vez. Cuando se borró. Cuando se conecto un USB.

## Evidencia en Archivos Comprimidos

ZIP, RAR, 7z. El archivo comprimido puede estar protegido con contraseña. Herramientas de cracking: John the Ripper, hashcat, fcrackzip.

## Evidencia en Archivos Intercambiables

Torrents, descargas P2P. Logs de clientes torrent. Archivos .torrent.

## Autoevaluación

1. Un usuario "borró" un documento. Que pasa en el disco a nivel de MFT/clusters? Como lo recuperarias?

2. Un abogado pregunta: "Por qué el formateo rápido no borró los datos?" Explica.

3. Un disco fue formateado completo (con ceros). Hay alguna chance de recuperar datos?

4. Un SSD fue usado en el crimen. Que lo hace más difícil de recuperar que un HDD?

5. Un perito encuentra 3 archivos con la misma hora de creación. Sospecha. Que pudo haber pasado? (Timestomping, copia masiva, installacion)

6. En un allanamiento, el equipo esta encendido. Apagas o no? Justifica.

7. Que es slack space y por qué es valioso para el perito?

8. Un atacante uso `shred -n 1` en Linux. Los datos son recuperables? Por qué?

9. El disco tiene sectores defectuosos. Como haces la imagen forense sin perder datos?

10. Cual es la diferencia entre recovery de archivos por tabla de archivos vs por signature (carving)?
