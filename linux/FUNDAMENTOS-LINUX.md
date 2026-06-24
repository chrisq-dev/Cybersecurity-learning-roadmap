# Fundamentos de Linux

## Objetivo

Entender Linux con suficiente claridad para administrar sistemas, leer evidencia y comprender muchas herramientas de ciberseguridad.

Linux aparece en servidores, contenedores, cloud, appliances, routers, laboratorios, herramientas ofensivas autorizadas, herramientas defensivas, pipelines, SIEMs y entornos de respuesta a incidentes. No necesitas memorizar todos los comandos. Necesitas entender el sistema: usuarios, permisos, procesos, servicios, red, archivos, logs y configuracion.

El objetivo real es que puedas mirar un sistema Linux y responder:

- quien soy;
- que permisos tengo;
- que procesos corren;
- que servicios escuchan;
- que archivos son sensibles;
- que logs explican lo ocurrido;
- que cambios podrian afectar seguridad.

## Modelo Mental

```text
usuario -> permisos -> archivos -> procesos -> servicios -> red -> logs -> evidencia
```

Linux se entiende mejor como un sistema de texto, procesos y permisos. Casi todo puede inspeccionarse con archivos, comandos y logs.

## Por Que Linux Importa en Ciberseguridad

Linux es comun en:

- servidores web;
- bases de datos;
- contenedores;
- Kubernetes;
- herramientas de seguridad;
- firewalls y appliances;
- sistemas cloud;
- pipelines CI/CD;
- laboratorios de practica.

Si entiendes Linux, puedes interpretar mejor:

- hardening;
- permisos;
- procesos sospechosos;
- conexiones activas;
- servicios expuestos;
- logs de autenticacion;
- persistencia basica;
- errores de configuracion.

## Estructura del Sistema

Directorios comunes:

| Ruta | Uso |
| --- | --- |
| `/` | Raiz del sistema |
| `/home` | Directorios de usuarios |
| `/etc` | Configuracion del sistema |
| `/var` | Datos variables, logs, colas |
| `/var/log` | Logs |
| `/tmp` | Archivos temporales |
| `/usr` | Programas y librerias |
| `/bin`, `/sbin` | Binarios esenciales |
| `/opt` | Software adicional |
| `/proc` | Informacion del kernel y procesos |

En seguridad, las rutas importan porque ayudan a distinguir normalidad de anomalia. Un binario desconocido en una ruta temporal, un script raro en un directorio de inicio o permisos inseguros en `/etc` pueden ser senales relevantes.

## Usuarios

Linux es multiusuario. Cada proceso corre como algun usuario.

Comandos utiles:

```bash
whoami
id
groups
cat /etc/passwd
cat /etc/group
```

Conceptos:

- `root`: usuario con maximo privilegio.
- usuario normal: permisos limitados.
- usuario de servicio: cuenta usada por una aplicacion.
- grupo: conjunto de usuarios con permisos compartidos.

En seguridad, el usuario que ejecuta una accion importa tanto como la accion misma.

Ejemplo:

```text
nginx corriendo como www-data = esperado
nginx corriendo como root = mayor impacto si se compromete
```

## Sudo

`sudo` permite ejecutar comandos con privilegios elevados.

Comando util:

```bash
sudo -l
```

Preguntas de seguridad:

- Que usuarios pueden usar sudo?
- Pueden ejecutar cualquier comando?
- Requieren contrasena?
- Hay comandos peligrosos permitidos?
- Hay registros de uso?

Dar sudo completo a demasiados usuarios aumenta el impacto de cualquier cuenta comprometida.

## Permisos

Ejemplo:

```text
-rwxr-x---
```

Interpretacion:

```text
-   rwx   r-x   ---
|    |     |     |
|    |     |     otros
|    |     grupo
|    owner
tipo de archivo
```

Permisos:

- `r`: leer.
- `w`: escribir.
- `x`: ejecutar o atravesar directorio.

Ejemplos:

```bash
chmod 600 secreto.txt
chmod 755 script.sh
chown usuario:grupo archivo.txt
```

En seguridad, permisos incorrectos pueden permitir:

- leer secretos;
- modificar configuraciones;
- ejecutar scripts;
- reemplazar binarios;
- acceder a logs sensibles;
- alterar evidencia.

## Archivos Sensibles

Ejemplos:

- `/etc/passwd`
- `/etc/shadow`
- `/etc/sudoers`
- llaves SSH;
- archivos `.env`;
- certificados;
- tokens;
- configuraciones de bases de datos;
- logs con datos sensibles.

No todo archivo sensible debe ser secreto absoluto, pero su acceso debe tener una razon.

## Procesos

Un proceso es un programa en ejecucion.

Comandos:

```bash
ps aux
top
htop
pgrep nombre
```

Preguntas:

- Que proceso esta corriendo?
- Que usuario lo ejecuta?
- Desde que ruta?
- Cual es su proceso padre?
- Consume recursos de forma anormal?
- Tiene conexiones de red?

