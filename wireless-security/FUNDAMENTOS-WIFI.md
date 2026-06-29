---
title: "Fundamentos de Wi-Fi: El Megáfono Invisible"
level: "inicial"
content_type: "guia"
updated: "2026-06-29"
---

# Fundamentos de Wi-Fi: El Megáfono Invisible

## Objetivo de esta Guía

Aprender por qué la comodidad del internet inalámbrico es el sueño hecho realidad de cualquier hacker con $20 dólares.

Anteriormente (Redes), aprendimos que para hackearte, el atacante tenía que conectarse físicamente a tu Switch con un cable. Con la invención del Wi-Fi (Radiofrecuencia 802.11), la humanidad quitó el cable y empezó a gritar sus datos al aire. Eso cambió absolutamente todo.

Esta guía cubre la física del Wi-Fi, la evolución de los protocolos de cifrado inalámbrico, los ataques más comunes, las herramientas del atacante, y las defensas técnicas para proteger una red inalámbrica corporativa.

---

## 1. La Física del Wi-Fi (El Megáfono)

* **La Analogía:**
 * **Internet por Cable (Ethernet):** Es como susurrarle al oído a tu módem a través de un tubo de PVC cerrado. Es físicamente imposible que un vecino te escuche.
 * **Internet Wi-Fi:** Es como salir al balcón y usar un **Megáfono** para gritarle tu contraseña a tu módem. El problema es que las ondas de radio atraviesan paredes. El vecino de al lado no necesita hackear tu módem, solo necesita abrir la ventana, prender su propia antena (Sniffing) y "escuchar" los gritos invisibles de tu computadora.

### Espectro de Radiofrecuencia y Estándares 802.11

El Wi-Fi opera en dos bandas de frecuencia principales:

**2.4 GHz:**
- Mayor alcance, mejor penetración de paredes.
- Más congestionado: microondas, Bluetooth, teléfonos inalámbricos, dispositivos IoT.
- Canales: 1-11 (EE.UU.), 1-13 (Europa), 14 (Japón). Solo los canales 1, 6 y 11 no se superponen.

**5 GHz:**
- Menor alcance, menos penetración de paredes.
- Menos congestionado, más canales disponibles (hasta 25 canales no superpuestos).
- Mayor velocidad máxima. Soporta canales de 80 MHz y 160 MHz.

**6 GHz (Wi-Fi 6E y Wi-Fi 7):**
- Banda adicional para Wi-Fi 6E (802.11ax extendido). 1200 MHz de espectro nuevo.
- Sin interferencia de dispositivos legacy. Baja latencia.
- Requiere hardware compatible (WPA3 obligatorio).

### Estándares IEEE 802.11

| Estándar | Nombre Comercial | Año | Velocidad Máx | Banda |
|----------|-----------------|-----|---------------|-------|
| 802.11b | Wi-Fi 1 | 1999 | 11 Mbps | 2.4 GHz |
| 802.11g | Wi-Fi 3 | 2003 | 54 Mbps | 2.4 GHz |
| 802.11n | Wi-Fi 4 | 2009 | 600 Mbps | 2.4/5 GHz |
| 802.11ac | Wi-Fi 5 | 2014 | 3.5 Gbps | 5 GHz |
| 802.11ax | Wi-Fi 6 | 2019 | 9.6 Gbps | 2.4/5 GHz |
| 802.11ax | Wi-Fi 6E | 2020 | 9.6 Gbps | 6 GHz |
| 802.11be | Wi-Fi 7 | 2024 | 46 Gbps | 2.4/5/6 GHz |

### La Evolución de las Contraseñas (WPA)

Cuando gritas con un megáfono por mucho tiempo? Eventualmente alguien te va a escuchar. Por eso la industria inventó el cifrado inalámbrico. Tu computadora sigue gritando, pero grita en "código secreto" (Criptografía).

**WEP (Wired Equivalent Privacy — 1997):**
- Usa el cifrado RC4 con una clave estática de 64 o 128 bits.
- Vulnerabilidad fatal: El vector de inicialización (IV) es de solo 24 bits, lo que garantiza que se repita después de aproximadamente 5000 paquetes. Un atacante captura suficientes paquetes (inyectando tráfico ARP para acelerar el proceso) y calcula la clave en menos de 5 minutos.
- Herramienta: `aircrack-ng` con `-a 1` (modo WEP).
- **Estado:** Obsoleto. Cualquier red que aún use WEP está efectivamente sin protección.

