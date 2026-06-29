---
title: "Forense de Memoria: Leyendo el Pensamiento del Sistema"
level: "avanzado"
content_type: "guia"
updated: "2026-06-29"
---

# Forense de Memoria: Leyendo el Pensamiento del Sistema

## Objetivo de esta Guía

Aprender a extraer y analizar la memoria RAM para descubrir la actividad en vivo del sistema.

La memoria RAM es efimera. Apagas el equipo, desaparece. Pum. Se fue. Pero mientras el sistema esta encendido, la RAM contiene la foto completa de la actividad actual: procesos, conexiones de red, claves de cifrado, comandos, archivos abiertos, y código malicioso. Todo lo que el sistema esta pensando en ese momento.

Porque basicamente, es eso.

## La Analogía: La Foto de la Pantalla

Imagina que ves a alguien trabajando en una computadora. Tomas una foto de la pantalla. La foto muestra: que ventanas tiene abiertas, que programas ejecuta, que páginas web visita, que archivos edita.

El dump de memoria es esa foto, pero a nivel de bits. No solo ves las ventanas, ves el contenido completo de cada programa, las contraseñas en texto plano, las claves de cifrado en uso, los fragmentos de archivos abiertos. Básicamente estas viendo lo que el sistema no quería que guardes.

## Anatomía de la Memoria

pasa si abres un archivo, lo ves, y lo cierras? Una parte quedó en la RAM. Si editaste un documento y no lo guardaste, lo que escribiste esta en la RAM. la memoria es un tesoro de información.

### Que Hay en la RAM

- Código de procesos en ejecución.
- Datos de procesos (variables, buffers).
- Stack y heap de cada proceso.
- Kernel y drivers.
- Caché de sistema de archivos.
- Datos de red (paquetes, conexiones).
- Contraseñas, claves, tokens.
- Archivos abiertos (total o parcialmente).
- Fragmentos de archivos de disco.
- Procesos ocultos (rootkits).

### Distribución Tipica

Sistemas modernos tienen 8-64 GB de RAM. El dump completo puede ser enorme. El perito trabaja con la imagen completa y extrae lo relevante.

### Paginacion y Swap

Cuando la RAM se llena, el SO mueve páginas a disco (pagefile.sys en Windows, swap en Linux). El análisis de swap complementa el dump de RAM.

## Recolección de Memoria

aqui tienes que ser rápido. La memoria no espera. Mientras estas corriendo la herramienta de dump, el sistema sigue cambiando. Cada milisegundo importa.

### Recolección en Vivo

Herramientas:
- Windows: `winpmem`, `FTK Imager`, `DumpIt`, `Magnet RAM Capturer`.
- Linux: `avml`, `lime`, `fmem`, `LiME`.
- Mac: `osxpmem`, `MacMemoryReader`.

El proceso debe ser rápido (la memoria cambia constantemente) y minimamente invasivo (evitar modificar la escena).

### Recolección Remota

En entornos corporativos, la recolección puede hacerse remotamente via agentes EDR.

### Volatilidad del Dump

Diferencia entre dump completo y dump parcial. Dump de usuario vs dump de kernel.

### Recolección desde Hypervisor

En máquinas virtuales, el hipervisor (Hyper-V, ESXi, KVM) puede tomar snapshot de la RAM de la VM sin tocar el SO huésped. Esto es ideal porque no hay modificación del sistema.

## Análisis con Volatility

Si solo puedes aprender una herramienta de forense de memoria, que sea esta. `Volatility 3` es el estándar de la industria para análisis de memoria. Pero cuando entiendes los plugins, te das cuenta de que es como tener una navaja suiza forense. Framework en Python, modular, con plugins para cada tipo de análisis.

### Perfiles

Cada SO y versión tiene estructuras de memoria específicas. Volatility necesita un perfil o símbolos para interpretar correctamente.

Volatility 3 usa símbolos de debug (PDB para Windows, DWARF para Linux) automáticamente.

### Comandos Básicos

`vol -f dump.raw windows.info`:
Información básica del sistema, perfil, número de CPUs, tiempo de boot.

`vol -f dump.raw windows.pslist`:
Lista de procesos activos en el momento del dump. PID, PPID, nombre, tiempo de inicio, ruta del ejecutable.

`vol -f dump.raw windows.psscan`:
Escanea la memoria en busca de estructuras de procesos. Puede encontrar procesos ocultos por rootkits.

`vol -f dump.raw windows.netscan`:
Conexiones de red activas. Muestra IPs origen/destino, puertos, estado, PID asociado.

`vol -f dump.raw windows.cmdline`:
Línea de comando completa de cada proceso.

