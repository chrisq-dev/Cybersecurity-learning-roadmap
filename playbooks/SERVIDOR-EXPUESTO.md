# Playbook: Servidor Expuesto

## Objetivo

Responder a un servidor o servicio expuesto indebidamente.

## Severidad Inicial

Sube severidad si:

- el servicio tiene datos sensibles;
- no requiere autenticacion;
- usa credenciales default;
- el puerto es administrativo;
- hay evidencia de acceso externo;
- el activo es critico.

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

## Primeros 15 Minutos

1. Confirmar exposicion desde fuente autorizada.
2. Identificar owner.
3. Determinar si el servicio debe ser publico.
4. Restringir acceso si el riesgo es claro.
5. Preservar logs.
6. Revisar si hubo accesos externos.

## Pasos

1. Confirmar exposicion.
2. Identificar owner.
3. Determinar si hay datos sensibles.
4. Revisar logs de acceso.
5. Restringir acceso.
6. Rotar credenciales si hubo exposicion.
7. Aplicar hardening.
8. Documentar impacto.

## Analisis

Preguntas:

- desde cuando estuvo expuesto?
- que IPs accedieron?
- hubo autenticacion exitosa?
- que datos eran visibles?
- que cambio lo expuso?
- hay secretos que rotar?

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

## Cierre

Puedes cerrar cuando:

- exposicion fue eliminada o justificada;
- logs revisados;
- credenciales rotadas si aplica;
- owner confirma configuracion esperada;
- inventario actualizado;
- deteccion preventiva creada.
