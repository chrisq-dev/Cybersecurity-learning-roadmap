---
title: "Hardening Básico: Blindando el Castillo"
level: "intermedio"
content_type: "guia"
updated: "2026-06-29"
---

# Hardening Básico: Blindando el Castillo

## Objetivo de esta Guía

Instalar Linux es fácil. Descargar una ISO, seguir un asistente, y en 15 minutos tienes un sistema funcionando. Lo difícil es hacer que ese sistema sobreviva más de 5 minutos expuesto directamente a Internet sin ser comprometido.

Hardening no es un programa que instalas ni un botón que activas. Es un proceso sistemático de reducir la "superficie de ataque": apagar, borrar y bloquear todo lo que no sea estrictamente necesario para que el servidor cumpla su función.

Un servidor Linux recién instalado viene con servicios innecesarios activados, puertos abiertos, contraseñas por defecto, y configuraciones pensadas para la comodidad del usuario, no para la seguridad. El hardening transforma ese servidor "cómodo" en un servidor "paranoico" que solo hace lo que debe hacer y nada más.

Esta guía cubre las prácticas esenciales de hardening: configuración segura de SSH, firewall, actualizaciones, control de acceso, minimización de servicios, y detección de cambios. No es una lista de verificación para seguir ciegamente; es un conjunto de principios que debes entender para aplicarlos según el contexto de cada servidor.

## La Analogía: El Taller de Cerrajería

Olvídate del castillo medieval que se usa en todos los tutoriales de hardening. Vamos a usar algo más práctico: un taller de cerrajería.

Un cerrajero recibe un lote de puertas nuevas de fábrica. Vienen con la cerradura básica de fábrica, idéntica para todas las puertas, con una llave genérica que cualquiera puede tener. La puerta cumple su función básica: separa el interior del exterior. Pero no es segura.

El cerrajero no se limita a instalar la puerta tal como viene. El cerrajero:
1. Cambia la cerradura de fábrica por una de alta seguridad.
2. Añade un cerrojo adicional.
3. Refuerza las bisagras para que no se puedan sacar desde afuera.
4. Pone una mirilla para ver quien llama antes de abrir.
5. Elimina cualquier ventana cercana a la puerta que permita alcanzar la cerradura desde afuera.

Eso es hardening. No estas construyendo una nueva puerta. Estas tomando la puerta existente y eliminando sus debilidades antes de que alguien las explote.

El servidor Linux recién instalado es la puerta de fábrica. Viene con:
- La contraseña de root que tu elegiste (tan débil como hayas sido).
- Servicios innecesarios corriendo (CUPS, avahi, postfix).
- Puertos abiertos que no recuerdas haber configurado.
- SSH con configuración por defecto (PermitRootLogin yes).
- Firewall desactivado o con reglas permisivas por defecto.

El hardening es el trabajo del cerrajero: identificar cada debilidad y corregirla antes de que un atacante la encuentre.

## Principio Fundamental: Reducir la Superficie de Ataque

un servidor recién instalado tiene más puertas abiertas que un hotel. El hardening es cerrar todas las que no necesitas, una por una.

La superficie de ataque es la suma de todos los puntos por los que un atacante puede intentar entrar o extraer datos del sistema. Cada servicio que corre, cada puerto que escucha, cada programa instalado, cada usuario con acceso, cada archivo con permisos demasiado abiertos añade a la superficie de ataque.

La regla es simple: si no es necesario, no debe estar presente.

Un servidor web solo necesita:
- El servidor web (Apache, Nginx).
- El firewall configurado.
- SSH para administración (idealmente solo desde IPs específicas).
- Actualizaciones de seguridad.

No necesita: servidor de correo, servicio de impresión, Bluetooth, servidor de bases de datos local, entorno gráfico, herramientas de desarrollo, ni ningún otro servicio que no sea parte de su función.

