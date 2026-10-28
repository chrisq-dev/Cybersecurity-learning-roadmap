---
title: "Switching, VLANs y ACLs: Construyendo paredes y puertas en la red"
level: "inicial"
content_type: "guia"
updated: "2026-06-29"
---

# Switching, VLANs y ACLs: Construyendo paredes y puertas en la red

## Objetivo de esta guía

Una red plana es una red insegura. Si todos los dispositivos pueden comunicarse directamente entre si, un solo dispositivo comprometido puede infectar toda la organización.

Esta guía trata sobre como construir segmentación. Como usar switches para conectar dispositivos, VLANs para separarlos en grupos lógicos, y ACLs para controlar que tráfico puede cruzar entre esos grupos.

Cuando termines, vas a entender por qué la frase "el atacante ya esta dentro" no es pesimismo, es realismo. Y como diseñar la red para que, incluso si alguien entra, no pueda llegar a los servidores críticos.

## Switching: el corazón de la red local

### Como funciona un switch

Un switch es un dispositivo de capa 2 que conecta dispositivos dentro de la misma red. Su función principal es aprender direcciones MAC y reenviar tramas solo al puerto correcto.

Cuando un switch se enciende, su tabla MAC esta vacía. A medida que los dispositivos envían tráfico, el switch aprende:

1. Lee la dirección MAC de origen de cada trama que llega a un puerto.
2. Asocia esa MAC al puerto por donde llegó.
3. Almacena la asociación en su tabla MAC con un timestamp.

Cuando llega una trama destinada a una MAC conocida, el switch la reenvía solo por el puerto correspondiente. Cuando la MAC es desconocida, inunda la trama por todos los puertos excepto el de origen.

### La tabla MAC en detalle

el switch no es inteligente al principio. Aprende sobre la marcha, viendo quien habla con quien.

La tabla MAC tiene tres campos principales:
- Dirección MAC: la MAC aprendida.
- Puerto: el puerto por donde se aprendió.
- VLAN: la VLAN a la que pertenece la MAC.

Cada entrada tiene un temporizador de envejecimiento (aging). Por defecto, las entradas expiran después de 300 segundos (5 minutos) sin actividad. Si el dispositivo vuelve a transmitir, el temporizador se reinicia.

El tamaño de la tabla MAC varia según el modelo del switch. Los switches empresariales pueden tener tablas de 16,000 a 128,000 entradas.

### Métodos de switching

**Store-and-forward:**
El switch recibe la trama completa, verifica el CRC (integrity check), y la reenvía. Si el CRC es incorrecto, descarta la trama.

Ventaja: no reenvía tramas corruptas.
Desventaja: mayor latencia (el tiempo de recibir la trama completa).

**Cut-through:**
El switch lee solo la MAC de destino (los primeros 14 bytes) y empieza a reenviar inmediatamente.

Ventaja: latencia mínima.
Desventaja: puede reenviar tramas corruptas (no verifica CRC).

**Fragment-free:**
Compromiso entre los dos. Lee los primeros 64 bytes (tamaño mínimo de una trama Ethernet valida) y luego reenvía. Evita reenviar fragmentos de colisión (runt frames).

### Duplex

**Half-duplex:** el dispositivo puede transmitir o recibir, pero no ambos simultáneamente. Usa CSMA/CD para evitar colisiones.

**Full-duplex:** el dispositivo puede transmitir y recibir simultáneamente. No hay colisiones. Requiere una conexión punto a punto (sin hubs).

La autonegociacion permite que dos dispositivos acuerden la velocidad y el duplex. Si falla, el resultado es un duplex mismatch: un lado en full y el otro en half, causando errores de rendimiento.

### Buffer de trama

Los switches tienen memoria para almacenar tramas temporalmente cuando la interfaz de salida esta ocupada. Si el buffer se llena, las tramas se descartan.

El buffer puede ser:
- Port-based: cada puerto tiene su propio buffer.
- Shared: todos los puertos comparten un buffer común.

El buffer compartido es más eficiente porque el switch puede asignar memoria según la demanda.

### Spanning Tree Protocol (STP)

En una red con redundancia (dos switches conectados por dos cables), se forman bucles de capa 2. Un broadcast en un bucle se replica infinitamente.

**Como funciona STP:**

1. Elección del switch raíz: todos los switches intercambian mensajes BPDU (Bridge Protocol Data Units). El switch con la prioridad más baja (o la MAC más baja) se convierte en la raíz.

2. Elección del puerto raíz: cada switch no raíz elige el puerto con el costo más bajo hacia la raíz.

