# Riesgo y Controles

## Objetivo

Aprender a convertir riesgos en controles y controles en evidencia.

## Activo

Algo que tiene valor.

Ejemplos:

- Datos.
- Sistemas.
- Cuentas.
- Repositorios.
- Infraestructura.

## Amenaza

Algo que podria causar daño.

Ejemplos:

- Phishing.
- Malware.
- Error humano.
- Acceso no autorizado.
- Proveedor comprometido.

## Vulnerabilidad

Debilidad explotable.

Ejemplos:

- Sin MFA.
- Software viejo.
- Bucket publico.
- Permisos excesivos.

## Control

Medida para reducir riesgo.

Tipos:

- Preventivo: evita.
- Detectivo: detecta.
- Correctivo: ayuda a recuperar.

Ejemplos:

| Riesgo | Preventivo | Detectivo | Correctivo |
| --- | --- | --- | --- |
| Cuenta comprometida | MFA | Alerta de login inusual | Reset de contraseña |
| Malware | EDR | Deteccion de proceso | Aislar equipo |
| Perdida de datos | Backups | Monitoreo de fallos | Restaurar backup |

## Riesgo Inherente y Residual

- Inherente: riesgo antes de controles.
- Residual: riesgo despues de controles.

## Aceptacion de Riesgo

A veces no se corrige inmediatamente. Se acepta temporalmente con:

- Justificacion.
- Owner.
- Fecha de expiracion.
- Controles compensatorios.

## Ejemplo de Matriz

Una matriz de ejemplo puede verse asi:

| Activo | Amenaza | Vulnerabilidad | Impacto | Control | Evidencia |
| --- | --- | --- | --- | --- | --- |

La lectura importante es separar cada columna. El activo es lo que se protege, la amenaza es lo que podria pasar, la vulnerabilidad es la debilidad que lo permite, el impacto explica el daño, el control reduce probabilidad o impacto y la evidencia demuestra que el control existe.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Diferenciar amenaza y vulnerabilidad.
- Explicar control preventivo/detectivo/correctivo.
- Explicar riesgo residual.
- Pedir evidencia adecuada.
