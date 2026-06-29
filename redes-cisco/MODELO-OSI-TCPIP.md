---
title: "Modelo OSI y TCP/IP: El mapa mental que separa a los operadores de los ingenieros"
level: "inicial"
content_type: "guia"
updated: "2026-06-29"
---

# Modelo OSI y TCP/IP: El mapa mental que separa a los operadores de los ingenieros

## Objetivo de esta guía

Cuando algo falla en una red, la gente dice "se cayó internet". Esa frase no ayuda a nadie. Lo que necesitas es un método para aislar exactamente donde esta el problema. El modelo OSI es ese método.

No se estudia para pasar un examen. Se estudia para que, cuando un servidor deje de responder a las 3 de la mañana, puedas descartar capas una por una hasta encontrar la causa raíz. Es la diferencia entre reiniciar el router sin saber por qué, y decir "el problema esta en la capa de transporte, específicamente en el puerto 443, probablemente el firewall lo esta bloqueando".

En esta guía no solo vamos a recorrer las capas. Vamos a ver como falla cada una, como se ataca cada una, y como se diagnostica.

## Por qué existen los modelos de capas

Antes de que existiera el modelo OSI, cada fabricante de equipos de red hacia las cosas a su manera. IBM tenía su propia arquitectura, Digital Equipment tenía la suya, Novell tenía IPX/SPX. Ninguna era compatible con la otra. Conectar equipos de diferentes fabricantes era una pesadilla.

El modelo OSI fue creado por la Organización Internacional de Estandarizacion (ISO) en 1984 para que todos pudieran construir componentes que funcionaran juntos. Definió 7 capas, cada una con una responsabilidad clara. No importa si tu cable lo fábrica Cisco o TP-Link, mientras cumpla con la especificacion de capa 1, funcionara.

El modelo TCP/IP es la implementación práctica que se impuso. Tiene 4 capas que mapean a las 7 del OSI, pero con menos abstraccion y más enfoque en lo que realmente se usa en internet. Se desarrollo en paralelo por el Departamento de Defensa de EE.UU. y se convirtio en el estándar de facto porque era práctico y abierto.

## La encapsulación: el corazón del modelo

El concepto más importante de todo el modelo OSI no son las capas en si, sino la encapsulación. Es el proceso de tomar datos de una capa superior y envolverlos con información de la capa inferior.

Funciona así: la capa de aplicación genera datos. Digamos que son los bytes de una petición HTTP. La capa de transporte toma esos datos, les agrega un encabezado con el puerto de origen y destino, y crea un segmento. La capa de red toma ese segmento, le agrega un encabezado con las direcciones IP, y crea un paquete. La capa de enlace toma ese paquete, le agrega un encabezado con las direcciones MAC y un trailer con CRC, y crea una trama. La capa física convierte esa trama en pulsos eléctricos, luz o ondas de radio.

En el destino ocurre el proceso inverso: la desencapsulacion. Cada capa quita su encabezado correspondiente, verifica la información, y pasa los datos a la capa superior.

Lo importante aqui es que cada capa solo entiende su propio encabezado. La capa de red no sabe si los datos son HTTP o FTP. Solo sabe que tiene que llevarlos a una dirección IP. La capa de transporte no sabe cual es la dirección IP de destino. Solo sabe que tiene que entregar los datos al puerto correcto. Esta separación de responsabilidades es lo que hace que el modelo sea tan poderoso.

### Unidad de Datos por Capa

Cada capa llama a los datos de manera diferente:

- Capa 7, 6, 5: Datos (Data) o mensaje
- Capa 4: Segmento (TCP) o Datagrama (UDP)
- Capa 3: Paquete (Packet)
- Capa 2: Trama (Frame)
- Capa 1: Bits

## Las 7 capas del modelo OSI en detalle

Si entiendes eso, entiendes todo el modelo.

### Capa 1: Física

Es la única capa que trabaja con algo tangible. Cables, conectores, voltajes, frecuencias, intensidad de luz. Su trabajo es mover bits de un punto a otro. No sabe lo que significan esos bits. Solo los mueve.

En esta capa no hay direcciones. No hay protocolos complejos. Hay especificaciones técnicas: el pin 1 del conector RJ45 transmite, el pin 2 recibe, el voltaje de 0 a 0.4 voltios es un 0 binario, de 2.8 a 5 voltios es un 1 binario.

