---
title: "Fundamentos de Redes: Lo que nadie te explica sobre como viajan los datos"
---

# Fundamentos de Redes: Lo que nadie te explica sobre como viajan los datos

## Objetivo de esta guía

Cuando empece en ciberseguridad, mi mayor problema era que no entendia como viajaban realmente los datos. Sabia que había "paquetes" y "cables", pero no tenía una imagen mental clara del recorrido. Eso es peligroso, porque si no entiendes el camino, no puedes defenderlo ni detectar cuando alguien lo esta interceptando.

Esta guía no es un listado de definiciones. Es el mapa mental que me hubiera gustado tener cuando empece. Vamos a construir desde cero como se mueve la información desde tu computadora hasta un servidor al otro lado del mundo, que puede fallar en el camino, y como un atacante aprovecha cada etapa.

## La analogía del sistema l ampliada

Cuando alguien me pregunta como funciona internet, le digo: imagina que vives en una ciudad y quieres enviar una carta a alguien en otro país.

Tienes un mensaje. Lo pones en un sobre con el nombre del destinatario. Eso es la capa de aplicación: el contenido que quieres comunicar. Luego tomas ese sobre y lo pones dentro de otro sobre más grande, donde escribes el nombre de la calle y el número de la casa. Eso es la capa de red: la dirección IP que le dice al sistema a donde va. Luego pones ese sobre dentro de otro donde escribes el codigo l, que ayuda a clasificar el envio en la central de correos. Eso es la máscara de subred. Finalmente, le pones una estampilla que dice "certificado" o "normal". Eso es la capa de transporte: TCP si quieres confirmación de entrega, UDP si te da igual.

El cartero local (el switch) lo lleva a la oficina de correos de tu barrio. Ahí, el router mira el destino y decide si mandarlo por avión, por barco o por camión. Cada decisión que toma el router es un salto. El paquete viaja de router en router hasta que llega a la oficina de correos del barrio destino, donde otro cartero (otro switch) lo entrega a la casa correcta.

Cuando la carta llega, el destinatario abre los sobres en orden inverso: primero quita la estampilla (capa de transporte), luego verifica la dirección (capa de red), y finalmente lee el mensaje (capa de aplicación).

Eso es todo. Internet no es magia. Es una cadena de sobres dentro de sobres, cada uno con una funcion específica, viajando a través de una red de carteros y oficinas de correos.

## El viaje completo de un dato desde la aplicación hasta el cable

Voy a explicar el recorrido completo desde que abres una pagina web hasta que el contenido aparece en tu pantalla. No importa si usas Windows, macOS o Linux, el proceso es conceptualmente el mismo.

Tu navegador (Firefox, Chrome, Safari) necesita cargar https://ejemplo.com. Lo primero que hace es preguntar al sistema operativo: "resuelve este nombre a una dirección IP". El sistema operativo revisa su caché local. Si no la tiene, pregunta al servidor DNS configurado. El servidor DNS responde con una dirección IP, digamos 93.184.216.34.

Ahora el navegador sabe a donde enviar la petición. Le dice al sistema operativo: "abre una conexion TCP hacia 93.184.216.34, puerto 443". El sistema operativo empieza el triple handshake de TCP. Envía un paquete SYN. Espera un SYN-ACK. Responde con un ACK. La conexion esta establecida.

Luego, el navegador construye una petición HTTP cifrada con TLS. Esa petición viaja hacia abajo en la pila de protocolos. La capa de transporte la divide en segmentos. La capa de red la envuelve en paquetes IP. La capa de enlace la envuelve en tramas Ethernet.

Cada una de esas tramas es un conjunto de bytes que viaja por el cable. El primer dispositivo que las recibe es el switch de tu casa u oficina.

El switch mira la dirección MAC de destino. Si no la conoce, inunda la trama por todos los puertos menos el de origen. Si la conoce, la reenvia solo por el puerto correspondiente. En este caso, la MAC de destino es la de tu router, así que el switch la reenvia al puerto donde esta conectado el router.