3. Elección del puerto designado: en cada segmento de red, el puerto con el costo más bajo hacia la raíz es el designado.

4. Los puertos que no son raíz ni designados se bloquean.

**Estados de los puertos STP:**
- Blocking: no reenvía tramas, no aprende MACs.
- Listening: no reenvía, no aprende, pero escucha BPDUs.
- Learning: no reenvía, pero aprende MACs.
- Forwarding: reenvía tramas y aprende MACs.
- Disabled: administrativamente deshabilitado.

La convergencia de STP clásico tarda de 30 a 50 segundos.

**RSTP (Rapid STP, 802.1w):**
Converge en 2-3 segundos. Introduce roles alternativos: alternate port (respaldo del puerto raíz) y backup port (respaldo del puerto designado).

**MSTP (Multiple STP, 802.1s):**
Permite diferentes arboles de expansión para diferentes grupos de VLANs. Mejor distribución de carga en redes con múltiples VLANs.

### Problemas de seguridad con STP

**STP manipulation:**
Cualquier switch que conectes a la red puede convertirse en el switch raíz si tiene prioridad más baja. Un atacante puede conectar un switch con prioridad 0 y convertirse en la raíz, viendo y redirigiendo tráfico.

**BPDU Guard:**
Protege contra esto. Si un puerto con BPDU Guard habilitado recibe un BPDU, se deshabilita automáticamente (errdisable).

**Root Guard:**
Fuerza a un puerto a ser no designado. Si recibe BPDUs superiores (que indicarían que otro switch debería ser la raíz), el puerto se bloquea.

## VLANs: paredes virtuales

### Que es una VLAN

Una VLAN (Virtual LAN) divide un switch físico en múltiples redes lógicas. Dispositivos en diferentes VLANs no pueden comunicarse entre si sin pasar por un router.

Las VLANs se identifican por un número del 1 al 4094. Los números 1, 1002-1005 son reservados. Las VLANs 2-1001 son de uso general.

### Por qué usar VLANs

**Seguridad:**
Separas departamentos, servidores, invitados. El tráfico de una VLAN no es visible en otra.

**Rendimiento:**
Cada VLAN es un dominio de broadcast separado. Los broadcasts de una VLAN no afectan a las otras.

**Organización:**
Agrupas dispositivos por función sin importar su ubicación física. Un contable en el piso 5 y otro en el piso 3 pueden estar en la misma VLAN.

**Flexibilidad:**
Un dispositivo puede estar en cualquier puerto del switch y pertenecer a la VLAN correcta.

### Tipos de puertos VLAN

**Puerto de acceso (Access port):**
Pertenece a una sola VLAN. Se usa para conectar dispositivos finales. La trama que sale del puerto no tiene etiqueta VLAN.

Configuración en Cisco:
```
interface GigabitEthernet0/1
 switchport mode access
 switchport access vlan 10
```

**Puerto troncal (Trunk port):**
Transporta tráfico de múltiples VLANs. Se usa para conectar switches entre si, o switches con routers. Las tramas llevan una etiqueta 802.1Q.

Configuración en Cisco:
```
interface GigabitEthernet0/24
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30
```

### 802.1Q: el estándar de etiquetado

El estándar 802.1Q inserta una etiqueta de 4 bytes en la trama Ethernet:

```
| MAC Destino (6) | MAC Origen (6) | 802.1Q Tag (4) | Tipo (2) | Datos (46-1500) | FCS (4) |
```

El tag 802.1Q contiene:
- TPID (Tag Protocol Identifier): 2 bytes. Valor 0x8100. Identifica la trama como 802.1Q.
- TCI (Tag Control Information): 2 bytes.
  - PCP (Priority Code Point): 3 bits. Prioridad (0-7).
  - DEI (Drop Eligible Indicator): 1 bit. Indica si la trama puede descartarse en congestión.
  - VID (VLAN ID): 12 bits. Identifica la VLAN (0-4095).

El FCS (CRC) se recalcula después de insertar el tag. El tamaño máximo de la trama aumenta de 1518 a 1522 bytes.

### VLAN nativa

En un trunk, la VLAN nativa (por defecto VLAN 1, configurable con `switchport trunk native vlan`) no se etiqueta. Esto permite que dispositivos que no entienden 802.1Q puedan comunicarse a través del trunk.

La VLAN nativa es un riesgo de seguridad. Si el atacante esta en la VLAN nativa, puede enviar tramas sin etiqueta que serán aceptadas en el trunk.

Práctica recomendada: cambiar la VLAN nativa a un número no utilizado y no poner ningún dispositivo en ella.

### VLAN autovoice

