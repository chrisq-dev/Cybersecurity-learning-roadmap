# Fundamentos Web

## Objetivo

Entender como funciona la web antes de estudiar vulnerabilidades.

La seguridad web no empieza con XSS o SQL Injection. Empieza entendiendo como viajan las peticiones, como se mantiene una sesión, como se toman decisiones de autorización y donde se rompe la confianza entre cliente, servidor, base de datos y terceros.

Esta guía busca que puedas leer una petición HTTP real y explicar:

- Que quiere hacer el cliente;
- Que datos envia;
- Que identidad presenta;
- Que valida el servidor;
- Que recurso se consulta o modifica;
- Que controles deberian aplicarse;
- Que respuesta se devuelve;
- Que evidencia queda.

## Modelo Mental

```text
navegador -> HTTP -> servidor -> aplicacion -> base de datos -> respuesta
```

Preguntas clave:

- Qué envia el cliente?
- Qué valida el servidor?
- Qué datos se consultan o modifican?
- Qué identidad tiene el usuario?
- Qué permisos se aplican?
- Qué queda registrado en logs?

## Cliente y Servidor

El cliente normalmente es un navegador, app móvil, script o herramienta como `curl`. El servidor recibe peticiones y devuelve respuestas.

El cliente no es confiable. Todo lo que viene del cliente puede ser modificado:

- URL;
- Parametros;
- Headers;
- Cookies;
- Body;
- Archivos subidos;
- Métodos HTTP;
- Valores ocultos en formularios.

Una aplicación segura valida en servidor. La validación del frontend mejora experiencia, pero no protege por si sola.

## HTTP

HTTP es el protocolo que usan cliente y servidor para intercambiar mensajes.

Una petición HTTP tiene:

- Método;
- Ruta;
- Headers;
- Body opcional.

Una respuesta HTTP tiene:

- Código de estado;
- Headers;
- Body.

Ejemplo de petición:

```http
POST /login HTTP/1.1
Host: app.local
Content-Type: application/json
Cookie: tracking=abc123

{"email":"user@example.com","password":"example"}
```

Ejemplo de respuesta:

```http
HTTP/1.1 200 OK
Content-Type: application/json
Set-Cookie: session=xyz789; HttpOnly; Secure; SameSite=Lax

{"ok":true}
```

## Métodos HTTP

| Método | Uso común | Riesgo si se maneja mal |
| --- | --- | --- |
| GET | Consultar información | Exponer datos en URL o cache |
| POST | Crear o enviar datos | Falta de validación |
| PUT/PATCH | Actualizar datos | Modificar recursos ajenos |
| DELETE | Eliminar datos | Borrado sin autorización |
| OPTIONS | Consultar capacidades | CORS mal configurado |

No asumas que un método es seguro por su nombre. El servidor debe controlar cada acción.

## Codigos de Estado

Codigos comunes:

- `200 OK`: solicitud exitosa.
- `201 Created`: recurso creado.
- `301/302`: redireccion.
- `400 Bad Request`: petición invalida.
- `401 Unauthorized`: no autenticado.
- `403 Forbidden`: autenticado pero sin permiso.
- `404 Not Found`: recurso no encontrado.
- `429 Too Many Requests`: rate limit.
- `500 Internal Server Error`: error del servidor.

Diferencia importante:

```text
401 = no se quien eres
403 = se quien eres, pero no puedes hacer eso
```

## Headers

Headers importantes:

- `Host`: dominio solicitado.
- `User-Agent`: cliente usado.
- `Content-Type`: formato del body.
- `Authorization`: credenciales o token.
- `Cookie`: cookies enviadas por el navegador.
- `Set-Cookie`: cookies que el servidor entrega.
- `Location`: destino de redireccion.
- `Origin`: origen de una petición CORS.
- `Referer`: página previa.
- `X-Forwarded-For`: IP original cuando hay proxy.

En seguridad, los headers ayudan a entender autenticación, sesiones, proxies, CORS, cache, redirecciones y configuraciones debiles.

## TLS y HTTPS

HTTPS usa TLS para cifrar la comunicación entre cliente y servidor.

Protege contra:

- Lectura del tráfico por terceros;
- Modificacion en transito;
- Suplantacion si el certificado es valido.

HTTPS no arregla:

- SQL Injection;
- XSS;
- Autorización rota;
- Contraseñas debiles;
- Bugs de negocio;
- Datos expuestos por la aplicación.

TLS protege el canal, no garantiza que la aplicación sea segura.

## Cookies y Sesiones

HTTP no mantiene estado por si solo. Cada petición es independiente. Las sesiones permiten recordar que un usuario ya inicio sesión.

Una cookie de sesión puede verse asi:

```http
Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Lax
```

Controles importantes:

- `HttpOnly`: reduce robo por JavaScript.
- `Secure`: solo enviar por HTTPS.
- `SameSite`: reduce ciertos ataques CSRF.
- Expiracion razonable;
- Rotación después de login;
- Invalidacion al cerrar sesión;
- Protección contra fijacion de sesión.

## Autenticación

Autenticación aclara:

```text
Quién eres?
```

Ejemplos:

- Usuario y contraseña;
- MFA;
- Token;
- Certificado cliente;
- SSO.

Riesgos:

