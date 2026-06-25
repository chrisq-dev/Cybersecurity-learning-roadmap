# Cheatsheet Redes

Referencia rapida para interpretar conectividad, servicios, puertos y evidencia de red.

## Puertos Comunes

| Puerto | Servicio | Uso común | Riesgo si está expuesto |
| --- | --- | --- | --- |
| 22 | SSH | administracion Linux | fuerza bruta, acceso remoto |
| 25 | SMTP | envio de correo | abuso/spam si mal configurado |
| 53 | DNS | resolucion de nombres | tunneling, abuso, exposición |
| 80 | HTTP | web sin TLS | tráfico sin cifrar |
| 110 | POP3 | correo | credenciales si no usa TLS |
| 143 | IMAP | correo | credenciales si no usa TLS |
| 443 | HTTPS | web con TLS | revisar certificados/config |
| 445 | SMB | archivos Windows | exposición crítica en internet |
| 3306 | MySQL | base de datos | no debería exponerse sin control |
| 5432 | PostgreSQL | base de datos | no debería exponerse sin control |
| 6379 | Redis | cache | riesgo alto si no tiene auth/red privada |
| 3389 | RDP | administracion Windows | fuerza bruta, acceso remoto |

## Comandos

```bash
ping example.com
traceroute example.com
dig example.com
nslookup example.com
curl -I https://example.com
ip addr
ip route
ss -tuln
```

## Cómo Interpretar

| Comando | Pregunta que responde |
| --- | --- |
| `ping` | Hay respuesta ICMP? |
| `traceroute` | Por dónde viaja el tráfico? |
| `dig` | Qué IP resuelve un dominio? |
| `curl -I` | Qué headers responde un servidor web? |
| `ip route` | Cuál es el gateway? |
| `ss -tuln` | Qué puertos escuchan localmente? |

## Conceptos

- IP: dirección lógica.
- Puerto: servicio dentro del host.
- DNS: nombre a IP.
- DHCP: asigna configuración.
- NAT: traduce direcciones.
- VLAN: separación lógica.
- ACL: permite o bloquea tráfico.

## IP Privadas

| Rango | Uso |
| --- | --- |
| `10.0.0.0/8` | redes privadas |
| `172.16.0.0/12` | redes privadas |
| `192.168.0.0/16` | redes privadas |
| `127.0.0.0/8` | loopback/local |

## Subnetting Rápido

| CIDR | Hosts Usables |
| --- | --- |
| /24 | 254 |
| /25 | 126 |
| /26 | 62 |
| /27 | 30 |
| /28 | 14 |
| /30 | 2 |

## Lectura Rapida de Conexión

```text
origen -> destino:puerto/protocolo -> acción -> resultado
```

Ejemplo:

```text
192.168.1.25 -> 203.0.113.10:443/TCP -> permitido -> conexion HTTPS
```

## Señales de Riesgo

- Puertos administrativos expuestos a internet.
- Bases de datos accesibles publicamente.
- Tráfico DNS inusual o repetitivo.
- Muchas conexiones fallidas al mismo puerto.
- Servicios escuchando en interfaces no esperadas.
- Falta de segmentación entre usuarios y servidores.

## Errores Comunes

- Memorizar puertos sin entender el servicio.
- Confundir IP privada con seguridad.
- Pensar que VLAN cifra tráfico.
- Escanear redes sin autorización.
- Ignorar DNS durante investigaciones.