El router recibe la trama, la desencapsula hasta el nivel IP, mira la dirección IP de destino, consulta su tabla de enrutamiento, y decide por cual interfaz reenviarla. Cambia la dirección MAC de origen por la suya y la de destino por la del siguiente router. Vuelve a encapsular y la envía.

Este proceso se repite en cada router. Cada uno decide el siguiente salto basado en su tabla de enrutamiento. Los protocolos de enrutamiento como OSPF, EIGRP o BGP construyen esas tablas intercambiando información entre routers.

Eventualmente, el paquete llega al router del servidor destino. Ese router lo reenvia al switch del servidor. El switch lo entrega al servidor. El servidor desencapsula capa por capa hasta llegar a la aplicación web, que procesa la petición y envía la respuesta.

La respuesta hace el camino inverso, pasando por los mismos routers (o por otros diferentes, porque internet es asimétrico).

## Los dispositivos de red en profundidad

no todos los dispositivos son iguales. Algunos solo repiten, otros aprenden, otros deciden. Vamos a ver la diferencia porque define como se diseña una red.

### Hub (el repetidor)

El hub es el dispositivo más simple y obsoleto. Cuando recibe una señal por un puerto, la replica por todos los demás puertos. No hay inteligencia. No hay aislamiento. Todos los dispositivos conectados a un hub comparten el mismo ancho de banda y ven todo el tráfico.

Los hubs apenas se usan hoy, pero entenderlos ayuda a entender por que los switches fueron una revolucion.

### Bridge (el puente)

Un bridge conecta dos segmentos de red. Aprende que MACs están a cada lado y solo reenvia tráfico entre segmentos cuando es necesario. Reduce el dominio de colision. Los bridges fueron reemplazados por switches, que son esencialmente bridges multipuerto.

### Switch

El switch es un bridge con muchos puertos. Cada puerto es un dominio de colision independiente. Esto significa que dos dispositivos en el mismo switch pueden transmitir simultáneamente sin interferir entre si.

El switch opera en capa 2. No entiende de IPs. Solo entiende de MACs. Su inteligencia se limita a: aprender MACs, buscar MACs en su tabla, reenviar solo cuando es necesario.

### Router

El router opera en capa 3. Conecta diferentes redes. Toma decisiones basadas en direcciones IP. Mantiene tablas de enrutamiento. Puede filtrar tráfico con ACLs. Participa en protocolos de enrutamiento.

### Firewall

El firewall opera típicamente en capa 3 y 4, aunque los modernos llegan a capa 7. Inspecciona el tráfico y decide si permitirlo o bloquearlo basándose en reglas. Puede mantener estado de las conexiones (stateful firewall).

### Load Balancer

Distribuye el tráfico entre múltiples servidores. Opera en capa 4 o 7. Puede terminar conexiones TLS, inspeccionar contenido HTTP, y tomar decisiones de enrutamiento basadas en el contenido de la petición.

## Los medios físicos en detalle

### Cable de cobre UTP

El cable UTP (Unshielded Twisted Pair) es el estándar en redes locales. Consiste en 4 pares de cables trenzados dentro de una cubierta protectora. El trenzado reduce la interferencia electromagnetica.

Los pares tienen colores: naranja/blanco-naranja, verde/blanco-verde, azul/blanco-azul, marron/blanco-marron.

Existen dos estándares de crimpado: T568A y T568B. La diferencia es que los pares naranja y verde están intercambiados. Ambos funcionan igual, pero debes usar el mismo en toda tu instalacion.

Pinout T568B (el más común):
- Pin 1: Blanco-Naranja
- Pin 2: Naranja
- Pin 3: Blanco-Verde
- Pin 4: Azul
- Pin 5: Blanco-Azul
- Pin 6: Verde
- Pin 7: Blanco-Marron
- Pin 8: Marron

