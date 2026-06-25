# Capstone: AppSec Review

## Objetivo

Evaluar una aplicación web ficticia desde diseño, API, OWASP y DevSecOps.

Este proyecto demuestra que puedes razonar como AppSec engineer junior: identificar activos, modelar permisos, encontrar riesgos, proponer controles y comunicar hallazgos.

## Escenario

Aplicación de notas:

- Usuarios crean notas.
- Usuarios comparten notas.
- Admin puede gestionar usuarios.
- API REST.
- Base de datos.

## Alcance

Incluido:

- Modelo de roles;
- Endpoints;
- Autorización por recurso;
- Riesgos OWASP;
- API security;
- Logging;
- Controles CI/CD;
- Recomendaciones.

Fuera de alcance:

- Explotar sistemas reales;
- Pruebas contra terceros;
- Payloads ofensivos fuera de laboratorio;
- Datos reales de usuarios.

## Puntos a observar

1. Modelar roles.
2. Definir endpoints.
3. Identificar riesgos OWASP.
4. Revisar autorización por objeto.
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

El análisis debe incluir:

- Datos sensibles;
- Flujos de autenticación;
- Flujos de compartir notas;
- Acciones administrativas.

## Fase 2: Matriz de Permisos

Tabla mínima:

| Recurso | Owner | Usuario autenticado | Soporte | Admin |
| --- | --- | --- | --- | --- |
| Nota propia |  |  |  |  |
| Nota compartida |  |  |  |  |
| Nota ajena |  |  |  |  |
| Usuario |  |  |  |  |
| Logs |  |  |  |  |

## Fase 3: Riesgos OWASP

Mínimo cubre:

- Broken Access Control.
- Injection.
- Identification and Authentication Failures.
- Security Misconfiguration.
- Vulnerable Components.
- Logging and Monitoring Failures.

Para cada riesgo:

- Causa;
- Ejemplo en la app;
- Impacto;
- Control;
- Prueba sugerida;
- Evidencia esperada.

## Fase 4: API Security

Define:

- Endpoints;
- Método;
- Autenticación requerida;
- Autorización por recurso;
- Rate limit;
- Logs;
- Errores esperados.

Tabla:

| Endpoint | Método | Auth requerida | Regla de autorización | Riesgo |
| --- | --- | --- | --- | --- |

## Fase 5: DevSecOps

Propone controles:

- Secret scanning;
- Dependency scanning;
- SAST;
- Pruebas de autorización;
- Revisión de IaC si aplica;
- Protección de ramas;
- Variables seguras;
- Logs de despliegue.

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

## Criterio de Éxito

- Incluye Broken Access Control.
- Incluye validación de entrada.
- Incluye logs seguros.
- Incluye controles de pipeline.
- Incluye matriz de permisos.
- Incluye endpoints con reglas de autorización.
- Incluye remediaciones verificables.
- Separa riesgo, impacto y control.

## Rúbrica

| Nivel | Evidencia |
| --- | --- |
| Básico | Lista riesgos OWASP |
| Bueno | Explica impacto y mitigacion |
| Fuerte | Incluye matriz de permisos, API y logs |
| Portafolio | Reporte claro, reproducible, con prioridades y remediación verificable |
