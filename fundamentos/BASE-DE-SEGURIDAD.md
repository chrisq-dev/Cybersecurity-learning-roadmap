# Base de Seguridad

## Objetivo

Entender los conceptos que aparecen en casi cualquier area de ciberseguridad.

## Conceptos Clave

### Confidencialidad

La informacion solo debe ser accesible para personas o sistemas autorizados.

Ejemplos:

- Cifrado.
- Control de acceso.
- MFA.
- Clasificacion de datos.

### Integridad

La informacion no debe ser modificada sin autorizacion.

Ejemplos:

- Hashes.
- Firmas digitales.
- Control de cambios.
- Permisos.

### Disponibilidad

Los sistemas deben estar funcionando cuando se necesitan.

Ejemplos:

- Backups.
- Redundancia.
- Monitoreo.
- Proteccion contra DoS.

## Riesgo

Formula mental:

```text
Riesgo = amenaza + vulnerabilidad + impacto
```

Ejemplo:

- Activo: servidor web.
- Amenaza: atacante externo.
- Vulnerabilidad: panel admin sin MFA.
- Impacto: acceso no autorizado.
- Control: MFA, restriccion por IP, monitoreo y logs.

## Practica

Elige 3 activos:

- Tu laptop.
- Una cuenta de correo.
- Un servidor web imaginario.

Para cada uno escribe:

- Activo.
- Amenaza.
- Vulnerabilidad.
- Impacto.
- Control preventivo.
- Control detectivo.
- Control correctivo.

## Criterio de Dominio

Puedes avanzar cuando puedas explicar:

- CIA triad.
- Diferencia entre amenaza y vulnerabilidad.
- Que es un control.
- Como reducir un riesgo.
