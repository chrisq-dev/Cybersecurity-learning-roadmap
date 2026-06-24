# Cross-Site Scripting

## Objetivo

Entender XSS, por que ocurre y como prevenirlo.

XSS es una falla de confianza entre datos no confiables y el navegador. La clave no es memorizar payloads; es entender en que contexto se renderiza un dato y como evitar que se interprete como codigo.

## Que es

XSS ocurre cuando una aplicacion permite que contenido no confiable se ejecute como JavaScript en el navegador de otros usuarios.

## Modelo Mental

```text
input no confiable -> almacenamiento/procesamiento -> render en navegador -> ejecucion
```

Si el dato llega al DOM como codigo ejecutable, hay riesgo.

## Tipos

### Reflected XSS

La entrada aparece inmediatamente en la respuesta.

Ejemplo conceptual:

```text
/search?q=texto
```

Si `q` se refleja sin escape, puede ser peligroso.

### Stored XSS

El payload queda guardado en la aplicacion.

Ejemplos:

- Comentarios.
- Perfil.
- Mensajes.

### DOM XSS

La falla ocurre por JavaScript del cliente que procesa datos inseguros.

Ejemplos de fuentes en DOM:

- `location.hash`;
- `location.search`;
- `document.referrer`;
- mensajes entre ventanas;
- respuestas de APIs renderizadas con `innerHTML`.

## Impacto

Puede permitir:

- Robo de informacion visible en la pagina.
- Acciones en nombre del usuario.
- Manipulacion de contenido.
- Redireccion a phishing.
- Robo de tokens si estan mal protegidos.

## Mitigacion

- Escapar salida segun contexto.
- Sanitizar HTML cuando se permita HTML.
- Usar frameworks correctamente.
- Content Security Policy.
- Cookies `HttpOnly` y `Secure`.
- Validacion de entrada como control adicional, no unico.

## Escape por Contexto

No existe un solo escape universal. Depende de donde se imprime el dato.

| Contexto | Riesgo | Control |
| --- | --- | --- |
| HTML body | Interpretar etiquetas | HTML escaping |
| Atributo HTML | Romper atributo | Attribute escaping |
| JavaScript | Ejecutar codigo | Evitar inline JS, serializar seguro |
| URL | Redireccion o esquema peligroso | Validar esquema y destino |
| CSS | Inyeccion de estilos | Evitar CSS dinamico no confiable |

## Contextos

El escape depende del lugar:

- HTML.
- Atributo HTML.
- JavaScript.
- URL.
- CSS.

Escapar mal puede dejar bypasses.

## Content Security Policy

CSP reduce impacto si algo falla, pero no reemplaza escape ni sanitizacion.

Buenas ideas:

- evitar `unsafe-inline`;
- restringir origenes de scripts;
- usar nonces o hashes cuando aplique;
- reportar violaciones;
- probar que no rompa la app.

## Cookies y Sesiones

`HttpOnly` ayuda porque impide que JavaScript lea la cookie. No evita todas las acciones en nombre del usuario, pero reduce robo directo de tokens.

`SameSite` ayuda contra ciertos flujos cross-site.

`Secure` exige HTTPS.

## Señales de Alerta

- Parametros reflejados.
- Campos de comentario sin sanitizar.
- HTML permitido sin controles.
- JavaScript que usa `innerHTML` con datos no confiables.

En codigo frontend, revisa:

- `innerHTML`;
- `dangerouslySetInnerHTML`;
- templates manuales;
- render de Markdown/HTML;
- valores de URL insertados en DOM;
- librerias de sanitizacion mal configuradas.

## Observacion Segura

XSS debe estudiarse en laboratorios autorizados o aplicaciones propias. La idea es entender el flujo, no lanzar payloads contra sistemas ajenos.

Para analizar un caso de XSS, separa:

- entrada: donde llega el dato no confiable;
- almacenamiento: si se guarda o solo se refleja;
- salida: donde se renderiza;
- contexto: HTML, atributo, JavaScript, URL o CSS;
- impacto: que podria hacer un atacante;
- control: escape, sanitizacion, CSP y cookies seguras;
- deteccion: logs y señales sin guardar payloads peligrosos completos si no hace falta.

## Criterios de Revision

Una revision defensiva busca comprobar si:

- los datos no confiables se escapan segun contexto;
- el HTML permitido pasa por sanitizador confiable;
- no se usa `innerHTML` con datos no confiables;
- cookies sensibles usan `HttpOnly`;
- cookies sensibles usan `Secure`;
- cookies sensibles usan `SameSite`;
- CSP esta definida como capa adicional;
- inputs se validan, aunque no sean la defensa principal;
- logs registran intentos sospechosos sin crear nuevos riesgos.

## Errores Comunes

- Creer que validar input elimina todo XSS.
- Escapar para HTML cuando el contexto era JavaScript.
- Permitir Markdown/HTML sin sanitizar.
- Confiar en CSP como unica defensa.
- Ignorar DOM XSS porque "el backend es seguro".

## Criterio de Dominio

Puedes avanzar cuando puedas:

- Diferenciar reflected, stored y DOM XSS.
- Explicar escape por contexto.
- Explicar CSP a nivel basico.
- Explicar por que `HttpOnly` ayuda.
- Revisar un flujo y proponer controles especificos por contexto.
