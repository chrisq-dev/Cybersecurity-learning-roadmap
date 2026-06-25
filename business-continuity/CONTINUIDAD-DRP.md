# Continuidad y Disaster Recovery

## Objetivo

Entender como una organización se prepara para seguir operando o recuperarse después de un incidente.

## BCP

Business Continuity Plan.

Pregunta:

```text
Cómo seguimos operando durante una interrupcion?
```

BCP piensa en la operación del negocio. No se limita a tecnologia: también considera personas, procesos, proveedores, comunicación, ubicaciones alternas, aprobaciones y decisiones ejecutivas. Un buen BCP evita que la organización dependa de una sola persona, una sola herramienta o una sola ubicación para operar.

## DRP

Disaster Recovery Plan.

Pregunta:

```text
Cómo recuperamos sistemas despues de una interrupcion grave?
```

DRP se enfoca más en restaurar servicios tecnologicos. Incluye orden de recuperación, backups, restauracion de infraestructura, validación de integridad y criterios para volver a produccion. En seguridad importa porque un incidente como ransomware no solo tumba sistemas: también puede contaminar respaldos, afectar credenciales y obligar a reconstruir entornos con cuidado.

## RTO y RPO

RTO significa cuanto tiempo máximo puede estar caido un servicio antes de causar impacto inaceptable. RPO significa cuanta pérdida de datos se puede tolerar. Un sistema de pagos puede tener RTO y RPO bajos; un portal interno de baja criticidad puede tolerar más tiempo. Estos valores deben salir del negocio, no solo del equipo técnico.

Un error común es prometer recuperaciones rapidas sin probarlas. Si nadie ha restaurado el backup, el RTO es una suposicion.

## Escenarios

- Ransomware.
- Caida de cloud.
- Pérdida de base de datos.
- Falla de red.
- Error humano.
- Proveedor caido.

## Componentes de un Plan

- Sistemas críticos.
- Owners.
- Contactos.
- RTO/RPO.
- Procedimientos.
- Dependencias.
- Backups.
- Comunicación.
- Pruebas.

## Tabletop Exercise

Simulacion de incidente en mesa.

Ejemplo:

```text
La base de datos productiva no esta disponible y hay sospecha de ransomware.
```

Preguntas:

- Quién decide?
- A quién se notifica?
- Qué sistema se recupera primero?
- Qué evidencia se conserva?
- Qué comunicación se envia?

## Ejemplo de Tabletop

Un tabletop de ejemplo:

- Escenario.
- Participantes.
- Timeline.
- Decisiones.
- Riesgos.
- Mejoras.

El valor del tabletop no es "ganar" el escenario. Sirve para descubrir dependencias ocultas: telefonos que nadie tiene, owners que no están definidos, accesos que dependen del sistema caido, backups que no se han probado o decisiones que nadie sabe quien puede aprobar.

## Errores Comunes

- Confundir backup con recuperación completa.
- No priorizar sistemas por impacto real.
- No probar restauraciones.
- Depender de credenciales guardadas en el sistema afectado.
- No definir comunicación interna y externa.
- Olvidar proveedores críticos.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Diferenciar BCP y DRP.
- Explicar RTO/RPO en contexto.
- Diseñar tabletop simple.
- Identificar dependencias críticas.
