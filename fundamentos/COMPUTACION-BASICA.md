# Computacion Basica

## Objetivo

Entender como funciona una computadora por dentro y por que esos conceptos importan en ciberseguridad.

Antes de hablar de malware, redes, vulnerabilidades, logs o hardening, necesitas entender que un sistema es una combinacion de hardware, sistema operativo, procesos, memoria, archivos, usuarios, permisos y comunicacion de red. Casi cualquier incidente de seguridad termina tocando alguno de esos elementos.

Esta guia busca que puedas mirar una computadora y pensar con criterio:

- que se esta ejecutando;
- con que permisos;
- que archivos lee o modifica;
- que datos mantiene en memoria;
- con que servicios se comunica;
- que evidencia queda despues de una accion.

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
5. Lee archivos de configuracion y cache.
6. Usa la red para conectarse a un servidor.
7. El sistema registra algunos eventos en logs.

En seguridad, cada paso puede ser observado, protegido o abusado.

## Hardware vs Software

### Hardware

Hardware es la parte fisica: CPU, RAM, disco, tarjeta de red, pantalla, teclado, placa madre, puertos USB y otros componentes.

Importa porque el software siempre termina usando hardware. Un proceso consume CPU, guarda datos en RAM, escribe en disco o manda paquetes por una interfaz de red.

### Software

Software son instrucciones: sistema operativo, programas, servicios, librerias, scripts, drivers y configuraciones.

Un error comun es pensar que solo el codigo importa. En realidad, una mala configuracion puede ser tan peligrosa como una vulnerabilidad en codigo.

Ejemplos:

- Un servicio seguro mal configurado puede exponer datos.
- Un usuario con permisos excesivos puede convertir una falla pequena en compromiso total.
- Un programa sin parches puede tener vulnerabilidades conocidas.
- Un archivo con secretos puede filtrar credenciales aunque la aplicacion funcione bien.

## CPU

La CPU ejecuta instrucciones. Cada programa que corre en una computadora necesita que la CPU procese operaciones: comparar datos, mover informacion, cifrar, descifrar, leer entrada, llamar funciones o responder peticiones.

En seguridad importa porque:

- Un malware tambien es un programa con instrucciones.
- Un proceso malicioso puede consumir CPU de forma anormal.
- Algunas vulnerabilidades ocurren por errores al manejar instrucciones, memoria o limites.
- Operaciones de cifrado, hashing y compresion dependen de CPU.

### Como pensar la CPU en un incidente

Si un equipo esta lento, no asumas de inmediato que es malware. Pregunta:

- Que procesos consumen CPU?
- Ese consumo es normal para ese programa?
- El proceso pertenece a una ruta esperada?
- Esta firmado o instalado por una fuente confiable?
- Se inicio solo, por un usuario o por un servicio?

La CPU por si sola no prueba compromiso, pero puede ser una senal.

## RAM

La RAM es memoria temporal. Guarda datos que los programas necesitan mientras se ejecutan. Cuando apagas el equipo, normalmente su contenido se pierde.

En seguridad importa porque:

- Credenciales, tokens, llaves o sesiones pueden existir temporalmente en memoria.
- Un volcado de memoria puede revelar informacion sensible.
- Muchos ataques intentan leer, modificar o corromper memoria.
- Procesos inyectados o manipulados pueden esconder actividad.

### Diferencia entre RAM y disco

El disco guarda datos persistentes. La RAM guarda datos temporales.

```text
disco = archivo guardado
RAM   = datos usados ahora
```

Ejemplo:

- Tu navegador esta instalado en disco.
- Cuando lo abres, parte del navegador vive en RAM como proceso.
- Las cookies pueden estar guardadas en disco.
- Una sesion autenticada puede tener datos temporales en RAM.

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

- Quien lo puede leer?
- Quien lo puede modificar?
- Quien lo puede ejecutar?
- Contiene credenciales, tokens o datos personales?
- Es necesario que exista en esa ubicacion?
- Se registra quien lo cambia?
- Hay respaldo?

## Red

La interfaz de red permite que un equipo se comunique con otros sistemas. Puede ser Ethernet, Wi-Fi, VPN, interfaz virtual de Docker, loopback u otra.

En seguridad importa porque:

- Muchos ataques entran por servicios expuestos.
- Muchos incidentes generan conexiones salientes.
- DNS, HTTP, TLS, SSH, SMB y RDP aparecen constantemente en investigaciones.
- Firewalls y segmentacion controlan que puede hablar con que.
- Los logs de red ayudan a reconstruir eventos.

Una computadora aislada tiene superficie de ataque local. Una computadora conectada a una red tiene superficie local y remota.

## Sistema Operativo

El sistema operativo coordina hardware y software. Administra procesos, memoria, archivos, usuarios, permisos, red, drivers y servicios.

Ejemplos:

- Linux.
- Windows.
- macOS.
- Android.
- iOS.

En ciberseguridad, el sistema operativo importa porque define:

- como se autentican usuarios;
- como se aplican permisos;
- como se registran eventos;
- como se instalan servicios;
- como se protegen archivos;
- como se configura red;
- como se ejecutan programas.

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

