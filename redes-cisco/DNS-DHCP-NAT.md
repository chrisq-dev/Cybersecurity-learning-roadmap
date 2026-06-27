---
title: "DNS, DHCP y NAT: Los servicios que mantienen internet funcionando y como se rompen"
---

# DNS, DHCP y NAT: Los servicios que mantienen internet funcionando y como se rompen

## Objetivo de esta guía

Si las direcciones IP son el GPS y los routers son las carreteras, DNS, DHCP y NAT son los empleados invisibles que hacen que todo funcione sin que tengas que configurar nada manualmente.

DNS te permite escribir "google.com" en lugar de "142.250.190.46". DHCP te asigna una IP automáticamente cuando te conectas a una red. NAT permite que 20 dispositivos en tu casa compartan una sola IP pública.

Estos tres servicios son atacados constantemente porque están en la base de la comunicación. Si un atacante compromete tu DNS, puede redirigirte a sitios falsos. Si compromete tu DHCP, puede interceptar todo tu tráfico. Si compromete tu NAT, puede acceder a dispositivos internos que deberían estar protegidos.

## DNS: el directorio telefónico de internet

### Que es y por que existe

Las computadoras no entienden nombres. Entienden números. Cuando escribes "facebook.com" en tu navegador, tu computadora necesita saber la dirección IP de Facebook para poder enviar el paquete. DNS hace esa traducción.

El sistema DNS es una base de datos distribuida a nivel mundial. Ningún servidor tiene toda la información. En lugar de eso, los servidores se preguntan unos a otros hasta encontrar la respuesta.

### Como funciona la resolución DNS

Cada vez que escribes una URL, tu computadora hace una llamada telefónica a un directorio telefónico gigante y distribuido.

Hay dos tipos de resolución DNS: recursiva e iterativa.

**Resolución recursiva:**
Tu computadora le pregunta a un servidor DNS recursivo (el de tu provedor de internet, o 8.8.8.8). Ese servidor se encarga de hacer todas las consultas necesarias hasta obtener la respuesta y te la devuelve.

**Resolución iterativa:**
Un servidor DNS le pregunta a otro, y ese le responde con una referencia a otro servidor. Es como preguntar "donde esta la calle X?" y que te digan "pregunta en la central de correos", y ahí te digan "pregunta en la oficina del distrito", y ahí finalmente te den la dirección.

En la práctica, tu computadora usa resolución recursiva con su servidor DNS local. El servidor local usa resolución iterativa con los servidores raíz, TLD y autoritativos.

### La jerarquía completa de DNS

**Servidores raíz:**
Hay 13 grupos de servidores raíz (identificados con letras A a M). Están gestionados por diferentes organizaciones: Verisign (A, J), USC-ISI (B), Cogent (C), UMaryland (D), NASA (E), ISC (F), DoD (G), US Army (H), Netnod (I), RIPE (K), ICANN (L), WIDE (M).

No hay 13 servidores físicos. Cada grupo tiene cientos de servidores distribuidos geograficamente usando anycast. Cuando preguntas por un servidor raíz, llegas al más cercano.

Estos servidores no saben donde esta "facebook.com". Saben donde están los servidores de dominio de alto nivel (TLD).

**Servidores TLD:**
Gestionan los dominios de alto nivel: .com, .org, .net, .edu, .gov, .mil, y los ccTLD como .mx, .es, .ar, .br.

Hay dos tipos de TLD:
- gTLD (generic TLD): .com, .org, .net, .info, etc.
- ccTLD (country code TLD): .mx, .es, .ar, .uk, .jp, etc.

**Servidores autoritativos:**
Son los servidores que tienen la información real de un dominio. Cuando registras "midominio.com", configuras los servidores autoritativos que responden por ese dominio.

### Tipos de registros DNS

**A (Address):** Mapea un nombre a una dirección IPv4.
```
ejemplo.com.  IN  A  93.184.216.34
```

**AAAA (IPv6 Address):** Mapea un nombre a una dirección IPv6.
```
ejemplo.com.  IN  AAAA  2606:2800:220:1:248:1893:25c8:1946
```

