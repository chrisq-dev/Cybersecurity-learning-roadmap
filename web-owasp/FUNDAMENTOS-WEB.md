# Fundamentos Web

## Objetivo

Entender como funciona la web antes de estudiar vulnerabilidades.

La seguridad web no empieza con XSS o SQL Injection. Empieza entendiendo como viajan las peticiones, como se mantiene una sesion, como se toman decisiones de autorizacion y donde se rompe la confianza entre cliente, servidor, base de datos y terceros.

Esta guia busca que puedas leer una peticion HTTP real y explicar:

- que quiere hacer el cliente;
- que datos envia;
- que identidad presenta;
- que valida el servidor;
- que recurso se consulta o modifica;
- que controles deberian aplicarse;
- que respuesta se devuelve;
- que evidencia queda.

## Modelo Mental

```text
navegador -> HTTP -> servidor -> aplicacion -> base de datos -> respuesta
```

Preguntas clave:

- Que envia el cliente?
- Que valida el servidor?
- Que datos se consultan o modifican?
- Que identidad tiene el usuario?
- Que permisos se aplican?
- Que queda registrado en logs?

## Cliente y Servidor

El cliente normalmente es un navegador, app movil, script o herramienta como `curl`. El servidor recibe peticiones y devuelve respuestas.

El cliente no es confiable. Todo lo que viene del cliente puede ser modificado:

- URL;
- parametros;
- headers;
- cookies;
- body;
- archivos subidos;
- metodos HTTP;
- valores ocultos en formularios.

Una aplicacion segura valida en servidor. La validacion del frontend mejora experiencia, pero no protege por si sola.

## HTTP

HTTP es el protocolo que usan cliente y servidor para intercambiar mensajes.

Una peticion HTTP tiene:

- metodo;
- ruta;
- headers;
- body opcional.

Una respuesta HTTP tiene:

- codigo de estado;
- headers;
- body.

Ejemplo de peticion:

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

## Metodos HTTP

| Metodo | Uso comun | Riesgo si se maneja mal |
| --- | --- | --- |
| GET | Consultar informacion | Exponer datos en URL o cache |
| POST | Crear o enviar datos | Falta de validacion |
| PUT/PATCH | Actualizar datos | Modificar recursos ajenos |
| DELETE | Eliminar datos | Borrado sin autorizacion |
| OPTIONS | Consultar capacidades | CORS mal configurado |

No asumas que un metodo es seguro por su nombre. El servidor debe controlar cada accion.

## Codigos de Estado

Codigos comunes:

- `200 OK`: solicitud exitosa.
- `201 Created`: recurso creado.
- `301/302`: redireccion.
- `400 Bad Request`: peticion invalida.
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
- `Origin`: origen de una peticion CORS.
- `Referer`: pagina previa.
- `X-Forwarded-For`: IP original cuando hay proxy.

En seguridad, los headers ayudan a entender autenticacion, sesiones, proxies, CORS, cache, redirecciones y configuraciones debiles.

## TLS y HTTPS

HTTPS usa TLS para cifrar la comunicacion entre cliente y servidor.

Protege contra:

- lectura del trafico por terceros;
- modificacion en transito;
- suplantacion si el certificado es valido.

HTTPS no arregla:

- SQL Injection;
- XSS;
- autorizacion rota;
- contrasenas debiles;
- bugs de negocio;
- datos expuestos por la aplicacion.

TLS protege el canal, no garantiza que la aplicacion sea segura.

## Cookies y Sesiones

HTTP no mantiene estado por si solo. Cada peticion es independiente. Las sesiones permiten recordar que un usuario ya inicio sesion.

Una cookie de sesion puede verse asi:

```http
Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Lax
```

Controles importantes:

- `HttpOnly`: reduce robo por JavaScript.
- `Secure`: solo enviar por HTTPS.
- `SameSite`: reduce ciertos ataques CSRF.
- expiracion razonable;
- rotacion despues de login;
- invalidacion al cerrar sesion;
- proteccion contra fijacion de sesion.

## Autenticacion

Autenticacion responde:

```text
Quien eres?
```

Ejemplos:

- usuario y contrasena;
- MFA;
- token;
- certificado cliente;
- SSO.

Riesgos:

- contrasenas debiles;
- falta de MFA;
- recuperacion de contrasena insegura;
- tokens largos sin expiracion;
- mensajes de error que enumeran usuarios.

## Autorizacion

Autorizacion responde:

```text
Que puedes hacer?
```

Ejemplo:

```text
/api/users/1001/invoices
/api/users/1002/invoices
```

Si un usuario cambia `1001` por `1002` y ve datos ajenos, el problema es de autorizacion. El usuario puede estar autenticado correctamente y aun asi no tener permiso.

Autorizacion debe revisarse por:

