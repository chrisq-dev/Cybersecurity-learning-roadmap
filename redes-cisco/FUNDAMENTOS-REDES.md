# Fundamentos de Redes

## Objetivo

Entender como se comunican los equipos y por que redes es una base obligatoria para ciberseguridad.

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

## Puertos Iniciales

- 22 SSH.
- 53 DNS.
- 80 HTTP.
- 443 HTTPS.
- 445 SMB.
- 3389 RDP.

## Practica

Ejecuta y documenta:

```bash
ping example.com
traceroute example.com
dig example.com
curl -I https://example.com
ss -tuln
```

Si algun comando no existe en tu sistema, anota el error y busca alternativa.

## Preguntas

- Que IP resolvio DNS?
- Que codigo HTTP devolvio el servidor?
- Que puertos estan escuchando en tu maquina?
- Que diferencia hay entre trafico local y trafico hacia internet?

## Criterio de Dominio

Puedes avanzar cuando puedas explicar:

- IP vs puerto.
- DNS.
- TCP vs UDP.
- Que hace un gateway.
- Por que las VLANs ayudan a segmentar.