**CNAME (Canonical Name):** Alias de un nombre a otro nombre.
```
www.ejemplo.com.  IN  CNAME  ejemplo.com.
```

**MX (Mail Exchange):** Servidores de correo para un dominio.
```
ejemplo.com.  IN  MX  10 mail.ejemplo.com.
ejemplo.com.  IN  MX  20 backupmail.ejemplo.com.
```
El número es la prioridad. Menor número = mayor prioridad.

**NS (Name Server):** Servidores DNS autoritativos para un dominio.
```
ejemplo.com.  IN  NS  ns1.ejemplo.com.
ejemplo.com.  IN  NS  ns2.ejemplo.com.
```

**TXT (Text):** Datos de texto arbitrarios. Se usa para:
- SPF (Sender Policy Framework): que servidores pueden enviar correo en nombre del dominio
- DKIM (DomainKeys Identified Mail): firma de correos
- DMARC (Domain-based Message Authentication): políticas de verificación
- Verificación de propiedad del dominio (Google, Microsoft)

**PTR (Pointer):** Resolución inversa. Mapea una IP a un nombre.
```
34.216.184.93.in-addr.arpa.  IN  PTR  ejemplo.com.
```

**SOA (Start of Authority):** Información administrativa del dominio. Incluye el servidor primario, el email del administrador, y temporizadores de refresco.

### TTL y caché

El TTL define cuanto tiempo un servidor DNS guarda un registro en caché antes de consultar de nuevo.

TTL comunes:
- 300 (5 minutos): para cambios frecuentes (balanceo de carga, failover)
- 3600 (1 hora): valor por defecto común
- 86400 (24 horas): para registros que cambian poco
- 604800 (7 dias): máximo recomendado

Si cambias la IP de tu servidor web y el TTL es de 24 horas, los usuarios pueden tardar un día entero en ver el cambio. Por eso, antes de un cambio planeado, se reduce el TTL a 300 durante dias, se hace el cambio, y luego se restaura el TTL original.

### Tipos de consultas DNS

**Consulta directa (forward lookup):** Nombre a IP. Es la más común.

**Consulta inversa (reverse lookup):** IP a nombre. Se usa para verificar que un servidor es quien dice ser. Los servidores de correo suelen hacer consultas inversas para verificar el origen del correo.

**Consulta recursiva:** El servidor DNS hace todas las consultas necesarias y devuelve la respuesta final.

**Consulta iterativa:** El servidor DNS devuelve la mejor respuesta que tiene, o una referencia a otro servidor.

### Mensajes DNS

Las consultas y respuestas DNS usan un formato de mensaje común:

```
+-------------------------------+
| Encabezado (12 bytes)          |
+-------------------------------+
| Pregunta (variable)            |
+-------------------------------+
| Respuesta (variable)           |
+-------------------------------+
| Autoridad (variable)           |
+-------------------------------+
| Adicional (variable)           |
+-------------------------------+
```

El encabezado contiene:
- ID de transacción: 16 bits, correlaciona consultas con respuestas
- Flags: QR (consulta/respuesta), Opcode, AA (respuesta autoritativa), TC (truncado), RD (recursion deseada), RA (recursion disponible), RCODE (codigo de respuesta)
- Preguntas, respuestas, autoridad, adicionales: contadores

### DNS sobre TCP vs UDP

DNS usa UDP por defecto en el puerto 53. Pero si la respuesta es mayor de 512 bytes (con DNSSEC o registros grandes), se usa TCP.

Las transferencias de zona (copiar la base de datos DNS entre servidores) siempre usan TCP.

### DNSSEC: DNS Security Extensions

DNS no tiene seguridad inherente. No hay forma de verificar que la respuesta a una consulta es legítima. DNSSEC añade firmas digitales a los registros DNS.

