# Zero Trust

## Objetivo

Entender Zero Trust sin marketing: verificar explicitamente, usar minimo privilegio y asumir compromiso.

## Idea Principal

No confiar automaticamente por estar "dentro de la red".

Antes:

```text
Dentro de la red = confiable
```

Mejor:

```text
Cada acceso debe validarse con identidad, contexto y permisos.
```

## Principios

### Verificar Explicitamente

Validar:

- Usuario.
- Dispositivo.
- Ubicacion.
- Riesgo.
- MFA.
- Estado del dispositivo.

### Minimo Privilegio

Dar solo acceso necesario.

### Asumir Compromiso

Diseñar pensando que alguna cuenta o equipo puede estar comprometido.

## Controles Relacionados

- MFA.
- Conditional Access.
- Device compliance.
- Segmentacion.
- Just-in-time access.
- Logging.
- EDR.
- DLP.

## Error Comun

Pensar que Zero Trust es una herramienta. Es un enfoque de arquitectura.

## Practica

Caso:

```text
Empleado remoto quiere acceder a panel administrativo.
```

Define:

- Que verificas.
- Que permisos das.
- Que logs guardas.
- Que haces si el dispositivo no cumple.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar Zero Trust.
- Explicar minimo privilegio.
- Explicar acceso condicional.
- Diseñar acceso con validaciones.