Los switches Cisco pueden detectar automáticamente teléfonos IP y colocarlos en una VLAN de voz. El teléfono se configura vía CDP (Cisco Discovery Protocol) para usar la VLAN de voz.

### VTP (VLAN Trunking Protocol)

VTP permite que los switches compartan la configuración de VLANs. Un switch servidor propaga los cambios a los switches clientes.

Modos VTP:
- Server: puede crear, modificar y eliminar VLANs. Propaga los cambios.
- Client: recibe los cambios del servidor. No puede crear VLANs localmente.
- Transparent: no participa en VTP. Reenvía los anuncios pero no los procesa.

VTP es peligroso. Si conectas un switch con una revisión más alta de VTP, puede sobreescribir la configuración de VLANs de toda la red.

Práctica recomendada: no usar VTP. Configurar VLANs manualmente en cada switch.

### DTP (Dynamic Trunking Protocol)

DTP negocia automáticamente si un puerto debe ser access o trunk.

Modos DTP:
- Dynamic auto: no negocia activamente, pero acepta si el otro lado pide trunk.
- Dynamic desirable: negocia activamente para formar un trunk.
- Trunk: el puerto es trunk siempre.
- Access: el puerto es access siempre.

Si DTP esta habilitado en modo dynamic auto o desirable, un atacante puede conectar su dispositivo y negociar un trunk, obteniendo acceso a todas las VLANs.

Práctica recomendada: deshabilitar DTP en todos los puertos de acceso:
```
interface GigabitEthernet0/1
 switchport nonegotiate
```

## Seguridad de puertos (Port Security)

Port Security limita cuántas MACs pueden aprender un puerto y que pasa si se excede.

Configuración básica:
```
interface GigabitEthernet0/1
 switchport port-security
 switchport port-security maximum 2
 switchport port-security violation restrict
 switchport port-security mac-address sticky
```

Opciones de violation:
- protect: descarta tráfico de MACs no autorizadas, no registra nada.
- restrict: descarta tráfico, registra el evento (SNMP trap, syslog).
- shutdown: deshabilita el puerto (errdisable). Es la acción por defecto.

Sticky learning: el switch aprende las MACs de los primeros dispositivos y las guarda en la configuración en ejecución como direcciones MAC autorizadas.

Port Security protege contra MAC flooding: el atacante no puede enviar miles de MACs falsas porque el puerto solo permite un número limitado.

## DHCP Snooping

DHCP Snooping filtra los mensajes DHCP basándose en la confiabilidad del puerto.

Configuración básica:
```
ip dhcp snooping
ip dhcp snooping vlan 10,20,30
interface GigabitEthernet0/1
 ip dhcp snooping trust
interface GigabitEthernet0/2
 ip dhcp snooping limit rate 10
```

- Puertos confiables (trust): conectados al servidor DHCP. Se permiten mensajes DHCPOFFER, DHCPACK, DHCPNAK.
- Puertos no confiables: conectados a clientes. Solo se permiten DHCPDISCOVER y DHCPREQUEST. Los mensajes de servidor se descartan.
- Rate limiting: limita cuántos DHCPDISCOVER por segundo puede enviar un puerto no confiable. Previene DHCP starvation.

## Dynamic ARP Inspection (DAI)

DAI verifica las respuestas ARP interceptándolas y verificando que la IP y MAC coinciden con la base de datos de DHCP Snooping.

Configuración básica:
```
ip arp inspection vlan 10,20,30
interface GigabitEthernet0/1
 ip arp inspection trust
```

DAI previene ARP spoofing. Si un atacante envía una respuesta ARP falsa (diciendo "192.168.1.1 esta en mi MAC"), DAI la descarta porque la MAC del atacante no coincide con la MAC asociada a 192.168.1.1 en el bind de DHCP Snooping.

## IP Source Guard

IP Source Guard filtra el tráfico basándose en la IP y MAC del origen. Solo permite tráfico de las IPs y MACs autorizadas.

```
interface GigabitEthernet0/2
 ip verify source port-security
```

Esto protege contra IP spoofing. Un atacante no puede enviar paquetes con IPs falsas porque el switch los descarta.

## ACLs: Listas de Control de Acceso

### Que es una ACL

Una ACL es una lista secuencial de reglas aplicada a un router o switch. Cada regla específica un criterio y una acción (permitir o denegar).

Las ACLs se evalúan en orden. La primera regla que coincida determina el resultado. Si ninguna coincide, hay una denegación implícita al final.

### Tipos de ACL

**ACL estándar (1-99, 1300-1999):**
Solo filtra por IP de origen. Se aplican cerca del destino.

