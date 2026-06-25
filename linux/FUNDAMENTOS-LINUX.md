# Fundamentos de Linux

## Objetivo

Entender Linux con suficiente claridad para administrar sistemas, leer evidencia y comprender muchas herramientas de ciberseguridad.

Linux aparece en servidores, contenedores, cloud, appliances, routers, laboratorios, herramientas ofensivas autorizadas, herramientas defensivas, pipelines, SIEMs y entornos de respuesta a incidentes. No necesitas memorizar todos los comandos. Necesitas entender el sistema: usuarios, permisos, procesos, servicios, red, archivos, logs y configuración.

El objetivo real es que puedas mirar un sistema Linux y responder:

- Quien soy;
- Que permisos tengo;
- Que procesos corren;
- Que servicios escuchan;
- Que archivos son sensibles;
- Que logs explican lo ocurrido;
- Que cambios podrian afectar seguridad.

## Modelo Mental

```text
usuario -> permisos -> archivos -> procesos -> servicios -> red -> logs -> evidencia
```

Linux se entiende mejor como un sistema de texto, procesos y permisos. Casi todo puede inspeccionarse con archivos, comandos y logs.

## Por Qué Linux Importa en Ciberseguridad

Linux es común en:

- Servidores web;
- Bases de datos;
- Contenedores;
- Kubernetes;
- Herramientas de seguridad;
- Firewalls y appliances;
- Sistemas cloud;
- Pipelines CI/CD;
- Laboratorios de práctica.

Si entiendes Linux, puedes interpretar mejor:

- Hardening;
- Permisos;
- Procesos sospechosos;
- Conexiones activas;
- Servicios expuestos;
- Logs de autenticación;
- Persistencia básica;
- Errores de configuración.

## Estructura del Sistema

Directorios comunes:

| Ruta | Uso |
| --- | --- |
| `/` | Raíz del sistema |
| `/home` | Directorios de usuarios |
| `/etc` | Configuración del sistema |
| `/var` | Datos variables, logs, colas |
| `/var/log` | Logs |
| `/tmp` | Archivos temporales |
| `/usr` | Programas y librerías |
| `/bin`, `/sbin` | Binarios esenciales |
| `/opt` | Software adicional |
| `/proc` | Información del kernel y procesos |

En seguridad, las rutas importan porque ayudan a distinguir normalidad de anomalia. Un binario desconocido en una ruta temporal, un script raro en un directorio de inicio o permisos inseguros en `/etc` pueden ser señales relevantes.

## Usuarios

Linux es multiusuario. Cada proceso corre como algun usuario.

Comandos útiles:

```bash
whoami
id
groups
cat /etc/passwd
cat /etc/group
```

Conceptos:

- `root`: usuario con máximo privilegio.
- Usuario normal: permisos limitados.
- Usuario de servicio: cuenta usada por una aplicación.
- Grupo: conjunto de usuarios con permisos compartidos.

En seguridad, el usuario que ejecuta una acción importa tanto como la acción misma.

Ejemplo:

```text
nginx corriendo como www-data = esperado
nginx corriendo como root = mayor impacto si se compromete
```

## Sudo

`sudo` permite ejecutar comandos con privilegios elevados.

Comando útil:

```bash
sudo -l
```

Preguntas de seguridad:

- Qué usuarios pueden usar sudo?
- Pueden ejecutar cualquier comando?
- Requieren contraseña?
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

- Leer secretos;
- Modificar configuraciones;
- Ejecutar scripts;
- Reemplazar binarios;
- Acceder a logs sensibles;
- Alterar evidencia.

## Archivos Sensibles

Ejemplos:

- `/etc/passwd`
- `/etc/shadow`
- `/etc/sudoers`
- Llaves SSH;
- Archivos `.env`;
- Certificados;
- Tokens;
- Configuraciones de bases de datos;
- Logs con datos sensibles.

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

- Qué proceso está corriendo?
- Qué usuario lo ejecuta?
- Desde qué ruta?
- Cuál es su proceso padre?
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

- El servicio debería existir?
- Está habilitado al arranque?
- Escucha en red?
- Corre cómo usuario limitado?
- Tiene logs?
- Está actualizado?

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

- Qué usuario aparece?
- Desde qué IP?
- A qué hora?
- Fue exitoso o fallido?
- Hay repeticion?
- Hay cambios cerca del evento?

## Cron y Tareas Programadas

Cron ejecuta tareas programadas.

Ubicaciones:

- `/etc/crontab`
- `/etc/cron.d/`
- `crontab -l`

En seguridad importa porque tareas programadas pueden usarse para automatización legitima o persistencia maliciosa.

Preguntas:

- Qué tarea corre?
- Con qué usuario?
- Qué script ejecuta?
- Dónde está ese script?
- Quién puede modificarlo?

## Variables de Entorno

Las variables de entorno guardan configuración para procesos.

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

En seguridad, paquetes desactualizados pueden tener vulnerabilidades conocidas. Pero actualizar sin control también puede romper servicios. La madurez está en parchar con pruebas, respaldos y ventanas de cambio.

## Hardening Básico

Hardening significa reducir superficie de ataque.

Ejemplos:

- Desactivar servicios innecesarios;
- Restringir SSH;
- Usar usuarios sin privilegios;
- Configurar firewall;
- Aplicar parches;
- Proteger llaves;
- Revisar permisos;
- Habilitar logs;
- Monitorear cambios.

Hardening no es una lista magica. Es adaptar controles al riesgo del sistema.

## Ejemplo de Investigación

Escenario:

Un servidor muestra múltiples intentos fallidos de SSH.

Análisis:

1. Revisar logs de autenticación.
2. Identificar usuario objetivo.
3. Identificar IP origen.
4. Ver si hubo login exitoso después.
5. Revisar si el usuario tiene sudo.
6. Revisar procesos recientes.
7. Revisar conexiones activas.
8. Recomendar controles.

Controles posibles:

- Deshabilitar login por password;
- Usar llaves SSH;
- Restringir IPs;
- Activar MFA si aplica;
- Alertar por fuerza bruta;
- Revisar usuarios validos.

## Errores Comunes

- Ejecutar todo con `sudo` sin entender impacto.
- Copiar comandos destructivos sin leerlos.
- No revisar permisos después de crear archivos sensibles.
- No diferenciar proceso, servicio y puerto.
- Borrar logs o evidencia durante una investigación.
- Pensar que un puerto abierto siempre es ataque.
- Ignorar usuarios de servicio.
- No documentar cambios.

## Observación Segura

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

- Orientarte en el sistema de archivos;
- Explicar usuarios, grupos y sudo;
- Interpretar permisos;
- Ver procesos y servicios;
- Identificar puertos escuchando;
- Leer logs básicos;
- Explicar por que root aumenta impacto;
- Describir controles de hardening;
- Analizar un login sospechoso con evidencia.
