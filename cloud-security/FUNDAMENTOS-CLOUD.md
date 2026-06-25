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
- Storage público.
- Logs desactivados.
- Recursos expuestos a internet.
- Secretos guardados en código o pipelines.

## Responsabilidad Compartida

El proveedor cloud protege parte de la infraestructura. El cliente sigue siendo responsable de configuración, identidades, datos y permisos según el servicio usado.

Preguntas:

- Quién protege el datacenter?
- Quién configura IAM?
- Quién decide si un bucket es público?
- Quién revisa logs?

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
| Configuración de storage | Cliente |
| Logs y alertas | Cliente |

## Temas Clave

- IAM.
- MFA.
- Roles y políticas.
- Storage público.
- Security groups.
- Redes cloud.
- Logs.
- Secret management.
- Backups.
- Monitoreo.

## IAM

IAM controla quien puede hacer que.

Conceptos:

- Usuario: identidad humana o técnica.
- Grupo: colección de usuarios.
- Rol: identidad asumible por servicios o usuarios.
- Política: reglas que permiten o niegan acciones.
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

- Bloquear acceso público por defecto.
- Cifrado en reposo.
- Versionado.
- Logs de acceso.
- Políticas restrictivas.
- Clasificación de datos.
- Eliminación segura.

## Redes Cloud

Elementos comunes:

- VPC/VNet.
- Subnets públicas y privadas.
- Security groups.
- Network ACLs.
- Load balancers.
- NAT gateways.
- VPN.

Pregunta defensiva:

```text
Qué recursos son alcanzables desde internet y por qué?
```

## Riesgos Comunes

- Permisos excesivos.
- Buckets públicos.
- Llaves expuestas.
- Logs desactivados.
- Falta de MFA.
- Security groups abiertos a internet.

## Logging y Detección

Sin logs, no hay investigación.

Eventos importantes:

- Login exitoso y fallido.
- Cambios de políticas IAM.
- Creación de llaves.
- Cambios de storage público.
- Cambios de firewall/security groups.
- Acceso a secretos.
- Eliminación de logs.

Alertas iniciales:

- Usuario root usado.
- MFA deshabilitado.
- Política admin agregada.
- Bucket público.
- Puerto 22 o 3389 abierto a internet.
- Llave creada para usuario privilegiado.

## Errores Comunes de Principiante

- Pensar que cloud es seguro por defecto.
- Usar usuarios admin para todo.
- Guardar access keys en repositorios.
- No activar logs.
- Abrir `0.0.0.0/0` sin justificar.
- No separar ambientes dev, staging y prod.

## Criterios de Revisión

Sin crear infraestructura real, una revisión cloud inicial debe cubrir:

- 5 errores comunes de IAM.
- 5 controles para proteger storage.
- 5 logs importantes en cloud.
- 5 preguntas que harias en una revisión cloud.

La parte importante es entender por que cada punto reduce riesgo: IAM limita abuso de identidad, storage protege datos, los logs dan visibilidad y las preguntas de revisión revelan supuestos inseguros.

## Ejemplo de Revisión Cloud en Papel

Imagina esta cuenta:

```text
Usuario root sin MFA.
Tres usuarios con permisos AdministratorAccess.
Bucket con datos de clientes público.
Security group permite 0.0.0.0/0 hacia SSH.
Logs desactivados.
Llaves de acceso viejas sin rotacion.
```

Una revisión básica puede incluir:

1. Hallazgos ordenados por riesgo.
2. Impacto de cada hallazgo.
3. Evidencia que pedirias.
4. Remediación inmediata.
5. Control preventivo para que no se repita.

## Checklist Inicial

- MFA obligatorio.
- Sin uso diario de root.
- Políticas de mínimo privilegio.
- Storage privado por defecto.
- Logs activados y protegidos.
- Secretos fuera del código.
- Puertos administrativos restringidos.
- Backups y versionado donde aplique.

## Criterio de Dominio

Puedes avanzar cuando puedas explicar:

- Responsabilidad compartida.
- IAM.
- Riesgos de storage público.
- Importancia de logging.
- Por que secretos no van en código.
- Como priorizar hallazgos cloud por impacto.
