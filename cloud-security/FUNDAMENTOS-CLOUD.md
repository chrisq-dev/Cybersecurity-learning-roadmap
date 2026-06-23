# Fundamentos de Cloud Security

## Objetivo

Entender los riesgos principales de seguridad en la nube.

## Responsabilidad Compartida

El proveedor cloud protege parte de la infraestructura. El cliente sigue siendo responsable de configuracion, identidades, datos y permisos segun el servicio usado.

Preguntas:

- Quien protege el datacenter?
- Quien configura IAM?
- Quien decide si un bucket es publico?
- Quien revisa logs?

## Temas Clave

- IAM.
- MFA.
- Roles y politicas.
- Storage publico.
- Security groups.
- Redes cloud.
- Logs.
- Secret management.
- Backups.
- Monitoreo.

## Riesgos Comunes

- Permisos excesivos.
- Buckets publicos.
- Llaves expuestas.
- Logs desactivados.
- Falta de MFA.
- Security groups abiertos a internet.

## Practica

Sin crear infraestructura real, documenta:

- 5 errores comunes de IAM.
- 5 controles para proteger storage.
- 5 logs importantes en cloud.
- 5 preguntas que harias en una revision cloud.

## Criterio de Dominio

Puedes avanzar cuando puedas explicar:

- Responsabilidad compartida.
- IAM.
- Riesgos de storage publico.
- Importancia de logging.
- Por que secretos no van en codigo.
