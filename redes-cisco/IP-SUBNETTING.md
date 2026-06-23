# IP y Subnetting

## Objetivo

Entender direcciones IP, mascaras, CIDR y subredes. Esto es esencial para redes, Cisco, firewalls, cloud y seguridad.

## Que es una Direccion IP

Una direccion IP identifica un equipo o interfaz en una red.

Ejemplo:

```text
192.168.1.10
```

IPv4 usa 32 bits divididos en 4 octetos.

```text
192 . 168 . 1 . 10
```

Cada octeto va de 0 a 255.

## Red y Host

Una IP tiene dos partes:

- Parte de red.
- Parte de host.

La mascara indica que parte pertenece a la red.

Ejemplo:

```text
IP:      192.168.1.10
Mascara: 255.255.255.0
CIDR:    /24
Red:     192.168.1.0
Host:    10
```

## CIDR

CIDR indica cuantos bits son de red.

Ejemplos comunes:

| CIDR | Mascara | Hosts aproximados |
| --- | --- | --- |
| /24 | 255.255.255.0 | 254 |
| /25 | 255.255.255.128 | 126 |
| /26 | 255.255.255.192 | 62 |
| /27 | 255.255.255.224 | 30 |
| /28 | 255.255.255.240 | 14 |
| /30 | 255.255.255.252 | 2 |

Se restan 2 direcciones en redes tradicionales:

- Direccion de red.
- Broadcast.

## Ejemplo /24

```text
Red: 192.168.1.0/24
Rango usable: 192.168.1.1 - 192.168.1.254
Broadcast: 192.168.1.255
```

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

## Por Que Importa en Seguridad

Subnetting ayuda a:

- Segmentar redes.
- Separar usuarios, servidores y administracion.
- Crear reglas de firewall.
- Definir rangos de escaneo autorizados.
- Entender logs de origen/destino.
- Diseñar redes cloud.

## Errores Comunes

- Mascara incorrecta.
- Gateway fuera de la red.
- Subredes traslapadas.
- Reglas de firewall demasiado amplias.
- Usar `0.0.0.0/0` sin entender que significa todo internet.

## Practica

Completa:

```text
Red: 10.0.0.0/24
Mascara:
Primera IP usable:
Ultima IP usable:
Broadcast:
Cantidad de hosts:
```

```text
Red: 192.168.10.0/26
Mascara:
Primera IP usable:
Ultima IP usable:
Broadcast:
Cantidad de hosts:
```

```text
Red: 172.16.5.0/28
Mascara:
Primera IP usable:
Ultima IP usable:
Broadcast:
Cantidad de hosts:
```

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar IP, mascara y CIDR.
- Calcular hosts de /24, /25, /26, /27 y /28.
- Identificar red, rango usable y broadcast.
- Explicar por que segmentar reduce riesgo.