Cada servicio adicional es un punto de entrada potencial. El atacante no necesita romper el servidor web si puede romper el servidor de correo que alguien olvido desactivar.

## SSH: La Puerta de Entrada Principal

SSH (Secure Shell) es el protocolo que usas para administrar tu servidor de forma remota. Es la puerta principal del servidor. Si la configuras mal, es la primera puerta que los atacantes intentaran forzar.

### El Problema de la Configuración por Defecto

Cuando instalas un servidor Linux, SSH viene con configuraciones pensadas para facilitar el acceso inicial, no para ser seguro:

- `PermitRootLogin yes`: Permite al usuario root iniciar sesión directamente.
- `PasswordAuthentication yes`: Permite usar contraseñas.
- `Port 22`: Puerto estándar, lo primero que escanean los bots.

En el momento en que conectas el servidor a Internet, miles de bots comienzan a escanear el puerto 22 e intentar combinaciones comunes de usuario/contraseña: `root/admin`, `root/123456`, `admin/password`.

### Reglas de Oro del Hardening de SSH

**1. Deshabilitar el inicio de sesión de root (`PermitRootLogin no`)**

Nunca, bajo ninguna circunstancia, se le debe permitir al usuario root iniciar sesión directamente por SSH. La razón es simple: si el atacante tiene que adivinar un usuario Y una contraseña, tiene que acertar dos cosas. Si sabe que el usuario es root (UID 0), solo tiene que acertar la contraseña.

La práctica segura es:
- Los administradores inician sesión con su cuenta personal.
- Una vez dentro, usan `sudo` para ejecutar comandos privilegiados.

Esto además proporciona auditoría: cada comando con sudo queda registrado con el usuario que lo ejecutó.

**2. Usar autenticación con llaves públicas (`PasswordAuthentication no`)**

Las contraseñas son inherentemente débiles. Incluso las contraseñas complejas pueden ser interceptadas por keyloggers, obtenidas mediante phishing, o robadas de bases de datos de otros sitios.

Las llaves criptográficas SSH son archivos que contienen números aleatorios generados matemáticamente. Una llave privada de 4096 bits es prácticamente imposible de romper por fuerza bruta.

El flujo de trabajo:
1. En tu máquina local generas un par de llaves: `ssh-keygen -t ed25519 -a 100`
2. Copias la llave pública al servidor: `ssh-copy-id usuario@servidor`
3. Desactivas la autenticación por contraseña en el servidor.

Ed25519 es el algoritmo recomendado hoy. Es más rápido y más seguro que RSA para la misma longitud de clave.

**3. Cambiar el puerto (opcional pero útil)**

Cambiar SSH del puerto 22 a otro puerto no detiene a quien escanee el servicio. Puede reducir parte del ruido automatizado dirigido solo al puerto predeterminado, pero no es un control de acceso ni sustituye MFA, llaves, filtrado y monitoreo.

La principal ventaja es que limpia tus logs. En lugar de tener miles de entradas de intentos de conexión fallidos cada hora, tendrás silencio. Esto hace que las anomalías reales sean más fáciles de detectar.

La desventaja: tendrás que recordar el puerto personalizado cada vez que te conectes. Y si gestionas múltiples servidores, cada uno puede tener un puerto diferente.

**4. Limitar usuarios que pueden conectarse (`AllowUsers`)**

`AllowUsers admin juan desarrollo` en `/etc/ssh/sshd_config` limita el acceso SSH solo a esos usuarios. Cualquier otro usuario, incluso si existe en el sistema, no podrá conectarse por SSH.

Esto es útil en servidores donde hay cuentas de servicio (www-data, mysql) que no deberían tener acceso interactivo.

**5. Usar fail2ban para mitigar fuerza bruta**

fail2ban monitorea los logs de autenticación y bloquea temporalmente (vía iptables) las IPs que tienen demasiados intentos fallidos.

Configuración típica:
```
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
```

