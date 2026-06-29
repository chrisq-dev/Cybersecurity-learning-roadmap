---
title: "CSRF (Cross-Site Request Forgery): Falsificando Órdenes"
level: "inicial"
content_type: "guia"
updated: "2026-06-29"
---

# CSRF (Cross-Site Request Forgery): Falsificando Órdenes

## Objetivo de esta Guía

Aprender como un atacante puede obligar a un usuario legítimo a ejecutar acciones destructivas en su propia cuenta, sin que el usuario se de cuenta y sin robarle la contraseña.

El Cross-Site Request Forgery (CSRF), o Falsificación de Petición en Sitios Cruzados, es un ataque de engaño puro. Juega con la confianza ciega que un navegador le tiene a las cookies de sesión cuando el usuario visita páginas de terceros.

CSRF no es un ataque de código. No hay inyección SQL, no hay XSS, no hay exploits de memoria. Es un ataque de lógica de protocolo: el servidor no verifica si la petición que recibe fue iniciada intencionalmente por el usuario o fue iniciada por otro sitio web sin el conocimiento del usuario.

## La Analogía: El Cheque con Firma Falsificada

Imagina que eres el Director de una empresa. Vas al Banco, te identificas con el Cajero (inicias sesión) y te quedas en la sala de espera leyendo una revista. El Cajero ya sabe que eres tu y confía en cualquier papel que le entregues en los próximos 15 minutos.

1. Mientras estas en la sala de espera del banco, un extraño se te acerca y te dice: "Oye, mira esta foto de un gatito."
2. Te entrega una hoja de papel doblada. En la portada tiene la foto del gatito, pero por detrás (la parte que tu no ves), hay una orden de transferencia bancaria hacia la cuenta del extraño.
3. Tu, sin saberlo, caminas hacia el Cajero y le entregas la hoja de papel doblada.
4. El Cajero te mira, confirma tu identidad (porque ya estabas validado en la sala), desdobla la hoja, lee la orden de transferencia y ejecuta la transacción.

Acabas de robarte a ti mismo, y el extraño nunca tuvo que saber tu contraseña. Solo necesito que tu entregaras el papel por el.

## El Ataque CSRF en la Web

En la web, el Banco es `banco.com`, y la foto del gatito es una página trampa creada por el hacker (`gatos-graciosos.com`).

1. Entras a `banco.com` y pones tu contraseña. El banco te da tu Cookie de sesión.
2. Sin cerrar la pestaña del banco, abres otra pestaña y entras a `gatos-graciosos.com`.
3. La página de los gatos tiene un código HTML invisible que le dice a tu navegador: "Oye Chrome, manda una petición POST a banco.com/transferir con el monto de $1,000 a la cuenta del atacante."
4. El error de diseño de la Web clásica: Por defecto, los navegadores antiguos decían: "Ah, me están pidiendo ir a banco.com. Dejame buscar la Cookie que tengo guardada para el banco y pegársela a esta petición automáticamente."
5. El servidor del banco recibe la petición, ve que trae tu Cookie valida, y ejecuta la transferencia.

El hacker "forjó" (falsificó) la petición desde un "sitio cruzado" (Cross-Site).

### La Mecánica Técnica del Ataque

El atacante crea una página HTML que contiene un formulario automático o una petición mediante JavaScript que apunta al sitio vulnerable.

**Método 1: Formulario automático (no necesita JavaScript)**

```html
<form action="https://banco.com/transferir" method="POST">
  <input type="hidden" name="cuenta" value="atacante123">
  <input type="hidden" name="monto" value="1000">
</form>
<script>document.forms[0].submit();</script>
```

Cuando la víctima carga esta página (incluso dentro de un iframe invisible), el formulario se envía automáticamente con las cookies de `banco.com`.

**Método 2: Petición GET mediante imagen**

Si el endpoint vulnerable acepta GET:

```html
<img src="https://banco.com/transferir?cuenta=atacante123&monto=1000" width="0" height="0">
```

El navegador intenta cargar la imagen, enviando una petición GET con las cookies del banco.

**Método 3: Fetch/XHR**

```javascript
fetch('https://banco.com/transferir', {
  method: 'POST',
  credentials: 'include',
  body: new URLSearchParams({cuenta: 'atacante123', monto: '1000'})
});
```

### Que Acciones Puede Realizar un CSRF?

Cualquier acción que el usuario pueda realizar en el sitio puede ser falsificada:

- Cambiar la contraseña o el correo electrónico
- Transferir dinero
- Realizar compras
- Publicar contenido en su nombre
- Cambiar configuraciones de seguridad
- Dar permisos a aplicaciones de terceros

## Diferencias Clave con XSS

CSRF y XSS son ataques fundamentalmente diferentes:

| Característica | CSRF | XSS |
|---|---|---|
| Que necesita | Que la víctima tenga sesión activa | Que la víctima ejecute JavaScript |
| El atacante lee datos? | No, solo escribe/es ejecuta acciones | Si, puede leer cookies y contenido |
| La víctima sabe? | No, es invisible | Depende del tipo |
| Persistencia? | Una sola acción | Puede ser persistente (Stored) |

