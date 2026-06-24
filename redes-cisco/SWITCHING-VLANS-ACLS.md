# Switching, VLANs y ACLs

## Objetivo

Entender como se separa y controla trafico dentro de redes. Esto es clave para Cisco, firewalls, segmentacion, redes corporativas y seguridad defensiva.

Este tema conecta capa 2, capa 3 y controles de acceso. Si lo entiendes, puedes explicar por que no todos los equipos deben estar en la misma red, como limitar movimiento lateral y donde aplicar reglas para reducir riesgo.

## Switching

Un switch conecta equipos dentro de una red local.

Trabaja principalmente en capa 2 y usa direcciones MAC para decidir por que puerto enviar tramas.

Modelo simple:

```text
PC1 -> switch -> PC2
```

El switch aprende que MAC aparece por cada puerto. Con esa tabla decide donde reenviar trafico.

## MAC Address

Una MAC address identifica una interfaz de red a nivel de enlace.

Ejemplo:

```text
00:1A:2B:3C:4D:5E
```

La MAC sirve dentro de la red local. Para comunicar entre redes se usa IP y routing.

En seguridad:

- una MAC puede ayudar a identificar dispositivos locales;
- puede existir spoofing de MAC;
- port security puede limitar MACs por puerto;
- logs de switches pueden ayudar en investigaciones internas.

## ARP

ARP ayuda a descubrir la MAC asociada a una IP dentro de la red local.

Ejemplo:

```text
Quien tiene 192.168.1.20?
192.168.1.20 responde con su MAC.
```

ARP es necesario para comunicacion local IPv4, pero tambien puede ser abusado.

Riesgos:

- ARP spoofing;
- man-in-the-middle local;
- redireccion de trafico;
- confusion de tablas ARP.

Controles:

- segmentacion;
- DHCP snooping;
- dynamic ARP inspection;
- monitoreo;
- evitar redes planas grandes.

## VLANs

Una VLAN separa logicamente una red.

Ejemplo:

- VLAN 10: usuarios.
- VLAN 20: servidores.
- VLAN 30: invitados.
- VLAN 99: administracion.

Aunque usen el mismo switch fisico, quedan separadas logicamente.

Sin VLANs, muchos equipos comparten el mismo dominio de broadcast. Eso aumenta ruido, exposicion y posibilidades de movimiento lateral.

## Dominio de Broadcast

Un dominio de broadcast es el conjunto de equipos que reciben trafico broadcast entre si.

ARP usa broadcast para preguntar por una IP local.

Si la red es demasiado grande:

- hay mas ruido;
- hay mas equipos alcanzables;
- se complica el monitoreo;
- un equipo comprometido puede descubrir mas vecinos.

VLANs ayudan a dividir esos dominios.

## Por Que VLANs Importan en Seguridad

Ayudan a:

- reducir movimiento lateral;
- separar invitados de sistemas internos;
- separar servidores de usuarios;
- aplicar reglas por segmento;
- limitar impacto de un equipo comprometido;
- mejorar visibilidad;
- alinear red con funciones del negocio.

Ejemplo:

```text
Invitados no deben hablar con servidores internos.
Usuarios no deben administrar switches.
Servidores no deben aceptar trafico desde cualquier segmento.
```

## Access Port

Un access port pertenece a una sola VLAN. Normalmente se usa para equipos finales.

Ejemplo:

```text
Puerto 1 -> VLAN 10 usuarios
Puerto 2 -> VLAN 30 invitados
```

Si un equipo se conecta a un puerto access, queda dentro de esa VLAN.

## Trunk

Un trunk transporta varias VLANs entre switches o hacia router/firewall.

Ejemplo:

```text
switch piso 1 -> trunk -> switch core
```

Riesgos:

- permitir VLANs innecesarias;
- native VLAN mal configurada;
- trunks en puertos donde deberian ser access;
- errores que mezclan segmentos.

Buenas practicas:

- permitir solo VLANs necesarias;
- documentar trunks;
- evitar native VLAN sensible;
- no dejar puertos dinamicos sin control.

## Routing entre VLANs

Si equipos de VLANs distintas necesitan comunicarse, se requiere routing entre VLANs.

Ese punto es ideal para aplicar controles:

- ACLs;
- firewall;
- logging;
- inspeccion;
- politicas por rol.

Ejemplo:

```text
VLAN usuarios -> firewall/router -> VLAN servidores
```

La regla madura no es "usuarios pueden hablar con servidores". La regla madura es:

```text
usuarios pueden acceder al servidor web por tcp/443
usuarios no pueden acceder directo a la base de datos
```

## ACLs

Una ACL permite o bloquea trafico segun reglas.

Criterios comunes:

- IP origen;
- IP destino;
- protocolo;
- puerto;
- direccion del trafico;
- interfaz o zona.

Ejemplo conceptual:

```text
Permitir VLAN usuarios -> servidor web puerto 443
Bloquear VLAN invitados -> red servidores
Permitir administracion -> equipos de red por SSH
```

## Orden de Reglas

En muchas ACLs, el orden importa. La primera regla que coincide puede decidir la accion.

Ejemplo:

```text
permit any any
deny invitados servidores
```

La segunda regla no sirve si la primera permite todo antes.

Por eso las reglas deben ser especificas y revisarse en orden.

## Deny Implícito

Muchos sistemas aplican deny implicito al final:

```text
si nada coincide, bloquear
```

Esto ayuda a aplicar minimo privilegio, pero puede romper comunicacion si no documentas bien los flujos necesarios.

## Ejemplo de Segmentacion

Red:

- VLAN 10 Usuarios: `192.168.10.0/24`
- VLAN 20 Servidores: `192.168.20.0/24`
- VLAN 30 Invitados: `192.168.30.0/24`
- VLAN 99 Admin: `192.168.99.0/24`

Reglas razonables:

| Origen | Destino | Puerto | Accion | Razon |
| --- | --- | --- | --- | --- |
| Usuarios | Web interno | TCP 443 | Permitir | Uso de aplicacion |
| Usuarios | Base de datos | TCP 5432 | Bloquear | DB solo desde backend |
| Invitados | Internet | TCP 80/443 | Permitir | Navegacion basica |
| Invitados | Redes internas | Any | Bloquear | No confiables |
| Admin | Switches | TCP 22 | Permitir | Administracion controlada |
| Cualquiera | Admin | Any | Bloquear | Proteger zona critica |

## Movimiento Lateral

Movimiento lateral significa que un atacante pasa de un sistema comprometido a otros sistemas internos.

Red plana:

```text
equipo comprometido -> muchos vecinos alcanzables
```

Red segmentada:

```text
equipo comprometido -> solo servicios permitidos por reglas
```

La segmentacion no elimina compromiso inicial, pero reduce alcance.

## Errores Comunes

- Permitir `any any`.
- Crear VLANs sin aplicar reglas entre ellas.
- Usar VLAN de administracion desde redes de usuarios.
- Dejar invitados con acceso interno.
- No documentar trunks.
- No monitorear cambios de ACL.
- Pensar que VLAN cifra trafico.
- No revisar reglas antiguas.

## Criterio de Dominio

Dominas este tema cuando puedes:

- explicar switch vs router;
- explicar MAC e IP sin confundirlas;
- explicar ARP y sus riesgos;
- explicar VLAN y dominio de broadcast;
- diferenciar access port y trunk;
- explicar routing entre VLANs;
- diseñar ACLs basicas con origen, destino, puerto y razon;
- explicar por que segmentacion reduce movimiento lateral.