Esto bloquea por una hora a cualquier IP que falle la autenticación 3 veces. Detiene ataques de fuerza bruta en seco.

**6. Configuración completa de ejemplo**

En `/etc/ssh/sshd_config`:
```
Port 5892
PermitRootLogin no
MaxAuthTries 3
PubkeyAuthentication yes
PasswordAuthentication no
ChallengeResponseAuthentication no
UsePAM yes
AllowUsers admin juan
X11Forwarding no
ClientAliveInterval 300
ClientAliveCountMax 0
```

Luego reinicia el servicio: `systemctl restart sshd`

Y asegúrate de tener una segunda sesión SSH abierta ANTES de cerrar la primera. Un error en la configuración puede dejarte fuera del servidor permanentemente.

### Ángulo Hacker: Ataques a SSH

**Fuerza bruta con diccionarios:** Los bots prueban millones de combinaciones de usuario/contraseña por minuto. Si usas contraseñas débiles, caes en segundos.

**Ataque de canal lateral por timing:** Midiendo el tiempo que tarda el servidor en responder, un atacante puede determinar si un usuario existe o no, y enfocar sus ataques en cuentas existentes.

**Man-in-the-middle (MitM):** Un atacante en la misma red puede interceptar la conexión SSH si no verificas la huella digital (fingerprint) del servidor **Ataque a llaves privadas:** Si la llave privada del administrador no tiene frase de paso (passphrase) y el atacante obtiene acceso a su máquina local, puede usarla inmediatamente.

**SSH agent forwarding:** Si tienes SSH agent forwarding activado y te conectas a un servidor comprometido, el atacante puede usar tu agente SSH para conectarse a otros servidores como si fuera tu.

## Firewall: UFW y nftables

El firewall es la barrera que controla que tráfico puede entrar y salir del servidor. Linux tiene un sistema de firewall incorporado en el kernel: netfilter, gestionado tradicionalmente por iptables y hoy por nftables.

### iptables vs nftables vs UFW

- **iptables:** El sistema clásico. Funciona, pero su sintaxis es crítica y difícil de recordar. Comandos como `iptables -A INPUT -p tcp --dport 22 -j ACCEPT` no son intuitivos.
- **nftables:** El reemplazo moderno de iptables. Sintaxis más limpia, mejor rendimiento. La mayoría de las distribuciones nuevas lo incluyen por defecto.
- **UFW (Uncomplicated Firewall):** Una capa sobre iptables/nftables que simplifica la configuración. Perfecto para servidores que no necesitan reglas de firewall complejas.

### UFW: La Opción Práctica

UFW esta diseñado para ser simple. Tres reglas son suficientes para la mayoría de los servidores:

```
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 443/tcp
ufw enable
```

Analicemos cada línea:

`ufw default deny incoming`: Rechaza todo el tráfico entrante por defecto. Cualquier conexión que intente entrar al servidor desde afuera es bloqueada a menos que haya una regla explicita que la permita.

`ufw default allow outgoing`: Permite todo el tráfico saliente. El servidor puede conectarse a Internet libremente para descargar actualizaciones, consultar DNS, etc.

`ufw allow ssh`: Permite conexiones SSH entrantes (puerto 22, o el que hayas configurado).

`ufw allow 443/tcp`: Permite tráfico HTTPS entrante al puerto 443.

`ufw enable`: Activa el firewall. Cuidado: si ejecutas esto por SSH, asegúrate de haber permitido SSH primero, o te quedaras fuera.

### Reglas Avanzadas de UFW

Limitar acceso SSH a una IP específica:
`ufw allow from 192.168.1.100 to any port 22`

Limitar acceso a múltiples IPs:
`ufw allow from 192.168.1.0/24 to any port 22`

Rate limiting para SSH (permitir pero limitar intentos):
`ufw limit ssh`

Esto permite conexiones SSH pero limita la tasa a 6 conexiones por 30 segundos. Superado ese límite, la IP se bloquea temporalmente.