Estándares comunes:
- 10BASE-T: Ethernet a 10 Mbps sobre par trenzado
- 100BASE-TX: Fast Ethernet a 100 Mbps
- 1000BASE-T: Gigabit Ethernet a 1000 Mbps
- 10GBASE-T: 10 Gbps

Cada estándar define la codificación de señal, el tipo de cable, la distancia máxima, y el tipo de conector.

Cuando falla la capa 1, no hay mucho que investigar. O hay conexión o no la hay. Si el cable esta roto, el puerto danado, o la fuente de luz apagada, no hay datos que fluyan.

El problema con la capa 1 es que sus fallas son fáciles de diagnosticar pero fáciles de ignorar. La gente asume que "el cable esta bien" sin verificarlo. He visto técnicos pasar horas configurando direcciones IP cuando el problema era un cable mal crimpado.

Ataques de capa 1:
- Corte físico de cables de red o fibra
- Interferencia electromagneticas para degradar la señal
- Conexión física de dispositivos de escucha (network taps)
- Van Eck phreaking: capturar la radiacion electromagnetica de un cable o pantalla para reconstruir los datos

### Capa 2: Enlace de datos

Esta capa organiza los bits en tramas. Añade direcciones MAC, detección de errores mediante CRC (Cyclic Redundancy Check), y control de acceso al medio.

La capa 2 es la primera que tiene inteligencia. Los switches operan aqui. Pero su inteligencia es limitada: solo sabe de direcciones MAC locales. No tiene idea de la topologia de la red más allá de sus puertos.

Subcapas de la capa 2:

- LLC (Logical Link Control): multiplexa protocolos de capa superior. Identifica que protocolo (IP, IPX, AppleTalk) esta encapsulado en la trama.
- MAC (Media Access Control): controla el acceso al medio físico, direccionamiento físico, y detección de errores.

Protocolos de capa 2:
- Ethernet (IEEE 802.3)
- Wi-Fi (IEEE 802.11)
- PPP (Point-to-Point Protocol)
- Frame Relay (WAN, obsoleto)
- ATM (Asynchronous Transfer Mode, obsoleto)

La trama Ethernet tiene esta estructura:

```
| Preambulo (7 bytes) | SFD (1) | MAC Destino (6) | MAC Origen (6) | Tipo (2) | Datos (46-1500) | FCS (4) |
```

- Preambulo: 10101010 repetido 7 veces. Sincroniza los relojes.
- SFD (Start Frame Delimiter): 10101011. Marca el inicio de la trama.
- MAC destino y origen: 6 bytes cada una.
- Tipo (EtherType): identifica el protocolo encapsulado. 0x0800 para IPv4, 0x86DD para IPv6, 0x0806 para ARP.
- Datos: entre 46 y 1500 bytes. Si son menos de 46, se añade padding.
- FCS: CRC de 32 bits para detección de errores.

Las fallas en capa 2 incluyen:
- Colisiones (en redes con hubs o half-duplex)
- Tormentas de broadcast por bucles
- Tablas MAC corruptas o llenas
- Errores de CRC por cables danados
- Duplex mismatch

Ataques de capa 2:
- ARP spoofing: envenenar la tabla ARP
- MAC flooding: llenar la tabla MAC del switch
- VLAN hopping: saltar entre VLANs
- STP manipulation: cambiar la topologia STP
- MAC spoofing: falsificar la dirección MAC

### Capa 3: Red

Aqui es donde ocurre el enrutamiento. La capa 3 usa direcciones lógicas (IP) para determinar como llegar de una red a otra. Los routers operan aqui.

La capa 3 fragmenta paquetes si son demasiado grandes para la capa 2 subyacente. Decide la mejor ruta basándose en métricas como el número de saltos, el ancho de banda disponible, o el costo administrativo.

El encabezado IPv4 tiene 20 bytes (mínimo) y contiene:

```
| Version (4 bits) | IHL (4) | DSCP (6) | ECN (2) | Longitud Total (16) |
| Identificacion (16) | Flags (3) | Fragment Offset (13) |
| TTL (8) | Protocolo (8) | Checksum (16) |
| IP Origen (32) |
| IP Destino (32) |
| Opciones (variable) |
```

