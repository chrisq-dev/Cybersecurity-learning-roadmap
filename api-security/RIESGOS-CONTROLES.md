---
title: "Riesgos y Controles de API: Las Vulnerabilidades Específicas"
level: "intermedio"
content_type: "guia"
updated: "2026-06-29"
reviewed: "2026-06-28"
reviewed_against: "OWASP API Security Top 10:2023"
official_sources:
  - title: "OWASP API Security Top 10:2023"
    url: "https://owasp.org/API-Security/editions/2023/en/0x11-t10/"
  - title: "OWASP API Security Project"
    url: "https://owasp.org/API-Security/"
  - title: "RFC 9110 — HTTP Semantics"
    url: "https://www.rfc-editor.org/rfc/rfc9110.html"
---

# Riesgos y Controles de API: Las Vulnerabilidades Específicas

## Objetivo de esta Guía

Aprender las vulnerabilidades más comunes y peligrosas de las APIs, como explotarlas y como defenderte. Mientras que las aplicaciones web tradicionales tienen sus propias vulnerabilidades (XSS, SQLi, CSRF), las APIs tienen un conjunto de riesgos específicos que el OWASP API Security Top 10 cataloga.

Las APIs son maravillosas porque conectan sistemas mundiales en milisegundos, pero al quitar la interfaz gráfica para el usuario, los desarrolladores suelen olvidar ponerle candados a las peticiones invisibles de las máquinas.

Esta guía cubre en profundidad las principales vulnerabilidades de APIs, con técnicas de explotación y estrategias de defensa. Si vas a auditar una API, este es tu punto de partida.

## API1:2023 Broken Object Level Authorization (BOLA)

Es la vulnerabilidad #1 de las APIs en el mundo entero. Es el equivalente de IDOR (Insecure Direct Object Reference) en APIs clásicas, pero adaptado al contexto de las APIs modernas.

### La Analogía: El Ticket del Guardarropa

Llegas a un teatro de lujo durante el invierno. Vas al Guardarropa y entregas tu chaqueta. El empleado te da un ticket de papel con el número `15`.

Al final de la obra, tu miras el ticket `15`. Decides sacar un bolígrafo de tu bolsillo, tachar el 15 y escribir `16`.

Le entregas el ticket alterado al empleado. El empleado es una API mal programada: ve el número 16, no te pide tu identificación para confirmar, va al armario, y te entrega el costoso abrigo de visón de otra persona. Acabas de robar el objeto de alguien más cambiando un número.

### El Ataque BOLA en la Vida Real

Abres la App de tu banco. Para ver el saldo de tu propia cuenta, la App le manda este mensaje JSON invisible al Mensajero (La API):

```json
{
  "usuario": "juan",
  "accion": "ver_saldo",
  "cuenta_id": 15
}
```

La API te responde con tus 50 dólares.

El Hacker toma el control, intercepta el mensaje antes de que salga del celular, y cambia `"cuenta_id": 15` por `"cuenta_id": 16`.

Si el programador del banco construyo una API ingenua (el empleado del guardarropa tonto), la API no verifica si el usuario "juan" es realmente el dueño de la cuenta 16. La API simplemente obedece y le entrega al hacker el saldo del cliente 16.

BOLA ocupa la primera posición de OWASP API Security Top 10:2023 y representa un patrón crítico cuando una API no verifica autorización sobre cada objeto solicitado.

### Donde Encontrar BOLA

BOLA aparece en cualquier endpoint que use identificadores de objetos que el usuario puede controlar:

- `GET /api/usuarios/{id}` -- Objeto usuario
- `POST /api/pedidos/{orden_id}/cancelar` -- Objeto pedido
- `GET /api/documentos/{documento_id}/descargar` -- Objeto documento
- `GET /api/facturas/{factura_id}.pdf` -- Objeto factura
- `POST /api/mensajes/{mensaje_id}/leer` -- Objeto mensaje

Cualquier parámetro que identifiqué un recurso es un potencial vector de BOLA.

### Como Explotar BOLA

1. **Enumeración manual:** Creas dos cuentas. Con la cuenta A, obtienes un recurso (ej. factura 100). Con la cuenta B, intentas acceder al recurso 100. Si funciona, hay BOLA.

2. **Enumeración automática:** Usas herramientas como Burp Suite Intruder para iterar sobre IDs:

```
GET /api/usuarios/1
GET /api/usuarios/2
GET /api/usuarios/3
...
```

3. **Modificación de parámetros en POST/PUT:** No solo los GET son vulnerables. Los cuerpos JSON también:

```json
// Original
{"pedido_id": 500, "accion": "cancelar"}

// Modificado
{"pedido_id": 501, "accion": "cancelar"}
```

### Como Defenderte de BOLA