Como funciona:
1. El servidor autoritativo firma cada registro con una clave privada.
2. El servidor recursivo verifica la firma con la clave pública del dominio.
3. La clave pública del dominio esta firmada por la clave del TLD.
4. La clave del TLD esta firmada por la clave raíz.
5. Esto forma una cadena de confianza desde la raíz hasta el dominio.

DNSSEC no cifra las consultas. Solo verifica que las respuestas no han sido modificadas. Para privacidad de las consultas, existe DNS sobre HTTPS (DoH) y DNS sobre TLS (DoT).

### Como se ataca DNS

**DNS Spoofing:**
El atacante intercepta la consulta DNS y responde antes que el servidor legítimo. Como DNS usa UDP (sin conexion, sin verificación), el primer paquete que llega es aceptado.

Mitigación: DNSSEC (firma las respuestas), aleatorizar el puerto origen y el ID de transacción.

**Caché Poisoning:**
El atacante inyecta registros DNS falsos en la caché del servidor DNS recursivo. Si logra que el servidor almacene "banco.com = IP del atacante", todos los usuarios del servidor serán redirigidos.

El ataque clásico es el de Kaminsky (2008): el atacante envía múltiples consultas por un dominio inexistente y respuestas falsas, esperando que una de las respuestas falsas coincida con el ID de transacción de la consulta.

**Tunneling DNS:**
DNS permite enviar datos en las consultas y respuestas. Un atacante puede codificar datos en consultas DNS para exfiltrar información. Por ejemplo, codifica "datos_robados" como "datos_robados.ejemplo.com" y la consulta DNS llega al servidor del atacante.

Como el tráfico DNS suele estar permitido por los firewalls, es un canal de salida ideal que muchas organizaciones no monitorean.

**Ataque a servidores raíz:**
En teoría, un DDoS contra los 13 servidores raíz podría derribar internet. En la práctica, los servidores raíz están distribuidos en cientos de servidores físicos (anycast) y son extremadamente resilientes.

**Domain squatting y typo-squatting:**
El atacante registra dominios similares a dominios legítimos: g00gle.com, facebok.com, microsft.com. Los usuarios que escriben mal la URL terminan en el sitio del atacante.

### Modos de fallo de DNS

**Servidor DNS no responde:**
El servidor DNS configurado esta caído. Los nombres no se resuelven. Ping a IPs funciona, navegar no.

**Registro incorrecto:**
Un registro A apunta a la IP equivocada. O un registro MX apunta a un servidor de correo que no existe.

**TTL mal configurado:**
Un TTL muy alto (dias) hace que los cambios tarden en propagarse. Un TTL muy bajo (segundos) genera muchas consultas y carga en los servidores.

**Delegacion rota:**
Los servidores NS configurados en el registro del dominio no coinciden con los servidores que realmente tienen los registros. El dominio no se resuelve.

**Dominio expirado:**
No renuevas el dominio. Alguien más lo compra. Puede recibir el correo destinado a tu empresa.

## DHCP: el recepcionista automático

### Que es y por que existe

DHCP (Dynamic Host Configuration Protocol) asigna direcciones IP, máscaras de subred, gateway predeterminado y servidores DNS a los dispositivos cuando se conectan a una red.

Sin DHCP, tendrías que configurar cada dispositivo manualmente con una IP única, máscara, gateway y DNS. En una red de 100 dispositivos, es inviable.

### El proceso DORA en detalle

**Discover (D):**
El cliente envía un paquete DHCPDISCOVER. Es un broadcast UDP (MAC destino FF:FF:FF:FF:FF:FF, IP destino 255.255.255.255, puerto 67). Dice basicamente "hay alguien que me asigne una IP?"

**Offer (O):**
Los servidores DHCP que reciben el Discover responden con DHCPOFFER. Incluyen:
- Una dirección IP propuesta
- Máscara de subred
- Gateway predeterminado
- Servidores DNS
- Duracion del lease
- Otras opciones DHCP

**Request (R):**
El cliente responde con DHCPREQUEST. Confirma que acepta la oferta. Este mensaje también es broadcast, para informar a otros servidores DHCP que no necesitan sus ofertas.

