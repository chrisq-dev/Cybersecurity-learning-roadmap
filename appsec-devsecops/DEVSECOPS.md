# DevSecOps

## Objetivo

Entender como integrar seguridad en pipelines, despliegues y operación.

## Qué es DevSecOps

DevSecOps busca que seguridad sea parte del flujo de desarrollo y despliegue.

No significa llenar todo de herramientas; significa crear controles repetibles.

El objetivo es detectar riesgos temprano y reducir errores repetidos. Si seguridad solo revisa al final, los cambios son más caros y el equipo puede ver seguridad como bloqueo. DevSecOps integra controles donde el equipo ya trabaja: repositorio, pipeline, revisión de código, despliegue y monitoreo.

## Pipeline CI/CD

Un pipeline puede:

1. Descargar código.
2. Instalar dependencias.
3. Ejecutar tests.
4. Construir artefactos.
5. Escanear.
6. Desplegar.

Cada fase puede introducir riesgo. Una dependencia comprometida entra al instalar paquetes. Un secreto puede filtrarse en logs. Un token de deploy con permisos amplios puede modificar produccion. Un artefacto no verificado puede ser reemplazado. DevSecOps busca que esos riesgos sean visibles y controlados.

## Controles de Seguridad

### Secret Scanning

Detecta secretos en código:

- API keys.
- Tokens.
- Llaves privadas.
- Passwords.

### Dependency Scanning

Busca dependencias vulnerables.

### SAST

Busca patrones inseguros en código.

### Container Scanning

Busca vulnerabilidades en imágenes.

### IaC Scanning

Revisa Terraform, CloudFormation u otros archivos de infraestructura.

## Riesgos de CI/CD

- Tokens con demasiados permisos.
- Secrets expuestos en logs.
- Dependencias comprometidas.
- Runners inseguros.
- Deploy sin revisión.
- Artefactos sin firma.

Supply chain security se refiere a la confianza en todo lo que participa en construir y entregar software: dependencias, acciones de CI, runners, imágenes base, artefactos, llaves, registros y personas con permisos. Un ataque no siempre explota la app; a veces compromete el camino que la construye.

## Buenas Prácticas

- Mínimo privilegio para tokens.
- Proteger ramas principales.
- Revisiones de pull request.
- Rotar secretos.
- No imprimir secretos en logs.
- Escanear dependencias.
- Separar ambientes.

## Ejemplo de Pipeline Seguro

Un pipeline seguro para una app puede verse asi:

```text
Commit -> Tests -> SAST -> Dependency Scan -> Build -> Deploy
```

Los puntos importantes de revisión son:

- Donde revisar secretos.
- Donde revisar dependencias.
- Donde bloquear deploy.
- Que logs guardar.

## Errores Comunes

- Activar herramientas sin revisar resultados.
- Dar permisos administrativos a tokens de CI.
- Guardar secretos como variables visibles para cualquier job.
- Ignorar dependencias transitivas.
- No separar ambientes.
- No definir quien decide si un hallazgo bloquea despliegue.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar CI/CD.
- Nombrar controles DevSecOps.
- Explicar riesgo de secretos.
- Explicar supply chain security a nivel básico.
