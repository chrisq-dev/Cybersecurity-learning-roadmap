# DNS, DHCP y NAT

## Objetivo

Entender tres servicios clave de redes. Aparecen constantemente en troubleshooting, cloud, SOC, pentesting y administracion.

## DNS

DNS traduce nombres a direcciones IP.

Ejemplo:

```text
example.com -> 93.184.216.34
```

Sin DNS tendrias que recordar IPs.

## Tipos de Registros DNS

| Registro | Uso |
| --- | --- |
| A | Nombre a IPv4 |
| AAAA | Nombre a IPv6 |
| CNAME | Alias |
| MX | Servidores de correo |
| TXT | Texto, verificaciones, SPF, DKIM |
| NS | Servidores autoritativos |

## Flujo DNS Simplificado

1. Tu equipo pregunta si conoce la respuesta en cache.
2. Si no, pregunta al resolver DNS configurado.
3. El resolver busca la respuesta.
4. Recibes la IP.
5. Tu equipo intenta conectarse.

## DNS en Seguridad

DNS ayuda a detectar:

- Malware contactando dominios raros.
- Exfiltracion por DNS.
- Phishing.
- Dominios generados automaticamente.
- Mala configuracion de registros.

Comandos:

```bash
dig example.com
dig MX example.com
dig TXT example.com
nslookup example.com
```

## DHCP

DHCP asigna configuracion de red automaticamente.

Puede entregar:

- IP.
- Mascara.
- Gateway.
- DNS.
- Tiempo de concesion.

Flujo simplificado:

```text
Discover -> Offer -> Request -> Acknowledge
```

## DHCP en Seguridad

Riesgos:

- Servidor DHCP falso.
- Asignacion de gateway malicioso.
- Red sin control de dispositivos.
- Falta de segmentacion.

Controles:

- DHCP snooping.
- Segmentacion.
- Monitoreo.
- Inventario de dispositivos.

## NAT

NAT traduce direcciones IP.

Uso comun:

- Muchos equipos internos salen a internet usando una IP publica.

Ejemplo:

```text
192.168.1.10 -> router -> IP publica
```

## Tipos Practicos

### Source NAT

Cambia la IP origen. Comun para salir a internet.

### Destination NAT / Port Forwarding

Cambia destino para publicar un servicio interno.

Ejemplo:

```text
IP_publica:443 -> servidor_interno:443
```

## NAT en Seguridad

Importa porque:

- Puede ocultar muchas IPs internas detras de una IP publica.
- Logs deben conservar puertos y traducciones.
- Port forwarding expone servicios.
- Reglas mal hechas pueden publicar sistemas internos.

## Practica

1. Consulta registros DNS de 3 dominios.
2. Identifica tu IP local.
3. Identifica tu gateway.
4. Explica si tu red probablemente usa NAT.

Comandos:

```bash
ip addr
ip route
dig example.com
curl ifconfig.me
```

Si `curl ifconfig.me` no funciona, busca otra forma autorizada de ver tu IP publica.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar DNS y registros comunes.
- Explicar DHCP.
- Explicar NAT.
- Entender por que DNS y NAT son importantes en investigaciones.
