# Playbook: Servidor Expuesto

## Objetivo

Responder a un servidor o servicio expuesto indebidamente.

Un servicio expuesto no siempre significa incidente confirmado, pero si requiere análisis rápido. La prioridad es entender que está expuesto, si debería estarlo, que datos o funciones permite, desde cuando ocurre y si alguien lo uso. La contención debe reducir riesgo sin destruir información necesaria para entender impacto.

## Severidad Inicial

Sube severidad si:

- El servicio tiene datos sensibles;
- No requiere autenticación;
- Usa credenciales default;
- El puerto es administrativo;
- Hay evidencia de acceso externo;
- El activo es crítico.

## Señales

- Puerto administrativo abierto.
- Base de datos accesible desde internet.
- Panel admin público.
- Bucket público.
- Servicio sin autenticación.

## Evidencia

- IP.
- Puerto.
- Servicio.
- Owner.
- Exposición.
- Logs de acceso.
- Datos accesibles.

En este contexto, evidencia significa datos técnicos para tomar decisiones: configuración, logs, owner, exposición y cambios recientes. No se trata de llenar una plantilla, sino de evitar conclusiones sin base.

## Primeros 15 Minutos

1. Confirmar exposición desde fuente autorizada.
2. Identificar owner.
3. Determinar si el servicio debe ser público.
4. Restringir acceso si el riesgo es claro.
5. Preservar logs.
6. Revisar si hubo accesos externos.

## Pasos

1. Confirmar exposición.
2. Identificar owner.
3. Determinar si hay datos sensibles.
4. Revisar logs de acceso.
5. Restringir acceso.
6. Rotar credenciales si hubo exposición.
7. Aplicar hardening.
8. Documentar impacto.

## Análisis

Preguntas:

- Desde cuándo estuvo expuesto?
- Qué IPs accedieron?
- Hubo autenticación exitosa?
- Qué datos eran visibles?
- Qué cambio lo expuso?
- Hay secretos qué rotar?

La severidad depende del contexto. Un puerto público con una página estatica no equivale a una base de datos sin autenticación. También importa si hay controles compensatorios, allowlists, MFA, WAF, VPN o logs suficientes para revisar accesos.

## Contención

- Cerrar puerto.
- Limitar por IP/VPN.
- Mover a red privada.
- Habilitar autenticación.
- Revocar secretos.

## Remediación

- Reglas firewall.
- Segmentación.
- Monitoreo.
- Inventario actualizado.

## Errores Comunes

- Cerrar el puerto sin avisar al owner y causar caida.
- Asumir que no hubo acceso porque no hay alerta.
- No rotar secretos expuestos.
- No revisar cambios recientes de firewall, cloud o deploy.
- No actualizar inventario después de corregir.
- Confundir exposición intencional con configuración segura.

## Cierre

Puedes cerrar cuando:

- Exposición fue eliminada o justificada;
- Logs revisados;
- Credenciales rotadas si aplica;
- Owner confirma configuración esperada;
- Inventario actualizado;
- Detección preventiva creada.
