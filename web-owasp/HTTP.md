---
title: "El Protocolo HTTP: El Mensajero del Restaurante"
level: "inicial"
content_type: "guia"
updated: "2026-06-29"
---

# El Protocolo HTTP: El Mensajero del Restaurante

## Objetivo de esta Guía

Aprender el lenguaje en el que hablan los navegadores y los servidores. Si el Frontend es el cliente y el Backend es el cocinero, HTTP (Hypertext Transfer Protocol) es el mensajero. Es el único que viaja a través del internet llevando mensajes entre dos mundos que nunca se tocan directamente.

Entender la anatomía de los mensajes que lleva el mensajero te permitirá interceptarlos, modificarlos y hackear aplicaciones web con herramientas como Burp Suite. No puedes defender lo que no entiendes, y no puedes atacar lo que no puedes manipular.

Esta guía no solo cubre los códigos de estado. Cubre como piensa un atacante cuando intercepta una petición HTTP, como se protege un defensor cuando configura una respuesta, y como los detalles aparentemente menores del protocolo determinan si una aplicación es segura o no.

## La Naturaleza del Mensajero: Stateless

La regla más importante de HTTP es que es un protocolo "Stateless" (Sin Memoria). Esto significa que el mensajero tiene amnesia severa a corto plazo.

Le pides al mensajero una hamburguesa. El mensajero va, pide la hamburguesa y te la trae. Dos segundos después, le pides salsa de tomate. El mensajero te mirará confundido y te dirá: "Salsa para que? Quien eres tu? No recuerdo haberte traído nada".

Para solucionar esta amnesia, los programadores inventaron las **Cookies**. Cada vez que inicias sesión, el servidor le pega un post-it (Cookie) al navegador que dice "Cliente Válido #845". De ahora en adelante, cada vez que el navegador le pida algo al servidor, reenviara el post-it. El servidor leerá el post-it y dirá: "Ah, tu eres el #845, aquí esta tu salsa".

Este mecanismo parece simple pero tiene implicaciones profundas de seguridad. La Cookie es literalmente la única prueba de identidad que el servidor tiene. Si alguien más obtiene esa Cookie, el servidor no tiene forma de distinguir entre el legítimo usuario y el atacante.

### El Ángulo del Hacker: Robo de Sesión

Si un hacker logra copiar tu post-it (tu Cookie de Sesión), puede pegárselo en su propia frente. El mensajero ciego le llevará al hacker los datos de tu cuenta bancaria sin sospechar absolutamente nada.

Las formas en que un hacker puede robar tu Cookie incluyen:

**XSS (Cross-Site Scripting):** El hacker inyecta código JavaScript en una página que visitas. Ese código lee `document.cookie` y envía el valor al servidor del hacker. Si la Cookie no tiene la bandera `HttpOnly`, el JavaScript del navegador puede acceder a ella.

**Sniffing de Red:** Si el sitio usa HTTP en lugar de HTTPS (sin encriptación), la Cookie viaja en texto plano por la red. Cualquiera en la misma red WiFi con Wireshark puede capturarla.

**Malware en el dispositivo:** Un virus en tu computadora puede robar el archivo de cookies del navegador.

**Ingeniería Social:** Llamarte y hacerte instalar un "plugin de seguridad" que en realidad es un troyano que roba cookies.

La defensa contra el robo de sesión es una combinación de: HTTPS obligatorio, bandera `HttpOnly` en las cookies, bandera `Secure`, bandera `SameSite`, y regeneración del ID de sesión después del login.

## La Anatomía de una Petición HTTP

Cuando escribes `https://www.google.com` en tu navegador y presionas Enter, tu navegador construye un mensaje HTTP y lo envía a través de internet. Ese mensaje tiene una estructura específica.

**La Línea de Inicio (Request Line):** La primera línea del mensaje. Contiene tres partes: el método HTTP (GET, POST, PUT, DELETE, etc.), la ruta del recurso (`/`, `/search`, `/images/logo.png`), y la versión del protocolo (`HTTP/1.1`, `HTTP/2`, `HTTP/3`).

Ejemplo: `GET /search?q=seguridad HTTP/1.1`

**Los Headers (Cabeceras):** Son pares de clave-valor que contienen metadatos sobre la petición. Son como las notas adhesivas que el mensajero pega en el sobre.

Headers comunes y su relevancia de seguridad:

`Host: www.google.com` -- Indica a que servidor va dirigida la petición. Esencial para servidores virtuales que albergan múltiples sitios en la misma IP.