**WPA1 (Wi-Fi Protected Access — 2003):**
- Parche temporal ante la vulnerabilidad de WEP. Usa TKIP (Temporal Key Integrity Protocol) que cambia la clave en cada paquete.
- TKIP también usa RC4 pero con un mecanismo de mezcla de claves y un código de integridad de mensaje (Michael).
- Vulnerable al ataque **Beck-Tews** (2008): Un atacante puede descifrar paquetes en 12-15 minutos.
- **Estado:** Obsoleto.

**WPA2 (2004):**
- Introdujo **CCMP** basado en AES (Advanced Encryption Standard). Cifrado simétrico de 128 bits en modo CCM (Counter with CBC-MAC).
- Es el estándar actual en la mayoría de dispositivos.
- Vulnerabilidad conocida: **KRACK (Key Reinstallation Attack)** — CVE-2017-13077. Durante el handshake de 4 vías, un atacante puede forzar la reutilización de una clave nonce, permitiendo descifrar el tráfico sin conocer la contraseña. El parche fue actualizar los clientes y puntos de acceso.

**WPA3 (2018):**
- La armadura moderna. Usa **SAE (Simultaneous Authentication of Equals)**, basado en Dragonfly Key Exchange (RFC 7664).
- SAE es resistente a ataques de diccionario (offline): El atacante no puede descifrar la contraseña incluso si graba tus transmisiones durante años.
- Introdujo **OWE (Opportunistic Wireless Encryption)** para redes abiertas: cifrado sin autenticación (no necesitas contraseña, pero el tráfico está cifrado).
- **WPA3-Enterprise:** Modo empresarial con autenticación 802.1X y cifrado AES-256-GCM (vs AES-128 en WPA2).

* **Por qué esto importa:** Aunque WPA3 es el estándar más seguro, la mayoría de las redes corporativas aún usan WPA2 porque la migración a WPA3 requiere hardware compatible. Un atacante con hardware adecuado puede atacar WPA2 offline usando el handshake capturado y listas de contraseñas (rockyou.txt, Have I Been Pwned).

### WPA-Enterprise: El Estándar Corporativo

A diferencia de WPA-Personal (una sola contraseña compartida), WPA-Enterprise usa **802.1X** con un servidor **RADIUS** (Remote Authentication Dial-In User Service):

- Cada usuario tiene credenciales únicas (usuario/contraseña o certificado).
- Al desconectar a un empleado, se revoca su acceso sin cambiar la contraseña de toda la red.
- Métodos EAP (Extensible Authentication Protocol):
  - **EAP-TLS:** Usa certificados digitales tanto en el servidor como en el cliente. Máxima seguridad. La autenticación es mutua: el cliente verifica el servidor y el servidor verifica el cliente.
  - **PEAP-MSCHAPv2:** El servidor tiene un certificado; el cliente usa usuario/contraseña. Vulnerable a ataques de servidor RADIUS falso si el usuario no verifica el certificado del servidor.
  - **EAP-TTLS:** Similar a PEAP pero con túnel TLS que protege la autenticación interna.

* **Por qué esto importa:** Un atacante puede configurar un punto de acceso falso con WPA-Enterprise y un certificado autofirmado. Si el usuario acepta el certificado sin verificar (algo común), el atacante captura las credenciales del dominio.

---

## 2. Ataques a Redes Inalámbricas

### Ataque de Deautenticación (Deauth Attack)

El protocolo 802.11 incluye tramas de gestión (management frames) que no están cifradas ni autenticadas en WPA2. Una de estas tramas es la **Deauthentication frame**, que desconecta a un cliente de un punto de acceso.

**Cómo funciona:**
1. El atacante usa `aireplay-ng` para enviar tramas de deautenticación falsificadas. Ejemplo: `aireplay-ng -0 5 -a 00:14:22:01:23:45 wlan0mon` (envía 5 deauths al AP).
2. El cliente se desconecta y automáticamente intenta reconectarse.
3. Durante la reconexión, el atacante captura el **handshake de 4 vías** (WPA2) que contiene el hash de la contraseña.
4. Con el hash capturado, el atacante ejecuta un ataque de diccionario offline: `hashcat -m 2500 handshake.hccapx rockyou.txt`.

**Defensa:**
- WPA3 elimina las tramas de gestión sin cifrar. Las tramas de deautenticación están protegidas.
- En WPA2, algunas marcas implementan Protección de Tramas de Gestión (802.11w) que cifra estas tramas.

### El Gemelo Malvado (Evil Twin)

Incluso con WPA3, existe un ataque que no requiere matemáticas complejas, solo manipulación humana.

* **La Trampa:** Llegas a una cafetería famosa. Abres tu celular y buscas la red de la cafetería.

* **La Configuración:** El hacker está sentado en la esquina tomando un café. Sacó un módem portátil de su mochila y le puso exactamente el mismo nombre: `Starbucks_Gratis`. Y le puso una señal de antena más potente que la del módem real del techo.

