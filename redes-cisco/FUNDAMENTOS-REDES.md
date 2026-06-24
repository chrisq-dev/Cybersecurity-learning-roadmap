# Fundamentos de Redes

## Objetivo

Entender como se comunican los equipos y por que redes es una base obligatoria para ciberseguridad.

Si no entiendes redes, vas a depender de herramientas sin entender que estan haciendo. Redes te permite interpretar escaneos, logs, firewalls, trafico web, conexiones sospechosas, movimiento lateral y exposicion de servicios.

## Modelo Mental Basico

```text
aplicacion -> puerto -> protocolo -> IP -> red local -> gateway -> internet -> destino
```

Cuando investigas un problema de seguridad, casi siempre necesitas contestar:

- Que equipo inicio la comunicacion?
- A que IP o dominio se conecto?
- Que puerto uso?
- Que protocolo uso?
- La conexion era esperada?
- Paso por firewall, proxy, VPN o NAT?
- Hay logs que lo demuestren?

## Flujo Mental: Abrir una Pagina Web

Cuando visitas `https://example.com` ocurre algo parecido a esto:

1. El navegador revisa si ya conoce la IP en cache.
2. Si no, pregunta a DNS.
3. El equipo decide si el destino esta en su red local o debe ir al gateway.
4. Se establece conexion TCP.
5. Se negocia TLS.
6. Se envia una peticion HTTP.
7. El servidor responde.
8. El navegador interpreta la respuesta.

Este flujo permite ubicar fallas:

- Si DNS falla, el nombre no resuelve.
- Si el gateway falla, no sales de tu red.
- Si TCP falla, no se establece conexion.
- Si TLS falla, hay problema de certificado, version o inspeccion.
- Si HTTP falla, el servidor respondio pero la aplicacion tuvo un problema.

## Conceptos Clave

- IP: identifica equipos en una red.
- Puerto: identifica servicios.
- TCP: conexion confiable.
- UDP: comunicacion rapida sin conexion persistente.
- DNS: traduce nombres a IPs.
- Gateway: salida hacia otras redes.
- NAT: traduccion de direcciones.
- VLAN: separacion logica.
- ACL: regla para permitir o bloquear trafico.

## IP, Red y Mascara

Una IP no vive sola; vive dentro de una red.

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

- Esta IP esta en mi misma red?
- Necesito gateway para llegar a ella?
- Que rango puedo escanear en un laboratorio autorizado?

## TCP vs UDP

TCP confirma conexion y entrega ordenada. Se usa cuando importa la confiabilidad.

Ejemplos:

- HTTP/HTTPS.
- SSH.
- SMTP.
- RDP.

UDP no establece una conexion persistente tradicional. Se usa cuando importa velocidad, simplicidad o tolerancia a perdida.

Ejemplos:

- DNS.
- DHCP.
- VoIP.
- Streaming.

En seguridad:

- TCP suele aparecer en escaneos de servicios.
- UDP puede ser mas dificil de interpretar porque no siempre responde.
- DNS sobre UDP es clave para detectar malware, tunneling o dominios raros.

## Puertos Iniciales

- 22 SSH.
- 53 DNS.
- 80 HTTP.
- 443 HTTPS.
- 445 SMB.
- 3389 RDP.

## Segmentacion

Segmentar significa separar sistemas para reducir alcance de dano.

Ejemplo:

- Red de usuarios.
- Red de servidores.
- Red de administracion.
- Red de invitados.
- Red de laboratorio.

Una buena pregunta de seguridad es:

```text
Si este equipo se compromete, a que otros sistemas puede llegar?
```

## Errores Comunes de Principiante

- Memorizar puertos sin entender el servicio.
- Escanear redes sin autorizacion.
- Confundir IP privada con IP publica.
- Pensar que una VLAN por si sola cifra el trafico.
- Ignorar DNS en investigaciones.
- No documentar origen, destino, puerto y hora.

## Practica Guiada

Ejecuta y documenta:

```bash
ping example.com
traceroute example.com
dig example.com
curl -I https://example.com
ss -tuln
ip route
```

Si algun comando no existe en tu sistema, anota el error y busca alternativa.

## Preguntas

- Que IP resolvio DNS?
- Que codigo HTTP devolvio el servidor?
- Que puertos estan escuchando en tu maquina?
- Que diferencia hay entre trafico local y trafico hacia internet?
- Cual es tu gateway?
- Que servicios locales no deberian estar expuestos?

## Mini Laboratorio: Mapa de Conexion

Una nota de ejemplo, `mapa-red-basico.md`, puede incluir:

1. Tu IP local.
2. Tu gateway.
3. Tu servidor DNS.
4. Tres dominios resueltos por DNS.
5. Tres conexiones vistas con `ss -tuln` o alternativa.
6. Una conclusion: que aprendiste sobre tu maquina y su red.

## Lectura de Evidencia

Cuando veas una linea de log de red, intenta extraer:

| Campo | Pregunta |
| --- | --- |
| Timestamp | Cuando paso? |
| Source IP | Quien inicio? |
| Destination IP | A donde fue? |
| Destination port | Que servicio intento usar? |
| Protocol | TCP, UDP, ICMP u otro? |
| Action | Permitido, bloqueado, timeout? |

## Criterio de Dominio

Puedes avanzar cuando puedas explicar:

- IP vs puerto.
- DNS.
- TCP vs UDP.
- Que hace un gateway.
- Por que las VLANs ayudan a segmentar.
- Como leer una conexion con origen, destino, puerto, protocolo y accion.
