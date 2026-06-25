# Computación Básica

## Objetivo

Entender como funciona una computadora por dentro y por que esos conceptos importan en ciberseguridad.

Antes de hablar de malware, redes, vulnerabilidades, logs o hardening, necesitas entender que un sistema es una combinación de hardware, sistema operativo, procesos, memoria, archivos, usuarios, permisos y comunicación de red. Casi cualquier incidente de seguridad termina tocando alguno de esos elementos.

Esta guía busca que puedas mirar una computadora y pensar con criterio:

- Que se está ejecutando;
- Con que permisos;
- Que archivos lee o modifica;
- Que datos mantiene en memoria;
- Con que servicios se comunica;
- Que evidencia queda después de una acción.

## Modelo Mental

Una computadora no es una caja magica. Es un sistema que recibe entrada, ejecuta instrucciones, guarda estado y produce salida.

```text
entrada -> instrucciones -> CPU/RAM -> archivos/red -> salida
```

Ejemplo simple:

1. Abres un navegador.
2. El sistema operativo crea un proceso.
3. El proceso usa CPU para ejecutar instrucciones.
4. Usa RAM para guardar datos temporales.
5. Lee archivos de configuración y cache.
6. Usa la red para conectarse a un servidor.
7. El sistema registra algunos eventos en logs.

En seguridad, cada paso puede ser observado, protegido o abusado.

## Hardware vs Software

### Hardware

Hardware es la parte fisica: CPU, RAM, disco, tarjeta de red, pantalla, teclado, placa madre, puertos USB y otros componentes.

Importa porque el software siempre termina usando hardware. Un proceso consume CPU, guarda datos en RAM, escribe en disco o manda paquetes por una interfaz de red.

### Software

Software son instrucciones: sistema operativo, programas, servicios, librerías, scripts, drivers y configuraciones.

Un error común es pensar que solo el código importa. En realidad, una mala configuración puede ser tan peligrosa como una vulnerabilidad en código.

Ejemplos:

- Un servicio seguro mal configurado puede exponer datos.
- Un usuario con permisos excesivos puede convertir una falla pequeña en compromiso total.
- Un programa sin parches puede tener vulnerabilidades conocidas.
- Un archivo con secretos puede filtrar credenciales aunque la aplicación funcione bien.

## CPU

La CPU ejecuta instrucciones. Cada programa que corre en una computadora necesita que la CPU procese operaciones: comparar datos, mover información, cifrar, descifrar, leer entrada, llamar funciones o responder peticiones.

En seguridad importa porque:

- Un malware también es un programa con instrucciones.
- Un proceso malicioso puede consumir CPU de forma anormal.
- Algunas vulnerabilidades ocurren por errores al manejar instrucciones, memoria o límites.
- Operaciones de cifrado, hashing y compresion dependen de CPU.

### Cómo pensar la CPU en un incidente

Si un equipo está lento, no asumas de inmediato que es malware. Pregunta:

- Qué procesos consumen CPU?
- Ese consumo es normal para ese programa?
- El proceso pertenece a una ruta esperada?
- Está firmado o instalado por una fuente confiable?
- Se inicio solo, por un usuario o por un servicio?

La CPU por si sola no prueba compromiso, pero puede ser una señal.

## RAM

La RAM es memoria temporal. Guarda datos que los programas necesitan mientras se ejecutan. Cuando apagas el equipo, normalmente su contenido se pierde.

En seguridad importa porque:

- Credenciales, tokens, llaves o sesiones pueden existir temporalmente en memoria.
- Un volcado de memoria puede revelar información sensible.
- Muchos ataques intentan leer, modificar o corromper memoria.
- Procesos inyectados o manipulados pueden esconder actividad.

### Diferencia entre RAM y disco

El disco guarda datos persistentes. La RAM guarda datos temporales.

```text
disco = archivo guardado
RAM   = datos usados ahora
```

Ejemplo:

- Tu navegador está instalado en disco.
- Cuando lo abres, parte del navegador vive en RAM como proceso.
- Las cookies pueden estar guardadas en disco.
- Una sesión autenticada puede tener datos temporales en RAM.

## Disco

El disco guarda archivos de forma persistente: sistema operativo, programas, documentos, logs, bases de datos, configuraciones, llaves, tokens y cache.