### Verificación de Reglas

`ufw status verbose`: Muestra las reglas activas y la política por defecto.

Después de configurar el firewall, verifica que los puertos que deberían estar abiertos lo estén, y que los que deberían estar cerrados no sean accesibles desde afuera. Usa `nmap` desde otra máquina para probar:

`nmap -p- servidor.com`: Escanea todos los puertos (65535). Si solo ves abiertos los puertos 22 y 443, el firewall esta funcionando.

Un error común es confiar ciegamente en UFW y no verificar externamente. He visto casos donde UFW reporta "active" pero las reglas no se aplican correctamente.

### La Política de Denegación por Defecto

La política `default deny incoming` significa que cualquier servicio que olvides configurar explícitamente en UFW no será accesible desde el exterior. Esto es intencional.

Si instalas una base de datos PostgreSQL que escucha en el puerto 5432 y olvidas añadir una regla de UFW, la base de datos no será accesible desde afuera. Esto puede ser frustrante cuando estas configurando el servidor, pero es la configuración más segura.

La alternativa -- política `default allow incoming` con reglas de denegación específicas -- es propensa a errores. Siempre olvidas denegar algún puerto.

## Actualizaciones de Seguridad

Mantener el sistema actualizado es la medida de seguridad más simple y más efectiva. Las vulnerabilidades en software son descubiertas constantemente, y los desarrolladores lanzan parches para corregirlas.

### Configuración de Actualizaciones Automáticas

En Debian/Ubuntu, configura las actualizaciones de seguridad para que se instalen automáticamente:

`dpkg-reconfigure --priority=low unattended-upgrades`

Esto habilita la instalación automática de parches de seguridad. Puedes configurar que solo se apliquen actualizaciones de seguridad (no nuevas versiones de software que puedan introducir cambios no deseados).

En Red Hat/CentOS/Fedora:
`dnf install dnf-automatic`
`systemctl enable --now dnf-automatic.timer`

### El Dilema de las Actualizaciones Automáticas

Hay un debate en la industria sobre si las actualizaciones automáticas son seguras. El argumento en contra: una actualización defectuosa puede romper la aplicación que corre en el servidor. El argumento a favor: no aplicar una actualización de seguridad deja el servidor vulnerable a exploits públicos.

Mi posición: las actualizaciones de seguridad deben aplicarse automáticamente. Las actualizaciones de funcionalidad (que añaden características) deben revisarse manualmente. La configuración de `unattended-upgrades` permite hacer exactamente esta distinción.

### Kernel Live Patching

Históricamente, las actualizaciones del kernel requerían un reinicio del sistema. Los parches en vivo (live patching) permiten aplicar parches de seguridad al kernel sin reiniciar:

- Canonical Livepatch (Ubuntu): Gratuito para hasta 3 máquinas.
- KernelCare: Solución comercial.
- kpatch: Herramienta nativa del kernel de Linux.

Live patching es útil para servidores que no pueden reiniciarse frecuentemente, pero no reemplaza la necesidad de reinicios periódicos para aplicar parches que no pueden aplicarse en vivo.

## Minimización de Servicios y Programas

Cada programa instalado y cada servicio corriendo es un punto de ataque potencial. La minimización reduce la superficie de ataque.

### Inventario de Servicios

Después de instalar un servidor, revisa que servicios están corriendo:

`systemctl list-units --type=service --state=running`

En un servidor Ubuntu recién instalado, puedes encontrar servicios como:
- `cups.service`: Servicio de impresión. Innecesario en un servidor web.
- `avahi-daemon.service`: Zeroconf/Bonjour. Innecesario en un servidor.
- `postfix.service`: Servidor de correo. Innecesario si no envías correo desde el servidor.
- `bluetooth.service`: Bluetooth. Innecesario en un servidor.

