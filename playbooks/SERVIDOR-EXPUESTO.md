---
title: "Playbook: Servidor Comprometido (Expuesto a Internet)"
---
# Playbook: Servidor Comprometido (Expuesto a Internet)

Un servidor quedó expuesto y alguien ya está adentro. Sin engaños, sin phishing: fuerza bruta pura. Es momento de actuar siguiendo el protocolo establecido.

## Objetivo de esta Guía

Aprender qué hacer cuando el castillo ha sido penetrado no por engañar al usuario, sino por la fuerza bruta técnica.

En los Playbooks anteriores enfrentamos Phishing (Engaño) y Malware (Infección de usuario). En un escenario de **Servidor Expuesto**, no hay usuarios engañados.
Un administrador olvidó configurar el Firewall. Dejó el puerto 22 (SSH) abierto al internet público. Un escáner automatizado en Rusia detectó la puerta abierta y rompió la cerradura mediante fuerza bruta. El atacante ahora es dueño (Root) del Servidor Web corporativo.

---

## Fases de Respuesta a Incidentes (El Ciclo PICERL)

### Escenario (La Alerta Técnica)
**Sábado 11:30 PM:** El sistema IPS (Prevención de Intrusiones) lanza una alerta crítica. Detectó comandos de terminal (Linux Shell) inyectados hacia la IP externa del Servidor Web de la empresa. El servidor ha descargado un minero de criptomonedas y está consumiendo el 100% del procesador.

### Detección y Análisis Inicial

**Detección de Fuerza Bruta SSH en Logs:**

```bash
# En /var/log/auth.log (Debian/Ubuntu) o /var/log/secure (RHEL/CentOS)
grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -nr | head -20

# Detectar inicios de sesión exitosos desde IPs desconocidas
grep "Accepted password" /var/log/auth.log

# Ver sesiones SSH activas
ss -tnp | grep :22
w
last | grep -v "still logged in" | head -20
```

**KQL para Azure Sentinel - Detección de Criptomineros:**
```kql
VMConnection
| where TimeGenerated > ago(1h)
| where RemotePort in (3333, 4444, 5555, 6666, 7777, 8332, 8333, 14444, 45560, 45590)
| project TimeGenerated, Computer, RemoteIp, RemotePort, ProcessName
| where ProcessName in ("xmrig", "cpuminer", "minergate", "ccminer", "ethminer")
```

**Splunk - Detección de Descargas de Malware desde Servidor Web:**
```splunk
index=proxy OR index=weblog
| search src_ip=<SERVER_IP> dest_category=malware OR url IN ("*xmrig*", "*miner*", "*cryptonight*")
| table _time, src_ip, url, dest_ip, http_user_agent
```

**Logs de Firewall/IPS - Alertas Típicas:**

| Firma de IPS | Descripción |
|-------------|-------------|
| ET SCAN SSH Brute Force | Múltiples intentos de autenticación SSH |
| ET MALWARE Linux Crypto Miner Download | Descarga de binarios de minado |
| ET POLICY Suspicious Outbound to Mining Pool | Conexión saliente a pool de minería |
| ET WEB_SERVER Possible Command Injection | Inyección de comandos en parámetros web |
| ET TROJAN Linux.BackDoor.Mirai | Conexión C2 de botnet IoT |

---

### Paso 1: Contención (El Cerco Militar)
El atacante está adentro del Servidor Web. El riesgo principal es que salte hacia la Base de Datos Financiera (Movimiento Lateral).

1. **Aislamiento en DMZ:** Reconfigurar el Firewall de inmediato para mover el Servidor Web comprometido a una **VLAN de Cuarentena (DMZ)**. Esto significa que el servidor no puede hablar con ningún otro servidor de la red corporativa. Es una celda de confinamiento.

   **Comandos de Aislamiento en Firewall (iptables en el servidor afectado):**
   ```bash
   # Bloquear todo el tráfico entrante y saliente excepto al SIEM
   iptables -P INPUT DROP
   iptables -P FORWARD DROP
   iptables -P OUTPUT DROP
   # Permitir solo tráfico de gestión desde IP interna específica
   iptables -A INPUT -s 10.0.0.0/8 -p tcp --dport 22 -j ACCEPT
   iptables -A OUTPUT -d <SIEM_IP> -p udp --dport 514 -j ACCEPT
   ```

   **Aislamiento en Nube (AWS):**
   ```bash
   # Modificar Security Groups para eliminar todo el tráfico saliente
   aws ec2 revoke-security-group-egress --group-id sg-xxxx --protocol all --cidr 0.0.0.0/0
   # Mover a subnet de cuarentena
   aws ec2 modify-instance-attribute --instance-id i-xxxx --groups sg-quarantine
   ```