**Acknowledge (A):**
El servidor envía DHCPACK, confirmando que la IP ha sido asignada y que el cliente puede usarla.

### Opciones DHCP

DHCP permite incluir opciones adicionales en los mensajes. Las más importantes:

- Option 1: Máscara de subred
- Option 3: Router (gateway predeterminado)
- Option 6: Servidores DNS
- Option 15: Nombre de dominio
- Option 42: Servidores NTP
- Option 43: Información específica del provedor
- Option 66: Servidor TFTP (para teléfonos IP)
- Option 121: Rutas estaticas sin clase
- Option 150: Servidor TFTP (Cisco)

### El lease DHCP

La asignación de IP no es permanente. Tiene un tiempo de concesión (lease). Por defecto suele ser 24 horas.

**Renovacion:**
- A los 50% del lease: el cliente intenta renovar con DHCPREQUEST directamente al servidor.
- Si no recibe respuesta a los 87.5%: el cliente vuelve a hacer Discover (broadcast).
- Si falla: la IP expira y el cliente pierde conectividad.

**Liberacion:**
El cliente puede enviar DHCPRELEASE para liberar la IP antes de que expire.

### Reservas DHCP

Configuras el servidor DHCP para que siempre asigne la misma IP a un dispositivo basándote en su dirección MAC.

Esto es útil para servidores, impresoras, y otros dispositivos que necesitan IP fija pero sin configuración manual.

### DHCP Relay Agent

Si los clientes y el servidor DHCP están en diferentes subredes, los broadcasts de Discover no cruzan el router. El DHCP Relay Agent (ip helper-address en Cisco) reenvia los mensajes DHCP entre subredes.

### Como se ataca DHCP

**DHCP Starvation:**
El atacante envía cientos de DHCPDISCOVER con direcciones MAC falsas. El servidor DHCP asigna IPs a todas. Eventualmente, el pool se agota. Los clientes legítimos no pueden obtener IP.

Herramientas: yersinia, dhcpstarv, metasploit.

Mitigación: DHCP snooping en el switch. El switch solo permite respuestas DHCP desde puertos confiables (donde esta el servidor DHCP real). Las solicitudes desde puertos no confiables tienen un rate-limit.

**Rogue DHCP Server:**
El atacante conecta su propio servidor DHCP en la red. Cuando los clientes envían Discover, el servidor del atacante responde antes que el legítimo. Puede asignar:
- Gateway falso: todo el tráfico pasa por el atacante
- DNS falsos: las consultas DNS van al atacante
- IPs con máscaras que crean problemas

Mitigación: DHCP snooping identifica puertos confiables y descarta ofertas DHCP desde puertos no confiables.

**DHCP Spoofing:**
Similar al rogue server, pero más sutil. El atacante espera pasivamente las solicitudes y solo responde cuando le interesa.

### Modos de fallo de DHCP

**Pool agotado:**
Más dispositivos que direcciones disponibles. Los nuevos dispositivos no se conectan. Común en redes mal planificadas o bajo ataque de starvation.

**Servidor DHCP caído:**
Ningún dispositivo nuevo puede conectarse. Los existentes funcionan hasta que expire su lease.

**Conflicto de IP:**
Dos dispositivos con la misma IP. Ocurre cuando:
- Dos servidores DHCP asignan la misma IP
- Una IP estática esta dentro del rango DHCP
- Un lease expira y la IP se reasigna mientras el dispositivo original sigue conectado

El sintoma es intermitente: a veces funciona, a veces no.

**Opacidad de opciones:**
Configuras una opción incorrecta (por ejemplo, Option 150 mal formateada para teléfonos IP) y los dispositivos no reciben la configuración que necesitan.

## NAT: el traductor que salvo IPv4

### Que es y por que existe

NAT (Network Address Translation) permite que múltiples dispositivos con IPs privadas compartan una sola IP pública.

IPv4 tiene 4,294,967,296 direcciones. El mundo tiene más dispositivos que eso. Sin NAT, no habría suficientes direcciones.

### Como funciona NAT (PAT)

