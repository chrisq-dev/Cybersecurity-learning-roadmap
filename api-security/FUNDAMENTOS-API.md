---
title: "Fundamentos de API: El Mensajero del Restaurante Moderno"
level: "inicial"
content_type: "guia"
updated: "2026-06-29"
---

# Fundamentos de API: El Mensajero del Restaurante Moderno

## Objetivo de esta Guía

Desmitificar el acrónimo más usado en todo Silicon Valley: API (Application Programming Interface). Aprender a hackear páginas web usando tu navegador web y dando clic a botones es hacking de nivel amateur. Hoy en día, el 80% del tráfico de internet ocurre sin interfaz gráfica. Son servidores hablando con otros servidores de forma invisible.

Si quieres encontrar los peores agujeros de seguridad en el internet moderno, tienes que entender y auditar las APIs. Las APIs son el corazón de las aplicaciones modernas: apps móviles, aplicaciones web SPA (Single Page Applications), microservicios, IoT, y servicios cloud.

Esta guía es el punto de partida para entender como funcionan las APIs, cual es su arquitectura, como viajan los datos, y por qué son un blanco tan atractivo para los atacantes.

## Que es una API?

Una API es un intermediario de software que permite que dos aplicaciones se comuniquen entre si. Define un contrato: "Si me envías este mensaje, yo te respondere con esta información."

No es un servidor, no es una base de datos, no es un programa. Es una interfaz, un conjunto de reglas y protocolos para que las máquinas hablen entre si.

### La Analogía: El Mensajero

Imagina que entras a un restaurante de lujo.

- **Tu (El Cliente / La App Móvil):** Tienes hambre y quieres comer.
- **La Cocina (La Base de Datos o Servicio):** Esta llena de la comida (los datos) que tu quieres.

**El Problema:** El dueño del restaurante no te permite entrar físicamente a la cocina. Si todos los clientes entraran a la cocina a agarrar comida, harían un desastre, se quemarían con las estufas y se robarias la comida de otros.

**La Solución (La API):**

Para que puedas conseguir tu comida sin pisar la cocina, el restaurante contrato a un Mensajero (La API).

1. **La Petición (Request):** Tu le das al mensajero un papelito (tu orden) que dice: "Quiero la hamburguesa número 5."
2. **El Transporte:** El mensajero camina hasta la cocina blindada, entrega el papelito y el cocinero hace la hamburguesa.
3. **La Respuesta (Response):** El mensajero sale de la cocina con un plato en la mano y te entrega exactamente la hamburguesa 5 en tu mesa. No viste como la prepararon, no viste la cocina, solo recibiste el resultado.

**En la vida real:**

Cuando abres la App de Uber en tu celular y pides un auto, tu celular no tiene todo el mapa mundial guardado adentro. Tu celular es el Cliente en la mesa. Envía una Petición (Request) a la API de Google Maps (El Mensajero). La API va a los servidores gigantescos de Google (La Cocina), saca el mapa de tu calle, y se lo trae a tu celular para que lo dibuje en tu pantalla.

## El Lenguaje de las Máquinas: JSON

Cuando las máquinas (El Cliente y El Mensajero) hablan entre si, no usan Español ni Inglés. Usan un formato de texto estructurado y ligero para pasarse los datos rápidamente. El formato rey del internet moderno se llama JSON (JavaScript Object Notation).

Es literalmente texto plano organizado con llaves `{}`.

Un "papelito de orden" (API Request) pidiendo información de un usuario se ve así:

```json
{
  "usuario_id": 15,
  "accion": "leer_perfil"
}
```

La "bandeja con comida" (API Response) que el mensajero te trae de regreso se ve así:

```json
{
  "nombre": "Juan Perez",
  "saldo_bancario": 5000.00,
  "tarjeta": "terminacion 4455"
}
```

### JSON vs XML

Antes de JSON, el formato dominante era XML (eXtensible Markup Language). Una respuesta en XML se veía así:

```xml
<respuesta>
  <nombre>Juan Perez</nombre>
  <saldo_bancario>5000.00</saldo_bancario>
  <tarjeta>terminacion 4455</tarjeta>
</respuesta>
```

JSON desplazó a XML por varias razones:
- Es más liviano (menos caracteres para representar los mismos datos)
- Es más legible para humanos
- Se integra nativamente con JavaScript (el lenguaje del navegador)
- Los parsers de JSON son más rapidos que los de XML
- JSON tiene tipos de datos nativos (números, strings, booleanos, arrays, objetos) mientras que XML trata todo como texto

### El Hacker de APIs

Un Hacker de élite ignora la bonita página web del banco. No le importa si el botón de "Transferir" es azul o verde.

El Hacker abre una terminal de comandos, intercepta el papelito (JSON) antes de que llegue al mensajero, le cambia el valor (Ej. cambia `"saldo": 100` a `"saldo": 1000000`), y se lo entrega directamente a la API a espaldas del desarrollador.

Herramientas como Burp Suite, Postman, curl, y scripts en Python le permiten al atacante:
- Interceptar y modificar peticiones en tiempo real
- Repetir peticiones modificadas
- Enumerar endpoints y parámetros
- Automatizar ataques contra la API

## Tipos de APIs

### REST (Representational State Transfer)

Es el tipo de API más común hoy en día. REST no es un protocolo, es un conjunto de principios de diseño.

**Principios REST:**
- Recursos identificados por URLs (ej. `/api/usuarios/5`)
- Operaciones sobre recursos usando métodos HTTP (GET, POST, PUT, DELETE, PATCH)
- Sin estado (stateless): cada petición contiene toda la información necesaria
- Respuestas en formato JSON o XML
- Cacheable: las respuestas pueden ser cacheadas para mejorar rendimiento

**Ejemplo REST:**
- `GET /api/productos` -- Lista todos los productos
- `GET /api/productos/5` -- Obtiene el producto con ID 5
- `POST /api/productos` -- Crea un nuevo producto (datos en el body)
- `PUT /api/productos/5` -- Actualiza el producto 5
- `DELETE /api/productos/5` -- Elimina el producto 5

### SOAP (Simple Object Access Protocol)

Un protocolo más antiguo y pesado. Usa XML para el formato de mensajes. Aún se usa en sistemas bancarios y gubernamentales legacy.

**Características:**
- Más estricto que REST (define contratos WSDL)
- Solo XML
- Opera sobre HTTP, SMTP, TCP, etc.
- Tiene especificaciones de seguridad (WS-Security)

### GraphQL

Un lenguaje de consulta para APIs desarrollado por Facebook. Permite al cliente especificar exactamente que datos necesita.

**Ventaja:** El cliente pide solo los campos que necesita, evitando el "over-fetching" (recibir datos de más) y "under-fetching" (recibir datos de menos).

**Ejemplo GraphQL:**
```graphql
{
  producto(id: 5) {
    nombre
    precio
  }
}
```

**Desventaja de seguridad:** GraphQL permite consultas complejas que pueden ser costosas para el servidor (ataques de denial of service mediante consultas anidadas). También expone el esquema completo de la base de datos a través de la introspeccion.

### gRPC

Desarrollado por Google. Usa Protocol Buffers (protobuf) en lugar de JSON/XML. Es más rápido que REST porque usa HTTP/2 y serializacion binaria.

**Usado en:** Microservicios, sistemas de alto rendimiento, comunicación interna entre servicios.

### WebSocket

No es una API tradicional sino un protocolo de comunicación bidireccional en tiempo real. El servidor puede enviar datos al cliente sin que el cliente los solicite.

**Usado en:** Chats, juegos en línea, dashboards en tiempo real, notificaciones push.

## Como se Autentican las APIs

Las APIs no tienen interfaz gráfica para que el usuario ponga su usuario y contraseña. Necesitan mecanismos de autenticación programaticos.

