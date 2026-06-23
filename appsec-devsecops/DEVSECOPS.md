# DevSecOps

## Objetivo

Entender como integrar seguridad en pipelines, despliegues y operacion.

## Que es DevSecOps

DevSecOps busca que seguridad sea parte del flujo de desarrollo y despliegue.

No significa llenar todo de herramientas; significa crear controles repetibles.

## Pipeline CI/CD

Un pipeline puede:

1. Descargar codigo.
2. Instalar dependencias.
3. Ejecutar tests.
4. Construir artefactos.
5. Escanear.
6. Desplegar.

## Controles de Seguridad

### Secret Scanning

Detecta secretos en codigo:

- API keys.
- Tokens.
- Llaves privadas.
- Passwords.

### Dependency Scanning

Busca dependencias vulnerables.

### SAST

Busca patrones inseguros en codigo.

### Container Scanning

Busca vulnerabilidades en imagenes.

### IaC Scanning

Revisa Terraform, CloudFormation u otros archivos de infraestructura.

## Riesgos de CI/CD

- Tokens con demasiados permisos.
- Secrets expuestos en logs.
- Dependencias comprometidas.
- Runners inseguros.
- Deploy sin revision.
- Artefactos sin firma.

## Buenas Practicas

- Minimo privilegio para tokens.
- Proteger ramas principales.
- Revisiones de pull request.
- Rotar secretos.
- No imprimir secretos en logs.
- Escanear dependencias.
- Separar ambientes.

## Practica

Diseña un pipeline seguro para una app:

```text
Commit -> Tests -> SAST -> Dependency Scan -> Build -> Deploy
```

Agrega:

- Donde revisar secretos.
- Donde revisar dependencias.
- Donde bloquear deploy.
- Que logs guardar.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar CI/CD.
- Nombrar controles DevSecOps.
- Explicar riesgo de secretos.
- Explicar supply chain security a nivel basico.