Solo los pines 1, 2, 3 y 6 se usan para datos en 10/100 Mbps. Los 8 se usan para Gigabit Ethernet.

Tipos de cable según conexion:
- Cable directo: ambos extremos con el mismo estándar. Conecta dispositivos diferentes (PC a switch).
- Cable cruzado: un extremo T568A y el otro T568B. Conecta dispositivos iguales (PC a PC, switch a switch).
- Cable rollover: los pines están invertidos. Se usa para consola de gestión.

Los cables tienen categorías que determinan su velocidad máxima:
- Cat5: 100 Mbps, 100 MHz
- Cat5e: 1000 Mbps, 100 MHz
- Cat6: 1000 Mbps (hasta 10 Gbps a 55m), 250 MHz
- Cat6a: 10 Gbps, 500 MHz
- Cat7: 10 Gbps, 600 MHz (blindado)
- Cat8: 25-40 Gbps, 2000 MHz (data centers)

La distancia máxima de un segmento de cobre es 100 metros. Más allá, la señal se degrada y necesitas repetidores o switches intermedios.

### Fibra óptica

La fibra óptica usa luz para transmitir datos. No es susceptible a interferencias electromagneticas. Las distancias son mucho mayores: kilómetros en lugar de metros.

Tipos de fibra:
- Monomodo: núcleo muy fino (9 micras). Una sola trayectoria de luz. Larga distancia (hasta 100 km). Laser como fuente de luz. Cara.
- Multimodo: núcleo más grueso (50 o 62.5 micras). Varias trayectorias de luz. Distancia media (hasta 2 km). LED como fuente de luz. Más barata.

La fibra se termina en conectores. Los más comunes son LC, SC, ST, FC. LC es el estándar moderno en data centers.

El riesgo de seguridad de la fibra es menor que el del cobre porque es más difícil de interceptar sin ser detectado. Pero no es imposible. Las técnicas de "tap" en fibra existen, pero requieren equipos costosos y acceso físico.

### Wi-Fi

Wi-Fi es un conjunto de estándares IEEE 802.11. Opera en dos bandas principales: 2.4 GHz (802.11b/g/n/ax) y 5 GHz (802.11a/n/ac/ax). La banda de 6 GHz es para Wi-Fi 6E.

La de 2.4 GHz tiene 14 canales (11 utilizables en USA, 13 en Europa). Los canales se superponen. Solo los canales 1, 6 y 11 no se superponen. Si pones dos redes en canales que se superponen, interfieren entre si.

La de 5 GHz tiene muchos más canales que no se superponen. Pero la señal se atenua más con paredes y obstaculos.

Mecanismos de seguridad Wi-Fi:
- WEP: roto desde 2001. No se debe usar.
- WPA: mejoro WEP pero sigue siendo vulnerable.
- WPA2: usa AES. Vulnerable a KRACK (Key Reinstallation Attack).
- WPA3: usa SAE (Simultaneous Authentication of Equals). Reemplaza el pre-shared key por un handshake más seguro.

El mejor cifrado no protege contra un atacante que ya esta conectado a la red. Si compartes la contrasena Wi-Fi, cualquier persona en la red puede intentar ataques contra otros dispositivos.

### Ethernet: el protocolo que lo une todo

Ethernet es el protocolo de capa 2 más usado. Define como se estructuran las tramas y como los dispositivos acceden al medio.

La trama Ethernet tiene esta estructura:
- Preambulo: 7 bytes de sincronizacion
- SFD (Start Frame Delimiter): 1 byte
- MAC destino: 6 bytes
- MAC origen: 6 bytes
- Tipo/Longitud: 2 bytes (si es >= 1536 indica el protocolo encapsulado, si es menor indica longitud)
- Datos: 46-1500 bytes
- FCS (Frame Check Sequence): 4 bytes (CRC)