Detén e inhabilita todo lo que no sea necesario:
```
systemctl stop cups
systemctl disable cups
```

### Eliminación de Programas Innecesarios

Revisa los paquetes instalados y elimina los que no sean necesarios:

En Debian/Ubuntu: `dpkg --get-selections | grep -v deinstall`
En Red Hat: `rpm -qa`

Pregúntate por cada paquete: "Es necesario para que el servidor cumpla su función?" Si la respuesta es no, eliminalo.

Herramientas de desarrollo (gcc, make, compiladores) son particularmente peligrosas en servidores de producción porque permiten a un atacante compilar exploits en el propio servidor.

## Control de Acceso: Usuarios y Grupos

### Principio de Mínimo Privilegio

Cada usuario del sistema debe tener solo los permisos necesarios para hacer su trabajo. Nada más.

- Los administradores deben tener cuentas personales (no compartidas).
- Las cuentas de servicio (www-data, mysql) deben tener el mínimo privilegio posible.
- Las cuentas inactivas deben deshabilitarse o eliminarse.

### sudo con Granularidad

No des a todos los administradores acceso sudo completo. Usa grupos y reglas específicas:

- Grupo `sudo` (Debian/Ubuntu) o `wheel` (Red Hat): Acceso completo. Solo para administradores principales.
- Reglas específicas en `/etc/sudoers.d/`: Para permisos limitados.

Ejemplo: un desarrollador necesita reiniciar el servicio web:
```
desarrollador ALL=(root) /usr/bin/systemctl restart apache2
```

Nunca: `desarrollador ALL=(ALL) ALL`

### Deshabilitar el Acceso Root

Ya lo cubrimos en SSH, pero vale la pena repetirlo: deshabilita el inicio de sesión directo de root. No solo en SSH, sino también en la consola física si es posible.

Configurar sudo para que root no tenga contraseña no es buena idea. root debe tener contraseña, y debe estar guardada en un lugar seguro (gestor de contraseñas empresarial).

## Detección de Cambios: Integridad del Sistema

Un atacante que compromete un servidor modifica archivos del sistema para establecer persistencia o para ocultar su presencia. La detección de cambios en archivos críticos permite identificar cuando esto ocurre.

### AIDE (Advanced Intrusion Detection Environment)

AIDE crea una base de datos de hashes de archivos del sistema (binarios, bibliotecas, archivos de configuración) y luego verifica periódicamente que no hayan cambiado.

Instalación:
```
apt install aide
aideinit
mv /var/lib/aide/aide.db.new /var/lib/aide/aide.db
```

Verificación periódica:
```
aide --check
```

Si un archivo monitoreado cambia, AIDE lo reporta. Esto permite detectar cuando un atacante modifica `/bin/ls` para ocultar procesos, o añade un usuario a `/etc/passwd`, o modifica la configuración de SSH.

### Tripwire

Tripwire es otra herramienta similar a AIDE. Ambas hacen lo mismo: verifican la integridad de los archivos del sistema comparando hashes actuales con una línea base.

### Osquery

Osquery es una herramienta más moderna que expone el sistema operativo como una base de datos SQL. Permite consultar procesos, sockets, archivos, y más con consultas SQL.

Ejemplo: encontrar todos los binarios SUID en el sistema:
```sql
SELECT * FROM suid_bin;
```

Ejemplo: encontrar conexiones de red activas:
```sql
SELECT local_address, remote_address, state FROM process_open_sockets;
```

Osquery es particularmente útil para monitoreo continuo y detección en tiempo real.

## Configuración del Kernel con sysctl

El kernel de Linux tiene parámetros que afectan la seguridad del sistema. Se configuran en `/etc/sysctl.conf` o en archivos en `/etc/sysctl.d/`.

### Parámetros Recomendados

**Protección contra spoofing de IP:**
```
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.rp_filter = 1
```