- Versión: 4 para IPv4, 6 para IPv6.
- IHL (Internet Header Length): longitud del encabezado en palabras de 32 bits.
- DSCP/ECN: calidad de servicio y notificación explicita de congestion.
- Longitud Total: tamaño total del paquete incluyendo encabezado.
- Identificación, Flags, Fragment Offset: para fragmentacion y reensamblaje.
- TTL (Time To Live): decrementa en cada salto. Cuando llega a 0, el paquete se descarta.
- Protocolo: identifica el protocolo de capa superior (1=ICMP, 6=TCP, 17=UDP).
- Checksum: verifica la integridad del encabezado (no de los datos).
- IP origen y destino: 32 bits cada una.

Protocolos de capa 3:
- IPv4, IPv6
- ICMP (ping, traceroute, mensajes de error)
- ARP (resuelve IP a MAC)
- OSPF, EIGRP, BGP (protocolos de enrutamiento)
- IPsec (seguridad IP)

El mayor riesgo de seguridad en capa 3 es la suplantación de IP. Un atacante puede enviar paquetes con una dirección IP de origen falsa, haciéndose pasar por otro dispositivo. Esto es posible porque el protocolo IP no verifica automáticamente la autenticidad del origen.

### Capa 4: Transporte

Esta capa es la responsable de la confiabilidad de la comunicación. Aqui operan TCP y UDP, dos protocolos con filosofías opuestas.

#### TCP (Transmission Control Protocol)

TCP es orientado a conexión. Antes de enviar datos, establece una conexión mediante el triple handshake: SYN, SYN-ACK, ACK. Durante la transmision, cada segmento recibido es confirmado. Si un segmento se pierde, se retransmite. Los segmentos llegan en orden.

El encabezado TCP tiene 20 bytes (mínimo):

```
| Puerto Origen (16) | Puerto Destino (16) |
| Numero de Secuencia (32) |
| Numero de Acuse de Recibo (32) |
| Offset (4) | Reservado (3) | Flags (9) | Ventana (16) |
| Checksum (16) | Urgent Pointer (16) |
| Opciones (variable) |
```

Flags TCP importantes:
- SYN: sincronizar, iniciar conexión
- ACK: acuse de recibo
- FIN: finalizar conexión
- RST: resetear conexión
- PSH: empujar datos a la aplicación sin buffering
- URG: datos urgentes

La ventana TCP (TCP Window) controla cuántos bytes puede enviar el emisor antes de recibir un ACK. El tamaño de la ventana es negociado durante el handshake.

El control de congestion de TCP usa algoritmos como Slow Start, Congestion Avoidance, Fast Retransmit y Fast Recovery. Cuando se pierde un paquete, TCP asume que hay congestion y reduce la velocidad de transmision.

#### UDP (User Datagram Protocol)

UDP es tan simple que su encabezado tiene solo 4 campos: puerto origen (16), puerto destino (16), longitud (16), checksum (16). Eso es todo. 8 bytes de encabezado contra 20 de TCP.

UDP no verifica que los datos lleguen. No reordena los segmentos. No controla la congestion. Simplemente entrega los datos a la capa de aplicación tal como llegaron.

Esto hace a UDP ideal para aplicaciones donde la velocidad importa más que la confiabilidad: videollamadas, streaming, juegos, DNS, DHCP, NTP.

#### Puertos

Los puertos son números de 16 bits que identifican la aplicación o servicio. Se dividen en:

- Puertos bien conocidos (0-1023): HTTP (80), HTTPS (443), SSH (22), FTP (21), DNS (53), DHCP (67/68).
- Puertos registrados (1024-49151): usados por aplicaciones de usuario.
- Puertos efimeros (49152-65535): usados como puertos origen por los clientes.

### Capa 5: Sesión

Esta capa establece, mantiene y termina sesiones entre aplicaciones. Coordina quien habla, por cuanto tiempo, y que hacer si la comunicación se interrumpe.

Ejemplos reales:
- Cuando descargas un archivo grande y se corta la conexión, la capa de sesión permite reanudar la descarga desde donde se quedó.
- En una videollamada, la capa de sesión sincroniza los flujos de audio y video.