**Verificación de pertenencia (Ownership Check):**

Cada endpoint que accede a un recurso por ID debe verificar que el recurso pertenece al usuario autenticado.

```python
@app.route('/api/facturas/<int:factura_id>')
def ver_factura(factura_id):
    usuario_actual = obtener_usuario_actual()
    factura = Factura.query.get(factura_id)

    if factura.usuario_id != usuario_actual.id:
        return {"error": "No autorizado"}, 403

    return factura.to_json()
```

**Usar UUIDs en lugar de IDs secuenciales:**

Los UUIDs no son seguridad por si mismos (si el atacante obtiene un UUID, puede acceder igual), pero hacen que la enumeración automática sea impracticable.

**No exponer IDs internos:**

Usa identificadores opacos o slugs. En lugar de `/api/usuarios/1234`, usa rutas que no revelen IDs internos:

```
/api/mi/perfil  (deriva el ID del token de autenticacion)
```

## API2:2023 Broken Authentication (Autenticación Rota)

Las APIs tienen mecanismos de autenticación diferentes a las aplicaciones web. Los problemas comunes incluyen:

**Debilidades en JWT:**
- Algoritmo "none" en JWT (el atacante cambia el algoritmo a "none" y elimina la firma)
- Clave secreta débil en JWT (el atacante fuerza bruta la clave)
- JWT sin expiracion (el token es válido para siempre)
- JWT sin revocacion (no se puede invalidar un token robado)

**Debilidades en API Keys:**
- API Keys fijas que nunca expiran
- API Keys almacenadas en código fuente (hardcodeadas)
- API Keys con permisos excesivos

**Ataques a OAuth 2.0:**
- CSRF en el flujo de autorización
- Redirect URI abierta (el atacante intercepta el código de autorización)
- Token robado del almacenamiento local del navegador

### El Ataque JWT "alg=none"

El atacante modifica el header del JWT para cambiar el algoritmo a "none" (sin firma):

```json
// Original
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikp1YW4iLCJyb2wiOiJ1c3VhcmlvIn0.4pXqWQoQ...

// Modificado (alg: none)
eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikp1YW4iLCJyb2wiOiJhZG1pbiJ9.
```

Si la librería de JWT del servidor no verifica que el algoritmo "none" no esta permitido, el atacante puede modificar el payload y acceder como administrador.

### Defensa de Autenticación en APIs

1. **JWT con algoritmos seguros:** Usa RS256 o ES256 en lugar de HS256. Nunca permitas "none".
2. **Claves de firma fuertes:** Claves de al menos 256 bits para HMAC.
3. **Expiracion de tokens:** Tokens de corta duracion (15-30 minutos) con refresh tokens.
4. **Revocacion de tokens:** Mantén una blacklist de tokens revocados o usa tokens de corta duracion.
5. **Rate limiting en login:** Limita los intentos de autenticación.

## API3:2023 Broken Object Property Level Authorization

Esta vulnerabilidad ocurre cuando la API permite a los usuarios acceder o modificar propiedades de objetos que no deberían poder.

### Mass Assignment (Asignación Masiva)

Es el tipo más común de API3. Ocurre cuando un framework mapea automáticamente los campos del cuerpo de la petición a los campos del objeto en la base de datos, sin filtrar que campos pueden ser modificados.

**Ejemplo:**

Endpoint para actualizar perfil de usuario:

```json
// Peticion esperada
PUT /api/usuarios/1234
{
  "nombre": "Juan",
  "email": "juan@nuevo.com"
}

// Peticion maliciosa
PUT /api/usuarios/1234
{
  "nombre": "Juan",
  "email": "juan@nuevo.com",
  "rol": "admin",
  "saldo": 999999
}
```

Si el servidor mapea directamente los campos del JSON al modelo, el atacante modifica su rol y su saldo.

**Defensa:**
- Usa DTOs (Data Transfer Objects) que especifican exactamente que campos se pueden modificar.
- Nunca pases directamente el cuerpo de la petición al modelo.
- Anota los campos como "read-only" en el esquema de la API.

### Exposición de Propiedades Sensibles

Una API que devuelve más datos de los necesarios:

```json
GET /api/usuarios/1234
{
  "id": 1234,
  "nombre": "Juan",
  "email": "juan@email.com",
  "contrasena_hash": "5e884898da28047151d0e56f8dc62927",
  "token_reset": "abc123def456",
  "tarjeta_credito": "4111111111111111"
}
```

**Defensa:**
- Define explícitamente que campos se devuelven en cada respuesta.
- Usa proyecciones o vistas de datos.
- Implementa un filtro de campos basado en el rol del usuario.

## API4:2023 Unrestricted Resource Consumption

