# Fundamentos de API Security

## Objetivo

Entender como funcionan APIs y que riesgos de seguridad aparecen con frecuencia.

Las APIs son la superficie real de muchas aplicaciones modernas. Aunque el frontend se vea bien, la API debe validar identidad, permisos, datos, límites y errores por si misma.

## Mapa Mental

```text
cliente -> endpoint -> autenticación -> autorización -> validación -> lógica -> datos -> respuesta
```

Cada endpoint debe responder:

- Quién llama?
- Qué quiere hacer?
- Sobre qué recurso?
- Tiene permiso?
- Los datos son validos?
- Qué debe quedar registrado?

## Qué es una API

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

REST usa recursos y métodos HTTP.

Ejemplos:

- `GET /users` listar.
- `GET /users/123` obtener.
- `POST /users` crear.
- `PATCH /users/123` actualizar.
- `DELETE /users/123` eliminar.

## Endpoint, Recurso y Acción

Un endpoint inseguro casi siempre falla en una de estas partes:

| Parte | Pregunta |
| --- | --- |
| Endpoint | Qué ruta se expone? |
| Recurso | Qué objeto se afecta? |
| Acción | Leer, crear, modificar o borrar? |
| Identidad | Quién llama? |
| Permiso | Puede hacerlo? |

## Autenticación

La API debe saber quien llama.

Opciones:

- Session cookies.
- Bearer tokens.
- API keys.
- OAuth/OIDC.
- MTLS en casos avanzados.

## Autorización

La API debe validar que la identidad puede hacer la acción.

Ejemplo:

Un usuario con ID 123 no debería poder leer:

```text
/api/users/456
```

Si no tiene permiso.

### BOLA/IDOR

Broken Object Level Authorization ocurre cuando la API permite acceder a un objeto por cambiar un ID.

Ejemplo:

```text
GET /api/invoices/1001
GET /api/invoices/1002
```

La defensa no es ocultar IDs. La defensa es validar en backend que la identidad actual puede acceder a ese recurso.

## Tokens

Un token representa acceso.

Riesgos:

- Token expuesto.
- Token sin expiracion.
- Token con demasiados permisos.
- Token guardado en frontend de forma insegura.

Buenas prácticas:

- Expiracion.
- Scopes.
- Rotación.
- Revocacion.
- No registrar tokens en logs.
- Usar HTTPS.

## Validación

Validar:

- Tipos.
- Rangos.
- Longitud.
- Formatos.
- Campos permitidos.

## Rate Limiting y Abuso

Una API también debe resistir abuso:

- Fuerza bruta;
- Scraping;
- Enumeración de IDs;
- Spam de creación;
- Consumo excesivo de recursos.

Controles:

- Rate limits por IP, usuario o token;
- Bloqueo progresivo;
- Captcha solo donde tenga sentido;
- Paginacion;
- Límites de tamano;
- Monitoreo de patrones.

## Errores y Mensajes

No reveles más de lo necesario.

Mal:

```json
{"error":"User exists but password hash mismatch in table users"}
```

Mejor:

```json
{"error":"Invalid credentials"}
```

## Ejemplo de Diseño de API

Una API simple de notas podria exponer:

```text
GET /notes
GET /notes/{id}
POST /notes
PATCH /notes/{id}
DELETE /notes/{id}
```

Antes de implementarla conviene definir:

- Quien puede crear.
- Quien puede leer.
- Quien puede modificar.
- Que logs guardar.
- Que errores devolver.

Agrega también:

- Que campos acepta cada endpoint.
- Que rate limit aplicarias.
- Que eventos serian sospechosos.
- Que respuesta daria si no hay permisos.

## Criterios Para una Matriz de Permisos

Una matriz de permisos ayuda a entender que puede hacer cada tipo de usuario sobre cada endpoint:

| Endpoint | Usuario normal | Admin | Sin login | Riesgo |
| --- | --- | --- | --- | --- |
| GET /notes |  |  |  |  |
| GET /notes/{id} |  |  |  |  |
| POST /notes |  |  |  |  |
| PATCH /notes/{id} |  |  |  |  |
| DELETE /notes/{id} |  |  |  |  |

El punto importante es validar mentalmente que un usuario no pueda leer, modificar o borrar recursos de otro usuario. La matriz debe revelar diferencias entre autenticación, rol y propiedad del recurso.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar REST.
- Explicar autenticación en APIs.
- Explicar autorización por recurso.
- Identificar riesgos de tokens.
- Identificar BOLA/IDOR.
- Disenar una matriz de permisos por endpoint.