En la práctica, la capa de sesión rara vez se implementa por separado. La mayoría de las aplicaciones manejan la sesión internamente. Protocolos como NetBIOS y RPC operan en esta capa.

### Capa 6: Presentación

Traduce los datos del formato de la aplicación a un formato común de red. Comprime datos para ahorrar ancho de banda. Cifra datos para proteger la confidencialidad.

Cuando visitas un sitio HTTPS, la capa de presentación maneja el cifrado TLS/SSL. Convierte tus datos en texto cifrado que solo el servidor destino puede descifrar.

Funciones:
- Traducción de códigos de caracteres (ASCII a EBCDIC)
- Compresion (para reducir el tamaño de los datos)
- Cifrado (TLS, SSL)

El ataque a esta capa es el downgrade attack: forzar a la aplicación a usar una versión anterior y menos segura del cifrado. POODLE y FREAK fueron ataques de downgrade contra SSL/TLS.

### Capa 7: Aplicación

No es la aplicación que usas. Es el protocolo que la aplicación usa para comunicarse. HTTP, FTP, SMTP, DNS, SSH son protocolos de capa 7.

Cada protocolo tiene su propia sintaxis y reglas. HTTP usa métodos GET, POST, PUT. SMTP usa comandos como HELO, MAIL FROM, RCPT TO.

La mayoría de los ataques web ocurren en esta capa:
- SQL Injection: inyectar comandos SQL a través de formularios
- XSS (Cross-Site Scripting): inyectar scripts en páginas web
- CSRF (Cross-Site Request Forgery): forzar a un usuario a ejecutar acciones no deseadas
- Session hijacking: robar la sesión de un usuario

## Herramientas de diagnóstico por capa

Cada capa tiene sus propias herramientas de diagnóstico. Conocerlas te permite aislar problemas rápidamente.

### Capa 1

- Inspeccion visual: el cable esta conectado? Hay luces en el switch?
- Cable tester: verifica continuidad y mapeo de pines
- Certificador de cable: verifica que el cable cumple con el estándar (Cat5e, Cat6)
- Verificar duplex y velocidad en la interfaz del switch

### Capa 2

- `show mac address-table` (Cisco): muestra la tabla MAC del switch
- `show interfaces` (Cisco): muestra estado, errores CRC, colisiones
- `arp -a`: muestra la tabla ARP del host
- Verificar que la MAC del gateway esta presente en la tabla ARP

### Capa 3

- `ping`: verifica conectividad IP básica
- `traceroute`: muestra la ruta de los paquetes
- `ipconfig` / `ip addr`: verifica la configuración IP
- `show ip route` (Cisco): muestra la tabla de enrutamiento
- `show ip arp` (Cisco): muestra la tabla ARP del router

### Capa 4

- `netstat -an`: muestra conexiones activas y puertos en escucha
- `telnet host puerto` o `nc -zv host puerto`: prueba si un puerto esta abierto
- `ss -tuln` (Linux): muestra puertos en escucha
- `show ip sockets` (Cisco): muestra conexiones TCP del router

### Capa 5-7

- `curl -v https://host`: muestra la respuesta HTTP y los detalles del SSL
- `openssl s_client -connect host:443`: muestra el certificado SSL
- `nslookup` / `dig`: verifica resolución DNS
- Navegador web: la herramienta de desarrollador (F12) muestra peticiones HTTP y errores

## El MTU y la fragmentacion

MTU (Maximum Transmission Unit) es el tamaño máximo de un paquete IP que puede transmitirse sin fragmentar. En Ethernet, el MTU típico es 1500 bytes.

Cuando un paquete es más grande que el MTU de un enlace, la capa 3 lo fragmenta en partes más pequeñas.

**Fragmentacion:**
1. El emisor divide el paquete en fragmentos.
2. Cada fragmento tiene un encabezado IP con:
   - El mismo ID de identificación
   - Un offset que indica la posición del fragmento en el paquete original
   - El flag MF (More Fragments) activado en todos menos el último
3. El destino reensambla los fragmentos usando el ID y el offset.

**Problemas de fragmentacion:**
- Mayor carga de procesamiento en el router y el destino
- Si un fragmento se pierde, todo el paquete original debe retransmitirse
- Los firewalls pueden no inspeccionar correctamente los fragmentos
- Ataques de fragmentacion pueden evadir sistemas de detección