`User-Agent: Mozilla/5.0...` -- Identifica el navegador y sistema operativo del cliente. Los atacantes a menudo falsifican este header para evadir detección o imitar un navegador legítimo.

`Cookie: session=abc123` -- Contiene las cookies almacenadas para ese dominio.

`Authorization: Bearer eyJhbGci...` -- Contiene tokens de autenticación, común en APIs modernas.

`Referer: https://www.google.com/` -- Indica desde que página se hizo clic para llegar a esta. Usado en protección CSRF pero también puede filtrar información sensible.

`Content-Type: application/json` -- Indica el formato del cuerpo de la petición.

`X-Forwarded-For: 203.0.113.1` -- Agregado por proxies para indicar la IP real del cliente. Si el servidor confía en este header sin validarlo, un atacante puede falsificar su IP.

`Origin: https://example.com` -- Similar a Referer pero más seguro. Usado en la lógica CORS para determinar si una petición cruzada esta permitida.

**El Cuerpo (Body):** Opcional. Contiene los datos que se envían al servidor, como los campos de un formulario, un archivo subido, o un JSON de API. Solo los métodos POST, PUT y PATCH suelen tener cuerpo.

### Headers de Seguridad que Todo Servidor Debería Enviar

Los headers de respuesta HTTP son la primera línea de defensa que un servidor puede enviar al navegador. Configurarlos correctamente previene clases enteras de ataques.

`Strict-Transport-Security: max-age=31536000; includeSubDomains` -- Obliga al navegador a usar siempre HTTPS para ese dominio. Previene ataques de downgrade a HTTP.

`Content-Security-Policy: default-src 'self'` -- Define que fuentes de contenido están permitidas. Previene XSS al bloquear la ejecución de scripts inline o de orígenes no autorizados.

`X-Content-Type-Options: nosniff` -- Evita que el navegador adivine el tipo MIME de un recurso, previniendo ataques de MIME sniffing.

`X-Frame-Options: DENY` -- Evita que la página sea cargada dentro de un iframe, previniendo ataques de clickjacking.

`Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Strict` -- Configura las cookies con las banderas de seguridad apropiadas.

`Cache-Control: no-store` -- Evita que el navegador almacene en caché respuestas que contengan información sensible.

## Los Métodos HTTP en Profundidad

Cuando le entregas la nota al mensajero (una Petición HTTP), la nota tiene un "Verbo" en mayúsculas que indica la intención.

### GET: Dame información

Es el método más común. Sirve solo para leer o traer información. Cuando escribes `google.com` en tu navegador, tu Chrome le envía un `GET /` al servidor de Google pidiéndole que le envíe la página principal.

**Características de seguridad:** En un método GET, cualquier información extra viaja visiblemente en la URL (ej. `banco.com/saldo?cuenta=juan`). Esto significa que:

- La información queda grabada en el historial de navegación del navegador.
- Queda registrada en los logs del servidor.
- Es visible en el header Referer cuando navegas a otra página.
- Puede ser interceptada por cualquier persona viendo tu pantalla.

**Regla de seguridad:** NUNCA uses GET para enviar información sensible. Contraseñas, tokens, números de tarjeta, datos personales jamás deben viajar en la URL.

### POST: Toma esto y guárdalo

Sirve para enviar información sensible (como cuando te registras, compras algo o subes una foto). La información viaja en el cuerpo del mensaje, no en la URL.

**Pero ojo: POST no es encriptación.** Viajar en el cuerpo no hace que los datos sean seguros. El cuerpo POST viaja en texto plano a menos que uses HTTPS. La diferencia es que no queda en el historial ni en los logs de la misma forma que GET.

### PUT: Reemplaza esto

Crea o reemplaza un recurso en el servidor. Si envías un PUT a `/api/usuario/5` con los datos de un usuario, el servidor crea el usuario 5 si no existe, o lo reemplaza completamente si ya existe.

**Peligro:** Si el endpoint PUT no tiene controles de autorización estrictos, un atacante podría sobrescribir recursos que no le pertenecen.

### DELETE: Borra esto

Elimina un recurso en el servidor. Si envías DELETE a `/api/usuario/5`, el servidor borra al usuario 5.

**Peligro:** Sin autorización adecuada, un atacante podría borrar recursos arbitrarios.

### PATCH: Modifica parcialmente

Similar a PUT pero solo modifica los campos enviados, no reemplaza todo el recurso.

### HEAD: Solo los headers

Igual que GET pero el servidor no devuelve el cuerpo, solo los headers. Usado para verificar si un recurso existe, su tamaño, o su última fecha de modificación sin descargar el contenido completo.