* **El Ataque (Evil Twin):** Los celulares están programados para conectarse automáticamente a las redes conocidas que tengan "mejor señal". Tu celular ignora el módem del techo y se conecta directamente a la mochila del hacker (El Gemelo Malvado).

* **Por qué esto importa:** El hacker te da internet real para que no sospeches, pero se convierte en un "Hombre en el Medio" (Man-In-The-Middle). A partir de ese momento, cada página que abres y cada mensaje que mandas, pasa primero por la computadora del hacker antes de ir al internet público.

**Herramientas para Evil Twin:**
- **Bettercap:** Framework de ataque MITM con módulo de Evil Twin integrado. `bettercap -eval "set wifi.ap.ssid Starbucks_Gratis; wifi.ap"`
- **WiFi Pumpkin:** Distribución Linux con interfaz gráfica para crear puntos de acceso falsos, capturar credenciales y servir páginas de phishing.
- **MANA Toolkit:** Suite para puntos de acceso malvados con capacidades de KARMA (responder a solicitudes de redes conocidas).

### Ataque KRACK (Key Reinstallation Attack)

CVE-2017-13077 a CVE-2017-13084. Afecta a WPA2.

**Cómo funciona:** Durante el handshake de 4 vías, el atacante bloquea el mensaje 3. El cliente, al no recibirlo, solicita la reinstalación de la clave. El atacante permite esta reinstalación, lo que causa que el nonce se reutilice. Al reutilizar el nonce, el cifrado se rompe y el atacante puede descifrar el tráfico.

**Defensa:** Parchear todos los clientes (Windows, iOS, Android, Linux) en diciembre de 2017. Dispositivos sin parche siguen siendo vulnerables.

### Ataque PMKID (WPA2/3)

Técnica descubierta en 2018 por atom (Hashcat). El atacante no necesita capturar un handshake completo. Basta con capturar un solo paquete **PMKID** (Pairwise Master Key Identifier) que algunos puntos de acceso envían durante la asociación.

**Ventaja para el atacante:** No requiere un cliente conectado. No requiere enviar tramas de deautenticación (que pueden alertar al usuario). Un solo paquete es suficiente para intentar descifrar la contraseña offline.

**Herramienta:** `hcxdumptool` + `hcxpcaptool` + `hashcat -m 16800`.

---

## 3. Herramientas del Atacante (Wi-Fi Auditing)

- **Aircrack-ng:** Suite de herramientas para auditoría Wi-Fi. Incluye `airodump-ng` (captura de paquetes), `aireplay-ng` (inyección), `aircrack-ng` (cracking), `airmon-ng` (modo monitor). Requiere una tarjeta Wi-Fi compatible con modo monitor (chipset Atheros, Ralink, Realtek).
- **Kismet:** Sniffer de red inalámbrica, detector de intrusiones. Puede detectar puntos de acceso ocultos, redes no autorizadas (rogue APs) y dispositivos Bluetooth.
- **Wifite:** Script automatizado que secuencia ataques: captura handshake, ataca WPS, intenta WEP, y más. Diseñado para pentesters que necesitan resultados rápidos.
- **Hashcat:** La herramienta de cracking de hashes más rápida. Soporta GPU (NVIDIA CUDA, AMD OpenCL). Para WPA2: `hashcat -m 2500 handshake.hccapx wordlist.txt`. Velocidad: > 2 millones de contraseñas por segundo en una GPU moderna.
- **Reaver / PixieWPS:** Herramientas para atacar WPS (Wi-Fi Protected Setup). Explotan el PIN de 8 dígitos de WPS, que puede ser forzado en 3-4 horas (brute force) o en segundos con PixieDust (vulnerabilidad en implementaciones de chipsets).

---

## 4. Defensas y Buenas Prácticas Corporativas

### Segmentación de Red Wi-Fi

- **SSID corporativo (WPA2-Enterprise / 802.1X):** Acceso a recursos internos. Autenticación con credenciales de Active Directory.
- **SSID invitados (Captive Portal):** Solo acceso a internet. Aislados de la red interna mediante VLAN separada y reglas de firewall.
- **SSID IoT:** Dispositivos no confiables (cámaras, sensores, impresoras). Aislados completamente.
- **SSID de administración:** Solo para administradores de red. Acceso a infraestructura crítica (switches, APs, controladoras).

### Protección de Tramas de Gestión (802.11w)

Estándar que cifra las tramas de gestión (deautenticación, asociación, beacon). Evita ataques de deautenticación y rogue APs básicos. Compatible con WPA2 y WPA3.

### Detección de Rogue APs

