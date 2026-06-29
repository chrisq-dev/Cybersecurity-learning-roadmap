---
title: "IP y Subnetting: Como los routers encuentran el camino y como los atacantes lo aprovechan"
level: "inicial"
content_type: "guia"
updated: "2026-06-29"
---

# IP y Subnetting: Como los routers encuentran el camino y como los atacantes lo aprovechan

## Objetivo de esta guía

Las direcciones IP son el sistema de coordenadas de internet. Sin ellas, no hay forma de que un paquete sepa donde ir. Pero no basta con entender que una IP es un número. Hay que entender como se estructuran las redes, por qué se dividen en subredes, y como esa división es la base de la seguridad perimetral.

El subnetting asusta a mucha gente porque involucra números binarios y máscaras. Mi objetivo aqui es que entiendas la lógica, no que memorices tablas. En el mundo real, usas calculadoras de subnetting. Pero si no entiendes que calculan, no podrás diseñar redes seguras ni diagnosticar problemas de enrutamiento.

## La diferencia entre una dirección MAC y una IP

Tu computadora tiene un nombre de fábrica: la dirección MAC. Es un identificador único a nivel mundial grabado en la tarjeta de red. Nunca cambia. Pero no te dice donde esta el dispositivo.

La dirección IP es la dirección actual del dispositivo. Cambia si te mudas de red. Le dice al resto de internet donde encontrarte ahora.

Si un router solo usara direcciones MAC, no podría enrutar nada. Necesitaria saber la MAC de cada dispositivo en el mundo. La tabla seria infinita. En cambio, los routers solo necesitan saber que redes existen y por donde llegar a ellas. Las IPs le permiten a los routers resumir millones de dispositivos en una sola entrada de tabla.

## Sistema binario: los números que entienden las computadoras

pasa aqui? Las máquinas no piensan en decimal como nosotros. Piensan en unos y ceros. Y si no entiendes eso, el subnetting te va a parecer magia negra.

Las direcciones IP se escriben en decimal, pero las computadoras las procesan en binario. Entender binario es esencial para subnetting.

Un byte (8 bits) puede representar números de 0 a 255. Cada posición de bit tiene un valor:

| Bit | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
|-----|---|---|---|---|---|---|---|---|
| Valor | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |

Para convertir binario a decimal, sumas los valores de los bits que están en 1.

Ejemplo: 11000000 en binario:
- Bit 7: 1 * 128 = 128
- Bit 6: 1 * 64 = 64
- Bits 5-0: 0
- Total: 128 + 64 = 192

Para convertir decimal a binario, restas los valores de mayor a menor:
- 168: 128 cabe (168-128=40). Bit 7 = 1.
- 40: 64 no cabe. Bit 6 = 0.
- 40: 32 cabe (40-32=8). Bit 5 = 1.
- 8: 16 no cabe. Bit 4 = 0.
- 8: 8 cabe (8-8=0). Bit 3 = 1.
- 0: los bits restantes son 0.
- Resultado: 10101000

Un truco rápido: los números 128, 192, 224, 240, 248, 252, 254, 255 son los valores de máscara más comunes. Corresponde a 1, 2, 3, 4, 5, 6, 7, 8 bits en 1 respectivamente.

## La estructura de IPv4

Una dirección IPv4 tiene 32 bits. Se divide en 4 octetos de 8 bits cada uno. Se escribe en formato decimal punteado: 192.168.1.1.

Rango teórico: 0.0.0.0 a 255.255.255.255.

La IP se divide en dos partes:
- Porción de red: identifica la red a la que pertenece el dispositivo.
- Porción de host: identifica al dispositivo dentro de esa red.

La máscara de subred define donde termina la porción de red y donde empieza la de host.

### Clases de direcciones IP (sistema clásico)

Originalmente, las IPs se asignaban en clases fijas:

**Clase A:**
- Rango: 0.0.0.0 a 127.255.255.255
- Máscara por defecto: 255.0.0.0 (/8)
- Redes: 128 (126 utilizables, 0 y 127 reservadas)
- Hosts por red: 16,777,214
- Uso: redes muy grandes

**Clase B:**
- Rango: 128.0.0.0 a 191.255.255.255
- Máscara por defecto: 255.255.0.0 (/16)
- Redes: 16,384
- Hosts por red: 65,534
- Uso: redes medianas

**Clase C:**
- Rango: 192.0.0.0 a 223.255.255.255
- Máscara por defecto: 255.255.255.0 (/24)
- Redes: 2,097,152
- Hosts por red: 254
- Uso: redes pequeñas

