# Playbook: Servidor Expuesto

## Objetivo

Responder a un servidor o servicio expuesto indebidamente.

Un servicio expuesto no siempre significa incidente confirmado, pero si requiere analisis rapido. La prioridad es entender que esta expuesto, si deberia estarlo, que datos o funciones permite, desde cuando ocurre y si alguien lo uso. La contencion debe reducir riesgo sin destruir informacion necesaria para entender impacto.

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

En este contexto, evidencia significa datos tecnicos para tomar decisiones: configuracion, logs, owner, exposicion y cambios recientes. No se trata de llenar una plantilla, sino de evitar conclusiones sin base.

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

La severidad depende del contexto. Un puerto publico con una pagina estatica no equivale a una base de datos sin autenticacion. Tambien importa si hay controles compensatorios, allowlists, MFA, WAF, VPN o logs suficientes para revisar accesos.

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

## Errores Comunes

- Cerrar el puerto sin avisar al owner y causar caida.
- Asumir que no hubo acceso porque no hay alerta.
- No rotar secretos expuestos.
- No revisar cambios recientes de firewall, cloud o deploy.
- No actualizar inventario despues de corregir.
- Confundir exposicion intencional con configuracion segura.

## Cierre

Puedes cerrar cuando:

- exposicion fue eliminada o justificada;
- logs revisados;
- credenciales rotadas si aplica;
- owner confirma configuracion esperada;
- inventario actualizado;
- deteccion preventiva creada.