### API Keys

Una clave única (un string) que identifica al cliente. Se envía en el header de cada petición:

```
GET /api/datos
X-API-Key: abc123def456
```

**Problemas de seguridad:**
- La API Key viaja en cada petición, puede ser interceptada si no se usa HTTPS
- Si la API Key es robada, el atacante tiene acceso completo
- Las API Keys suelen tener permisos amplios

### Basic Auth

El cliente envía usuario y contraseña en cada petición, codificados en base64:

```
GET /api/datos
Authorization: Basic dXN1YXJpbzpjbGF2ZQ==
```

**Problema:** Base64 no es encriptación, es codificación. Cualquiera que intercepte la petición decodifica y obtiene las credenciales. Solo es seguro sobre HTTPS.

### Bearer Tokens / JWT (JSON Web Tokens)

JWT es seguro si lo implementas bien, pero la mayoría de los tutoriales de YouTube te enseñan a implementarlo mal.

El cliente obtiene un token al autenticarse y lo envía en cada petición:

```
GET /api/datos
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpVQU4iLCJpYXQiOjE1MTYyMzkwMjJ9.4pXqWQoQ
```

JWT es un estándar abierto (RFC 7519) que define un formato compacto y autónomo para transmitir información entre partes.

**Estructura de un JWT:**

1. **Header:** Tipo de token y algoritmo de firma
2. **Payload:** Datos del usuario (claims). Ej: `{"sub": "123", "name": "Juan", "rol": "admin"}`
3. **Signature:** Firma criptográfica que verifica que el token no fue modificado

**Seguridad de JWT:**
- El payload esta codificado en base64, no encriptado. Cualquiera puede leerlo.
- La firma (si es HMAC o RSA) garantiza que el contenido no fue modificado.
- El atacante no puede modificar el payload sin invalidar la firma.
- Pero si la clave secreta es débil o robada, el atacante puede forjar tokens.

### OAuth 2.0 y OpenID Connect

OAuth 2.0 es un protocolo de autorización delegada. Permite que una aplicación acceda a recursos en nombre de un usuario sin conocer su contraseña.

**Ejemplo:** Cuando inicias sesión en un sitio con "Login with Google", estas usando OAuth 2.0. El sitio recibe un token de Google que le permite acceder a tu información básica sin que el sitio conozca tu contraseña de Google.

OpenID Connect es una capa sobre OAuth 2.0 que añade autenticación (saber quien es el usuario).

## Endpoints y Métodos

Una API expone endpoints (rutas URL) que corresponden a recursos y acciones.

### Versionado de APIs

Las APIs versionan sus endpoints para no romper clientes existentes cuando introducen cambios.

```
/api/v1/usuarios
/api/v2/usuarios
```

**Formas de versionar:**
- En la URL: `/api/v1/...`
- En el header: `Accept: application/vnd.empresa.v1+json`
- En el subdominio: `v1.api.empresa.com`

### Paginacion

Cuando una API devuelve muchos resultados, usa paginacion:

```
GET /api/productos?page=1&limit=20
```

**Respuesta:**
```json
{
  "data": [...],
  "page": 1,
  "total_pages": 50,
  "total_items": 1000
}
```

**Implicaciones de seguridad:** La paginacion mal implementada puede permitir a un atacante iterar sobre todos los registros en un IDOR masivo.

## Como se Defiende una API

### Rate Limiting (Límite de Tasa)

Limita cuántas peticiones puede hacer un cliente en un periodo de tiempo.

```
GET /api/login
Respuesta: 429 Too Many Requests
```

**Por qué es importante:** Sin rate limiting, un atacante puede probar millones de contraseñas por segundo (fuerza bruta).

**Aprende más en:** La guía completa en `api-security/RIESGOS-CONTROLES.md`.

### Validación de Esquema (Schema Validation)