**Clase D (multicast):**
- Rango: 224.0.0.0 a 239.255.255.255
- No tiene máscara por defecto
- Uso: tráfico multicast (uno a muchos)

**Clase E (reservada):**
- Rango: 240.0.0.0 a 255.255.255.255
- Uso: experimental, no se usa en internet público

### Problemas del sistema de clases

El sistema de clases era rigido. Si necesitabas 300 hosts, no podías usar una Clase C (254 hosts máximo). Tenías que usar una Clase B (65,534 hosts), desperdiciando 65,000 direcciones.

Con la explosión de internet en los 90, este desperdicio acelero el agotamiento de IPv4. La solución fue CIDR.

## CIDR: Classless Inter-Domain Routing

CIDR eliminó el concepto de clases fijas. En lugar de /8, /16, /24, puedes usar cualquier máscara: /23, /25, /26, etc.

Ventajas de CIDR:
- Flexibilidad: creas redes del tamaño exacto que necesitas
- Ahorro de direcciones: no desperdicias IPs
- Agregacion de rutas: reduces el tamaño de las tablas de enrutamiento

CIDR se escribe como IP/máscara en bits: 192.168.1.0/24 significa que los primeros 24 bits son la red y los últimos 8 son los hosts.

## La máscara de subred en detalle

La máscara de subred es un número de 32 bits. En binario, es una secuencia de unos seguida de ceros. Los unos indican la porción de red. Los ceros indican la porción de host.

Máscaras comunes:

| CIDR | Máscara | Binario | Hosts |
|------|---------|---------|-------|
| /8 | 255.0.0.0 | 11111111.00000000.00000000.00000000 | 16,777,214 |
| /16 | 255.255.0.0 | 11111111.11111111.00000000.00000000 | 65,534 |
| /24 | 255.255.255.0 | 11111111.11111111.11111111.00000000 | 254 |
| /25 | 255.255.255.128 | 11111111.11111111.11111111.10000000 | 126 |
| /26 | 255.255.255.192 | 11111111.11111111.11111111.11000000 | 62 |
| /27 | 255.255.255.224 | 11111111.11111111.11111111.11100000 | 30 |
| /28 | 255.255.255.240 | 11111111.11111111.11111111.11110000 | 14 |
| /29 | 255.255.255.248 | 11111111.11111111.11111111.11111000 | 6 |
| /30 | 255.255.255.252 | 11111111.11111111.11111111.11111100 | 2 |
| /31 | 255.255.255.254 | 11111111.11111111.11111111.11111110 | 0 (enlaces punto a punto) |
| /32 | 255.255.255.255 | 11111111.11111111.11111111.11111111 | 1 (host único) |

El cálculo de hosts utilizables: 2^(32 - máscara) - 2. Se restan 2 porque la primera dirección es la dirección de red y la última es la dirección de broadcast.

## Operación AND: como se determina la red

Para saber a que red pertenece una IP, haces un AND lógico entre la IP y la máscara.

El AND lógico funciona así:
- 1 AND 1 = 1
- 1 AND 0 = 0
- 0 AND 1 = 0
- 0 AND 0 = 0

Ejemplo:
- IP: 192.168.1.55
- Máscara: 255.255.255.0 (/24)

En binario:
- IP: 11000000.10101000.00000001.00110111
- Máscara: 11111111.11111111.11111111.00000000
- AND: 11000000.10101000.00000001.00000000
- Red: 192.168.1.0

Si la máscara fuera /26 (255.255.255.192):
- IP: 11000000.10101000.00000001.00110111
- Máscara: 11111111.11111111.11111111.11000000
- AND: 11000000.10101000.00000001.00000000
- Red: 192.168.1.0

Con /26, el último octeto tiene 2 bits de red y 6 de host. La IP 192.168.1.55 esta en la red 192.168.1.0/26.

## Direcciones especiales en cada subred

### Dirección de red

Es la primera dirección de la subred. Todos los bits de host son 0. No se puede asignar a un dispositivo. Identifica la red.

En 192.168.1.0/24, la dirección de red es 192.168.1.0.

### Dirección de broadcast

Es la última dirección de la subred. Todos los bits de host son 1. Se usa para enviar paquetes a todos los dispositivos de la red simultáneamente.

En 192.168.1.0/24, la dirección de broadcast es 192.168.1.255.

### Loopback