### OPTIONS: Que métodos aceptas?

Pregunta al servidor que métodos HTTP acepta para una ruta específica. Los atacantes usan OPTIONS para mapear la superficie de ataque de una API.

### La Regla de Idempotencia

GET, PUT, DELETE, HEAD y OPTIONS son **idempotentes**: hacer la misma petición 1 vez o 100 veces produce el mismo resultado en el servidor. POST, PATCH y CONNECT no lo son.

Esta distinción importa para la seguridad porque los ataques de retransmisión (replay attacks) pueden repetir peticiones idempotentes sin cambios, mientras que las no-idempotentes son más difíciles de retransmitir sin causar efectos visibles.

## Los Códigos de Estado

Cuando el mensajero regresa del servidor, siempre regresa con un número de 3 dígitos (Status Code). Es el resumen de lo que paso allá atrás. Un profesional de seguridad los lee automáticamente.

### 1xx: Informativo

El servidor recibió la petición y continua procesandola. Raramente visto en la práctica.

### 2xx: Éxito

**200 (OK):** Todo salió perfecto. La petición se proceso correctamente y la respuesta contiene los datos solicitados.

**201 (Created):** La petición POST o PUT creo un nuevo recurso exitosamente. Común en APIs REST.

**204 (No Content):** La petición se proceso correctamente pero no hay contenido que devolver. Común en respuestas a DELETE.

### 3xx: Redirección

**301 (Moved Permanently):** El recurso se movió permanentemente a una nueva URL. Los navegadores y buscadores actualizan automáticamente la dirección.

**302 (Found):** Redirección temporal. El recurso esta temporalmente en otra URL.

**307/308:** Similar a 301/302 pero obligan a mantener el mismo método HTTP en la redirección. 301 y 302 pueden cambiar POST a GET, lo cual tiene implicaciones de seguridad.

**El Ángulo del Hacker:** Las redirecciones abiertas son vulnerabilidades donde un sitio redirige a una URL que el atacante puede controlar. Por ejemplo, `sitio.com/redirect?url=http://phishing.com`. Esto permite phishing avanzado donde la víctima ve el dominio legítimo al principio y luego es redirigida al sitio malicioso.

### 4xx: Errores del Cliente

**400 (Bad Request):** El servidor no pudo entender la petición debido a sintaxis inválida. Un atacante puede provocar 400 para probar como reacciona el servidor.

**401 (Unauthorized):** No tienes credenciales para acceder a este recurso. No has iniciado sesión o tu sesión expiró.

**403 (Forbidden):** El servidor te reconoció pero no tienes permiso para acceder al recurso. Diferencia clave con 401: en 403 el servidor sabe quien eres pero tu rol no tiene privilegios suficientes.

**404 (Not Found):** El recurso solicitado no existe. Pero ojo: muchos servidores devuelven 404 en lugar de 403 cuando no quieren revelar la existencia de un recurso. Esto se llama "Security by Obscurity" y es debatible si es efectivo.

**405 (Method Not Allowed):** El método HTTP usado no esta soportado para esta ruta. Ej: enviaste DELETE a una ruta que solo acepta GET.

**429 (Too Many Requests):** El servidor te esta limitando porque enviaste demasiadas peticiones en poco tiempo. Mecanismo de Rate Limiting activado.

**El Ángulo del Hacker:** A los atacantes de Red Team les encanta provocar errores 4xx y 5xx para ver si el servidor escupe información en la respuesta. Un error 500 que muestra un traceback de Python revela la estructura del código. Un error 400 con un mensaje SQL revela que hay una base de datos detrás.

### 5xx: Errores del Servidor

**500 (Internal Server Error):** El servidor fallo miserablemente al procesar la petición. Esto puede revelar información valiosa si el servidor incluye detalles del error en la respuesta.

**502 (Bad Gateway):** El servidor estaba actuando como proxy o gateway y recibió una respuesta inválida del servidor upstream.

**503 (Service Unavailable):** El servidor no puede manejar la petición temporalmente, usualmente por sobrecarga o mantenimiento.

**504 (Gateway Timeout):** El servidor upstream no respondió a tiempo.

## HTTPS: La Envoltura Segura (TLS/SSL)

Hasta ahora hemos hablado de HTTP en texto plano. Pero el internet moderno usa HTTPS, que es HTTP envuelto en una capa de encriptación llamada TLS (Transport Layer Security).

### Como Funciona el Apretón de Manos TLS