El tamaño mínimo de la trama es 64 bytes (incluyendo las MACs, Tipo y FCS). Si los datos son menores de 46 bytes, se anaden bytes de relleno.

El tamaño máximo es 1518 bytes (o 1522 con etiqueta VLAN 802.1Q).

Si la trama es más grande que el MTU (Maximum Transmission Unit) de un enlace, el paquete IP se fragmenta en tramas más pequeñas.

## CSMA/CD y CSMA/CA

Ethernet clásico usaba CSMA/CD (Carrier Sense Multiple Access with Collision Detection). Los dispositivos escuchaban si el medio estaba libre antes de transmitir. Si dos transmitian al mismo tiempo, detectaban la colision y esperaban un tiempo aleatorio antes de reintentar.

Los switches eliminaron las colisiones porque cada puerto es un dominio de colision independiente. Hoy el fullduplex es la norma, y CSMA/CD solo es relevante en modo half-duplex o con hubs.

Wi-Fi usa CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance). No puede detectar colisiones (porque no puede escuchar mientras transmite), así que las evita activamente. Los dispositivos esperan un tiempo aleatorio antes de transmitir y usan RTS/CTS (Request to Send/Clear to Send) para reservar el medio.

## El ángulo del atacante: reconocimiento de red

Cuando un atacante logra acceso a una red, su primer objetivo no es robar datos. Es entender el terreno. Necesita saber que dispositivos hay, que IPs tienen, que puertos están abiertos.

### Escaneo de red con Nmap

Nmap es la herramienta más conocida para mapear redes. Envía sondas diseñadas para provocar respuestas específicas.

- Ping sweep: envía paquetes ICMP a un rango de IPs. Las que responden están vivas.
- SYN scan: envía paquetes SYN a puertos específicos. Si recibe SYN-ACK, el puerto esta abierto. Si recibe RST, esta cerrado.
- FIN scan: envía paquetes FIN. Los sistemas Unix responden con RST si el puerto esta cerrado, y no responden si esta abierto. Windows responde con RST siempre, por lo que este escaneo no funciona contra Windows.

La detección de sistema operativo se basa en el fingerprinting de pila TCP: diferencias sutiles en como cada sistema operativo implementa TCP.

### ARP spoofing

El Protocolo de Resolución de Direcciones (ARP) traduce IPs a MACs. Funciona así: un dispositivo envía un broadcast "quien tiene la IP 192.168.1.1?". El dispositivo con esa IP responde "yo, mi MAC es aa:bb:cc:dd:ee:ff".

El problema es que ARP no tiene autenticación. Cualquier dispositivo puede responder. Si un atacante responde a las solicitudes ARP con su propia MAC, el tráfico destinado a otra IP se redirige al atacante.

Esto se llama ARP spoofing o ARP poisoning. Permite al atacante interceptar, modificar o bloquear el tráfico entre dos dispositivos.

La herramienta `arpspoof` (parte de dsniff) automatiza este ataque. Ejecutas `arpspoof -t victima gateway` y el tráfico de la victima pasa por tu máquina.

### MAC flooding

Un switch aprende MACs. Pero su tabla tiene un tamaño limitado. Si un atacante envía miles de tramas con direcciones MAC falsas, la tabla se llena.

Cuando la tabla esta llena, el switch no puede aprender nuevas MACs. Entra en modo fallback: comienza a inundar todo el tráfico por todos los puertos, como si fuera un hub.

Esto permite al atacante ver todo el tráfico de la red, no solo el dirigido a el.

La herramienta `macof` (también de dsniff) envía 155,000 MACs falsas por segundo. En segundos, la mayoría de switches comerciales tienen su tabla llena.

### Rogue DHCP server

El atacante conecta un servidor DHCP falso. Cuando los clientes solicitan una IP, el servidor falso responde antes que el legítimo. Les asigna una IP con el gateway configurado como la máquina del atacante.