`vol -f dump.raw windows.filescan`:
Archivos abiertos y referenciados en memoria. Incluye archivos eliminados en disco pero aún en RAM.

`vol -f dump.raw windows.malfind`:
Detecta regiones de memoria con patrones sospechosos (heap spray, shellcode, inyección de código). Escanea por permisos de ejecución y escritura no estándar.

`vol -f dump.raw windows.dlldump`:
Extrae DLLs cargadas de la memoria para análisis estático de malware.

`vol -f dump.raw windows.hivelist`:
Lista de hives del registro de Windows en memoria.

`vol -f dump.raw windows.dumpfiles`:
Extrae archivos referenciados en memoria, útil para capturar malware que se borró a si mismo.

`vol -f dump.raw windows.hashdump`:
Extrae hashes de contraseñas de la SAM en memoria.

### Linux con Volatility

`vol -f dump.raw linux.pslist`:
Procesos del sistema Linux. `linux.bash` recupera comandos bash historicos. `linux.netstat` conexiones de red. `linux.malfind` detección de malware.

## Escenarios de Análisis

aqui van escenarios reales para que veas como se aplica todo esto. No es teoría, es lo que te vas a encontrar.

### Proceso Sospechoso

El analista encuentra un proceso `svch0st.exe` (notese el 0). PID 4321, sin firma digital, con conexión a IP 185.130.5.xx:8443.

Ejecuta `cmdline` y ve: `C:\Users\...\svch0st.exe -c 185.130.5.xx:8443`.

Ejecuta `malfind` sobre el PID y detecta region RX con patrones de shellcode.

Extrae el binario con `dumpfiles` y lo manda a análisis estático.

### Inyección de DLL

`malfind` detecta una region de memoria inyectada en un proceso legítimo (`explorer.exe`). La region tiene permisos RWX (lectura, escritura, ejecución) y contiene una DLL maliciosa.

El atacante uso `CreateRemoteThread` para inyectar código en un proceso confiable.

### Keylogger en Memoria

En el stack del proceso `explorer.exe` se encuentran buffers con captura de teclas. `volatility strings --pid 1234 | grep -i "key"`.

## Rootkits y Procesos Ocultos

Por qué esto importa: un rootkit bien hecho no lo ves con las herramientas normales. El proceso malicioso esta ahí, corriendo, pero escondido. Y tu tienes que encontrarlo.

### DKOM (Direct Kernel Object Manipulation)

El rootkit modifica la lista de procesos en el kernel para ocultar el proceso malicioso. `pslist` (que usa la API oficial) no lo muestra, pero `psscan` (que escanea raw memory) lo encuentra.

### Rootkits de Nivel Kernel

Se cargan como driver. `modules` los muestra, `driverirp` puede revelar hooks de funciones.

### Rootkits de Bootkit

Infectan el MBR o UEFI. Cargados antes del SO. Más difíciles de detectar.

## Esteganografia en Memoria

### Dump de RAM para Descifrado

Si el disco esta cifrado (BitLocker, LUKS), la clave de descifrado esta en RAM mientras el sistema esta encendido. El perito puede hacer dump de RAM, buscar la clave, y descifrar el disco completo.

### Cold Boot Attack

Enfriar la RAM con aerosol para que los datos persistan minutos después de apagar. Técnica avanzada, pero funcional.

## Formas de Falla

Apagar el equipo antes de dump de RAM: La evidencia volátil se pierde para siempre.

Usar herramientas que modifican la RAM: Muchos recolectores dejan trazas. Elegir herramientas forenses.

No documentar estado del sistema: Capturar la pantalla antes de dump.

No tener suficiente espacio de almacenamiento: Un dump de 32GB RAM ocupa 32GB más overhead.

Dump incompleto: El recolector no pudo acceder a todo el espacio de direcciones.

Contaminacion del dump: Ejecutar herramientas desde el mismo sistema analizado.

### Caso Real: Stuxnet (2010)

El análisis forense de Stuxnet incluyo extenso análisis de memoria para entender su comportamiento. Los investigadores encontraron en RAM: instrucciones a centrifugadoras, modificaciones de PLC, y mecanismos de evasion.

### Caso Real: Sony Pictures (2014)

Los investigadores de Sony usaron forense de memoria extensivo para rastrear el movimiento del atacante en los sistemas. Recuperaron herramientas de exfiltración, comandos de C2, y credenciales robadas.

## El Ángulo del Hacker

Y ahora la otra cara de la moneda. Si tu sabes como se investiga la memoria, el atacante también. La pregunta es: como hacen para esconderse?

### Evasion de Forense de Memoria