**Ignorar pings de broadcast (previene ser usado en ataques DDoS de amplificación):**
```
net.ipv4.icmp_echo_ignore_broadcasts = 1
```

**Ignorar pings ICMP (el servidor no responde a ping):**
```
net.ipv4.icmp_echo_ignore_all = 1
```

**Deshabilitar redirección de paquetes (prevención de MITM):**
```
net.ipv4.conf.all.accept_redirects = 0
net.ipv6.conf.all.accept_redirects = 0
```

**Deshabilitar forwarding de IP (el servidor no actuara como router a menos que sea necesario):**
```
net.ipv4.ip_forward = 0
```

**Protección contra SYN flood:**
```
net.ipv4.tcp_syncookies = 1
```

**Limitar conexiones simultáneas:**
```
net.core.somaxconn = 1024
```

**Deshabilitar source routing:**
```
net.ipv4.conf.all.accept_source_route = 0
```

Aplicar cambios: `sysctl -p`

## Deshabilitar Servicios Innecesarios

### Servicios Comunes Innecesarios en un Servidor

- **CUPS (Common Unix Printing System):** Servicio de impresión. `systemctl disable cups`
- **Avahi:** Zeroconf/Bonjour para descubrimiento de servicios en la red local. `systemctl disable avahi-daemon`
- **Bluetooth:** `systemctl disable bluetooth`
- **Postfix:** Servidor de correo SMTP. Si el servidor no necesita enviar correo, deshabilitalo. `systemctl disable postfix`
- **NFS:** Comparticion de archivos en red. Solo si es necesario. `systemctl disable nfs-server`

### Compiladores y Herramientas de Desarrollo

gcc, make, python-dev, perl, etc. son necesarios en entornos de desarrollo pero peligrosos en producción. Un atacante que compromete un servidor con un compilador instalado puede compilar exploits directamente en la máquina comprometida.

Si es posible, elimina los compiladores de los servidores de producción:
`apt remove gcc make`

Si necesitas mantenerlos (por ejemplo, para instalar módulos de Python), considera restringir su ejecución con AppArmor o SELinux.

## Particionado Seguro

La forma en que particionas el disco tiene implicaciones de seguridad. Un particionado bien pensado puede limitar el daño de un ataque.

### Separación de Particiones

- `/`: Partición raíz. Suficiente espacio para el sistema base (10-20GB).
- `/var`: Separado de raíz. Si los logs crecen sin control, no llenan la partición raíz.
- `/tmp`: Separado, montado con `noexec,nosuid,nodev`.
- `/home`: Separado, montado con `nosuid,nodev` (y opcionalmente `noexec`).
- `/opt`: Separado si instalas aplicaciones de terceros aquí.

### Opciones de Montaje

En `/etc/fstab`:

```
/dev/sda1 /     ext4 defaults,noatime 0 1
/dev/sda2 /var ext4 defaults,noatime 0 2
/dev/sda3 /tmp ext4 defaults,noexec,nosuid,nodev,noatime 0 2
/dev/sda4 /home ext4 defaults,nosuid,nodev,noatime 0 2
```

- `noexec`: No permite ejecutar binarios desde esta partición. Los atacantes no pueden ejecutar malware desde /tmp.
- `nosuid`: Ignora los bits SUID/SGID en esta partición.
- `nodev`: No permite archivos de dispositivo.
- `noatime`: No actualiza el timestamp de acceso a archivos. Mejora rendimiento y reduce escritura en disco.

## AppArmor y SELinux

Son sistemas de control de acceso obligatorio (MAC) que restringen lo que los programas pueden hacer incluso cuando se ejecutan como root.

### AppArmor (Debian/Ubuntu)

AppArmor asocia perfiles de seguridad a programas. Un perfil define que archivos puede leer, que archivos puede escribir, que redes puede usar, etc.