Un programa guardado no necesariamente esta activo. Solo existe como archivo o paquete instalado.

### Proceso

Un proceso es un programa en ejecucion. Tiene:

- PID;
- usuario propietario;
- memoria;
- archivos abiertos;
- variables de entorno;
- conexiones de red;
- proceso padre;
- permisos efectivos.

Ejemplo en Linux:

```bash
ps aux
```

Ejemplo en Windows:

```powershell
Get-Process
```

En seguridad, un proceso responde preguntas importantes:

- Quien lo ejecuto?
- Desde que ruta?
- Con que argumentos?
- Que proceso padre lo inicio?
- Que conexiones tiene?
- Que archivos toca?

### Servicio

Un servicio es un proceso pensado para ejecutarse en segundo plano y ofrecer una funcion.

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

No siempre significa ataque, pero merece investigacion porque un documento de oficina iniciando una shell puede indicar macro maliciosa, abuso de scripting o phishing.

## Archivos y Directorios

Un sistema operativo organiza informacion en archivos y directorios.

Tipos comunes:

- Archivos de configuracion.
- Ejecutables.
- Librerias.
- Logs.
- Documentos.
- Temporales.
- Backups.
- Llaves y certificados.

En seguridad debes preguntarte:

- Este archivo deberia existir?
- Esta en una ruta normal?
- Quien lo creo?
- Cuando fue modificado?
- Tiene permisos excesivos?
- Lo esta usando algun proceso?
- Contiene datos sensibles?

## Usuarios y Privilegios

No todos los usuarios deben tener los mismos permisos.

Tipos comunes:

- Usuario normal: permisos limitados.
- Administrador/root: control amplio del sistema.
- Usuario de servicio: usado por una aplicacion o servicio.
- Usuario invitado: acceso temporal o restringido.

Principio importante:

```text
Minimo privilegio: dar solo los permisos necesarios, no mas.
```

Si una aplicacion solo necesita leer un directorio, no debe tener permisos de administrador. Si un usuario solo necesita consultar informacion, no debe poder borrar bases de datos.

## Por Que Root o Administrador Es Peligroso

Ejecutar todo como administrador parece comodo, pero rompe la separacion de privilegios.

Escenario:

- Una aplicacion web corre como root.
- Tiene una vulnerabilidad de carga de archivos.
- Un atacante logra ejecutar comandos.

Impacto:

- Si la app corre con permisos limitados, el atacante queda restringido.
- Si corre como root, el atacante puede modificar sistema, leer secretos, instalar persistencia y controlar el host.

Mitigaciones:

- Usuarios de servicio con permisos minimos.
- Directorios separados por funcion.
- Permisos de escritura limitados.
- Contenedores o aislamiento.
- Monitoreo de ejecucion y cambios.

## Logs

Un log es un registro de eventos.

Ejemplos de eventos:

- inicio de sesion;
- error de aplicacion;
- conexion rechazada;
- servicio iniciado;
- archivo modificado;
- proceso bloqueado;
- peticion HTTP;
- alerta de seguridad.

Los logs importan porque permiten responder:

- que paso;
- cuando paso;
- quien estuvo involucrado;
- desde donde;
- si fue permitido o bloqueado;
- que impacto pudo tener.

Un sistema sin logs es dificil de defender porque no deja evidencia suficiente.

## Configuracion

Muchas fallas de seguridad no son bugs complejos. Son configuraciones incorrectas.

Ejemplos:

- puerto administrativo expuesto a internet;
- carpeta publica con datos sensibles;
- contrasena por defecto;
- permisos demasiado abiertos;
- logs desactivados;
- backups sin cifrar;
- tokens guardados en texto plano.

Aprender seguridad tambien es aprender a leer configuraciones y preguntar si tienen sentido.

## Ejemplo Completo de Analisis

Escenario:

- Un servidor Linux ejecuta una aplicacion web.
- La aplicacion escucha en el puerto 8080.
- Corre con el usuario `app`.
- Guarda logs en `/var/log/app.log`.
- Lee configuracion desde `/etc/app/config.yml`.
- Se conecta a una base de datos.

Preguntas de seguridad:

- El puerto 8080 debe estar expuesto a internet o solo al proxy?
- El usuario `app` puede leer archivos que no necesita?
- El archivo de configuracion contiene secretos?
- Los logs registran errores y accesos?
- La base de datos acepta conexiones solo desde la app?
- Que pasa si la app se compromete?

Este tipo de pensamiento vale mas que memorizar comandos.

## Mini Lab Informativo

En un entorno propio, Linux o WSL, puedes observar conceptos basicos con:

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

- que hacen CPU, RAM, disco y red;
- que papel cumple el sistema operativo;
- diferencia entre programa, proceso y servicio;
- por que importa el usuario que ejecuta un proceso;
- como los permisos reducen o aumentan impacto;
- por que los logs son evidencia;
- como una mala configuracion puede volverse riesgo;
- como relacionar archivo, proceso, usuario, red y log en un caso simple.
