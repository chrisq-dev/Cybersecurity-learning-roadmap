# Fundamentos de Redes

## Objetivo

Entender como se comunican los equipos y por que redes es una base obligatoria para ciberseguridad.

Si no entiendes redes, vas a depender de herramientas sin entender que están haciendo. Redes te permite interpretar escaneos, logs, firewalls, tráfico web, conexiones sospechosas, movimiento lateral, exposición de servicios, DNS malicioso, conexiones de malware y errores de configuración.

Esta guía busca que puedas ver una conexión y explicar:

- Quien inicia;
- Hacia donde va;
- Por que puerto;
- Con que protocolo;
- Que infraestructura atraviesa;
- Si la comunicación es esperada;
- Que evidencia permite comprobarlo.

## Modelo Mental Básico

```text
aplicacion -> puerto -> protocolo -> IP -> red local -> gateway -> internet -> destino
```

Cuando investigas un problema de seguridad, casi siempre necesitas contestar:

- Qué equipo inicio la comunicación?
- A qué IP o dominio se conecto?
- Qué puerto uso?
- Qué protocolo uso?
- La conexión era esperada?
- Paso por firewall, proxy, VPN o NAT?
- Hay logs qué lo demuestren?

## Red Local e Internet

Una red local conecta dispositivos dentro de un mismo entorno: casa, oficina, laboratorio, nube privada o segmento virtual.

Internet es una red de redes. Para llegar a un destino externo, tu equipo normalmente envia tráfico al gateway, y de ahi el tráfico cruza otros routers hasta llegar al destino.

Ejemplo:

```text
tu laptop -> router local -> proveedor -> internet -> servidor destino
```

En seguridad, esta diferencia importa porque:

- El tráfico local puede moverse lateralmente;
- El tráfico externo puede indicar acceso a servicios públicos;
- Un firewall puede permitir local pero bloquear internet;
- Una VPN puede cambiar la ruta;
- NAT puede ocultar IPs internas detras de una IP pública.

## Flujo Mental: Abrir una Página Web

Cuando visitas `https://example.com`, ocurre algo parecido a esto:

1. El navegador revisa si ya conoce la IP en cache.
2. Si no la conoce, pregunta a DNS.
3. El equipo decide si el destino está en su red local o debe ir al gateway.
4. Se establece conexión TCP con el servidor.
5. Se negocia TLS para cifrar la comunicación.
6. Se envia una petición HTTP.
7. El servidor responde.
8. El navegador interpreta la respuesta.

Este flujo permite ubicar fallas:

- Si DNS falla, el nombre no resuelve.
- Si el gateway falla, no sales de tu red.
- Si TCP falla, no se establece conexión.
- Si TLS falla, hay problema de certificado, versión, inspeccion o configuración.
- Si HTTP falla, el servidor respondio pero la aplicación tuvo un problema.

## Dirección IP

Una IP identifica una interfaz en una red. No identifica necesariamente a una persona ni a un dispositivo completo para siempre. Una laptop puede tener varias IPs, una IP puede cambiar por DHCP y muchas maquinas pueden salir a internet usando una misma IP pública por NAT.

Ejemplos de IP privadas:

- `10.0.0.0/8`
- `172.16.0.0/12`
- `192.168.0.0/16`

Ejemplo:

```text
IP local: 192.168.1.25
IP pública: la que ve internet despues de NAT
```

En seguridad, no basta con decir "la IP hizo algo". Debes preguntar:

- Esa IP era estatica o dinamica?
- A qué host pertenecia en ese momento?
- Hay DHCP logs?
- Hay NAT logs?
- La IP es interna o pública?
- Existe otra evidencia qué confirme el dispositivo?

## Red, Mascara y CIDR

Una IP vive dentro de una red.

Ejemplo:

```text
IP:      192.168.1.25
Mascara: 255.255.255.0
CIDR:    /24
Red:     192.168.1.0
Rango:   192.168.1.1 - 192.168.1.254
Broadcast: 192.168.1.255
```

Preguntas que debes poder responder:

- Esta IP está en mi misma red?
- Necesito gateway para llegar a ella?
- Qué rango pertenece a este segmento?
- Qué rango puedo analizar en un laboratorio autorizado?

No escanees redes sin permiso. Saber calcular rangos no te autoriza a probar infraestructura ajena.

## Gateway

El gateway es la salida hacia otras redes. Si tu equipo quiere hablar con una IP que no está en su red local, envia el tráfico al gateway.

Ejemplo:

```text
192.168.1.25 quiere llegar a 8.8.8.8
192.168.1.25 envia el trafico a 192.168.1.1
192.168.1.1 decide la siguiente ruta
```

En seguridad, el gateway importa porque:

- Puede aplicar firewall;
- Puede registrar tráfico;
- Puede hacer NAT;
- Puede enrutar entre VLANs;
- Puede ser objetivo de ataques;
- Puede ser punto de control y monitoreo.

## Puerto

Un puerto identifica un servicio dentro de una IP.

Ejemplos:

- `22` SSH.
- `53` DNS.
- `80` HTTP.
- `443` HTTPS.
- `445` SMB.
- `3389` RDP.

La IP dice "a que equipo". El puerto dice "a que servicio".

```text
192.168.1.10:443 = servicio HTTPS en 192.168.1.10
```

En seguridad, un puerto abierto significa que hay algo escuchando. No siempre es vulnerable, pero si aumenta la superficie de ataque.

## TCP

TCP establece una conexión y busca entrega confiable y ordenada.

Se usa cuando importa que los datos lleguen completos:

- HTTP/HTTPS.
- SSH.
- SMTP.
- RDP.
- Bases de datos.

Modelo mental:

```text
cliente -> SYN
servidor -> SYN/ACK
cliente -> ACK
conexion establecida
```

