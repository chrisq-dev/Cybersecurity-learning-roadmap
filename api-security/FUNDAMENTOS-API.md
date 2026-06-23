# Fundamentos de API Security

## Objetivo

Entender como funcionan APIs y que riesgos de seguridad aparecen con frecuencia.

## Que es una API

Una API permite que sistemas se comuniquen.

Ejemplo:

```http
GET /api/users/123
```

Respuesta:

```json
{
  "id": 123,
  "name": "Ana"
}
```

## REST

REST usa recursos y metodos HTTP.

Ejemplos:

- `GET /users` listar.
- `GET /users/123` obtener.
- `POST /users` crear.
- `PATCH /users/123` actualizar.
- `DELETE /users/123` eliminar.

## Autenticacion

La API debe saber quien llama.

Opciones:

- Session cookies.
- Bearer tokens.
- API keys.
- OAuth/OIDC.
- mTLS en casos avanzados.

## Autorizacion

La API debe validar que la identidad puede hacer la accion.

Ejemplo:

Un usuario con ID 123 no deberia poder leer:

```text
/api/users/456
```

si no tiene permiso.

## Tokens

Un token representa acceso.

Riesgos:

- Token expuesto.
- Token sin expiracion.
- Token con demasiados permisos.
- Token guardado en frontend de forma insegura.

## Validacion

Validar:

- Tipos.
- Rangos.
- Longitud.
- Formatos.
- Campos permitidos.

## Practica

Diseña una API para notas:

```text
GET /notes
GET /notes/{id}
POST /notes
PATCH /notes/{id}
DELETE /notes/{id}
```

Define:

- Quien puede crear.
- Quien puede leer.
- Quien puede modificar.
- Que logs guardar.
- Que errores devolver.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar REST.
- Explicar autenticacion en APIs.
- Explicar autorizacion por recurso.
- Identificar riesgos de tokens.