Ejemplo: perfil para el servidor web Apache:
```
#include <tunables/global>

/usr/sbin/apache2 {
    /etc/apache2/** r,
    /var/www/html/** r,
    /var/log/apache2/** w,
    /var/run/apache2.pid w,
    /usr/sbin/apache2 mr,
    /lib/** rm,
    network tcp,
}
```

Si Apache intenta escribir en `/etc/shadow`, AppArmor lo bloquea incluso si el proceso se ejecuta como root.

### SELinux (Red Hat/CentOS/Fedora)

SELinux es más complejo que AppArmor pero ofrece un control más granular. Implementa etiquetas (labels) en archivos, procesos, puertos, y usuarios, y define políticas que determinan que interacciones están permitidas.

SELinux tiene tres modos:
- `Enforcing`: Las políticas se aplican estrictamente.
- `Permissive`: Las violaciones se registran pero no se bloquean.
- `Disabled`: SELinux esta desactivado.

Muchos administradores desactivan SELinux porque "no entienden como funciona". Es un error. En modo permissive, SELinux te dice que reglas estas violando sin bloquear nada, lo que permite ajustar las políticas gradualmente.

```
getenforce            # Muestra el modo actual
setenforce 0          # Cambia a permissive
setenforce 1          # Cambia a enforcing
```

## Modos de Falla Comunes

**Abrir un puerto en UFW pero no verificar externamente:** Confías en que UFW esta funcionando pero nunca probaste desde afuera. Un error en la configuración puede dejar el puerto abierto.

**Deshabilitar SELinux en lugar de configurarlo correctamente:** Es el error más común en entornos Red Hat. SELinux bloquea algo, y el administrador lo desactiva en vez de investigar la causa.

**Actualizaciones automáticas sin monitoreo:** Configuras actualizaciones automáticas pero no revisas los logs. Una actualización que rompe un servicio pasa desapercibida por días.

**SSH hardening sin respaldo:** Configuras SSH, reinicias el servicio, y te olvidaste de permitir el nuevo puerto en UFW. Te quedas fuera del servidor.

**Firewall que bloquea actualizaciones:** Configuras UFW con `default deny outgoing` sin permitir acceso a los servidores de actualizaciones. El servidor deja de recibir parches de seguridad.

**Confiar en que el antivirus protege:** Instalar ClamAV y asumir que el servidor esta seguro. ClamAV detecta malware conocido, pero no protege contra exploits, configuraciones incorrectas, o ataques sin firma.

**Aplicar hardening ciegamente sin entender el servicio:** Seguir una guía de hardening sin entender que hace cada cambio. Por ejemplo, deshabilitar `icmp_echo_ignore_all` puede romper la detección de MTU PMTU discovery, causando problemas de conectividad.

**No probar el hardening antes de producción:** Aplicar cambios directamente en producción sin probarlos en un entorno de desarrollo. Un cambio en sysctl o en la configuración de SSH puede tener efectos imprevistos.

## Casos Reales

**El Ataque a los Servidores de MongoDB (2017):** Miles de servidores MongoDB fueron comprometidos porque los administradores los dejaron expuestos a Internet sin firewall ni autenticación. Los atacantes borraron las bases de datos y pidieron rescate. El hardening básico (firewall + autenticación) habría prevenido el ataque.

**El Incidente de los Servidores de Jenkins (2018):** Un servidor Jenkins en una empresa de tecnología estaba expuesto a Internet sin firewall, con el usuario admin y contraseña por defecto. Un atacante encontró el servidor en Shodan, gano acceso, y uso las credenciales almacenadas en Jenkins para comprometer toda la infraestructura en la nube.

**La Filtración de Datos de la Clínica de UCLA (2015):** Un servidor Linux con una base de datos de pacientes fue comprometido porque SSH permitía inicio de sesión con contraseña y la contraseña de root era débil. El atacante ingreso por SSH con fuerza bruta y extrajo datos de salud protegidos de 4.5 millones de pacientes.