La API debe validar que los datos recibidos cumplen con el formato esperado, usando esquemas como JSON Schema.

```json
{
  "type": "object",
  "properties": {
    "email": {"type": "string", "format": "email"},
    "edad": {"type": "integer", "minimum": 18}
  },
  "required": ["email", "edad"]
}
```

### CORS (Cross-Origin Resource Sharing)

Define que origenes (dominios) pueden acceder a la API desde un navegador.

```
Access-Control-Allow-Origin: https://miapp.com
```

**Error común:** Usar `Access-Control-Allow-Origin: *` (permitir todos los origenes) expone la API a ataques desde cualquier sitio web.

### Input Sanitization

La API debe validar y sanitizar todos los datos de entrada para prevenir inyecciones SQL, XSS, y otras vulnerabilidades.

## El Ataque a las APIs: Un Vistazo

El ataque más común a las APIs es BOLA (Broken Object Level Authorization), también conocido como IDOR en el contexto web. Ocurre cuando la API no verifica si el usuario tiene permiso para acceder al recurso que solicita.

**Ejemplo:**

```
GET /api/usuarios/1234/datos-financieros
Authorization: Bearer token_de_juan
```

Si la API no verifica que el token pertenece al usuario 1234, el usuario atacante puede cambiar el ID en la URL y acceder a datos de otros usuarios.

**Aprende más en:** La guía completa de riesgos de API en `api-security/RIESGOS-CONTROLES.md`.

## Modos de Falla con APIs

**Exponer IDs internos.** Usar IDs auto-incrementales en las URLs facilita la enumeración. Usa UUIDs.

**Versionado incorrecto.** Mantener versiones antiguas de la API sin parches de seguridad.

**No documentar la API.** La documentación ayuda a los desarrolladores a usar la API correctamente y a los auditores a entenderla.

**Headers de seguridad faltantes.** Las APIs también necesitan CSP, HSTS, X-Frame-Options, etc.

**Logging insuficiente.** Sin logs de las peticiones a la API, es imposible investigar un incidente.

**Autenticación débil.** API Keys enviadas en la URL (GET), tokens sin expiracion, JWT con algoritmos "none".

## Autoevaluación

1. Usando la analogía del "Mensajero y la Cocina", explica por qué la arquitectura de Software como Servicio (SaaS) separa estrictamente la Aplicación del Celular (Frontend) de los Servidores de Base de Datos (Backend) y obliga a que toda comunicación pase por una API.

2. Un desarrollador junior afirma que su página web es segura "porque escondió el botón rojo de Borrar Cuenta usando código CSS para que sea invisible en la pantalla del usuario". Por qué un Hacker de APIs se reiría de esta "medida de seguridad" y como lograría borrar la cuenta de todas formas?

3. Que es JSON y por qué desplazó al antiguo formato XML como el lenguaje dominante para la comunicación entre APIs RESTful modernas?

4. Si analizas el tráfico de red de tu computadora mientras juegas un videojuego multijugador masivo en línea, verás miles de paquetes JSON volando por segundo. Quien es el "Cliente" y quien es el "Mensajero" en este escenario interactivo?

5. Explica la diferencia entre una API REST y una API GraphQL desde la perspectiva de un atacante. Cual es más fácil de mapear y por qué?

6. Un atacante intercepta una petición que contiene un header `Authorization: Bearer <token>`. El token es un JWT. Que puede leer el atacante en el token? Que no puede modificar sin ser detectado?

7. Tu empresa expone una API sin autenticación para un servicio interno que solo debería ser accesible desde la red interna. Un desarrollador dice "esta bien porque la IP interna no es accesible desde internet". Por qué esta confianza es peligrosa? (Pista: Piensa en SSRF.)

8. Durante una auditoría, encuentras que la API de tu empresa usa versionado en la URL (`/api/v1/usuarios`) y que la versión 1 sigue activa 3 años después de lanzar la v2. Que riesgos introduce mantener versiones antiguas de una API?