127.0.0.0/8 es la dirección de loopback. Los paquetes enviados a 127.0.0.1 no salen de tu computadora. Se usan para pruebas locales de la pila TCP/IP.

### Link-local (APIPA)

169.254.0.0/16 son direcciones link-local. Un dispositivo que no puede obtener una IP via DHCP se asigna una automáticamente en este rango. Si ves una IP 169.254.x.x, significa que DHCP fallo.

## Direcciones privadas vs públicas

Las direcciones privadas no son enrutables en internet. Se usan dentro de redes locales.

**Rangos privados:**
- 10.0.0.0/8: 10.0.0.0 a 10.255.255.255 (16,777,216 direcciones)
- 172.16.0.0/12: 172.16.0.0 a 172.31.255.255 (1,048,576 direcciones)
- 192.168.0.0/16: 192.168.0.0 a 192.168.255.255 (65,536 direcciones)

Las direcciones públicas son unicas en todo internet. Son asignadas por la IANA y los registros regionales (RIPE, ARIN, LACNIC, AfriNIC, APNIC).

Si ves una IP privada en un log de un ataque externo, es tráfico interno. El atacante no esta en internet, esta dentro de la red.

## Subnetting paso a paso

Voy a mostrarte como subdividir una red con un ejemplo real.

**Problema:** Tienes la red 192.168.1.0/24 y necesitas 4 subredes del mismo tamaño.

**Paso 1:** Determina cuántos bits necesitas prestados.
2^n >= 4 (subredes necesarias)
n = 2 (2^2 = 4)

**Paso 2:** Calcula la nueva máscara.
Máscara original: /24 (24 bits de red)
Bits prestados: 2
Nueva máscara: /26 (24 + 2)

**Paso 3:** Calcula cuántos hosts por subred.
Bits de host restantes: 32 - 26 = 6
Hosts por subred: 2^6 - 2 = 62

**Paso 4:** Calcula las direcciones de red de cada subred.
El incremento entre subredes es 2^(8-n) en el octeto donde se prestan los bits.
En este caso, 2^(8-2) = 2^6 = 64.

Subred 1: 192.168.1.0/26 (hosts: .1 a .62, broadcast: .63)
Subred 2: 192.168.1.64/26 (hosts: .65 a .126, broadcast: .127)
Subred 3: 192.168.1.128/26 (hosts: .129 a .190, broadcast: .191)
Subred 4: 192.168.1.192/26 (hosts: .193 a .254, broadcast: .255)

Cada subred funciona como una red independiente. Los dispositivos en diferentes subredes necesitan un router para comunicarse.

## VLSM: máscara de longitud variable

VLSM (Variable Length Subnet Mask) permite usar diferentes máscaras dentro del mismo bloque de red. Es útil cuando las subredes tienen diferentes requisitos de tamaño.

**Problema:** Tienes 192.168.1.0/24 y necesitas:
- Una subred para 100 hosts
- Una subred para 50 hosts
- Dos subredes para 25 hosts cada una

**Paso 1:** Ordena las subredes de mayor a menor.
- 100 hosts: necesita /25 (126 hosts)
- 50 hosts: necesita /26 (62 hosts)
- 25 hosts: necesita /27 (30 hosts)
- 25 hosts: necesita /27 (30 hosts)

**Paso 2:** Asigna las subredes en orden.
- 100 hosts: 192.168.1.0/25 (192.168.1.0 a 192.168.1.127)
- 50 hosts: 192.168.1.128/26 (192.168.1.128 a 192.168.1.191)
- 25 hosts: 192.168.1.192/27 (192.168.1.192 a 192.168.1.223)
- 25 hosts: 192.168.1.224/27 (192.168.1.224 a 192.168.1.255)

Sin VLSM, habrias usado /26 para todas (4 subredes de 62 hosts), desperdiciando direcciones. Con VLSM, usas exactamente el espacio que necesitas.

## Supernetting (agregacion de rutas)

El supernetting combina múltiples redes en una sola entrada de tabla de enrutamiento. Es el proceso inverso al subnetting.

Ejemplo: tienes 4 redes /24:
- 192.168.0.0/24
- 192.168.1.0/24
- 192.168.2.0/24
- 192.168.3.0/24

En binario:
- 192.168.00000000.0
- 192.168.00000001.0
- 192.168.00000010.0
- 192.168.00000011.0

Los primeros 22 bits son idénticos. Puedes resumir como 192.168.0.0/22.

Esto reduce las tablas de enrutamiento de 4 entradas a 1. Es esencial para que internet funcione: sin agregacion, las tablas de los routers del backbone serian millones de entradas.