En seguridad importa porque:

- Aqui viven muchos secretos.
- Los permisos del sistema de archivos definen quien puede leer o modificar datos.
- Malware puede persistir escribiendo archivos en ubicaciones estrategicas.
- Logs y evidencias suelen guardarse en disco.
- Backups dependen de datos persistentes.

### Preguntas de seguridad sobre archivos

Cuando veas un archivo importante, pregunta:

- Quién lo puede leer?
- Quién lo puede modificar?
- Quién lo puede ejecutar?
- Contiene credenciales, tokens o datos personales?
- Es necesario qué exista en esa ubicación?
- Se registra quién lo cambia?
- Hay respaldo?

## Red

La interfaz de red permite que un equipo se comunique con otros sistemas. Puede ser Ethernet, Wi-Fi, VPN, interfaz virtual de Docker, loopback u otra.

En seguridad importa porque:

- Muchos ataques entran por servicios expuestos.
- Muchos incidentes generan conexiones salientes.
- DNS, HTTP, TLS, SSH, SMB y RDP aparecen constantemente en investigaciones.
- Firewalls y segmentación controlan que puede hablar con que.
- Los logs de red ayudan a reconstruir eventos.

Una computadora aislada tiene superficie de ataque local. Una computadora conectada a una red tiene superficie local y remota.

## Sistema Operativo

El sistema operativo coordina hardware y software. Administra procesos, memoria, archivos, usuarios, permisos, red, drivers y servicios.

Ejemplos:

- Linux.
- Windows.
- MacOS.
- Android.
- IOS.

En ciberseguridad, el sistema operativo importa porque define:

- Como se autentican usuarios;
- Como se aplican permisos;
- Como se registran eventos;
- Como se instalan servicios;
- Como se protegen archivos;
- Como se configura red;
- Como se ejecutan programas.

Si no entiendes el sistema operativo, las herramientas de seguridad se vuelven botones sin contexto.

## Programa, Proceso y Servicio

### Programa

Un programa es un archivo ejecutable o conjunto de instrucciones guardadas en disco.

Ejemplos:

- `python`
- `nginx`
- `chrome`
- `powershell.exe`
- `sshd`

Un programa guardado no necesariamente está activo. Solo existe como archivo o paquete instalado.

### Proceso

Un proceso es un programa en ejecucion. Tiene:

- PID;
- Usuario propietario;
- Memoria;
- Archivos abiertos;
- Variables de entorno;
- Conexiones de red;
- Proceso padre;
- Permisos efectivos.

Ejemplo en Linux:

```bash
ps aux
```

Ejemplo en Windows:

```powershell
Get-Process
```

En seguridad, un proceso responde preguntas importantes:

- Quién lo ejecuto?
- Desde qué ruta?
- Con qué argumentos?
- Qué proceso padre lo inicio?
- Qué conexiones tiene?
- Qué archivos toca?

### Servicio

Un servicio es un proceso pensado para ejecutarse en segundo plano y ofrecer una función.

Ejemplos:

- SSH.
- Servidor web.
- Base de datos.
- Servicio de actualizaciones.
- Agente EDR.

Un servicio suele iniciar automaticamente, escuchar en un puerto o ejecutar tareas sin que el usuario lo abra manualmente.

## Proceso Padre e Hijo

Los procesos pueden crear otros procesos.

Ejemplo:

```text
terminal -> bash -> python script.py
```

En investigaciones, la relacion padre-hijo ayuda a distinguir actividad normal de actividad sospechosa.

Ejemplo sospechoso:

```text
word.exe -> powershell.exe -> descarga archivo externo
```

No siempre significa ataque, pero merece investigación porque un documento de oficina iniciando una shell puede indicar macro maliciosa, abuso de scripting o phishing.

## Archivos y Directorios

Un sistema operativo organiza información en archivos y directorios.

Tipos comunes:

- Archivos de configuración.
- Ejecutables.
- Librerías.
- Logs.
- Documentos.
- Temporales.
- Backups.
- Llaves y certificados.

En seguridad debes preguntarte:

- Este archivo debería existir?
- Está en una ruta normal?
- Quién lo creo?
- Cuándo fue modificado?
- Tiene permisos excesivos?
- Lo está usando algun proceso?
- Contiene datos sensibles?