Todos los clientes que reciben esta configuración envían su tráfico a través del atacante. El atacante puede reenviarlo al gateway legítimo despus de inspeccionarlo.

### VLAN hopping

Si el atacante logra configurar su puerto como trunk (ya sea porque DTP esta habilitado o porque tiene acceso físico al switch), puede recibir tráfico de todas las VLANs.

También existe el ataque de double tagging: enviar tramas con dos etiquetas VLAN. La primera etiqueta es de la VLAN nativa y la quita el primer switch. La segunda etiqueta es la VLAN objetivo.

## Casos reales de fallos y ataques

### El caso del loop de STP

Una empresa mediana tenía dos switches conectados por dos cables para redundancia. STP estaba deshabilitado porque "no lo necesitaban". Un empleado conecto un tercer cable entre los dos switches para "mejorar la velocidad". Se formó un bucle de capa 2.

En 10 segundos, la red entera colapso. Los switches estaban al 100% de CPU. No pasaba tráfico legítimo. Tuvieron que desconectar cables físicamente hasta que el bucle se rompió.

La moraleja: STP no es opcional. Siempre debe estar habilitado en redes con switches redundantes.

### ARP spoofing en una universidad

Un estudiante en una universidad pública ejecutó ARP spoofing contra el gateway de la red de estudiantes. Durante una semana, todo el tráfico de sus companeros paso por su laptop. Capturo cientos de contraseñas de servicios que usaban HTTP en lugar de HTTPS.

La universidad no detecto el ataque porque no tenía herramientas de monitoreo de red. El estudiante fue descubierto solo porque presumio de su hackeo en redes sociales.

### Cable submarino cortado

En 2024, un cable submarino en el Mar Rojo fue cortado, afectando la conectividad de varios países africanos. El tráfico de internet entre Europa y Asia tuvo que ser redirigido, causando latencia adicional.

Un ataque de capa 1 puro. No hay firewall que proteja contra un cable físico cortado. La única defensa es la redundancia física: múltiples cables por diferentes rutas.

## Modos de fallo de los fundamentos de red

### Duplex mismatch

Un dispositivo configurado en full-duplex y el otro en half-duplex. El primero transmite sin esperar, el segundo solo transmite cuando el medio esta libre. El half-duplex detecta colisiones y retransmite, pero el full-duplex no. Resultado: rendimiento pesimo, muchos errores CRC.

La solución es la autonegociacion. Pero si falla (cables danados, configuración manual), el mismatch es inevitable.

### Cable danado

Un cable mal crimpado, pisado por una silla, o con un conector suelto. El resultado es pérdida de paquetes, velocidad reducida, o conexion intermitente.

Los switches modernos tienen indicadores de errores CRC. Un alto número de errores en un puerto indica un problema físico.

### Tormenta de broadcast

Una tormenta de broadcast ocurre cuando hay demasiados paquetes broadcast en la red. El switch reenvia broadcasts a todos los puertos. Cada dispositivo debe procesar cada broadcast. Si hay suficientes, la red se satura y los dispositivos no pueden procesar tráfico legítimo.

Causas:
- STP mal configurado
- Bucle de capa 2
- Ataque de broadcast

### Bucles de enrutamiento

Dos routers que se envían paquetes mutuamente sin llegar al destino. Cada paquete tiene un TTL (Time To Live) que se decrementa en cada salto. Cuando llega a 0, el paquete se descarta.

Un bucle de enrutamiento causa un aumento en el uso de CPU y ancho de banda de los routers involucrados.

### MTU mismatch

El MTU de un enlace es menor que el de otro. Los paquetes grandes se descartan y necesitan ser fragmentados. Si el camino tiene un enlace con MTU menor, los paquetes grandes no llegan.

El sintoma típico: las conexiones que usan paquetes pequeños (SSH, Telnet) funcionan, pero las transferencias de archivos grandes fallan.

