# Capstone: Cloud Security Review

## Objetivo

Evaluar una cuenta cloud ficticia desde IAM, storage, red, logging, secretos y respuesta.

Este proyecto demuestra que puedes pensar como analista cloud security junior: revisar configuraciones, priorizar riesgos y proponer remediaciones verificables.

## Escenario

Una startup tiene:

- 1 cuenta cloud principal.
- 8 usuarios humanos.
- 5 service accounts.
- 3 buckets de storage.
- 2 aplicaciones web.
- 1 base de datos administrada.
- logs parciales.
- access keys antiguas.

## Alcance

Incluido:

- IAM;
- MFA;
- access keys;
- storage publico;
- security groups/firewall;
- logging;
- secretos;
- backups;
- recomendaciones.

Fuera de alcance:

- crear infraestructura real;
- probar cuentas reales;
- explotar servicios;
- usar datos sensibles.

## Fase 1: Inventario

Tabla:

| Recurso | Tipo | Owner | Criticidad | Exposicion | Datos |
| --- | --- | --- | --- | --- | --- |

Incluye al menos:

- aplicacion web;
- base de datos;
- bucket publico;
- bucket privado;
- identidad admin;
- service account de CI/CD;
- secret manager;
- logs.

## Fase 2: IAM

Revisa:

- usuarios sin MFA;
- permisos admin;
- service accounts;
- access keys antiguas;
- roles sin owner;
- permisos wildcard.

Preguntas:

- Quien puede modificar IAM?
- Quien puede leer secretos?
- Quien puede borrar logs?
- Que identidades no se usan?
- Que permisos deberian ser temporales?

## Fase 3: Storage

Revisa:

- acceso publico;
- cifrado;
- versionado;
- logs de acceso;
- politicas;
- datos sensibles.

Tabla:

| Bucket | Datos | Publico | Cifrado | Versionado | Riesgo |
| --- | --- | --- | --- | --- | --- |

## Fase 4: Red

Revisa:

- puertos administrativos expuestos;
- reglas `0.0.0.0/0`;
- segmentacion;
- acceso a base de datos;
- egress.

Preguntas:

- Que recursos son accesibles desde internet?
- Que recursos solo deberian ser internos?
- Que acceso administrativo existe?
- Que reglas no tienen justificacion?

## Fase 5: Logging y Deteccion

Define alertas para:

- login root/admin;
- MFA deshabilitado;
- bucket publico;
- creacion de access key;
- cambio de politicas IAM;
- security group abierto;
- logs desactivados.

Tabla:

| Alerta | Fuente | Severidad | Accion |
| --- | --- | --- | --- |

## Fase 6: Priorizacion

Usa esta matriz:

| Hallazgo | Impacto | Exposicion | Probabilidad | Prioridad | Remediacion |
| --- | --- | --- | --- | --- | --- |

No priorices solo por severidad tecnica. Considera datos, exposicion, facilidad de abuso y controles existentes.

## Fase 7: Plan 30-60-90

Ejemplo:

| Periodo | Accion | Riesgo que reduce | Evidencia |
| --- | --- | --- | --- |
| 30 dias | MFA en admins | cuenta comprometida | reporte MFA |
| 60 dias | storage privado y versionado | fuga/borrado | configuracion validada |
| 90 dias | detecciones IAM | abuso de permisos | alertas probadas |

## Estructura sugerida

```md
# Cloud Security Review

## Resumen Ejecutivo

## Alcance

## Inventario

## Hallazgos

## Riesgos Priorizados

## IAM

## Storage

## Red

## Logging

## Recomendaciones

## Plan 30-60-90
```

## Criterio de Exito

- Priorizacion con contexto.
- Controles IAM concretos.
- Logging y alertas definidos.
- Riesgos de storage cubiertos.
- Red expuesta revisada.
- Remediaciones verificables.

## Rubrica

| Nivel | Evidencia |
| --- | --- |
| Basico | Lista hallazgos |
| Bueno | Explica impacto |
| Fuerte | Prioriza con contexto |
| Portafolio | Propone plan verificable 30-60-90 |