El atacante puede intentar:
- No ejecutar malware en RAM (fileless pero con técnicas de persistencia en disco).
- Usar procesos legítimos para código malicioso (living off the land).
- Rootkits que ocultan procesos de las herramientas de dump.
- Borrar rastros de memoria antes de que llegue el perito.
- Cifrado en memoria solo cuando es necesario.

### Anti-Volatility

El malware puede detectar la presencia de `volatility` o herramientas de dump y alterar su comportamiento. Rootkits pueden modificar estructuras de memoria para que el perfil de Volatility no coincida.

## Análisis de Procesos en Profundidad

Con el tiempo empiezas a reconocer los procesos normales de memoria. Cuando algo no cuadra, tu instinto te dice "esto no esta bien". Pero al principio tienes que aprender a mirar.

### Procesos Legítimos vs Maliciosos

Hay procesos que siempre deben estar en un sistema Windows limpio. Cualquier variación es sospechosa:

`svchost.exe`: Servicio de host. Debe ejecutarse desde `C:\Windows\System32`. Si se ejecuta desde `C:\Users` o `C:\Temp`, es malicioso.

`lsass.exe`: Maneja autenticación. Siempre en System32. Si hay dos instancias o una desde otra ruta, es malware robando credenciales.

`explorer.exe`: Shell de Windows. Solo una instancia por sesión de usuario. Múltiples instancias pueden indicar inyección.

`csrss.exe`, `wininit.exe`, `services.exe`: Procesos del sistema. Cualquier variación en nombre (csrsss.exe) es sospechosa.

### Procesos con Nombre Sospechoso

El atacante cambia una letra: `svch0st.exe` (cero por o), `expl0rer.exe`, `lsaas.exe`.

Volatility permite listar por nombre, PID, PPID, y ruta para identificar anomalías.

## Extracción de Artefactos

### Archivos y DLLs

Volatility extrae DLLs cargadas en cada proceso. El malware a veces carga DLLs maliciosas en procesos legítimos.

`windows.modules` y `windows.modscan` listan modulos del kernel. Los rootkits cargan drivers que aparecen como modulos sospechosos.

### Contraseñas y Hashes

`windows.hashdump` extrae hashes de contraseñas de la SAM en memoria.

Si el atacante ejecutó mimikatz, los hashes y contraseñas en texto plano están en memoria de `lsass.exe`.

### Comandos Ejecutados

`windows.cmdline` muestra línea de comando de cada proceso.

`windows.consoles` muestra buffer de consolas abiertas. Comandos del atacante.

Linux: `linux.bash` recupera historial de comandos bash de la memoria.

### Conexiones de Red

`windows.netscan` muestra conexiones activas. IP, puerto, estado, PID.

Un proceso legítimo (`svchost.exe`) con conexión a IP rusa en puerto 8443 es hallazgo inmediato.

### Registro en Memoria

`windows.hivelist` lista hives del registro cargados.

`windows.printkey` muestra valores de claves de registro. Configuración de persistencia del malware.

`windows.userassist` muestra programas ejecutados recientemente por cada usuario.

## Caso Práctico: Análisis de un Dump

### Escenario

Dump de RAM de un servidor Windows comprometido. Pasos:

1. Identificar el sistema: `windows.info` -> versión, perfil, tiempo de actividad.
2. Listar procesos: `windows.psscan` -> buscar procesos ocultos.
3. Examinar conexiones: `windows.netscan` -> buscar C2.
4. Procesos sospechosos: `windows.malfind` -> buscar inyección.
5. Extraer binarios: `windows.dumpfiles` -> extraer malware.
6. Analizar comandos: `windows.cmdline` -> que hizo el atacante.
7. Hashes: `windows.hashdump` -> credenciales comprometidas.

### Hallazgos Tipicos

- Proceso `wmiprvse.exe` sospechoso en `C:\Users\Public`.
- Conexión a `185.130.5.xx:443`.
- Inyección de DLL en `explorer.exe`.
- Comandos de PowerShell para descarga de payload.
- Persistencia via Run key en registro.

## Forense de Memoria en Linux

Volatility 3 soporta Linux. Comandos equivalentes:

`linux.pslist`: Procesos. `linux.netstat`: Conexiones de red. `linux.bash`: Comandos bash. `linux.malfind`: Malware. `linux.dmesg`: Mensajes del kernel. `linux.lsof`: Archivos abiertos por procesos.

### Diferencias con Windows

- Linux no tiene SAM, el hash de contraseñas esta en `/etc/shadow`.
- Los comandos bash quedan en memoria del proceso bash.
- Los rootkits de kernel se cargan como modulos del kernel.
- Los procesos zombie (defunct) aparecen en pslist.