## Comandos de diagnóstico esenciales

Estos son los comandos que uso constantemente para diagnosticar problemas de red:

`ipconfig` (Windows) o `ip addr` (Linux): muestra la configuración IP de tu máquina. Dirección IP, máscara, gateway, DNS.

`ping`: envía paquetes ICMP Echo Request y espera Echo Reply. Prueba conectividad básica entre dos hosts.

`tracert` (Windows) o `traceroute` (Linux): muestra la ruta que siguen los paquetes hasta el destino. Cada línea es un salto. Útil para detectar donde se pierde la conectividad.

`arp -a` (Windows) o `ip neigh` (Linux): muestra la tabla ARP. Las IPs y sus MACs correspondientes. Útil para detectar ARP spoofing.

`netstat -an`: muestra conexiones activas, puertos en escucha, y estados de las conexiones TCP.

`nslookup` o `dig`: consulta servidores DNS para resolver nombres a IPs.

`tcpdump` (Linux) o Wireshark: captura y analiza paquetes de red. Permite ver exactamente que tramas están viajando por la red.

`route print` (Windows) o `ip route` (Linux): muestra la tabla de enrutamiento local.

## Como usar Wireshark para ver el tráfico en tiempo real

Wireshark es la herramienta más poderosa para ver que esta pasando realmente en tu red. Te permite capturar paquetes y analizarlos capa por capa.

Para usarlo:

1. Selecciona la interfaz de red que quieres monitorear (Ethernet, Wi-Fi).
2. Aplica un filtro de captura si solo te interesa cierto tráfico (por ejemplo, `tcp port 80` para solo HTTP).
3. Inicia la captura.
4. Realiza la accion que quieres analizar (abrir una pagina web, hacer ping).
5. Deten la captura y analiza los paquetes.

Wireshark muestra cada paquete con su árbol de protocolos. Puedes expandir cada capa para ver los encabezados:

- Frame: información de la trama completa
- Ethernet II: MAC origen y destino
- IPv4: IP origen y destino, TTL, protocolo
- TCP/UDP: puertos origen y destino
- HTTP/TLS/etc: datos de la aplicación

Algo que aprendi con Wireshark: ver el tráfico en tiempo real te da una comprensión intuitiva que ningún libro puede dar. Cuando ves el triple handshake TCP (SYN, SYN-ACK, ACK) en la pantalla, entiendes TCP para siempre.

## Protocolos adicionales importantes

### ICMP (Internet Control Message Protocol)

ICMP es el protocolo de mensajes de control. No se usa para transportar datos de aplicación, sino para diagnosticar y reportar errores.

Tipos de mensajes ICMP:
- Echo Request (tipo 8) y Echo Reply (tipo 0): usados por ping
- Destination Unreachable (tipo 3): el destino no es alcanzable
  - Code 0: network unreachable
  - Code 1: host unreachable
  - Code 2: protocol unreachable
  - Code 3: port unreachable
- Time Exceeded (tipo 11): el TTL llegó a 0
- Redirect (tipo 5): el router le dice al host que hay una mejor ruta

ICMP puede ser usado en ataques:
- ICMP flood: inundar con paquetes Echo Request
- Smurf attack: enviar Echo Request con origen falsificado a una dirección de broadcast
- ICMP tunnel: encapsular datos en paquetes ICMP para evadir firewalls

### ARP (Address Resolution Protocol)

ARP traduce direcciones IP a direcciones MAC en una red local. Funciona así:

1. El host A quiere enviar un paquete a 192.168.1.2.
2. El host A busca en su tabla ARP si tiene la MAC de 192.168.1.2.
3. Si no la tiene, envía un broadcast ARP: "quien tiene la IP 192.168.1.2?"
4. El host B responde: "yo, mi MAC es aa:bb:cc:dd:ee:ff".
5. El host A guarda la asociacion en su tabla ARP y envía el paquete.