En seguridad:

- Muchos escaneos detectan puertos TCP abiertos.
- Logs de firewall suelen registrar conexiones TCP.
- Un puerto TCP expuesto puede indicar servicio accesible.
- Resets, timeouts y rechazos ayudan a entender filtrado.

## UDP

UDP no establece una conexión persistente tradicional. Envia datagramas. Es útil cuando importa velocidad, simplicidad o tolerancia a pérdida.

Ejemplos:

- DNS.
- DHCP.
- VoIP.
- Streaming.
- NTP.

En seguridad:

- UDP puede ser más difícil de interpretar porque no siempre responde.
- DNS sobre UDP es clave para detectar malware, tunneling o dominios raros.
- Servicios UDP mal configurados pueden usarse en amplificacion.

## DNS

DNS traduce nombres a direcciones IP.

Ejemplo:

```text
example.com -> 93.184.216.34
```

DNS importa mucho en seguridad porque usuarios y malware suelen usar nombres, no solo IPs.

Preguntas útiles:

- Qué dominio se resolvio?
- Qué IP respondio?
- Quién fue el resolver DNS?
- El dominio es nuevo, raro o parecido a uno legitimo?
- Hay muchas consultas repetidas?
- Hay dominios generados automaticamente?

Ignorar DNS en una investigación es perder una parte grande de la historia.

## NAT

NAT traduce direcciones. Es común que muchas IPs privadas salgan a internet usando una IP pública.

Ejemplo:

```text
192.168.1.25:51512 -> router NAT -> 200.10.10.5:40001 -> internet
```

En seguridad, NAT complica atribución porque varios equipos pueden compartir la misma IP pública. Para investigar bien necesitas correlacionar:

- IP interna;
- Puerto origen;
- IP pública;
- Timestamp;
- Logs de NAT;
- Usuario o dispositivo.

## VLAN y Segmentación

Segmentar significa separar sistemas para reducir alcance de dano.

Ejemplo:

- Red de usuarios;
- Red de servidores;
- Red de administracion;
- Red de invitados;
- Red de laboratorio;
- Red de camaras o IoT.

Una buena pregunta de seguridad es:

```text
Si este equipo se compromete, a qué otros sistemas puede llegar?
```

Una VLAN separa a nivel logico, pero no cifra automaticamente el tráfico ni reemplaza controles de acceso. Para segmentar bien necesitas reglas, rutas, monitoreo y administracion correcta.

## ACL y Firewall

Una ACL o regla de firewall decide si cierto tráfico se permite o bloquea.

Ejemplo conceptual:

```text
permitir usuarios -> servidor web : 443
bloquear invitados -> red administrativa : any
permitir administradores -> servidores : 22
```

Una regla útil debe tener contexto:

- Origen;
- Destino;
- Puerto;
- Protocolo;
- Acción;
- Razon;
- Responsable;
- Fecha de revisión.

Reglas antiguas o demasiado amplias se vuelven deuda de seguridad.

## Lectura de Logs de Red

Cuando veas una linea de log de red, intenta extraer:

| Campo | Pregunta |
| --- | --- |
| Timestamp | Cuándo paso? |
| Source IP | Quién inicio? |
| Destination IP | A dónde fue? |
| Destination port | Qué servicio intento usar? |
| Protocol | TCP, UDP, ICMP u otro? |
| Action | Permitido, bloqueado, timeout? |
| Device | Qué firewall, proxy o sensor lo vio? |

Ejemplo:

```text
2026-06-24T10:15:02 allow 10.10.5.23 93.184.216.34 tcp/443
```

Interpretacion:

- Un host interno `10.10.5.23` inicio conexión;
- Destino externo `93.184.216.34`;
- Protocolo TCP;
- Puerto 443;
- Acción permitida;
- Falta saber dominio, usuario, proceso y contexto.

## Errores Comunes

- Memorizar puertos sin entender el servicio.
- Escanear redes sin autorización.
- Confundir IP privada con IP pública.
- Pensar que una VLAN por si sola cifra el tráfico.
- Ignorar DNS en investigaciones.
- No documentar origen, destino, puerto y hora.
- Asumir que una IP identifica de forma permanente a una persona.
- Confundir bloqueo de firewall con caida del servicio.
- No revisar rutas, proxy o VPN.

## Observación Segura

En tu propio equipo o laboratorio puedes observar:

```bash
ip addr
ip route
ss -tuln
dig example.com
curl -I https://example.com
```

La meta no es acumular comandos. La meta es conectar cada resultado con una idea:

- `ip addr` muestra interfaces e IPs.
- `ip route` muestra gateway y rutas.
- `ss -tuln` muestra servicios escuchando.
- `dig` muestra resolucion DNS.
- `curl -I` muestra respuesta HTTP.

## Mini Caso

Escenario:

Un SIEM muestra que `10.20.30.45` se conecto a `203.0.113.10` por `tcp/443` a las 02:14.

Preguntas:

- Que dispositivo tenia `10.20.30.45` a esa hora?
- Qué dominio resolvio antes de la conexión?
- Fue usuario, servicio o proceso automático?
- El destino es conocido?
- El horario es normal?
- Paso por proxy?
- Hubo transferencia de datos?
- Hay alertas EDR en el host?

Una conexión no prueba ataque por si sola. El contexto decide.

## Criterio de Dominio

Dominas este tema cuando puedes explicar:

- IP vs puerto;
- Red local vs internet;
- DNS;
- TCP vs UDP;
- Que hace un gateway;
- Que hace NAT y por que complica investigaciones;
- Por que las VLANs ayudan a segmentar pero no bastan solas;
- Como leer una conexión con origen, destino, puerto, protocolo y acción;
- Como formular preguntas de investigación a partir de un log de red.
