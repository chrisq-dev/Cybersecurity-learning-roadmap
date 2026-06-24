# Fundamentos de Cloud Security

## Objetivo

Entender los riesgos principales de seguridad en la nube.

Cloud security no significa que el proveedor haga todo por ti. Significa que debes entender que controles heredas, que controles configuras y que errores pueden exponer identidades, datos, redes y servicios completos en minutos.

## Mapa Mental

```text
identidad -> permisos -> recurso -> red -> datos -> logs -> respuesta
```

La mayoria de incidentes cloud empiezan con una de estas causas:

- Credenciales filtradas.
- Permisos excesivos.
- Storage publico.
- Logs desactivados.
- Recursos expuestos a internet.
- Secretos guardados en codigo o pipelines.

## Responsabilidad Compartida

El proveedor cloud protege parte de la infraestructura. El cliente sigue siendo responsable de configuracion, identidades, datos y permisos segun el servicio usado.

Preguntas:

- Quien protege el datacenter?
- Quien configura IAM?
- Quien decide si un bucket es publico?
- Quien revisa logs?

Ejemplo:

| Capa | Usualmente responsable |
| --- | --- |
| Datacenter fisico | Proveedor |
| Hardware | Proveedor |
| Hypervisor | Proveedor |
| Sistema operativo en VM | Cliente |
| Parches en una VM | Cliente |
| IAM | Cliente |
| Datos | Cliente |
| Configuracion de storage | Cliente |
| Logs y alertas | Cliente |

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

## IAM

IAM controla quien puede hacer que.

Conceptos:

- Usuario: identidad humana o tecnica.
- Grupo: coleccion de usuarios.
- Rol: identidad asumible por servicios o usuarios.
- Politica: reglas que permiten o niegan acciones.
- Recurso: objeto cloud afectado.

Regla central:

```text
minimo privilegio = solo los permisos necesarios, por el tiempo necesario, sobre los recursos necesarios
```

Preguntas:

- Esta identidad necesita permisos admin?
- Puede crear llaves permanentes?
- Puede leer secretos?
- Puede modificar logs?
- Puede compartir recursos publicamente?

## Storage

Storage mal configurado es una fuente clasica de fuga de datos.

Controles:

- Bloquear acceso publico por defecto.
- Cifrado en reposo.
- Versionado.
- Logs de acceso.
- Politicas restrictivas.
- Clasificacion de datos.
- Eliminacion segura.

## Redes Cloud

Elementos comunes:

- VPC/VNet.
- Subnets publicas y privadas.
- Security groups.
- Network ACLs.
- Load balancers.
- NAT gateways.
- VPN.

Pregunta defensiva:

```text
Que recursos son alcanzables desde internet y por que?
```

## Riesgos Comunes

- Permisos excesivos.
- Buckets publicos.
- Llaves expuestas.
- Logs desactivados.
- Falta de MFA.
- Security groups abiertos a internet.

## Logging y Deteccion

Sin logs, no hay investigacion.

Eventos importantes:

- Login exitoso y fallido.
- Cambios de politicas IAM.
- Creacion de llaves.
- Cambios de storage publico.
- Cambios de firewall/security groups.
- Acceso a secretos.
- Eliminacion de logs.

Alertas iniciales:

- Usuario root usado.
- MFA deshabilitado.
- Politica admin agregada.
- Bucket publico.
- Puerto 22 o 3389 abierto a internet.
- Llave creada para usuario privilegiado.

## Errores Comunes de Principiante

- Pensar que cloud es seguro por defecto.
- Usar usuarios admin para todo.
- Guardar access keys en repositorios.
- No activar logs.
- Abrir `0.0.0.0/0` sin justificar.
- No separar ambientes dev, staging y prod.

## Criterios de Revision

Sin crear infraestructura real, una revision cloud inicial debe cubrir:

- 5 errores comunes de IAM.
- 5 controles para proteger storage.
- 5 logs importantes en cloud.
- 5 preguntas que harias en una revision cloud.

La parte importante es entender por que cada punto reduce riesgo: IAM limita abuso de identidad, storage protege datos, los logs dan visibilidad y las preguntas de revision revelan supuestos inseguros.

## Ejemplo de Revision Cloud en Papel

Imagina esta cuenta:

```text
Usuario root sin MFA.
Tres usuarios con permisos AdministratorAccess.
Bucket con datos de clientes publico.
Security group permite 0.0.0.0/0 hacia SSH.
Logs desactivados.
Llaves de acceso viejas sin rotacion.
```

Una revision basica puede incluir:

1. Hallazgos ordenados por riesgo.
2. Impacto de cada hallazgo.
3. Evidencia que pedirias.
4. Remediacion inmediata.
5. Control preventivo para que no se repita.

## Checklist Inicial

- MFA obligatorio.
- Sin uso diario de root.
- Politicas de minimo privilegio.
- Storage privado por defecto.
- Logs activados y protegidos.
- Secretos fuera del codigo.
- Puertos administrativos restringidos.
- Backups y versionado donde aplique.

## Criterio de Dominio

Puedes avanzar cuando puedas explicar:

- Responsabilidad compartida.
- IAM.
- Riesgos de storage publico.
- Importancia de logging.
- Por que secretos no van en codigo.
- Como priorizar hallazgos cloud por impacto.
