# AWS, Azure y GCP para Seguridad

## Objetivo

Entender diferencias y conceptos comunes entre proveedores cloud.

## Conceptos Comunes

Aunque cada proveedor cambia nombres, casi todos tienen:

- Identidad y permisos.
- Redes virtuales.
- Maquinas virtuales.
- Storage.
- Logs.
- Monitoreo.
- Secret management.
- Bases de datos.
- Kubernetes o contenedores.

## AWS

Conceptos importantes:

- IAM Users, Groups, Roles y Policies.
- S3 para object storage.
- VPC para redes.
- Security Groups.
- CloudTrail para auditoria.
- CloudWatch para logs y metricas.
- Secrets Manager.

Riesgos comunes:

- S3 publico.
- IAM policies demasiado amplias.
- Access keys antiguas.
- Security Groups abiertos a `0.0.0.0/0`.
- CloudTrail desactivado.

## Azure

Conceptos importantes:

- Microsoft Entra ID.
- Subscriptions.
- Resource Groups.
- Role-Based Access Control.
- Storage Accounts.
- Network Security Groups.
- Azure Monitor.
- Defender for Cloud.
- Key Vault.

Riesgos comunes:

- Roles demasiado amplios.
- Storage publico.
- Falta de MFA.
- Logs no enviados a Log Analytics.
- Secrets fuera de Key Vault.

## GCP

Conceptos importantes:

- IAM.
- Projects.
- Service Accounts.
- Cloud Storage.
- VPC.
- Firewall Rules.
- Cloud Audit Logs.
- Secret Manager.

Riesgos comunes:

- Service accounts con permisos excesivos.
- Buckets publicos.
- Llaves de service account expuestas.
- Audit logs incompletos.
- Firewall rules abiertas.

## Comparacion Rapida

| Concepto | AWS | Azure | GCP |
| --- | --- | --- | --- |
| Identidad | IAM | Entra ID / RBAC | IAM |
| Storage | S3 | Storage Account | Cloud Storage |
| Red | VPC | VNet | VPC |
| Firewall | Security Groups | NSG | Firewall Rules |
| Auditoria | CloudTrail | Activity Log | Cloud Audit Logs |
| Secretos | Secrets Manager | Key Vault | Secret Manager |

## Criterios Basicos Cloud

Una postura cloud basica debe considerar:

- MFA en cuentas privilegiadas;
- permisos revisados;
- storage no publico salvo necesidad justificada;
- logs de auditoria activos;
- llaves antiguas rotadas o eliminadas;
- security groups y firewalls revisados;
- secretos fuera del codigo y dentro de servicios diseñados para secretos;
- backups definidos segun criticidad.

## Practica Conceptual

Para cada proveedor responde:

- Como se llama el servicio de identidad?
- Como se llama storage de objetos?
- Como se auditan acciones?
- Como se guardan secretos?
- Que control evita exposicion publica?

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar responsabilidad compartida.
- Comparar IAM entre proveedores.
- Identificar riesgos de storage publico.
- Nombrar logs de auditoria por proveedor.
