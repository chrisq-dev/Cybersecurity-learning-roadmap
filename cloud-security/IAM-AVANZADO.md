# IAM Avanzado

## Objetivo

Profundizar en identidad y permisos cloud, una de las causas mas comunes de incidentes.

## Identidades Humanas y No Humanas

Humanas:

- Administradores.
- Desarrolladores.
- Analistas.

No humanas:

- Apps.
- Service accounts.
- Roles.
- Pipelines CI/CD.
- Funciones serverless.

## Problema Comun

Permisos amplios por comodidad.

Ejemplo conceptual:

```text
admin para todo porque asi funciona rapido
```

Riesgo:

- Si esa identidad se compromete, el impacto es enorme.

## Politicas

Una politica debe responder:

- Quien?
- Puede hacer que accion?
- Sobre que recurso?
- Bajo que condicion?

## Condiciones

Ejemplos de condiciones:

- Solo desde cierta red.
- Solo con MFA.
- Solo para ciertos recursos.
- Solo durante cierto flujo.

## Access Keys

Riesgos:

- Llaves antiguas.
- Llaves en repositorios.
- Llaves en laptops.
- Llaves sin rotacion.

Controles:

- Usar roles cuando sea posible.
- Rotacion.
- Secret scanning.
- Alertas de uso anomalo.
- Eliminar llaves no usadas.

## Privilege Escalation en IAM

Puede ocurrir cuando una identidad puede otorgarse permisos, asumir roles amplios o modificar politicas.

Preguntas:

- Esta identidad puede cambiar sus propios permisos?
- Puede crear llaves?
- Puede asumir roles privilegiados?
- Puede modificar politicas?
- Puede desactivar logs?

## Practica Conceptual

Analiza esta politica:

```text
Identity: app-prod
Actions: *
Resource: *
Condition: none
```

Responde:

- Que riesgo tiene?
- Que permisos probablemente necesita una app normal?
- Como reducirias privilegios?
- Que logs activarias?

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Diferenciar identidad humana y no humana.
- Explicar riesgo de access keys.
- Explicar minimo privilegio en IAM.
- Identificar rutas de escalacion de privilegios conceptuales.
