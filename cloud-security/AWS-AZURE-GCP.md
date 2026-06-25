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

- S3 público.
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
- Storage público.
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
- Buckets públicos.
- Llaves de service account expuestas.
- Audit logs incompletos.
- Firewall rules abiertas.

## Comparación Rapida

| Concepto | AWS | Azure | GCP |
| --- | --- | --- | --- |
| Identidad | IAM | Entra ID / RBAC | IAM |
| Storage | S3 | Storage Account | Cloud Storage |
| Red | VPC | VNet | VPC |
| Firewall | Security Groups | NSG | Firewall Rules |
| Auditoria | CloudTrail | Activity Log | Cloud Audit Logs |
| Secretos | Secrets Manager | Key Vault | Secret Manager |

## Criterios Básicos Cloud

Una postura cloud básica debe considerar:

- MFA en cuentas privilegiadas;
- Permisos revisados;
- Storage no público salvo necesidad justificada;
- Logs de auditoria activos;
- Llaves antiguas rotadas o eliminadas;
- Security groups y firewalls revisados;
- Secretos fuera del código y dentro de servicios diseñados para secretos;
- Backups definidos según criticidad.

## Comparación Conceptual

Para comparar proveedores conviene ubicar:

- Cómo se llama el servicio de identidad?
- Cómo se llama storage de objetos?
- Cómo se auditan acciones?
- Cómo se guardan secretos?
- Qué control evita exposición pública?

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar responsabilidad compartida.
- Comparar IAM entre proveedores.
- Identificar riesgos de storage público.
- Nombrar logs de auditoria por proveedor.