```
access-list 10 permit 192.168.1.0 0.0.0.255
access-list 10 deny any
```

**ACL extendida (100-199, 2000-2699):**
Filtra por IP origen, IP destino, protocolo, puerto origen, puerto destino.

```
access-list 100 permit tcp 192.168.1.0 0.0.0.255 host 10.0.0.10 eq 443
access-list 100 deny ip any any
```

**ACL nombrada:**
Usa un nombre en lugar de un número.

```
ip access-list extended BLOQUEAR_SSH
 deny tcp any host 10.0.0.10 eq 22
 permit ip any any
```

### Wildcard masks

Las ACLs usan wildcard masks en lugar de máscaras de subred.

- 0: el bit debe coincidir
- 1: el bit puede ser cualquier valor

Wildcard mask para 192.168.1.0/24: 0.0.0.255
Wildcard mask para 10.0.0.0/8: 0.255.255.255
Wildcard mask para un host: 0.0.0.0 (o la palabra "host")

```
access-list 10 permit host 192.168.1.10
access-list 10 permit 192.168.1.0 0.0.0.255
```

### Dónde aplicar las ACLs

**Inbound:**
El paquete se evalúa antes de ser enrutado. Es más eficiente porque descarta paquetes antes de procesarlos.

```
interface GigabitEthernet0/1
 ip access-group 100 in
```

**Outbound:**
El paquete se evalúa antes de salir del router.

```
interface GigabitEthernet0/2
 ip access-group 100 out
```

### La denegación implícita

Toda ACL tiene una regla implícita al final: `deny any any`. Si creas una ACL con una sola regla que permite SSH, el resto del tráfico es implícitamente denegado.

Siempre debes considerar la denegación implícita. Es la causa más común de errores con ACLs.

### Orden de las reglas

El orden es crítico. La ACL se evalúa de arriba a abajo. La primera coincidencia se aplica.

**Bien:**
1. Permitir al administrador acceso SSH
2. Denegar a todos SSH
3. Permitir todo lo demás

**Mal:**
1. Denegar todo el tráfico TCP
2. Permitir al administrador acceso SSH (nunca se evalúa porque la regla 1 deniega todo antes)

### ACLs reflexivas

Crean entradas temporales permitiendo el tráfico de retorno de conexiones iniciadas internamente.

```
ip access-list extended SALIDA
 permit tcp 192.168.1.0 0.0.0.255 any reflect TRAFICO_INTERNO
ip access-list extended ENTRADA
 evaluate TRAFICO_INTERNO
 deny ip any any
```

### ACLs dinámicas (lock-and-key)

Permiten que un usuario se autentique y luego se le aplique una ACL temporal.

```
username operador password temp123
!
interface GigabitEthernet0/1
 ip access-group 101 in
!
access-list 101 permit tcp any host 10.0.0.10 eq telnet
!
line vty 0 4
 login local
 autocommand access-enable host timeout 10
```

El usuario se conecta por Telnet al router, se autentica, y se crea una entrada temporal en la ACL permitiendo su acceso.

### ACLs de capa 2 (MAC ACLs)

Algunos switches permiten filtrar por direcciones MAC.

```
mac access-list extended BLOQUEAR_MAC
 deny host 0001.0001.0001 any
 permit any any
!
interface GigabitEthernet0/1
 mac access-group BLOQUEAR_MAC in
```

### ACLs de VLAN (VLAN ACLs - VACL)

Filtran el tráfico dentro de una VLAN, no solo en la interfaz del router.

```
vlan access-map MAPA_VLAN 10
 match ip address 100
 action forward
vlan access-map MAPA_VLAN 20
 action drop
!
vlan filter MAPA_VLAN vlan-list 10
```

### Modos de fallo de ACLs

**Permisividad excesiva:**
Reglas demasiado generales: `permit tcp any any` en lugar de `permit tcp host X host Y eq 80`.

**Orden incorrecto:**
Una regla de denegar todo antes de las reglas de permitir específicas anula el propósito.

**No considerar tráfico de retorno:**
Permites tráfico saliente pero bloqueas el retorno. Las conexiones no funcionan.

**Falta de actualización:**
La ACL se configuró hace años. Nuevos servidores, nuevas redes, y la ACL bloquea tráfico que debería estar permitido.

**Logging deshabilitado:**
No tráfico se esta denegando. No puedes diagnosticar problemas ni detectar ataques.

## Segmentación de red: diseño práctico

Una red bien segmentada tiene múltiples capas de protección:

**VLAN de servidores:**
Solo accesible desde VLANs autorizadas. Cada servidor tiene su propio segmento si es crítico.

