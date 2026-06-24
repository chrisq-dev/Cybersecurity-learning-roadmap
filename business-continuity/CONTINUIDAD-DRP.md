# Continuidad y Disaster Recovery

## Objetivo

Entender como una organizacion se prepara para seguir operando o recuperarse despues de un incidente.

## BCP

Business Continuity Plan.

Pregunta:

```text
Como seguimos operando durante una interrupcion?
```

BCP piensa en la operacion del negocio. No se limita a tecnologia: tambien considera personas, procesos, proveedores, comunicacion, ubicaciones alternas, aprobaciones y decisiones ejecutivas. Un buen BCP evita que la organizacion dependa de una sola persona, una sola herramienta o una sola ubicacion para operar.

## DRP

Disaster Recovery Plan.

Pregunta:

```text
Como recuperamos sistemas despues de una interrupcion grave?
```

DRP se enfoca mas en restaurar servicios tecnologicos. Incluye orden de recuperacion, backups, restauracion de infraestructura, validacion de integridad y criterios para volver a produccion. En seguridad importa porque un incidente como ransomware no solo tumba sistemas: tambien puede contaminar respaldos, afectar credenciales y obligar a reconstruir entornos con cuidado.

## RTO y RPO

RTO significa cuanto tiempo maximo puede estar caido un servicio antes de causar impacto inaceptable. RPO significa cuanta perdida de datos se puede tolerar. Un sistema de pagos puede tener RTO y RPO bajos; un portal interno de baja criticidad puede tolerar mas tiempo. Estos valores deben salir del negocio, no solo del equipo tecnico.

Un error comun es prometer recuperaciones rapidas sin probarlas. Si nadie ha restaurado el backup, el RTO es una suposicion.

## Escenarios

- Ransomware.
- Caida de cloud.
- Perdida de base de datos.
- Falla de red.
- Error humano.
- Proveedor caido.

## Componentes de un Plan

- Sistemas criticos.
- Owners.
- Contactos.
- RTO/RPO.
- Procedimientos.
- Dependencias.
- Backups.
- Comunicacion.
- Pruebas.

## Tabletop Exercise

Simulacion de incidente en mesa.

Ejemplo:

```text
La base de datos productiva no esta disponible y hay sospecha de ransomware.
```

Preguntas:

- Quien decide?
- A quien se notifica?
- Que sistema se recupera primero?
- Que evidencia se conserva?
- Que comunicacion se envia?

## Ejemplo de Tabletop

Un tabletop de ejemplo:

- Escenario.
- Participantes.
- Timeline.
- Decisiones.
- Riesgos.
- Mejoras.

El valor del tabletop no es "ganar" el escenario. Sirve para descubrir dependencias ocultas: telefonos que nadie tiene, owners que no estan definidos, accesos que dependen del sistema caido, backups que no se han probado o decisiones que nadie sabe quien puede aprobar.

## Errores Comunes

- Confundir backup con recuperacion completa.
- No priorizar sistemas por impacto real.
- No probar restauraciones.
- Depender de credenciales guardadas en el sistema afectado.
- No definir comunicacion interna y externa.
- Olvidar proveedores criticos.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Diferenciar BCP y DRP.
- Explicar RTO/RPO en contexto.
- Diseñar tabletop simple.
- Identificar dependencias criticas.