- usuario;
- rol;
- recurso;
- accion;
- contexto;
- propiedad del dato.

## Inputs

Un input es cualquier dato que entra a la aplicacion.

Ejemplos:

- parametros URL;
- formularios;
- JSON;
- headers;
- cookies;
- archivos;
- datos desde APIs externas.

Riesgo:

Si la aplicacion confia en input sin validar, puede aparecer injection, XSS, SSRF, path traversal, file upload inseguro u otros errores.

## Base de Datos

Muchas aplicaciones consultan o modifican datos.

Flujo:

```text
cliente -> servidor -> consulta -> base de datos -> respuesta
```

Riesgos:

- consultas construidas con strings;
- permisos excesivos de la cuenta de base de datos;
- datos sensibles sin cifrar;
- errores que revelan tablas;
- falta de auditoria;
- backups expuestos.

La seguridad web tambien depende de la seguridad de datos.

## APIs

Las APIs exponen acciones y datos para frontend, apps moviles, integraciones o terceros.

Riesgos comunes:

- BOLA/IDOR;
- falta de rate limiting;
- tokens expuestos;
- mass assignment;
- errores detallados;
- CORS permisivo;
- endpoints internos expuestos.

Una API segura valida autenticacion, autorizacion, input, rate limits y logging.

## Superficie de Ataque Web

Revisa:

- formularios;
- parametros en URL;
- APIs;
- uploads;
- login;
- recuperacion de contrasena;
- paneles admin;
- redirecciones;
- CORS;
- cookies;
- dependencias frontend/backend;
- webhooks;
- integraciones externas.

## OWASP Top 10

OWASP Top 10 resume categorias de riesgos frecuentes en aplicaciones web. No es una lista de payloads; es un mapa de fallas comunes.

Relacion conceptual:

| Concepto base | Vulnerabilidad relacionada |
| --- | --- |
| Autorizacion | Broken Access Control |
| Sesiones | Identification and Authentication Failures |
| Inputs | Injection, XSS |
| Uploads | Unrestricted File Upload, RCE |
| Dependencias | Vulnerable and Outdated Components |
| Logs | Security Logging and Monitoring Failures |
| Configuracion | Security Misconfiguration |

Cuando estudies una vulnerabilidad, usa este formato:

- que es;
- por que ocurre;
- donde aparece;
- que impacto tiene;
- como se mitiga;
- como se detecta;
- como se explica en un reporte.

## Ejemplo de Analisis

Peticion:

```http
GET /api/users/1002/invoices HTTP/1.1
Host: app.local
Cookie: session=user-1001
```

Pregunta:

El usuario de la sesion `1001` puede leer facturas de `1002`?

Controles esperados:

- validar sesion;
- identificar usuario;
- validar permiso sobre recurso `1002`;
- registrar acceso;
- devolver `403` si no tiene permiso.

Si solo se valida que la sesion exista, hay riesgo de autorizacion rota.

## Logs Web

Un log web puede responder:

- que IP hizo la peticion;
- que metodo uso;
- que ruta pidio;
- que codigo recibio;
- cuantos bytes se enviaron;
- que user-agent uso;
- a que hora ocurrio.

Pero un log web no siempre dice:

- que usuario autenticado era;
- que proceso interno fallo;
- que consulta SQL se ejecuto;
- si hubo exfiltracion completa.

Por eso se combinan logs web, aplicacion, base de datos, proxy, WAF y autenticacion.

## Errores Comunes

- Probar payloads sin entender el flujo.
- Confundir autenticacion con autorizacion.
- Confiar en validacion del frontend.
- Ignorar codigos 301/302.
- No revisar requests reales con DevTools o proxy.
- Pensar que HTTPS arregla vulnerabilidades de aplicacion.
- No documentar impacto.
- No entender que usuario, rol y recurso son diferentes.

## Practica Segura

En una web propia o sitio de ejemplo puedes observar:

```bash
curl -I https://example.com
curl -v https://example.com
curl -s -D headers.txt https://example.com -o body.html
```

La meta es identificar:

- codigo HTTP;
- headers;
- tipo de contenido;
- redirecciones;
- cookies si existen;
- diferencia entre peticion y respuesta.

No pruebes vulnerabilidades en sitios ajenos. Para practicar vulnerabilidades usa laboratorios autorizados.

## Criterio de Dominio

Dominas este tema cuando puedes:

- explicar cliente, servidor y HTTP;
- leer una peticion y respuesta;
- interpretar metodos, rutas, headers y codigos;
- explicar cookies y sesiones;
- diferenciar autenticacion y autorizacion;
- explicar por que el cliente no es confiable;
- conectar conceptos base con OWASP Top 10;
- describir riesgos de APIs y bases de datos;
- leer un flujo web y proponer controles.