La tabla ARP tiene un temporizador de envejecimiento. Las entradas expiran después de un tiempo (tipicamente 20-60 segundos para entradas incompletas, 2-4 horas para entradas completas en algunos sistemas).

ARP es inherentemente inseguro porque:
- No tiene autenticación
- Cualquier dispositivo puede responder por cualquier IP
- No hay verificación de que la respuesta sea legítima

## El modelo cliente-servidor vs peer-to-peer

### Cliente-Servidor

Un servidor centralizado ofrece recursos o servicios. Los clientes se conectan al servidor para acceder a ellos.

Ejemplos: un servidor web (Apache, Nginx), un servidor de correo (Postfix, Exchange), un servidor de base de datos (MySQL, PostgreSQL).

Ventajas: control centralizado, fácil administración, backup centralizado.
Desventajas: punto único de fallo, escalabilidad limitada.

### Peer-to-Peer (P2P)

Cada nodo (peer) es tanto cliente como servidor. Comparten recursos directamente sin un servidor central.

Ejemplos: BitTorrent, Bitcoin, algunas aplicaciones de mensajeria.

Ventajas: sin punto único de fallo, escalabilidad inherente.
Desventajas: seguridad descentralizada, difícil de administrar.

## Cableado estructurado en la práctica

En instalaciones profesionales, el cableado sigue un estándar llamado cableado estructurado. Define:

- Cuarto de telecomunicaciones: donde están los switches y el patch panel.
- Cableado horizontal: desde el patch panel hasta los outlets en las oficinas.
- Cableado vertical (backbone): conecta los cuartos de telecomunicaciones entre pisos.
- Area de trabajo: desde el outlet hasta el dispositivo.

Cada conexion debe ser probada con un certificador de cable. La certificación verifica:
- Mapa de pines (todos los pares conectados correctamente)
- Longitud (máximo 100 metros)
- Atenuacion (pérdida de señal)
- NEXT (Near-End Crosstalk)
- Return Loss

Un cable que no pasa la certificación puede funcionar a 100 Mbps pero fallar a 1000 Mbps. O puede funcionar intermitentemente.

## Autoevaluación

1. Cuando envías un paquete desde tu computadora a un servidor en otro país, las direcciones MAC cambian en cada salto pero la dirección IP no. Explica por que usando las funciones de cada una dentro del modelo de red.

2. Un switch recibe un paquete destinado a una MAC que no esta en su tabla. Que hace y por que esto es un riesgo de seguridad?

3. Un empleado se queja de que la red va lenta. Las luces del switch muestran actividad constante en todos los puertos incluso cuando nadie esta trabajando. Que esta probablemente ocurriendo y como lo diagnosticarias?

4. Cual es la diferencia entre un bucle de capa 2 y una tormenta de broadcast? Están siempre relacionados o pueden ocurrir independientemente?

5. Un atacante estaciona una camioneta afuera de un edificio con una antena direccional. Que medio físico es el más vulnerable a esto, y que medidas de mitigación existen?

6. Si tu computadora puede hacer ping a la IP 8.8.8.8 pero no puede cargar google.com, en que capa del modelo de red esta el problema? Como lo confirmarias?

7. Explica por que la tabla MAC de un switch tiene un tamaño finito y que ocurre cuando se llena. Que herramienta usaria un atacante para llenarla intencionalmente?

8. Un router recibe un paquete y lo reenvia por la interfaz equivocada. El paquete viaja hacia un router que no sabe que hacer con el y lo descarta. Como se llama este tipo de falla y como se diagnostica?

9. Configuras un cable directo entre dos PCs para transferir archivos. Las PCs no se ven entre si. El cable esta correctamente crimpado. Que podría estar mal y por que?

10. Que es ARP spoofing y como permite a un atacante interceptar tráfico entre dos dispositivos en la misma red?
