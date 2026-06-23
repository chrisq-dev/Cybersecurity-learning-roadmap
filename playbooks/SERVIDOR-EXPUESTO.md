# Playbook: Servidor Expuesto

## Objetivo

Responder a un servidor o servicio expuesto indebidamente.

## Señales

- Puerto administrativo abierto.
- Base de datos accesible desde internet.
- Panel admin publico.
- Bucket publico.
- Servicio sin autenticacion.

## Evidencia

- IP.
- Puerto.
- Servicio.
- Owner.
- Exposicion.
- Logs de acceso.
- Datos accesibles.

## Pasos

1. Confirmar exposicion.
2. Identificar owner.
3. Determinar si hay datos sensibles.
4. Revisar logs de acceso.
5. Restringir acceso.
6. Rotar credenciales si hubo exposicion.
7. Aplicar hardening.
8. Documentar impacto.

## Contencion

- Cerrar puerto.
- Limitar por IP/VPN.
- Mover a red privada.
- Habilitar autenticacion.
- Revocar secretos.

## Remediacion

- Reglas firewall.
- Segmentacion.
- Monitoreo.
- Inventario actualizado.