2. **¡No Apagar la Máquina! (Captura de RAM):** De nuevo, la regla máxima Forense. El atacante suele esconder su malware en la Memoria RAM. Si apagas el servidor físico, borras la evidencia.

   **Captura de Memoria RAM en Linux:**
   ```bash
   # LiME (Linux Memory Extractor)
   insmod lime.ko "path=/tmp/mem_dump.lime format=lime"

   # avml (Acquire Volatile Memory Linux)
   ./avml /tmp/mem_dump.avml

   # fmem (Forensic Memory)
   insmod fmem.ko
   dd if=/dev/fmem of=/tmp/mem_dump.dd bs=1024
   ```

   **Escanear el Volcado de RAM con Volatility:**
   ```bash
   # Identificar perfil Linux
   volatility -f mem_dump.lime --info | grep Linux

   # Listar procesos ocultos
   volatility -f mem_dump.lime --profile=LinuxUbuntuX64 linux_psaux
   volatility -f mem_dump.lime --profile=LinuxUbuntuX64 linux_pstree

   # Encontrar conexiones de red
   volatility -f mem_dump.lime --profile=LinuxUbuntuX64 linux_netstat

   # Extraer bash history de la RAM
   volatility -f mem_dump.lime --profile=LinuxUbuntuX64 linux_bash

   # Buscar módulos de kernel maliciosos (rootkits)
   volatility -f mem_dump.lime --profile=LinuxUbuntuX64 linux_lsmod
   volatility -f mem_dump.lime --profile=LinuxUbuntuX64 linux_check_afinfo
   volatility -f mem_dump.lime --profile=LinuxUbuntuX64 linux_check_syscall
   ```

3. **Imagen de Disco Duro:** Tomar una "Fotografía (Snapshot)" completa del disco duro para que el equipo Forense pueda diseccionar el ataque mañana, asegurando la Cadena de Custodia Legal.

   ```bash
   # Utilizando dd con hash forense
   sudo dc3dd if=/dev/sda of=/mnt/forensic/server_disk.dd hash=sha256 log=/mnt/forensic/log.txt

   # O utilizando Guymager (GUI) o FTK Imager para Linux
   # Crear E01 (EnCase evidence file) con evidencia comprimida

   # Calcular hash de la imagen
   sha256sum /mnt/forensic/server_disk.dd > /mnt/forensic/hash.txt
   ```

---

### Paso 2: Erradicación (Quemar la Casa)
En servidores críticos en la Nube (AWS/Azure), la erradicación no consiste en borrar el virus. Consiste en destruir todo el servidor comprometido y reconstruirlo.

1. **Terminar el Servidor:** Si usamos infraestructura moderna como contenedores (Kubernetes) o Servidores Virtuales, simplemente presionamos el botón de "Terminar/Eliminar Servidor". Quemamos el castillo entero (el servidor virtual) con el atacante adentro.

   **AWS EC2 - Terminate Instance:**
   ```bash
   aws ec2 terminate-instances --instance-ids i-xxxx
   # Para evitar recreación por Auto Scaling, suspender el ASG primero:
   aws autoscaling suspend-processes --auto-scaling-group-name my-asg
   ```

   **Kubernetes - Limpiar Nodo Comprometido:**
   ```bash
   # Drenar y eliminar nodo
   kubectl drain <node> --ignore-daemonsets --delete-emptydir-data
   kubectl delete node <node>
   # Revisar pods maliciosos
   kubectl get pods --all-namespaces | grep -iv running
   kubectl describe pod <malicious-pod>
   ```

2. **Cerrar la Ventana Rota:** El Firewall se reconfigura para cerrar definitivamente el Puerto 22 al mundo. El acceso por SSH a los servidores ahora solo será permitido si el administrador se conecta usando una VPN corporativa con MFA (Zero Trust).

   ```bash
   # Bloquear SSH público en Security Group de AWS
   aws ec2 revoke-security-group-ingress --group-id sg-xxxx --protocol tcp --port 22 --cidr 0.0.0.0/0
   # Permitir solo desde IP de la VPN corporativa
   aws ec2 authorize-security-group-ingress --group-id sg-xxxx --protocol tcp --port 22 --cidr 10.200.0.0/16
   ```

3. **Auditoría de Bases de Datos:** Verificar los logs para saber si el atacante logró enviar peticiones a la Base de Datos interna antes del aislamiento. (Verificar si esto escaló a una Fuga de Datos).

   **Revisión de Logs de Base de Datos:**
   ```sql
   -- MySQL: Revisar conexiones desde IP del servidor comprometido
   SELECT * FROM mysql.general_log WHERE user_host LIKE '%<SERVER_IP>%';
   SHOW PROCESSLIST;

   -- PostgreSQL: Revisar conexiones
   SELECT * FROM pg_stat_activity WHERE client_addr = '<SERVER_IP>';
   SELECT * FROM pg_log WHERE command_tag = 'SELECT' AND query LIKE '%export%';
   ```

### Indicadores de Compromiso (IoCs) para Servidor Linux