## IPv6: el futuro que ya esta aqui

IPv6 usa 128 bits. Se escribe en hexadecimal separado por dos puntos. Se ve así: 2001:0db8:85a3:0000:0000:8a2e:0370:7334.

Reglas de simplificacion:
- Los ceros iniciales se pueden omitir: 2001:db8:85a3:0:0:8a2e:370:7334
- Una secuencia de dos puntos consecutivos reemplaza bloques de ceros: 2001:db8:85a3::8a2e:370:7334
- Esto solo se puede hacer una vez en la dirección.

Tipos de direcciones IPv6:
- Unicast: una interfaz (similar a IPv4 unicast)
- Multicast: grupo de interfaces (reemplaza el broadcast de IPv4)
- Anycast: la más cercana de un grupo de interfaces

IPv6 tiene sus propias direcciones especiales:
- ::1: loopback
- fe80::/10: link-local (similar a 169.254.x.x)
- fc00::/7: unique-local (similar a IPs privadas)
- 2000::/3: global unicast (similar a IPs públicas)

IPv6 eliminó NAT porque hay suficientes direcciones. Cada dispositivo puede tener una IP pública única. Esto simplifica la red pero cambia el modelo de seguridad: los dispositivos ya no están "ocultos" detrás de NAT.

## Modos de fallo en IP y Subnetting

### Máscara de subred incorrecta

Configuras una máscara que no coincide con la del resto de la red. Los hosts pueden ver el gateway como parte de su propia red o como una red remota. Si lo ven como remoto, intentan enrutar en lugar de usar ARP, y no pueden comunicarse.

Sintoma: ping a la IP del gateway falla, pero ping a 127.0.0.1 funciona.

### Superposicion de subredes

Dos subredes que se solapan. Si tienes 10.0.0.0/24 y 10.0.0.128/25, la segunda esta contenida en la primera. Los routers no saben a cual enviar los paquetes.

### Gateway predeterminado incorrecto

El gateway configurado no esta en la misma subred que el host. El host no puede enviar tráfico fuera de su red porque intenta alcanzar el gateway via ARP, y el gateway nunca responde porque no pertenece a esa red.

### TTL expirado

Un paquete que circula en un bucle de enrutamiento eventualmente agota su TTL y se descarta. El remitente recibe un mensaje ICMP Time Exceeded.

### Fragmentacion excesiva

Cuando los paquetes son demasiado grandes para el MTU del enlace, se fragmentan. La fragmentacion aumenta la carga de procesamiento y reduce el rendimiento. Si un solo fragmento se pierde, todo el paquete original debe ser retransmitido.

### Agotamiento de IPv4

Las direcciones IPv4 públicas se agotaron oficialmente en 2011. Los registros regionales ya no asignan bloques grandes. Las empresas dependen de NAT y IPv6 para nuevas conexiones.

## El ángulo del atacante

### Escaneo de subredes

Un atacante dentro de la red escanea rangos enteros de IPs para descubrir dispositivos vivos. Usa técnicas como:

- Ping sweep: envía ICMP Echo Request a todo el rango. Las respuestas indican dispositivos activos.
- SYN scan: envía SYN a un puerto común. Las respuestas SYN-ACK indican dispositivos activos con ese puerto abierto.
- ARP scan: envía solicitudes ARP para un rango de IPs. Las respuestas indican dispositivos en la misma capa 2.

Con CIDR, un atacante sabe que si encuentra una IP en 10.0.0.0/8, hay potencialmente millones de otras IPs en la misma red.

### IP spoofing

Un atacante envía paquetes con una IP de origen falsa. Esto permite:

- Evadir listas blancas basadas en IP
- Lanzar ataques de amplificacion (como el Smurf attack)
- Ocultar el origen real del ataque

La mitigación es el filtrado de ingreso (ingress filtering): el router verifica que el tráfico que sale de una red tenga IPs de origen pertenecientes a esa red.

### BGP hijacking

BGP es el protocolo que mantiene unido internet. Los routers intercambian información de enrutamiento mediante BGP.

Si un atacante compromete un router BGP y anuncia rutas falsas, puede redirigir el tráfico de bloques enteros de IPs a través de su red.

Casos reales:
- 2008: Pakistan Telecom anuncio rutas BGP para YouTube, redirigiendo el tráfico mundial de YouTube a través de Pakistan.
- 2018: Un provedor de internet de Rusia anuncio rutas para Google, Amazon, Facebook, redirigiendo el tráfico durante minutos.
- 2021: Varios ataques de BGP hijacking contra servicios financieros.