Las APIs son vulnerables a ataques de consumo de recursos porque no tienen las limitaciones naturales de una interfaz gráfica (un humano no puede hacer miles de peticiones por segundo, pero un script si).

### Rate Limiting

El atacante automatiza peticiones a la API para:
- Fuerza bruta de contraseñas
- Enumeración de IDs (BOLA masivo)
- Denial of Service (agotar recursos del servidor)
- Web scraping (robo de datos)

**Implementación:** El servidor cuenta las peticiones por cliente (IP, token, API key) y las limita.

```
GET /api/login
Respuesta normal -> 200 OK
...
GET /api/login (5ta peticion en 1 minuto)
Respuesta -> 429 Too Many Requests
```

**Headers de Rate Limiting:**

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1623456789
```

### Pagination and Query Limits

El atacante puede pedir todos los registros de una vez sin paginacion:

```
GET /api/usuarios?limit=9999999
```

**Defensa:** Limita el máximo de resultados por petición. Implementa paginacion obligatoria.

### Depth Limits en GraphQL

GraphQL permite consultas anidadas que pueden ser extremadamente costosas:

```graphql
query {
  usuarios {
    posts {
      comentarios {
        usuario {
          posts {
            comentarios { ... }
          }
        }
      }
    }
  }
}
```

**Defensa:** Implementa límites de profundidad de consulta y complejidad de query.

## API5:2023 Broken Function Level Authorization

Ocurre cuando la API no verifica los permisos a nivel de función o endpoint. Un usuario normal puede acceder a endpoints de administrador.

**Ejemplo:**

```
GET /api/admin/usuarios (endpoint solo para administradores)
GET /api/usuarios (endpoint para usuarios normales)
```

Si el atacante descubre el endpoint de admin (tal vez por documentación, enumeración, o adivinanza) y la API no verifica el rol del usuario, puede acceder a funciones administrativas.

**Defensa:**
- Verificación de roles en cada endpoint.
- Middleware de autorización centralizado.
- No confiar en "Security by Obscurity" (endpoints ocultos no son seguros).

## API6:2023 Unrestricted Access to Sensitive Business Flows

Las APIs exponen flujos de negocio que los atacantes pueden explotar de formas no previstas.

**Ejemplos:**
- Una API de reservas de vuelos que permite reservar y cancelar sin límite, permitiendo "acaparar" asientos.
- Una API de votacion que permite votar múltiples veces.
- Una API de descuentos que permite aplicar cupones repetidamente.

**Defensa:** Implementar controles de estado en los flujos de negocio, limits por usuario, y detección de anomalías.

## API7:2023 Server-Side Request Forgery (SSRF)

Las APIs frecuentemente hacen peticiones a otras APIs o servicios basados en parámetros del usuario. Esto las hace vulnerables a SSRF.

**Ejemplo:**

```json
POST /api/importar
{
  "url": "http://datos-proveedor.com/export.csv"
}
```

El atacante cambia la URL a un recurso interno:

```json
{
  "url": "http://169.254.169.254/latest/meta-data/"
}
```

**Aprende más en:** La guía completa de SSRF en `web-owasp/SSRF.md`.

## API8:2023 Security Misconfiguration

Las APIs sufren de los mismos problemas de configuración que las aplicaciones web, más algunos específicos:

- CORS excesivamente permisivo (`Access-Control-Allow-Origin: *`)
- Headers de seguridad faltantes (CSP, HSTS, X-Frame-Options)
- Mensajes de error detallados que revelan información interna
- Métodos HTTP innecesarios habilitados (PUT, DELETE en endpoints de solo lectura)
- Documentación de API accesible sin autenticación (Swagger/OpenAPI expuesto)
- Debug endpoints habilitados en producción

**Defensa:**
- Deshabilitar métodos HTTP no necesarios.
- Configurar CORS estrictamente.
- No exponer documentación de API a internet sin autenticación.
- Deshabilitar debug/consola en producción.

## API9:2023 Improper Inventory Management

Las APIs gestionan mal su inventario de servicios y versiones. Los problemas comunes:

- Versiones antiguas de la API aún accesibles sin parches de seguridad.
- Ambientes de staging o QA accesibles desde internet.
- Endpoints deprecados que no se eliminan.
- Documentación desactualizada.

**El caso ClassPass (2021):** Un investigador encontró que ClassPass tenía una versión antigua de su API (v1) que no requería autenticación para acceder a datos de usuarios. La versión v2 tenía autenticación pero la v1 seguia activa.

**Defensa:** Mantener un inventario actualizado de endpoints y versiones. Deprecar y eliminar versiones antiguas. No exponer ambientes internos.

## API10:2023 Unsafe Consumption of APIs

Las APIs consumen otras APIs. Si un servicio consume una API de terceros o interna de forma insegura, las vulnerabilidades se propagan.

**Riesgos:**
- Confiar ciegamente en la respuesta de una API externa sin validarla.
- No validar el esquema de la respuesta.
- Seguir redirecciones sin control (SSRF).
- Usar librerías de cliente con vulnerabilidades conocidas.

## Las Defensas Globales para APIs

### Los Escudos Defensivos

todas estas defensas son inútiles si no verificas que el usuario es dueño del recurso que pide. Ese es el hueco #1.

**Rate Limiting:** El Cantinero del bar que dice "No te voy a servir más de 2 cervezas por minuto". Limita el número de peticiones por cliente en un periodo de tiempo.

**Tokens JWT seguros:** Sellos digitales que contienen la identidad y permisos del usuario, firmados criptográficamente para que no puedan ser falsificados.

**Validación de Esquema (Schema Validation):** Valida que los datos de entrada cumplen con el formato esperado usando JSON Schema u OpenAPI.

**API Gateway:** Un punto central de entrada que aplica políticas de seguridad, autenticación, rate limiting, y logging antes de que las peticiones lleguen a los microservicios.

**Logging y Monitoreo:** Registra todas las peticiones a la API para detectar anomalías y auditar incidentes.

### Caso Real: Optus (2022)

La operadora australiana Optus sufrio una breach que expuso datos de 9.8 millones de clientes. La vulnerabilidad era una API expuesta sin autenticación adecuada que permitia consultar datos de cualquier cliente. La API estaba en un endpoint no documentado que un atacante descubrió mediante enumeración.

La lección: no solo las APIs documentadas necesitan seguridad. Cualquier endpoint expuesto a internet, conocido o no, debe tener autenticación y autorización.

## Modos de Falla con APIs

**Confiar en la "oscuridad" del endpoint.** "Nadie va a encontrar esta URL." Los atacantes tienen herramientas de enumeración y siempre encuentran lo que esta expuesto.

**No versionar la API.** Hacer cambios en los endpoints sin versionar rompe clientes y puede introducir vulnerabilidades.

**Ignorar la autenticación en endpoints "internos".** Si un endpoint no requiere autenticación porque "solo lo usan nuestros servicios internos", un SSRF puede acceder a el.

**Logging insuficiente.** Sin logs de las peticiones a la API, es imposible detectar un ataque BOLA o una enumeración de IDs.

**Desplegar APIs sin pruebas de seguridad.** Las APIs necesitan SAST, DAST, y SCA como cualquier otra aplicación.

**Mantener versiones antiguas sin parches.** Cada versión no parcheada es una puerta abierta.

## Autoevaluación

1. Un hacker descubre que al cambiar el número en la URL de una tienda web de `tienda.com/api/pedido/40` a `tienda.com/api/pedido/41`, puede descargar la factura de compra de otro cliente, exponiendo su tarjeta de crédito. Usando la analogía del Ticket de Guardarropa, explica por qué la API permitió este ataque y como se llama esta vulnerabilidad.

2. Por qué el uso del "Saneamiento de Entradas" (Input Sanitization, que aprendiste para evitar Inyecciones SQL) no sirve para detener un ataque BOLA? (Pista: Analiza si el dato que manda el hacker es código malicioso o es un número completamente legal.)

3. Estas diseñando la API de inicio de sesión (Login) de tu empresa. Explica como la implementación de un mecanismo estricto de Rate Limiting destruye la viabilidad financiera de un ataque de Fuerza Bruta.

4. El contenido de un Token JWT (Ej. `"rol": "usuario_normal"`) viaja por internet en texto codificado (base64), lo que significa que el hacker puede decodificarlo y leerlo fácilmente. Si esto es así, por qué el hacker no puede simplemente borrar la palabra `"usuario_normal"` de su propio Token, escribir `"Administrador"`, y engañar a la API?

5. Explica la diferencia entre BOLA (API1) y BFLA (API5). Cual es la diferencia entre "acceder al recurso de otro usuario" y "acceder a una función de administrador"?

6. Un endpoint de API permite actualizar el perfil del usuario. El desarrollador pasa directamente el cuerpo del JSON al modelo de la base de datos: `db.usuarios.actualizar(req.body)`. Que vulnerabilidad específica (nombrala por su nombre OWASP) se introduce y como se mitiga?

7. Tu empresa descubre que una versión antigua de la API (v1) sigue activa en producción y no tiene autenticación. La versión v2 tiene autenticación. A que categoría del OWASP API Security Top 10 pertenece este problema y por qué es peligroso mantener versiones antiguas?

8. Un atacante consulta tu API GraphQL con una query que tiene 10 niveles de anidamiento. El servidor tarda 30 segundos en responder y termina en timeout. Que tipo de ataque es este (usa la terminología de OWASP API) y como lo mitigarias?