- Contraseñas debiles;
- Falta de MFA;
- Recuperación de contraseña insegura;
- Tokens largos sin expiracion;
- Mensajes de error que enumeran usuarios.

## Autorización

Autorización aclara:

```text
Qué puedes hacer?
```

Ejemplo:

```text
/api/users/1001/invoices
/api/users/1002/invoices
```

Si un usuario cambia `1001` por `1002` y ve datos ajenos, el problema es de autorización. El usuario puede estar autenticado correctamente y aún asi no tener permiso.

Autorización debe revisarse por:

- Usuario;
- Rol;
- Recurso;
- Acción;
- Contexto;
- Propiedad del dato.

## Inputs

Un input es cualquier dato que entra a la aplicación.

Ejemplos:

- Parametros URL;
- Formularios;
- JSON;
- Headers;
- Cookies;
- Archivos;
- Datos desde APIs externas.

Riesgo:

Si la aplicación confia en input sin validar, puede aparecer injection, XSS, SSRF, path traversal, file upload inseguro u otros errores.

## Base de Datos

Muchas aplicaciones consultan o modifican datos.

Flujo:

```text
cliente -> servidor -> consulta -> base de datos -> respuesta
```

Riesgos:

- Consultas construidas con strings;
- Permisos excesivos de la cuenta de base de datos;
- Datos sensibles sin cifrar;
- Errores que revelan tablas;
- Falta de auditoria;
- Backups expuestos.

La seguridad web también depende de la seguridad de datos.

## APIs

Las APIs exponen acciones y datos para frontend, apps moviles, integraciones o terceros.

Riesgos comunes:

- BOLA/IDOR;
- Falta de rate limiting;
- Tokens expuestos;
- Mass assignment;
- Errores detallados;
- CORS permisivo;
- Endpoints internos expuestos.

Una API segura valida autenticación, autorización, input, rate limits y logging.

## Superficie de Ataque Web

Revisa:

- Formularios;
- Parametros en URL;
- APIs;
- Uploads;
- Login;
- Recuperación de contraseña;
- Paneles admin;
- Redirecciones;
- CORS;
- Cookies;
- Dependencias frontend/backend;
- Webhooks;
- Integraciones externas.

## OWASP Top 10

OWASP Top 10 resume categorías de riesgos frecuentes en aplicaciones web. No es una lista de payloads; es un mapa de fallas comunes.

Relacion conceptual:

| Concepto base | Vulnerabilidad relacionada |
| --- | --- |
| Autorización | Broken Access Control |
| Sesiones | Identification and Authentication Failures |
| Inputs | Injection, XSS |
| Uploads | Unrestricted File Upload, RCE |
| Dependencias | Vulnerable and Outdated Components |
| Logs | Security Logging and Monitoring Failures |
| Configuración | Security Misconfiguration |

Cuando estudies una vulnerabilidad, usa este formato:

- Que es;
- Por que ocurre;
- Donde aparece;
- Que impacto tiene;
- Como se mitiga;
- Como se detecta;
- Como se explica en un reporte.

## Ejemplo de Análisis

Petición:

```http
GET /api/users/1002/invoices HTTP/1.1
Host: app.local
Cookie: session=user-1001
```

Pregunta:

El usuario de la sesión `1001` puede leer facturas de `1002`?

Controles esperados:

- Validar sesión;
- Identificar usuario;
- Validar permiso sobre recurso `1002`;
- Registrar acceso;
- Devolver `403` si no tiene permiso.

Si solo se valida que la sesión exista, hay riesgo de autorización rota.

## Logs Web

Un log web puede responder:

- Que IP hizo la petición;
- Que método uso;
- Que ruta pidio;
- Que código recibio;
- Cuantos bytes se enviaron;
- Que user-agent uso;
- A que hora ocurrio.

Pero un log web no siempre dice:

- Que usuario autenticado era;
- Que proceso interno fallo;
- Que consulta SQL se ejecuto;
- Si hubo exfiltración completa.

Por eso se combinan logs web, aplicación, base de datos, proxy, WAF y autenticación.

## Errores Comunes

- Probar payloads sin entender el flujo.
- Confundir autenticación con autorización.
- Confiar en validación del frontend.
- Ignorar codigos 301/302.
- No revisar requests reales con DevTools o proxy.
- Pensar que HTTPS arregla vulnerabilidades de aplicación.
- No documentar impacto.
- No entender que usuario, rol y recurso son diferentes.

## Observación Segura

En una web propia o sitio de ejemplo puedes observar:

```bash
curl -I https://example.com
curl -v https://example.com
curl -s -D headers.txt https://example.com -o body.html
```

La meta es identificar:

- Código HTTP;
- Headers;
- Tipo de contenido;
- Redirecciones;
- Cookies si existen;
- Diferencia entre petición y respuesta.

No pruebes vulnerabilidades en sitios ajenos. Para practicar vulnerabilidades usa laboratorios autorizados.

## Criterio de Dominio

Dominas este tema cuando puedes:

- Explicar cliente, servidor y HTTP;
- Leer una petición y respuesta;
- Interpretar métodos, rutas, headers y codigos;
- Explicar cookies y sesiones;
- Diferenciar autenticación y autorización;
- Explicar por que el cliente no es confiable;
- Conectar conceptos base con OWASP Top 10;
- Describir riesgos de APIs y bases de datos;
- Leer un flujo web y proponer controles.