1. Tu navegador se conecta al servidor en el puerto 443 y dice: "Hola, quiero una conexión segura. Estos son los algoritmos criptográficos que soporto."

2. El servidor responde: "Hola, usa este algoritmo. Y aquí esta mi Certificado Digital, que contiene mi clave pública y esta firmado por una Autoridad Certificadora (CA) de confianza."

3. Tu navegador verifica que el certificado sea válido: que no haya expirado, que el nombre del dominio coincida, que este firmado por una CA confiable.

4. Tu navegador genera una clave simétrica temporal (la clave de sesión), la encripta con la clave pública del servidor, y se la envía.

5. Solo el servidor, que tiene la clave privada correspondiente, puede desencriptar la clave de sesión.

6. A partir de ahí, ambos lados usan la clave de sesión para comunicarse de forma encriptada y segura.

### Errores Comunes en la Implementación de HTTPS

**Certificados expirados:** El navegador muestra una advertencia de seguridad y muchos usuarios la ignoran y hacen clic en "Continuar de todas formas".

**Certificados auto-firmados:** Sin una CA de confianza, la conexión puede ser interceptada por un atacante (Man-in-the-Middle) sin que el navegador pueda detectarlo.

**HTTPS pero con recursos HTTP:** Una página servida vía HTTPS que carga imágenes, scripts o estilos vía HTTP. Esto se llama "Mixed Content" y permite que un atacante modifique esos recursos inyectando código malicioso.

**TLS viejo o mal configurado:** Usar TLS 1.0 o 1.1, o permitir cifrados débiles como RC4 o DES. Herramientas como SSL Labs verifican la calidad de tu configuración TLS.

### El Ángulo del Hacker: Como se Bypassea HTTPS

Los atacantes no rompen la criptografía de TLS directamente (esencialmente imposible con la tecnología actual). En su lugar, atacan los extremos:

**SSL Stripping:** El atacante intercepta la petición inicial HTTP (antes de la redirección a HTTPS) y mantiene toda la comunicación en HTTP. La víctima cree que esta en HTTPS porque el ícono del candado aparece, pero en realidad esta hablando con el atacante en texto plano. La defensa es HSTS.

**Certificados falsos:** El atacante convence al usuario de instalar un certificado raíz falso en su dispositivo. Luego el atacante puede generar certificados validos para cualquier dominio, y el navegador de la víctima los aceptara sin advertencias.

