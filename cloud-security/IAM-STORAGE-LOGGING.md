# IAM, Storage y Logging en Cloud

## Objetivo

Entender tres áreas críticas de seguridad cloud: identidad, almacenamiento y visibilidad.

## IAM

IAM significa Identity and Access Management.

Controla:

- Quien puede entrar.
- Que permisos tiene.
- Sobre que recursos.
- Bajo que condiciones.

Ejemplos de identidades:

- Usuario.
- Rol.
- Cuenta de servicio.
- Grupo.
- Aplicación.

## Políticas

Una política define permisos.

Preguntas:

- Qué acción permite?
- Sobre qué recurso?
- A quién aplica?
- Tiene condiciones?

Riesgo común:

```text
Permitir todo sobre todos los recursos.
```

Conceptualmente:

```text
Action: *
Resource: *
```

## Mínimo Privilegio en Cloud

Dar solo permisos necesarios.

Mal ejemplo:

- Una app que solo lee archivos tiene permisos de administrador.

Buen ejemplo:

- Una app solo puede leer el bucket que necesita.

## Storage

Servicios de almacenamiento de objetos como buckets.

Riesgos:

- Bucket público.
- Datos sensibles sin cifrado.
- Logs desactivados.
- Permisos heredados mal.
- Llaves expuestas.

Buenas prácticas:

- Bloquear acceso público por defecto.
- Cifrar datos sensibles.
- Activar logs.
- Usar políticas especificas.
- Revisar permisos regularmente.

## Logging

En cloud, logging permite investigar:

- Quien hizo cambios.
- Desde donde.
- Que recurso fue modificado.
- Que permisos se usaron.
- Si hubo acceso sospechoso.

Eventos importantes:

- Login.
- Cambio de permisos.
- Creación de llaves.
- Acceso a storage.
- Cambios de red.
- Desactivación de logs.

## Riesgos Comunes

- MFA desactivado en cuentas privilegiadas.
- Access keys antiguas.
- Roles demasiado amplios.
- Storage público accidental.
- Security groups abiertos a internet.
- Logs no habilitados.
- Secretos en repositorios.

## Ejemplo de Revisión Cloud

Para una app web en cloud, la revisión debe aclarar:

- Que identidad usa.
- Que permisos necesita.
- Que storage usa.
- Que logs deben activarse.
- Que alertas deberian existir.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar IAM.
- Explicar mínimo privilegio.
- Explicar riesgo de buckets públicos.
- Nombrar eventos cloud importantes.
- Explicar por que logs cloud son críticos.