Path MTU Discovery (PMTUD) permite descubrir el MTU mínimo en el camino hacia el destino. Envía paquetes con el flag DF (Don't Fragment) activado. Si un router necesita fragmentar y DF esta activado, descarta el paquete y envía un ICMP Fragmentation Needed. Así se descubre el MTU del camino.

## TCP en profundidad: estados del handshake y flags

### Estados de una conexión TCP

Cuando examinas conexiones con `netstat`, ves estados como:

- LISTEN: el servidor esta esperando conexiones entrantes
- SYN_SENT: el cliente envio SYN, esperando SYN-ACK
- SYN_RECV: el servidor recibio SYN, envio SYN-ACK, esperando ACK
- ESTABLISHED: la conexión esta activa, datos fluyen
- FIN_WAIT_1: el socket cerró la conexión, envio FIN
- FIN_WAIT_2: el socket recibio ACK de su FIN, esperando FIN del otro lado
- CLOSE_WAIT: el socket recibio FIN, envio ACK, esperando que la aplicación cierre
- TIME_WAIT: el socket envio ACK final, esperando que paquetes tardios se descarten
- CLOSED: la conexión terminó

### Flags TCP

- SYN (Synchronize): inicia una conexión
- ACK (Acknowledgment): confirma recepción de datos
- FIN (Finish): finaliza una conexión
- RST (Reset): resetea una conexión abruptamente
- PSH (Push): envía datos inmediatamente sin buffering
- URG (Urgent): datos urgentes

### Control de flujo TCP

TCP usa una ventana deslizante (sliding window) para controlar cuántos datos puede enviar el emisor antes de recibir un ACK.

El tamaño de la ventana se negocia durante el handshake. El receptor anuncia su ventana disponible (receive window) en cada segmento ACK.

Si el receptor esta lento (no puede procesar datos tan rápido como llegan), reduce la ventana. El emisor debe reducir su velocidad de envio. Esto es control de flujo.

### Control de congestion TCP

TCP también controla la congestion de la red, no solo la capacidad del receptor.

Algoritmos de control de congestion:
- Slow Start: comienza con una ventana pequeña (típicamente 1-10 segmentos) y la duplica en cada RTT hasta alcanzar el umbral.
- Congestion Avoidance: incremento lineal (1 segmento por RTT) en lugar de exponencial.
- Fast Retransmit: si recibe 3 ACKs duplicados, retransmite el segmento perdido sin esperar el timeout.
- Fast Recovery: después de fast retransmit, reduce la ventana pero no vuelve a slow start.

### Ventana de congestion (cwnd) vs Ventana de recepción (rwnd)

La ventana efectiva es min(cwnd, rwnd). El emisor no puede enviar más allá del mínimo de las dos.

## TCP vs UDP: tabla comparativa extendida

| Característica | TCP | UDP |
|---------------|-----|-----|
| Conexión | Orientado a conexión | Sin conexión |
| Confiabilidad | Confiable (ACK, retransmision) | No confiable (sin ACK) |
| Orden | Ordenado (secuencias) | No ordenado |
| Control de flujo | Si (ventana deslizante) | No |
| Control de congestion | Si (Slow Start, AIMD) | No |
| Checksum | Obligatorio | Opcional (en IPv4) |
| Encabezado | 20-60 bytes | 8 bytes |
| Velocidad | Más lento | Más rápido |
| Uso típico | HTTP, SSH, FTP, SMTP | DNS, DHCP, VoIP, streaming |

## Comparación detallada entre OSI y TCP/IP

| Característica | OSI (7 capas) | TCP/IP (4 capas) |
|---------------|--------------|------------------|
| Desarrollado por | ISO | DARPA (DoD) |
| Anio | 1984 | 1970s |
| Capas | 7 | 4 |
| Enfoque | Conceptual | Práctico |
| Protocolos | Define capas | Define protocolos |
| Uso real | Modelo de referencia | Implementación real |

La capa de Acceso a Red del TCP/IP es prácticamente una caja negra. El modelo no específica como funciona; asume que existe una tecnología subyacente que entrega paquetes IP.

Esto resulto ser un diseño acertado porque permitió que IP funcionara sobre cualquier tecnología de red: Ethernet, Wi-Fi, PPPoE, ATM, Frame Relay, incluso sobre palomas mensajeras (literalmente, hubo un experimento llamado IP over Avian Carriers).

## Como se relacionan las capas en un ataque

Cada capa tiene vulnerabilidades inherentes y técnicas de ataque asociadas.

### Ataques por capa

**Capa 1:**
- Corte de cables submarinos (ataques físicos a infraestructura)
- Interferencia de radiofrecuencia para bloquear Wi-Fi (jamming)
- Network tap para interceptar tráfico
- Van Eck phreaking

**Capa 2:**
- ARP spoofing: envenenar la tabla ARP para interceptar tráfico
- MAC flooding: llenar la tabla MAC del switch para forzarlo a modo hub
- VLAN hopping: saltar entre VLANs usando etiquetas falsas
- STP manipulation: redirigir tráfico alterando la topologia STP

**Capa 3:**
- IP spoofing: falsificar la IP de origen
- ICMP flood: inundar con paquetes ping (Smurf attack)
- Route poisoning: corromper tablas de enrutamiento mediante protocolos de enrutamiento
- Fragmentacion: enviar fragmentos de paquete maliciosos que evaden firewalls

**Capa 4:**
- SYN flood: enviar SYN sin completar el handshake, agotando recursos del servidor
- Port scanning: escanear puertos para descubrir servicios
- Session hijacking: secuestrar sesiones TCP activas
- UDP flood: inundar con paquetes UDP aleatorios

**Capa 5:**
- Session fixation: forzar a una víctima a usar un ID de sesión conocido
- RPC attacks: explotar vulnerabilidades en llamadas a procedimientos remotos

**Capa 6:**
- Downgrade attacks: forzar el uso de cifrado débil
- POODLE, FREAK, Logjam: ataques contra SSL/TLS
- Certificate spoofing: usar certificados falsos

**Capa 7:**
- SQL injection
- XSS (Cross-Site Scripting)
- CSRF (Cross-Site Request Forgery)
- DNS spoofing
- HTTP smuggling
- Command injection

### La cadena de ataque a través de las capas

Un ataque real rara vez se limita a una sola capa. Ejemplo de un ataque completo:

1. El atacante realiza reconocimiento con port scanning (capa 4)
2. Descubre un servidor web con una versión vulnerable (capa 7)
3. Usa SQL injection para obtener credenciales (capa 7)
4. Usa las credenciales para acceder via SSH (capa 5-7)
5. Una vez dentro, realiza ARP spoofing para interceptar tráfico local (capa 2)
6. Captura tráfico de otros usuarios (capa 3-4)

## Diagnóstico por capas

Cuando algo falla, sigo este orden de verificación:

1. Capa 1: el cable esta conectado? Hay luz en el switch? El Wi-Fi esta activo?
2. Capa 2: la computadora tiene una dirección MAC? El switch la reconoce? `arp -a` muestra la MAC del gateway?
3. Capa 3: puedo hacer ping a la puerta de enlace? `ipconfig` o `ip addr` muestra una IP valida? Puedo hacer ping a 8.8.8.8?
4. Capa 4: el puerto esta abierto? `telnet servidor 443` o `nc -zv servidor 443`? `netstat -an` muestra conexiones establecidas?
5. Capa 5-7: el servicio responde? El certificado SSL es válido? `curl -v https://servidor` muestra la respuesta correcta?

Cada paso elimina un conjunto de posibles causas.

### Ejemplos de diagnóstico

**Caso 1:** Un usuario dice "no tengo internet".

1. Verifico cable conectado y luces en el switch. OK.
2. `ipconfig` muestra una IP 169.254.x.x. Eso es una Automatic Private IP Addressing (APIPA). Significa que DHCP fallo. No recibio una IP valida.
3. Causa probable: servidor DHCP caído o pool agotado. Diagnóstico: verifico el servidor DHCP en la red.

**Caso 2:** Un usuario dice "la página web no carga".

1. Ping a 8.8.8.8 funciona.
2. Ping a google.com falla (nombre no resuelve).
3. Causa probable: DNS fallando. `nslookup google.com` muestra que no hay respuesta.
4. Causa raíz: el servidor DNS configurado esta caído.

**Caso 3:** Un usuario dice "la página web da error de certificado".

1. Ping a google.com funciona.
2. La página carga pero dice "Tu conexión no es privada".
3. Causa probable: certificado SSL caducado o invalido.
4. `openssl s_client -connect servidor:443` muestra los detalles del certificado.

## Casos reales

### El ataque SYN flood que tumbo un servidor bancario

Un servidor web de un banco recibio 50,000 paquetes SYN por segundo desde direcciones IP falsas. Cada SYN hacia que el servidor reservara memoria para la conexión y esperara el ACK que nunca llegaba. En minutos, la tabla de conexiones se lleno, usando toda la memoria disponible. El servidor dejó de aceptar conexiones legítimas.

El diagnóstico fue claro en capa 4: `netstat -n | grep SYN_RECV` mostraba miles de conexiones en estado SYN_RECV. La utilizacion de CPU y memoria del servidor estaba al máximo.

Mitigación: SYN cookies. En lugar de reservar memoria cuando recibe un SYN, el servidor crea un cookie (un valor calculado desde las IPs y puertos) y lo envía como el número de secuencia del SYN-ACK. Cuando recibe el ACK final, verifica el cookie y solo entonces reserva memoria. Esto permite manejar ataques SYN sin agotar recursos.

### El ataque de fragmentacion que evadio el firewall

Un atacante descubrió que el firewall de una empresa solo inspeccionaba el primer fragmento de los paquetes fragmentados. Enviaba un primer fragmento que parecia inofensivo (destino a un puerto permitido) y el resto de fragmentos contenian la carga maliciosa. El firewall permitia el paso sin inspeccionar los fragmentos subsiguientes.

El ataque ocurrió en capa 3 (fragmentacion IP). El firewall no reensamblaba los paquetes antes de inspeccionarlos, lo que permitió que el tráfico malicioso pasará desapercibido.

### El ataque SSL stripping

Un atacante en una red Wi-Fi pública interceptaba las peticiones HTTP y las convertia a HTTP, eliminando la capa de cifrado. El usuario creia que estaba en HTTPS porque había escrito https:// en el navegador, pero el atacante había interceptado la redirección.

El ataque ocurrió en la capa de presentación (capa 6): el atacante degradaba la conexión de HTTPS a HTTP. La mitigación es HSTS (HTTP Strict Transport Security), que obliga al navegador a usar siempre HTTPS para un dominio específico.

## Autoevaluación

1. Una empresa reporta que sus empleados pueden enviar y recibir correos electrónicos (SMTP, puerto 25) pero no pueden navegar por páginas web (HTTP, puerto 80). En que capa o capas esta el problema y como lo diagnosticarias paso a paso?

2. Explica el proceso de encapsulación desde la capa 7 hasta la capa 1 cuando envías una petición HTTPS a un servidor web. Que información se añade en cada capa?

3. Si un atacante realiza un SYN flood contra un servidor, que capa del modelo OSI esta siendo atacada, cual es el mecanismo exacto del ataque, y como mitiga SYN cookies el problema?

4. Cual es la diferencia fundamental entre TCP y UDP en términos de como manejan la pérdida de paquetes? Da dos ejemplos de aplicaciones donde UDP sea preferible a TCP y explica por qué.

5. Un administrador recibe una alerta de que la tabla MAC de un switch esta llena al 100%. En que capa del modelo se clasifica este ataque, como funciona exactamente, y que impacto tiene en la red?

6. Cuando visitas un sitio HTTPS, en que capas ocurren el cifrado y el descifrado de los datos? Por qué el certificado SSL es necesario y que capa verifica su validez?

7. Un paquete viaja desde tu computadora hasta un servidor web en otro continente. En cada salto entre routers, la dirección MAC cambia pero la IP no. Explica este proceso en términos de las capas 2 y 3 del modelo OSI.

8. Si un atacante realiza un ataque de DNS spoofing y redirige a los usuarios a un sitio falso, en que capa del modelo OSI esta ocurriendo el ataque? Como se relaciona con las capas inferiores para que el usuario nunca note la redirección?

9. Un técnico dice "el problema es de capa 8". Sabiendo que el modelo OSI tiene 7 capas, que cree que significa "capa 8" y por qué se usa esta expresión?

10. Explica la diferencia entre un firewall stateful y uno stateless en términos de las capas del modelo OSI que cada uno inspecciona.