**El Caso de los Mineros en los Servidores de Docker (2019):** Una empresa instalo Docker en sus servidores de producción pero no aplico hardening a los contenedores. Los atacantes comprometieron un contenedor con una aplicación web vulnerable y desde ahí accedieron al host, instalando mineros de criptomonedas. La falta de aislamiento y la ausencia de firewall interno permitió el movimiento lateral.

## Ángulo Hacker: Como los Atacantes Evaden el Hardening

**Escaneo de versiones:** Un atacante identifica la versión exacta del sistema operativo y software instalado para buscar vulnerabilidades conocidas. El hardening por si solo no protege contra software desactualizado.

**Enumeración de puertos:** Incluso con firewall, un atacante puede determinar si un puerto esta filtrado vs abierto vs cerrado. La diferencia en los mensajes de error permite deducir que servicios están detrás del firewall.

**Ataques a servicios no estándar:** Cambiar el puerto de SSH no detiene a un atacante que escanea todos los puertos. Herramientas como masscan pueden escanear el rango completo de puertos (65535) en segundos.

**Explotación de configuraciones incorrectas de sudo:** Un atacante que compromete una cuenta con acceso sudo limitado busca formas de escapar de las restricciones, como explotar editores de texto o herramientas de búsqueda que permiten ejecución de comandos.

**Ataques a la cadena de suministro:** El atacante compromete paquetes de software que el servidor descarga de fuentes oficiales. El hardening no protege contra software malicioso en fuentes comprometidas.

**Ataques de día cero en servicios expuestos:** Incluso con el mejor hardening, un servicio expuesto a Internet (como un servidor web) puede tener vulnerabilidades desconocidas. El hardening reduce la superficie de ataque pero no la elimina por completo.

**Ingeniería social:** El hardening técnico no protege contra un administrador que revela su contraseña en un correo de phishing. La seguridad técnica debe complementarse con concienciación del personal.

## Autoevaluación

1. Alquilas un servidor nuevo en la nube. El proveedor te pregunta si quieres iniciar sesión con contraseña o con llave SSH. Cual eliges y por qué? Explica que riesgos implica cada opción.

2. Configuras UFW con `default deny incoming` y luego abres el puerto 443 para tu servidor web. De repente, el servidor no puede descargar actualizaciones. Que política se te olvido configurar y como la corriges?

3. En `/etc/ssh/sshd_config` encuentras `PermitRootLogin yes`. Explica que tipo de ataque estas facilitando y describe como un atacante aprovecharía esta configuración. Que comando exacto editas y que valor pones?

4. Un administrador dice: "SELinux es molesto porque bloquea cosas, mejor lo deshabilito." Defiende por qué mantener SELinux en modo enforcing es mejor que deshabilitarlo. Describe como usarías el modo permissive para diagnosticar problemas.

5. Tu servidor tiene la partición `/tmp` montada sin `noexec`. Un atacante compromete el servidor web y descarga un script malicioso a `/tmp`. Explica como la opción `noexec` habría prevenido la ejecución del script y que alternativas usaría el atacante para evitarlo.

6. Instalas unattended-upgrades para actualizaciones de seguridad automáticas. Dos meses después, descubres que una actualización rompió el servicio de base de datos y nadie lo noto durante semanas. Como configurarías las actualizaciones para evitar esto sin dejar de recibir parches de seguridad?

7. Durante una auditoría, encuentras que el servidor tiene instalados gcc, make, python-dev, y varias bibliotecas de desarrollo. El servidor es de producción y no se usa para desarrollo. Explica por qué esto es un riesgo y como mitigarías las herramientas de desarrollo sin afectar el funcionamiento del servidor.

8. Configuras un servidor siguiendo las guías de hardening de este sitio. Sin embargo, un atacante logra comprometer el servidor web a través de una vulnerabilidad de día cero. Explica como las capas de hardening que aplicaste limitan el daño que el atacante puede causar incluso después del compromiso inicial.
