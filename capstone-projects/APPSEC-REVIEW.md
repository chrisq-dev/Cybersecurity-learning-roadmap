# Capstone: AppSec Review

## Objetivo

Evaluar una aplicacion web ficticia desde diseño, API, OWASP y DevSecOps.

Este proyecto demuestra que puedes razonar como AppSec engineer junior: identificar activos, modelar permisos, encontrar riesgos, proponer controles y comunicar hallazgos.

## Escenario

Aplicacion de notas:

- Usuarios crean notas.
- Usuarios comparten notas.
- Admin puede gestionar usuarios.
- API REST.
- Base de datos.

## Alcance

Incluido:

- modelo de roles;
- endpoints;
- autorizacion por recurso;
- riesgos OWASP;
- API security;
- logging;
- controles CI/CD;
- recomendaciones.

Fuera de alcance:

- explotar sistemas reales;
- pruebas contra terceros;
- payloads ofensivos fuera de laboratorio;
- datos reales de usuarios.

## Puntos a observar

1. Modelar roles.
2. Definir endpoints.
3. Identificar riesgos OWASP.
4. Revisar autorizacion por objeto.
5. Diseñar logs.
6. Proponer controles CI/CD.
7. Crear checklist de pruebas.

## Fase 1: Arquitectura

La arquitectura base puede representarse asi:

```text
frontend -> API -> base de datos
             |
             -> storage/logs
```

El analisis debe incluir:

- datos sensibles;
- flujos de autenticacion;
- flujos de compartir notas;
- acciones administrativas.

## Fase 2: Matriz de Permisos

Tabla minima:

| Recurso | Owner | Usuario autenticado | Soporte | Admin |
| --- | --- | --- | --- | --- |
| Nota propia |  |  |  |  |
| Nota compartida |  |  |  |  |
| Nota ajena |  |  |  |  |
| Usuario |  |  |  |  |
| Logs |  |  |  |  |

## Fase 3: Riesgos OWASP

Minimo cubre:

- Broken Access Control.
- Injection.
- Identification and Authentication Failures.
- Security Misconfiguration.
- Vulnerable Components.
- Logging and Monitoring Failures.

Para cada riesgo:

- causa;
- ejemplo en la app;
- impacto;
- control;
- prueba sugerida;
- evidencia esperada.

## Fase 4: API Security

Define:

- endpoints;
- metodo;
- autenticacion requerida;
- autorizacion por recurso;
- rate limit;
- logs;
- errores esperados.

Tabla:

| Endpoint | Metodo | Auth requerida | Regla de autorizacion | Riesgo |
| --- | --- | --- | --- | --- |

## Fase 5: DevSecOps

Propone controles:

- secret scanning;
- dependency scanning;
- SAST;
- pruebas de autorizacion;
- revision de IaC si aplica;
- proteccion de ramas;
- variables seguras;
- logs de despliegue.

## Estructura sugerida

```md
# AppSec Review

## Resumen Ejecutivo

## Alcance

## Arquitectura

## Roles y Permisos

## Endpoints

## Riesgos OWASP

## Controles API

## Logging

## DevSecOps

## Recomendaciones
```

## Criterio de Exito

- Incluye Broken Access Control.
- Incluye validacion de entrada.
- Incluye logs seguros.
- Incluye controles de pipeline.
- Incluye matriz de permisos.
- Incluye endpoints con reglas de autorizacion.
- Incluye remediaciones verificables.
- Separa riesgo, impacto y control.

## Rubrica

| Nivel | Evidencia |
| --- | --- |
| Basico | Lista riesgos OWASP |
| Bueno | Explica impacto y mitigacion |
| Fuerte | Incluye matriz de permisos, API y logs |
| Portafolio | Reporte claro, reproducible, con prioridades y remediacion verificable |