El router tiene una IP pública en su interfaz WAN y una IP privada en su interfaz LAN.

Cuando un dispositivo interno (192.168.1.10) quiere acceder a internet:

1. El dispositivo envía el paquete:
   - Origen: 192.168.1.10:puerto_aleatorio
   - Destino: IP_servidor:puerto_servicio

2. El router recibe el paquete:
   - Cambia el origen a su IP pública:puerto_aleatorio_del_router
   - Registra la traducción en su tabla NAT:
     - Interno: 192.168.1.10:puerto_aleatorio
     - Externo: IP_publica:puerto_aleatorio_del_router

3. El servidor recibe el paquete y responde:
   - Origen: IP_servidor:puerto_servicio
   - Destino: IP_publica:puerto_aleatorio_del_router

4. El router recibe la respuesta:
   - Busca en su tabla NAT
   - Cambia el destino a 192.168.1.10:puerto_aleatorio
   - Reenvia el paquete interno

Sin la tabla NAT, el router no sabria a que dispositivo interno entregar la respuesta.

### Tipos de NAT

**NAT estático:**
Traducción uno a uno. Una IP privada se traduce siempre a la misma IP pública.

Configuración en Cisco:
```
ip nat inside source static 192.168.1.10 203.0.113.10
```

No ahorra IPs públicas. Se usa para que un servidor interno sea accesible desde internet.

**NAT dinámico:**
Traducción de un pool de IPs privadas a un pool de IPs públicas. Cuando un dispositivo interno sale, toma la primera IP pública disponible del pool.

**PAT (Port Address Translation):**
Es el NAT que usan los routers caseros. También se llama NAT overloading o IP masquerading. Traduce muchas IPs privadas a una sola IP pública usando diferentes puertos.

### NAT y el tráfico entrante

Por defecto, NAT solo permite tráfico que se origina en la red interna. El tráfico entrante iniciado desde internet no tiene entrada en la tabla NAT, por lo que es descartado.

Para hacer un servidor interno accesible desde internet, necesitas reenviar puertos (port forwarding):
```
ip nat inside source static tcp 192.168.1.10 80 203.0.113.10 80
```

Esto crea una entrada permanente en la tabla NAT: todo el tráfico a la IP pública puerto 80 se redirige al servidor interno.

### NAT como barrera de seguridad

NAT no fue diseñado como mecanismo de seguridad, pero lo es. Los dispositivos detrás de NAT son invisibles desde internet. Un atacante no puede iniciar una conexion contra tu laptop si esta detrás de NAT.

Pero NAT no es un firewall:
- No inspecciona el contenido de los paquetes
- No bloquea tráfico malicioso dentro de conexiones permitidas
- No protege contra ataques de capa 7

### Problemas con NAT

**Protocolos que llevan IP en los datos:**
Algunos protocolos incluyen direcciones IP en los datos de la aplicación (no solo en los encabezados). FTP, SIP, H.323 son ejemplos.

Cuando un cliente FTP detrás de NAT envía "PORT 10,0,0,10,4,210" (diciendo "conéctate a mi IP 10.0.0.10 puerto 1234"), el servidor externo no puede conectar porque 10.0.0.10 no es enrutable.

La solución es el ALG (Application Layer Gateway) que analiza el tráfico de estos protocolos y modifica las IPs internas en los datos.

**NAT y VPN:**
Los protocolos VPN como IPsec tienen problemas con NAT porque:
- IPsec en modo transporte no puede atravesar NAT (el checksum se inválida al cambiar la IP)
- NAT modifica los paquetes, rompiendo la integridad que IPsec verifica

La solución es NAT-T (NAT Traversal), que encapsula IPsec dentro de UDP.

**Tabla NAT llena:**
Los routers tienen un límite de traducciones simultaneas. Si hay muchas conexiones, la tabla se llena y nuevas conexiones fallan.

**Hairpinning:**
Un dispositivo interno intenta acceder a otro dispositivo interno usando la IP pública externa. El router debe soportar NAT hairpinning para que esto funcione.