En seguridad, los procesos ayudan a detectar actividad inesperada. Un proceso raro no prueba ataque por si solo, pero abre preguntas.

## Servicios

Un servicio es un proceso administrado para correr en segundo plano.

Comandos:

```bash
systemctl status ssh
systemctl list-units --type=service --state=running
journalctl -u ssh
```

Ejemplos:

- SSH.
- Nginx.
- PostgreSQL.
- Docker.
- Cron.

Preguntas:

- El servicio deberia existir?
- Esta habilitado al arranque?
- Escucha en red?
- Corre como usuario limitado?
- Tiene logs?
- Esta actualizado?

## Red en Linux

Comandos:

```bash
ip addr
ip route
ss -tuln
ss -tunap
```

Ideas clave:

- `ip addr` muestra interfaces e IPs.
- `ip route` muestra gateway y rutas.
- `ss -tuln` muestra puertos escuchando.
- `ss -tunap` puede asociar conexiones con procesos si tienes permisos.

En seguridad, un puerto escuchando significa superficie de ataque. No todo puerto abierto es malo, pero todo puerto abierto debe tener una razon.

## Logs

Los logs explican que paso.

Ubicaciones comunes:

- `/var/log/auth.log`
- `/var/log/syslog`
- `/var/log/secure`
- `/var/log/nginx/`
- `/var/log/apache2/`
- `journalctl`

Comandos:

```bash
journalctl -xe
journalctl -u ssh
sudo tail -n 50 /var/log/auth.log
sudo grep -i "failed" /var/log/auth.log
```

Preguntas:

- Que usuario aparece?
- Desde que IP?
- A que hora?
- Fue exitoso o fallido?
- Hay repeticion?
- Hay cambios cerca del evento?

## Cron y Tareas Programadas

Cron ejecuta tareas programadas.

Ubicaciones:

- `/etc/crontab`
- `/etc/cron.d/`
- `crontab -l`

En seguridad importa porque tareas programadas pueden usarse para automatizacion legitima o persistencia maliciosa.

Preguntas:

- Que tarea corre?
- Con que usuario?
- Que script ejecuta?
- Donde esta ese script?
- Quien puede modificarlo?

## Variables de Entorno

Las variables de entorno guardan configuracion para procesos.

Ejemplos:

- `PATH`
- `HOME`
- `USER`
- `DATABASE_URL`
- `API_KEY`

Riesgo:

Si secretos viven en variables de entorno, pueden aparecer en procesos, logs, dumps o configuraciones mal protegidas.

## Paquetes y Actualizaciones

Linux instala software por gestores de paquetes.

Ejemplos:

```bash
apt list --upgradable
dpkg -l
rpm -qa
```

En seguridad, paquetes desactualizados pueden tener vulnerabilidades conocidas. Pero actualizar sin control tambien puede romper servicios. La madurez esta en parchar con pruebas, respaldos y ventanas de cambio.

## Hardening Basico

Hardening significa reducir superficie de ataque.

Ejemplos:

- desactivar servicios innecesarios;
- restringir SSH;
- usar usuarios sin privilegios;
- configurar firewall;
- aplicar parches;
- proteger llaves;
- revisar permisos;
- habilitar logs;
- monitorear cambios.

Hardening no es una lista magica. Es adaptar controles al riesgo del sistema.

## Ejemplo de Investigacion

Escenario:

Un servidor muestra multiples intentos fallidos de SSH.

Analisis:

1. Revisar logs de autenticacion.
2. Identificar usuario objetivo.
3. Identificar IP origen.
4. Ver si hubo login exitoso despues.
5. Revisar si el usuario tiene sudo.
6. Revisar procesos recientes.
7. Revisar conexiones activas.
8. Recomendar controles.

Controles posibles:

- deshabilitar login por password;
- usar llaves SSH;
- restringir IPs;
- activar MFA si aplica;
- alertar por fuerza bruta;
- revisar usuarios validos.

## Errores Comunes

- Ejecutar todo con `sudo` sin entender impacto.
- Copiar comandos destructivos sin leerlos.
- No revisar permisos despues de crear archivos sensibles.
- No diferenciar proceso, servicio y puerto.
- Borrar logs o evidencia durante una investigacion.
- Pensar que un puerto abierto siempre es ataque.
- Ignorar usuarios de servicio.
- No documentar cambios.

## Practica Segura

En un entorno propio puedes observar:

```bash
whoami
id
pwd
ls -la
ps aux | head
ss -tuln
ip route
journalctl -n 20
```

No ejecutes comandos destructivos si no entiendes su efecto. En Linux, un comando corto puede hacer cambios amplios.

## Criterio de Dominio

Dominas este tema cuando puedes:

- orientarte en el sistema de archivos;
- explicar usuarios, grupos y sudo;
- interpretar permisos;
- ver procesos y servicios;
- identificar puertos escuchando;
- leer logs basicos;
- explicar por que root aumenta impacto;
- describir controles de hardening;
- analizar un login sospechoso con evidencia.