### Fragmentacion como evasion

Los firewalls y sistemas de detección de intrusiones a menudo verifican los paquetes completos. Pero la fragmentacion IP permite dividir un paquete en fragmentos que, individualmente, parecen inofensivos. Cuando se reensamblan en el destino, forman un ataque.

Técnicas:
- Fragmentos muy pequeños (tiny fragment attack): los datos del encabezado de capa 4 se dividen en el primer fragmento, evadiendo firewalls que no reensamblan.
- Fragmentos traslapados (overlapping fragment attack): fragmentos cuyo offset se superpone, corrompiendo la inspeccion.

### Enrutamiento de origen

IPv4 permite que el remitente especifique la ruta que debe seguir el paquete mediante la opción Loose Source Route o Strict Source Route. Un atacante puede hacer que el paquete pase por su máquina.

Esta opción esta deshabilitada en casi todos los routers modernos.

## Casos reales

### El error de máscara en una migración

Una empresa migro sus servidores de 10.0.0.0/24 a 10.0.0.0/23 para tener más direcciones. El administrador actualizo la máscara en los servidores pero olvido actualizar la máscara en los switches de acceso. Los servidores y los switches no coincidian en los límites de subred.

Los servidores nuevos con IPs en 10.0.0.128 a 10.0.0.255 no podían comunicarse con el gateway. El error tardo 2 horas en diagnosticarse porque "el ping funcionaba" (ping usa ICMP, que a veces funciona incluso con máscaras incorrectas dependiendo de la configuración).

### BGP hijacking de una criptomoneda

En 2018, un atacante realizo BGP hijacking contra el DNS de Amazon Web Services. Redirigio el tráfico de un servicio de criptomonedas a un sitio falso. Los usuarios que escribian la URL correcta eran redirigidos a un servidor controlado por el atacante, que robaba sus credenciales.

El ataque duro aproximadamente 2 horas. Se estima que el atacante robo criptomonedas por valor de cientos de miles de dólares.

### Subnetting mal planificado en un hospital

Un hospital configuró todas las redes de los dispositivos médicos en una sola subred /22 (1022 direcciones). Cuando llegaron los nuevos monitores cardiacos para 300 camas, no había suficientes direcciones disponibles.

El hospital tuvo que reestructurar todo el direccionamiento, lo que requirio apagar la red durante un fin de semana. En un hospital, eso es crítico.

## Autoevaluación

1. Tienes el bloque 192.168.10.0/24 y necesitas 4 subredes de igual tamaño. Cual es la nueva máscara de subred, y cuáles son las direcciones de red, broadcast, y el rango de hosts de cada subred?

2. Explica la diferencia entre una dirección de red y una dirección de broadcast. Por qué no se pueden asignar a dispositivos? Que ocurre si accidentalmente asignas una dirección de broadcast a un host?

3. Un administrador configura la máscara 255.255.255.0 en un host con IP 192.168.2.10. La puerta de enlace tiene IP 192.168.1.1 con máscara 255.255.255.0. Por qué el host no puede acceder a internet? Que máscara debería tener?

4. Que es CIDR y por qué reemplazo al sistema de clases? Explica con un ejemplo donde una Clase C sea insuficiente y una Clase B sea derrochadora.

5. Si un atacante realiza un escaneo de una subred /24, cuántas IPs debe probar? Y si la subred es /16? Cuanto tiempo le tomaría a 1000 paquetes por segundo escanear una /16 completa?

6. Por qué las direcciones privadas (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) no son enrutables en internet? Que tecnología hace posible que dispositivos con IPs privadas puedan navegar? Esto es una característica de seguridad o una limitacion?

7. Explica el concepto de VLSM. Diseña el direccionamiento para una empresa que necesita 3 subredes de 120, 60 y 30 hosts respectivamente, partiendo de 192.168.1.0/24.

8. Que es BGP hijacking? Explica como un atacante puede redirigir el tráfico de un bloque entero de IPs hacia su propia red.

9. Tienes las siguientes redes: 10.1.0.0/24, 10.1.1.0/24, 10.1.2.0/24, 10.1.3.0/24. Cual es la máscara de supernet que las resume a una sola ruta? Cual es la dirección de red resumida?

10. Que es la fragmentacion IP y como puede ser utilizada por un atacante para evadir firewalls y sistemas de detección?
