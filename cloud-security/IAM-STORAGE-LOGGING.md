# IAM, Storage y Logging en Cloud

## Objetivo

Entender tres areas criticas de seguridad cloud: identidad, almacenamiento y visibilidad.

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
- Aplicacion.

## Politicas

Una politica define permisos.

Preguntas:

- Que accion permite?
- Sobre que recurso?
- A quien aplica?
- Tiene condiciones?

Riesgo comun:

```text
Permitir todo sobre todos los recursos.
```

Conceptualmente:

```text
Action: *
Resource: *
```

## Minimo Privilegio en Cloud

Dar solo permisos necesarios.

Mal ejemplo:

- Una app que solo lee archivos tiene permisos de administrador.

Buen ejemplo:

- Una app solo puede leer el bucket que necesita.

## Storage

Servicios de almacenamiento de objetos como buckets.

Riesgos:

- Bucket publico.
- Datos sensibles sin cifrado.
- Logs desactivados.
- Permisos heredados mal.
- Llaves expuestas.

Buenas practicas:

- Bloquear acceso publico por defecto.
- Cifrar datos sensibles.
- Activar logs.
- Usar politicas especificas.
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
- Creacion de llaves.
- Acceso a storage.
- Cambios de red.
- Desactivacion de logs.

## Riesgos Comunes

- MFA desactivado en cuentas privilegiadas.
- Access keys antiguas.
- Roles demasiado amplios.
- Storage publico accidental.
- Security groups abiertos a internet.
- Logs no habilitados.
- Secretos en repositorios.

## Practica Conceptual

Para una app web en cloud, define:

- Que identidad usa.
- Que permisos necesita.
- Que storage usa.
- Que logs deben activarse.
- Que alertas deberian existir.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar IAM.
- Explicar minimo privilegio.
- Explicar riesgo de buckets publicos.
- Nombrar eventos cloud importantes.
- Explicar por que logs cloud son criticos.