## Análisis de Tiempo en Memoria

### Línea de Tiempo del Sistema

Volatility puede construir una línea de tiempo de actividad del sistema basada en:
- Tiempos de creación de procesos.
- Tiempos de conexiones de red.
- Tiempos de acceso a archivos.
- Tiempos de modificación de registro.

### Correlacion con Otras Fuentes

Correlacionar eventos de memoria con logs de red y disco para reconstruir la historia completa.

## Malware en Memoria: Casos Prácticos

### Detección de C2

`netscan` revela conexión a IP sospechosa desde proceso legítimo. El atacante uso process hollowing en svchost.exe.

### Detección de Keylogger

En el stack de un proceso se encuentran buffers con captura de teclas. Volatility strings sobre el proceso revela datos tipeados.

### Detección de Minidump de lsass

El atacante ejecutó procdump o Mimikatz para volcar `lsass.exe` y robar credenciales. Volatility detecta procesos que accedieron a lsass.

## Limitaciones del Forense de Memoria

### Memoria Cifrada

Sistemas con memoria cifrada (Intel SGX, AMD SEV) no permiten acceso a páginas protegidas.

### Anti-Forense en Memoria

El malware puede sobrescribir su propio código en memoria después de ejecutarse. Puede detectar Volatility y alterar comportamiento.

### Dump Incompleto

Si el proceso de dump falla, parte de la memoria se pierde. Repetir dump si es posible.

## Integración con Otras Fuentes

Correlacion de memoria con logs de disco, red y SIEM. Una conexión de red sospechosa en memoria se confirma con logs de firewall.

## Memoria como Evidencia en Juicio

El dump de RAM es evidencia. Debe tener cadena de custodia. Hash del dump verificado. Documentación de la herramienta de dump y su integridad.

## Forense de Memoria en Entornos Cloud

En cloud, el acceso a RAM de la VM depende del proveedor. Y aqui hay un problema: no siempre puedes hacer un dump como si estuvieras frente a la máquina. AWS: tomar snapshot de la instancia. Azure: capturar disco de sistema operativo. Cada proveedor es un mundo.

## Práctica Recomendada

Siempre tomar dump de memoria antes de apagar. Documentar cada paso. Verificar hash del dump. Almacenar en repositorio seguro. Análisis con Volatility 3.

## Herramientas Alternativas

Rekall: Fork de Volatility (menos activo). Redline: Herramienta gratuita de Mandiant. MemProcFS: Monta la memoria como sistema de archivos.

## Análisis de Memoria en Linux

Volatility 3 soporta Linux. `linux.pslist`, `linux.netstat`, `linux.bash`, `linux.malfind`, `linux.dmesg`.

Diferencia clave: Linux no tiene SAM. Hashes en /etc/shadow. Los comandos bash están en memoria del proceso bash.

## Memoria en Contenedores Docker

El dump del host incluye procesos del contenedor. El análisis de memoria del host revela actividad dentro del contenedor. El contenedor no esta realmente aislado a nivel de memoria.

## Dump de Memoria en MacOS

Herramientas: osxpmem, MacMemoryReader. Volatility 3 soporta macOS. Desafios: System Integrity Protection (SIP) bloquea acceso.

## Práctica de Análisis

Caso: servidor comprometido. Pasos: info, psscan, netscan, malfind, cmdline, dumpfiles, hashdump. Documentar cada hallazgo.

## Autoevaluación

1. Un perito llega a una escena con la PC encendida. La pantalla muestra una consola con actividad. Cual es su prioridad?

2. La herramienta de dump de RAM se ejecuta desde un USB en el sistema sospechoso. Por qué es problematico?

3. Que información encuentras en un dump de RAM que no encuentras en un disco formateado?

4. Un proceso malicioso se llama `scvhost.exe` (parece legítimo pero con c en vez de v). Como confirmas que es malware?

5. Los procesos `explorer.exe` y `notepad.exe` aparecen en `pslist`. Pero `psscan` muestra un tercer proceso `svchost.exe` que no aparece en `pslist`. Que pasa?

6. Como encuentras una contraseña de BitLocker en un dump de RAM?

7. En Linux, el atacante ejecutó comandos en bash. Como recuperas esos comandos del dump?

8. Cuáles son las diferencias clave entre el análisis de memoria en Windows vs Linux?

9. Que ventaja tiene tomar un snapshot de RAM desde el hipervisor de una VM comparado con tomar el dump dentro del SO?

10. Un rootkit oculta un proceso malicioso. Por qué `psscan` puede encontrarlo pero `pslist` no?