| Categoría | IoC | Fuente |
|-----------|-----|--------|
| **Mineros** | Binarios xmrig, cpuminer, minergate | Filesystem, /proc |
| **Miner Pools** | IPs de pools:  pool.minexmr.com, xmrpool.eu | Conexiones de red |
| **Backdoor SSH** | Claves SSH en `.ssh/authorized_keys` de root | Filesystem |
| **Web Shell** | Archivos .php, .jsp, .py en `/var/www/html/` no reconocidos | Filesystem |
| **Rootkits** | Módulos de kernel sospechosos (`lkm_rootkit.ko`) | `lsmod`, `dmesg` |
| **Cron Jobs** | Entradas cron maliciosas ejecutando scripts | `/var/spool/cron/`, `/etc/cron.d/` |
| **SSHD Backdoor** | Binario de SSH reemplazado | `dpkg --verify` |
| **Process Hiding** | Procesos con nombres falsos (udevd, httpd) | Volatility pslist vs psxview |

---

### Paso 3: Recuperación (El Clon Limpio)
El servidor malo fue destruido. Hay que levantar las operaciones para que la empresa vuelva a vender.

1. **Despliegue Inmutable:** El equipo de desarrollo utiliza código automatizado (Terraform/Ansible) para crear una copia exacta y 100% limpia del servidor web en 5 minutos, conectada al entorno sano de la red.

   ```hcl
   # Terraform - Reconstrucción inmutable
   resource "aws_instance" "web_server" {
     ami           = "ami-0c55b159cbfafe1f0" # Última AMI limpia
     instance_type = "t3.medium"
     user_data     = file("${path.module}/bootstrap.sh")

     # Nuevo Security Group sin puertos abiertos al público excepto 443
     vpc_security_group_ids = [aws_security_group.web_sg_new.id]

     # Etiquetar para tracking
     tags = {
       Name        = "web-server-v2"
       Environment = "production"
     }
   }
   ```

2. **Rotación de Contraseñas y Secretos:** El atacante tuvo acceso root al servidor antiguo. Es probable que se haya robado las contraseñas de las Bases de Datos (API Keys) guardadas en el código fuente de ese servidor. Deben rotarse todas las contraseñas usadas por esa máquina antes de conectar la nueva.

   ```bash
   # Rotar contraseñas masivamente
   # AWS Secrets Manager
   aws secretsmanager rotate-secret --secret-id /prod/db/password

   # HashiCorp Vault
   vault write -force database/rotate-root/db-prod
   ```

3. **Monitoreo Reforzado:** Dejar el nuevo servidor bajo "Libertad Condicional". El Blue Team aplicará reglas más estrictas de detección de IDS/IPS durante las siguientes 72 horas para asegurar que el atacante no intente volver a entrar. esto no es opcional — los atacantes suelen volver a intentar.

### Análisis Forense Específico para Servidor Linux

**Investigación de Rootkits:**
```bash
# verificar integridad de binarios del sistema
rpm --verify 2>/dev/null | grep -v "c5"  # RHEL/CentOS
dpkg --verify 2>/dev/null  # Debian/Ubuntu

# Detectar rootkits conocidos
chkrootkit -q
rkhunter --check

# Buscar procesos ocultos
unhide proc
unhide sys

# Verificar llamadas al sistema (syscall hooks)
cat /proc/1234/maps | grep -i "\[vdso\]\|\[vsyscall\]"
```

**Extracción de Artefactos Clave:**
```bash
# Historia de comandos del atacante
cat ~/.bash_history
find /home/*/.bash_history -exec cat {} \;
find /home/*/.ssh/authorized_keys 2>/dev/null
# Archivos temporales
ls -la /tmp/
ls -la /var/tmp/
# Archivos modificados recientemente
find / -type f -mmin -120
```

---

## 4. Criterio de Dominio (Autoevaluación)

Revisa si puedes responder como un bombero forense:

1. Un servidor virtual ha sido comprometido por un grupo APT (Hacker Avanzado). El administrador local de TI, tratando de ser útil, "Apaga el servidor y lo borra inmediatamente de AWS" para detener la amenaza. Explica el desastre irreparable que acaba de cometer desde una perspectiva de **Respuesta Forense (DFIR)** y la pérdida del *Volcado de RAM*.
2. El concepto moderno de operaciones en la Nube asume "Infraestructura Inmutable". En la fase de **Erradicación**, en lugar de perder horas corriendo el Antivirus tratando de limpiar el servidor hackeado, ¿Cuál es la estrategia táctica más eficiente (Quemar la Casa) para servidores virtuales?
3. En la fase de Contención, el servidor se mueve a una "VLAN de Cuarentena (Celda de Aislamiento)". Usando la filosofía de "Zero Trust", ¿Por qué este paso previene el ataque mortal de "Movimiento Lateral"?
4. El servidor hackeado guardaba las credenciales para acceder a la pasarela de pagos de PayPal de la empresa. En la fase de **Recuperación**, si el administrador levanta un servidor nuevo idéntico pero se olvida de ejecutar el paso de **"Rotación de Contraseñas y Secretos"**, ¿Qué podría hacer el hacker al día siguiente, aunque ya no tenga acceso al servidor físico?
5. Nombra tres herramientas utilizadas para capturar memoria RAM en un servidor Linux comprometido.
