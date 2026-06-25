# Cross-Site Scripting

## Objetivo

Entender XSS, por que ocurre y como prevenirlo.

XSS es una falla de confianza entre datos no confiables y el navegador. La clave no es memorizar payloads; es entender en que contexto se renderiza un dato y como evitar que se interprete como código.

## Qué es

XSS ocurre cuando una aplicación permite que contenido no confiable se ejecute como JavaScript en el navegador de otros usuarios.

## Modelo Mental

```text
input no confiable -> almacenamiento/procesamiento -> render en navegador -> ejecucion
```

Si el dato llega al DOM como código ejecutable, hay riesgo.

## Tipos

### Reflected XSS

La entrada aparece inmediatamente en la respuesta.

Ejemplo conceptual:

```text
/search?q=texto
```

Si `q` se refleja sin escape, puede ser peligroso.

### Stored XSS

El payload queda guardado en la aplicación.

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
- Mensajes entre ventanas;
- Respuestas de APIs renderizadas con `innerHTML`.

## Impacto

Puede permitir:

- Robo de información visible en la página.
- Acciones en nombre del usuario.
- Manipulacion de contenido.
- Redireccion a phishing.
- Robo de tokens si están mal protegidos.

## Mitigacion

- Escapar salida según contexto.
- Sanitizar HTML cuando se permita HTML.
- Usar frameworks correctamente.
- Content Security Policy.
- Cookies `HttpOnly` y `Secure`.
- Validación de entrada como control adicional, no unico.

## Escape por Contexto

No existe un solo escape universal. Depende de donde se imprime el dato.

| Contexto | Riesgo | Control |
| --- | --- | --- |
| HTML body | Interpretar etiquetas | HTML escaping |
| Atributo HTML | Romper atributo | Attribute escaping |
| JavaScript | Ejecutar código | Evitar inline JS, serializar seguro |
| URL | Redireccion o esquema peligroso | Validar esquema y destino |
| CSS | Inyección de estilos | Evitar CSS dinamico no confiable |

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

- Evitar `unsafe-inline`;
- Restringir origenes de scripts;
- Usar nonces o hashes cuando aplique;
- Reportar violaciones;
- Probar que no rompa la app.

## Cookies y Sesiones

`HttpOnly` ayuda porque impide que JavaScript lea la cookie. No evita todas las acciones en nombre del usuario, pero reduce robo directo de tokens.

`SameSite` ayuda contra ciertos flujos cross-site.

`Secure` exige HTTPS.

## Señales de Alerta

- Parametros reflejados.
- Campos de comentario sin sanitizar.
- HTML permitido sin controles.
- JavaScript que usa `innerHTML` con datos no confiables.

En código frontend, revisa:

- `innerHTML`;
- `dangerouslySetInnerHTML`;
- Templates manuales;
- Render de Markdown/HTML;
- Valores de URL insertados en DOM;
- Librerías de sanitizacion mal configuradas.

## Observación Segura

XSS debe estudiarse en laboratorios autorizados o aplicaciones propias. La idea es entender el flujo, no lanzar payloads contra sistemas ajenos.

Para analizar un caso de XSS, separa:

- Entrada: donde llega el dato no confiable;
- Almacenamiento: si se guarda o solo se refleja;
- Salida: donde se renderiza;
- Contexto: HTML, atributo, JavaScript, URL o CSS;
- Impacto: que podria hacer un atacante;
- Control: escape, sanitizacion, CSP y cookies seguras;
- Detección: logs y señales sin guardar payloads peligrosos completos si no hace falta.

## Criterios de Revisión

Una revisión defensiva busca comprobar si:

- Los datos no confiables se escapan según contexto;
- El HTML permitido pasa por sanitizador confiable;
- No se usa `innerHTML` con datos no confiables;
- Cookies sensibles usan `HttpOnly`;
- Cookies sensibles usan `Secure`;
- Cookies sensibles usan `SameSite`;
- CSP está definida como capa adicional;
- Inputs se validan, aunque no sean la defensa principal;
- Logs registran intentos sospechosos sin crear nuevos riesgos.

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
- Explicar CSP a nivel básico.
- Explicar por que `HttpOnly` ayuda.
- Revisar un flujo y proponer controles especificos por contexto.