**Phishing con HTTPS:** Los atacantes obtienen certificados SSL gratis (Let's Encrypt) para sus dominios de phishing. La presencia del candado verde ya no es garantía de que el sitio sea legítimo.

## HTTP/2 y HTTP/3: Evolución del Protocolo

HTTP/2 (lanzado en 2015) mejoro el rendimiento permitiendo múltiples peticiones simultáneas sobre la misma conexión TCP (multiplexing), compresión de headers, y push de recursos desde el servidor.

HTTP/3 (lanzado en 2022) va más allá: usa QUIC en lugar de TCP, que corre sobre UDP. QUIC reduce la latencia de conexión y maneja mejor la pérdida de paquetes.

**Implicaciones de seguridad:** HTTP/2 y HTTP/3 introducen nuevas superficies de ataque. La compresión de headers en HTTP/2 puede ser explotada para ataques de oráculo (CRIME, BREACH). La implementación defectuosa de multiplexing puede llevar a problemas de seguridad. Los firewalls y sistemas de detección de intrusiones tuvieron que actualizarse para inspeccionar el tráfico HTTP/2 y QUIC.

## La Caché Web y sus Riesgos

Cuando no configuras bien la caché? Le regalas los datos de un usuario a otro sin querer.

La caché HTTP permite almacenar respuestas para reutilizarlas sin tener que consultar al servidor original. Acelera la web pero introduce riesgos.

**Caché poisoning (Envenenamiento de caché):** Un atacante engaña al servidor de caché para que almacene una respuesta maliciosa. Cuando otros usuarios soliciten el mismo recurso, recibirán la respuesta envenenada. Ejemplo: si la caché almacena una página HTML con un script inyectado por el atacante, todos los usuarios que accedan a esa página recibirán el script malicioso.

**Información sensible en caché:** Si una respuesta contiene datos personales y el servidor permite su almacenamiento en caché, otro usuario podría recibir esa información accidentalmente. Esto es especialmente peligroso en proxies compartidos o computadoras públicas.

**Control de caché:** Los headers `Cache-Control: no-store` (no guardar en caché), `Cache-Control: no-cache` (revalidar con el servidor antes de usar), y `Cache-Control: private` (solo caché del navegador, no proxies intermedios) son esenciales para contenido sensible.

## El Flujo Completo de una Petición

Para cerrar, veamos el viaje completo de una petición desde que presionas Enter hasta que ves la página:

1. Escribes `https://ejemplo.com/login` en tu navegador.

2. El navegador revisa su caché DNS. Si no tiene la IP, hace una consulta DNS recursiva para resolver `ejemplo.com` a una dirección IP.

3. El navegador establece una conexión TCP con el servidor en el puerto 443 (handshake de 3 vías: SYN, SYN-ACK, ACK).

4. Sobre esa conexión TCP, se realiza el handshake TLS: intercambio de certificados, negociación de cifrado, establecimiento de claves.

5. El navegador construye la petición HTTP: `POST /login HTTP/1.1`, con headers (Host, User-Agent, Content-Type, Cookie, etc.) y el cuerpo del formulario (usuario y contraseña).

6. La petición viaja encriptada a través de internet, pasando por routers, firewalls, balanceadores de carga y proxies.

7. El servidor recibe la petición, la desencripta, procesa la lógica de autenticación (verifica usuario y contraseña contra la base de datos), y construye la respuesta.

8. El servidor envía la respuesta: `HTTP/1.1 302 Found` con un header `Location: /dashboard` y un header `Set-Cookie: session=abc123; HttpOnly; Secure`.

9. Tu navegador recibe la respuesta, guarda la cookie, y automáticamente hace una nueva petición GET a `/dashboard` incluyendo la cookie.

10. El servidor recibe la cookie, identifica tu sesión, y devuelve la página del dashboard con un `200 OK`.

Cada paso de este viaje es un punto donde un atacante puede interceptar, modificar, o bloquear la comunicación.

## Modos de Falla con HTTP

**Usar GET para acciones destructivas:** Un banco que usa `GET /transferir?monto=1000&destino=123` permite que un atacante genere un ataque CSRF con solo enviar un link o una imagen.

**Headers de seguridad faltantes:** Un sitio sin CSP (Content-Security-Policy) permite XSS. Un sitio sin HSTS permite SSL Stripping. Un sitio sin X-Frame-Options permite clickjacking.

**Información sensible en headers:** Algunas aplicaciones ponen tokens de autenticación en la URL (GET) o en headers personalizados que luego aparecen en los logs del servidor.

**No validar Content-Type:** Un servidor que acepta cualquier Content-Type puede ser engañado para procesar datos malformados.

**Caché de respuestas sensibles:** Información de usuarios almacenada en caché pública accesible a otros usuarios.

## Autoevaluación

1. Te piden diseñar un formulario para que los empleados envíen sus datos de recursos humanos (salarios y seguro social). El desarrollador junior lo programo usando el método GET. Por qué debes rechazar su código inmediatamente por motivos de seguridad?

2. Un atacante intenta visitar la ruta secreta `servidor.com/admin_panel`. El mensajero HTTP regresa con un código 403. Que deduces de la posición o el estatus del atacante en el sistema en ese momento? Que diferencia hay con un 401?

3. Sabiendo que HTTP tiene "amnesia" (es Stateless), si un hacker logra robar el archivo donde están guardadas tus credenciales cifradas, pero NO logra robar tu Cookie de sesión activa de hoy, puede el hacker entrar a tu cuenta bancaria directamente pegando la contraseña robada? Explica por qué.

4. Estas analizando el tráfico de una aplicación móvil de un Banco. Notas que todas las peticiones a `api.banco.com` viajan por el puerto 80 (HTTP) en lugar del puerto 443 (HTTPS). Por qué eso es una vulnerabilidad crítica aunque los datos viajen por método POST?

5. Un sitio web envía la siguiente cookie: `Set-Cookie: session=abc123`. Que banderas de seguridad faltan y que riesgos introduce cada ausencia?

6. Encuentras que tu sitio devuelve error 500 con el siguiente mensaje: `SQLSTATE[42000]: Syntax error near '1=1' at line 1`. Por qué esto es información valiosa para un atacante y que debería hacer el equipo de desarrollo para evitar que estos mensajes se muestren al usuario?

7. Implementas HSTS con `max-age=0`. Que efecto tiene esto en la seguridad de los usuarios que ya habían visitado tu sitio?

8. Un atacante realiza un ataque de caché poisoning contra el servidor de tu empresa. Explica como funciona el ataque y que headers de respuesta HTTP deberías configurar para mitigarlo.
