# Firewalls, IDS e IPS

## Objetivo

Entender controles de seguridad de red y como ayudan a prevenir o detectar trafico no deseado.

## Firewall

Un firewall permite o bloquea trafico segun reglas.

Criterios comunes:

- IP origen.
- IP destino.
- Puerto.
- Protocolo.
- Aplicacion.
- Usuario en firewalls modernos.

## Regla de Firewall

Una regla debe responder:

- Quien origina?
- A donde va?
- Que puerto/protocolo?
- Por que se permite?
- Quien aprobo?
- Cuando expira?

## Deny by Default

Principio:

```text
Bloquear por defecto y permitir solo lo necesario.
```

## IDS

Intrusion Detection System.

Detecta actividad sospechosa y alerta.

No necesariamente bloquea.

## IPS

Intrusion Prevention System.

Puede bloquear trafico sospechoso.

## Diferencia

| Control | Funcion |
| --- | --- |
| Firewall | Permitir/bloquear segun reglas |
| IDS | Detectar y alertar |
| IPS | Detectar y bloquear |

## Riesgos Comunes

- Reglas `any any`.
- Puertos administrativos expuestos.
- Reglas sin owner.
- Reglas antiguas sin uso.
- Falta de logs.
- IDS con demasiados falsos positivos.

## Practica

Diseña reglas para:

- Usuarios a web server por 443.
- Admin a servidores por SSH.
- Invitados solo a internet.
- Bloquear acceso a base de datos desde usuarios.

Tabla:

| Origen | Destino | Puerto | Accion | Justificacion |
| --- | --- | --- | --- | --- |

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar firewall.
- Diferenciar IDS e IPS.
- Identificar reglas peligrosas.
- Diseñar reglas con justificacion.
