# Modelo OSI y TCP/IP

## Objetivo

Entender como se divide la comunicacion de red en capas. Esto ayuda a diagnosticar problemas, entender ataques y explicar trafico.

## Por Que Existen Capas

Las capas separan responsabilidades.

Ejemplo: cuando visitas una pagina web, no todo ocurre en un solo bloque. Hay partes encargadas de:

- Cable o Wi-Fi.
- Direcciones locales.
- Direcciones IP.
- Puertos.
- Cifrado.
- HTTP.
- Aplicacion.

Separar por capas ayuda a preguntar:

- El problema es fisico?
- Es de IP?
- Es de DNS?
- Es de puerto?
- Es de TLS?
- Es de aplicacion?

## Modelo OSI

### Capa 1: Fisica

Transmite bits por cable, fibra o radio.

Ejemplos:

- Cable Ethernet.
- Wi-Fi.
- Fibra.

Problemas comunes:

- Cable desconectado.
- Señal Wi-Fi debil.
- Puerto fisico dañado.

### Capa 2: Enlace de Datos

Comunica equipos dentro de la misma red local.

Conceptos:

- MAC address.
- Switch.
- VLAN.
- ARP.

Problemas comunes:

- VLAN incorrecta.
- Loop de switching.
- Problemas de ARP.

### Capa 3: Red

Permite comunicacion entre redes.

Conceptos:

- IP.
- Router.
- Gateway.
- ICMP.

Problemas comunes:

- IP incorrecta.
- Mascara incorrecta.
- Gateway incorrecto.
- Ruta faltante.

### Capa 4: Transporte

Maneja comunicacion entre procesos usando puertos.

Protocolos:

- TCP.
- UDP.

Problemas comunes:

- Puerto cerrado.
- Firewall bloqueando.
- Servicio caido.

### Capa 5: Sesion

Gestiona sesiones de comunicacion. En la practica moderna suele mezclarse con capas superiores.

Ejemplo:

- Mantener una sesion activa entre cliente y servidor.

### Capa 6: Presentacion

Formato, codificacion y cifrado.

Ejemplos:

- TLS.
- JSON.
- Encoding.
- Compresion.

### Capa 7: Aplicacion

Protocolos usados directamente por aplicaciones.

Ejemplos:

- HTTP.
- DNS.
- SMTP.
- SSH.

## Modelo TCP/IP

El modelo TCP/IP es mas usado en redes reales.

| TCP/IP | OSI Aproximado | Ejemplos |
| --- | --- | --- |
| Aplicacion | 5-7 | HTTP, DNS, SSH |
| Transporte | 4 | TCP, UDP |
| Internet | 3 | IP, ICMP |
| Acceso a red | 1-2 | Ethernet, Wi-Fi |

## Ejemplo: Abrir una Web

Visitas:

```text
https://example.com
```

Ocurre:

1. DNS resuelve el nombre a IP.
2. Tu equipo decide enviar al gateway si no esta en la red local.
3. Se establece conexion TCP al puerto 443.
4. Se negocia TLS.
5. El navegador envia HTTP.
6. El servidor responde.

## Diagnostico por Capas

Si una web no carga:

- Capa 1: hay red fisica o Wi-Fi?
- Capa 2: estoy en la VLAN correcta?
- Capa 3: tengo IP, mascara y gateway?
- Capa 4: el puerto 443 responde?
- Capa 7: el servidor web responde HTTP?

## Herramientas

```bash
ip addr
ping 8.8.8.8
traceroute example.com
dig example.com
curl -I https://example.com
ss -tuln
```

## Practica

Para cada comando, escribe que capa ayuda a revisar:

| Comando | Capa | Que valida |
| --- | --- | --- |
| `ping` | | |
| `dig` | | |
| `curl -I` | | |
| `ss -tuln` | | |
| `traceroute` | | |

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Nombrar las capas OSI.
- Explicar TCP/IP.
- Diagnosticar un problema simple por capas.
- Explicar que ocurre al abrir una pagina web.