**VLAN de gestión:**
Para administrar switches, routers, y otros equipos de red. Aislada de todo tráfico de usuario.

**VLAN de usuarios:**
Segmentada por departamento: Finanzas, RH, IT, cada uno en su VLAN.

**VLAN de invitados:**
Solo internet. Sin acceso a recursos internos. Autenticación por portal cautivo.

**VLAN de dispositivos IoT:**
Cámaras, sensores, controladores de acceso. No deben hablar con otras VLANs.

Cada VLAN tiene su propia subred. Las ACLs controlan el tráfico entre VLANs usando el router como punto de control.

## Casos reales

### VLAN hopping por DTP habilitado

Una empresa tenía DTP en modo dynamic desirable en todos los puertos de acceso. Un auditor de seguridad conecto su laptop, y al configurar su interfaz de red en modo trunk, el switch negocio un trunk automáticamente. El auditor pudo ver el tráfico de todas las VLANs de la empresa.

La vulnerabilidad no requería herramientas sofisticadas. Solo una laptop con una tarjeta de red que soportara 802.1Q y software para habilitar el trunking.

### MAC flooding contra una red corporativa

Un atacante dentro de la red ejecutó macof contra el switch del lobby. En segundos, el switch lleno su tabla MAC y empezó a inundar tráfico por todos los puertos. El atacante pudo ver el tráfico de todos los dispositivos conectados a ese switch.

La empresa no tenía Port Security configurado. Después del incidente, implementaron Port Security con un máximo de 2 MACs por puerto y shutdown automático.

### ACL bloqueando toda la empresa

Un administrador agregó una ACL a la interfaz WAN del router para bloquear una IP específica. La ACL tenía el orden incorrecto:

```
access-list 101 deny ip any any
access-list 101 permit ip host 192.168.1.10 any
```

La regla 1 denegaba todo el tráfico. La regla 2 nunca se evaluaba. Toda la empresa perdió acceso a internet durante 30 minutos hasta que diagnosticaron el error.

### ARP spoofing mitigado por DAI

Una universidad implementó DAI en todos sus switches de campus. Un estudiante intento ARP spoofing contra el gateway de su VLAN. DAI detecto que la MAC en la respuesta ARP no coincidía con la MAC registrada por DHCP Snooping. El switch descarto la respuesta ARP falsa.

El estudiante no pudo interceptar el tráfico de sus compañeros. DAI bloqueo el ataque sin intervención humana.

## Autoevaluación

1. Configuras una VLAN 20 para el departamento de finanzas y una VLAN 30 para recursos humanos. Un empleado de RH necesita enviar un archivo a un servidor en la VLAN de finanzas. Que necesitas para que esto sea posible? Describe los dispositivos y configuraciones necesarias.

2. Un atacante conecta su laptop a un puerto del switch en modo dynamic desirable. El switch tiene DTP habilitado. Que ocurre y que información puede obtener el atacante? Como se mitiga específicamente?

3. Explica el ataque de doble etiquetado (double tagging) para VLAN hopping. Por qué la VLAN nativa es relevante para este ataque y como se mitiga?

4. Configuras una ACL con las siguientes reglas en orden:
   - Regla 1: Denegar todo el tráfico TCP
   - Regla 2: Permitir tráfico TCP desde 10.0.0.10 al puerto 443
   - Regla 3: Denegar todo

   Que tráfico será permitido y por qué? Que tráfico adicional esperarías que pasará si la regla 1 no existiera?

5. Que función cumple STP en una red con switches redundantes? Si un atacante conecta un switch con prioridad 0 a la red, que ocurre y como se protege el administrador contra esto?

6. Cual es la diferencia entre un puerto de acceso y un puerto troncal en un switch? Explica el proceso de etiquetado 802.1Q en cada caso.

7. Un switch tiene su tabla MAC llena por un ataque de MAC flooding. Como cambia el comportamiento del switch? Por qué esto permite al atacante ver tráfico que no le esta dirigido? Que mitigación usarías?

8. Que es la denegación implícita en una ACL? Explica por qué el orden de las reglas es crítico y que error común cometen los administradores al configurar ACLs por primera vez.

9. Explica la diferencia entre DHCP Snooping y Dynamic ARP Inspection. Como se complementan para proteger la red contra ataques de capa 2?

10. Diseña la segmentación para un edificio de 10 pisos con 100 empleados por piso, donde hay servidores críticos en el piso 1, equipos de IT en el piso 2, y el resto son usuarios de diferentes departamentos. Que VLANs crearías, que IPs asignarías, y que ACLs configurarías?
