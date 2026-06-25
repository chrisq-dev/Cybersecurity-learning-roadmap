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
- Logs parciales.
- Access keys antiguas.

## Alcance

Incluido:

- IAM;
- MFA;
- Access keys;
- Storage público;
- Security groups/firewall;
- Logging;
- Secretos;
- Backups;
- Recomendaciones.

Fuera de alcance:

- Crear infraestructura real;
- Probar cuentas reales;
- Explotar servicios;
- Usar datos sensibles.

## Fase 1: Inventario

Tabla:

| Recurso | Tipo | Owner | Criticidad | Exposición | Datos |
| --- | --- | --- | --- | --- | --- |

Incluye al menos:

- Aplicación web;
- Base de datos;
- Bucket público;
- Bucket privado;
- Identidad admin;
- Service account de CI/CD;
- Secret manager;
- Logs.

## Fase 2: IAM

Revisa:

- Usuarios sin MFA;
- Permisos admin;
- Service accounts;
- Access keys antiguas;
- Roles sin owner;
- Permisos wildcard.

Preguntas:

- Quién puede modificar IAM?
- Quién puede leer secretos?
- Quién puede borrar logs?
- Qué identidades no se usan?
- Qué permisos deberian ser temporales?

## Fase 3: Storage

Revisa:

- Acceso público;
- Cifrado;
- Versionado;
- Logs de acceso;
- Políticas;
- Datos sensibles.

Tabla:

| Bucket | Datos | Público | Cifrado | Versionado | Riesgo |
| --- | --- | --- | --- | --- | --- |

## Fase 4: Red

Revisa:

- Puertos administrativos expuestos;
- Reglas `0.0.0.0/0`;
- Segmentación;
- Acceso a base de datos;
- Egress.

Preguntas:

- Qué recursos son accesibles desde internet?
- Qué recursos solo deberian ser internos?
- Qué acceso administrativo existe?
- Qué reglas no tienen justificacion?

## Fase 5: Logging y Detección

Define alertas para:

- Login root/admin;
- MFA deshabilitado;
- Bucket público;
- Creación de access key;
- Cambio de políticas IAM;
- Security group abierto;
- Logs desactivados.

Tabla:

| Alerta | Fuente | Severidad | Acción |
| --- | --- | --- | --- |

## Fase 6: Priorización

Usa esta matriz:

| Hallazgo | Impacto | Exposición | Probabilidad | Prioridad | Remediación |
| --- | --- | --- | --- | --- | --- |

No priorices solo por severidad técnica. Considera datos, exposición, facilidad de abuso y controles existentes.

## Fase 7: Plan 30-60-90

Ejemplo:

| Periodo | Acción | Riesgo que reduce | Evidencia |
| --- | --- | --- | --- |
| 30 días | MFA en admins | cuenta comprometida | reporte MFA |
| 60 días | storage privado y versionado | fuga/borrado | configuración validada |
| 90 días | detecciones IAM | abuso de permisos | alertas probadas |

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

## Criterio de Éxito

- Priorización con contexto.
- Controles IAM concretos.
- Logging y alertas definidos.
- Riesgos de storage cubiertos.
- Red expuesta revisada.
- Remediaciones verificables.

## Rúbrica

| Nivel | Evidencia |
| --- | --- |
| Básico | Lista hallazgos |
| Bueno | Explica impacto |
| Fuerte | Prioriza con contexto |
| Portafolio | Propone plan verificable 30-60-90 |
