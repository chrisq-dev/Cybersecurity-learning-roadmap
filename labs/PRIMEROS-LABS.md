# Primeros Laboratorios

Estos labs son seguros y pensados para empezar sin tocar sistemas ajenos.

## Lab 1: Comandos de Red

Objetivo: entender conectividad, DNS y HTTP basico.

Tareas:

- Ejecutar `ping` contra un dominio conocido.
- Ejecutar `traceroute` o `tracepath`.
- Consultar DNS con `nslookup` o `dig`.
- Hacer una peticion con `curl -I`.
- Documentar que significa cada resultado.

Resultado esperado:

- Entender IP, DNS, latencia, saltos, headers HTTP y codigos de respuesta.

## Lab 2: Permisos en Linux

Objetivo: entender usuarios, grupos y permisos.

Tareas:

- Crear una carpeta de prueba.
- Crear archivos con distintos permisos.
- Usar `chmod`, `chown` y `ls -l`.
- Explicar lectura, escritura y ejecucion.

Resultado esperado:

- Poder explicar permisos como `rwxr-x---`.

## Lab 3: Logs de Autenticacion

Objetivo: aprender a leer eventos de login.

Tareas:

- Revisar logs disponibles del sistema.
- Identificar eventos de autenticacion.
- Separar eventos normales de sospechosos.
- Escribir una conclusion corta.

Resultado esperado:

- Entender como un analista empieza a investigar actividad.

## Lab 4: HTTP con curl

Objetivo: entender una peticion web.

Tareas:

- Ejecutar `curl -I https://example.com`.
- Revisar headers.
- Identificar servidor, codigo HTTP y tipo de contenido si aparecen.
- Explicar diferencia entre GET, POST, headers y body.

Resultado esperado:

- Entender la base de seguridad web.

## Lab 5: Hashes

Objetivo: entender integridad de archivos.

Tareas:

- Crear un archivo de texto.
- Calcular hash SHA256.
- Modificar el archivo.
- Calcular el hash otra vez.
- Explicar por que cambio.

Resultado esperado:

- Entender para que sirven hashes en seguridad.