**Por qué XSS es más peligroso:** Con XSS, el atacante puede leer datos, lo que le permite robar contraseñas, tokens, y bypassear protecciones CSRF. De hecho, si un sitio tiene XSS, las protecciones CSRF son inútiles porque el atacante puede leer el token CSRF y enviarlo en sus peticiones falsas.

## CSRF en APIs Modernas

Las APIs REST que usan autenticación basada en tokens (JWT, Bearer tokens) en lugar de cookies no son inherentemente inmunes a CSRF. Si los tokens se almacenan en cookies (común en aplicaciones web que usan SSR o que almacenan el token JWT en una cookie), el mismo principio aplica.

Sin embargo, las APIs que usan el header `Authorization: Bearer <token>` (enviado explícitamente por JavaScript y no automáticamente por el navegador) no son vulnerables al CSRF clásico porque el navegador no envía automáticamente el header `Authorization` en peticiones entre sitios.

La vulnerabilidad CSRF en APIs aparece cuando:
- El token JWT se almacena en una cookie (común en aplicaciones con Next.js, Nuxt, o frameworks similares)
- La API confía en cookies para autenticación
- La API no usa tokens CSRF ni SameSite cookies

## La Defensa Contra CSRF

### Token Anti-CSRF (CSRF Token)

Es la defensa más común. Funciona así:

1. Cuando el usuario carga un formulario legítimo en el sitio, el servidor genera un token único y aleatorio, lo asocia a la sesión del usuario, y lo incluye en el formulario (como un campo oculto).
2. Cuando el usuario envía el formulario, el token se envía al servidor junto con los datos.
3. El servidor verifica que el token coincida con el almacenado en la sesión.

Si un atacante intenta crear un formulario falso desde `gatos-graciosos.com`, no tiene el token de la sesión actual del usuario. Su petición llegará sin token o con un token incorrecto, y el servidor la rechazara.

**Implementación correcta:**
- El token debe ser único por sesión o por formulario.
- El token debe ser criptográficamente aleatorio (no secuencial ni predecible).
- El token debe ser invalidado después de su uso (o tener expiracion corta).
- El token debe verificarse en el servidor para cada acción sensible.

**Implementación incorrecta:**
- Token fijo para toda la aplicación.
- Token predecible (basado en el nombre de usuario o fecha).
- Token no verificado en el servidor.
- Token que se pasa por GET (visible en la URL).

### SameSite Cookie

Es una defensa moderna implementada a nivel de navegador. La bandera `SameSite` en las cookies le dice al navegador cuando debe enviar la cookie en peticiones entre sitios.

**SameSite=Strict:** La cookie solo se envía en peticiones que se originan desde el mismo sitio. Si la petición viene de `gatos-graciosos.com`, la cookie no se envía. El CSRF falla porque el servidor no reconoce al usuario.

**SameSite=Lax:** La cookie se envía en navegación top-level (cuando haces clic en un enlace) pero no en peticiones de terceros como imágenes, iframes o fetch. Es el comportamiento por defecto en los navegadores modernos.

**SameSite=None; Secure:** La cookie se envía en todas las peticiones, incluso entre sitios. Se usa para casos donde la autenticación necesita funcionar a través de sitios. Requiere la bandera `Secure` (solo HTTPS).

**Impacto:** Con `SameSite=Strict` o `Lax`, la mayoría de los ataques CSRF clasicos son bloqueados automáticamente por el navegador. Sin embargo, ataques que usan navegación top-level (como enlaces) aún pueden funcionar con `Lax`.

### Verificación del Header Referer/Origin

El servidor puede verificar el header `Referer` o `Origin` de la petición para confirmar que se origino desde el mismo sitio.

Si el header `Origin` no coincide con el dominio esperado, el servidor rechaza la petición.

**Limitaciones:**
- Algunos proxies corporativos o navegadores eliminan el header `Referer` por privacidad.
- El header `Referer` puede ser manipulado en algunos contextos.
- El header `Origin` es más confiable pero no siempre esta presente.

### Doble Envio de Cookie (Double Submit Cookie)

El servidor envía un token en una cookie (no HttpOnly) y el cliente debe enviar el mismo token como un header o parámetro en la petición. Como el atacante no puede leer ni modificar la cookie del dominio del banco desde `gatos-graciosos.com`, no puede enviar el token correcto.

**No requiere almacenamiento en el servidor,** lo que lo hace atractivo para aplicaciones stateless.

### Custom Header

El servidor requiere un header personalizado (como `X-Requested-With: XMLHttpRequest`) en las peticiones sensibles. Los navegadores no permiten enviar headers personalizados en peticiones entre sitios sin usar CORS.

**Limitacion:** Funciona para peticiones AJAX pero no para formularios HTML tradicionales.

## La Evolución de CSRF: Por qué es Cada Vez Más Raro

CSRF esta desapareciendo no porque los programadores sean más listos, sino porque los navegadores hicieron el trabajo por ellos.

En 2025, encontrar un CSRF vulnerable en una aplicación moderna es relativamente raro por varias razones:

