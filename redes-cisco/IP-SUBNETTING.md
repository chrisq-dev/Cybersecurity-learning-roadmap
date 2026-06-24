# IP y Subnetting

## Objetivo

Entender direcciones IP, mascaras, CIDR y subredes. Esto es esencial para redes, Cisco, firewalls, cloud, seguridad defensiva y analisis de logs.

Subnetting no se estudia solo para hacer ejercicios. Se estudia para saber que sistemas pertenecen a un segmento, que trafico deberia permitirse, que rangos pueden analizarse en un laboratorio autorizado y como diseñar redes con menor impacto ante incidentes.

## Que es una Direccion IP

Una direccion IP identifica una interfaz en una red.

Ejemplo:

```text
192.168.1.10
```

IPv4 usa 32 bits divididos en 4 octetos.

```text
192 . 168 . 1 . 10
```

Cada octeto va de 0 a 255 porque representa 8 bits.

Importante: una IP no identifica permanentemente a una persona. Puede cambiar por DHCP, puede estar detras de NAT, puede compartirse entre sistemas o puede pertenecer a una interfaz temporal.

## IP Privada vs IP Publica

Rangos privados comunes:

| Rango | Uso |
| --- | --- |
| `10.0.0.0/8` | redes privadas grandes |
| `172.16.0.0/12` | redes privadas |
| `192.168.0.0/16` | redes domesticas y pequeñas |

Una IP privada no se enruta directamente en internet. Normalmente sale por NAT usando una IP publica.

En seguridad:

- logs internos suelen mostrar IP privada;
- logs externos suelen mostrar IP publica;
- para atribucion necesitas correlacionar DHCP, NAT, usuario y timestamp.

## Red y Host

Una IP tiene dos partes:

- parte de red;
- parte de host.

La mascara indica que parte pertenece a la red.

Ejemplo:

```text
IP:      192.168.1.10
Mascara: 255.255.255.0
CIDR:    /24
Red:     192.168.1.0
Host:    10
```

Los equipos dentro de la misma red pueden comunicarse localmente. Para llegar a otra red necesitan gateway.

## CIDR

CIDR indica cuantos bits son de red.

Ejemplos comunes:

| CIDR | Mascara | Direcciones totales | Hosts usables tradicionales |
| --- | --- | --- | --- |
| /24 | 255.255.255.0 | 256 | 254 |
| /25 | 255.255.255.128 | 128 | 126 |
| /26 | 255.255.255.192 | 64 | 62 |
| /27 | 255.255.255.224 | 32 | 30 |
| /28 | 255.255.255.240 | 16 | 14 |
| /29 | 255.255.255.248 | 8 | 6 |
| /30 | 255.255.255.252 | 4 | 2 |

Se restan 2 direcciones en redes tradicionales:

- direccion de red;
- broadcast.

En algunos entornos cloud hay reglas especiales y direcciones reservadas adicionales.

## Como Pensar Bloques

El tamaño del bloque depende de cuantos bits quedan para hosts.

```text
/24 -> bloques de 256
/25 -> bloques de 128
/26 -> bloques de 64
/27 -> bloques de 32
/28 -> bloques de 16
```

Ejemplo con /26:

```text
0, 64, 128, 192
```

Esos son los inicios de subred dentro del ultimo octeto.

## Ejemplo /24

```text
Red: 192.168.1.0/24
Rango usable: 192.168.1.1 - 192.168.1.254
Broadcast: 192.168.1.255
```

Uso comun:

- red pequeña de usuarios;
- laboratorio local;
- segmento simple.

Riesgo:

Si todo vive en un solo /24 sin controles, un equipo comprometido puede intentar descubrir muchos vecinos.

## Ejemplo /26

Una red /26 tiene bloques de 64 direcciones.

```text
192.168.1.0/26
192.168.1.64/26
192.168.1.128/26
192.168.1.192/26
```

Primera subred:

```text
Red: 192.168.1.0
Usables: 192.168.1.1 - 192.168.1.62
Broadcast: 192.168.1.63
```

Segunda subred:

```text
Red: 192.168.1.64
Usables: 192.168.1.65 - 192.168.1.126
Broadcast: 192.168.1.127
```

## Gateway

El gateway debe pertenecer a la misma red que el host.

Ejemplo valido:

```text
Host:    192.168.10.25/24
Gateway: 192.168.10.1
```

Ejemplo problematico:

```text
Host:    192.168.10.25/24
Gateway: 192.168.20.1
```

Ese gateway esta fuera de la red del host, por lo que la configuracion no tiene sentido para comunicacion normal.

## Subredes Traslapadas

Dos subredes traslapadas crean problemas de routing y seguridad.

Ejemplo:

```text
Red A: 10.0.0.0/24
Red B: 10.0.0.128/25
```

`10.0.0.150` pertenece a ambas. Esto puede causar rutas ambiguas, reglas incorrectas y problemas en VPN o cloud.

## 0.0.0.0/0

`0.0.0.0/0` significa cualquier direccion IPv4.

En firewalls y cloud puede significar:

```text
permitir desde todo internet
```

No siempre es incorrecto. Un sitio web publico puede aceptar `0.0.0.0/0` hacia `443`. Pero exponer SSH, RDP, bases de datos o paneles administrativos a `0.0.0.0/0` suele ser riesgoso.

## Por Que Importa en Seguridad

Subnetting ayuda a:

- segmentar redes;
- separar usuarios, servidores y administracion;
- crear reglas de firewall;
- definir rangos de analisis autorizados;
- entender logs de origen/destino;
- diseñar redes cloud;
- limitar movimiento lateral;
- documentar alcance de pruebas.

Ejemplo:

```text
Usuarios:       10.10.10.0/24
Servidores:     10.10.20.0/24
Administracion: 10.10.99.0/24
Invitados:      10.10.30.0/24
```

Con esa separacion puedes aplicar reglas distintas por funcion.

## Ejemplo de Regla

```text
Permitir 10.10.10.0/24 -> 10.10.20.50 tcp/443
Bloquear 10.10.30.0/24 -> 10.10.20.0/24 any
Permitir 10.10.99.0/24 -> switches tcp/22
```

La red no solo organiza direcciones. Tambien define limites de confianza.

## Errores Comunes

- Mascara incorrecta.
- Gateway fuera de la red.
- Subredes traslapadas.
- Reglas de firewall demasiado amplias.
- Usar `0.0.0.0/0` sin entender que significa.
- Escanear rangos no autorizados.
- Confundir IP publica con IP privada.
- No registrar que rango pertenece a que funcion.

## Ejemplos de Lectura

### Red 10.0.0.0/24

```text
Mascara: 255.255.255.0
Primera IP usable: 10.0.0.1
Ultima IP usable: 10.0.0.254
Broadcast: 10.0.0.255
Hosts tradicionales: 254
```

### Red 192.168.10.0/26

```text
Mascara: 255.255.255.192
Primera IP usable: 192.168.10.1
Ultima IP usable: 192.168.10.62
Broadcast: 192.168.10.63
Hosts tradicionales: 62
```

### Red 172.16.5.0/28

```text
Mascara: 255.255.255.240
Primera IP usable: 172.16.5.1
Ultima IP usable: 172.16.5.14
Broadcast: 172.16.5.15
Hosts tradicionales: 14
```

## Criterio de Dominio

Dominas este tema cuando puedes:

- explicar IP, mascara y CIDR;
- diferenciar IP privada y publica;
- calcular hosts de /24, /25, /26, /27 y /28;
- identificar red, rango usable y broadcast;
- validar si un gateway pertenece a la red;
- explicar por que subredes traslapadas causan problemas;
- interpretar `0.0.0.0/0`;
- explicar por que segmentar reduce riesgo.