## Usuarios y Privilegios

No todos los usuarios deben tener los mismos permisos.

Tipos comunes:

- Usuario normal: permisos limitados.
- Administrador/root: control amplio del sistema.
- Usuario de servicio: usado por una aplicación o servicio.
- Usuario invitado: acceso temporal o restringido.

Principio importante:

```text
Minimo privilegio: dar solo los permisos necesarios, no más.
```

Si una aplicación solo necesita leer un directorio, no debe tener permisos de administrador. Si un usuario solo necesita consultar información, no debe poder borrar bases de datos.

## Por Qué Root o Administrador Es Peligroso

Ejecutar todo como administrador parece comodo, pero rompe la separación de privilegios.

Escenario:

- Una aplicación web corre como root.
- Tiene una vulnerabilidad de carga de archivos.
- Un atacante logra ejecutar comandos.

Impacto:

- Si la app corre con permisos limitados, el atacante queda restringido.
- Si corre como root, el atacante puede modificar sistema, leer secretos, instalar persistencia y controlar el host.

Mitigaciones:

- Usuarios de servicio con permisos mínimos.
- Directorios separados por función.
- Permisos de escritura limitados.
- Contenedores o aislamiento.
- Monitoreo de ejecucion y cambios.

## Logs

Un log es un registro de eventos.

Ejemplos de eventos:

- Inicio de sesión;
- Error de aplicación;
- Conexión rechazada;
- Servicio iniciado;
- Archivo modificado;
- Proceso bloqueado;
- Petición HTTP;
- Alerta de seguridad.

Los logs importan porque permiten responder:

- Que paso;
- Cuando paso;
- Quien estuvo involucrado;
- Desde donde;
- Si fue permitido o bloqueado;
- Que impacto pudo tener.

Un sistema sin logs es difícil de defender porque no deja evidencia suficiente.

## Configuración

Muchas fallas de seguridad no son bugs complejos. Son configuraciones incorrectas.

Ejemplos:

- Puerto administrativo expuesto a internet;
- Carpeta pública con datos sensibles;
- Contraseña por defecto;
- Permisos demasiado abiertos;
- Logs desactivados;
- Backups sin cifrar;
- Tokens guardados en texto plano.

Aprender seguridad también es aprender a leer configuraciones y preguntar si tienen sentido.

## Ejemplo Completo de Análisis

Escenario:

- Un servidor Linux ejecuta una aplicación web.
- La aplicación escucha en el puerto 8080.
- Corre con el usuario `app`.
- Guarda logs en `/var/log/app.log`.
- Lee configuración desde `/etc/app/config.yml`.
- Se conecta a una base de datos.

Preguntas de seguridad:

- El puerto 8080 debe estar expuesto a internet o solo al proxy?
- El usuario `app` puede leer archivos qué no necesita?
- El archivo de configuración contiene secretos?
- Los logs registran errores y accesos?
- La base de datos acepta conexiones solo desde la app?
- Qué pasa si la app se compromete?

Este tipo de pensamiento vale más que memorizar comandos.

## Mini Lab Informativo

En un entorno propio, Linux o WSL, puedes observar conceptos básicos con:

```bash
whoami
id
ps aux | head
pwd
ls -la
ip addr
ss -tuln
```

No ejecutes comandos en sistemas que no administras. El objetivo es reconocer usuarios, procesos, archivos, permisos y red en un entorno controlado.

## Errores Comunes

- Memorizar comandos sin entender que observan.
- Confundir programa con proceso.
- Pensar que un equipo lento siempre tiene malware.
- Ejecutar servicios como administrador por comodidad.
- Guardar secretos en archivos sin permisos adecuados.
- Ignorar logs hasta que ocurre un incidente.
- No distinguir entre datos temporales en RAM y datos persistentes en disco.

## Criterio de Dominio

Dominas este tema cuando puedes explicar:

- Que hacen CPU, RAM, disco y red;
- Que papel cumple el sistema operativo;
- Diferencia entre programa, proceso y servicio;
- Por que importa el usuario que ejecuta un proceso;
- Como los permisos reducen o aumentan impacto;
- Por que los logs son evidencia;
- Como una mala configuración puede volverse riesgo;
- Como relacionar archivo, proceso, usuario, red y log en un caso simple.
