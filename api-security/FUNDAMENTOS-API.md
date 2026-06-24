# Fundamentos de API Security

## Objetivo

Entender como funcionan APIs y que riesgos de seguridad aparecen con frecuencia.

Las APIs son la superficie real de muchas aplicaciones modernas. Aunque el frontend se vea bien, la API debe validar identidad, permisos, datos, limites y errores por si misma.

## Mapa Mental

```text
cliente -> endpoint -> autenticacion -> autorizacion -> validacion -> logica -> datos -> respuesta
```

Cada endpoint debe responder:

- Quien llama?
- Que quiere hacer?
- Sobre que recurso?
- Tiene permiso?
- Los datos son validos?
- Que debe quedar registrado?

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

## Endpoint, Recurso y Accion

Un endpoint inseguro casi siempre falla en una de estas partes:

| Parte | Pregunta |
| --- | --- |
| Endpoint | Que ruta se expone? |
| Recurso | Que objeto se afecta? |
| Accion | Leer, crear, modificar o borrar? |
| Identidad | Quien llama? |
| Permiso | Puede hacerlo? |

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

Buenas practicas:

- Expiracion.
- Scopes.
- Rotacion.
- Revocacion.
- No registrar tokens en logs.
- Usar HTTPS.

## Validacion

Validar:

- Tipos.
- Rangos.
- Longitud.
- Formatos.
- Campos permitidos.

## Rate Limiting y Abuso

Una API tambien debe resistir abuso:

- fuerza bruta;
- scraping;
- enumeracion de IDs;
- spam de creacion;
- consumo excesivo de recursos.

Controles:

- rate limits por IP, usuario o token;
- bloqueo progresivo;
- captcha solo donde tenga sentido;
- paginacion;
- limites de tamano;
- monitoreo de patrones.

## Errores y Mensajes

No reveles mas de lo necesario.

Mal:

```json
{"error":"User exists but password hash mismatch in table users"}
```

Mejor:

```json
{"error":"Invalid credentials"}
```

## Ejemplo de Diseno de API

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

Agrega tambien:

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

El punto importante es validar mentalmente que un usuario no pueda leer, modificar o borrar recursos de otro usuario. La matriz debe revelar diferencias entre autenticacion, rol y propiedad del recurso.

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Explicar REST.
- Explicar autenticacion en APIs.
- Explicar autorizacion por recurso.
- Identificar riesgos de tokens.
- Identificar BOLA/IDOR.
- Disenar una matriz de permisos por endpoint.
