# Switching, VLANs y ACLs

## Objetivo

Entender como se separa y controla trafico dentro de redes. Esto es clave para Cisco, firewalls, segmentacion y seguridad corporativa.

## Switching

Un switch conecta equipos dentro de una red local.

Trabaja principalmente en capa 2.

Usa direcciones MAC para decidir por que puerto enviar tramas.

## MAC Address

Identificador de una interfaz de red.

Ejemplo:

```text
00:1A:2B:3C:4D:5E
```

## ARP

ARP ayuda a descubrir la MAC asociada a una IP dentro de la red local.

Ejemplo:

```text
Quien tiene 192.168.1.20?
192.168.1.20 responde con su MAC.
```

## VLANs

Una VLAN separa logicamente una red.

Ejemplo:

- VLAN 10: usuarios.
- VLAN 20: servidores.
- VLAN 30: invitados.
- VLAN 99: administracion.

Aunque usen el mismo switch fisico, quedan separadas logicamente.

## Por Que VLANs Importan en Seguridad

Ayudan a:

- Reducir movimiento lateral.
- Separar invitados de sistemas internos.
- Separar servidores de usuarios.
- Aplicar reglas por segmento.
- Limitar impacto de un equipo comprometido.

## Trunk

Un trunk transporta varias VLANs entre switches o hacia un router/firewall.

## Access Port

Puerto asignado a una sola VLAN. Normalmente usado para equipos finales.

## Routing entre VLANs

Si equipos de VLANs distintas necesitan comunicarse, se requiere routing entre VLANs.

Ese punto es ideal para aplicar controles:

- ACLs.
- Firewall.
- Logging.

## ACLs

Una ACL permite o bloquea trafico segun reglas.

Criterios comunes:

- IP origen.
- IP destino.
- Protocolo.
- Puerto.

Ejemplo conceptual:

```text
Permitir VLAN usuarios -> servidor web puerto 443
Bloquear VLAN invitados -> red servidores
Permitir administracion -> equipos de red por SSH
```

## Error Comun

Permitir demasiado:

```text
permit any any
```

Esto puede eliminar el beneficio de segmentar.

## Practica

Diseña una red:

- VLAN 10 Usuarios: `192.168.10.0/24`
- VLAN 20 Servidores: `192.168.20.0/24`
- VLAN 30 Invitados: `192.168.30.0/24`
- VLAN 99 Admin: `192.168.99.0/24`

Define reglas:

1. Usuarios pueden acceder a servidor web en 443.
2. Invitados solo pueden salir a internet.
3. Admin puede usar SSH a equipos de red.
4. Nadie excepto admin puede administrar switches.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar switch vs router.
- Explicar VLAN.
- Diferenciar access port y trunk.
- Explicar ACL.
- Diseñar reglas basicas de segmentacion.