Un Rogue AP es un punto de acceso no autorizado conectado a la red corporativa. Puede ser un empleado que conectó un router doméstico para tener mejor señal, o un atacante que conectó un dispositivo para acceder a la red interna.

**Técnicas de detección:**
- **Wireless IDS/IPS:** Sistemas como AirDefense, Cisco WIPS o el módulo de detección de Rogue AP en controladoras Wi-Fi (Cisco, Aruba, Meraki).
- **Escaneo de espectro (Spectrum Analysis):** Detecta interferencias y dispositivos Wi-Fi no autorizados en el rango de frecuencia.
- **Monitoreo de switches:** Detectar tráfico DHCP no autorizado, MAC addresses desconocidas, o puertos de switch que se activan sin autorización.

### Deshabilitar Funciones Inseguras

- **WPS (Wi-Fi Protected Setup):** Deshabilitar. El PIN de 8 dígitos es forzable en horas.
- **SSID Broadcast (Ocultar SSID):** No proporciona seguridad real. Un atacante puede detectar redes ocultas con `airodump-ng` y el tráfico de probes de clientes revela el SSID.
- **WEP y TKIP:** Deshabilitar. Forzar CCMP/AES.

---

## 5. El Ángulo del Hacker

Un atacante evaluando una red Wi-Fi corporativa sigue este proceso:

1. **Reconocimiento pasivo:** Utiliza `airodump-ng wlan0mon` para listar todos los SSIDs, BSSIDs (MAC del AP), canales, cifrado y clientes conectados en el área. No transmite nada, solo escucha.

2. **Identificación del objetivo:** Busca la red corporativa. Anota los clientes conectados (MAC addresses de laptops corporativas, teléfonos ejecutivos).

3. **Captura de handshake:** Envía tramas de deautenticación a un cliente usando `aireplay-ng`. Captura el handshake resultante. Si WPS está habilitado, ejecuta `reaver` o `pixiewps`.

4. **Ataque offline:** Transfiere el handshake a su máquina con GPU. Ejecuta `hashcat` con la wordlist rockyou.txt (14 millones de contraseñas comunes). Si la contraseña es débil ("Empresa2024", "Admin123"), la obtiene en segundos.

5. **Acceso:** Se conecta a la red Wi-Fi. Desde allí, escanea la red interna (nmap 10.0.0.0/8), busca servidores vulnerables, intenta moverse lateralmente.

6. **Si falla (WPA3/Enterprise):** El atacante instala un Evil Twin (Bettercap o WiFi Pumpkin) con un captive portal que imita el portal de autenticación corporativo. Los usuarios ingresan sus credenciales, y el atacante las captura para acceder más tarde.

---

## 6. Criterio de Dominio (Autoevaluación)

Revisa si puedes mantener la cordura en el aire:

1. Un hacker estaciona su auto afuera de un edificio de oficinas corporativo e intenta robar las credenciales de red capturando el tráfico Wi-Fi en el aire (Sniffing). Sabiendo que la empresa usa el protocolo antiguo **WEP**, ¿Por qué el hacker tendrá éxito garantizado en un par de minutos, independientemente de lo larga que sea la contraseña?

2. Usando la analogía del "Megáfono", explica la diferencia de riesgo físico y de superficie de ataque entre conectar una computadora de Finanzas directamente por un Cable Ethernet versus conectarla a la red Wi-Fi de la empresa.

3. El ataque del "Gemelo Malvado" (Evil Twin) es devastador en aeropuertos y hoteles. Si la víctima ya cayó en la trampa y su celular está conectado a la mochila del hacker, ¿Por qué el uso exclusivo de páginas web con **HTTPS** (Cifrado en Tránsito) es la única defensa técnica que protegerá la contraseña del usuario de ser robada por el hacker?

4. El nuevo protocolo **WPA3** es el salvador moderno de las redes inalámbricas. ¿Cuál es el cambio arquitectónico principal (SAE) que hace WPA3 para volver obsoletos los ataques tradicionales de "fuerza bruta" (Dictionary Attacks) contra las contraseñas del Wi-Fi?

5. Durante un pentesting inalámbrico, el auditor descubre que un punto de acceso corporativo tiene **WPS** habilitado en una red WPA2. Explica por qué WPS reduce la seguridad de la red a un PIN de 8 dígitos que puede ser forzado en horas, sin importar la fortaleza de la contraseña WPA2.

6. Una empresa migra su red Wi-Fi corporativa de WPA2-Personal (contraseña compartida) a **WPA2-Enterprise con 802.1X**. Explica por qué esta migración mejora drásticamente la seguridad (cada usuario tiene credenciales únicas, revocación individual, autenticación mutua con EAP-TLS) y reduce el riesgo de que un atacante externo acceda a la red interna.
