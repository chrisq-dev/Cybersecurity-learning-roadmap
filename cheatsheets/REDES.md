# Cheatsheet Redes

## Puertos Comunes

| Puerto | Servicio |
| --- | --- |
| 22 | SSH |
| 53 | DNS |
| 80 | HTTP |
| 443 | HTTPS |
| 445 | SMB |
| 3389 | RDP |

## Comandos

```bash
ping example.com
traceroute example.com
dig example.com
nslookup example.com
curl -I https://example.com
```

## Conceptos

- IP: direccion logica.
- Puerto: servicio dentro del host.
- DNS: nombre a IP.
- DHCP: asigna configuracion.
- NAT: traduce direcciones.
- VLAN: separacion logica.
- ACL: permite o bloquea trafico.

## Subnetting Rapido

| CIDR | Hosts Usables |
| --- | --- |
| /24 | 254 |
| /25 | 126 |
| /26 | 62 |
| /27 | 30 |
| /28 | 14 |
| /30 | 2 |