### Como se evade NAT

**UPnP (Universal Plug and Play):**
Permite a los dispositivos internos abrir puertos en el router automáticamente. Es cómodo pero peligroso: un malware en tu red puede abrir un puerto sin que lo sepas.

**Tunneling:**
Protocolos como SSH, VPN o DNS tunneling crean canales de comunicación que atraviesan NAT. Si un dispositivo interno inicia un túnel hacia un servidor externo, el servidor puede enviar tráfico de vuelta a través del túnel.

**STUN/TURN/ICE:**
Protocolos usados por aplicaciones de tiempo real (WebRTC, VoIP) para descubrir la IP pública detrás de NAT y establecer conexiones directas entre pares.

## Casos reales

### DNS hijacking en routers de Latinoamerica

Miles de routers en varios países de Latinoamerica fueron comprometidos. El atacante accedia a los routers usando contraseñas por defecto (admin/admin) y cambiaba la configuración DNS. Cuando los usuarios escribian la URL de su banco, eran redirigidos a sitios falsos.

El ataque funciono durante semanas. Los bancos detectaron un aumento en reclamos de cuentas comprometidas. La investigación revelo que los routers tenían el acceso remoto habilitado y contraseñas por defecto.

### Rogue DHCP en un hotel

Un huésped en un hotel configuró su laptop como servidor DHCP. Cuando otros huespedes se conectaban al Wi-Fi, recibian una configuración donde el gateway era la laptop del atacante. Todo el tráfico pasaba por alli.

El atacante capturo credenciales de correo electrónico, bancos y redes sociales. El hotel no tenía DHCP snooping configurado en sus switches.

### Agotamiento de tabla NAT en un ISP

Un provedor de internet de banda ancha tenía routers que soportaban hasta 100,000 traducciones NAT simultaneas. Un cliente infectado con un malware que generaba miles de conexiones por segundo agoto la tabla NAT del router compartido.

Otros clientes del mismo router no podían navegar. El ISP tuvo que implementar rate-limiting por cliente y aumentar la memoria de tablas NAT.

### Bypass de NAT en ataques a IoT

Un atacante escaneo internet en busca de dispositivos IoT (cámaras, routers, DVRs) con UPnP habilitado. Mediante UPnP, los dispositivos abrian puertos en el router que permitian el acceso remoto. El atacante encontró miles de dispositivos accesibles desde internet.

## Autoevaluación

1. Puedes hacer ping a 8.8.8.8 pero no puedes resolver google.com. Que servicio esta fallando? Como lo confirmarias con comandos? Que información esperarias ver en cada comando?

2. Explica el proceso DORA de DHCP. Que ocurre en cada paso específicamente a nivel de paquetes (tipo de mensaje, direcciones MAC y IP, puertos)?

3. Un atacante conecta un servidor DHCP rogue en una red con DHCP snooping deshabilitado. Que información falsa puede distribuir y que puede lograr con cada una?

4. Como funciona NAT/PAT? Explica el proceso completo desde que un dispositivo interno envía un paquete hasta que recibe la respuesta, incluyendo el contenido de la tabla NAT.

5. Un empleado no puede conectarse a internet. Su computadora muestra una IP 169.254.x.x. Que significa esto? Que proceso de asignación de IPs fallo y por que aparece ese rango específico?

6. Que es DNSSEC y que problema de seguridad resuelve específicamente? Explica la cadena de confianza desde la raíz hasta el dominio.

7. Explica la diferencia entre NAT estático, NAT dinámico y PAT. En que escenario de la vida real usarías cada uno?

8. Que es DHCP snooping y como previene los ataques de rogue DHCP server? Que diferencia hay entre un puerto confiable y uno no confiable en este contexto?

9. Que es el tunneling DNS y como puede un atacante usarlo para exfiltrar datos? Por que es difícil de bloquear en una red corporativa?

10. Un protocolo como FTP incluye la dirección IP en los datos de la aplicación. Que problema causa esto con NAT y como lo resuelve un ALG?