1. **SameSite por defecto:** Los navegadores modernos (Chrome 80+, Firefox 60+, Safari 12+) implementan `SameSite=Lax` como valor por defecto para las cookies. Esto bloquea la mayoría de ataques CSRF.

2. **Frameworks con protección incluida:** Laravel, Django, Spring, ASP.NET Core, Ruby on Rails y otros frameworks incluyen protección CSRF activada por defecto.

3. **APIs REST con tokens Bearer:** Las aplicaciones modernas tienden a usar autenticación via tokens JWT en headers `Authorization`, que no se envían automáticamente entre sitios.

4. **CORS restrictivo:** Las políticas CORS (Cross-Origin Resource Sharing) en las APIs modernas limitan que origenes pueden hacer peticiones.

Sin embargo, CSRF sigue siendo relevante en:
- Aplicaciones legacy (mantenidas pero no actualizadas)
- APIs que usan cookies para autenticación (común en aplicaciones SSR con sesiones del lado del servidor)
- Sistemas embebidos y routers (donde los navegadores de los usuarios son antiguos)
- Aplicaciones donde el desarrollador desactivo intencionalmente la protección CSRF por "facilidad de uso"

## Caso Real: CSRF en YouTube (2008)

Un investigador descubrió que YouTube era vulnerable a CSRF. Creo una página que, cuando un usuario autenticado en YouTube la visitaba, realizaba acciones como agregar videos, suscribirse a canales, y cambiar la configuración del perfil. Todo sin que el usuario hiciera clic en nada.

Google pago una recompensa por el hallazgo y corrigio la vulnerabilidad agregando tokens CSRF a todas las acciones sensibles.

## CSRF en Combinación con Otros Ataques

### CSRF + XSS

Si el atacante tiene XSS en el sitio, CSRF es irrelevante: el atacante puede hacer cualquier cosa que el usuario pueda hacer, incluyendo leer el token CSRF de la página y enviarlo en peticiones falsas.

### CSRF + Clickjacking

El atacante coloca el sitio vulnerable dentro de un iframe transparente sobre un botón que la víctima hace clic. El clic de la víctima activa una acción en el sitio vulnerable.

### CSRF + Cookie Theft (si SameSite no esta configurado)

Si las cookies no tienen `SameSite`, el atacante puede hacer peticiones que llevan las cookies de la víctima.

## Modos de Falla con CSRF

**Desactivar la protección CSRF para endpoints de API porque "son solo accesibles desde nuestra app".** Un atacante puede analizar el tráfico de la app, entender los endpoints y diseñar un ataque desde cualquier navegador.

**Usar GET para acciones destructivas.** Si el endpoint de transferencia funciona con GET, el ataque es trivial: solo necesita un `<img src="...">`.

**Token CSRF estático o predecible.** Si el token CSRF es el mismo para todos los usuarios, el atacante puede obtener uno (creando su propia cuenta) y usarlo en ataques contra otros.

**Confiar solo en el header Referer.** Muchos proxy corporativos eliminan o modifican el header Referer. Algunos navegadores lo eliminan por privacidad al navegar de HTTP a HTTPS.

## Autoevaluación

1. Estas auditando una página web antigua de un Hospital. Descubres que para cambiar la dirección de correo electrónico de un paciente, el sistema usa un método GET como este: `hospital.com/cambiar_correo?nuevo=hacker@mal.com`. Por qué esto hace que un ataque CSRF sea extremadamente fácil de ejecutar con solo enviarle una imagen por WhatsApp a la víctima?

2. A diferencia del ataque XSS (donde el hacker ejecuta código JavaScript en tu máquina para leer tu información), en un ataque CSRF, el atacante alguna vez llega a leer tu contraseña o los datos de tu cuenta bancaria? Explica por qué.

3. Un programador añade un Token Anti-CSRF a su página web, pero decide usar un Token fijo (Ejemplo: `Token=123456`) que nunca cambia para ningún usuario del sistema. Por qué esto arruina completamente el propósito de la defensa?

4. Estas programando en Node.js y decides configurar la Cookie de sesión de tus usuarios con la bandera `SameSite=Strict`. Como afecta esta configuración a la viabilidad técnica de un ataque CSRF clásico?

5. Explica por qué un ataque XSS en el mismo sitio vuelve inútil cualquier protección CSRF, incluso los tokens anti-CSRF más seguros.

6. Tu aplicación web moderna usa autenticación via tokens JWT almacenados en `localStorage` (no en cookies). El token se envía en el header `Authorization: Bearer <token>`. Eres vulnerable a CSRF? Por qué?

7. Un desarrollador argumenta: "Mi API no necesita protección CSRF porque solo acepta peticiones con el header `Content-Type: application/json` y los formularios HTML tradicionales no pueden enviar JSON." Por qué esta confianza puede ser peligrosa? (Pista: Piensa en JavaScript y CORS.)

8. Durante una auditoría, encuentras que la aplicación tiene `SameSite=Lax` configurado. El atacante necesita ejecutar una acción destructiva (cambiar contraseña) usando un enlace que la víctima debe hacer clic. Según el comportamiento de `SameSite=Lax`, el ataque CSRF via enlace (navegación top-level) funciona o no? Explica.
